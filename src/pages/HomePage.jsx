import { useNavigate } from 'react-router';

const HomePage = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/register');
    };

    return (
        <div className="min-h-screen p-2 sm:p-4 md:p-8">
            <div className="max-w-full md:max-w-6xl mx-auto">
                <div className="pt-8 md:pt-12 flex flex-col items-center gap-6 md:gap-8">
                    <div className="text-center ">
                        <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900 dark:text-white">Welcome to GitMarked</h1>
                        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-200">
                            Your intelligent GitHub bookmark manager. Save, organize, and discover
                            repositories with ease.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full">
                        <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="aspect-video mb-4">
                                <img
                                    src="/images/userDashboard.png"
                                    alt="User Dashboard"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-white">Insightful Dashboard</h2>
                            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200">
                                Search for GitHub users and repositories, explore trending projects,
                                and easily bookmark repositories for later reference.
                            </p>
                        </div>
                        <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="aspect-video mb-4">
                                <img
                                    src="/images/bookmarks.png"
                                    alt="Bookmarks View"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-white">Smart Bookmarks</h2>
                            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200">
                                Visualize your bookmarked repositories with interactive graphs,
                                import repositories in bulk, and manage your collection efficiently.
                            </p>
                        </div>
                    </div>
                    <div className="text-center w-full">
                        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-200 mb-2">
                            Start organizing your GitHub repositories today and never lose track of
                            important projects again.
                        </p>
                        <button
                            onClick={handleGetStarted}
                            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-fuchsia-500 to-amber-400 dark:from-blue-400 dark:via-fuchsia-400 dark:to-yellow-200 text-white text-base font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl border-0 outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;