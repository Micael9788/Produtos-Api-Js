import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    
    
  title: { type: String, required: true, unique: true },
  descricao: { type: String, required: true },
  avaliacao: { type: Number, required: true },
  disponivel: { type: Boolean, required: true },
  vendidos: { type: Number, required: true },
  estoque: { type: Number, required: true },
  valor: { type: String, required: true },
  images: []
  
  
  }
);

const produtosSchema = mongoose.model("produtos", schema);

export default produtosSchema;
