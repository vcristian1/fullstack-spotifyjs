// SWR is a library to do data fetching and will store on your local machine similar to redux.
import useSWR from 'swr'
import fetcher from './fetcher'

export const useMe = () => {
  const { data, error } = useSWR('/me', fetcher)

  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  }
}

export const usePlaylist = () => {
  const { data, error } = useSWR('/playlists', fetcher)

  return {
    playlists: data || [],
    isLoading: !data && !error,
    isError: error,
  }
}
