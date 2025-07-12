import type { NextConfig } from "next";
const path = require('path')
const dotenv = require('dotenv')

dotenv.config({ path: [".env", path.resolve(__dirname, '../../.env')] })

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
