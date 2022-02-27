const form = document.getElementsByTagName("form")[0];
/** @type {HTMLInputElement} */
const inputCodigo = document.getElementById("codigo");
/** @type {HTMLInputElement} */
const inputNombre = document.getElementById("nombre");
/** @type {HTMLInputElement} */
const inputCantidad = document.getElementById("cantidad");
/** @type {HTMLInputElement} */
const inputPrecio = document.getElementById("precio");
/** @type {HTMLInputElement} */
const selectCategoria = document.getElementById("categoria");
const tbody = document.getElementsByTagName("tbody")[0];
const cantidaTotalElemnt = document.getElementById("cantidad-total");
const precioTotalElemnt = document.getElementById("precio-total");
const granTotalElemnt = document.getElementById("gran-total");
let indice = 0;
let cantidadTotal = 0;
let precioTotal = 0;
let granTotal = 0;
let currentRow;
form.addEventListener("submit", onSubmit);

/**
 *
 * @param {Event} event
 */
function onSubmit(event) {
    event.preventDefault();

    const data = new FormData(form);
    const values = Array.from(data.entries());
    const [frmCodigo, frmNombre, frmCantidad, frmPrecio, frmCategoria] = values;
    let codigo = frmCodigo[1];
    const nombre = frmNombre[1];
    const cantidad = frmCantidad[1];
    const precio = frmPrecio[1];
    const categoria = frmCategoria[1];
    const total = cantidad * precio;


    cantidadTotal += parseFloat(cantidad);
    precioTotal += parseFloat(precio);
    granTotal += parseFloat(total);

    let tr;
    if (!codigo) {
        indice++;
        codigo = indice;
        tr = document.createElement("tr");
        tbody.appendChild(tr);
    } else {

        tr = currentRow;
    }

    // LetterCombination(nombre);

    tr.dataset.categoria = categoria;
    tr.innerHTML = `
    <td>${codigo} </td>
    <td>${nombre}</td>
    <td>${cantidad}</td>
    <td>${precio}</td>
    <td>${total}</td>
    <td><a onClick='onEdit(event)' href='#'>Editar</a> <a onClick='onDelete(event)' href='#'>Eliminar</a></td>
    `;

    cantidaTotalElemnt.innerText = cantidadTotal;
    precioTotalElemnt.innerText = precioTotal;
    granTotalElemnt.innerText = granTotal;

    form.reset();
    document.getElementById("nombre").focus();
}
/**
 * 
 * @param {Event} event 
 */
function onEdit(event) {
    event.preventDefault();

    /** @type {HTMLElement} */
    const anchor = event.target;

    const tr = anchor.parentElement.parentElement;
    const celdas = tr.getElementsByTagName("td");
    const [tdCodigo, tdNombre, tdCatidad, tdPrecio] = celdas;

    inputCodigo.value = tdCodigo.innerText;
    inputNombre.value = tdNombre.innerText;
    inputCantidad.value = tdCatidad.innerText;
    inputPrecio.value = tdPrecio.innerText;
    selectCategoria.value = tr.dataset.categoria;

    currentRow = tr;
}
/**
 * 
 * @param {Event} event 
 */
function onDelete(event) {
    event.preventDefault();

    /** @type {HTMLElement} */
    const anchor = event.target;

    const tr = anchor.parentElement.parentElement;

    tbody.removeChild(tr);
}


/**
 *
 * @param {string} digitos
 */
function LetterCombination(digitos) {

    const caracteres = [
        ["a", "b", "c"],
        ["d", "e", "f"],
        ["g", "h", "i"],
        ["j", "k", "l"],
        ["m", "n", "o"],
        ["p", "q", "r", "s"],
        ["t", "u", "v"],
        ["w", "x", "y", "z"]
    ];

    if (isNaN(digitos)) {
        console.error("Debe ingresar dígitos entre 2 y 9")
        return [];
    }

    if (!(digitos.length >= 0 && digitos.length <= 4)) {
        console.error("Se permite entre 0 y 4 dígitos")
        return [];
    }
    let a = [];
    if (digitos.length > 0) {
        if (isNaN(digitos[0]) || digitos[0] == 1 || digitos[0] == 0) {
            console.error("Debe Ingresar dígitos mayores a 1");
            return [];
        }
        caracteres[digitos[0] - 2].map(e => {
            a.push(e);
        })
    }
    for (let i = 1; i < digitos.length; i++) {
        const digito = digitos[i];
        if (isNaN(digito) || digito == 1 || digito == 0) {
            console.error("Debe Ingresar dígitos mayores a 1")
            return [];
        }
        const combinacion = [];
        for (let k = 0; k < a.length; k++) {
            const el = a[k];
            console.log("a[" + k + "]", el)
            for (let j = 0; j < caracteres[digito - 2].length; j++) {
                const caracter = caracteres[digito - 2][j];
                console.log(" elcombinacion[" + j + "]", el)
                combinacion.push(el + caracter);
                console.log("combinacion[" + j + "]", combinacion[j])

            }
        }
        a = combinacion;


    }
    console.log("Salida", a);
    return a;

}