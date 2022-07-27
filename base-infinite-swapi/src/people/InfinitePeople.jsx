import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from 'react-query'
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  // TODO: get data for InfiniteScroll via React Query
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isError, error } = useInfiniteQuery(
    'sw-people',
    ({ pageParm = initialUrl }) => fetchUrl(pageParm),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined
    }
  )

  if (isLoading) return <div className="loading">Loading...</div>
  if (isError) return <div>Error! {error.toString()}</div>
  return (
    <>
    {isFetching && <div className="loading">Loading...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {
          data.pages.map(pageData => {
            return pageData.results.map(peron => {
              return (
                <Person
                  key={peron.name}
                  name={peron.name}
                  hairColor={peron.hair_color}
                  eyeColor={peron.eye_color}
                />
              )
            })
          })
        }
      </InfiniteScroll>
    </>

  )
}
