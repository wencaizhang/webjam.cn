'use client';
import { Fira_Code, Plus_Jakarta_Sans, Sora } from 'next/font/google';
// import { Inter, Plus_Jakarta_Sans, Sora } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

// import { firaCode, jakartaSans, soraSans } from '@/common/styles/fonts';
import '@/common/styles/globals.css';

// 导入字体
// const inter = Inter({
// 	subsets: ['latin'],
// 	weight: ['300', '400', '500', '600', '700'],
// 	variable: '--jakartaSans-font',
// });

// const sora = Sora({
// 	subsets: ['latin'],
// 	weight: ['300', '400', '500', '600', '700'],
// 	variable: '--soraSans-font',
// });
const jakartaSans = Plus_Jakarta_Sans({
  variable: '--jakartaSans-font',
  subsets: ['latin'],
  display: 'fallback',
  weight: ['400', '500', '600', '700', '800'],
});

const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
  display: 'swap',
});

const soraSans = Sora({
  variable: '--soraSans-font',
  subsets: ['latin'],
  display: 'fallback',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='zh-CN' suppressHydrationWarning>
      <body
        className={`${jakartaSans.variable} ${firaCode.variable} ${soraSans.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
