import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  experimental: {
    // 404 for unmatched URLs: the site and /admin have separate root layouts
    globalNotFound: true,
  },
};

export default withPayload(nextConfig);
