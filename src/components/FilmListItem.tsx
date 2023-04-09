import styles from '@/styles/FilmListItem.module.css'
import { FilmItem } from '@/types'
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Img, Text } from '@chakra-ui/react'
import { FC, useCallback, useContext } from 'react'
import FilmDetails from './FilmDetails'
import { BookmarkContext } from '@/providers/BookmarkProvider'
import BookmarkIcon from '@/svgs/bookmark.svg'
import WatchedIcon from '@/svgs/watched.svg'
import UnwatchedIcon from '@/svgs/unwatched.svg'
import ImageIcon from '@/svgs/image.svg'

const FilmListItem: FC<{ film: FilmItem }> = ({ film }) => {
  const { Poster, Title, Type, Year, imdbID } = film
  const { bookmarkedMovies, toggleBookmark, toggleWatched } = useContext(BookmarkContext)!

  const handleBookmark = useCallback(() => {
    toggleBookmark(film)
  }, [film, toggleBookmark])

  const isBookmarked = !!bookmarkedMovies[imdbID]
  const hasWatched = bookmarkedMovies[imdbID]?.watched

  return (
    <AccordionItem key={imdbID}>
      {({ isExpanded }) => (
        <>
          <Flex height='120px' marginY={3} justifyContent={'flex-start'}>
            <Flex
              width='80px'
              backgroundColor={'#333333'}
              align={'center'}
              justify={'center'}
              flexShrink={0}
              minH={0}
              overflow={'hidden'}
            >
              {Poster !== 'N/A' ? (
                <Img
                  src={Poster}
                  alt={`${Title} Poster`}
                  objectFit='scale-down'
                  backgroundColor={'#222222'}
                  color={'lightgray'}
                  fontSize={'12px'}
                />
              ) : (
                <ImageIcon className={styles.imageIcon} />
              )}
            </Flex>
            <Flex
              className={styles.listDetails}
              minW={0}
              flexDir={'column'}
              justifyContent={'space-between'}
              flexGrow={1}
            >
              <Box paddingLeft={['2', '4']}>
                <Text fontSize={['lg', '2xl']} fontWeight={'extrabold'}>
                  {Title}
                </Text>
                <Text marginLeft={1} as='b'>{`(${Year})`}</Text>
                <Text marginLeft={1}>{Type}</Text>
              </Box>
              <Flex justifyContent={'flex-end'} alignItems={'flex-end'}>
                <Flex alignItems={'center'}>
                  {hasWatched ? (
                    <WatchedIcon
                      className={`${styles.watched} ${isBookmarked && styles.enabled} ${
                        hasWatched && styles.hasWatched
                      }`}
                      onClick={() => toggleWatched(imdbID)}
                    />
                  ) : (
                    <UnwatchedIcon
                      className={`${styles.watched} ${isBookmarked && styles.enabled} ${
                        hasWatched && styles.hasWatched
                      }`}
                      onClick={() => toggleWatched(imdbID)}
                    />
                  )}
                </Flex>
                <Flex alignItems={'center'}>
                  <BookmarkIcon
                    className={`${styles.bookmark} ${isBookmarked && styles.bookmarked}`}
                    onClick={handleBookmark}
                  />
                </Flex>
                <h2>
                  <AccordionButton border={'1px solid lightgray'} borderRadius={'8'}>
                    <Box as='span' flex='1' textAlign='left'></Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
              </Flex>
            </Flex>
          </Flex>
          <AccordionPanel pb={4}>{isExpanded && <FilmDetails imdbID={imdbID} />}</AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
}

export default FilmListItem
