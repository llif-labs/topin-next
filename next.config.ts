import type { NextConfig } from "next";
import {createVanillaExtractPlugin} from '@vanilla-extract/next-plugin'

const withVanillaExtract = createVanillaExtractPlugin()

const nextConfig: NextConfig = {
  redirects: async () => [
    {
      source: '/admin',
      destination: '/admin/content/dashboard',
      permanent: true
    },
  ]
};

export default withVanillaExtract(nextConfig);
