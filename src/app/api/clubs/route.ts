import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const ownerId = session.user.id ? Number(session.user.id) : null;
  if (!ownerId) return NextResponse.json(null);

  const club = await prisma.club.findUnique({ where: { ownerId } });
  return NextResponse.json(club ?? null);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let ownerId = session.user.id ? Number(session.user.id) : null;
  if (!ownerId) {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (user) ownerId = user.id;
  }

  if (!ownerId) {
    return NextResponse.json({ error: 'No owner' }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body.name !== 'string') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const data = {
    name: body.name,
    description: body.description ?? null,
    website: body.website ?? null,
    contactEmail: body.contactEmail ?? null,
    interest: body.interest ?? null,
    ownerId,
  };

  const club = await prisma.club.upsert({
    where: { ownerId },
    update: data,
    create: data,
  });

  return NextResponse.json(club);
}
