const form = document.getElementById("formEvento");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nomeEvento").value;
    const data = document.getElementById("dataEvento").value;
    const hora = document.getElementById("horaEvento").value;
    const local = document.getElementById("localEvento").value;
    const descricao = document.getElementById("descricaoEvento").value;
    const imagem = document.getElementById("imagemEvento").value;

    const novoEvento = {
        nome,
        data,
        hora,
        local,
        descricao,
        imagem
    };

    const eventos = JSON.parse(localStorage.getItem("eventos")) || [];

    eventos.push(novoEvento);

    localStorage.setItem("eventos", JSON.stringify(eventos));

    window.location.href = "index.html";
});