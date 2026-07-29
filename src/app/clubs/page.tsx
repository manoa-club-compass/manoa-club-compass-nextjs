'use client';

import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import PageHeading from '@/components/PageHeading';

const interestLabels: Record<string, string> = {
  ACADEMIC_PROFESSIONAL: 'Academic & Professional',
  STEM: 'STEM',
  RECREATION: 'Recreation',
  ARTS_CULTURE: 'Arts & Culture',
  COMMUNITY_SERVICE: 'Community Service',
};

const BrowseClubsPage = () => {
  const [clubs, setClubs] = useState<Array<{
    id: number;
    name: string;
    description?: string | null;
    interest?: string | null;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterInterest, setFilterInterest] = useState('');

  useEffect(() => {
    let mounted = true;
    fetch('/api/clubs/list')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        setClubs(data || []);
      })
      .catch(() => {})
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const filteredClubs = clubs.filter((club) => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const matchesSearch =
      normalizedSearch.length === 0 ||
      club.name.toLowerCase().includes(normalizedSearch) ||
      (club.description ?? '').toLowerCase().includes(normalizedSearch) ||
      (interestLabels[club.interest ?? ''] ?? '').toLowerCase().includes(normalizedSearch);

    const matchesInterest =
      filterInterest === '' || club.interest === filterInterest;

    return matchesSearch && matchesInterest;
  });

  return (
    <main>
      <PageHeading title="Browse clubs" description="Discover student organizations at UH Mānoa." />
      <Container className="py-4">
        <Row className="g-3 mb-4">
          <Col md={8}>
            <Form.Control
              aria-label="Search clubs"
              placeholder="Search clubs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Form.Select
              aria-label="Filter by category"
              value={filterInterest}
              onChange={(e) => setFilterInterest(e.target.value)}
            >
              <option value="">All categories</option>
              {Object.entries(interestLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
        <Row className="g-4">
          {loading ? (
            <p>Loading clubs…</p>
          ) : filteredClubs.length === 0 ? (
            <p>No clubs found.</p>
          ) : (
            filteredClubs.map((club) => (
              <Col md={4} key={club.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <small className="text-primary fw-semibold">
                      {interestLabels[club.interest ?? ''] || 'Uncategorized'}
                    </small>
                    <Card.Title className="mt-2">{club.name}</Card.Title>
                    <Card.Text className="text-muted">{club.description ?? 'Club summary will be populated from the directory.'}</Card.Text>
                    <Button href={`/club-details/${club.id}`} variant="outline-primary">View details</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </main>
  );
};

export default BrowseClubsPage;
