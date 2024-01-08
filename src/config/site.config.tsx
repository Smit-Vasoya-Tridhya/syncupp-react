import { Metadata } from 'next';
import { LAYOUT_OPTIONS } from '@/config/enums';
import logoIconImg from '@public/assets/images/SyncUpp.png';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import syncuppLogo from '@public/assets/svgs/syncupp-logo.svg';


enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'SyncUpp',
  description: `SyncUpp`,
  logo: syncuppLogo,
  icon: logoIconImg,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HELIUM,
  // TODO: favicon
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} | SyncUpp` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} | SyncUpp` : title,
      description,
      url: 'https://isomorphic-furyroad.vercel.app',
      siteName: 'Isomorphic Furyroad', // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: 'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/itemdep/isobanner.png',
        width: 1200,
        height: 630,
      },
      locale: 'en_US',
      type: 'website',
    },
  };
};
