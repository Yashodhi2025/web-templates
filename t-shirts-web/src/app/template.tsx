import type { ReactNode } from 'react';

export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter flex min-h-screen flex-1 flex-col">{children}</div>;
}
