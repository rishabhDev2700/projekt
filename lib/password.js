import bcrypt from "bcrypt";

export function validatePassword(password, hash) {
  return new Promise((resolve) => {
    console.log(password, hash);
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
        console.log("Salt: ", salt);
        return bcrypt.hash(password, salt);
      })
      .then((hash) => {
        console.log("Hash: ", hash);
        return resolve(hash);
      })
      .catch((err) => console.error(err.message));
  });
}