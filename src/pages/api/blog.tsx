/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';
import clsx from 'clsx';
import { NextRequest } from 'next/server';
import { CSSProperties } from 'react';

export const quicksand400 = fetch(
  new URL('../../assets/Quicksand-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export const quicksand500 = fetch(
  new URL('../../assets/Quicksand-Medium.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export const config = {
  runtime: 'experimental-edge',
};

export default async function handler(req: NextRequest) {
  const quicksandRegular = await quicksand400;
  const quicksandMedium = await quicksand500;

  const { searchParams } = new URL(req.url);

  const templateTitle = searchParams.get('templateTitle');
  const banner = searchParams.get('banner');

  const query = {
    templateTitle: templateTitle ?? 'Blog Title',
    banner,
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
          padding: '4rem 3rem',
          backgroundColor: '#222',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            height: '100%',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left',
              height: '100%',
              width: '0%',
              flexGrow: 1,
            }}
          >
            <h3
              style={{ margin: 0 }}
              tw={clsx('text-2xl font-normal text-gray-300')}
            >
              theodorusclarence.com/blog
            </h3>
            <h1 tw={clsx('mt-0', 'text-4xl leading-tight font-normal')}>
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

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '1.4rem',
                alignItems: 'center',
                marginTop: 'auto',
              }}
            >
              <img
                tw='w-[80px] rounded-full'
                src='https://og.firechain.io/images/firechain-mark.png'
                alt='Logo'
              />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.1rem',
                }}
              >
                <p
                  style={{ margin: 0 }}
                  tw='font-medium text-[1.6rem] mt-0 text-white'
                >
                  Firechain Labs
                </p>
                <p style={{ margin: 0 }} tw='text-xl mt-0 text-gray-300'>
                  @firechain
                </p>
              </div>
            </div>
          </div>

          {banner && (
            <div style={{ display: 'flex' }}>
              <img tw={clsx('h-[83vh] block')} src={banner} alt='Banner' />
            </div>
          )}
        </div>
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
          data: quicksandMedium,
          weight: 500,
        },
      ],
    }
  );
}
