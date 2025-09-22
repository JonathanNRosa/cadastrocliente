const apiURL = 'https://crudcrud.com/api/ea0963f7b03e4664ba059437900ea341/clientes'; 
const form = document.getElementById('formularioCliente');
const listaClientes = document.getElementById('clientesCadastrados');

async function listarClientes() {
    listaClientes.innerHTML = '';
    try {
        const res = await fetch(apiURL);
        const clientes = await res.json();

        clientes.forEach(cliente => {
            const li = document.createElement('li');
            li.textContent = `${cliente.name} - ${cliente.email}`;
            
            const btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.onclick = () => excluirCliente(cliente._id);

            li.appendChild(btnExcluir);
            listaClientes.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao listar clientes:', error);
    }
}

// Função para cadastrar cliente
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    try {
        await fetch(apiURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        });
        form.reset();
        listarClientes();
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
    }
});

// Função para excluir cliente
async function excluirCliente(id) {
    try {
        await fetch(`${apiURL}/${id}`, { method: 'DELETE' });
        listarClientes();
    } catch (error) {
        console.error('Erro ao excluir cliente:', error);
    }
}

// Inicializa a lista
listarClientes();
