// Variables 
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners(); // aqui se cargan todos los eventos del documento
function cargarEventListeners() {
    // Cuando agregas un curso presionandoo "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso); 

    // Elimina cursos del cariito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // reseteamos el arreglo

        limpiarHTML(); // Eliminamos todo el HTML
    }); 
}


// Funciones 
function agregarCurso(e) {
    e.preventDefault(); // elimina las acciones por defecto
    if(e.target.classList.contains('agregar-carrito')) { // comprueba que se de click a el boton 'agregar carrito'
        const cursoSeleccionado = e.target.parentElement.parentElement; // toma todo el card

        leerDatosCurso(cursoSeleccionado);
    }
}

// Elimina un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // Elimina del arreglo de articulos carrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );

        carritoHTML();
    }
}


// Lee el contenido del html al que dimos click y extrae la información del curso
function leerDatosCurso(curso) {
    // Crear un objeto con el contenido del curso actual
    const infoCurso = { // crea un objeto de un mini card para el carrito
        imagen: curso.querySelector('img').src, // se extrae el src de la imagen
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'), // seleccionamos el id de un atribute
        cantidad: 1
    }

    // revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if(existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
            } else {
                return curso; // retorna los objetos no duplicados
            }
        });
        articulosCarrito = [...cursos]; // crea una copia nueva del map y la inserta a articulosCarrito
    } else {
        // Agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    

    carritoHTML();

}


// Muestra el carrito de compras en el HTML
function carritoHTML() {

    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML

    articulosCarrito.forEach( curso => {
        const { titulo, precio, cantidad, imagen, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;

        //Agrega el html al tbody
        contenedorCarrito.appendChild(row);
    });
}

// Elimina los cursos del tbody
function limpiarHTML() {
    // forma lenta
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild) { // se ejecuta todas las veces necesarias siempre que haya al menos un primer elemento hijo
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}