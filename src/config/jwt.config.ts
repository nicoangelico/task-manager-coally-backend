export const jwtConfig = () => ({
  jwt: {
    secret: process.env.JWT_SECRET || 'changeThisKey',
    expiration: process.env.JWT_EXPIRATION || '86400',
  },
});