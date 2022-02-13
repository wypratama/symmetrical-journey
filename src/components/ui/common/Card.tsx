import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import getImage from '../../../utils/getImage';
import type { IMovie } from '../../../utils/types';

type CardProps = {
  movie: IMovie;
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

function Card({ movie }: CardProps) {
  const navigate = useNavigate(),
    goto = () => {
      navigate(`/detail/${movie.id}`);
    };
  return (
    <CardItem onClick={goto}>
      <img src={getImage(movie.poster_path)} alt={movie.title} />
      <span>
        {' '}
        {movie.title} ({movie.release_date.split('-')[0]}){' '}
      </span>
    </CardItem>
  );
}

export default Card;
