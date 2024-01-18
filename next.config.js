/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        esmExternals: 'loose',
        serverComponentsExternalPackages: ['mongoose']
    },

    env: {
        HOSTNAME: process.env.HOSTNAME
    }
}

module.exports = nextConfig
