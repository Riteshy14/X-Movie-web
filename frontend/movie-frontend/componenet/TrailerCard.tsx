interface trailerType {
    trailer: string,
    title:string,
    seasons:number
}

export function TrailerCard({trailer,title,seasons}:trailerType){
    return <div className="p-4 h-[350px] sm:h-[400px] md:h-[450px] md:w-[750px] md:pl-2 md:pr-2 md:flex-col  xl:p-2 lg:h-[500px] lg:w-[850px] xl:h-[500px] xl:w-[850px] 2xl:w-[1200px]  2xl:h-[700px]   pb-10    w-full">

          <p className="text-4xl  text-white font-semibold pb-2">Trailer</p>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${trailer}`}
            title="Movie Trailer"
            allowFullScreen
            />
     </div>
}