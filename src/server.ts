import "dotenv/config";
import express from "express";
import { router } from "./routes";
import { errorHandler } from "./common/middleware";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use("/api", router);

// Middleware de tratamento de erros (DEVE ser o último)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});