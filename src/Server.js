import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import env from 'dotenv'
import cors from 'cors';


import checkErrosApi from './middlewares/check-errors.js'
import { router } from './router/router.js'
import mongoConnect from './database/mongo-conect.js'

// import from api
const app = express()
env.config()

if (process.env.DEBUG) {
  app.use(morgan("dev"));
}


app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(helmet());

app.use(checkErrosApi)
app.use(router)


// rotas, api
app.use((req, res, next) => {
   return res.status(400).json(
     {
       success: false,
       message: 'invalid api route path'
     }
    )
})


// port, api
const PORT = Number(process.env.PORT || 30001)

const startServer = async () => {
  try {
    await mongoConnect()
    app.emit("api-rodando")
  } catch(error) {
    console.log(error)
  }
};

app.listen(PORT, startServer);

app.on("api-rodando", () => {
  console.log(`api running on port ${PORT} is online`)
});