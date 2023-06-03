import jwt from "jsonwebtoken";

export const verifyUserToken = (token) => {
  
  if (!process.env.KEY_TOKEN_PUBLIC) {
    
    throw new Error("KEY_TOKEN_PRIVATE must be set in environment");
    
  }

  return jwt.verify(token, process.env.KEY_TOKEN_PUBLIC);
};

export const generateUserToken = (data) => {
  
  if (!process.env.KEY_TOKEN_PRIVATE) {
    
    throw new Error("KEY_TOKEN_PRIVATE must be set in environment");
    
  }

  const tokenJwt = jwt.sign(
    
    {
      id: data.id,
    },
    process.env.KEY_TOKEN_PRIVATE,
    {
      algorithm: "RS256",
      expiresIn: data.expiresIn,
    }
  );

  return tokenJwt;
};
