export const mongodbConfig = () => ({
  mongo: {
    user: process.env.MONGO_DB_USER,
    password: process.env.MONGO_DB_PASSWORD,
    dbName: process.env.MONGO_DB_NAME,
    host: process.env.MONGO_DB_HOST,
    uri: process.env.MONGO_DB_URI,
  },
});
