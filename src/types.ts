export type FilmItem = {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export type FilmSearch = {
  Search: FilmItem[]
  totalResults: string
  Response: string
}

export const emptyFilmSearch: FilmSearch = {
  Search: [],
  totalResults: '0',
  Response: '',
}

export type FilmDetails = {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: { source: string; value: string }[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}
