const apiBase = "https://localhost:7140";

async function getSimulatedExam() {
  try {
    const endpoint = "/api/SimulatedExam";
    const response = await fetch(`${apiBase}${endpoint}`);
    const dados = await response.json();
    console.log(dados);

    const tabela = document.getElementById('tbSimulados');

    dados.forEach(item => {
      const tr = document.createElement('tr');

      const tdId = document.createElement('td');
      tdId.textContent = item.id;
      tr.appendChild(tdId);

      console.log("id" + item.id)

      const tdNome = document.createElement('td');
      tdNome.textContent = item.nome;
      tr.appendChild(tdNome);

      const tdDescricao = document.createElement('td');
      tdDescricao.textContent = item.descricao;
      tr.appendChild(tdDescricao);

      const tdDetalhes = document.createElement('td');
      tdDetalhes.innerHTML = `<button onclick="detalhes(${item.id})">Ver</button>`;
      tr.appendChild(tdDetalhes)

      const tdEditar = document.createElement('td');
      tdEditar.innerHTML = `<button data-toggle="modal" data-target="#ExemploModalCentralizado" onclick="editar(${item.id})">Editar</button>`;
      console.log(tdEditar)
      tr.appendChild(tdEditar)

      const tdDeletar = document.createElement('td');
      tdDeletar.innerHTML = `<button onclick="deletar(${item.id})">Deletar</button>`;
      tr.appendChild(tdDeletar)

      tabela.appendChild(tr);
    });

    const container = document.getElementById("container");

    // dados.forEach(item => {
    //   const select = document.createElement("select");

    //   const op = document.createElement("option");
    //   op.textContent = item.nome;
    //   select.appendChild(op);

    //   container.appendChild(select);
    // });

  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
}

async function getQuestionExam() {
  try {
    const endpoint = "/api/Question";
    const response = await fetch(`${apiBase}${endpoint}`);
    const dados = await response.json();
    console.log(dados);
    console.log("cachorro")

    const tabela = document.getElementById('tbQuestion');

    dados.forEach(item => {
      const tr = document.createElement('tr');

      const tdId = document.createElement('td');
      tdId.textContent = item.id;
      tr.appendChild(tdId);

      const tdNome = document.createElement('td');
      tdNome.textContent = item.texto;
      tr.appendChild(tdNome);

      const tdDescricao = document.createElement('td');
      tdDescricao.textContent = item.explicacao;
      tr.appendChild(tdDescricao);

      const tdNomeExame = document.createElement('td');
      tdNomeExame.textContent = item.nomeExame;
      tr.appendChild(tdNomeExame);

      const tdDetalhes = document.createElement('td');
      tdDetalhes.innerHTML = `<button onclick="detalhes(${item.id})">Ver</button>`;
      tr.appendChild(tdDetalhes)

      const tdEditar = document.createElement('td');
      tdEditar.innerHTML = `<button onclick="editarQuestion(${item.id})">Editar</button>`;
      tr.appendChild(tdEditar)

      const tdDeletar = document.createElement('td');
      tdDeletar.innerHTML = `<button onclick="deletar(${item.id})">Deletar</button>`;
      tr.appendChild(tdDeletar)

      tabela.appendChild(tr);
    });


  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
}

async function getOption() {
  try {
    const endpoint = "/api/Option";
    const response = await fetch(`${apiBase}${endpoint}`);
    const dados = await response.json();
    console.log(dados);

    const tabela = document.getElementById('tbOption');

    dados.forEach(item => {
      const tr = document.createElement('tr');

      const tdId = document.createElement('td');
      tdId.textContent = item.id;
      tr.appendChild(tdId);

      const tdNome = document.createElement('td');
      tdNome.textContent = item.texto;
      tr.appendChild(tdNome);

      const tdDescricao = document.createElement('td');
      tdDescricao.textContent = item.correta;
      tr.appendChild(tdDescricao);

      const tdNomeExame = document.createElement('td');
      tdNomeExame.textContent = item.questao;
      tr.appendChild(tdNomeExame);

      const tdEditar = document.createElement('td');
      tdEditar.innerHTML = `<button onclick="editar(${item.id})">Editar</button>`;
      tr.appendChild(tdEditar)

      const tdDeletar = document.createElement('td');
      tdDeletar.innerHTML = `<button onclick="deletar(${item.id})">Deletar</button>`;
      tr.appendChild(tdDeletar)

      tabela.appendChild(tr);
    });


  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
}

function postSimulatedExam() {
  document.getElementById("createSimulatedExam").addEventListener("submit", function (event) {
    event.preventDefault();

    const data = {
      nome: document.getElementById("nome").value,
      descricao: document.getElementById("descricao").value
    };

    const endpoint = "/api/SimulatedExam";

    fetch((`${apiBase}${endpoint}`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(result => console.log("Resposta da API:", result))
      .catch(err => console.error("Erro:", err));
  });
}

function putSimulatedExam() {
  document.getElementById("EditSimulatedExam").addEventListener("submit", function (event) {
    event.preventDefault();

    const data = {
      nome: document.getElementById("nome").value,
      descricao: document.getElementById("descricao").value
    };

    const endpoint = `/api/SimulatedExam/${id}`;

    fetch((`${apiBase}${endpoint}`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(result => console.log("Resposta da API:", result))
      .catch(err => console.error("Erro:", err));
  });
}

function putQuestion() {
  document.getElementById("EditQuestion").addEventListener("submit", function (event) {
    event.preventDefault();

    const data = {
      nome: document.getElementById("nome").value,
      descricao: document.getElementById("descricao").value
    };

    const endpoint = `/api/Question/${id}`;

    fetch((`${apiBase}${endpoint}`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(result => console.log("Resposta da API:", result))
      .catch(err => console.error("Erro:", err));
  });
}

function postQuestion() {
  document.getElementById("createQuestion").addEventListener("submit", function (event) {
    event.preventDefault();

    const data = {
      texto: document.getElementById("enunciado").value,
      explicacao: document.getElementById("explicacao").value,
      examId: document.getElementById("selecao").value,
      ordem: 1

    };
    console.log(data.examId)

    const endpoint = "/api/question";

    fetch((`${apiBase}${endpoint}`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(result => console.log("Resposta da API:", result))
      .catch(err => console.error("Erro:", err));
  });
}

async function detalhes(id) {
  try {
    const endpoint = `/api/SimulatedExam/${id}`;
    const response = await fetch(`${apiBase}${endpoint}`);

    if (!response.ok) throw new Error("Erro ao buscar o exame");

    const dados = await response.json();

    localStorage.setItem("dadosExame", JSON.stringify([dados]));

    window.location.href = "detalhesExame.html";
  } catch (err) {
    console.error(err);
    alert("Não foi possível buscar o exame.");
  }
}

async function detalhesQuestion(id) {
  try {
    const endpoint = `/api/Question/${id}`;
    const response = await fetch(`${apiBase}${endpoint}`);

    if (!response.ok) throw new Error("Erro ao buscar o exame");

    const dados = await response.json();

    localStorage.setItem("dadosExame", JSON.stringify([dados]));

    window.location.href = "detalhesQuestion.html";
  } catch (err) {
    console.error(err);
    alert("Não foi possível buscar o exame.");
  }
}


function montarTabela() {
  const tabela = document.getElementById("abc");
  if (!tabela) return;

  const dados = JSON.parse(localStorage.getItem("dadosExame")) || [];

  const exame = Array.isArray(dados) ? dados[0] : dados;

  console.log(dados)
  console.log("Gato")

  exame.questions.forEach(q => {
    const tr = document.createElement("tr");

    const tdId = document.createElement("td");
    tdId.textContent = q.id;
    tr.appendChild(tdId);
    console.log(q.id)

    const tdIdOrdem = document.createElement("td");
    tdIdOrdem.textContent = q.ordem;
    tr.appendChild(tdIdOrdem);

    const tdTexto = document.createElement("td");
    tdTexto.textContent = q.texto;
    tr.appendChild(tdTexto);

    const tdDetalhes = document.createElement('td');
    tdDetalhes.innerHTML = `<button onclick="detalhes(${q.id})">Ver</button>`;
    tr.appendChild(tdDetalhes)

    const tdEditar = document.createElement("td");
    tdEditar.innerHTML = `<button onclick="editar(${q.id})">Editar</button>`;
    tr.appendChild(tdEditar);

    const tdDeletar = document.createElement("td");
    tdDeletar.innerHTML = `<button onclick="deletar(${q.id})">Deletar</button>`;
    tr.appendChild(tdDeletar);

    tabela.appendChild(tr);
  });


  document.getElementById("nomeExame").textContent = exame.nome;
  document.getElementById("descricaoExame").textContent = exame.descricao;
  document.getElementById("dataExame").textContent = exame.dataCriacao;
}






async function editar(id) {
  try {
    const endpoint = `/api/SimulatedExam/${id}`;
    const response = await fetch(`${apiBase}${endpoint}`);

    if (!response.ok) {
      throw new Error("Erro ao buscar o exame");
    }

    const dados = await response.json();
    console.log(dados);

    document.getElementById("id").value = dados.id;
    document.getElementById("nomeExame").value = dados.nome;
    document.getElementById("descricao").value = dados.descricao;


  } catch (error) {
    console.error(error);
    alert("Não foi possível buscar o exame.");
  }
}

async function salvar() {

  const data = {
    id: document.getElementById("id").value,
    nome: document.getElementById("nomeExame").value,
    descricao: document.getElementById("descricao").value
  };

  const endpoint = `/api/SimulatedExam/${data.id}`;

  await fetch((`${apiBase}${endpoint}`), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  location.reload();

}

async function deletar(id) {
  try {
    const endpoint = `/api/SimulatedExam/${id}`;
    const response = await fetch(`${apiBase}${endpoint}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar exame");
    }

    alert(`Usuário ${id} deletado com sucesso!`);
  } catch (error) {
    console.error(error);
    alert("Não foi possível deletar o exame.");
  }
}


if (window.location.pathname.endsWith("detalhesExame.html")) {
  window.addEventListener("DOMContentLoaded", montarTabela);
}

if (document.getElementById('tbSimulados') != null) getSimulatedExam();

if (document.getElementById('tbOption') != null) getOption();

if (document.getElementById('tbQuestion') != null) getQuestionExam();

if (document.getElementById('createSimulatedExam') != null) postSimulatedExam();

if (document.getElementById('EditSimulatedExam') != null) patSimulatedExam();

if (document.getElementById('EditQuestion') != null) patQuestion();

if (document.getElementById('createQuestion') != null) getSimulatedExamNome(), postQuestion();

async function getSimulatedExamNome() {
  const endpoint = "/api/SimulatedExam";
  const response = await fetch(`${apiBase}${endpoint}`);
  const dados = await response.json();
  console.log(dados);

  const select = document.getElementById('selecao')

  dados.forEach(item => {
    const op = document.createElement('option')
    op.textContent = item.nome
    op.value = item.id
    select.appendChild(op);
  });
}


async function editarQuestion(id) {
  try {
    const endpoint = `/api/Question/${id}`;
    const response = await fetch(`${apiBase}${endpoint}`);

    if (!response.ok) {
      throw new Error("Erro ao buscar o exame");
    }

    const dados = await response.json();
    console.log(dados);

    document.getElementById("id").value = dados.id;
    document.getElementById("nomeExame").value = dados.nome;
    document.getElementById("descricao").value = dados.descricao;


  } catch (error) {
    console.error(error);
    alert("Não foi possível buscar o exame.");
  }
}