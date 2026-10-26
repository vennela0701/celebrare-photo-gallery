import { useEffect, useState } from 'react'

/** Fetches the initial set of 30 photos and exposes request status to the UI. */
export default function useFetchPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadPhotos() {
      setLoading(true)
      setError('')
      try {
        const response = await fetch('https://picsum.photos/v2/list?limit=30', {
          signal: controller.signal,
        })
        if (!response.ok) throw new Error(`The photo service responded with ${response.status}.`)
        const data = await response.json()
        if (!Array.isArray(data)) throw new Error('The photo service returned an unexpected response.')
        setPhotos(data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('We couldn’t load the photos. Check your internet connection and try again.')
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadPhotos()
    return () => controller.abort()
  }, [])

  return { photos, loading, error }
}
