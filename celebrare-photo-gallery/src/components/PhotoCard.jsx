import React from 'react'

function HeartIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill={filled ? 'currentColor' : 'none'}>
      <path d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 5.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.3 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-violet-100/80 bg-white shadow-soft transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-violet-50">
        <img
          src={`https://picsum.photos/id/${photo.id}/640/480`}
          alt={`Photograph by ${photo.author}`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(event) => { event.currentTarget.style.opacity = '0.25' }}
        />
        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={isFavourite ? `Remove photo by ${photo.author} from favourites` : `Add photo by ${photo.author} to favourites`}
          aria-pressed={isFavourite}
          className={`absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border shadow-sm backdrop-blur transition focus:outline-none focus:ring-2 focus:ring-violet-400 ${isFavourite ? 'border-rose-100 bg-white text-rose-500' : 'border-white/70 bg-white/90 text-slate-500 hover:text-rose-500'}`}
        >
          <HeartIcon filled={isFavourite} />
        </button>
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-3.5">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-800">{photo.author}</p>
          <p className="mt-0.5 text-xs text-slate-400">Photo #{photo.id}</p>
        </div>
        {isFavourite && <span className="shrink-0 rounded-full bg-rose-50 px-2.5 py-1 text-[11px] font-semibold text-rose-500">Favourite</span>}
      </div>
    </article>
  )
}
