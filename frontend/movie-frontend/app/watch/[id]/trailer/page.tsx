'use client';

import Navbar from "@/componenet/Navbar";
import { useEffect, useState } from "react";
import { getMovieDetails, getMovieTrailer } from '../../../../lib/api';
import { useParams } from "next/navigation";
import { MovieLeft } from "@/componenet/movieleft";
import { TrailerCard } from "@/componenet/TrailerCard";

interface movirDetails {
    title:string,
    overview:string,
    releaseDate?:string,
    seasons?:number,
    rating:number,
    poster?:string
}

export default function Trailer() {
  const [trailer, setTrailer] = useState<string | null>(null);
  const [details, setDetails] = useState<movirDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const id = params.id;

  useEffect(() => {
    if (!id || Array.isArray(id)) {
      setLoading(false);
      return;
    }

    Promise.all([
      getMovieTrailer(id),
      getMovieDetails(id)
    ])
      .then(([trailerData, detailsData]) => {
        setTrailer(trailerData?.key ?? null);
        setDetails(detailsData);
      })
      .finally(() => setLoading(false));
  }, [id]);

  console.log("id param", params.id, details);

  return (
    <div className="min-h-screen flex flex-col bg-black/90 2xl:bg-black ">
      <Navbar
        logo="white"
        navicon="white"
        profilebg="black"
        profiletext="black"
        show="visible"
      />

      <div className="pt-20 flex-grow">
        {loading ? (
          <p className="text-white">Loading trailer...</p>
        ) : trailer ? (
            <div className="flex-col xl:grid xl:grid-cols-3 h-full xl:h-full">
                <div className="md:flex h-full md:justify-center lg:flex lg:justify-center pt-5 xl:pl-10  xl:col-span-1 ">
            <MovieLeft image={details?.poster!} imagename="" overview={details?.overview!}  title={details?.title!}/>
                </div>
                <div className="w-full h-full  xl:col-span-2 pb-10 md:flex md:justify-center 2xl:pr-25 2xl:pt2">
                    <TrailerCard seasons={details?.seasons!} title={details?.title!} trailer={trailer}/>
                </div>
            </div>
        ) : (
          <p className="text-white text-2xl flex justify-center items-center pt-90 h-96">Trailer not available</p>
        )}
      </div>

    </div>
  );
}
