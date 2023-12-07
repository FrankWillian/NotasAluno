const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const students = {};

// Função para coletar nome e notas de um aluno
function collectStudentData(index, callback) {
  rl.question(`Digite o nome do aluno ${index + 1}: `, (name) => {
    const grades = [];

    // Função para coletar cada nota de forma síncrona
    function collectGrade(gradeIndex) {
      if (gradeIndex < 3) {
        rl.question(`Digite a nota ${gradeIndex + 1} para ${name}: `, (grade) => {
          // Verificamos se a entrada é um número válido
          if (!isNaN(grade)) {
            grades.push(parseFloat(grade));
            collectGrade(gradeIndex + 1);
          } else {
            console.log('Por favor, digite um número válido.');
            collectGrade(gradeIndex); // Pedimos novamente a mesma nota
          }
        });
      } else {
        // Quando todas as notas são coletadas, armazenamos no objeto students
        students[name] = grades;
        callback(); // Chamamos a função de retorno de chamada para continuar o fluxo
      }
    }

    // Iniciamos o processo de coleta de notas chamando a função collectGrade
    collectGrade(0);
  });
}

// Função para calcular e exibir a média das notas de um aluno
function calculateAndDisplayAverage(name) {
  const grades = students[name];

  if (grades) {
    // Calculamos a média das notas
    const average = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
    console.log(`A média de notas para ${name} é: ${average.toFixed(2)}`);
  } else {
    console.log(`Não foram encontradas notas para ${name}.`);
  }

  rl.close(); // Fechamos a interface readline quando o processo é concluído
}

// Função principal que inicia o processo de coleta de nomes e notas
function startStudentDataCollection() {
  let count = 0;

  // Função para coletar nomes e notas para três alunos
  function collectDataForMultipleStudents() {
    if (count < 3) {
      collectStudentData(count, () => {
        count++;
        collectDataForMultipleStudents(); // Chamamos a função de forma recursiva para o próximo aluno
      });
    } else {
      // Quando todas as informações são coletadas, solicitamos um nome para calcular a média
      rl.question('Digite um nome para calcular a média de notas: ', (searchName) => {
        calculateAndDisplayAverage(searchName);
      });
    }
  }

  // Iniciamos o processo chamando a função collectDataForMultipleStudents
  collectDataForMultipleStudents();
}

// Iniciamos o programa chamando a função principal
startStudentDataCollection();
