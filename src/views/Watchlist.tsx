import styled from '@emotion/styled';
import { Card, CardContainer, Container } from '../components/ui/common';
import useWatchList from '../hooks/useWatchList';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;
const RemoveButton = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 14px;
  font-weight: 500;
  background: #e92b44;
  color: #fff;
  padding: 4px 8px;
  border-radius: 20px;
`;

function Watchlist() {
  const {
    watchList,
    reload,
    addToWatchList,
    removeFromWatchList,
    inWatchList,
  } = useWatchList();
  return (
    <Container>
      <h2 style={{ marginBottom: '16px' }}>Watchlist</h2>
      {watchList.length ? (
        <CardContainer>
          {watchList.map((movie: any) => (
            <CardWrapper key={movie.id}>
              <Card movie={movie} />
              <RemoveButton
                onClick={() => {
                  removeFromWatchList(movie);
                }}
              >
                Remove
              </RemoveButton>
            </CardWrapper>
          ))}
        </CardContainer>
      ) : (
        <div>
          <h3>You have no movies in your watchlist</h3>
        </div>
      )}
    </Container>
  );
}
export default Watchlist;
