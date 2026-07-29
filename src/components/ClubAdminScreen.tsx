'use client';

import { useEffect, useState } from 'react';
import { Button, Card, Container, Form, Alert, Spinner } from 'react-bootstrap';
import PageHeading from '@/components/PageHeading';

type ClubInterest =
  | 'ACADEMIC_PROFESSIONAL'
  | 'STEM'
  | 'RECREATION'
  | 'ARTS_CULTURE'
  | 'COMMUNITY_SERVICE';

type Club = {
  id?: number;
  name: string;
  description?: string | null;
  website?: string | null;
  contactEmail?: string | null;
  interest?: ClubInterest;
};

const interestOptions: Array<{ value: ClubInterest | ''; label: string }> = [
  { value: '', label: 'Select interest area' },
  { value: 'ACADEMIC_PROFESSIONAL', label: 'Academic & Professional' },
  { value: 'STEM', label: 'STEM' },
  { value: 'RECREATION', label: 'Recreation' },
  { value: 'ARTS_CULTURE', label: 'Arts & Culture' },
  { value: 'COMMUNITY_SERVICE', label: 'Community Service' },
];

const ClubAdminScreen = () => {
  const [club, setClub] = useState<Club>({ name: '', interest: undefined });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch('/api/clubs')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        if (data && data.name) setClub(data);
      })
      .catch(() => {})
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!club.interest) {
      setMessage('Please choose an interest area.');
      setSaving(false);
      return;
    }
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/clubs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...club, interest: club.interest ?? null }),
      });
      if (!res.ok) {
        const errorResponse = await res.text();
        const errorMessage =
          errorResponse === ''
            ? `Save failed with status ${res.status}`
            : errorResponse;
        throw new Error(errorMessage);
      }
      const data = await res.json();
      setClub(data);
      setMessage('Saved successfully.');
    } catch (err: unknown) {
  if (err instanceof Error) {
    setMessage(err.message);
  } else {
    setMessage('Save failed.');
  }
} finally {
      setSaving(false);
    }
  };

  const isNew = !club.id;

  return (
    <main>
      <PageHeading title="Club admin" description="Manage your organization's public profile." />
      <Container className="py-4">
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title>{isNew ? 'Add club profile' : 'Edit club profile'}</Card.Title>
            {loading ? (
              <div className="py-4 text-center"><Spinner animation="border" /></div>
            ) : (
              <Form className="mt-3" onSubmit={handleSubmit}>
                {message && <Alert variant={message.startsWith('Saved') ? 'success' : 'danger'}>{message}</Alert>}
                <Form.Group className="mb-3">
                  <Form.Label>Club name</Form.Label>
                  <Form.Control
                    required
                    value={club.name}
                    onChange={(e) => setClub({ ...club, name: e.target.value })}
                    placeholder="Your club name"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={club.description ?? ''}
                    onChange={(e) => setClub({ ...club, description: e.target.value })}
                    placeholder="Tell students about your club"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Interest area</Form.Label>
                  <Form.Select
                    required
                    value={club.interest ?? ''}
                    onChange={(e) => setClub({ ...club, interest: e.target.value as ClubInterest })}
                  >
                    {interestOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Website</Form.Label>
                  <Form.Control
                    value={club.website ?? ''}
                    onChange={(e) => setClub({ ...club, website: e.target.value })}
                    placeholder="https://example.org"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contact email</Form.Label>
                  <Form.Control
                    type="email"
                    value={club.contactEmail ?? ''}
                    onChange={(e) => setClub({ ...club, contactEmail: e.target.value })}
                    placeholder="contact@yourclub.org"
                  />
                </Form.Group>
                <Button type="submit" disabled={saving}>
                  {saving ? 'Saving...' : isNew ? 'Create club' : 'Save changes'}
                </Button>
              </Form>
            )}
          </Card.Body>
        </Card>
      </Container>
    </main>
  );
};

export default ClubAdminScreen;
