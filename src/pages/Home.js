import React from 'react'


import '../styles/pages/Home.scss';
import { Container } from 'react-bootstrap';
import EFormComponent from '../components/EFormComponent';

const Home = () => {

    return (
        <Container style={{ padding: '2rem' }}>
            <EFormComponent />
        </Container>
    )
}

export default Home