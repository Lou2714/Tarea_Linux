
/**
 * @jest-environment jsdom
 */

const { addTaskToToDoList } = require('../toDoApp');

beforeEach(() => {
  // Configura el DOM simulado antes de cada prueba
  document.body.innerHTML = `
    <div id="toDo_container">
        <h1>To Do List</h1>
        <div id="input_container">
            <input type="text" name="todo" id="todo_input" placeholder="Ingrese su tarea...">
            <button id="add_task">Add task</button>
        </div>
        <div id="details">
            <h3>Task</h3>
            <h3>Actions</h3>
        </div>
    </div>
    <div id="modal_container">
        <div class="modal_content">
            <button id="close_modal" class="close_modal"><img src="assets/closeWindow.svg" alt=""></button>
            <h3>Ingrese la nueva tarea</h3>
            <input id="editedTask_input" class="modal_input" type="text" placeholder="Ingrese la tarea"></input>
            <button id="add_edited_task">Modify task</button>
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
    // Verificar si el botón de eliminar existe
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
  test('Debería eliminar la tarea', () => {
    const toDoInput = document.getElementById('todo_input');
    const containerToDo = document.getElementById('toDo_container');
    // Simular entrada en el input
    toDoInput.value = 'Comprar wiskas';
    // Añadir tarea al DOM pasando los elementos correctamente
    addTaskToToDoList(toDoInput, containerToDo);
    const btnDelete = containerToDo.querySelector('.btn_actions--delete');
    if (!btnDelete) {
      throw new Error('El botón de eliminar no se ha encontrado');
    }
    // Simular clic en el botón de eliminar
    btnDelete.click();
    const tasks = containerToDo.getElementsByClassName('task');
    expect(tasks.length).toBe(0);
  });
});

