import { redirect } from 'next/navigation';

export default function ClubDetailsRoot() {
  // Redirect the legacy /club-details page to the browse view.
  redirect('/clubs');
}
