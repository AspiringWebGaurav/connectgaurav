import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col items-center justify-center font-sans p-6 text-center">
      
      <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center font-serif font-bold text-3xl text-zinc-400 mb-6 border border-zinc-200">
        404
      </div>
      
      <h1 className="text-3xl font-bold tracking-tight mb-3">
        Page Not Found
      </h1>
      
      <p className="text-zinc-500 max-w-md mb-8 text-sm">
        The page you are looking for does not exist or has been moved.
      </p>
      
      <Link 
        href="/"
        className="px-6 py-2.5 bg-zinc-900 text-white rounded-lg font-medium text-sm hover:bg-zinc-800 transition-colors shadow-sm"
      >
        Return Home
      </Link>
      
    </div>
  );
}
