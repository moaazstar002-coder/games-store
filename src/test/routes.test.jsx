import { describe, it, expect } from 'vitest';

describe('Page Components and Route Imports', () => {
  const pages = [
    { name: 'Home', importFn: () => import('../pages/Home') },
    { name: 'GameDetails', importFn: () => import('../pages/GameDetails') },
    { name: 'AllGames', importFn: () => import('../pages/AllGames') },
    { name: 'BestSellers', importFn: () => import('../pages/BestSellers') },
    { name: 'Consoles', importFn: () => import('../pages/Consoles') },
    { name: 'Accessories', importFn: () => import('../pages/Accessories') },
    { name: 'WishList', importFn: () => import('../pages/WishList') },
    { name: 'Cart', importFn: () => import('../pages/Cart') },
    { name: 'Checkout', importFn: () => import('../pages/Checkout') },
    { name: 'About', importFn: () => import('../pages/About') },
    { name: 'ContactUs', importFn: () => import('../pages/ContactUs') },
    { name: 'PrivacyPolicy', importFn: () => import('../pages/PrivacyPolicy') },
    { name: 'TermsOfService', importFn: () => import('../pages/TermsOfService') },
    { name: 'HelpCenter', importFn: () => import('../pages/HelpCenter') },
    { name: 'NotFound', importFn: () => import('../pages/NotFound') },
  ];

  pages.forEach(({ name, importFn }) => {
    it(`should successfully import ${name} page component`, async () => {
      const module = await importFn();
      expect(module.default).toBeDefined();
      expect(typeof module.default).toBe('function');
    }, 15000);
  });
});
