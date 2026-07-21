'use client';

import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';
import PageHeading from '@/components/PageHeading';

const ClubDetailsPage = () => (
  <main>
    <PageHeading title="Club details" description="A public profile for a UH Mānoa student organization." />
    <Container className="py-4">
      <Row className="g-4"><Col lg={8}><Card className="shadow-sm"><Card.Body><Badge bg="success">STEM</Badge><Card.Title className="h2 mt-3">Club name</Card.Title><Card.Text className="text-muted">This space will introduce the club, its mission, and the students it serves.</Card.Text><hr /><h2 className="h5">About</h2><p className="mb-0">Club leaders will add their organization description here.</p></Card.Body></Card></Col><Col lg={4}><Card className="shadow-sm"><Card.Body><Card.Title>Contact</Card.Title><p className="text-muted">Meeting schedule and contact links will appear here.</p><Button disabled>Contact club</Button></Card.Body></Card></Col></Row>
    </Container>
  </main>
);

export default ClubDetailsPage;
