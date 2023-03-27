const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3001;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

app.post("/roll-dice", (req, res) => {
    const { sides } = req.body;
    const result = Math.floor(Math.random() * sides) + 1;
    res.send({ result, sides });
});
