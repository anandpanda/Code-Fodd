import { BookOpen } from "lucide-react";

const Header = () => {
    return (
        <header className="bg-gradient-to-r from-purple-900 to-indigo-900 shadow-lg border-b border-purple-800">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        {/* <BookOpen className="h-8 w-8 text-purple-400" /> */}
                        <img src="../../icons/icon.png" alt="Logo" className="h-8 w-8" />
                        <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                            Code फोड़
                        </h1>
                    </div>
                    <p className="text-sm md:text-base italic text-purple-300">
                        Turn logic into laughter — one idea at a time.
                    </p>
                </div>
            </div>
        </header>
    );
};

export default Header;
