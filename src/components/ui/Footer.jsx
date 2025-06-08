import { FaGithub, FaLinkedin, FaEnvelope, FaGlobe } from 'react-icons/fa';

function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="w-full px-2 sm:px-4 py-4 sm:py-6 bg-slate-100/80 dark:bg-gray-900/90 flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-4 transition-all duration-500 text-center md:text-left" style={{ borderTop: 'none' }}>
            <div className="flex items-center gap-2 sm:gap-3 text-base font-medium">
                <span className="font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-fuchsia-500 to-amber-400 dark:from-blue-300 dark:via-fuchsia-400 dark:to-yellow-200 bg-clip-text text-transparent select-none transition-all duration-500">
                    Rajalakshmy S
                </span>
                <span className="text-gray-700 dark:text-gray-200">© {year} All rights reserved.</span>
            </div>
            <div className="flex flex-1 items-center justify-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    Built with <span className="text-pink-500">❤️</span> using React &amp; Vite · 🔥 Powered by Firebase
                </span>
            </div>
            <div className="flex items-center gap-3 sm:gap-5 mt-2 md:mt-0">
                <a
                    href="https://github.com/rajalakshmys-27"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="transition-colors text-xl hover:text-blue-600 dark:hover:text-blue-400"
                    style={{ color: 'var(--footer-icon-color)' }}
                >
                    <FaGithub />
                </a>
                <a
                    href="https://www.linkedin.com/in/rajalakshmy-s-2709/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="transition-colors text-xl hover:text-blue-600 dark:hover:text-blue-400"
                    style={{ color: 'var(--footer-icon-color)' }}
                >
                    <FaLinkedin />
                </a>
                <a
                    href="mailto:rajalakshmys27@gmail.com"
                    aria-label="Gmail"
                    className="transition-colors text-xl hover:text-fuchsia-500 dark:hover:text-fuchsia-400"
                    style={{ color: 'var(--footer-icon-color)' }}
                >
                    <FaEnvelope />
                </a>
                <a
                    href="https://rajalakshmy-portfolio.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Portfolio"
                    className="transition-colors text-xl hover:text-amber-500 dark:hover:text-yellow-200"
                    style={{ color: 'var(--footer-icon-color)' }}
                >
                    <FaGlobe />
                </a>
            </div>
        </footer>
    );
}

export default Footer;
