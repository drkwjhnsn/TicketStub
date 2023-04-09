import { Box, Flex, Skeleton, Spinner, Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { FilmDetails } from '@/types'

const FilmDetails: FC<{ imdbID: string }> = ({ imdbID }) => {
  const details = useQuery<FilmDetails>({
    queryKey: [`film-${imdbID}`],
    queryFn: () => fetch(`/api/details?imdbID=${imdbID}`).then((data) => data.json()),
    staleTime: Infinity,
  })

  return (
    <Flex flexDir={'column'} justifyContent={'space-between'} height={'150px'} overflow={'scroll'}>
      <Skeleton height={'22px'} isLoaded={details.isFetched}>
        <Text fontSize={['sm', 'lg']} marginBottom={4}>
          {details.data?.Plot}
        </Text>
        <Text fontSize={['xs', 'md']}>
          <strong>Director: &nbsp;</strong>
          {details.data?.Director}
        </Text>
        <Text fontSize={['xs', 'md']}>
          <strong>Writer: &nbsp;</strong>
          {details.data?.Writer}
        </Text>
        <Text fontSize={['xs', 'md']}>
          <strong>Stars: &nbsp;</strong>
          {details.data?.Actors}
        </Text>
      </Skeleton>
      <Skeleton height={'22px'} isLoaded={details.isFetched} />
      <Skeleton height={'22px'} isLoaded={details.isFetched} />
      <Skeleton height={'22px'} isLoaded={details.isFetched} />
      <Skeleton height={'22px'} isLoaded={details.isFetched} />
    </Flex>
  )
}

export default FilmDetails
