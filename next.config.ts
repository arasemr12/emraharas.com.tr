import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  typescript:{
    ignoreBuildErrors:true
  }
};

//export default nextConfig;

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
