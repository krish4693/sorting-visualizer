// app/not-found.jsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>The page you were looking for does not exist.</p>
      <Link href="/">Go back home</Link>
    </div>
  );
}