'use client';

import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-4 bg-light border-top">
    <Container>
      <Col className="text-center">
        <span className="fw-semibold">Mānoa Club Compass</span>
        <span className="mx-2 text-muted">·</span>
        UH Mānoa student organization directory
      </Col>
    </Container>
  </footer>
);

export default Footer;
