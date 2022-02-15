/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { RefObject, useCallback, useEffect, useState } from 'react';
import {
  Searchbar,
  Card,
  CardContainer,
  Container,
} from '../components/ui/common';
import { useStateContext } from '../hooks/useStore';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import useFetchMovies from '../hooks/useFetchMovies';
import { IlistToDisplay, IMovie } from '../utils/types';

// const SubNav = styled.nav`
//   width: 100%;
//   position: relative;
//   height: 60px;

//   & > ul {
//     &::-webkit-scrollbar {
//       width: 1px;
//       height: 1px;
//     }

//     &::-webkit-scrollbar-button {
//       width: 1px;
//       height: 1px;
//     }
//     position: absolute;
//     display: block;
//     top: 0;
//     left: 0;
//     width: 40px;
//     max-height: 100vw;
//     margin: 0;
//     padding-top: 1px;
//     overflow-y: auto;
//     overflow-x: hidden;
//     transform: rotate(-90deg) translateY(-40px);
//     transform-origin: right top;
//     padding: 40px 0 0 0;

//     & > li {
//       display: block;
//       padding: 5px;
//       transform: rotate(90deg);
//       transform-origin: right top;
//       width: 40px;
//       height: 100px;
//       margin: 10px 0;
//     }
//   }
// `;
const SubNav = styled.nav`
  width: 100%;

  & > ul {
    &::-webkit-scrollbar {
      width: 1px;
      height: 1px;
    }

    &::-webkit-scrollbar-button {
      width: 1px;
      height: 1px;
    }
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    list-style-type: none;
    margin: 0;
    padding: 24px 0;
    gap: 24px;
    overflow-x: scroll;

    & > li {
      font-size: 16px;
      flex-shrink: 0;
      &.active {
        background: linear-gradient(244.07deg, #ff8f71 47.24%, #ef2d1a 120.34%);
        background-clip: text;
        color: transparent;
      }
    }
  }
`;

function Home() {
  const {
      state: { movies, moviePageInfo, series },
    } = useStateContext(),
    [search, setSearch] = useState(''),
    [searchResult, setSearchResult] = useState<IMovie[]>([]),
    [listToDisplay, setListToDisplay] = useState<IlistToDisplay>({
      type: 'movies',
    }),
    typeDisplay = useCallback(() => {
      const type = {
        movies,
        series,
        search: searchResult,
      };
      return type[listToDisplay.type] || type.movies;
    }, [movies, search, series, listToDisplay.type]),
    options = {
      root: null,
      rootMargin: '0px 0px 100px 0px',
      threshold: 1.0,
    },
    [referenced, isLast] = useInfiniteScroll(options),
    fetchMovie = useFetchMovies({ page: moviePageInfo + 1 }),
    atActive = useCallback(
      (type) => {
        if (listToDisplay.type === type) return 'active';
        return '';
      },
      [listToDisplay]
    );

  useEffect(() => {
    if (isLast) {
      fetchMovie();
    }
  }, [isLast]);

  return (
    <Container id='scrollArea'>
      <h2>Find Movies, Tv series, and more..</h2>
      <Searchbar
        setSearch={setSearch}
        search={search}
        setSearchResult={setSearchResult}
        setListToDisplay={setListToDisplay}
      />
      {searchResult.length ? (
        <div
          css={css`
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin: 0;
            padding: 24px 0;
          `}
        >
          <h4>Search result:</h4>
          <span
            onClick={() => {
              setSearchResult([]);
              setSearch('');
              setListToDisplay({ type: 'movies' });
            }}
          >
            clear search
          </span>
        </div>
      ) : (
        <SubNav>
          <ul>
            <li
              onClick={() => setListToDisplay({ type: 'movies' })}
              className={atActive('movies')}
            >
              Movie
            </li>
            <li
              onClick={() => setListToDisplay({ type: 'series' })}
              className={atActive('series')}
            >
              TV Series
            </li>
            <li>Documentary</li>
            <li>Action</li>
            <li>Sci-Fi</li>
            <li>Adventure</li>
          </ul>
        </SubNav>
      )}
      <CardContainer>
        {typeDisplay() ? (
          typeDisplay().map((movie: any, i: number) => (
            <Card
              key={movie.id}
              movie={movie}
              reference={
                i === movies.length - 1
                  ? (referenced as RefObject<HTMLDivElement>)
                  : undefined
              }
            />
          ))
        ) : (
          <h1 style={{ textAlign: 'center' }}>...</h1>
        )}
      </CardContainer>
    </Container>
  );
}
export default Home;
