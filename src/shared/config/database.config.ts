const {
  DB_HOST = 'localhost',
  DB_PORT = '5432',
  POSTGRES_DB = 'db-price-updater',
  POSTGRES_USER = 'postgres',
  POSTGRES_PASSWORD = 'alfabeta',
} = process.env;
export const DATABASE_CONFIG_URI = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${POSTGRES_DB}`;

export const DATABASE_CONFIG_OPTIONS = {
  logging: false,
  retry: {
    max: 3,
    match: [
      /SequelizeConnectionError/,
      /SequelizeConnectionRefusedError/,
      /SequelizeHostNotFoundError/,
      /SequelizeHostNotReachableError/,
      /SequelizeInvalidConnectionError/,
      /SequelizeConnectionTimedOutError/,
    ],
  },
  define: {
    timestamps: true,
  },
};
