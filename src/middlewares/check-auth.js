import { verifyUserToken } from "../auth/GenerateUserToken.js";
import usuarioSchema from "../schemas/auth/AuthSchema.js";
import jwt from "jsonwebtoken";

const authentication = async (req, res, next) => {
  
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        success: false,
        message: "you are not authorized to access",
      });
    }

    const token = authorization.replace("Bearer", "").trim();

    const data = verifyUserToken(token);

    const { id } = data;

    const user = await usuarioSchema.findById(id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user not found",
      });
    }

    const userId = String(user._id);

    if (userId !== id) {
      return res.status(401).json({
        success: false,
        message: "unauthorized user",
      });
    }

    req.userId = id;
    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "failed to authenticate user",
    });
  }
  
};

export { authentication }
