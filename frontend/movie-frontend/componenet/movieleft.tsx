type CardType = {
  image: string;
  imagename: string;
  title: string;
  overview: string;
};
export function MovieLeft({ image, imagename, title, overview }: CardType) {
  return (
      <div className="flex-col justify-items-center h-full xl:h-screen md:flex-col md:justify-end">
        <div >
          <img
            className=" object-cover rounded-2xl "
            src={`https://image.tmdb.org/t/p/w400${image}`}
            alt={imagename}
          />
        </div>
        <div className="w-[350px] md:w-[400px] bg-black text-white text-md border mt-6 rounded-2xl p-4">
          <p className="text-4xl font-medium pb-3.5">{title}</p>
          <p>{overview}</p>
        </div>
      </div>
  );
}
