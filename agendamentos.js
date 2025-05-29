// Seleções iniciais
const btnNovo = document.getElementById('btnNovo');
const modalForm = document.getElementById('modalForm');
const btnCancelar = document.getElementById('btnCancelar');
const formAgendamento = document.getElementById('formAgendamento');
const listaAgendamentos = document.getElementById('listaAgendamentos');
const filtro = document.getElementById('filtro');

// Array para guardar os agendamentos
let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];

function salvarLocalStorage() {
  localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
}

// Função para abrir o modal
function abrirModal() {
  modalForm.style.display = 'flex';
  formAgendamento.reset();
  document.getElementById('nome').focus();
}

// Função para fechar o modal
function fecharModal() {
  modalForm.style.display = 'none';
}

// Função para renderizar a tabela
function renderizarTabela(lista) {
  listaAgendamentos.innerHTML = '';

  lista.forEach((agendamento, index) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${agendamento.nome}</td>
      <td>${agendamento.cpf}</td>
      <td>${agendamento.data}</td>
      <td>${agendamento.hora}</td>
      <td>${agendamento.obs}</td>
      <td><span class="status agendado">Agendado</span></td>
      <td><button class="btn-remover" data-index="${index}">Remover</button></td>
    `;

    listaAgendamentos.appendChild(tr);
  });
}

// Função para filtrar a tabela pelo nome
function filtrarTabela() {
  const textoFiltro = filtro.value.toLowerCase();
  const filtrados = agendamentos.filter(agendamento =>
    agendamento.cpf.toLowerCase().includes(textoFiltro)
  );
  renderizarTabela(filtrados);
}

// Evento para abrir o modal
btnNovo.addEventListener('click', abrirModal);

// Evento para fechar modal no botão cancelar
btnCancelar.addEventListener('click', fecharModal);

// Evento para fechar modal clicando fora do conteúdo
modalForm.addEventListener('click', e => {
  if (e.target === modalForm) {
    fecharModal();
  }
});

// Evento submit do formulário para salvar agendamento
formAgendamento.addEventListener('submit', e => {
  e.preventDefault();

  // Pegar valores do formulário
  const novoAgendamento = {
    nome: formAgendamento.nome.value.trim(),
    cpf: formAgendamento.cpf.value.trim(),
    data: formAgendamento.data.value,
    hora: formAgendamento.hora.value,
    obs: formAgendamento.obs.value.trim()
  };

  // Adicionar no array
  agendamentos.push(novoAgendamento);

  // Atualizar tabela
  renderizarTabela(agendamentos);
  salvarLocalStorage();

  // Fechar modal
  fecharModal();
});

// Evento para remover agendamento via delegação (botões dentro da tabela)
listaAgendamentos.addEventListener('click', e => {
  if (e.target.classList.contains('btn-remover')) {
    const index = e.target.getAttribute('data-index');
    agendamentos.splice(index, 1);
    renderizarTabela(agendamentos);
    salvarLocalStorage();
  }
});

// Evento para filtrar ao digitar no campo filtro
filtro.addEventListener('input', filtrarTabela);

// Inicializa a tabela vazia
renderizarTabela(agendamentos);

