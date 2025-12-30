import { Toprated } from '@/componenet/Toprated'
import {PopularMovies} from '../componenet/PopularMovie'
import {Upcoming} from '../componenet/Upcoming'
import Navbar from '@/componenet/Navbar'
import { Hero } from '@/componenet/Hero'
import { Footer } from '@/componenet/Footer'

export default function Home() {

  return (
    <div className=" mx-auto bg-linear-to-b h-full from-black/97 via-black to-black/85 text-white">
      <Navbar logo='white' navicon='white' profilebg='black' profiletext='black' show='visible'/>
      <Hero/>
      <Upcoming/>
      <PopularMovies/>
      <Toprated/>
      <Footer/>
    </div>
  )
}
