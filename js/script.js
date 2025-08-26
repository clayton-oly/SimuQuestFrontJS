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

      const tdNome = document.createElement('td');
      tdNome.textContent = item.nome;
      tr.appendChild(tdNome);

      const tdDescricao = document.createElement('td');
      tdDescricao.textContent = item.descricao;
      tr.appendChild(tdDescricao);

      const tdEditar = document.createElement('td');
      tdEditar.innerHTML = `<button onclick="editar(${item.id})">Editar</button>`;
      tr.appendChild(tdEditar)

      const tdDeletar = document.createElement('td');
      tdDeletar.innerHTML = `<button onclick="deletar(${item.id})">Deletar</button>`;
      tr.appendChild(tdDeletar)

      tabela.appendChild(tr);
    });

    const container = document.getElementById("container");

    dados.forEach(item => {
      const select = document.createElement("select");

      const op = document.createElement("option");
      op.textContent = item.nome;
      select.appendChild(op);

      container.appendChild(select);
    });

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

async function editar(id) {
  try {
    const endpoint = `/api/SimulatedExam/${id}`;
    const response = await fetch(`${apiBase}${endpoint}`);

    if (!response.ok) {
      throw new Error("Erro ao buscar o exame");
    }

    const dados = await response.json();
    console.log(dados);

  } catch (error) {
    console.error(error);
    alert("Não foi possível buscar o exame.");
  }
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

if (document.getElementById('tbSimulados') != null) getSimulatedExam();

if (document.getElementById('tbOption') != null) getOption();

if (document.getElementById('tbQuestion') != null) getQuestionExam();

if (document.getElementById('createSimulatedExam') != null) postSimulatedExam();

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


