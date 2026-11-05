// Page loaders, one per code-split chunk. Home and the ad landing pages stay in the main bundle
// (they are the entry pages); everything else downloads only when visited.
// main.jsx calls preloadRoute() BEFORE the first React render so the prerendered HTML stays on
// screen until the matching chunk is ready (no blank flash, no layout jump).
export const loaders = {
  Blog: () => import('../pages/Blog'),
  BlogPost: () => import('../pages/BlogPost'),
  About: () => import('../pages/About'),
  IndustrialServices: () => import('../pages/IndustrialServices'),
  FoodServices: () => import('../pages/FoodServices'),
  IntelligentChemicals: () => import('../pages/IntelligentChemicals'),
  TellabsChemicals: () => import('../pages/TellabsChemicals'),
  Contact: () => import('../pages/Contact'),
  ManpowerSupply: () => import('../pages/ManpowerSupply'),
  RiceProducts: () => import('../pages/RiceProducts'),
  OilProducts: () => import('../pages/OilProducts'),
  PrivacyPolicy: () => import('../pages/Legal').then(m => ({ default: m.PrivacyPolicy })),
  Terms: () => import('../pages/Legal').then(m => ({ default: m.Terms })),
  AdminRoutes: () => import('../pages/admin/AdminRoutes'),
  Chatbot: () => import('../components/Chatbot'),
};

const EXACT = {
  '/blog': 'Blog',
  '/about': 'About',
  '/contact': 'Contact',
  '/industrial-services': 'IndustrialServices',
  '/food-services': 'FoodServices',
  '/intelligent-chemicals': 'IntelligentChemicals',
  '/tellabs-chemicals': 'TellabsChemicals',
  '/manpower-supply': 'ManpowerSupply',
  '/rice-products': 'RiceProducts',
  '/oil-products': 'OilProducts',
  '/privacy-policy': 'PrivacyPolicy',
  '/terms': 'Terms',
};

export function preloadRoute(pathname) {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  let name = EXACT[path];
  if (!name && path.startsWith('/blog/')) name = 'BlogPost';
  if (!name && (path === '/admin' || path.startsWith('/admin/'))) name = 'AdminRoutes';
  return name ? loaders[name]().catch(() => {}) : Promise.resolve();
}
