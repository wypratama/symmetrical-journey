/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { ReactComponent as SearchIcon } from '../../../assets/img/search-icon.svg';

function Searchbar() {
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
  return (
    <div css={styledInputContainer}>
      <SearchIcon css={styledSVG} />
      <input css={styledInput} type='text' placeholder='Search by name' />
    </div>
  );
}

export default Searchbar;
