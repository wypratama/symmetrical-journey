import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom';
import styled from '@emotion/styled';
import { ReactComponent as Homelogo } from '../../assets/img/home-basic.svg';
import { ReactComponent as HomeActive } from '../../assets/img/home-active.svg';
import { ReactComponent as Accountlogo } from '../../assets/img/account-basic.svg';
import { ReactComponent as AccountActive } from '../../assets/img/account-active.svg';
import { ReactChild } from 'react';

const Nav = styled.nav`
  width: 100%;
  height: 70px;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #15141f;
`;

function CustomLink({ children, to, ...props }: LinkProps) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  let element = children as ReactChild[];
  return (
    <div>
      <Link
        style={{ textDecoration: match ? 'underline' : 'none' }}
        to={to}
        {...props}
      >
        {match ? element[1] : element[0]}
      </Link>
    </div>
  );
}

function Navbar() {
  return (
    <Nav>
      <CustomLink to='/'>
        <Homelogo />
        <HomeActive />
      </CustomLink>
      <CustomLink to='/watchlist'>
        <Accountlogo />
        <AccountActive />
      </CustomLink>
    </Nav>
  );
}

export default Navbar;
