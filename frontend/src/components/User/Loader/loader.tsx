const SpinnerLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-300 to-blue-900 bg-opacity-80">
      <div className="relative w-16 h-16">
        {/* Outer spinner */}
        <div className="absolute inset-0 border-4 border-white/50 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>

        {/* Middle spinner */}
        <div
          className="absolute inset-2 border-4 border-t-transparent border-r-white/20 border-b-transparent border-l-transparent rounded-full animate-spin"
          style={{ animationDuration: "0.8s" }}
        ></div>

        {/* Inner spinner */}
        <div
          className="absolute inset-4 border-4 border-t-transparent border-r-transparent border-b-white/90 border-l-transparent rounded-full animate-spin"
          style={{ animationDuration: "0.6s" }}
        ></div>

        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SpinnerLoader;
