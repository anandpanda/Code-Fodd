import type { VercelRequest, VercelResponse } from "@vercel/node";
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const token = process.env.GITHUB_TOKEN!;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

export default async (req: VercelRequest, res: VercelResponse) => {
    const { code, mode } = req.body;

    if (!code || !["praise", "roast"].includes(mode)) {
        return res.status(400).json({ error: "Invalid input" });
    }

    const prompt =
        mode === "praise"
            ? `Praise this code/algo/logic:\n\n${code}`
            : `Roast this code/algo/logic:\n\n${code}`;

    try {
        const client = ModelClient(endpoint, new AzureKeyCredential(token));

        const response = await client.path("/chat/completions").post({
            body: {
                messages: [
                    {
                        role: "system",
                        content:
                            `You are a sarcastic, witty code reviewer who specializes in roasting/praising code submissions. 
                              You will be given a code snippet or logic, and your job is to ${mode} it in a humorous, bold, and informal tone. Output should be:
                              - Written in **Markdown** with proper headings, bold, and bullet points.
                              - Add a 2 liner **introduction** to set the stage for the ${mode}.
                              - Include **emojis** throughout to enhance the ${mode} and keep it playful.
                              - Do **not** include summary tables, suggestions, or “how to fix it” sections.
                              - Just ${mode} the code, line by line or idea by idea, like you're doing stand-up comedy at a developer conference.
                              - Keep it around 3 to 6 ${mode} points max.
                              - Avoid long paragraphs — split ideas into short chunks for readability.

                              Here is the code to ${mode}:`,
                    },
                    { role: "user", content: prompt },
                ],
                temperature: 0.9,
                top_p: 1.0,
                model,
            },
        });

        if (isUnexpected(response)) {
            console.error("AI error:", response.body.error);
            return res.status(500).json({ error: "AI generation failed" });
        }

        const message = response.body.choices?.[0]?.message?.content?.trim();
        res.status(200).json({ message });
    } catch (err) {
        console.error("Serverless function error:", err);
        res.status(500).json({ error: "Internal error generating response" });
    }
};
