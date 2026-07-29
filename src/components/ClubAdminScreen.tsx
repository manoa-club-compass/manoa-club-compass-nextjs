'use client';

import { Button, Card, Container, Form } from 'react-bootstrap';
import PageHeading from '@/components/PageHeading';

const ClubAdminScreen = () => (
  <main>
    <PageHeading title="Club admin" description="Manage your organization&apos;s public profile." />
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title>Edit club profile</Card.Title>
          <Form className="mt-3">
            <Form.Group className="mb-3"><Form.Label>Club name</Form.Label><Form.Control placeholder="Your club name" /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Description</Form.Label><Form.Control as="textarea" rows={4} placeholder="Tell students about your club" /></Form.Group>
            <Button disabled>Save changes</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  </main>
);

export default ClubAdminScreen;
