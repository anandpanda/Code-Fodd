import { Github, Heart } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-gray-900 border-t border-gray-800 py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} Code फोड़
                    </p>
                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com/anandpanda/Code-Fodd/"
                            className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
                            aria-label="GitHub Repository"
                        >
                            <Github className="h-5 w-5" />
                            <span className="text-sm">GitHub</span>
                        </a>
                        <div className="flex items-center gap-2 text-gray-400">
                            <span className="text-sm">Made by Anand with</span>
                            <Heart className="h-4 w-4 text-pink-500 fill-pink-500" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
