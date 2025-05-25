import { useNavigate } from 'react-router';

const HomePage = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/login');
    };

    return (
    <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
            <div className="text-center ">
                <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Welcome to GitMarked</h1>
                <p className="text-xl text-gray-700 dark:text-gray-200 mb-8">
                    Your intelligent GitHub bookmark manager. Save, organize, and discover
                    repositories with ease.
                </p>
            </div>            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="aspect-video mb-4">
                        <img
                            src="/images/userDashboard.png"
                            alt="User Dashboard"
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">Powerful Dashboard</h2>
                    <p className="text-base text-gray-700 dark:text-gray-200">
                        Search for GitHub users and repositories, explore trending projects,
                        and easily bookmark repositories for later reference.
                    </p>
                </div>

                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="aspect-video mb-4">
                        <img
                            src="/images/bookmarks.png"
                            alt="Bookmarks View"
                            className="w-full h-full object-cover rounded-lg"
                        />                    </div>
                    <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">Smart Bookmarks</h2>
                    <p className="text-base text-gray-700 dark:text-gray-200">
                        Visualize your bookmarked repositories with interactive graphs,
                        import repositories in bulk, and manage your collection efficiently.
                    </p>
                </div>
            </div>

            <div className="text-center">
                <p className="text-lg text-gray-700 dark:text-gray-200 mb-2">
                    Start organizing your GitHub repositories today and never lose track of
                    important projects again.
                </p>
                <button 
                    onClick={handleGetStarted}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold py-3 px-8 rounded-lg transition-colors duration-300 transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl"
                >
                    Get Started
                </button>
            </div>
        </div>
    </div>
    );
};

export default HomePage;