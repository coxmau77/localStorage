// https://www.youtube.com/live/YDIHQzoTJ-0?feature=share
let tareas = [];
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  // console.log(event)

  // Selecciono el input
  const txtInput = document.querySelector("#txtInput");
  // console.log(txtInput.value)

  // Creo un objeto para agregarlo al array de tareas
  tareas.push({
    // Date nos devuelve un numero que pèrtenece a una fecha en segundos desde
    // 1970 lo usaremos temporal para no instalar otra libreria
    id: Date.now(),
    text: txtInput.value,
    complete: false,
  });

  // Guardamos en local storage la tarea creada, utilizamos JSON.stringify para
  // convertir el array en JSON y lograr almacenarlo en local storage.
//   podremos verificar que el JSON es correcto en: https://jsonlint.com/
  localStorage.setItem('tareas', JSON.stringify(tareas));

  // Luego de agregar la tarea reiniciamos el imput
  // https://developer.mozilla.org/es/docs/Web/API/HTMLFormElement/reset
  // txtInput.value = "";
  form.reset();

  console.log(tareas);
  renderTareas();
  
});

// Mostramos las tareas 
const renderTareas = () => {
    // Volvemos a leer el array y lo parseamos a un objeto jacaScript
    tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; //reinicio la tabla
    tareas.forEach( tarea => tbody.innerHTML += `
        <tr>
            <td class="${tarea.complete ? "complete":""}">${tarea.text}</td>
            <td>
                <button data-id="${tarea.id}" class="btn-completar">completar</button>
                <button>editar</button>
                <button>borrar</button>
            </td>
        </tr>
    `);
}

document.addEventListener('click', event => {
    if(event.target.classList.contains('btn-completar')){
        // console.info(event.target.dataset.id);
        completarTarea(event.target.dataset.id)
    };
})

// btn completar tarea
const completarTarea = id => {
    tareas.forEach(tarea => {
        if (tareas.id == id){
            tarea.complete = !tarea.complete;
        }
    });

    // Vuelvo a leer las tareas y muestro las que queden
    localStorage.setItem('tareas', JSON.stringify(tareas));
    renderTareas();
}

// Esta funcion se ejecuta en cuanto todo el documento esta cargado
document.addEventListener('DOMContentLoaded', () =>{
    renderTareas();
    
})
