const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
const lista = document.getElementById('listaAgendamentos');
const form = document.getElementById('formAgendamento');

form.addEventListener( 'submit', function (e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    const obs = document.getElementById('obs').value;

    if(nome && cpf && data && hora && obs){
        agendamentos.push({nome, cpf, data, hora, obs});
        atualizarLista();
        form.reset();
    }
});

filtro.addEventListener('input', atualizarLista);

function atualizarLista() {
    const filtroTexto = filtro.value.toLowerCase();
    lista.innerHTML = '';

    agendamentos
    .filter(a => a.nome.toLowerCase().includes(filtroTexto))
    .forEach((a, index) => {
        const li = document.createElement('li');
       li.textContent = `${a.nome} - ${a.cpf} - ${a.data} - ${a.hora} - ${a.obs} `;

       const btnRemover = document.createElement('button');
       btnRemover.textContent = 'Remover';
       btnRemover.className = 'btn-remover';
       btnRemover.onclick = () => {
        agendamentos.splice(index, 1);
       };

       li.appendChild(btnRemover);
       lista.appendChild(li);

    });

    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
}
const modal = document.getElementById('modalForm');
const btnNovo = document.getElementById('btnNovo');
const btnCancelar = document.getElementById('btnCancelar');

btnNovo.addEventListener('click', () => {
  modal.style.display = 'flex'; // mostra o modal
});

btnCancelar.addEventListener('click', () => {
  modal.style.display = 'none'; // esconde o modal
  form.reset(); // limpa o formulário
});

// Fecha o modal após salvar
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const cpf = document.getElementById('cpf').value;
  const data = document.getElementById('data').value;
  const hora = document.getElementById('hora').value;
  const obs = document.getElementById('obs').value;

  if (nome && cpf && data && hora && obs) {
    agendamentos.push({ nome, cpf, data, hora, obs });
    atualizarLista();
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

    form.reset();
    modal.style.display = 'none'; // fecha o modal
  }
});