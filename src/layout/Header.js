import React, { useCallback, useState } from 'react';
import { Navbar, Nav, Container, Offcanvas, Button, Row, Col } from 'react-bootstrap';
import { BsArrowRepeat, BsUpload, BsSearch } from 'react-icons/bs';


import '../styles/layout/Header.scss';

const Header = () => {

  // const [show, setShow] = useState(false);
  // const handleClose = useCallback(() => {
  //   setShow(false);
  // })
  // const handleShow = useCallback(() => {
  //   setShow(true);
  // })

  return (
    <>
      <Navbar bg="light" expand={false} sticky="top" >
        <Container
          fluid={"xxl"}
        >
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Brand
            className="text-center"
            style={{
              fontWeight: "bold",
              fontSize: "26px",
              margin: "0",
              textWrap: "wrap"
            }}
          >
            [ATAL]合格人員 – 工作前安全會議
          </Navbar.Brand>
          <Nav className="header-right">
            <Container className="icons_section">
              <Row>
                <Col>
                  <Nav.Link>
                    <BsArrowRepeat size={"2rem"} />
                  </Nav.Link>
                </Col>
                <Col>
                  <Nav.Link>
                    <BsUpload size={"2rem"} />
                  </Nav.Link>
                </Col>
                <Col>
                  <Nav.Link>
                    <BsSearch size={"2rem"} />
                  </Nav.Link>
                </Col>
              </Row>
            </Container>
          </Nav>
          <Navbar.Offcanvas id="responsive-navbar-nav">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </ >
  )
}

export default Header