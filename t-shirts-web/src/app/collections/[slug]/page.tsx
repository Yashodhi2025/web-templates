import { Suspense } from 'react';
import { CollectionClient } from './CollectionClient';

export function generateStaticParams() {
  return [
    { slug: 't-shirts' },
  ];
}

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const resolvedParams = await params;
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" role="status" aria-label="Loading collection" />}>
      <CollectionClient params={resolvedParams} />
    </Suspense>
  );
}
