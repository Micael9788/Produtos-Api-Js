import crypto from "crypto";
import { z } from "zod";

import usuarioSchema from "../../schemas/auth/AuthSchema.js";
import { generateUserToken } from '../../auth/GenerateUserToken.js'

const usuarioValidation = z.object(
  {
    
    email: z.string({
      required_error: "user email is mandatory",
      invalid_type_error: "email must be a string"
    }).trim().min(5).max(50),
    
    password: z.string({
      required_error: "user password is mandatory",
      invalid_type_error: "password must be a string"
    }).trim().min(5).max(20),
    
  }
);

const UsuarioLogin = async (req, res) => {
  try {
    
    
    const { email, password } = await usuarioValidation.parseAsync(req.body);

    const usuario = await usuarioSchema.findOne({ email: email });

    if (!usuario) {
      return res.status(400).json(
        {
         success: false,
         message: 'user does not exist',
        }
     );
    }

    const passInvalid = verifyPassword(password, usuario.password);

    if (!passInvalid) {
      return res.status(401).json(
        {
         success: false,
         message: "your password is incorrect",
       }
      );
    }
    
    const token = generateUserToken({ id: usuario._id, expiresIn: "2d" });

    if (!token) {
      throw new Error("failed to make register to token");
    }

    return res.status(200).json(
      {
       success: true,
       message: "successfully",
       email: usuario.email,
       token
      }
    );
    
    
  } catch (error) {
    
    if (error instanceof z.ZodError) {
       return res.status(400).json(
        {
          success: false,
          message: error.issues.map(issue => issue.message),
        }
      )
    }
    
    return res.status(400).json(
      {
        success: false,
        message: 'error when login user',
      }
    );
    
  }
}

export { UsuarioLogin }

function verifyPassword(password, original) {
  
  const parts = original.split(":");
  const salt = parts[0];
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return hash === parts[1];
  
}