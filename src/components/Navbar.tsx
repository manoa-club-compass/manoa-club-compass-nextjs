'use client';

import { useSession } from 'next-auth/react'; // v5 compatible
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, Lock, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar: React.FC = () => {
  const { data: session, status } = useSession();
  const pathName = usePathname();
  if (status === 'loading') return null;
  const currentUser = session?.user?.email;
  const role = session?.user?.role;
  const canManageClubs = role === 'CLUB_ADMIN' || role === 'SUPER_ADMIN';
  const isSuperAdmin = role === 'SUPER_ADMIN';
  return (
    <Navbar bg="white" expand="lg" className="border-bottom shadow-sm" sticky="top">
      <Container>
        <Navbar.Brand href="/" className="fw-semibold text-primary">Mānoa Club Compass</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            <Nav.Link href="/clubs" active={pathName === '/clubs'}>Browse clubs</Nav.Link>
            {canManageClubs && <Nav.Link href="/club-admin" active={pathName === '/club-admin'}>Club admin</Nav.Link>}
            {isSuperAdmin && <Nav.Link href="/admin-dashboard" active={pathName === '/admin-dashboard'}>Admin dashboard</Nav.Link>}
          </Nav>
          <Nav>
            {session ? (
              <NavDropdown id="login-dropdown" title={currentUser}>
                <NavDropdown.Item id="login-dropdown-sign-out" href="/api/auth/signout">
                  <BoxArrowRight />
                  Sign Out
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-change-password" href="/auth/change-password">
                  <Lock />
                  Change Password
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" href="/auth/signin">
                  <PersonFill />
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" href="/auth/signup">
                  <PersonPlusFill />
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
