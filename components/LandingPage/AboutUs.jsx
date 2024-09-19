'use client'

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-blue-50 p-8 flex justify-center items-center">
            <div className="mx-20 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* About Us */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-4xl font-bold mb-4">About Us</h1>
                    <p className="text-lg text-gray-700">
                        We are dedicated to promoting mental wellness and providing resources that empower individuals to lead happier, healthier lives.
                        Our platform offers a holistic approach to mental health, focusing on prevention, education, and support.
                    </p>
                </div>

                <div className="flex flex-col gap-8">
                    {/* Our Vision */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex-grow">
                        <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
                        <p className="text-lg text-gray-700">
                            Our vision is to create a world where mental health is prioritized and openly discussed. We envision a society where individuals feel empowered
                            to seek help and where mental wellness is integrated into everyday life.
                        </p>
                    </div>

                    {/* Our Mission */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex-grow">
                        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
                        <p className="text-lg text-gray-700">
                            Our mission is to make mental health resources accessible to everyone. We strive to foster a supportive community where individuals can
                            find the tools they need to enhance their emotional well-being and navigate life's challenges.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
