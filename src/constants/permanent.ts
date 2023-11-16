const ROLES_KEY = 'roles';
const PASSWORD_HASH_COST = parseInt(process.env.PASSWORD_HASH_COST);
const accessTokenLifeTime = process.env.ACCESS_TOKEN_LIFE_TIME;
const refreshTokenLifeTime = process.env.REFRESH_TOKEN_LIFE_TIME;
const maxAge = 24 * 60 * 1000;

export {
  ROLES_KEY,
  PASSWORD_HASH_COST,
  accessTokenLifeTime,
  refreshTokenLifeTime,
  maxAge,
};
