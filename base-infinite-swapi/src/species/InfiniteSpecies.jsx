import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from 'react-query'
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};



export function InfiniteSpecies() {
  // TODO: get data for InfiniteScroll via React Query
  const { data, error, isLoading, isError, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery('sw-species',
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined
    }
  )
  if (isLoading) return <div className='loading'>Loading...</div>
  if (isError) return <div>Error!{error.toString()}</div>

  console.log(data.pages);
  // name, language, averageLifespan
  return (
    <>
    {isFetching && <div className="loading">Loading...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}  >
        {data.pages.map((pageData) => {
          return pageData.results.map((spece) => {
            return (
              <Species key={spece.name} name={spece.name} language={spece.language} averageLifespan={spece.average_lifespan} />
            )
          })
        })}
      </InfiniteScroll>
    </>

  )
}
