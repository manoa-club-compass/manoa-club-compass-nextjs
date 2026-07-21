'use client';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import PageHeading from '@/components/PageHeading';

const clubs = [
  ['Computer Science Club', 'Academic & Professional'],
  ['Hawaiʻi Robotics', 'STEM'],
  ['Outdoor Adventure Club', 'Recreation'],
];

const BrowseClubsPage = () => (
  <main>
    <PageHeading title="Browse clubs" description="Discover student organizations at UH Mānoa." />
    <Container className="py-4">
      <Row className="g-3 mb-4">
        <Col md={8}><Form.Control aria-label="Search clubs" placeholder="Search clubs" /></Col>
        <Col md={4}><Form.Select aria-label="Filter by category"><option>All categories</option><option>Academic & Professional</option><option>STEM</option><option>Recreation</option></Form.Select></Col>
      </Row>
      <Row className="g-4">
        {clubs.map(([name, category]) => (
          <Col md={4} key={name}><Card className="h-100 shadow-sm"><Card.Body><small className="text-primary fw-semibold">{category}</small><Card.Title className="mt-2">{name}</Card.Title><Card.Text className="text-muted">Club summary will be populated from the directory.</Card.Text><Button href="/club-details" variant="outline-primary">View details</Button></Card.Body></Card></Col>
        ))}
      </Row>
    </Container>
  </main>
);

export default BrowseClubsPage;
