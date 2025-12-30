import axios from "axios";

const api_url = process.env.NEXT_PUBLIC_BACKEND_URL; 


export async function fetchMovie() {
  try {
    const response = await axios.get(`${api_url}/api/movie/popular`);
    return response.data;
  } catch (error) {
    console.log("error", error)
    return []
  }
}


export async function upcomingMovies(){
  try {
    const response = await axios.get(`${api_url}/api/movie/upcoming`)
    return response.data;
  } catch (error) {
    console.log("error", error)
    return []
  }
}

export async function toprated(){
  try {
    const response = await axios.get(`${api_url}/api/movie/toprated`)
    return response.data
  } catch (error) {
    console.log("error", error)
    return []
  }
}

export async function getMovieTrailer(id:string | number){
  try {
    const response = await axios.get(`${api_url}/api/movie/${id}/trailer`)
    return response.data
  } catch (error) {
    console.log("error",error)
    throw error;
  }
}

export async function getMovieDetails(id:string | number){
  try {
    const response = await axios.get(`${api_url}/api/movie/${id}/details`)
    return response.data
  } catch (error) {
    console.log("error",error)
    throw error;
  }
}

export async function userProfile(token: string | undefined){
  try {
    const user= await axios.get(`${api_url}/api/user/profile`,{
      headers:{Authorization:`Bearer ${token}`}
    })
    return user.data.user
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export async function upgradePlan(token: string | undefined){
  try {
    const upgrade= await axios.post(`${api_url}/api/subscription/upgrade`,{}, {
      headers:{Authorization:`Bearer ${token}`}
    })
    console.log("upgrade",upgrade.data)
    return upgrade.data
  } catch (error:any) {
    console.log("error", error.message)
    throw error;
  }
}

export async function search(query:string){
  try {
    const searchMovie = await axios.get(`${api_url}/api/movie/search?q=${encodeURIComponent(query)}`)
    return searchMovie.data
  } catch (error) {
    console.log("error",error)
    throw error;
  }
}
