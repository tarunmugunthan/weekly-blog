const path = require('path');

module.exports = ({ env }) => {
  if (env('NODE_ENV') === 'production') {
    // Production database (PostgreSQL for Railway/Render)
    return {
      connection: {
        client: 'postgres',
        connection: {
          host: env('DATABASE_HOST', 'localhost'),
          port: env.int('DATABASE_PORT', 5432),
          database: env('DATABASE_NAME', 'strapi'),
          user: env('DATABASE_USERNAME', 'strapi'),
          password: env('DATABASE_PASSWORD', 'strapi'),
          ssl: env.bool('DATABASE_SSL', false) && {
            rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
          },
        },
        debug: false,
      },
    };
  }

  // Development database (SQLite)
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: path.join(__dirname, '..', '..', '.tmp', 'data.db'),
      },
      useNullAsDefault: true,
    },
  };
};