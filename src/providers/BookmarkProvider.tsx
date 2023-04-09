import { FilmItem } from '@/types'
import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { FC } from 'react'

type Bookmark = FilmItem & { watched: boolean }

type BookmarkedContextType = {
  bookmarkedMovies: Record<string, Bookmark>
  toggleBookmark: (film: FilmItem) => void
  toggleWatched: (imdbID: string) => void
}

export const BookmarkContext = React.createContext<BookmarkedContextType | null>(null)

const BookmarkProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState<Record<string, Bookmark>>({})
  useEffect(() => {
    const savedBookmarks = JSON.parse(window.localStorage.getItem('bookmarks') || '{}') as Record<string, Bookmark>
    setBookmarkedMovies(savedBookmarks)
  }, [])

  const toggleBookmark = useCallback(
    (film: FilmItem) => {
      const { imdbID } = film
      const newBookmarks = { ...bookmarkedMovies }
      const oldBookmark = newBookmarks[imdbID]
      if (oldBookmark) {
        delete newBookmarks[imdbID]
      } else {
        newBookmarks[imdbID] = { ...film, watched: false }
      }
      setBookmarkedMovies(newBookmarks)
      window.localStorage.setItem('bookmarks', JSON.stringify(newBookmarks))
    },
    [bookmarkedMovies]
  )

  const toggleWatched = useCallback(
    (imdbID: string) => {
      const newBookmarks = { ...bookmarkedMovies }
      if (!newBookmarks[imdbID]) return
      newBookmarks[imdbID].watched = !newBookmarks[imdbID]?.watched
      setBookmarkedMovies(newBookmarks)
      window.localStorage.setItem('bookmarks', JSON.stringify(newBookmarks))
    },
    [bookmarkedMovies]
  )

  return (
    <BookmarkContext.Provider value={{ bookmarkedMovies, toggleBookmark, toggleWatched }}>
      {children}
    </BookmarkContext.Provider>
  )
}

export default BookmarkProvider
