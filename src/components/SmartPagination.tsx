import { FilmSearch } from '@/types'
import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC } from 'react'
import Pagination from 'react-js-pagination'

const SmartPagination: FC<{ films: FilmSearch }> = ({ films }) => {
  const { query, push } = useRouter()
  return (
    <Flex justifyContent={'center'} marginY={[2, 4]}>
      <Pagination
        activePage={parseInt((query.page as string) || '1', 10)}
        itemsCountPerPage={10}
        totalItemsCount={parseInt(films.totalResults as string, 10)}
        pageRangeDisplayed={5}
        onChange={(page) => push(`/filmResults?title=${query.title}&page=${page}`)}
      />
    </Flex>
  )
}

export default SmartPagination
