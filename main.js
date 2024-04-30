fetch('./data.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Error al cargar el archivo JSON');
    }
    return response.json();
  })
  .then((data) => {
    // Llama a la función pregunta y pasa los datos
    pregunta(data.questions);
  })
  .catch((err) => {
    console.error(err);
    // Manejar el error de carga del archivo JSON aquí
  });

const root = document.getElementById('root');

function pregunta(questions) {
  const form = document.createElement('form');
  const divQ = document.createElement('div');
  form.appendChild(divQ);
  root.appendChild(form);
  
  // Iterar sobre cada pregunta en el JSON
  questions.forEach((question, index) => {
    const preguntaHTML = crearQuestion(question, index); // Pasamos el índice como argumento
    divQ.appendChild(preguntaHTML); // Usamos appendChild en lugar de innerHTML +=
  });
}

function crearQuestion(question) {
  const inputRadio = `
  <div id='question${question.id}'>
    <p>${question.id}. ${question.question}</p>
    <img src="${question.img.url}" alt="${question.img.alt}">
    <div>
      <label for='q${question.id}a'>${question.answer.a}</label>
      <input id='q${question.id}a' name='q${question.id}' type='radio'>
    </div>
    <div>
      <label for='q${question.id}b'>${question.answer.b}</label>
      <input id='q${question.id}b' name='q${question.id}' type='radio'>
    </div>
    <div>
      <label for='q${question.id}c'>${question.answer.c}</label>
      <input id='q${question.id}c' name='q${question.id}' type='radio'>
    </div>
    <div>
      <label for='q${question.id}d'>${question.answer.d}</label>
      <input id='q${question.id}d' name='q${question.id}' type='radio'>
    </div>
    <button class="send" onclick="responder('${question.results}')">Responder</button>
    <button class="hint" onclick="alert('${question.hint}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/>
  </svg></button>
  </div>
  `;
  const div = document.createElement('div');
  div.innerHTML = inputRadio;

  return div;
}

let preguntaIndex = 0; // Índice para rastrear la pregunta actual


function responder(results) {
  const selectedOption = document.querySelector(`input[name='q${preguntaIndex}']:checked`);

  if (!selectedOption) {
    alert('Por favor, selecciona una respuesta.');
    return;
  }

  const userAnswer = selectedOption.id.slice(-1);
  const correctAnswer = results;

  if (userAnswer !== correctAnswer) {
    alert('Respuesta incorrecta. Inténtalo de nuevo.');
    return;
  }

  // Ocultar la pregunta actual
  document.querySelector(`#question${preguntaIndex}`).style.display = 'none';

  // Incrementar el índice para pasar a la siguiente pregunta
  preguntaIndex++;

  // Mostrar la siguiente pregunta si hay más preguntas disponibles
  if (preguntaIndex < questions.length) {
    document.querySelector(`#question${preguntaIndex}`).style.display = 'block';
  } else {
    alert('¡Felicidades, has completado el cuestionario!');
  }
}


