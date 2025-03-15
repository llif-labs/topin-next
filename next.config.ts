import type { NextConfig } from "next";
import {createVanillaExtractPlugin} from '@vanilla-extract/next-plugin'

const withVanillaExtract = createVanillaExtractPlugin()

const nextConfig: NextConfig = {
  /* config options here */
  redirects: () => [
    {
      source: '/admin',
      destination: '/admin/dashboard',
      permanent: true
    },
  ]
};

export default withVanillaExtract(nextConfig);
