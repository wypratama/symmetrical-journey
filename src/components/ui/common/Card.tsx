import styled from '@emotion/styled';
import { RefObject } from 'react';
import { useNavigate } from 'react-router-dom';
import getImage from '../../../utils/getImage';
import type { IMovie, ISeries } from '../../../utils/types';

type CardProps = {
  movie: IMovie | ISeries;
  reference?: RefObject<HTMLDivElement> | undefined;
};

const CardItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  & > img {
    width: 100%;
    border-radius: 20px;
  }
`;

function Card({ movie, reference }: CardProps) {
  console.log(movie, 'dari card');
  const navigate = useNavigate(),
    goto = () => {
      navigate(`/${movie.type}/${movie.id}`, {
        state: { type: movie.type },
      });
    };
  return (
    <CardItem onClick={goto} className='card-item' ref={reference}>
      <img src={getImage(movie.poster_path)} alt={'img'} />
      <span>
        {' '}
        {movie.type === 'tv' && movie.name}{' '}
        {movie.type === 'movie' && movie.title} (
        {movie.type === 'movie' && movie.release_date.split('-')[0]}{' '}
        {movie.type === 'tv' && movie.first_air_date.split('-')[0]})
      </span>
    </CardItem>
  );
}

export default Card;
