'use client';

import { Badge, Button, Card, Container, Table } from 'react-bootstrap';
import PageHeading from '@/components/PageHeading';

const AdminDashboardPage = () => (
  <main>
    <PageHeading title="Admin dashboard" description="Review organization profiles and directory access." />
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Card.Title className="mb-0">Club review queue</Card.Title>
            <Button size="sm" disabled>Add category</Button>
          </div>
          <Table responsive hover className="mb-0">
            <thead><tr><th>Club</th><th>Category</th><th>Status</th><th aria-label="Actions" /></tr></thead>
            <tbody><tr><td>Example club</td><td>STEM</td><td><Badge bg="warning" text="dark">Pending</Badge></td><td><Button size="sm" variant="outline-primary" disabled>Review</Button></td></tr></tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  </main>
);

export default AdminDashboardPage;
