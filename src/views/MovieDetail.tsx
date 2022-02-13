import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import useFetchDetail from '../hooks/useFetchDetail';
import getImage from '../utils/getImage';
import { ReactComponent as Clock } from '../assets/img/clock.svg';
import { ReactComponent as Star } from '../assets/img/star.svg';
import { ReactComponent as Heart } from '../assets/img/heart.svg';
import { ReactComponent as HeartFilled } from '../assets/img/heart-filled.svg';
import useWatchList from '../hooks/useWatchList';

const Detail = styled.div`
    padding: 24px;
    & > p {
      font-size: 14px;
      text-align: justify;
    }
  `,
  InfoTop = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 12px;
    padding: 8px 0 15px 0;
    align-items: center;
    gap: 12px;
    & > div {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  `,
  InfoBottom = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 1fr;
    grid-auto-flow: column;
    align-items: start;
    padding: 1rem 0;
    margin-bottom: 16px;
    border-top: 0.2px solid #1f1d30;
    border-bottom: 0.2px solid #1f1d30;
    row-gap: 6px;

    & span {
      font-size: 12px;
    }
  `,
  PillGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    & > span {
      padding: 2px 8px;
      background: rgba(250, 240, 202, 0.05);
      border-radius: 15px;
      backdrop-filter: blur(4.81px);
    }
  `,
  WishButton = styled.span`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    background: #ffd600;
    color: #1f1d30;
    margin-left: auto;
    padding: 8px 16px;
    border-radius: 20px;
  `;

function MovieDetail() {
  const { id } = useParams(),
    movieId = id as string,
    { data, loading, error } = useFetchDetail(movieId),
    { watchList, removeFromWatchList, addToWatchList, inWatchList } =
      useWatchList(),
    Hero = styled.div`
      height: 40vmin;
      min-height: 287px;
      background-image: url(${getImage(data?.backdrop_path || '', 'original')});
      background-attachment: fixed;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    `;

  if (loading) return <div>Loading...</div>;
  if (!data || error) return <div>No Data</div>;
  console.log(inWatchList(data.id), watchList);
  return (
    <div style={{ marginBottom: '75px' }}>
      <Hero />
      <Detail>
        <h2>{data.title}</h2>
        <InfoTop>
          <div>
            <Clock />
            <span>{data.runtime} min</span>
          </div>
          <div>
            <Star />
            {data.vote_average}
          </div>
          <WishButton
            onClick={() => {
              inWatchList(data.id)
                ? removeFromWatchList(data)
                : addToWatchList(data);
            }}
          >
            {inWatchList(data.id) ? <HeartFilled /> : <Heart />}
            {inWatchList(data.id) ? 'Added to ' : 'Add to '}
            Watchlist
          </WishButton>
        </InfoTop>
        <InfoBottom>
          <h4>Release Date</h4>
          <span> {data.release_date} </span>
          <h4>Genre</h4>
          <PillGroup>
            {data.genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </PillGroup>
        </InfoBottom>
        <h4>Synopsis</h4>
        <p>{data.overview}</p>
      </Detail>
    </div>
  );
}

export default MovieDetail;
