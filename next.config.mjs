/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone', // Enable standalone output for Docker
    eslint: {
        ignoreDuringBuilds: true,
    }
}

export default nextConfig;