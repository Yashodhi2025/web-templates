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
  return <CollectionClient params={resolvedParams} />;
}
