/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';
import clsx from 'clsx';
import { NextRequest } from 'next/server';
import { CSSProperties } from 'react';

import { deploymentURL } from '@/constant/env';

export const quicksand400 = fetch(
  new URL('../../assets/Quicksand-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export const quicksand700 = fetch(
  new URL('../../assets/Quicksand-Bold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export const config = {
  runtime: 'experimental-edge',
};

export default async function handler(req: NextRequest) {
  const quicksandRegular = await quicksand400;
  const quicksandBold = await quicksand700;

  const { searchParams } = new URL(req.url);

  const siteName = searchParams.get('siteName');
  const description = searchParams.get('description');
  const theme = searchParams.get('theme');
  const logo = searchParams.get('logo');
  const templateTitle = searchParams.get('templateTitle');
  const logoWidth = searchParams.get('logoWidth');
  const logoHeight = searchParams.get('logoHeight');

  const query = {
    siteName: siteName ?? 'Site Name',
    description: description ?? 'Description',
    theme: theme ?? 'dark',
    logo: logo ?? `${deploymentURL}/images/firechain-mark.png`,
    templateTitle,
    logoWidth: logoWidth ? +logoWidth : 100,
    logoHeight: logoHeight ? +logoHeight : undefined,
  };

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          fontFamily: 'Quicksand',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 5rem',
          backgroundColor: clsx(query.theme === 'dark' ? '#222' : '#fff'),
        }}
      >
        <img
          style={{
            width: query.logoWidth,
            ...(query.logoHeight && { height: query.logoHeight }),
          }}
          src={query.logo}
          alt='Favicon'
        />
        {query.templateTitle ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <h1
              tw={clsx(
                'mt-8',
                'text-6xl font-bold',
                query.theme === 'dark' ? 'text-white' : 'text-black'
              )}
            >
              <span
                style={
                  {
                    backgroundImage: 'linear-gradient(90deg, #EF4444, #FB923C)',
                    backgroundClip: 'text',
                    '-webkit-background-clip': 'text',
                    color: 'transparent',
                    padding: '0.5rem 0',
                  } as CSSProperties
                }
              >
                {query.templateTitle}
              </span>
            </h1>
            <h3
              tw={clsx(
                'text-2xl font-bold',
                query.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              )}
            >
              {query.siteName}
            </h3>
          </div>
        ) : (
          <h1
            tw={clsx(
              'mt-6',
              'text-6xl font-bold',
              query.theme === 'dark' ? 'text-white' : 'text-black'
            )}
          >
            <span
              style={
                {
                  backgroundImage: 'linear-gradient(90deg, #EF4444, #FB923C)',
                  backgroundClip: 'text',
                  '-webkit-background-clip': 'text',
                  color: 'transparent',
                  padding: '0.5rem 0',
                } as CSSProperties
              }
            >
              {query.siteName}
            </span>
          </h1>
        )}
        <p
          tw={clsx(
            'text-3xl',
            query.theme === 'dark' ? 'text-gray-300' : 'text-gray-800'
          )}
        >
          {query.description}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      emoji: 'twemoji',
      fonts: [
        {
          name: 'Quicksand',
          data: quicksandRegular,
          weight: 400,
        },
        {
          name: 'Quicksand',
          data: quicksandBold,
          weight: 700,
        },
      ],
    }
  );
}
