import { prisma } from '@/lib/prisma';
import ClubDetailsClient from '@/components/ClubDetailsClient';
import PageHeading from '@/components/PageHeading';
import { Container } from 'react-bootstrap';

type Props = {
  params: {
    id: string;
  };
};

export default async function ClubDetailsPage({ params }: Props) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams?.id, 10);
  if (!Number.isInteger(id) || id <= 0) {
    return (
      <main>
        <PageHeading title="Club not found" description="No club matches that id." />
        <Container className="py-4">Not found</Container>
      </main>
    );
  }

  const club = await prisma.club.findUnique({ where: { id } });

  if (!club) {
    return (
      <main>
        <Container className="py-4">Club not found</Container>
      </main>
    );
  }

  return <ClubDetailsClient club={club} />;
}
