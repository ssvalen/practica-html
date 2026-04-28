const listaTareas = document.getElementById('listaTareas')
const input = document.getElementById('tareaInput')
const mensajeError = document.getElementById('mensajeError')

document.getElementById('agregarBtn').addEventListener('click', agregarTarea)
input.addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        agregarTarea();
    }
})

function agregarTarea(){
    console.log('Inicia funcion agregar tarea')

    const textArea = input.value.trim()

    if(textArea === ""){
        mensajeError.innerHTML = "Ingrese un texto para agregar la tarea"
        mensajeError.style.display = 'block'
        return
    }else{
        mensajeError.style.display = 'none'
    }

    crearTarea(textArea)
    input.value = ""

    guardarLocalStorage()

    console.log('Finaliza funcion agregar tarea')
}

function crearTarea(texto, completada = false){
    console.log('Inicia funcion crear tarea')

    const li = document.createElement('li')
    li.textContent = texto

    if(completada){
        li.classList.add('completada')
    }

    li.addEventListener('click', () => {
        li.classList.toggle('completada')
        guardarLocalStorage()
    })

    const eliminar = document.createElement('span')
    eliminar.textContent = 'x'
    eliminar.classList.add('eliminar')
    eliminar.addEventListener('click', (e) => {
        li.remove()
    })

    li.appendChild(eliminar)

    listaTareas.appendChild(li)

    console.log('Finaliza funcion crear tarea')
}

function guardarLocalStorage(){
    const tareas = []

    listaTareas.querySelectorAll('li').forEach(li => {
        tareas.push({
            texto: li.firstChild.textContent,
            completada: li.classList.contains('completada')
        })
    })

    localStorage.setItem('tareas', JSON.stringify(tareas))
}

function cargarDesdeLocalStorage(){
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas'))
    tareasGuardadas.forEach(tarea => crearTarea(tarea.texto, tarea.completada))
}
cargarDesdeLocalStorage();
