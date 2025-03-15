import '@/style/font.css'
import '@/style/global.css.ts';
import type { Metadata } from 'next';
import React, { Suspense } from 'react';

export const metadata: Metadata = {
  title: '이슈챗',
  description: '온라인 이슈 찬반 토론방',
};

function Loading() {
  return <div aria-live="polite">로딩 중...</div>; // 접근성 향상
}

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="ko" suppressHydrationWarning>
    <body className="antialiased">
    <Suspense fallback={<Loading />}>{children}</Suspense>
    </body>
    </html>
  );
};

export default RootLayout;
