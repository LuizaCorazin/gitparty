let eventos = [];
let idAtual = 1;

// CREATE
const cadastrar = (req, res) => {
    const { nome, data, local } = req.body;

    if (!nome || !data || !local) {
        return res.status(400).json({ mensagem: "Preencha todos os campos" });
    }

    const novoEvento = {
        id: idAtual++,
        nome,
        data,
        local
    };

    eventos.push(novoEvento);

    return res.status(201).json(novoEvento);
};

// READ ALL
const listar = (req, res) => {
    return res.json(eventos);
};

// READ BY ID
const buscar = (req, res) => {
    const { id } = req.params;

    const evento = eventos.find(e => e.id == id);

    if (!evento) {
        return res.status(404).json({ mensagem: "Evento não encontrado" });
    }

    return res.json(evento);
};

// UPDATE
const atualizar = (req, res) => {
    const { id } = req.params;
    const { nome, data, local } = req.body;

    const index = eventos.findIndex(e => e.id == id);

    if (index === -1) {
        return res.status(404).json({ mensagem: "Evento não encontrado" });
    }

    eventos[index] = {
        id: Number(id),
        nome: nome || eventos[index].nome,
        data: data || eventos[index].data,
        local: local || eventos[index].local
    };

    return res.json(eventos[index]);
};

// DELETE
const excluir = (req, res) => {
    const { id } = req.params;

    const index = eventos.findIndex(e => e.id == id);

    if (index === -1) {
        return res.status(404).json({ mensagem: "Evento não encontrado" });
    }

    eventos.splice(index, 1);

    return res.json({ mensagem: "Evento excluído com sucesso" });
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
};




























