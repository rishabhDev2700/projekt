import bcrypt from "bcrypt";

export function validatePassword(password, hash) {
  return new Promise((resolve) => {
    bcrypt
      .compare(password, hash)
      .then((res) => {
        resolve(res);
        // return true
      })
      .catch((err) => console.error(err.message));
  });
}

const saltRounds = 10;

export function hashPassword(password) {
  return new Promise((resolve) => {
    bcrypt
      .genSalt(saltRounds)
      .then((salt) => {
        return bcrypt.hash(password, salt);
      })
      .then((hash) => {
        return resolve(hash);
      })
      .catch((err) => console.error(err.message));
  });
}