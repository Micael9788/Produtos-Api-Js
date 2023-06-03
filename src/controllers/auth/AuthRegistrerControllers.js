import crypto from "crypto";
import { z } from "zod";

import usuarioSchema from "../../schemas/auth/AuthSchema.js";

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

const UsuarioRegistro = async (req, res) => {
  try {
    
    
    const { email, password } = await usuarioValidation.parseAsync(req.body);

    const userExist = await usuarioSchema.findOne({ email: email });

    if (userExist) {
      return res.status(400).json(
        {
         success: false,
         message: 'An account already exists for that email address',
        }
     );
    }

    const cryptoPass = hashPassword(password);

    const usuario = {
      email,
      password: cryptoPass,
    };

    await usuarioSchema.create(usuario);

    return res.status(200).json(
      {
       success: true,
       message: "successfully",
       email: usuario.email
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
        message: 'error when registering user',
      }
    );
    
  }
}

export { UsuarioRegistro }

function hashPassword(password) {
  
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return salt + ':' + hash;

}
