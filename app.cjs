// Importando a biblioteca readline para interação com o console
const readline = require('readline');

// Criando uma interface readline para leitura e escrita no console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Criando um objeto vazio para armazenar as notas dos alunos
const alunos = {};

// Função para coletar nome e notas de um aluno
function coletarDadosDoAluno(indice, retornoDeChamada) {
  // Perguntando ao usuário o nome do aluno
  rl.question(`Digite o nome do aluno ${indice + 1}: `, (nome) => {
    const notas = [];

    // Função interna para coletar cada nota de forma síncrona
    function coletarNota(indiceNota) {
      if (indiceNota < 3) {
        // Perguntando ao usuário cada nota
        rl.question(`Digite a nota ${indiceNota + 1} para ${nome}: `, (nota) => {
          // Verificando se a entrada é um número válido
          if (!isNaN(nota)) {
            notas.push(parseFloat(nota));
            coletarNota(indiceNota + 1);
          } else {
            // Se a entrada não for válida, solicitamos novamente a mesma nota
            console.log('Por favor, digite um número válido.');
            coletarNota(indiceNota);
          }
        });
      } else {
        // Quando todas as notas são coletadas, armazenamos no objeto alunos
        alunos[nome] = notas;
        // Chamamos a função de retorno de chamada para continuar o fluxo
        retornoDeChamada();
      }
    }

    // Iniciamos o processo de coleta de notas chamando a função coletarNota
    coletarNota(0);
  });
}

// Função para calcular e exibir a média das notas de um aluno
function calcularEExibirMedia(nome) {
  const notas = alunos[nome];

  if (notas) {
    // Calculamos a média das notas
    const media = notas.reduce((soma, nota) => soma + nota, 0) / notas.length;
    // Exibimos a média das notas no console
    console.log(`A média de notas para ${nome} é: ${media.toFixed(2)}`);
  } else {
    // Se não encontrarmos notas para o aluno, exibimos uma mensagem correspondente
    console.log(`Não foram encontradas notas para ${nome}.`);
  }

  // Fechamos a interface readline quando o processo é concluído
  rl.close();
}

// Função principal que inicia o processo de coleta de nomes e notas
function iniciarColetaDeDadosDoAluno() {
  let contador = 0;

  // Função interna para coletar nomes e notas para três alunos
  function coletarDadosParaMultiplosAlunos() {
    if (contador < 3) {
      // Chamamos a função para coletar dados do aluno e passamos uma função de retorno de chamada
      coletarDadosDoAluno(contador, () => {
        contador++;
        // Chamamos a função de forma recursiva para o próximo aluno
        coletarDadosParaMultiplosAlunos();
      });
    } else {
      // Quando todas as informações são coletadas, solicitamos um nome para calcular a média
      rl.question('Digite um nome para calcular a média de notas: ', (nomePesquisado) => {
        // Chamamos a função para calcular e exibir a média do aluno especificado
        calcularEExibirMedia(nomePesquisado);
      });
    }
  }

  // Iniciamos o processo chamando a função coletarDadosParaMultiplosAlunos
  coletarDadosParaMultiplosAlunos();
}

// Iniciamos o programa chamando a função principal
iniciarColetaDeDadosDoAluno();
