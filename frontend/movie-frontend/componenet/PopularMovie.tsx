'use client'
import { fetchMovie } from "@/lib/api";
import { useEffect, useState, useCallback } from "react";
import { MovieCard } from './movieCard'
import { HandleWatch } from "./handleWatch";

export function PopularMovies() {
  const [movie, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5); // Default to 5
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const handleWatch = HandleWatch();

  // Fetch movies
  useEffect(() => {
    fetchMovie()
      .then(data => setMovies(data));
    setLoading(false);
  }, []);

  // Update itemsPerPage based on window width
  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    setWindowWidth(width);
    if (width >= 1024) {
      // Large screen
      setItemsPerPage(5); // Show 5 items per page on large screens
    } else if (width >= 640) {
      // Medium screen
      setItemsPerPage(3); // Show 3 items per page on medium screens
    } else {
      // Small screen
      setItemsPerPage(3); // Show 2 items per page on small screens
    }
  }, []);

  // Initialize the window width on load
  useEffect(() => {
    handleResize(); // Set the initial items per page
    window.addEventListener('resize', handleResize); // Add resize event listener
    return () => window.removeEventListener('resize', handleResize); // Clean up
  }, [handleResize]);

  // Handle click on the next (right) arrow
  const handleNext = () => {
    if (currentIndex + itemsPerPage < movie.length) {
      setCurrentIndex(currentIndex + itemsPerPage); // Move right by dynamic number of movies
    }
  };

  // Handle click on the previous (left) arrow
  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage); // Move left by dynamic number of movies
    }
  };

  return (
    <div className="container mt-20 mb-20 mx-auto p-4 relative">
      <h1 className="flex items-center text-4xl font-medium pl-2 pb-4">
        <span className="w-2 h-8 mr-2 rounded-3xl bg-red-500" />Popular Movies
      </h1>

      {loading ? (
        <div className="text-center text-xl">Loading...</div>
      ) : (
        <div className="relative">
          {movie.length === 0 ? (
            <p className="text-center text-xl">No movies found</p>
          ) : (
            <div>
              {/* Flex container without wrap */}
              <div
                className="flex gap-1"
                style={{
                  display: 'flex',
                  overflowX: 'scroll', // Enable horizontal scrolling
                  width: '100%',
                  scrollBehavior: 'smooth',
                  overflow:"hidden"
                }}
              >
                {/* Show the current set of movies based on the dynamic itemsPerPage */}
                {movie.slice(currentIndex, currentIndex + itemsPerPage).map((item, index) => (
                  <div key={index} className="flex-none w-[165px] sm:w-[200px] md:w-[245px] lg:w-[244px] 2xl:w-[285px]  gap-6 p-0 md:p-2">
                    <MovieCard
                      image={item.poster_path}
                      name={item.name}
                      imagename={item.name}
                      rating={item.vote_average}
                      id={item.id}
                      onwatch={handleWatch}
                    />
                  </div>
                ))}
              </div>

              {/* Left Arrow (only show if you're not at the start) */}
              {currentIndex > 0 && (
                <button
                  className="absolute left-0 text-4xl text-white bg-black bg-opacity-50 p-2 rounded-full"
                  onClick={handlePrev}
                >
                  &#60; {/* Left Arrow */}
                </button>
              )}

              {/* Right Arrow (only show if there are more movies to the right) */}
              {currentIndex + itemsPerPage < movie.length && (
                <button
                  className="absolute right-0 text-4xl text-white bg-black bg-opacity-50 p-2 rounded-full"
                  onClick={handleNext}
                >
                  &#62; {/* Right Arrow */}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
