import express from "express";
import cors from "cors";
import { routes } from "./routes";
import path from "path";
import { errorHandler } from "./shared/errors/errorHandler";


const app = express();

// Middlewares
app.use(cors()); // Libera CORS para qualquer origem
app.use(express.json());

// Headers CORS personalizados (opcional)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// Rotas da aplicação
app.use(routes()); // ← precisa vir antes do errorHandler

// Middleware de tratamento de erros (sempre no final)
app.use(errorHandler);

// Porta (Render define via process.env.PORT)
const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

// Escutar em 0.0.0.0 (obrigatório para ambientes como Render)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});