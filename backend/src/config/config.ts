import crypto from 'crypto';

export default {
  jwtSecret: "@QEGTUI",
  jwtExpiration: "1h",
};

export async function generatePassword(password: string, salt: string) {
  const hash = crypto.createHmac(
    "sha512",
    salt
  ); /** Hashing algorithm sha512 */
  hash.update(password);
  const value = hash.digest("hex");
  return value;
}
