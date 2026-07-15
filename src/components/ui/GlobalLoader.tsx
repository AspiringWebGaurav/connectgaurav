export function GlobalLoader() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-zinc-900/40 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Spinner Container */}
      <div className="relative flex items-center justify-center w-12 h-12">
        {/* Outer rotating dashed ring */}
        <div className="absolute w-12 h-12 border-2 border-dashed border-orange-500/50 rounded-full animate-[spin_4s_linear_infinite]"></div>
        
        {/* Inner solid spinning arc */}
        <div className="absolute w-8 h-8 border-2 border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-[spin_1s_cubic-bezier(0.55,0.055,0.675,0.19)_infinite]"></div>
        
        {/* Core center dot */}
        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-[0_0_15px_#F97316]"></div>
      </div>
      
      {/* Loading Text */}
      <p className="text-[11px] font-bold text-zinc-300 tracking-[0.3em] uppercase animate-pulse">
        Loading
      </p>
      
    </div>
  );
}
