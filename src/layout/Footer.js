import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
  return (
    <Container style={{ padding: '2rem' }}>
      <Row>
        <Col xs={6} style={{ paddingTop: "1rem" }}>Create by {"A12537"}</Col>
        <Col xs={6} style={{ paddingTop: "1rem" }}>Create time</Col>
        <Col xs={6} style={{ paddingTop: "1rem" }}>Update by</Col>
      </Row>
    </Container>
  )
}

export default Footer