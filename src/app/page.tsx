'use client';

import { Button, Card, Col, Container, Row } from 'react-bootstrap';

/** The Home page. */
const Home = () => (
  <main>
    <section className="landing-hero py-5">
      <Container className="py-md-5 text-center">
        <p className="text-uppercase fw-semibold text-primary mb-2">UH Mānoa club directory</p>
        <h1 className="display-5 fw-bold">Find your place at Mānoa.</h1>
        <p className="lead mx-auto mt-3 mb-4 landing-copy">
          Explore student organizations by interest, learn what they do, and find a community to join.
        </p>
        <Button href="/clubs" size="lg" className="me-2">Browse clubs</Button>
        <Button href="/auth/signin" variant="outline-primary" size="lg">Sign in</Button>
      </Container>
    </section>

    <Container className="py-5">
      <Row className="g-4">
        <Col md={4}><Card className="h-100 border-0 shadow-sm"><Card.Body><Card.Title>Browse</Card.Title><Card.Text>Filter organizations by category and discover clubs that match your interests.</Card.Text></Card.Body></Card></Col>
        <Col md={4}><Card className="h-100 border-0 shadow-sm"><Card.Body><Card.Title>Learn</Card.Title><Card.Text>See a club&apos;s mission, meeting details, contact information, and social links.</Card.Text></Card.Body></Card></Col>
        <Col md={4}><Card className="h-100 border-0 shadow-sm"><Card.Body><Card.Title>Manage</Card.Title><Card.Text>Club leaders can keep their organization profile accurate and welcoming.</Card.Text></Card.Body></Card></Col>
      </Row>
    </Container>
  </main>
);

export default Home;
