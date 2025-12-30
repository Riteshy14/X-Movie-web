import Link from "next/link";

interface CardType {
  image: string;
  imagename: string;
  name: string;
  rating: number;
  id:string;
  onwatch: (tmdbId:number)=> void
}

export function MovieCard({ image, imagename, name, rating,id,onwatch }: CardType) {
  return (
    <div
    onClick={()=> onwatch(Number(id))}
    className="relative lg:w-64 lg:h-85 overflow-hidden hover:cursor-pointer shadow-lg group">
      {/* Image */}
      <img
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        src={`https://image.tmdb.org/t/p/w300${image}`}
        alt={imagename}
      />
      {/* Text Overlay at the Bottom */}
      <div className="absolute bottom-0 w-full p-2 bg-black bg-opacity-30 backdrop-blur-md opacity-0 group-hover:opacity-80 transition-opacity duration-300">
        <h3 className="text-white text-xl font-semibold">{name}</h3>
        <div className="flex justify-between p-2">
            <p className="text-white text-lg">Movie</p>
            <h5 className="text-white text-lg flex items-center"><span className="pr-1 text-sm md:text-[16px]">⭐</span>{(rating ?? 0).toFixed(1)}/10</h5>
        </div>
      </div>
    </div>
  );
}
