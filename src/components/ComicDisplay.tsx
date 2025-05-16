import React from "react";
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import { Comic, GenerationStatus } from "../types";
import ComicPanel from "./ComicPanel";
import Button from "./ui/Button";

interface ComicDisplayProps {
    comic: Comic | null;
    status: GenerationStatus;
    onDownload: () => Promise<void>;
    isDownloading: boolean;
}

const ComicDisplay: React.FC<ComicDisplayProps> = ({
    comic,
    status,
    onDownload,
    isDownloading,
}) => {
    const isLoading = status === "generating";

    return (
        <div className="bg-gray-800 rounded-xl shadow-2xl p-6 space-y-6 border border-gray-700">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                    Your Comic Strip
                </h2>

                {status === "complete" && comic && (
                    <Button
                        onClick={onDownload}
                        variant="secondary"
                        disabled={isDownloading}
                    >
                        {isDownloading ? (
                            <>
                                <div className="w-5 h-5 border-4 border-t-transparent border-purple-500 rounded-full animate-spin mr-2" />
                                Downloading...
                            </>
                        ) : (
                            <>
                                <Download className="h-5 w-5 mr-2" />
                                Download Comic
                            </>
                        )}
                    </Button>
                )}
            </div>

            <div
                id="comic-download-target"
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                {isLoading ? (
                    Array(3)
                        .fill(0)
                        .map((_, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <ComicPanel
                                    isLoading={true}
                                    index={index + 1}
                                />
                            </motion.div>
                        ))
                ) : comic ? (
                    comic.panels.map((panel, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <ComicPanel
                                panel={panel}
                                isLoading={false}
                                index={index + 1}
                                vibe={comic.vibe}
                            />
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-3 text-center text-gray-400 py-12">
                        No comic generated yet
                    </div>
                )}
            </div>
        </div>
    );
};

export default ComicDisplay;
