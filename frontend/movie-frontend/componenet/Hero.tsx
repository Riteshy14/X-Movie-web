'use client';

import { useEffect, useState } from 'react';
import { upcomingMovies } from '../lib/api';
import Link from 'next/link';

export function Hero() {
  const [movies, setMovies] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch top 10 movies
  useEffect(() => {
    async function loadMovies() {
     const data = await upcomingMovies();
      setMovies(data.slice(0, 10));
    }
    loadMovies();
  }, []);

  // Change image every 5 seconds
  useEffect(() => {
    if (!movies.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies.length]);

  if (!movies.length) return null;

  const movie = movies[currentIndex];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* BACKDROP IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      />

      {/* 🔥 TOP DARK FADE (FOR NAVBAR VISIBILITY) */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/90 via-black/50 to-transparent z-10" />

      {/* SIDE + BOTTOM GRADIENTS */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* TEXT CONTENT */}
      <div className="relative z-20 h-full pl-2 sm:pl-4 md:pl-1 xl:pl-30 2xl:pl-50 flex items-center">
        <div className="md:ml-16 max-w-xl mt-64 ml-2 md:mt-20">
          {/* TITLE */}
          <h1 className="text-white text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            {movie.name || movie.title}
          </h1>

          {/* META INFO */}
          <div className="flex items-center gap-3 text-sm text-gray-300 mb-4">
            <span className="text-white font-medium border backdrop:backdrop-blur-xl border-white/20 py-1 px-3  rounded-4xl">
              <span className='pr-1 text-[13px]'>⭐</span> {movie.vote_average?.toFixed(1)}/10
            </span>
            <span className="text-white font-medium backdrop:backdrop-blur-xl border flex justify-center items-center gap-1.5 border-white/20 py-1 px-3  rounded-4xl">
            <span className='flex justify-center items-center'>
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"/>
              </svg>

              </span> {movie.first_air_date?.slice(0, 4)}</span>
            <span className="px-2 py-[2px] border backdrop:backdrop-blur-xl border-white/20 rounded">
              HD
            </span>
          </div>

          {/* OVERVIEW */}
          <p className="text-gray-200 text-sm leading-relaxed line-clamp-4 mb-6">
            {movie.overview}
          </p>

          {/* BUTTONS */}
          <div className="flex gap-4">
            <Link href={`watch/${movie.id}/trailer`} className="flex items-center gap-2 hover:cursor-pointer bg-white text-black py-1 px-5 md:px-8 md:py-1 rounded-full md:rounded-md text-2xl font-bold hover:scale-105 active:scale-95 transition">
              ▸ <span className='hidden font-medium text-[20px] md:block'>Play</span>
            </Link>

            <button className="flex items-center backdrop:backdrop-blur-xl hover:cursor-pointer gap-2  border border-gray-500 text-white px-8 py-2 rounded-md text-lg font-semibold hover:scale-105 active:scale-95 transition">
              🛈 See More
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
}
