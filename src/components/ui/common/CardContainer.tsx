import styled from '@emotion/styled';

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(
      clamp(
        clamp(
          100%/ (5 + 1) + 0.1%,
          (576px - 100vw) * 1000,
          100%/ (2 + 1) + 0.1%
        ),
        (350px - 100vw) * 1000,
        100%
      ),
      1fr
    )
  );
  gap: 20px;
`;
export default CardContainer;
