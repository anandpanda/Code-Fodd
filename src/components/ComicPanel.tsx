import React from "react";
import { motion } from "framer-motion";
import { ComicPanel as ComicPanelType, ComicVibe } from "../types";

interface ComicPanelProps {
    panel?: ComicPanelType;
    isLoading: boolean;
    index: number;
    vibe?: ComicVibe;
}

const ComicPanel: React.FC<ComicPanelProps> = ({ panel, isLoading, vibe }) => {
    const getVibeStyling = (vibe?: ComicVibe) => {
        switch (vibe) {
            case "codeManga":
                return "border-4 border-purple-600 bg-gradient-to-b from-gray-900 to-purple-950 shadow-md rounded-lg text-white";
            case "catCuteness":
                return "border-4 border-pink-400 bg-pink-900/30 rounded-xl shadow-pink-500/50 text-pink-200";
            case "retroSaga":
                return "border-4 border-amber-700 bg-gradient-to-tr from-gray-800 via-amber-900 to-amber-800/80 rounded-lg shadow-inner text-yellow-300 font-mono";
            case "memeMayhem":
                return "border-2 border-pink-600 bg-pink-900/20 rounded-lg shadow-lg filter saturate-150 text-pink-300 font-bold";
            case "cyberFuture":
                return "border-4 border-cyan-400 bg-gradient-to-r from-gray-900 via-cyan-900 to-cyan-950 rounded-lg shadow-cyan-600/50 text-cyan-300";
            case "startupLife":
                return "border-none bg-gradient-to-br from-purple-800 to-blue-800 shadow-lg rounded-xl text-white font-semibold";
            case "darkScholars":
                return "border-4 border-amber-900 bg-gray-900/80 shadow-inner rounded-md text-yellow-300 italic";
            default:
                return "border-2 border-gray-700 bg-gray-900 rounded-md shadow text-gray-200";
        }
    };

    const vibeStyling = getVibeStyling(vibe);

    return (
        <motion.div
            className={`flex flex-col overflow-hidden rounded-lg ${vibeStyling}`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
        >
            {/* Image area */}
            <div className="aspect-square w-full relative">
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
                        <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                    </div>
                ) : panel?.imageUrl ? (
                    <img
                        src={panel.imageUrl}
                        alt={panel.caption}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                        <div className="text-gray-500">Image not available</div>
                    </div>
                )}
            </div>

            {/* Caption */}
            {!isLoading && panel?.caption && (
                <div className="p-4 bg-gray-800/90 text-center text-m text-gray-300 border-t border-gray-700">
                    {panel.caption}
                </div>
            )}
        </motion.div>
    );
};

export default ComicPanel;
