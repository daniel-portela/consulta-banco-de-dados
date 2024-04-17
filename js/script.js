// Função para fechar o console SQL
function closeConsole() {
  const consoleDiv = document.getElementById("sql-console");
  consoleDiv.style.display = "none";
}

// Função para limpar a consulta SQL
function clearQuery() {
  // Limpa o campo de texto
  const textarea = document.querySelector(".sql-console textarea");
  textarea.value = "";

  // Limpa o campo cinza
  const resultsDiv = document.getElementById("sql-results");
  resultsDiv.innerHTML = "";
}

// Função para mostrar os filtros de acordo com a tabela selecionada
function showFilters(tableName) {
  // Primeiro, esconde todos os filtros
  const allFilters = document.querySelectorAll(".filters");
  allFilters.forEach((filter) => (filter.style.display = "none"));

  // Mostra os filtros específicos da tabela escolhida
  const specificFilter = document.getElementById(`${tableName}-filters`);
  if (specificFilter) {
    specificFilter.style.display = "block";
    specificFilter.style.top = "50px"; // Ajuste a posição vertical aqui
  }
}

// Função para abrir/fechar o console SQL
function toggleConsole() {
  const consoleDiv = document.getElementById("sql-console");
  const tableView = document.getElementById("tabela");

  if (consoleDiv.style.display === "none") {
    consoleDiv.style.display = "block";
    tableView.style.display = "none"; // Esconde o campo de tabela
  } else {
    consoleDiv.style.display = "none";
    tableView.style.display = "block"; // Exibe o campo de tabela novamente
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Adiciona event listeners a todos os botões "Filtrar"
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", function () {
      let tableName = button.getAttribute("data-table");
      let filtersId = tableName + "-filters";
      let filterResultsId = tableName + "-results";
      let filtersDiv = document.getElementById(filtersId);
      let filterResultsDiv = document.getElementById(filterResultsId);

      if (filtersDiv && filterResultsDiv) {
        let inputs = filtersDiv.querySelectorAll("input");

        // Limpa os resultados anteriores e mostra os novos
        filterResultsDiv.innerHTML = "";
        inputs.forEach((input) => {
          let p = document.createElement("p");
          p.textContent = input.placeholder + ": " + input.value;
          filterResultsDiv.appendChild(p);
        });
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var dragItem = document.querySelector(".resize-handle");
  var container = dragItem.parentElement;

  var active = false;
  var currentX;
  var currentY;
  var initialX;
  var initialY;
  var xOffset = 0;
  var yOffset = 0;

  container.addEventListener("mousedown", dragStart, false);
  document.addEventListener("mouseup", dragEnd, false);
  document.addEventListener("mousemove", drag, false);

  function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;

    if (e.target === dragItem) {
      active = true;
    }
  }

  function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    active = false;
  }

  function drag(e) {
    if (active) {
      e.preventDefault();

      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      xOffset = currentX;
      yOffset = currentY;

      setTranslate(currentX, currentY, container);
    }
  }

  function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
  }
});

// Função para executar a consulta SQL
function executeSQL() {
  const textarea = document.querySelector(".sql-console textarea");
  const query = textarea.value.trim();

  if (query === "") {
    window.alert("Por favor, insira uma consulta SQL.");
    return;
  }

  const resultsDiv = document.getElementById("sql-results");
  resultsDiv.style.display = "block";
  resultsDiv.innerHTML = query; // Exibe a consulta no campo amarelo
}

// Variáveis para rastrear o arrasto do menu
let isDraggingMenu = false;
let startX = 0;
let startMenuWidth;

// Inicializando o arrasto do menu
document.querySelector(".menu").addEventListener("mousedown", function (event) {
  isDraggingMenu = true;
  startX = event.clientX;
  startMenuWidth = this.offsetWidth;
  document.body.classList.add("no-select");
});

// Evento para monitorar o movimento do mouse durante o arrasto
document.addEventListener("mousemove", function (event) {
  if (isDraggingMenu) {
    let deltaX = event.clientX - startX;
    let newMenuWidth = startMenuWidth + deltaX;
    document.querySelector(".menu").style.width = newMenuWidth + "px";
  }
});

// Evento para finalizar o arrasto
document.addEventListener("mouseup", function () {
  isDraggingMenu = false;
  document.body.classList.remove("no-select");
});

// Arrastar o console
let isDraggingConsole = false;
let offsetX = 0;
let offsetY = 0;

document
  .querySelector(".sql-console")
  .addEventListener("mousedown", function (event) {
    // Verifica se o clique foi no próprio console e não em um filho dele.
    if (event.target === this) {
      event.preventDefault(); // Previne o comportamento padrão.

      isDraggingConsole = true;
      offsetX = event.clientX - this.getBoundingClientRect().left;
      offsetY = event.clientY - this.getBoundingClientRect().top;
      document.body.classList.add("no-select");
    }
  });

// Evento para monitorar o movimento do mouse durante o arrasto do console
document.addEventListener("mousemove", function (event) {
  if (isDraggingConsole) {
    const consoleDiv = document.getElementById("sql-console");
    consoleDiv.style.left = event.clientX - offsetX + "px";
    consoleDiv.style.top = event.clientY - offsetY + "px";
  }
});

// Evento para finalizar o arrasto do console
document.addEventListener("mouseup", function () {
  isDraggingConsole = false;
  document.body.classList.remove("no-select");
});

// Painel de resultado possível de redimensionar verticalmente
let isDraggingHandle = false;
let startHandleY = 0;
let startResultsHeight;
let startHandleTop;
const maxHeight = window.innerHeight - 100;

document.addEventListener("DOMContentLoaded", function () {
  const el = document.querySelector(".sql-results");

  let isDragging = false;
  let dragStartX, dragStartY;

  // Iniciar o arrasto
  el.addEventListener(
    "mousedown",
    function (e) {
      isDragging = true;
      dragStartX = e.clientX - el.offsetLeft;
      dragStartY = e.clientY - el.offsetTop;
      el.style.opacity = "0.8"; // Opcional: reduz a opacidade ao arrastar
      document.body.style.userSelect = "none"; // Previne a seleção de texto durante o arrasto
    },
    true
  );

  // Mover o elemento
  document.addEventListener(
    "mousemove",
    function (e) {
      if (!isDragging) return;
      el.style.left = e.clientX - dragStartX + "px";
      el.style.top = e.clientY - dragStartY + "px";
    },
    true
  );

  // Finalizar o arrasto
  document.addEventListener(
    "mouseup",
    function () {
      isDragging = false;
      el.style.opacity = "1"; // Restaura a opacidade
      document.body.style.userSelect = ""; // Restaura a seleção de texto
    },
    true
  );
});

function showTableWithFilters(tableName) {
  // Primeiro, exibe os filtros correspondentes
  showFilters(tableName);

  // Em seguida, mostra a tabela
  showTable(tableName);
}

function showTable(tableName) {
  const resultsDiv = document.getElementById("sql-results");
  resultsDiv.style.display = "block";
  resultsDiv.style.backgroundColor = "#f0f0f0";
  // ocultar os resultados da consulta SQL (se estiverem sendo exibidos)
  const consoleDiv = document.getElementById("sql-console");
  consoleDiv.style.display = "none";

  // Aqui, você pode adicionar código para realmente carregar e exibir os dados da tabela correspondente.
}

function openFileManager() {
  window.alert("Olá! Esse campo está passando por melhorias :)");
}

// Função para adicionar o conteúdo ao campo cinza (sql-results)
function appendToSqlResults(content) {
  const sqlResults = document.getElementById("sql-results");
  // Assegura que o campo cinza seja visível
  sqlResults.style.display = "block";

  // Verifica se o campo já contém algum conteúdo
  if (sqlResults.innerHTML.trim() !== "") {
    // Adiciona o conteúdo com uma barra separadora se já houver conteúdo existente
    sqlResults.innerHTML += `<div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #ccc;">${content}</div>`;
  } else {
    // Adiciona o conteúdo diretamente se for o primeiro
    sqlResults.innerHTML += `<div>${content}</div>`;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Selecione o botão "Filtrar" na seção de Clientes
  const filtrarClientesBtn = document.querySelector("#clientes-filters .btn");

  // Adiciona um ouvinte de eventos ao botão "Filtrar"
  filtrarClientesBtn.addEventListener("click", function () {
    const nomeDoClienteInput = document.querySelector(
      '[placeholder="Nome do Cliente"]'
    );
    const cpfInput = document.querySelector('[placeholder="CPF"]');

    // Verifica se há valor nos campos de entrada antes de adicionar
    if (nomeDoClienteInput.value || cpfInput.value) {
      // Constrói a string de conteúdo baseada nos valores de entrada
      let content = "";
      if (nomeDoClienteInput.value)
        content += `Nome do Cliente: ${nomeDoClienteInput.value}<br>`;
      if (cpfInput.value) content += `CPF: ${cpfInput.value}`;

      // Adiciona ao campo cinza com a função modificada
      appendToSqlResults(content);

      // Limpa os campos de entrada
      nomeDoClienteInput.value = "";
      cpfInput.value = "";
    }
  });
});

// Simula a obtenção de histórico de transações baseadas na data escolhida
function buscarHistoricoTransacoesPorData(data) {
  // Gera uma lista de transações simuladas para várias datas
  const transacoesSimuladas = [];
  for (let i = 1; i <= 30; i++) {
    const dataSimulada = `2024-03-${i.toString().padStart(2, "0")}`;
    // Adiciona múltiplas transações para cada dia
    transacoesSimuladas.push({
      data: dataSimulada,
      descricao: "Compra de produto A",
      valor: "R$ 100,00",
      dataPagamento: `2024-03-${(i + 3).toString().padStart(2, "0")}`,
    });
    transacoesSimuladas.push({
      data: dataSimulada,
      descricao: "Venda de serviço B",
      valor: "R$ 150,00",
      dataPagamento: `2024-03-${(i + 2).toString().padStart(2, "0")}`,
    });
  }

  // Filtra as transações pela data selecionada
  return transacoesSimuladas.filter((transacao) => transacao.data === data);
}

// Função modificada para apresentar o histórico de transações com espaçamento
document.addEventListener("DOMContentLoaded", function () {
  const filtrarTransacoesBtn = document.querySelector(
    "#transacoes-filters .btn"
  );

  filtrarTransacoesBtn.addEventListener("click", function () {
    const dataTransacaoInput = document.querySelector('[type="date"]');
    const dataTransacao = dataTransacaoInput.value;

    // Obtém o histórico de transações para a data escolhida
    const historicoTransacoes = buscarHistoricoTransacoesPorData(dataTransacao);

    // Adiciona espaçamento abaixo do título
    let content =
      '<h4 style="margin-bottom: 20px;">Histórico de Transações</h4>';

    historicoTransacoes.forEach((transacao) => {
      // Adiciona cada item em uma nova linha
      content += `<div>Data: ${transacao.data}<br>Descrição: ${transacao.descricao}<br>Valor: ${transacao.valor}<br>Data de Pagamento: ${transacao.dataPagamento}</div><br>`;
    });

    // Se não houver transações, adiciona uma mensagem indicativa
    if (historicoTransacoes.length === 0) {
      content += "<p>Transações disponíveis para esta data.</p>";
    }

    // Adiciona ao campo cinza
    appendToSqlResults(content);

    // Limpa o campo de entrada da data da transação
    dataTransacaoInput.value = "";
  });
});

function showTableWithFilters(tableName) {
  showFilters(tableName);

  if (tableName === "fornecedores") {
    const filtrarFornecedoresBtn = document.querySelector(
      "#fornecedores-filters .btn"
    );

    filtrarFornecedoresBtn.addEventListener("click", function () {
      const fornecedores = [
        { nome: "João Silva Macedo", idade: 35, cpf: "093.993.302-01" },
        { nome: "Maria Souza Vasconcelos", idade: 28, cpf: "309.283.321-09" },
        { nome: "Anderson Vieira Santos", idade: 21, cpf: "278.654.321-09" },
        { nome: "Daniel Coimbra De Morais", idade: 49, cpf: "879.654.321-09" },
        { nome: "Lucas Santos Ribeiro", idade: 28, cpf: "301.095.321-16" },
        { nome: "Amanda Gomes Alencar", idade: 28, cpf: "123.002.333-17" },
        { nome: "Alan Ferreira Ferreira", idade: 34, cpf: "271.654.321-00" },
        { nome: "Vinícios Portela Matos", idade: 24, cpf: "009.434.392-82" },
        { nome: "Daniel Macedo Portela", idade: 24, cpf: "862.754.992-33" },
        { nome: "Karem Stéfanny Rego", idade: 47, cpf: "282.111.549-19" },
        { nome: "Vilma Pereira Correia", idade: 26, cpf: "002.654.900-27" },
      ];

      let content =
        "<style>#sql-results ul { list-style: none; padding-left: 0; }</style>";
      content += '<h4 style="margin-bottom: 10px;">Fornecedores</h4>';
      fornecedores.forEach((fornecedor) => {
        content += "<ul>";
        content += `<li>Nome: ${fornecedor.nome}</li>`;
        content += `<li>CPF: ${fornecedor.cpf}</li>`;
        content += `<li>Idade: ${fornecedor.idade}</li>`;
        content += `<hr>`;
        content += `</ul>`;
      });

      appendToSqlResults(content);
    });
  }
}

function filtrarFornecedores() {
  // Obter o valor do campo de pesquisa
  const pesquisa = document
    .getElementById("pesquisarFornecedores")
    .value.toLowerCase();

  // Obter a lista de fornecedores
  const fornecedores = [
    { nome: "João Silva Macedo", idade: 35, cpf: "093.993.302-01" },
    { nome: "Maria Souza Vasconcelos", idade: 28, cpf: "309.283.321-09" },
    { nome: "Anderson Vieira Santos", idade: 21, cpf: "278.654.321-09" },
    { nome: "Daniel Coimbra De Morais", idade: 49, cpf: "879.654.321-09" },
    { nome: "Lucas Santos Ribeiro", idade: 28, cpf: "301.095.321-16" },
    { nome: "Amanda Gomes Alencar", idade: 28, cpf: "123.002.333-17" },
    { nome: "Alan Ferreira Ferreira", idade: 34, cpf: "271.654.321-00" },
    { nome: "Vinícios Portela Matos", idade: 24, cpf: "009.434.392-82" },
    { nome: "Daniel Macedo Portela", idade: 24, cpf: "862.754.992-33" },
    { nome: "Karem Stéfanny Rego", idade: 47, cpf: "282.111.549-19" },
    { nome: "Vilma Pereira Correia", idade: 26, cpf: "002.654.900-27" },
  ];

  const fornecedoresFiltrados = fornecedores.filter((fornecedor) =>
    fornecedor.nome.toLowerCase().includes(pesquisa)
  );

  const resultsDiv = document.getElementById("sql-results");
  resultsDiv.innerHTML = "";

  fornecedoresFiltrados.forEach((fornecedor) => {
    const divFornecedor = document.createElement("div");
    divFornecedor.innerHTML = `<p>Nome: ${fornecedor.nome}</p><p>CPF: ${fornecedor.cpf}</p><p>Idade: ${fornecedor.idade}</p><hr>`;
    resultsDiv.appendChild(divFornecedor);
  });
}

function limparPesquisa() {
  document.getElementById("pesquisarFornecedores").value = "";
  document.getElementById("fornecedores-lista").innerHTML = "";
}
