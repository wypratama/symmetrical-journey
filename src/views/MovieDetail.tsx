import styled from '@emotion/styled';
import { useLocation, useParams } from 'react-router-dom';
import useFetchDetail from '../hooks/useFetchDetail';
import getImage from '../utils/getImage';
import { ReactComponent as Clock } from '../assets/img/clock.svg';
import { ReactComponent as Star } from '../assets/img/star.svg';
import { ReactComponent as Heart } from '../assets/img/heart.svg';
import { ReactComponent as HeartFilled } from '../assets/img/heart-filled.svg';
import useWatchList from '../hooks/useWatchList';
import { ILocation, IMovieDetail, ISeriesDetail } from '../utils/types';

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
  `,
  AdditionalDetail = styled.div`
    display: grid;
    font-size: 12px;
    grid-template-columns: 1fr 1fr;
    row-gap: 3px;
  `;

function MovieDetail() {
  const { id } = useParams(),
    location = useLocation() as ILocation,
    movieId = id as string,
    type = location.state.type,
    { removeFromWatchList, addToWatchList, inWatchList } = useWatchList();
  type ResponseDetail<T extends typeof type> = T extends 'movie'
    ? IMovieDetail
    : ISeriesDetail;
  const { data, loading, error } = useFetchDetail<
      ResponseDetail<typeof type>,
      typeof type
    >(movieId, type),
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
  if (type === 'movie') {
    const info = data as IMovieDetail;
    return (
      <div style={{ marginBottom: '75px' }}>
        <Hero />
        <Detail>
          <h2>{info.title}</h2>
          <InfoTop>
            <div>
              <Clock />
              <span>{info.runtime} min</span>
            </div>
            <div>
              <Star />
              {info.vote_average}
            </div>
            <WishButton
              onClick={() => {
                inWatchList(info.id)
                  ? removeFromWatchList(info)
                  : addToWatchList(info, type);
              }}
            >
              {inWatchList(info.id) ? <HeartFilled /> : <Heart />}
              {inWatchList(info.id) ? 'Added to ' : 'Add to '}
              Watchlist
            </WishButton>
          </InfoTop>
          <InfoBottom>
            <h4>Release Date</h4>
            <span> {info.release_date} </span>
            <h4>Genre</h4>
            <PillGroup>
              {info.genres.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </PillGroup>
          </InfoBottom>
          <h4>Synopsis</h4>
          <p>{info.overview}</p>
          <h4 style={{ marginTop: '16px' }}>Movie Detail</h4>
          <AdditionalDetail>
            <span>Title</span>
            <span>{info.title}</span>
            <span>Original Title</span>
            <span>{info.original_title}</span>
            <span>Tagline</span>
            <span>{info.tagline}</span>
            <span>Budget</span>
            <span>{info.budget}</span>
            <span>Revenue</span>
            <span>{info.revenue}</span>
            <span>Status</span>
            <span>{info.status}</span>
            <span>Original Language</span>
            <span>{info.original_language} </span>
            <span>Homepage</span>
            <span>{info.homepage}</span>
          </AdditionalDetail>
        </Detail>
      </div>
    );
  } else {
    const info = data as ISeriesDetail;
    return (
      <div style={{ marginBottom: '75px' }}>
        <Hero />
        <Detail>
          <h2>{info.name}</h2>
          <InfoTop>
            <div>
              <Clock />
              <span>{info.episode_run_time[0]} min</span>
            </div>
            <div>
              <Star />
              {info.vote_average}
            </div>
            <WishButton
              onClick={() => {
                inWatchList(info.id)
                  ? removeFromWatchList(info)
                  : addToWatchList(info, type);
              }}
            >
              {inWatchList(info.id) ? <HeartFilled /> : <Heart />}
              {inWatchList(info.id) ? 'Added to ' : 'Add to '}
              Watchlist
            </WishButton>
          </InfoTop>
          <InfoBottom>
            <h4>Release Date</h4>
            <span> {info.first_air_date} </span>
            <h4>Genre</h4>
            <PillGroup>
              {info.genres.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </PillGroup>
          </InfoBottom>
          <h4>Synopsis</h4>
          <p>{info.overview}</p>
          <h4 style={{ marginTop: '16px' }}>Movie Detail</h4>
          <AdditionalDetail>
            <span>Title</span>
            <span>{info.name}</span>
            <span>Original Title</span>
            <span>{info.original_name}</span>
            <span>Tagline</span>
            <span>{info.tagline}</span>
            <span>Episode</span>
            <span>{info.number_of_episodes}</span>
            <span>Seasons</span>
            <span>{info.number_of_seasons}</span>
            <span>Status</span>
            <span>{info.in_production ? 'In Production' : 'Ended'}</span>
            <span>Original Language</span>
            <span>{info.original_language} </span>
            <span>Homepage</span>
            <span>{info.homepage}</span>
          </AdditionalDetail>
        </Detail>
      </div>
    );
  }
}

export default MovieDetail;
