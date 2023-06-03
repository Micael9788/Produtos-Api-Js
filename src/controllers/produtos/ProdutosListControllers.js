import produtosSchema from '../../schemas/produtos/ProdutosSchemas.js'

const ListaProdutos = async (req, res) => {
   try {
     
     
      const produtos = await produtosSchema.find({})
    
      return res.status(200).json(
        {
          success: true,
          message: "successfully",
          produtos
        }
      )
      
   } catch (error) {
     
     return res.status(400).json(
      {
        success: false,
        message: 'error when getting product list'
      }
    )
     
   }
}

export { ListaProdutos }
