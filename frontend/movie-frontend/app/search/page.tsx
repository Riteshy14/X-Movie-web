"use client";
import { MovieCard } from "@/componenet/movieCard";
import Navbar from "@/componenet/Navbar";
import { Upcoming } from "@/componenet/Upcoming";
import { search } from "@/lib/api";
import { useState } from "react";
import { HandleWatch } from "@/componenet/handleWatch";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);
  const handleWatch = HandleWatch();


  const handleSearch = async () => {
    if (!query.trim()) return;

    setSearched(true);

    try {
      const data = await search(query);
      setResults(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
    }
  };

  console.log("Search results:", results);

  return (
    <div className="min-h-screen bg-linear-to-t from-black/90 to-black">
      <Navbar
        logo="white"
        navicon="white"
        profilebg="black"
        profiletext="black"
        show="hidden"
      />

      <div className="pt-60 text-white/95 flex-col justify-items-center">
        <p className="md:text-5xl text-3xl text-center font-semibold">
          <span className="text-red-500">ᯓ★</span> Discover Your Next Favorite{" "}
          <span className="text-red-500">★ᯓ</span>
        </p>
        <div className="2xl:w-1/4 w-1/2 sm:w-full mx-auto">
          <p className="text-md text-gray-300 md:text-xl pt-4 text-center">
            Search through thousands of movies, TV shows, and anime series
          </p>
        </div>

        <div className="flex ml-5 mr-5 items-center mt-10 gap-4 border border-gray-600 bg-gray-700/40 backdrop:backdrop-blur-lg p-4 rounded-md">
          <div className="border focus-within:border-red-500 border-gray-600 bg-gray-700/40 pr-2 p-0.5 rounded">
            <select
              className="text-white bg-gray-700/40 p-2 outline-none"
            >
              <option value="">Movies & TV Shows</option>
              <option value="">Movies</option>
              <option value="">TV Shows</option>
              <option value="">Animes</option>
            </select>
          </div>

          <div className="flex items-center w-full bg-gray-700/40 backdrop:backdrop-blur-lg focus-within:border-red-500 rounded border border-gray-600 p-1 gap-2">
            <span className="pt-1 pl-1">🔍︎</span>
            <input
              className="xl:w-96 w-full outline-none bg-gray-700/40"
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              value={query}
              placeholder="Type here to search"
            />
            <button
              onClick={handleSearch}
              className="bg-linear-to-l from-white/20 to-white rounded-l-md text-md font-semibold px-4 cursor-pointer active:scale-95 active:shadow-inner py-1 rounded-xl"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="text-white pb-20 mt-10 px-5">
        {!searched && <Upcoming />}

        {searched && Array.isArray(results) && results.length > 0 && (
          <div className="container justify-items-center mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {results.map((item) => (
              <MovieCard
                key={item.id}
                image={item.poster_path}
                name={item.title || item.name}
                imagename={item.title || item.name}
                rating={item.vote_average}
                id={item.id}
                onwatch={handleWatch}
              />
            ))}
          </div>
        )}

        {searched && Array.isArray(results) && results.length === 0 && (
          <p className="text-center text-gray-400 text-xl mt-10">
            No results found
          </p>
        )}
      </div>
    </div>
  );
}
