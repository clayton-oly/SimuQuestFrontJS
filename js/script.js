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

      const teste = document.getElementById("opcao")
      teste.textContent = item.nome

      console.log(teste)
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

  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
}

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

document.querySelectorAll(".editar").forEach(btn => {
  btn.addEventListener("click", e => {
    const id = e.target.dataset.id;
    alert("Editar id: " + id);
    console.log(id)
  });
});

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

if (document.getElementById('tbQuestion') != null) getQuestionExam();