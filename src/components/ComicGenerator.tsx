import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InputForm from "./InputForm";
import ComicDisplay from "./ComicDisplay";
import { Comic, ComicVibe, GenerationMode, GenerationStatus } from "../types";
import { generateComic } from "../services/comicService";
import { generateTextResponse } from "../services/praiseRoastService";
import ReactMarkdown from "react-markdown";
import { downloadComic } from "../services/downloadService";

const ComicGenerator = () => {
    const [comic, setComic] = useState<Comic | null>(null);
    const [_, setResponse] = useState<string | null>(null);
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [status, setStatus] = useState<GenerationStatus>("idle");
    const [error, setError] = useState<string | null>(null);
    const [mode, setMode] = useState<GenerationMode>("comic");
    const [isDownloading, setIsDownloading] = useState(false);

    const animateMarkdownTyping = (fullText: string) => {
        const lines = fullText.split("\n");
        let index = 0;

        const revealNext = () => {
            setDisplayedLines((prev) => [...prev, lines[index]]);
            index++;
            if (index < lines.length) {
                setTimeout(revealNext, 120); // Adjust typing speed here
            }
        };

        setDisplayedLines([]);
        revealNext();
    };

    const handleGenerate = async (
        code: string,
        vibe: ComicVibe,
        selectedMode: GenerationMode
    ) => {
        try {
            setStatus("generating");
            setError(null);
            setComic(null);
            setResponse(null);
            setDisplayedLines([]);
            setMode(selectedMode);

            if (selectedMode === "comic") {
                const generatedComic = await generateComic(code, vibe);
                setComic(generatedComic);
            } else {
                const text = await generateTextResponse(code, selectedMode);
                setResponse(text);
                animateMarkdownTyping(text);
            }

            setStatus("complete");
        } catch (err) {
            console.error("Error generating:", err);
            setError("Failed to generate. Please try again.");
            setStatus("error");
        }
    };

    const handleDownload = async () => {
        if (!comic) return;
        setIsDownloading(true);
        try {
            await downloadComic(comic);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="space-y-8">
            <InputForm
                onGenerate={handleGenerate}
                isGenerating={status === "generating"}
            />

            <AnimatePresence>
                {(status === "generating" || status === "complete") && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        {mode === "comic" ? (
                            <ComicDisplay
                                comic={comic}
                                status={status}
                                onDownload={handleDownload}
                                isDownloading={isDownloading}
                            />
                        ) : (
                            <div className="bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-700 text-center text-lg text-purple-300 min-h-[140px] flex flex-col items-center justify-center gap-4">
                                {status === "generating" ? (
                                    <>
                                        <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                                        <p className="text-sm text-purple-300">
                                            {mode === "praise"
                                                ? "Let me tell you how great you are in a bit!"
                                                : "You still have time to close it! You'll never be the same!!"}
                                        </p>
                                    </>
                                ) : (
                                    <div
                                        className={`text-left prose prose-invert max-w-6xl leading-loose space-y-4 ${
                                            mode === "praise"
                                                ? "text-teal-100"
                                                : "text-orange-100"
                                        }`}
                                    >
                                        {displayedLines.map((line, idx) => (
                                            <ReactMarkdown key={idx}>
                                                {line}
                                            </ReactMarkdown>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="p-4 bg-red-100 border border-red-300 rounded-md text-red-700"
                    >
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ComicGenerator;
