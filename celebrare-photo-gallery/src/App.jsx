import React, { useCallback, useMemo, useReducer, useState } from 'react'
import PhotoCard from './components/PhotoCard.jsx'
import useFetchPhotos from './hooks/useFetchPhotos.js'

const STORAGE_KEY = 'celebrare-photo-gallery-favourites'

function readSavedFavourites() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      return state.includes(action.id)
        ? state.filter((id) => id !== action.id)
        : [...state, action.id]
    case 'CLEAR':
      return []
    default:
      return state
  }
}

function SearchIcon() {
  return <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.8"/><path d="m16 16 4.2 4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
}

function LoadingState() {
  return <div className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-3xl border border-violet-100 bg-white/70 py-16">
    <span className="h-10 w-10 animate-spin rounded-full border-4 border-violet-100 border-t-violet-600" role="status" aria-label="Loading photos" />
    <p className="text-sm font-medium text-slate-500">Finding something beautiful…</p>
  </div>
}

export default function App() {
  const { photos, loading, error } = useFetchPhotos()
  const [search, setSearch] = useState('')
  const [showFavourites, setShowFavourites] = useState(false)
  const [favourites, dispatch] = useReducer(favouritesReducer, undefined, readSavedFavourites)

  React.useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites)) } catch {
      // The gallery still works for this session if browser storage is unavailable.
    }
  }, [favourites])

  const handleSearchChange = useCallback((event) => {
    setSearch(event.target.value)
  }, [])

  const toggleFavourite = useCallback((id) => {
    dispatch({ type: 'TOGGLE', id })
  }, [])

  const filteredPhotos = useMemo(() => {
    const query = search.trim().toLowerCase()
    return photos.filter((photo) => {
      const matchesAuthor = photo.author.toLowerCase().includes(query)
      const matchesFavouriteTab = !showFavourites || favourites.includes(photo.id)
      return matchesAuthor && matchesFavouriteTab
    })
  }, [photos, search, showFavourites, favourites])

  const favouriteCount = favourites.length

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-100/70 via-[#f8f7fc] to-[#f8f7fc]">
      <header className="border-b border-violet-100/80 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#top" className="flex items-center gap-2.5" aria-label="Frame home">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-600 text-white shadow-md shadow-violet-200">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="1.7"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path d="m5 18 5-5 3 3 2-2 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <span><span className="block text-lg font-extrabold tracking-tight text-slate-900">frame<span className="text-violet-600">.</span></span><span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">A little inspiration</span></span>
          </a>
          <div className="flex items-center gap-2 rounded-full border border-violet-100 bg-white px-3.5 py-2 text-sm text-slate-600">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-rose-500" fill="currentColor" aria-hidden="true"><path d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 5.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.3 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/></svg>
            <span className="font-semibold tabular-nums">{favouriteCount}</span><span className="hidden sm:inline">saved</span>
          </div>
        </div>
      </header>

      <section id="top" className="mx-auto max-w-7xl px-5 pb-12 pt-10 sm:px-8 sm:pt-14">
        <div className="mb-8 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-violet-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> YOUR DAILY DOSE OF INSPIRATION
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">Discover the world, <span className="text-violet-600">one frame</span> at a time.</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-500">A curated little corner of the internet. Explore photographs, find your favourites, and keep the moments that move you.</p>
        </div>

        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex min-h-12 flex-1 items-center gap-3 rounded-2xl border border-violet-100 bg-white px-4 shadow-sm transition focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-100 sm:max-w-xl">
            <span className="text-violet-400"><SearchIcon /></span>
            <input value={search} onChange={handleSearchChange} type="search" placeholder="Search by photographer name…" className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400" aria-label="Search photos by author name" />
            {search && <button type="button" onClick={() => setSearch('')} className="text-xs font-semibold text-violet-600 hover:text-violet-800">Clear</button>}
          </label>
          <div className="flex rounded-xl border border-violet-100 bg-white p-1 shadow-sm" aria-label="Gallery filter">
            <button type="button" onClick={() => setShowFavourites(false)} aria-pressed={!showFavourites} className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${!showFavourites ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-500 hover:text-violet-700'}`}>All photos</button>
            <button type="button" onClick={() => setShowFavourites(true)} aria-pressed={showFavourites} className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${showFavourites ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-500 hover:text-violet-700'}`}><span>♥</span> Favourites <span className="text-xs opacity-80">{favouriteCount}</span></button>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-800">{showFavourites ? 'Your favourites' : 'Photo collection'} <span className="ml-1 text-sm font-medium text-slate-400">({loading ? '…' : filteredPhotos.length})</span></h2>
          <span className="text-xs font-medium text-slate-400">Powered by Picsum Photos</span>
        </div>

        {loading ? <LoadingState /> : error ? (
          <div className="rounded-3xl border border-rose-100 bg-white px-6 py-14 text-center shadow-sm">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-rose-50 text-2xl text-rose-500">!</span>
            <h3 className="mt-4 text-lg font-bold text-slate-800">Photos are taking a break</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{error}</p>
            <button type="button" onClick={() => window.location.reload()} className="mt-5 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700">Try again</button>
          </div>
        ) : filteredPhotos.length ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredPhotos.map((photo) => <PhotoCard key={photo.id} photo={photo} isFavourite={favourites.includes(photo.id)} onToggleFavourite={toggleFavourite} />)}
          </div>
        ) : (
          <div className="rounded-3xl border border-violet-100 bg-white px-6 py-14 text-center">
            <span className="text-4xl" aria-hidden="true">{showFavourites ? '♡' : '⌕'}</span>
            <h3 className="mt-3 text-lg font-bold text-slate-800">{showFavourites ? 'No favourites yet' : 'No photos found'}</h3>
            <p className="mt-2 text-sm text-slate-500">{showFavourites ? 'Tap the heart on any photo to save it here.' : 'Try another photographer name.'}</p>
            {showFavourites && <button type="button" onClick={() => setShowFavourites(false)} className="mt-4 rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700">Explore photos</button>}
          </div>
        )}
        <footer className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-violet-100 pt-5 text-xs text-slate-400 sm:flex-row">
          <p>Made for the moments worth keeping.</p><p>React · Vite · Tailwind CSS</p>
        </footer>
      </section>
    </main>
  )
}
