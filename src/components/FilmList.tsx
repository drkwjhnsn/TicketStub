import { FilmItem } from '@/types'
import { Accordion } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import FilmListItem from './FilmListItem'

const FilmList: FC<{ films: FilmItem[] }> = ({ films }) => {
  // need to manually reset accordion state on reload, unique keys don't seem to matter
  const [idx, setIdx] = useState<number>(-1)
  useEffect(() => {
    setIdx(-1)
  }, [films])

  return (
    <Accordion allowToggle index={idx} onChange={(idx) => setIdx(idx as number)}>
      {films.map((film) => {
        return <FilmListItem film={film} key={film.imdbID} />
      })}
    </Accordion>
  )
}

export default FilmList
