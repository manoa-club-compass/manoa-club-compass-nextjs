'use client';

import { Container } from 'react-bootstrap';

type PageHeadingProps = {
  title: string;
  description: string;
};

/** Shared heading for the M1 screen skeletons. */
const PageHeading = ({ title, description }: PageHeadingProps) => (
  <section className="bg-light border-bottom py-4">
    <Container>
      <h1 className="h2 mb-1">{title}</h1>
      <p className="text-muted mb-0">{description}</p>
    </Container>
  </section>
);

export default PageHeading;
