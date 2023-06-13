// https://www.youtube.com/live/YDIHQzoTJ-0?feature=share
let tareas = [];
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  // console.log(event)

  const idInputHidden = document.querySelector("#idInputHidden");
  // Selecciono el input
  const txtInput = document.querySelector("#txtInput");
  // console.log(txtInput.value)

  if (idInputHidden.value) {
    tareas.forEach((tarea) => {
      if (tarea.id == idInputHidden.value) {
        tarea.text = txtInput.value;
      }
    });
  } else {
    // Creo un objeto para agregarlo al array de tareas
    tareas.push({
      // Date nos devuelve un numero que pèrtenece a una fecha en segundos desde
      // 1970 lo usaremos temporal para no instalar otra libreria
      id: Date.now(),
      text: txtInput.value,
      complete: false,
    });
  }

  // Guardamos en local storage la tarea creada, utilizamos JSON.stringify para
  // convertir el array en JSON y lograr almacenarlo en local storage.
  //   podremos verificar que el JSON es correcto en: https://jsonlint.com/
  localStorage.setItem("tareas", JSON.stringify(tareas));

  // Luego de agregar la tarea reiniciamos el imput
  // https://developer.mozilla.org/es/docs/Web/API/HTMLFormElement/reset
  // txtInput.value = "";
  //   idInputHidden.value = "";
  form.reset();

  //   console.log(tareas);
  renderTareas();
});

// Mostramos las tareas
const renderTareas = () => {
  // Volvemos a leer el array y lo parseamos a un objeto jacaScript
  tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = ""; //reinicio la tabla
  tareas.forEach(
    (tarea) =>
      (tbody.innerHTML += `
        <tr>
            <td class="${tarea.complete ? "complete" : ""}">${tarea.text}</td>
            <td>
                <button data-id="${
                  tarea.id
                }" class="btn-completar">completar</button>
                <button onclick="editarTarea(${tarea.id})">editar</button>
                <button onclick="borrarTarea(${tarea.id})">borrar</button>
            </td>
        </tr>
    `)
  );
};

document.addEventListener("click", (event) => {
  // event.target.classList.contains('btn-completar') //Devuelve true || false
  if (event.target.classList.contains("btn-completar")) {
    // event.target.dataset.id //Devuelve el id de 1 tarea
    // console.info(event.target.dataset.id);
    completarTarea(event.target.dataset.id);
  }
});

// btn completar tarea
const completarTarea = (id) => {
  tareas.forEach((tarea) => {
    if (tarea.id == id) {
      // modifico el complete del objeto tarea
      tarea.complete = !tarea.complete;
    }
  });

  // Vuelvo a leer las tareas luego de modificarlas y muestro las que queden
  localStorage.setItem("tareas", JSON.stringify(tareas));
  renderTareas();
};

// btn editar tarea
const editarTarea = (id) => {
  // El scope de la const tarea es diferente a la tarea dentro de .find()
  const tarea = tareas.find((tarea) => tarea.id == id);
  //   console.log(tarea);
  //   console.log(tarea.id);
  //   console.log(tarea.text);
  //   console.log(tarea.complete);
  // Verificamos con el condicional que exista la tarea antes de editar
  if (tarea) {
    const idInputHidden = document.querySelector("#idInputHidden");
    // console.log(idInputHidden.value)
    idInputHidden.value = tarea.id;
    // console.log(idInputHidden.value)
    const inputTxt = document.querySelector("#txtInput");
    inputTxt.value = tarea.text;
  }
  // terminamos de configurar en el bloque form
};

// btn borrar tarea
const borrarTarea = (id) => {
  // Vamos a preguntarle al usuario si realmente quiere borrar la tarea
  if (confirm(`¿Está seguro que quiere eliminar tarea id: ${id}`)) {
    // Vamos a filtrar todas las tareas menos las que queremos borrar
    const tareasFiltradas = tareas.filter((tarea) => tarea.id != id);
    // return tareasFiltradas
    localStorage.setItem("tareas", JSON.stringify(tareasFiltradas));
    renderTareas();
  }
};

// Esta funcion se ejecuta en cuanto todo el documento esta cargado
document.addEventListener("DOMContentLoaded", () => {
  renderTareas();
});
