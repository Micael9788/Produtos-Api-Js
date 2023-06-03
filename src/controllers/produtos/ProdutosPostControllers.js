import z from 'zod'


import produtosSchema from '../../schemas/produtos/ProdutosSchemas.js'


const produtosValidation = z.object(
   {
     
     title: z.string({  
       required_error: "product title is mandatory",
       invalid_type_error: "title must be a string"
     }).trim().min(5),
     
     descricao: z.string({  
       required_error: "product descricao is mandatory",
       invalid_type_error: "descricao must be a string"
     }).trim().min(15).max(150),
     
     avaliacao: z.number({
       required_error: "product avaliacao is mandatory",
       invalid_type_error: "avaliacao must be a number"
     }),
     
     disponivel: z.boolean({
       required_error: "product disponivel is mandatory",
       invalid_type_error: "disponivel must be a boolean"
     }),
     
     vendidos: z.number({
       required_error: "product vendidos is mandatory",
       invalid_type_error: "vendidos must be a number"
     }),
     
     estoque: z.number({
       required_error: "product estoque is mandatory",
       invalid_type_error: "estoque must be a number"
     }),
     
     images: z.array(
       z.object({
           img: z.string({
             required_error: "product img array is mandatory",
             invalid_type_error: "img array must be a string"
           }).trim(),
           type: z.literal("img")
       })
     ).optional(),
     
     valor: z.string({
       required_error: "product valor is mandatory",
       invalid_type_error: "valor must be a string"
     }).trim()
     
   }
)


const PostarProdutos = async (req, res) => {
   try {
     
      const { 
        title, 
        avaliacao,
        descricao,
        disponivel,
        vendidos,
        estoque,
        valor,
        images
      } = await produtosValidation.parseAsync(req.body)
   
      const produto = {
        title, 
        descricao,
        avaliacao,
        disponivel,
        vendidos,
        estoque,
        valor,
        images
      }
      
      await produtosSchema.create(produto)
    
      return res.status(200).json(
        {
          success: true,
          message: "successfully",
          produto
        }
      )
      
   } catch (error) {
     console.log(error)
     
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
        message: 'error publishing your product'
      }
    )
     
   }
}

export { PostarProdutos }