// Inicio da função para redirecionar para o linkedin
function redirecionarParaPagina1() {
    // Redireciona para outra página
    window.open("https://www.linkedin.com/in/fabioguimaraes1/", "_blank");
}
//Fim da função para redirecionar para o linkedin

//Inicio da função para salvar jogadores e notas
let jogadores = [];  
let rodadas = 1;     
let jogadorAtual = 0;

// Carregar jogadores do localStorage
function carregarJogadores() {
    const jogadoresSalvos = localStorage.getItem('jogadores');
    if (jogadoresSalvos) {
        jogadores = JSON.parse(jogadoresSalvos);
        exibirJogadores();
    }
}

// Exibir jogadores na lista
function exibirJogadores() {
    const listaJogadores = document.getElementById('listaJogadores');
    listaJogadores.innerHTML = ''; // Limpa a lista atual

    jogadores.forEach((jogador, index) => {
        const item = document.createElement('li');
        item.innerHTML = `
            <strong>${jogador.nome}</strong>
            <div class="rodadas">
                ${jogador.pontuacao.map((pontos, rodadaIndex) => `
                    <div class="rodada">
                        <strong>Rodada ${rodadaIndex + 1}:</strong> ${pontos} pontos
                    </div>
                `).join('')}
            </div>
            <div class="pontuacao">
                Pontuação total: ${jogador.total}
            </div>
        `;
        listaJogadores.appendChild(item);
    });

    // Atualizar o total de todas as rodadas
    atualizarTotalRodadas();
}

// Adicionar jogador à lista
function adicionarJogador() {
    const nomeJogador = document.getElementById('novoJogador').value.trim();
    if (nomeJogador) {
        jogadores.push({ nome: nomeJogador, pontuacao: [], total: 0 });
        document.getElementById('novoJogador').value = ''; // Limpar campo de input
        salvarJogadores();
        exibirJogadores();
    } else {
        alert('Digite o nome do jogador!');
    }
}

// Adicionar nota à pontuação do jogador
function adicionarNota() {
    const nota = document.getElementById('novanota').value.trim();
    if (nota && !isNaN(nota) && jogadores.length > 0) {
        const pontos = parseInt(nota, 10);
        jogadores[jogadorAtual].pontuacao.push(pontos);
        jogadores[jogadorAtual].total = jogadores[jogadorAtual].pontuacao.reduce((acc, cur) => acc + cur, 0);

        // Aumenta a rodada e vai para o próximo jogador
        jogadorAtual = (jogadorAtual + 1) % jogadores.length;

        // Se todos os jogadores receberam nota, aumenta o número da rodada
        if (jogadorAtual === 0) {
            rodadas++;
        }

        document.getElementById('novanota').value = ''; // Limpar campo de input
        salvarJogadores();
        exibirJogadores();
    } else {
        alert('Por favor, insira uma nota válida.');
    }
}

// Atualiza o total de pontuação de todas as rodadas
function atualizarTotalRodadas() {
    const totalPontuacao = jogadores.reduce((acc, jogador) => acc + jogador.total, 0);
    const totalRodadasDiv = document.getElementById('pontuacaoTotal');
    totalRodadasDiv.innerHTML = `Total: ${totalPontuacao} pontos`;
}

// Salvar jogadores no localStorage
function salvarJogadores() {
    localStorage.setItem('jogadores', JSON.stringify(jogadores));
}
//Fim da função para salvar jogadores e notas

// Inicializa a página
window.onload = carregarJogadores;

//Inicio da função para bloquar caracteres no nome
function bloquearCaracteres1(event) {
    var tecla = event.which || event.keyCode;
    var teclaCaracter = String.fromCharCode(tecla);
    
    // Permite apenas letras (a-zA-Z)
    var regex = /^[a-zA-Z]+$/;
    
    // Se o caractere não corresponder à expressão regular, bloqueia a tecla
    if (!regex.test(teclaCaracter)) {
        event.preventDefault();
    }
}
// Fim da função para bloquear caracteres no nome

//Inicio da função para bloquar caracteres na nota
function bloquearCaracteres2(event) {
    var tecla = event.which || event.keyCode;
    var teclaCaracter = String.fromCharCode(tecla);
    
    // Permite apenas números (0-9)
    var regex = /^[0-9]+$/;
    
    // Se o caractere não corresponder à expressão regular, bloqueia a tecla
    if (!regex.test(teclaCaracter)) {
        event.preventDefault();
    }
}
// Fim da função para bloquear caracteres na nota

//Inicio da função para limpar formulario
function limparpartidas() {
    // Limpar o localStorage
    localStorage.removeItem('jogadores');

    // Atualizar a página
    window.location.reload();
}
//Fim da função para limpar formulario