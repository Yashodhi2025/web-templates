'use client';

import * as React from 'react';
import { StoreProvider } from '@/context/StoreContext';
import { CartDrawer } from '@/components/commerce/CartDrawer';
import { WishlistDrawer } from '@/components/commerce/WishlistDrawer';
import { SearchOverlay } from '@/components/commerce/SearchOverlay';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      {children}
      <CartDrawer />
      <WishlistDrawer />
      <SearchOverlay />
    </StoreProvider>
  );
}
