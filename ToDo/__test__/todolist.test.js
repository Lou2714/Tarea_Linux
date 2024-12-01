
/**
 * @jest-environment jsdom
 */

const { addTaskToToDoList, createTaskContainer } = require('../toDoApp');

beforeEach(() => {
  // Configura el DOM simulado antes de cada prueba
  document.body.innerHTML = `
    <div id="toDo_container">
        <div id="input_container">
            <input type="text" id="todo_input" placeholder="Ingrese su tarea...">
            <button id="add_task">Add task</button>
        </div>
    </div>
  `;
});

describe('Probando la To Do List', ()=> {
  test('Debería añadir una tarea al DOM y guardarla en localStorage', () => {
    const toDoInput = document.getElementById('todo_input');
    const containerToDo = document.getElementById('toDo_container');

    // Simular entrada en el input
    toDoInput.value = 'Comprar pan';

    // Añadir tarea al DOM pasando los elementos correctamente
    addTaskToToDoList(toDoInput, containerToDo);

    // Verificar que se añadió al DOM
    const tasks = containerToDo.getElementsByClassName('task');
    expect(tasks.length).toBe(1);
    expect(tasks[0].querySelector('.description_task').textContent).toBe('Comprar pan');
  });
  test('Debería marcar la tarea como completada', () => {
    const toDoInput = document.getElementById('todo_input');
    const containerToDo = document.getElementById('toDo_container');

    // Simular entrada en el input
    toDoInput.value = 'Comprar queso';

    // Añadir tarea al DOM pasando los elementos correctamente
    addTaskToToDoList(toDoInput, containerToDo);

    // Verificar si el botón de completar existe
    const btnCheck = containerToDo.querySelector('.btn_actions--complete');
    if (!btnCheck) {
      throw new Error('El botón de completar no se ha encontrado');
    }
  
    // Obtener la tarea (el párrafo con la descripción)
    const paragraph = containerToDo.querySelector('.description_task');
  
    // Simular clic en el botón de completar
    btnCheck.click();
  
    // Verificar que la clase 'complete_task' se ha añadido
    expect(paragraph.classList.contains('complete_task')).toBe(true);
  });
  
});

