import jwt from "jsonwebtoken";

interface dataEncode {
  email: string;
  _id: string;
}

export const signToken = (_id: string, email: string) => {
  if (!process.env.JWT_SECRET) {
    return new Error("JWT_SECRET is not defined");
  }

  return jwt.sign({ _id, email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const isValidToken = (token: string): Promise<dataEncode> => {
  return new Promise((resolve, reject) => {
    if (!process.env.JWT_SECRET) {
      return reject(new Error("JWT_SECRET is not defined"));
    }

    if (token.length <= 10) {
      return reject(new Error("Token is not valid"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        return reject("JWT no válido");
      }

      return resolve(decoded as dataEncode);
    });
  });
};
