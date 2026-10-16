'use client';

import { Suspense, type ComponentProps } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { NAV_LINKS } from '@/data/navigation';
import { useStore } from '@/context/StoreContext';

type Props = ComponentProps<typeof Link> & { label: string };

function ActiveLink({ label, onNavigate, className, ...props }: Props) {
  const pathname = usePathname();
  const query = useSearchParams();
  const { selectedNavigation, setSelectedNavigation } = useStore();
  const matches = NAV_LINKS.filter((item) => {
    const [path, search = ''] = item.href.split('?');
    const expected = new URLSearchParams(search);
    return pathname.replace(/\/$/, '') === path &&
      [...expected].every(([key, value]) => query.get(key) === value) &&
      [...query].every(([key, value]) => expected.get(key) === value);
  });
  // MEN, T-SHIRTS and COLLECTIONS share a URL; remember the chosen label.
  const active = matches.find((item) => item.label === selectedNavigation)
    ?? matches.find((item) => item.label === 'T-SHIRTS')
    ?? matches[0];

  return <Link {...props}
    className={`${className ?? ''} category-link`}
    aria-current={active?.label === label ? 'page' : undefined}
    onNavigate={(event) => {
      setSelectedNavigation(label);
      onNavigate?.(event);
    }}
  />;
}

export function NavigationLink(props: Props) {
  const { label, ...fallback } = props;
  return <Suspense fallback={<Link {...fallback} />}><ActiveLink {...props} /></Suspense>;
}
