import FilmList from '@/components/FilmList'
import { BookmarkContext } from '@/providers/BookmarkProvider'
import { Flex, Text } from '@chakra-ui/react'
import _ from 'lodash'
import { useContext, useMemo } from 'react'
import FilmIcon from '@/svgs/film.svg'

export default function Home() {
  const { bookmarkedMovies } = useContext(BookmarkContext)!
  const alphabetizedMovies = useMemo(() => _.sortBy(bookmarkedMovies, ({ Title }) => Title), [bookmarkedMovies])

  if (!alphabetizedMovies.length)
    return (
      <Flex flexDir={'column'} alignItems={'center'} paddingY={12}>
        <FilmIcon height={256} style={{ fill: 'lightgray' }} />
        <Text fontSize={['xl', '3xl']} as='b' marginTop={4}>{`Welcome to TicketStub!`}</Text>
        <Text fontSize={['xs', 'md']}>{`You don't seem to have any any movies saved in your library yet.`}</Text>
        <Text fontSize={['xs', 'md']}>{`Search for your next movie to start collecting stubs!`}</Text>
      </Flex>
    )

  return <FilmList films={alphabetizedMovies} />
}
