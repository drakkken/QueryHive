export default function Loading() {
  return (
    <div>
      <div className="min-h-screen bg-transparent flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-pulse"
            //="top: 20%; left: 10%; animation-delay: 0s;"
          ></div>
          <div
            className="absolute w-3 h-3 bg-white/20 rounded-full animate-pulse"
            //="top: 60%; left: 80%; animation-delay: 1s;"
          ></div>
          <div
            className="absolute w-1 h-1 bg-white/15 rounded-full animate-pulse"
            //="top: 30%; left: 70%; animation-delay: 2s;"
          ></div>
          <div
            className="absolute w-4 h-4 bg-white/10 rounded-full animate-pulse"
            //="top: 80%; left: 20%; animation-delay: 0.5s;"
          ></div>
          <div
            className="absolute w-2 h-2 bg-white/25 rounded-full animate-pulse"
            //="top: 15%; left: 60%; animation-delay: 1.5s;"
          ></div>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-16 text-center shadow-2xl animate-pulse">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-white border-r-white rounded-full animate-spin"></div>
            <div
              className="absolute inset-4 border-4 border-transparent border-t-white/60 rounded-full animate-spin"
              //="animation-direction: reverse; animation-duration: 1.5s;"
            ></div>
            <div
              className="absolute inset-8 border-2 border-transparent border-t-white/40 rounded-full animate-spin"
              //="animation-duration: 0.8s;"
            ></div>
          </div>

          <h1 className="text-4xl font-bold text-white mb-4 animate-pulse">
            Loading
          </h1>
          <p className="text-white/80 text-lg mb-8">
            Preparing your experience
          </p>

          <div className="w-80 h-2 bg-white/20 rounded-full mx-auto mb-8 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-white to-white/80 rounded-full animate-pulse"
              //="width: 0%; animation: progress 3s ease-in-out infinite;"
            ></div>
          </div>

          {/* //  <!-- Animated Dots --> */}
          <div className="flex justify-center space-x-2">
            <div
              className="w-3 h-3 bg-white rounded-full animate-bounce"
              // style="animation-delay: 0s;"
            ></div>
            <div
              className="w-3 h-3 bg-white rounded-full animate-bounce"
              //style="animation-delay: 0.2s;"
            ></div>
            <div
              className="w-3 h-3 bg-white rounded-full animate-bounce"
              // style="animation-delay: 0.4s;"
            ></div>
          </div>

          {/* <!-- Subtle Glow Effect --> */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-400/20 to-blue-400/20 blur-xl -z-10 animate-pulse"></div>
        </div>

        {/* <!-- Corner Decorations --> */}
        <div className="absolute top-10 left-10 w-20 h-20 border-l-4 border-t-4 border-white/30 rounded-tl-3xl"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 border-r-4 border-b-4 border-white/30 rounded-br-3xl"></div>

        {/* <!-- Floating Elements --> */}
        <div className="absolute top-1/4 right-1/4 w-6 h-6 bg-white/20 rounded-full animate-ping"></div>
        <div
          className="absolute bottom-1/3 left-1/5 w-4 h-4 bg-white/15 rounded-full animate-ping"
          // //="animation-delay: 1s;"
        ></div>
      </div>
    </div>
  );
}
