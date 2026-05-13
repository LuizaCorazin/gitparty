const prisma = require("../data/prisma");

const limiteParticipantes = async (usuarioId, eventoId) => {
    const evento = await prisma.Eventos.findUnique({
        where: { id: eventoId },
        include: {
            inscricoes: true
        }
    });

    const numeroParticipantes = evento.inscricoes.filter(inscricao => inscricao.status == "CONFIRMADA").length;

    if(numeroParticipantes == evento.capacidade_maxima){
        return "LISTA_ESPERA";
    }else{
        return "CONFIRMADA";
    }
};

const verificarDuplicidade = async (usuarioId, eventoId) => {
    const cadastro = await prisma.Inscricoes.findMany({
        where: {
            eventosId: eventoId,
            usuariosId: usuarioId
        }
    });

    if(cadastro.length > 0) throw new Error("Usuário já cadastrado.")
}

const verificarPrazoCancelamento = async (eventoId) => {
    const evento = await prisma.Eventos.findUnique({
        where: { id: eventoId }
    });

    const diferenca = new Date(evento.data_evento) - new Date();

    if (diferenca < 24 * 60 * 60 * 1000) {
        throw new Error("Faltam menos de 24h pro evento.");
    }
};

const atualizarListaEspera = async (eventosId) => {
    const proximo = await prisma.Inscricoes.findFirst({
        where: {
            eventosId: eventosId,
            status: "LISTA_ESPERA"
        },
        orderBy: {
            data_inscricao: "asc"
        }
    });

    if (proximo) {
        await prisma.Inscricoes.update({
            where: { id: proximo.id },
            data: { status: "CONFIRMADA" }
        });
    }
};

module.exports = {
    limiteParticipantes,
    verificarDuplicidade,
    verificarPrazoCancelamento,
    atualizarListaEspera
}