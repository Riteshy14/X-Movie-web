import axios from "axios";
import type {Request,Response} from 'express'
import { Prisma } from "../db/prisma.js";


const api = process.env.api_key;

const watchMovie = async (req:Request,res:Response)=>{
    try {
    const userId = req.user?.id

    if(!userId){
        return res.json({
            message:"userid require"
        })
    }

    const {tmdbId} = req.body

    if(!tmdbId){
        return res.status(404).json({
            message:"tmbid id required"
        })
    }

        const user = await Prisma.user.findUnique({
            where: {id:userId!}
        })

        if(!user){
            return res.status(404).json({
                message:"user not found"
            })
        }

        const watchCount = await Prisma.watchHistory.count({
            where:{
                userId:userId!
            }
        })

        if(user.Subscriptions==="FREE" && watchCount>=2){
            return res.status(403).json({
                message:"Free limit reached. Upgrade to premium"
            })
        }


        try {
          const existingwatch = await Prisma.watchHistory.findFirst({
          where:{
            userId,
            tmdbId
          }
        })

        if(!existingwatch){
          await Prisma.watchHistory.create({
                data:{
                    userId,
                    tmdbId
                }
            })
        }
        } catch (error) {
            console.log('error', error)
            return res.status(500).json({
                message:"server error",
                error : error instanceof Error ? error.message:"unknown error"
            })
        }

        return res.status(200).json({
            message:"Access Granted",
            tmdbId
        })
    } catch (error:any) {
        console.log("error", error)
        return res.status(500).json({
            messgae : error.message 
        })
    }
}

const getPopularMovie = async (req:Request,res:Response)=>{
    try {
        const movie = await axios.get(`https://api.themoviedb.org/3/tv/popular?`,{
            params: {api_key: api}
        })

        return res.json(movie.data.results)
    } catch (error:any) {
        console.log("error", error)
        return res.status(500).json({
            message: "server error",
            error : error.message
        })
    }
}

const topRatedMovie = async (req:Request,res:Response)=>{
    try {
        const movie = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?`,{
            params:{api_key:api}
        })

        return res.json(movie.data.results)
    } catch (error) {
        console.log("error", error)
        return res.status(500).json({
            message:"server eror",
            error: error instanceof Error ? error.message:"unknown error"
        })
    }
}

const upcomingMovies = async (req:Request, res:Response)=>{
    try {
        const movie = await axios.get(`https://api.themoviedb.org/3/trending/all/day?`,{
            params:{api_key:api}
        })

        return res.json(movie.data.results)
    } catch (error) {
        console.log("error", error)
        return res.status(500).json({
            message:"server error",
            error: error instanceof Error ? error.message:"unknown error"
        })
    }
}


const getTrailerWithFallback = async (req: Request, res: Response) => {
  const { id } = req.params;

  const movieUrl = `https://api.themoviedb.org/3/movie/${id}/videos`;
  const tvUrl = `https://api.themoviedb.org/3/tv/${id}/videos`;

  let videos: any[] = [];

  try {
    // 1️⃣ Try movie trailers
    try {
      const movieRes = await axios.get(movieUrl, {
        params: { api_key: api }
      });

      if (movieRes.data?.results?.length > 0) {
        videos = movieRes.data.results;
      }
    } catch (err: any) {
      // Ignore "not found"
      if (err.response?.status !== 404) throw err;
    }

    // 2️⃣ If no movie trailers → try TV trailers
    if (videos.length === 0) {
      try {
        const tvRes = await axios.get(tvUrl, {
          params: { api_key: api }
        });

        if (tvRes.data?.results?.length > 0) {
          videos = tvRes.data.results;
        }
      } catch (err: any) {
        if (err.response?.status !== 404) throw err;
      }
    }

    // 3️⃣ Still nothing
    if (videos.length === 0) {
      return res.json({ provider: null });
    }

    // 4️⃣ Pick best trailer
    const trailer =
      videos.find(v => v.site === "YouTube" && v.type === "Trailer") ||
      videos.find(v => v.site === "YouTube" && v.type === "Teaser") ||
      videos.find(v => v.site === "YouTube") ||
      videos[0];

    return res.json({
      provider: trailer.site,
      key: trailer.key
    });

  } catch (error) {
    console.error("Trailer fetch failed:", error);
    return res.status(500).json({
      message: "Failed to fetch trailer"
    });
  }
};

const getMovieDetails = async (req: Request, res: Response) => {
  const { id } = req.params;

  const movieUrl = `https://api.themoviedb.org/3/movie/${id}`;
  const tvUrl = `https://api.themoviedb.org/3/tv/${id}`;

  try {
    // 1️⃣ Try MOVIE details
    try {
      const movieRes = await axios.get(movieUrl, {
        params: { api_key: api }
      });

      return res.json({
        mediaType: "movie",
        title: movieRes.data.title,
        overview: movieRes.data.overview,
        releaseDate: movieRes.data.release_date,
        rating: movieRes.data.vote_average,
        poster: movieRes.data.poster_path,
        backdrop: movieRes.data.backdrop_path
      });
    } catch (err: any) {
      // ❗ Ignore 404 → means "not a movie"
      if (err.response?.status !== 404) throw err;
    }

    // 2️⃣ Try TV details
    try {
      const tvRes = await axios.get(tvUrl, {
        params: { api_key: api }
      });

      return res.json({
        mediaType: "tv",
        title: tvRes.data.name,
        overview: tvRes.data.overview,
        releaseDate: tvRes.data.first_air_date,
        rating: tvRes.data.vote_average,
        poster: tvRes.data.poster_path,
        backdrop: tvRes.data.backdrop_path,
        seasons: tvRes.data.number_of_seasons,
        episodes: tvRes.data.number_of_episodes
      });
    } catch (err: any) {
      if (err.response?.status !== 404) throw err;
    }

    // 3️⃣ Neither movie nor TV
    return res.status(404).json({
      message: "Media not found"
    });

  } catch (error) {
    console.error("Details fetch failed:", error);
    return res.status(500).json({
      message: "Failed to fetch details"
    });
  }
};

const searchMovie = async (req:Request,res:Response)=>{
  try {
    const query = req.query.q as string

    if(!query){
      return res.status(400).json({
        message:"Search query required"
      })
    }

    const response = await axios.get(`https://api.themoviedb.org/3/search/multi`,{
      params: { 
        api_key : api,
        query
      }
    })

    return res.json(response.data.results)
  } catch (error) {
    console.log("error", error)
    res.status(500).json({
      message : "server error",
      error : error instanceof Error ? error.message:"unkown error"
    })
  }
}


export {
    getPopularMovie,
    watchMovie,
    topRatedMovie,
    upcomingMovies,
    getTrailerWithFallback,
    getMovieDetails,
    searchMovie
}