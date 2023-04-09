import { FilmSearch } from '@/types'
import { ActionMeta, AsyncSelect, SingleValue } from 'chakra-react-select'
import { useRouter } from 'next/router'
import { FC, useCallback, useRef, useState } from 'react'

type Option = { label: string; value: string }

const SearchBar: FC = () => {
  const { push } = useRouter()
  const [searchString, setSearchString] = useState('')
  const optionsRef = useRef<Option[]>([])
  const inputRef = useRef('')

  const handleSelect = useCallback(
    (selection: SingleValue<Option>, actionMeta: ActionMeta<Option>) => {
      push(`/filmResults?title=${selection?.value}`)
    },
    [push]
  )

  const handleKeyPress = useCallback(
    ({ code }: React.KeyboardEvent) => {
      if (code !== 'Enter' || optionsRef.current.length) return

      push(`/filmResults?title=${searchString}`)
    },
    [searchString, push]
  )

  const handleInputChange = useCallback((newValue: string) => {
    setSearchString(newValue)
    inputRef.current = newValue
  }, [])

  const searchFilms = useCallback(async (inputValue: string) => {
    if (inputValue.length < 3) return Promise.resolve([])
    const movieResults = (await fetch(`/api/search?searchString=${inputValue}`).then((data) =>
      data.json()
    )) as FilmSearch
    optionsRef.current = movieResults.Search.map(({ Title, imdbID }) => ({
      label: Title,
      value: Title,
    }))
    optionsRef.current = [{ label: inputRef.current, value: inputRef.current }, ...optionsRef.current]
    return optionsRef.current as any[]
  }, [])

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={searchFilms}
      onInputChange={handleInputChange}
      inputValue={searchString}
      onChange={handleSelect as (newValue: any, actionMeta: ActionMeta<any>) => void}
      placeholder='Find Films'
      noOptionsMessage={() => null}
      onKeyDown={handleKeyPress}
      components={{ DropdownIndicator: undefined }}
    />
  )
}

export default SearchBar
