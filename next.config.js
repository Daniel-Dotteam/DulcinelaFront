/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig = {
    images: {
        domains: ['localhost'],
    },
    trailingSlash: false,
    _next_intl_trailing_slash: ''
};

const config = withNextIntl(nextConfig);

module.exports = config;