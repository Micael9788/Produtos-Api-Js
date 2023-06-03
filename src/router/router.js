import { Router } from "express";
import { PostarProdutos } from "../controllers/produtos/ProdutosPostControllers.js"
import { ListaProdutos } from "../controllers/produtos/ProdutosListControllers.js"
import { DeleteProduto } from "../controllers/produtos/ProdutosDeletControllers.js"
import { UsuarioRegistro } from "../controllers/auth/AuthRegistrerControllers.js"
import { UsuarioLogin } from "../controllers/auth/AuthLoginControllers.js"
import { authentication } from "../middlewares/check-auth.js"

const router = Router()


router.post("/api/produtos/post", PostarProdutos)
router.get("/api/produtos/list", authentication, ListaProdutos)
router.delete("/api/produtos/delete/:id", DeleteProduto)

router.post("/api/auth/register", UsuarioRegistro)
router.post("/api/auth/login", UsuarioLogin)

export { router }