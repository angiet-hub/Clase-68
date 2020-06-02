const root = document.getElementById('root')
const e = React.createElement


// Crear un componente Precio que tenga los props:

//     valor, que toma un número
//     moneda, que tome un string con el tipo de moneda (ARS, USD, EUR, etc.)

// y que renderice el precio formateado con el símbolo de la moneda adelante



// const Precio = ({ valor, moneda }) => {
//   return e('div', null, [e('p', null, `${moneda}`), e('p', null, `${valor}`)])
// }

// const App = () => {
//   return e('main', null, [
//     e(Precio, { valor: 239543, moneda: 'USD' }),
//     e(Precio, { valor: 239543, moneda: 'ARG' }),
//     e(Precio, { valor: 239543, moneda: 'EUR' })
//   ])
// }

const Precio = ({ moneda, valor }) => {
  const texto = new Intl.NumberFormat('es-ES', { style: 'currency', currency: moneda }).format(valor)
  return e('p', null, texto)
}


// Crear un componente Fecha que tenga un prop fecha que tome un objeto de tipo Date, y renderice un elemento p 
//con la fecha formateada, por ejemplo: miércoles, 29 de abril de 2020

const Fecha = ({date}) => {
  const opciones = { weekday: "long", day: "2-digit", month: "long", year: "numeric" }
  const fecha = new Intl.DateTimeFormat('es-ES', opciones).format(date)
  return e('p', null, fecha)
}



// Crear un componente Pagina que tome los siguientes props:

//     actual, número de la página actual
//     maximo, número de la página máxima

// y renderice un paginado de la siguiente forma: [Previous] [1] [...] [5] [...] [10] [Next], es decir, la página 1, 
// puntos suspensivos, la página actual, puntos suspensivos y la página máxima, con las palabras para avanzar y 
// retroceder.

// Ignorar lo que sucede si la página actual es igual a la primera o a la última.

const Pagina = ({actual, maximo}) => {
  const paginado = ['Previous ',  1 , ' ... ', ` ${actual} `, ' ... ', ` ${maximo} `, ' Next']
  return e('div', null, paginado)

  // return e('div', null, [e('button', null, 'Previous'),
  // e('span', null, 1),
  // e('span', null, '...'),
  // e('span', null, actual),
  // e('span', null, '...'),
  // e('span', null, maximo),
  // e('button', null, 'Next')
  // ]) 
  
}


// Crear un componente PuntajeItem que tome un prop tipo con los valores lleno o vacio y muestre un ícono de una estrella 
// llena o vacía según el caso

// Crear un componente Puntaje que tome un prop puntaje que sea del 1 al 5 y renderice 5 estrellas, siendo valor de 
// score la cantidad de PuntajeItem con tipo lleno, mientras las restantes son tipo vacio, por ejemplo: ★★★✩✩

// Pueden usar íconos de FontAwesome o emojis

// EXTRA:

//     Si usan íconos, permitir cambiar el color de las estrellas
//     Permitir que PuntajeItem pueda tener otra ícono (corazón por ejemplo) y pueda ser configurado mediante un prop
//     Permitir que Puntaje muestre un texto con el puntaje, por ejemplo: ★★★✩✩ 2 de 5 estrellas. Se puede ocultar 
//     el elemento usando una clase de CSS con la propiedad display: none

const PuntajeItem = ({tipo}) => {
  const claseIcono = tipo === 'lleno' ? 'fas' : 'far'

  return e('i', {className: `${claseIcono} fa-star`})
}

const Puntaje = ({puntaje}) => {
  const arrayItems = []
  for(let i = 0; i < puntaje; i++) {
    arrayItems.push(e(PuntajeItem, {tipo: 'lleno'}))
  }
  for(let i = 0; i < (5 - puntaje); i++) {
    arrayItems.push(e(PuntajeItem, {tipo: 'vacio'}))
  }

  return e('div', null, arrayItems)
}

// Crear un componente Alert que

//     tenga como props status y message
//     message es el mensaje de la alert
//     status es un string con alguno de los siguientes valores:
//         danger
//         success
//         warning
//         info
//     cada status renderiza el componente de un forma distinta, con sus propios colores de e iconos, de la siguiente 
//     forma:

const Alert = ({status, message}) => {
  const classAlert = () => {
    if(status === 'danger') {
      return 'danger'
    }
    else if(status === 'success') {
      return 'success'
    }
    else if(status === 'warning') {
      return 'warning'
    }
    else if(status === 'info') {
      return 'info'
    }
  }
  // return e('div', { className: `${status}`}, message)

  return e('div', { className: `${classAlert()}`}, message)
}



// Crear un componente Stock que tome como props producto (string correspondiente a nombre), cantidad (número) y 
// maximo (número), y renderice un elemento li que: - si la cantidad es menor al 10% de maximo, ponga el texto en 
// rojo - si la cantidad es mayor a 10% de maximoy menor al 25% de maximo, ponga el texto en naranja - si la cantidad 
// es mayor al 25% de maximo y menor al 40% de maximo, ponga el texto en amarillo - si la cantidad es mayor al 40% de 
// maximo, ponga el texto en verde

// Crear un componente ListaStock que tome una lista de productos y renderice un ul con un array de Stock por cada ítem
//  de la lista. Ejemplo de lista:

// const productos = [
//   {producto: 'Chocolates', cantidad: 34, maximo: 100},
//   {producto: 'Caramelos', cantidad: 99, maximo: 200},
//   {producto: 'Turrones', cantidad: 3, maximo: 50},
//   {producto: 'Alfajores', cantidad: 25, maximo: 130},
//   {producto: 'Tortas', cantidad: 9, maximo: 10},
// ]

const productos = [
    {producto: 'Chocolates', cantidad: 34, maximo: 100},
    {producto: 'Caramelos', cantidad: 99, maximo: 200},
    {producto: 'Turrones', cantidad: 3, maximo: 50},
    {producto: 'Alfajores', cantidad: 25, maximo: 130},
    {producto: 'Tortas', cantidad: 9, maximo: 10},
  ]

const Stock = ({producto, cantidad, maximo}) => {
  const clasesStock = () => {
    if(cantidad < (maximo*10/100)) {
      return 'menorDiez'
    } 
    else if (cantidad > (maximo*10/100) && (cantidad < (maximo*25/100)) ) {
      return 'mayorDiez'
    }
    else if (cantidad > (maximo*25/100) && cantidad < (maximo*40/100)) {
      return 'mayorVeinticinco'
    }
    else if(cantidad > (maximo*40/100)) {
      return 'mayorCuarenta'
    }
  }

  return e('li', {className: `${clasesStock()}`}, `{${producto}, ${cantidad}, ${maximo}}`)
}

const ListaStock = ({ productos }) => {
  const listaProductos = productos.map((producto) => 
  e(Stock, {
    producto: producto.producto,
    cantidad: producto.cantidad,
    maximo: producto.maximo
  })
  )
  return e('ul', null, listaProductos)
}


const App = () => {
  return e('main', null, [
    e(Precio, { moneda: 'USD', valor: 239543 }),
    e(Precio, { moneda: 'ARG', valor: 239543 }),
    e(Precio, { moneda: 'EUR', valor: 239543 }),
    e(Fecha),
    e(Pagina, {actual: 3, maximo: 10}),
    e(Puntaje, { puntaje: 3}),
    e(Puntaje, { puntaje: 5}),
    e(Puntaje, { puntaje: 2}),
    e(Alert, { status: 'info', message: 'Soy un alert'}),
    e(Alert, { status: 'success', message: 'Soy un alert'}),
    e(Alert, { status: 'danger', message: 'Soy un alert'}),
    e(Alert, { status: 'warning', message: 'Soy un alert'}),
    e(ListaStock, {productos})
  ])
}

ReactDOM.render(e(App), root)