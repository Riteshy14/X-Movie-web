'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface NavbarType {
  logo:string,
  navicon:string,
  profiletext:string,
  profilebg:string,
  show: string
}

export default function Navbar({logo,navicon,profiletext, profilebg,show}:NavbarType) {
  const [scrolled, setScrolled] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(()=>{
    const storedtoken= localStorage.getItem('token')
    if(!storedtoken){
      localStorage.removeItem('token')
      return;
    }
    setToken(storedtoken)
  })
  const Router = useRouter();

  const handleclick= ()=>{
    if(token){
      Router.push('/userprofile')
      return
    }else{
      Router.push('/signup')
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300
      ${scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'}
      `}
    >
      <div className="flex items-center  justify-between px-2 md:px-14 py-4">
        {/* LEFT: WEBSITE NAME */}
        <div onClick={()=> Router.push('/')} className={`text-${logo} text-xl sm:text-2xl md:text-3xl  xl:pl-30 2xl:pl-50 hover:cursor-pointer font-extrabold tracking-wide`}>
          🎬 X-MOVIE
        </div>

        {/* RIGHT: MENU */}
        <div className={`flex items-center  xl:pr-30 2xl:pr-50 gap-5 md:gap-8 text-sm text-${navicon} `}>
          <span onClick={()=> Router.push('/')} className="cursor-pointer flex items-center gap-1  text-xl hover:scale-105 hover:font-bold">
            <svg className="w-6 h-6 flex items-center mb-1  dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
            </svg>Home</span>
          <span onClick={()=> Router.push('/about')} className="cursor-pointer text-xl hover:scale-105 hover:font-bold">About</span>

          <button onClick={()=> Router.push('/search')} className={`text-2xl font-extrabold hover:scale-105 hover:font-bold  hover:cursor-pointer ${show}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
           <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
         </svg>

          </button>

          <div onClick={handleclick} className={`w-8 h-8 rounded-full border-2 border-white bg-${profilebg} text-${profiletext} flex items-center justify-center text-xl  font-semibold cursor-pointer`}>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clipRule="evenodd"/>
            </svg>

          </div>
        </div>
      </div>
    </nav>
  );
}
