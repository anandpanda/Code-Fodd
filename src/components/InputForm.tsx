import React, { useState } from "react";
import { Lightbulb, Wand2, ThumbsUp, ThumbsDown, Image } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { githubDark } from "@uiw/codemirror-theme-github";
import { motion } from "framer-motion";
import { ComicVibe, GenerationMode } from "../types";
import Button from "./ui/Button";

interface InputFormProps {
    onGenerate: (code: string, vibe: ComicVibe, mode: GenerationMode) => void;
    isGenerating: boolean;
}

const vibeOptions = [
    { value: "codeManga", label: "Code Manga" },
    { value: "catCuteness", label: "Cat Cuteness" },
    { value: "retroSaga", label: "Retro Saga" },
    { value: "memeMayhem", label: "Meme Mayhem" },
    { value: "cyberFuture", label: "Cyber Future" },
    { value: "startupLife", label: "Startup Life" },
    { value: "darkScholars", label: "Dark Scholars" },
];

const modeButtons: {
    value: GenerationMode;
    label: string;
    icon: React.ReactNode;
    color: string;
}[] = [
    {
        value: "praise",
        label: "Praise Mode",
        icon: <ThumbsUp className="h-5 w-5" />,
        color: "bg-emerald-600 hover:bg-emerald-700",
    },
    {
        value: "roast",
        label: "Roast Mode",
        icon: <ThumbsDown className="h-5 w-5" />,
        color: "bg-rose-600 hover:bg-rose-700",
    },
    {
        value: "comic",
        label: "Comic Mode",
        icon: <Image className="h-5 w-5" />,
        color: "bg-purple-600 hover:bg-purple-700",
    },
];

const InputForm: React.FC<InputFormProps> = ({ onGenerate, isGenerating }) => {
    const [code, setCode] = useState("");
    const [mode, setMode] = useState<GenerationMode>("comic");
    const [vibe, setVibe] = useState<ComicVibe>("codeManga");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (code.trim()) {
            onGenerate(code, vibe, mode);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-700"
        >
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                Create Your Comic
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label
                        htmlFor="code-input"
                        className="block text-sm font-medium text-gray-300 mb-2"
                    >
                        Enter code, algorithm name, or logic description
                    </label>
                    <div className="rounded-lg overflow-hidden border border-gray-700">
                        <CodeMirror
                            value={code}
                            height="350px"
                            theme={githubDark}
                            extensions={[javascript({ jsx: true })]}
                            onChange={(value) => setCode(value)}
                            className="font-mono"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Select Generation Mode
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {modeButtons.map((btn) => (
                            <motion.button
                                key={btn.value}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setMode(btn.value)}
                                type="button"
                                className={`
                  ${
                      mode === btn.value
                          ? btn.color
                          : "bg-gray-700 hover:bg-gray-600"
                  }
                  ${mode === btn.value ? "text-white" : "text-gray-300"}
                  p-4 rounded-lg flex flex-col items-center justify-center gap-2
                  transition-colors duration-200 border border-gray-600
                `}
                            >
                                {btn.icon}
                                <span className="font-medium">{btn.label}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {mode === "comic" && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <label
                            htmlFor="vibe-select"
                            className="block text-sm font-medium text-gray-300 mb-2"
                        >
                            Select comic vibe
                        </label>
                        <select
                            id="vibe-select"
                            className="w-full px-3 py-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={vibe}
                            onChange={(e) =>
                                setVibe(e.target.value as ComicVibe)
                            }
                            disabled={isGenerating}
                        >
                            {vibeOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </motion.div>
                )}

                <div className="flex flex-col-reverse sm:flex-row gap-4 justify-between items-center">
                    <div className="flex items-center text-sm text-gray-400 gap-2">
                        <Lightbulb className="h-4 w-4 text-yellow-500" />
                        <span>
                            Try different modes for unique interpretations!
                        </span>
                    </div>

                    <Button
                        type="submit"
                        disabled={!code.trim() || isGenerating}
                        isLoading={isGenerating}
                        variant={
                            mode === "praise"
                                ? "success"
                                : mode === "roast"
                                ? "danger"
                                : "primary"
                        }
                    >
                        <Wand2 className="h-5 w-5 mr-2" />
                        Generate{" "}
                        {mode === "comic"
                            ? "Comic"
                            : mode === "praise"
                            ? "Praise"
                            : "Roast"}
                    </Button>
                </div>
            </form>
        </motion.div>
    );
};

export default InputForm;
