'use strict';

/* =========================================================
   1. LA CARTA
   ---------------------------------------------------------
   OJO: todos los platos y precios de abajo son DE EJEMPLO.
   Sustitúyelos por los reales de la carta del bar.

   Para añadir un plato, copia una línea y cambia los datos:
     { nombre: 'Nombre', descripcion: 'Opcional', precio: 4.5, etiqueta: 'Opcional' },
   - El precio va con PUNTO decimal (4.5), la web lo muestra como "4,50 €".
   - "descripcion" y "etiqueta" son opcionales: bórralos si no hacen falta.
   Para añadir una categoría, copia un bloque { id, nombre, platos } entero.
   ========================================================= */
const CARTA = [
  {
    id: 'desayunos',
    nombre: 'Desayunos',
    platos: [
      { nombre: 'Café con leche y tostada', descripcion: 'Con tomate y aceite de oliva', precio: 2.9 },
      { nombre: 'Café con leche y bollería', precio: 2.6 },
      { nombre: 'Pincho de tortilla y café', precio: 3.6 },
      { nombre: 'Tostada de jamón serrano', descripcion: 'Con tomate rallado y aceite', precio: 3.2 },
      { nombre: 'Zumo de naranja natural', precio: 2.5 },
      { nombre: 'Desayuno completo', descripcion: 'Café, zumo natural y tostada', precio: 4.5 }
    ]
  },
  {
    id: 'bocadillos',
    nombre: 'Bocadillos',
    platos: [
      { nombre: 'Jamón serrano', descripcion: 'Con tomate y aceite', precio: 4.5 },
      { nombre: 'Tortilla de patata', precio: 4.0 },
      { nombre: 'Lomo con queso', precio: 4.8 },
      { nombre: 'Longaniza de Aragón', descripcion: 'A la plancha', precio: 5.2 },
      { nombre: 'Bacon con queso', precio: 4.8 },
      { nombre: 'Pollo con pimientos', precio: 5.0 },
      { nombre: 'Calamares', precio: 5.5 },
      { nombre: 'Vegetal', descripcion: 'Lechuga, tomate, espárragos, huevo duro y atún', precio: 4.8 }
    ]
  },
  {
    id: 'hamburguesas',
    nombre: 'Hamburguesas',
    platos: [
      { nombre: 'Sencilla', descripcion: 'Ternera, lechuga, tomate y cebolla', precio: 5.9 },
      { nombre: 'Con queso', descripcion: 'Ternera y queso fundido', precio: 6.5 },
      { nombre: 'San Gregorio', descripcion: 'Ternera, queso, bacon, huevo frito y cebolla caramelizada', precio: 8.5, etiqueta: 'La de la casa' },
      { nombre: 'Pollo crujiente', descripcion: 'Pollo empanado, lechuga, tomate y salsa', precio: 7.2 },
      { nombre: 'Vegetal', descripcion: 'Hamburguesa vegetal, lechuga, tomate y queso', precio: 7.5 },
      { nombre: 'Doble', descripcion: 'Doble carne, doble queso y bacon', precio: 9.5 }
    ]
  },
  {
    id: 'raciones',
    nombre: 'Raciones',
    platos: [
      { nombre: 'Patatas bravas', descripcion: 'Con salsa brava y alioli', precio: 5.5 },
      { nombre: 'Croquetas caseras', descripcion: '8 unidades', precio: 7.5 },
      { nombre: 'Calamares a la romana', precio: 9.0 },
      { nombre: 'Huevos rotos con jamón', precio: 9.5 },
      { nombre: 'Alitas de pollo', precio: 7.5 },
      { nombre: 'Ensaladilla rusa', precio: 6.0 }
    ]
  },
  {
    id: 'bebidas',
    nombre: 'Bebidas',
    platos: [
      { nombre: 'Caña', precio: 1.8 },
      { nombre: 'Tercio', precio: 2.5 },
      { nombre: 'Cerveza sin alcohol', precio: 2.3 },
      { nombre: 'Refresco', precio: 2.3 },
      { nombre: 'Agua mineral', precio: 1.5 },
      { nombre: 'Vino de la casa (copa)', precio: 2.2 },
      { nombre: 'Café solo', precio: 1.4 },
      { nombre: 'Café con leche', precio: 1.6 }
    ]
  }
];

// Categoría que se ve al entrar en la web (usa el "id" de arriba)
const CATEGORIA_INICIAL = 'bocadillos';


/* =========================================================
   2. PINTAR LA CARTA (no hace falta tocar esta parte)
   ========================================================= */
const formatoPrecio = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });

const contenedorTabs = document.querySelector('#carta-tabs');
const listaPlatos = document.querySelector('#carta-lista');

function crearPlato(plato) {
  const li = document.createElement('li');
  li.className = 'plato';

  const cabecera = document.createElement('div');
  cabecera.className = 'plato-cabecera';

  const nombre = document.createElement('span');
  nombre.className = 'plato-nombre';
  nombre.textContent = plato.nombre;

  if (plato.etiqueta) {
    const etiqueta = document.createElement('span');
    etiqueta.className = 'etiqueta';
    etiqueta.textContent = plato.etiqueta;
    nombre.append(etiqueta);
  }

  const puntos = document.createElement('span');
  puntos.className = 'plato-puntos';
  puntos.setAttribute('aria-hidden', 'true');

  const precio = document.createElement('span');
  precio.className = 'plato-precio';
  precio.textContent = formatoPrecio.format(plato.precio);

  cabecera.append(nombre, puntos, precio);
  li.append(cabecera);

  if (plato.descripcion) {
    const desc = document.createElement('p');
    desc.className = 'plato-desc';
    desc.textContent = plato.descripcion;
    li.append(desc);
  }

  return li;
}

function mostrarCategoria(id, animar) {
  const categoria = CARTA.find((c) => c.id === id) || CARTA[0];

  listaPlatos.replaceChildren(...categoria.platos.map(crearPlato));
  listaPlatos.setAttribute('aria-label', 'Carta de ' + categoria.nombre.toLowerCase());

  contenedorTabs.querySelectorAll('.tab').forEach((boton) => {
    boton.setAttribute('aria-pressed', String(boton.dataset.id === categoria.id));
  });

  // Pequeña transición solo cuando la persona cambia de categoría
  listaPlatos.classList.remove('is-fresh');
  if (animar) {
    void listaPlatos.offsetWidth; // reinicia la animación
    listaPlatos.classList.add('is-fresh');
  }
}

function iniciarCarta() {
  if (!contenedorTabs || !listaPlatos) return;

  CARTA.forEach((categoria) => {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'tab';
    boton.dataset.id = categoria.id;
    boton.textContent = categoria.nombre;
    boton.addEventListener('click', () => mostrarCategoria(categoria.id, true));
    contenedorTabs.append(boton);
  });

  mostrarCategoria(CATEGORIA_INICIAL, false);
}


/* =========================================================
   3. "ABIERTO AHORA" Y HORARIO DE HOY
   Lee las horas de la tabla del HTML (data-open / data-close),
   así solo hay un sitio donde cambiar el horario.
   ========================================================= */
const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const DIA_INGLES = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

function aMinutos(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

function formatoHora(minutos) {
  const h = Math.floor(minutos / 60);
  const m = String(minutos % 60).padStart(2, '0');
  return h + ':' + m;
}

// Hora actual en Zaragoza, aunque el móvil de la persona esté en otra zona horaria
function ahoraEnMadrid() {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Madrid',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(new Date());

  const valor = (tipo) => partes.find((p) => p.type === tipo).value;

  return {
    dia: DIA_INGLES[valor('weekday')],
    minutos: parseInt(valor('hour'), 10) * 60 + parseInt(valor('minute'), 10)
  };
}

function leerHorario() {
  const horario = {};
  document.querySelectorAll('.hours tr[data-day]').forEach((fila) => {
    horario[Number(fila.dataset.day)] = {
      abre: aMinutos(fila.dataset.open),
      cierra: aMinutos(fila.dataset.close),
      fila: fila
    };
  });
  return horario;
}

function actualizarEstado(horario) {
  const { dia, minutos } = ahoraEnMadrid();
  const hoy = horario[dia];
  if (!hoy) return;

  // Resalta la fila de hoy en la tabla (solo la primera vez)
  if (!hoy.fila.classList.contains('is-today')) {
    document.querySelectorAll('.hours tr.is-today').forEach((f) => {
      f.classList.remove('is-today');
      f.querySelector('.today-tag')?.remove();
    });
    hoy.fila.classList.add('is-today');
    const etiqueta = document.createElement('span');
    etiqueta.className = 'today-tag';
    etiqueta.textContent = 'hoy';
    hoy.fila.querySelector('th').append(etiqueta);
  }

  // Calcula el mensaje de estado
  let abierto = false;
  let texto;

  if (minutos >= hoy.abre && minutos < hoy.cierra) {
    abierto = true;
    texto = 'Abierto ahora, cerramos a las ' + formatoHora(hoy.cierra);
  } else if (minutos < hoy.abre) {
    texto = 'Cerrado ahora, abrimos hoy a las ' + formatoHora(hoy.abre);
  } else {
    const manana = horario[(dia + 1) % 7];
    texto = 'Cerrado ahora, abrimos mañana a las ' + formatoHora(manana.abre);
  }

  // Rellena la tarjeta de la portada
  const elDia = document.querySelector('#hoy-dia');
  const elHoras = document.querySelector('#hoy-horas');
  const elEstado = document.querySelector('#hoy-estado');
  const elTexto = document.querySelector('#hoy-estado-texto');
  if (!elDia || !elHoras || !elEstado || !elTexto) return;

  elDia.textContent = 'Hoy, ' + DIAS[dia];
  elHoras.textContent = formatoHora(hoy.abre) + ' – ' + formatoHora(hoy.cierra);
  elTexto.textContent = texto;
  elEstado.hidden = false;
  elEstado.classList.toggle('is-open', abierto);
}

function iniciarHorario() {
  const horario = leerHorario();
  if (Object.keys(horario).length === 0) return;

  actualizarEstado(horario);
  setInterval(() => actualizarEstado(horario), 60 * 1000); // se refresca cada minuto
}


/* =========================================================
   4. MENÚ DE NAVEGACIÓN EN MÓVIL
   ========================================================= */
function iniciarMenuMovil() {
  const boton = document.querySelector('.nav-toggle');
  const menu = document.querySelector('#menu-principal');
  if (!boton || !menu) return;

  function establecer(abierto) {
    menu.classList.toggle('is-open', abierto);
    boton.setAttribute('aria-expanded', String(abierto));
    boton.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
  }

  boton.addEventListener('click', () => establecer(!menu.classList.contains('is-open')));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) establecer(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') establecer(false); });
}


/* =========================================================
   5. ARRANQUE
   ========================================================= */
iniciarCarta();
iniciarHorario();
iniciarMenuMovil();

const anio = document.querySelector('#anio');
if (anio) anio.textContent = new Date().getFullYear();
