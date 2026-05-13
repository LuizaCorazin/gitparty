const prisma = require("../data/prisma");
const { 
    limiteParticipantes, 
    verificarDuplicidade, 
    verificarPrazoCancelamento, 
    atualizarListaEspera 
} = require("../services/inscricoes.service");

const cadastrar = async (req, res) => {
    try {
        const data = req.body;

        await verificarDuplicidade(data.usuariosId, data.eventosId);

        let status = await limiteParticipantes(data.usuariosId, data.eventosId);

        data.status = status;

        const inscricao = await prisma.incricoes.create({ data });

        res.status(201).json(inscricao);
    } catch (error) {
        res.status(500).json(error.toString());
    }
};

const listar = async (req, res) => {
    try {
        const lista = await prisma.incricoes.findMany();
        res.status(200).json(lista);
    } catch (error) {
        res.status(500).json(error.toString());
    }
};

const buscar = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await prisma.incricoes.findUnique({
            where: { id: Number(id) }
        });

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json(error.toString());
    }
};

const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const dados = req.body;

        const item = await prisma.incricoes.update({
            where: { id: Number(id) },
            data: dados
        });

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json(error.toString());
    }
};

const excluir = async (req, res) => {
    try {
        const { id } = req.params;

        const inscricao = await prisma.incricoes.findUnique({
            where: { id: Number(id) }
        });

        await verificarPrazoCancelamento(inscricao.eventosId);

        const eraConfirmada = inscricao.status === "CONFIRMADA";

        const item = await prisma.incricoes.delete({
            where: { id: Number(id) }
        });

        if (eraConfirmada) {
            await atualizarListaEspera(inscricao.eventosId);
        }

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json(error.toString());
    }
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
};