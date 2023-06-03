import produtosSchema from '../../schemas/produtos/ProdutosSchemas.js'

const DeleteProduto = async (req, res) => {
   try {
     
     
      const { id } = req.params;

      const produto = await produtosSchema.findByIdAndDelete(id);
      
      if (!produto) {
        
        return res.status(404).json(
          {
           success: false,
           message: "product not found",
         }
        );
        
      }
    
      return res.status(200).json(
        {
          success: true,
          message: "product deleted successfully",
          produto
        }
      )
      
      
   } catch (error) {
     
     
     return res.status(400).json(
      {
        success: false,
        message: 'error when deleting product'
      }
    )
     
     
   }
}

export { DeleteProduto };
