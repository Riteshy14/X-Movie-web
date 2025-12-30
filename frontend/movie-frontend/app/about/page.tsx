'use client'

import Navbar from "@/componenet/Navbar"

export default function About() {
  return (
    <div className="min-h-screen bg-linear-to-t from-black to-gray-800 text-white">
      <Navbar logo="white" navicon="white" profilebg="black" profiletext="black" show="visible"/>
      
      <div className="max-w-6xl pt-30 mx-auto px-6 sm:px-12 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-6xl font-extrabold text-white mb-4 animate__animated animate__fadeIn animate__delay-1s">
            About X-Movie
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate__animated animate__fadeIn animate__delay-2s">
            Welcome to <span className="text-purple-600">X-Movie</span> – your ultimate destination for discovering the best movies and TV shows, featuring everything from box office hits to hidden gems.
          </p>
        </section>

        {/* Our Mission */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold text-white mb-6">Our Mission</h2>
          <div className="bg-black/50 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all">
            <p className="text-lg text-gray-200 leading-relaxed">
              At <span className="text-purple-600">X-Movie</span>, our mission is simple: to make discovering movies and TV shows as exciting as watching them. Whether you're looking for trending hits or timeless classics, we’ve got you covered. We aim to create a personalized and seamless experience for every movie lover.
            </p>
          </div>
        </section>

        {/* What We Offer */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold text-white mb-6">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-linear-to-bl from-purple-800 to-indigo-700 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
              <h3 className="text-xl font-semibold text-black mb-4">Comprehensive Movie Database</h3>
              <p className="text-gray-200">
                Find in-depth information about your favorite movies and TV shows, including cast, ratings, release dates, and more.
              </p>
            </div>
            <div className="bg-linear-to-br from-blue-500 to-indigo-800 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
              <h3 className="text-xl font-semibold text-black mb-4">Real-time Trending Updates</h3>
              <p className="text-gray-200">
                Stay updated with the latest trends in the entertainment world. Discover what's new, hot, and popular in real time.
              </p>
            </div>
            <div className="bg-linear-to-tr from-indigo-700 to-violet-800 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
              <h3 className="text-xl font-semibold text-black mb-4">Personalized Recommendations</h3>
              <p className="text-gray-200">
                Receive movie and TV show suggestions tailored to your interests based on your viewing preferences and ratings.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section with Enhanced Profile Cards */}
        <section className="bg-linear-to-tr from-blue-500 to-purple-700 rounded-lg p-8 mb-16">
          <h2 className="text-4xl font-semibold text-white mb-6">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Card 1 */}
            <div className="bg-linear-to-bl  from-purple-800 to-blue-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              <div className="w-16 h-16 flex items-center justify-center bg-white text-black text-2xl font-bold rounded-full mb-4">
                RY
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Ritesh Yadav</h3>
              <p className="text-gray-300">Founder & CEO</p>
            </div>

            {/* Team Card 2 */}
            <div className="bg-linear-to-tr from-purple-700 to-blue-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              <div className="w-16 h-16 flex items-center justify-center bg-white text-black text-2xl font-bold rounded-full mb-4">
                RY
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Ritesh Yadav</h3>
              <p className="text-gray-300">Product Designer</p>
            </div>

            {/* Team Card 3 */}
            <div className="bg-linear-to-l from-purple-800 to-blue-600 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              <div className="w-16 h-16 flex items-center justify-center bg-white text-black text-2xl font-bold rounded-full mb-4">
                RY
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Ritesh Yadav</h3>
              <p className="text-gray-300">Lead Developer</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold text-white mb-6">Contact Us</h2>
          <p className="text-lg text-gray-200 mb-4">
            Got a question or feedback? We'd love to hear from you! Reach out to us, and we'll get back to you as soon as possible.
          </p>
          <p className="text-lg font-medium text-gray-300">Email: <span className="text-purple-600">support@xmovie.com</span></p>
        </section>
      </div>
    </div>
  );
}
