import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white flex flex-col items-center justify-center p-6 text-center">
      <span className="text-xs font-mono tracking-[0.25em] text-[#D72626] font-semibold uppercase mb-2">
        Error 404
      </span>
      <h1 className="text-4xl sm:text-6xl font-light uppercase tracking-tight text-white mb-4">
        Page Not Found
      </h1>
      <p className="text-xs sm:text-sm text-stone-400 max-w-md font-light leading-relaxed mb-8">
        The piece or collection you are looking for has been moved, archived, or is no longer in circulation.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-xs font-semibold uppercase tracking-widest hover:bg-stone-200 transition-colors"
      >
        <span>← Return to Home</span>
      </Link>
    </div>
  );
}
