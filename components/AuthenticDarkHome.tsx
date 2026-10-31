import HomeMarkDefs from '@/components/home/HomeMarkDefs';
import HomeHeroExact from '@/components/home/HomeHeroExact';
import HomeMarqueeExact from '@/components/home/HomeMarqueeExact';
import HomeServicesExact from '@/components/home/HomeServicesExact';
import HomeWorkExact from '@/components/home/HomeWorkExact';
import HomeProcessExact from '@/components/home/HomeProcessExact';
import HomeQuoteExact from '@/components/home/HomeQuoteExact';
import HomePraiseExact from '@/components/home/HomePraiseExact';
import HomeAboutExact from '@/components/home/HomeAboutExact';
import HomeFaqExact from '@/components/home/HomeFaqExact';
import HomeCtaExact from '@/components/home/HomeCtaExact';
import HomeFooterExact from '@/components/home/HomeFooterExact';
import HomeClient from '@/components/home/HomeClient';

/**
 * Authentic home — composed of real Next section components (Exact pattern).
 * Interactions hydrate via HomeClient after idle.
 */
export default function AuthenticDarkHome() {
  return (
    <>
      <HomeMarkDefs />
      <main id="top">
        <HomeHeroExact />
        <HomeMarqueeExact />
        <HomeServicesExact />
        <HomeWorkExact />
        <HomeProcessExact />
        <HomeQuoteExact />
        <HomePraiseExact />
        <HomeAboutExact />
        <HomeFaqExact />
        <HomeCtaExact />
      </main>
      <HomeFooterExact />
      <HomeClient />
    </>
  );
}
