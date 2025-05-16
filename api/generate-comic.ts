import type { VercelRequest, VercelResponse } from "@vercel/node";
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const HF_TOKEN = process.env.HF_API_TOKEN!;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

const funFallbacks = [
    "Artist went on a break!",
    "Oops! Out of ideas!",
    "Too slow to draw this one...",
    "I'm am not creative... :(",
    "Out of juice for now!",
    "Nap protocol triggered.",
];

const vibePromptTemplates: Record<string, string> = {
    codeManga: `
You are creating a comic panel in the style of a dramatic Japanese manga. 
Use bold action, intense expressions, and dynamic scenes to tell a story about code or algorithms. 
The characters should have exaggerated emotional responses, and panel flow should feel high-energy.
Make sure each panel builds on the previous to form an epic narrative.
`,

    catCuteness: `
Create a comic panel featuring cute, playful cats and charming characters.
Use soft pastel colors, rounded visuals, and heartwarming interactions.
The mood should be light, joyful, and comforting, with tiny adventures or uplifting moments around code or logic.
`,

    retroSaga: `
Write a comic panel inspired by classic 8-bit or pixel art video games.
Use nostalgic themes, blocky characters, and old-school visuals to convey coding logic or algorithm battles.
Make it feel like a heroic retro quest, with witty and adventurous tone.
`,

    memeMayhem: `
Produce a humorous comic panel full of internet meme-style exaggeration and sarcasm.
Use over-the-top reactions, chaotic expressions, and meta commentary on the code or logic provided.
Be playful, informal, and culturally aware — like an inside joke among developers.
`,

    cyberFuture: `
Generate a comic panel set in a neon-lit cyberpunk future world.
Use glowing UI, sleek AI interfaces, city skylines, and futuristic devices.
Themes should revolve around complex logic, algorithms, or AI battling it out in a visually immersive high-tech setting.
`,

    startupLife: `
Create a comic panel reflecting modern startup developer life.
Use casual clothes, laptops, coffee mugs, Zoom calls, and hustle culture settings.
Make it relatable and fun — filled with light chaos, code emergencies, or sarcastic appreciation of team dynamics.
`,

    darkScholars: `
Write a comic panel in a moody, gothic, dark academia style.
Set the tone with candle-lit libraries, mysterious blackboards, and quiet philosophical dialogues about algorithms or code.
Use rich language, deep metaphors, and academic wit to create a poetic comic about logic and thought.
`,
};

function getFunnyPlaceholder(index: number) {
    const message = funFallbacks[index % funFallbacks.length];
    const text = encodeURIComponent(message);
    const bg = "000";
    const textColor = "9336fe";
    return `https://dummyimage.com/512x512/${bg}/${textColor}.png&text=${text}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { code, vibe } = req.body;

    if (!code || !vibe) {
        return res.status(400).json({ error: "Code and vibe are required." });
    }

    const intro = vibePromptTemplates[vibe] ?? "";

    const prompt = `
${intro}

You're a comic screenwriter collaborating with an AI image model.

Generate a comic with 3 to 6 panels based on the following code or logic description.

Vibe: ${vibe}
Code or logic:
${code}

For each panel, return:
- caption: short 1 to 2 sentence dialogue or narration
- imagePrompt: a vivid description of what the image model should generate, using consistent style, characters, and environment. Make sure later panels build on earlier ones.

Format output as a JSON array like this:
[
  {
    "caption": "...",
    "imagePrompt": "..."
  }
]

Only return the JSON array. Do not include explanations.
`;

    try {
        // 🔹 Step 1: GPT to generate captions + image prompts
        const client = ModelClient(
            endpoint,
            new AzureKeyCredential(GITHUB_TOKEN)
        );
        const response = await client.path("/chat/completions").post({
            body: {
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful comic script generator.",
                    },
                    { role: "user", content: prompt },
                ],
                temperature: 0.9,
                top_p: 1.0,
                model,
            },
        });

        if (isUnexpected(response)) {
            console.error("Comic AI Error:", response.body.error);
            return res.status(500).json({ error: "Comic generation failed" });
        }

        const raw = response.body.choices?.[0]?.message?.content ?? "";
        let panels: { caption: string; imagePrompt: string }[] = [];

        try {
            panels = JSON.parse(raw);
            if (!Array.isArray(panels)) throw new Error("Invalid panel array");
        } catch (err) {
            console.error("JSON parse error:", err, "\nRaw:", raw);
            return res
                .status(500)
                .json({ error: "Failed to parse panel JSON" });
        }

        // 🔹 Step 2: Generate images using Hugging Face FLUX.1-dev
        const images = await Promise.all(
            panels.map(async (panel, idx) => {
                try {
                    const hfRes = await fetch(
                        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
                        {
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${HF_TOKEN}`,
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ inputs: panel.imagePrompt }),
                        }
                    );

                    if (!hfRes.ok) {
                        const errText = await hfRes.text();
                        console.error(
                            `HF error for panel ${idx + 1}:`,
                            hfRes.status,
                            errText
                        );
                        throw new Error("Image generation failed");
                    }

                    const buffer = await hfRes.arrayBuffer();
                    const base64 = Buffer.from(buffer).toString("base64");
                    return `data:image/png;base64,${base64}`;
                } catch (e) {
                    console.error(`Panel ${idx + 1} image failed:`, e);
                    return getFunnyPlaceholder(idx);
                }
            })
        );

        // 🔹 Step 3: Return complete comic
        const comic = {
            id: crypto.randomUUID(),
            sourceCode: code,
            vibe,
            createdAt: new Date().toISOString(),
            panels: panels.map((p, i) => ({
                caption: p.caption,
                imageUrl: images[i],
                description: p.imagePrompt, // optional (for debugging or saving prompt)
            })),
        };

        res.status(200).json(comic);
    } catch (err) {
        console.error("Comic generation failed:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}
