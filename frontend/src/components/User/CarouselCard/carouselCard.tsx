interface CarouselCardProps {
  title: string;
  image: string;
}

const CarouselCard = ({ title, image }: CarouselCardProps) => {
  return (
    <div className="group relative w-full h-80 overflow-hidden rounded-xl bg-white/10 hover:bg-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-blue-100 cursor-pointer">
      {/* Card Image with Overlay Gradient */}
      <div className="h-48 overflow-hidden">
        <div className="absolute inset-0 opacity-60 z-10 group-hover:opacity-70 transition-opacity duration-300"></div>
        <img 
          src={image || "/api/placeholder/400/320"} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </div>
      
      {/* Card Content */}
      <div className="relative z-20 p-5 h-32 overflow-hidden flex flex-col items-center justify-center">
        {/* Title with animation and truncation */}
        <h3 className="text-lg font-bold text-blue-900 mb-3 group-hover:scale-105 transform transition-transform duration-300 line-clamp-2 overflow-ellipsis text-center">{title}</h3>
        
        {/* Centered Text Line */}
        <div className="w-16 h-1 bg-blue-900 rounded mb-3 mx-auto group-hover:bg-blue-700 transition-all duration-300 group-hover:w-24"></div>
      </div>
    </div>
  );
};

export default CarouselCard;