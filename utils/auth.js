import jwt from 'jsonwebtoken';

export const isAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (authorization) {
      // Bearer i sildik
      const token = authorization.slice(7, authorization.length);
      
      jwt.verify(token, "jwt_secret", (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Token is not valid' });
        } else {
          req.user = decode;
          next();
        }
      });
      
    } else {
      res.status(401).send({ message: 'Token is not suppiled' });
    }
  };