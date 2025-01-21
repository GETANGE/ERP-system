const HeroSection = function () {
    return (
        <div className="flex flex-col items-center mt-10 lg:mt-20 px-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center leading-tight">
                Power Up Your Business <br />
                <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
                    With Smarter Inventory Tools
                </span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-neutral-600 text-center max-w-3xl">
                Manage inventory seamlessly, reduce operational headaches, and unlock growth potential—all in one platform.
            </p>
            <div className="flex justify-center gap-4 my-8">
                <a 
                    href="#" 
                    className="bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg shadow-md text-lg transition">
                    Start for Free
                </a>
                <a 
                    href="#" 
                    className="border border-neutral-400 hover:border-neutral-600 py-3 px-6 rounded-lg shadow-md text-lg transition">
                    Learn More
                </a>
            </div>
            <img 
                src="https://fly.storage.tigris.dev/calendery/Online Inventory Management Software _ Zoho Inventory.jpeg" 
                alt="Inventory Mockup" 
                className="rounded-lg shadow-lg w-full lg:w-3/4 mt-8"
            />
        </div>
    );
};

export default HeroSection;
