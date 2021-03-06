// const withPWA = require("next-pwa");
const withPlugins = require("next-compose-plugins");
const {
  monthConversion,
  dayConversion,
  timeConversion,
} = require("./src/utils/timeconversion");

const getDate = new Date();

const { NODE_ENV } = process.env;
const dualENV = {
  production: {
    PUBLIC_URL: "https://dashboard.technonatura.vercel.app",
  },
  development: {
    PUBLIC_URL: "http://localhost:3000",
  },
};

const env = {
  ...dualENV[NODE_ENV],
  isProduction: NODE_ENV === "production",
};

// next.js configuration
const nextConfig = {
  pageExtensions: [
    "page.js",
    "page.tsx",
    "tsx",
    "page.jsx",
    "cpage.tsx",
    "api.js",
    "api.ts",
    "_app.js",
    "_document.js",
  ],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "If-Modified-Since",
            value: `${dayConversion(
              getDate.getDay()
            )}, ${getDate.getDate()} ${monthConversion(
              getDate.getMonth()
            )} ${getDate.getFullYear()} ${timeConversion(
              getDate.getHours()
            )}:${timeConversion(getDate.getMinutes())}:${timeConversion(
              getDate.getSeconds()
            )} GMT`, // <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT | https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Modified-Since
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/dev",
        destination: "https://dev.mts-technonatura.vercel.app",
        permanent: true,
      },

      {
        source: "/discuss",
        destination: "https://forum.mts-technonatura.vercel.app",
        permanent: true,
      },
      {
        source: "/github",
        destination: "https://github.com/mts-technonatura",
        permanent: true,
      },

      {
        source: "/setting",
        destination: "/settings",
        permanent: true,
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // eslint-disable-next-line global-require
      require("./src/utils/sitemap-robots-generator")(env.PUBLIC_URL);
    }

    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack", "url-loader"],
    });

    return config;
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  env,
};

const plugins = [];

module.exports = withPlugins([...plugins], nextConfig);
