import type { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: '*',
      allow: '/',
    },
  ],
  host: 'https://fm-age-calculator.znagy.hu',
  sitemap: 'https://fm-age-calculator.znagy.hu/sitemap.xml',
});

export default robots;
