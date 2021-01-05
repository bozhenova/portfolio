import { Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';

const AppNavbar = () => {
  return (
    <div className='navbar-wrapper'>
      <Navbar expand='lg' className='navbar-dark fj-mw9'>
        <Link href='/'>
          <a className='navbar-brand mr-3 font-weight-bold'>MargoBozhenova</a>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className='mr-auto'>
            <Link href='/portfolio'>
              <a className='mr-3 nav-link'>Portfolio</a>
            </Link>
            <Link href='/forum/categories'>
              <a className='mr-3 nav-link'>Forum</a>
            </Link>
            <Link href='/cv'>
              <a className='mr-3 nav-link'> CV</a>
            </Link>
          </Nav>
          <Nav>
            <Link href='/login'>
              <a className='mr-3 nav-link'> Sign In</a>
            </Link>
            <Link href='/signup'>
              <a className='mr-3 btn btn-success bg-green-2 bright'>Sign Up</a>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
