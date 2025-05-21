const cards = document.getElementById('cards');
const form = document.getElementById('formcontatos');
let update = false;
let contatoId = null;

async function lerDados() {
    try {
        let { data: agenda, error } = await _supabase
            .from('agenda')
            .select('*');

        if (error) {
            console.error('Erro ao buscar dados:', error);
            return;
        }

        cards.innerHTML = '';

        agenda.forEach(contato => {
            cards.innerHTML += `
                <div class="card w-40">
                    <div class="card-body">
                        <h5 class="card-text">Nome: <span>${contato.nome}</span></h5>
                        <h4 class="card-text">Telefone: <span>${contato.telefone}</span></h4>
                        <div>
                            <button class="btn btn-primary" onclick="editarContato(${contato.id}, '${contato.nome}', '${contato.telefone}')">Editar</button>
                            <button class="btn btn-danger" onclick="excluirContato(${contato.id})">Excluir</button>
                        </div>
                    </div>
                </div>
            `;
        });

        console.table(agenda);
    } catch (err) {
        console.error('Erro inesperado:', err);
    }
}

lerDados();

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = form.nome.value.trim();
    const telefone = form.telefone.value.trim();

    if (!nome || !telefone) {
        console.error('Por favor, preencha todos os campos.');
        return;
    }

    if (update) {
        try {
            const { data, error } = await _supabase
                .from('agenda')
                .update({ nome: nome, telefone: telefone })
                .eq('id', contatoId)
                .select();

            if (error) {
                console.error('Erro ao atualizar contato:', error);
                return;
            }

            console.log('Contato atualizado com sucesso:', data);
            form.reset();
            update = false;
            contatoId = null;
            lerDados();
        } catch (err) {
            console.error('Erro inesperado ao atualizar contato:', err);
        }
    } else {
        try {
            const { data, error } = await _supabase
                .from('agenda')
                .insert([{ nome: nome, telefone: telefone }])
                .select();

            if (error) {
                console.error('Erro ao adicionar contato:', error);
                return;
            }

            console.log('Contato adicionado com sucesso:', data);
            form.reset();
            lerDados();
        } catch (err) {
            console.error('Erro inesperado ao adicionar contato:', err);
        }
    }
});

async function editarContato(id, nome, telefone) {
    console.log(`Editar contato com ID: ${id}`);

    form.nome.value = nome;
    form.telefone.value = telefone;

    update = true;
    contatoId = id;
}

async function excluirContato(id) {
    console.log(`Excluir contato com ID: ${id}`);

    try {
        const { error } = await _supabase
            .from('agenda')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Erro ao excluir contato:', error);
            return;
        }

        console.log('Contato excluído com sucesso.');
        lerDados();
    } catch (err) {
        console.error('Erro inesperado ao excluir contato:', err);
    }
}

