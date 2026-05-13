const listaEventos = document.getElementById("listaEventos");

const eventosSalvos = JSON.parse(localStorage.getItem("eventos")) || [];

const eventosPadrao = [
    {
        nome: "Fashion & Flowers Workshop",
        data: "24 NOV",
        local: "JARDINS",
        imagem: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
    },
    {
        nome: "Sunset Rooftop Session",
        data: "15 NOV",
        local: "ITAIM BIBI",
        imagem: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop"
    },
    {
        nome: "Yoga Brunch & Glow",
        data: "20 NOV",
        local: "VILA MADALENA",
        imagem: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop"
    }
];

const todosEventos = [...eventosPadrao, ...eventosSalvos];

function mostrarEventos() {
    listaEventos.innerHTML = "";

    todosEventos.forEach(evento => {
        listaEventos.innerHTML += `
        <div class="card">
            <img src="${evento.imagem}" alt="">
            <div class="overlay"></div>
            <div class="tag">EVENTO</div>
            <div class="info">
                <span>${evento.data} • ${evento.hora ? evento.hora + " • " : ""}${evento.local}</span>
                <h2>${evento.nome}</h2>
            </div>
        </div>
        `;
    });
}

mostrarEventos();