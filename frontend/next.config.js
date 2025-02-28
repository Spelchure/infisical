// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const path = require('path');

const ContentSecurityPolicy = `
	default-src 'self';
	script-src 'self' https://app.posthog.com https://js.stripe.com https://api.stripe.com 'unsafe-inline' 'unsafe-eval';
	style-src 'self' https://rsms.me 'unsafe-inline';
	child-src https://api.stripe.com;
	frame-src https://js.stripe.com/ https://api.stripe.com;
	connect-src 'self' https://api.heroku.com/ https://id.heroku.com/oauth/authorize https://id.heroku.com/oauth/token https://checkout.stripe.com https://app.posthog.com https://api.stripe.com;
	img-src 'self' https://*.stripe.com https://i.ytimg.com/ data:;
	media-src;
	font-src 'self' https://maxcdn.bootstrapcdn.com https://rsms.me https://fonts.gstatic.com;  
`;

// You can choose which headers to add to the list
// after learning more below.
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=()'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  }
];

module.exports = {
  output: 'standalone',
  i18n: {
    locales: ['en', 'ko', 'fr', 'pt-BR', 'pt-PT', 'es'],
    defaultLocale: 'en'
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders
      }
    ];
  },
  webpack: (config, { isServer, webpack }) => {
    // config
    config.module.rules.push({
      test: /\.wasm$/,
      loader: 'base64-loader',
      type: 'javascript/auto'
    });

    config.module.noParse = /\.wasm$/;

    config.module.rules.forEach((rule) => {
      (rule.oneOf || []).forEach((oneOf) => {
        if (oneOf.loader && oneOf.loader.indexOf('file-loader') >= 0) {
          oneOf.exclude.push(/\.wasm$/);
        }
      });
    });

    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    // Perform customizations to webpack config
    config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /\/__tests__\// }));

    // Important: return the modified config
    return config;
  }
};
