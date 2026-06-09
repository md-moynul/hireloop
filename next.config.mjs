/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['better-auth', '@better-auth/kysely-adapter', 'mongodb'],

  turbopack: {
    resolveAlias: {
      // better-auth's internal @better-auth/kysely-adapter ships SQLite dialect
      // files that import non-existent kysely exports, crashing Turbopack's
      // externals-tracing. This project uses MongoDB, so stub them out.
      './bun-sqlite-dialect-DzNwOpKv.mjs': './src/lib/empty-stub.js',
      './d1-sqlite-dialect-C2B7YsIT.mjs': './src/lib/empty-stub.js',
      './node-sqlite-dialect.mjs': './src/lib/empty-stub.js',
    },
  },
};

export default nextConfig;
