/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: () => [
        {
            source: "/api/:path*",
            destination: "http://localhost:2334/api/auth/:path*",
        },
    ],
};

export default nextConfig;
