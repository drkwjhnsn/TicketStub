import FilmList from '@/components/FilmList'
import SmartPagination from '@/components/SmartPagination'
import { rapidApiHeaders, rapidApiUrl } from '@/rapidApi'
import NoResultsIcon from '@/svgs/noResults.svg'
import { FilmSearch, emptyFilmSearch } from '@/types'
import { Flex, Text } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import querystring from 'node:querystring'
import { FC } from 'react'

type FilmResultsProps = {
  films: FilmSearch
}

type FilmResultsQuery = {
  title: string
  page: string
}

const FilmResults: FC<FilmResultsProps> = ({ films }) => {
  return (
    <>
      {films.Search.length ? (
        <>
          <FilmList films={films.Search} />
          <SmartPagination films={films} />
        </>
      ) : (
        <Flex flexDir={'column'} alignItems={'center'} paddingY={12}>
          <NoResultsIcon height={256} style={{ fill: 'lightgray' }} />
          <Text fontSize={['xl', '3xl']} as='b' marginTop={4}>{`We're not familiar with that one. `}</Text>
          <Text fontSize={['sm', 'md']}>{`Try as we might, we can't seem to find that title anywhere`}</Text>
        </Flex>
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps<FilmResultsProps, FilmResultsQuery> = async ({ query }) => {
  if (!query) return { props: { films: emptyFilmSearch } }
  const apiQuery = querystring.stringify({ s: query.title, page: query.page || '1' })
  const results = (await fetch(`${rapidApiUrl}/?${apiQuery}`, { headers: rapidApiHeaders }).then((data) =>
    data.json()
  )) as FilmSearch
  if (results.Response !== 'True') return { props: { films: emptyFilmSearch } }
  return { props: { films: results, key: `apiQuery` } }
}

export default FilmResults
