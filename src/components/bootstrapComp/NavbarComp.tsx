import { Fragment, useState } from 'react';
import { Navbar, Nav, Container, Button, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import LoginDialog from './LoginDialog';
import { useLoginContext } from '../../LoginContext';
import { removeJWT } from '../../JWTManager';

export default function NavbarComp() {
  const [showDialog, setShowDialog] = useState(false);
  const { loginInfo, setLoginInfo } = useLoginContext();
  const handleCloseDialog = () => setShowDialog(false);
  const handleShowDialog = () => setShowDialog(true);

  const doLogout = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginInfo(null);
    removeJWT();
  }

  return (
    <Fragment>
      <Navbar bg="light" data-bs-theme="light" expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand>MyShopLists</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 align-items-center"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <LinkContainer to="/shopper">
                <Nav.Link>Shopper</Nav.Link>
              </LinkContainer>
              {loginInfo ? (
                <>
                  {loginInfo.role === "a" && (
                    <LinkContainer to="/admin">
                      <Nav.Link>Admin</Nav.Link>
                    </LinkContainer>
                  )}
                  <LinkContainer to="/prefs">
                    <Nav.Link>Prefs</Nav.Link>
                  </LinkContainer>
                  <Form onSubmit={doLogout}>
                    <Button
                      variant="link"
                      className="nav-link"
                      type="submit"
                    >
                      Logout
                    </Button>
                  </Form>
                </>
              ) : (
                <>
                  <Button
                    variant="link"
                    className="nav-link"
                    onClick={handleShowDialog}
                  >
                    Login
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LoginDialog show={showDialog} handleClose={handleCloseDialog} />
    </Fragment>
  );
}
