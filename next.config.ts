import type {NextConfig} from 'next'
import {createVanillaExtractPlugin} from '@vanilla-extract/next-plugin'

const withVanillaExtract = createVanillaExtractPlugin()

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/content/dashboard',
        permanent: true,
      },
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true, // viewBox를 자동으로 추가하여 사이즈 조정 가능
            svgo: true, // 최적화
            svgoConfig: {
              plugins: [{removeViewBox: false}], // viewBox 유지
            },
          },
        },
      ],
    })
    return config
  },
  async headers() {
    return [
      {
        source: '/assets/:path*', // SVG 파일 경로
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1년 동안 캐시
          },
        ],
      },
    ]
  },
}

export default withVanillaExtract(nextConfig)
