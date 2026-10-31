/**
 * Temporary dummy imagery for the branding section.
 *
 * Every entry is a remote Unsplash URL so the layout can be reviewed before the
 * real brand assets exist. Replace the values with local paths such as
 * `/images/branding/codestreaks/hero.webp`, no component changes are needed.
 */

const UNSPLASH = 'https://images.unsplash.com';

function shot(id: string, width = 1800): string {
  return `${UNSPLASH}/${id}?auto=format&fit=crop&w=${width}&q=80`;
}

export const dummyBrandingImages = {
  codestreaks: {
    hero: shot('photo-1531297484001-80022131f5a1', 2200),
    strategy: shot('photo-1460925895917-afdab827c52f'),
    lockups: shot('photo-1518770660439-4636190af475'),
    palette: shot('photo-1481349518771-20055b2a7b24'),
    pattern: shot('photo-1517336714731-489689fd1ca8'),
    useDigital: shot('photo-1497366754035-f200968a6e72'),
    useSignage: shot('photo-1524758631624-e2822e304c36'),
    useSocial: shot('photo-1526170375885-4d8ecf77b99f'),
  },
  northbound: {
    hero: shot('photo-1442512595331-e89e73853f31', 2200),
    strategy: shot('photo-1495474472287-4d71bcdd2085'),
    lockups: shot('photo-1514432324607-a09d9b4aefdd'),
    palette: shot('photo-1447933601403-0c6688de566e'),
    pattern: shot('photo-1509042239860-f550ce710b93'),
    useDigital: shot('photo-1453614512568-c4024d13c247'),
    useSignage: shot('photo-1554118811-1e0d58224f24'),
    useSocial: shot('photo-1521017432531-fbd92d768814'),
  },
  meridian: {
    hero: shot('photo-1519494026892-80bbd2d6fd0d', 2200),
    strategy: shot('photo-1576091160399-112ba8d25d1d'),
    lockups: shot('photo-1505751172876-fa1923c5c528'),
    palette: shot('photo-1579684385127-1ef15d508118'),
    pattern: shot('photo-1516549655169-df83a0774514'),
    useDigital: shot('photo-1551076805-e1869033e561'),
    useSignage: shot('photo-1538108149393-fbbd81895907'),
    useSocial: shot('photo-1587854692152-cbe660dbde88'),
  },
  techmeka: {
    hero: shot('photo-1551288049-bebda4e38f71', 2200),
    primaryMark: '/images/branding/techmeka/primaryMark.svg',
    reversedMark: '/images/branding/techmeka/reversedMark.svg',
    gradientMark: '/images/branding/techmeka/gradientMark.svg',
    iconMark: '/images/branding/techmeka/iconMark.svg',
    oldLogo: '/images/branding/techmeka/oldLogo.svg',
    newLogo: '/images/branding/techmeka/newlogo.svg',
    strategy: shot('photo-1460925895917-afdab827c52f'),
    palette: shot('photo-1557682250-33bd710fa5ee'),
    typography: shot('photo-1586281380349-632531db7ed4'),
    lockups: shot('photo-1561070791-2526d30994b5'),
    useLight: shot('photo-1551288049-bebda4e38f71'),
    useDark: shot('photo-1555949963-aa79dcee981c'),
    useMarketing: shot('photo-1498050108023-c5249f4df085'),
  },
} as const;

export const techmekaImages = dummyBrandingImages.techmeka;
