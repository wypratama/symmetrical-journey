/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { ReactComponent as SearchIcon } from '../../../assets/img/search-icon.svg';
import axios from '../../../utils/axios';
import { IlistToDisplay, IMovie } from '../../../utils/types';

const styledInput = css`
    width: 100%;
    border-radius: 20px;
    height: 48px;
    background-color: #211f30;
    color: #bbbbbb;
    border: none;
    padding-left: 50px;
    &:placeholder {
    }
  `,
  styledInputContainer = css`
    position: relative;
    margin-top: 20px;
  `,
  styledSVG = css`
    height: 60%;
    width: auto;
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  `;

function Searchbar({
  setSearch,
  search,
  setSearchResult,
  setListToDisplay,
}: {
  setSearch: (search: string) => void;
  search: string;
  setSearchResult: (searchResults: IMovie[]) => void;
  setListToDisplay: (listToDisplay: IlistToDisplay) => void;
}) {
  const searchByQuery = (e: any) => {
    if (e.key === 'Enter') {
      axios
        .get('/search/multi', {
          params: {
            query: e.target.value,
            api_key: process.env.REACT_APP_API_KEY,
          },
        })
        .then(({ data }) => {
          const mapped = data.results
            .filter(
              (item: any) =>
                item.media_type === 'movie' || item.media_type === 'tv'
            )
            .map((item: any) => ({ ...item, type: item.media_type }));
          setSearchResult(mapped);
          setListToDisplay({ type: 'search' });
        });
    }
    if (!e.target.value) {
      setSearchResult([]);
      setListToDisplay({ type: 'movies' });
    }
  };

  return (
    <div css={styledInputContainer}>
      <SearchIcon css={styledSVG} />
      <input
        css={styledInput}
        type='text'
        value={search}
        onInput={(e: any) => setSearch(e.target.value)}
        placeholder='[Enter] to search'
        onKeyUp={searchByQuery}
      />
    </div>
  );
}

export default Searchbar;
