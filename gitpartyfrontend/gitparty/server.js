const express = require("express");
const app = express();

const eventosRoutes = require("./src/routes/incricoes.routes"); 
// ⚠️ se você renomear o arquivo, ajuste aqui

app.use(express.json());

// ROTAS
app.use("/eventos", eventosRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});