import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  }
)

const usuarioSchema = mongoose.model("users", schema)

export default usuarioSchema