import { BsFillBootstrapFill, BsRobot } from 'react-icons/bs';

import {
  SiAngular,
  SiAntdesign,
  SiCss3,
  SiExpress,
  SiFirebase,
  SiGatsby,
  SiJavascript,
  SiJest,
  SiJquery,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiNuxtdotjs,
  SiPrisma,
  SiPwa,
  SiReact,
  SiRemix,
  SiSocketdotio,
  SiStorybook,
  SiStyledcomponents,
  SiSwiper,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiVuedotjs,
  SiWebpack,
  SiStrapi,
} from 'react-icons/si';
import { IoLogoElectron } from 'react-icons/io5';

export type stacksProps = {
  [key: string]: JSX.Element;
};

const iconSize = 24;

export const STACKS: stacksProps = {
  // PHP: <SiPhp size={iconSize} className='text-blue-500' />,
  JavaScript: <SiJavascript size={iconSize} className='text-yellow-400' />,
  TypeScript: <SiTypescript size={iconSize} className='text-blue-400' />,
  'Next.js': <SiNextdotjs size={iconSize} />,
  'React.js': <SiReact size={iconSize} className='text-sky-500' />,
  TailwindCSS: <SiTailwindcss size={iconSize} className='text-cyan-300' />,
  Bootstrap: (
    <BsFillBootstrapFill size={iconSize} className='text-purple-500' />
  ),
  // GraphQL: <SiGraphql size={iconSize} className='text-pink-600' />,
  // Apollo: <SiApollographql size={iconSize} />,
  // WordPress: <SiWordpress size={iconSize} />,
  // Laravel: <SiLaravel size={iconSize} className='text-red-500' />,
  // 'Material UI': <SiMui size={iconSize} className='text-sky-400' />,
  Vite: <SiVite size={iconSize} className='text-purple-500' />,
  Prisma: <SiPrisma size={iconSize} className='text-emerald-500' />,
  Firebase: <SiFirebase size={iconSize} className='text-yellow-500' />,
  'Artificial Intelligence': (
    <BsRobot size={iconSize} className='text-rose-500' />
  ),
  Angular: <SiAngular size={iconSize} className='text-red-500' />,
  'Vue.js': <SiVuedotjs size={iconSize} className='vue' />,
  'Nuxt.js': <SiNuxtdotjs size={iconSize} className='text-green-400' />,
  'Node.js': <SiNodedotjs size={iconSize} className='text-green-600' />,
  'Nest.js': <SiNestjs size={iconSize} className='nest' />,
  'Ant Design': <SiAntdesign size={iconSize} className='ant' />,
  Swiper: <SiSwiper size={iconSize} className='swiper' />,
  Gatsby: <SiGatsby size={iconSize} className='text-purple-600' />,
  // Redux: <SiRedux size={iconSize} className='text-purple-500' />,
  Webpack: <SiWebpack size={iconSize} className='text-blue-500' />,
  'Styled Components': (
    <SiStyledcomponents size={iconSize} className='text-pink-500' />
  ),
  PWA: <SiPwa size={iconSize} className='text-amber-600' />,
  Nginx: <SiNginx size={iconSize} className='text-green-500' />,
  Jest: <SiJest size={iconSize} className='text-red-600' />,
  Storybook: <SiStorybook size={iconSize} className='text-amber-500' />,
  CSS: <SiCss3 size={iconSize} className='text-blue-300' />,
  Socket: <SiSocketdotio size={iconSize} />,
  Remix: <SiRemix size={iconSize} />,
  Express: <SiExpress size={iconSize} />,
  jQuery: <SiJquery size={iconSize} className='jquery' />,
  Strapi: <SiStrapi size={iconSize} className='text-blue-600' />,
  // TODO 把图标改为外链
  Vben: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 105 90'
      width={iconSize}
      height={iconSize}
    >
      <g strokeWidth='2' fill='none'>
        <path
          stroke='#c45ffc'
          vector-effect='non-scaling-stroke'
          d='M65.51 1.99L39.82 45.81'
        />
        <path
          stroke='#6655f6'
          vector-effect='non-scaling-stroke'
          d='M39.82 45.81l-25.7-.04'
        />
        <path
          stroke='#849de6'
          vector-effect='non-scaling-stroke'
          d='M65.29 45.82q-.7.17-.51.42'
        />
        <path
          stroke='#7a82fd'
          vector-effect='non-scaling-stroke'
          d='M64.78 46.24q-.45-.01-.75-.11-.77-.26-.93-.26-11.58-.2-23.28.04'
        />
        <path
          stroke='#7c6df6'
          vector-effect='non-scaling-stroke'
          d='M39.82 45.91v-.1'
        />
        <path
          stroke='#1c78f6'
          vector-effect='non-scaling-stroke'
          d='M39.82 45.91Q27.71 66.74 15.79 87.43c-.48.82-1.22 1.14-1.65 2.04'
        />
        <path
          stroke='#24a8e7'
          vector-effect='non-scaling-stroke'
          d='M64.78 46.24L40.61 87.93q-.2.35-.09.74.05.19.01.4-.09.48-.57.63l-.99.3'
        />
        <path
          stroke='#19e1d6'
          vector-effect='non-scaling-stroke'
          d='M90.52 46.28q-.7.4-.7 1.16a1.28 1.16-33.2 0 1-.17.65L65 90'
        />
      </g>
      <path
        fill='#ae47fc'
        d='M65.51 1.99L39.82 45.81l-25.7-.04 25.29-43.8a.76.76 0 0 1 .65-.37q12.19-.03 24.57 0c.33 0 .69.17.88.39z'
      />
      <path
        fill='#da76fc'
        d='M65.51 1.99l12.35 20.73a1.26 1.26 0 0 1 .01 1.29L65.29 45.82q-.7.17-.51.42-.45-.01-.75-.11-.77-.26-.93-.26-11.58-.2-23.28.04v-.1L65.51 1.99z'
      />
      <path
        fill='#1d63ef'
        d='M14.12 45.77l25.7.04v.1Q27.71 66.74 15.79 87.43c-.48.82-1.22 1.14-1.65 2.04q-.04-.04-.12-.06-.19-.07-.29-.25-5.88-10.44-11.9-21-.27-.48.01-.96l12.28-21.43z'
      />
      <path
        fill='#1a8dfd'
        d='M64.78 46.24L40.61 87.93q-.2.35-.09.74.05.19.01.4-.09.48-.57.63l-.99.3H15.02l-.88-.53c.43-.9 1.17-1.22 1.65-2.04q11.92-20.69 24.03-41.52 11.7-.24 23.28-.04.16 0 .93.26.3.1.75.11z'
      />
      <path
        fill='#2dc3d0'
        d='M65.29 45.82q11.97.06 23.96.03 1.08 0 1.27.43-.7.4-.7 1.16a1.28 1.16-33.2 0 1-.17.65L65 90H38.97l.99-.3q.48-.15.57-.63.04-.21-.01-.4-.11-.39.09-.74l24.17-41.69q-.19-.25.51-.42z'
      />
      <path
        fill='#04ffdb'
        d='M90.52 46.28q.15-.05.39.06.18.08.28.25 6.12 10.16 12.26 20.4.27.47 0 .94L90.64 90H65l24.65-41.91a1.28 1.16-33.2 0 0 .17-.65q0-.76.7-1.16z'
      />
    </svg>
  ),
  'Photo Sphere Viewer': (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      version='1.2'
      baseProfile='tiny'
      viewBox='0.00 0.00 64.00 64.00'
      width={iconSize}
      height={iconSize}
    >
      {' '}
      <g strokeWidth='2.00' fill='none' strokeLinecap='butt'>
        {' '}
        <path
          stroke='#7fc2ec'
          vector-effect='non-scaling-stroke'
          d=' M 59.34 18.54 Q 55.39 17.24 51.68 15.95 Q 28.20 7.82 4.86 18.67'
        />{' '}
        <path
          stroke='#7ab8e1'
          vector-effect='non-scaling-stroke'
          d=' M 58.99 46.28 L 48.95 49.79'
        />{' '}
        <path
          stroke='#70a794'
          vector-effect='non-scaling-stroke'
          d=' M 48.95 49.79 L 31.78 32.58 A 0.57 0.57 0.0 0 0 30.97 32.58 L 25.43 38.26'
        />{' '}
        <path
          stroke='#9fd0a0'
          vector-effect='non-scaling-stroke'
          d=' M 25.43 38.26 Q 25.35 38.37 25.23 38.41 A 0.30 0.29 59.3 0 1 24.92 38.33 L 11.44 24.83 A 0.33 0.33 0.0 0 0 10.98 24.83 L 0.31 35.52'
        />{' '}
        <path
          stroke='#729d4e'
          vector-effect='non-scaling-stroke'
          d=' M 25.43 38.26 L 38.15 51.58'
        />{' '}
        <path
          stroke='#7cae9a'
          vector-effect='non-scaling-stroke'
          d=' M 38.15 51.58 Q 27.62 52.73 18.50 50.78 Q 12.04 49.39 5.34 46.52'
        />{' '}
        <path
          stroke='#5ca0e7'
          vector-effect='non-scaling-stroke'
          d=' M 56.67 49.90 Q 54.44 49.31 52.79 50.99 Q 52.43 51.36 51.92 51.48 L 43.75 53.48 Q 40.97 54.16 38.11 54.31 Q 34.94 54.48 31.90 54.43 Q 29.02 54.38 26.19 53.90 Q 22.82 53.32 19.31 53.05 Q 17.55 52.91 15.75 52.25 C 13.89 51.57 11.65 51.13 10.10 49.88 Q 8.98 48.98 7.85 48.09 A 0.86 0.85 48.8 0 0 6.89 48.02 L 6.46 48.27'
        />{' '}
        <path
          stroke='#4c858f'
          vector-effect='non-scaling-stroke'
          d=' M 48.95 49.79 Q 43.20 51.91 38.15 51.58'
        />{' '}
        <path
          stroke='#cae19a'
          vector-effect='non-scaling-stroke'
          d=' M 54.93 26.13 A 5.87 5.87 0.0 0 0 49.06 20.26 A 5.87 5.87 0.0 0 0 43.19 26.13 A 5.87 5.87 0.0 0 0 49.06 32.00 A 5.87 5.87 0.0 0 0 54.93 26.13'
        />{' '}
      </g>{' '}
      <path
        fill='#61aaf2'
        d=' M 59.34 18.54 Q 55.39 17.24 51.68 15.95 Q 28.20 7.82 4.86 18.67 Q 11.84 5.37 26.40 2.15 Q 31.27 1.07 35.49 1.72 Q 51.65 4.21 59.34 18.54 Z'
      />{' '}
      <path
        fill='#9ddae6'
        d=' M 59.34 18.54 Q 60.01 19.29 62.74 21.26 Q 63.77 22.01 63.77 23.45 Q 63.80 33.10 63.77 42.30 Q 63.77 42.80 63.43 43.16 Q 61.50 45.27 58.99 46.28 L 48.95 49.79 L 31.78 32.58 A 0.57 0.57 0.0 0 0 30.97 32.58 L 25.43 38.26 Q 25.35 38.37 25.23 38.41 A 0.30 0.29 59.3 0 1 24.92 38.33 L 11.44 24.83 A 0.33 0.33 0.0 0 0 10.98 24.83 L 0.31 35.52 Q 0.13 26.75 0.27 23.75 C 0.32 22.65 1.11 21.55 2.08 20.84 Q 3.80 19.59 4.86 18.67 Q 28.20 7.82 51.68 15.95 Q 55.39 17.24 59.34 18.54 Z M 54.93 26.13 A 5.87 5.87 0.0 0 0 49.06 20.26 A 5.87 5.87 0.0 0 0 43.19 26.13 A 5.87 5.87 0.0 0 0 49.06 32.00 A 5.87 5.87 0.0 0 0 54.93 26.13 Z'
      />{' '}
      <circle fill='#f6e84d' cx='49.06' cy='26.13' r='5.87' />{' '}
      <path
        fill='#a1c659'
        d=' M 25.43 38.26 L 38.15 51.58 Q 27.62 52.73 18.50 50.78 Q 12.04 49.39 5.34 46.52 C 2.67 44.89 0.26 44.19 0.23 40.47 Q 0.21 37.74 0.31 35.52 L 10.98 24.83 A 0.33 0.33 0.0 0 1 11.44 24.83 L 24.92 38.33 A 0.30 0.29 59.3 0 0 25.23 38.41 Q 25.35 38.37 25.43 38.26 Z'
      />{' '}
      <path
        fill='#427342'
        d=' M 48.95 49.79 Q 43.20 51.91 38.15 51.58 L 25.43 38.26 L 30.97 32.58 A 0.57 0.57 0.0 0 1 31.78 32.58 L 48.95 49.79 Z'
      />{' '}
      <path
        fill='#5696db'
        d=' M 5.34 46.52 Q 12.04 49.39 18.50 50.78 Q 27.62 52.73 38.15 51.58 Q 43.20 51.91 48.95 49.79 L 58.99 46.28 L 56.67 49.90 Q 54.44 49.31 52.79 50.99 Q 52.43 51.36 51.92 51.48 L 43.75 53.48 Q 40.97 54.16 38.11 54.31 Q 34.94 54.48 31.90 54.43 Q 29.02 54.38 26.19 53.90 Q 22.82 53.32 19.31 53.05 Q 17.55 52.91 15.75 52.25 C 13.89 51.57 11.65 51.13 10.10 49.88 Q 8.98 48.98 7.85 48.09 A 0.86 0.85 48.8 0 0 6.89 48.02 L 6.46 48.27 L 5.34 46.52 Z'
      />{' '}
      <path
        fill='#61aaf2'
        d=' M 56.67 49.90 Q 51.64 56.78 44.23 60.06 Q 36.93 63.30 28.94 62.46 C 20.02 61.51 11.18 56.28 6.46 48.27 L 6.89 48.02 A 0.86 0.85 48.8 0 1 7.85 48.09 Q 8.98 48.98 10.10 49.88 C 11.65 51.13 13.89 51.57 15.75 52.25 Q 17.55 52.91 19.31 53.05 Q 22.82 53.32 26.19 53.90 Q 29.02 54.38 31.90 54.43 Q 34.94 54.48 38.11 54.31 Q 40.97 54.16 43.75 53.48 L 51.92 51.48 Q 52.43 51.36 52.79 50.99 Q 54.44 49.31 56.67 49.90 Z'
      />{' '}
    </svg>
  ),
  Electron: <IoLogoElectron size={iconSize} className='text-slate-700' />,
};
