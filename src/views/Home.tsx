import styled from '@emotion/styled';
import {
  Searchbar,
  Card,
  CardContainer,
  Container,
} from '../components/ui/common';
import { useStateContext } from '../hooks/useStore';

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
    }
  }
`;

// margin-top: 24px;

function Home() {
  const {
    state: { movies },
  } = useStateContext();

  console.log(movies);
  return (
    <Container>
      <h2>Find Movies, Tv series, and more..</h2>
      <Searchbar />
      <SubNav>
        <ul>
          <li>Movie</li>
          <li>TV Series</li>
          <li>Documentary</li>
          <li>Action</li>
          <li>Sci-Fi</li>
          <li>Adventure</li>
        </ul>
      </SubNav>
      <CardContainer>
        {movies.map((movie: any) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </CardContainer>
    </Container>
  );
}
export default Home;
