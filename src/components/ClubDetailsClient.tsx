'use client';

import PageHeading from './PageHeading';
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';

type Club = {
  id: number;
  name: string;
  description?: string | null;
  website?: string | null;
  contactEmail?: string | null;
  interest?: string | null;
};

const interestLabels: Record<string, string> = {
  ACADEMIC_PROFESSIONAL: 'Academic & Professional',
  STEM: 'STEM',
  RECREATION: 'Recreation',
  ARTS_CULTURE: 'Arts & Culture',
  COMMUNITY_SERVICE: 'Community Service',
};

export default function ClubDetailsClient({ club }: { club: Club }) {
  const interestLabel = interestLabels[club.interest ?? ''] ?? 'Uncategorized';
  const summary =
    club.description ?? 'This space will introduce the club, its mission, and the students it serves.';
  const aboutText =
    club.description || 'Club leaders will add their organization description here.';

  return (
    <main>
      <PageHeading
        title="Club details"
        description="A public profile for a UH Mānoa student organization."
      />
      <Container className="py-5">
        <Row className="g-4">
          <Col lg={8}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <Badge bg="primary" className="text-uppercase">
                    {interestLabels[club.interest ?? ''] ?? 'Uncategorized'}
                  </Badge>
                </div>
                <Card.Title className="h3">{club.name}</Card.Title>
                {!club.description && (
                  <Card.Text className="text-muted mb-4">{summary}</Card.Text>
                )}
                <hr />
                <h2 className="h5 mb-3">About</h2>
                <p className="mb-0 text-body-secondary">{aboutText}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <Card.Title>Contact</Card.Title>
                <p className="text-muted mb-4">
                  {club.contactEmail
                    ? club.contactEmail
                    : 'Meeting schedule and contact links will appear here.'}
                </p>
                <Button
                  href={club.contactEmail ? `mailto:${club.contactEmail}` : undefined}
                  disabled={!club.contactEmail}
                >
                  Contact club
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
