import { redirect } from 'next/navigation';
import { Role } from '@prisma/client';
import type { Session } from 'next-auth';

/**
 * Redirects to the login page if the user is not logged in.
 */
export const loggedInProtectedPage = (session: Session | null) => {
  if (!session?.user?.email) {
    redirect('/auth/signin');
  }
};

/**
 * Redirects to the login page if the user is not logged in.
 * Redirects to the not-authorized page if the user is not an admin.
 */
export const adminProtectedPage = (session: Session | null) => {
  loggedInProtectedPage(session);
  if (session && session.user.role !== Role.SUPER_ADMIN) {
    redirect('/not-authorized');
  }
};

/** Allow Club Admins and Super Admins to manage club data. */
export const clubAdminProtectedPage = (session: Session | null) => {
  loggedInProtectedPage(session);
  if (session && session.user.role !== Role.CLUB_ADMIN && session.user.role !== Role.SUPER_ADMIN) {
    redirect('/not-authorized');
  }
};
