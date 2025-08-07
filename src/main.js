const $ciudadBuscar = document.getElementById("buscar"),
  contenedorClima = document.getElementById("container"),
  $selectCiudades = document.getElementById("ciudadesEncontradas"),
  $skeletonLoader = document.getElementById("skeleton-loader");

export async function Buscar() {
  let city = $ciudadBuscar.value.trim();

  const URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`;
  try {
    const res = await fetch(URL),
      data = await res.json();

    if (data.length === 0) {
      contenedorClima.innerHTML = `<p class="error">Ciudad no encontrada. Intenta con otro nombre</p>`;
      return;
    }

    $selectCiudades.innerHTML = "";

    const placeholderOption = document.createElement("option");
    placeholderOption.value = "";
    placeholderOption.textContent = "Seleccione una opcion";
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    $selectCiudades.appendChild(placeholderOption);

    data.forEach((ciudad, index) => {
      const opcion = document.createElement("option");
      (opcion.value = index),
        (opcion.textContent = `${ciudad.name}, ${ciudad.state || ""}, ${
          ciudad.country
        }`
          .replace(/,\s+/g, ", ")
          .trim());

      $selectCiudades.appendChild(opcion);
    });

    $selectCiudades.dataset.ciudades = JSON.stringify(data);
    $selectCiudades.style.display = "inline-block";

    if (data.length === 1) {
      seleccionarCiudad();
    }
  } catch (error) {
    console.error("Error al buscar la ciudad:", error);
  }
}

export function seleccionarCiudad() {
  $ciudadBuscar.value = "";

  const data = JSON.parse($selectCiudades.dataset.ciudades);
  const indexSeleccionado = $selectCiudades.value;
  const ciudad = data[indexSeleccionado];

  const nombreCiudad = `${ciudad.name}, ${ciudad.country}`;
  mostrarSkeleton(indexSeleccionado);
  obtenerDatos(ciudad.lat, ciudad.lon, nombreCiudad);
}

async function obtenerDatos(lat, lon, nombreCiudad) {
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric&lang=es`;
  try {
    const res = await fetch(URL),
      data = await res.json();

    const datos = {
      data,
      nombreCiudad,
    };

    localStorage.setItem("datosGuardados", JSON.stringify(datos));

    const humedad = data.main.humidity,
      temperatura = data.main.temp,
      descripcion = data.weather[0].description,
      icono = data.weather[0].icon,
      vientoGrados = data.wind.deg,
      velocidadViento = data.wind.speed;

    mostrarDatos(
      nombreCiudad,
      humedad,
      temperatura,
      descripcion,
      icono,
      vientoGrados,
      velocidadViento
    );
  } catch (error) {
    console.error("Error al obtener datos del clima:", error);
    contenedorClima.innerHTML = `<p class="error">Error al obtener el clima. Intenta nuevamente.</p>`;
  }
}

function mostrarDatos(
  nombre,
  humedad,
  temperatura,
  descripcion,
  icono,
  vientoGrados,
  velocidadViento
) {
  $skeletonLoader.classList.add("ocult");

  contenedorClima.innerHTML = "";
  contenedorClima.classList.add("visible","show");

  const nomb = document.createElement("h2");
  nomb.textContent = nombre;

  const iconURL = document.createElement("img");
  iconURL.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icono}@2x.png`
  );

  const des = document.createElement("p");
  des.textContent = descripcion;

  const containerCabecera = document.createElement("div");
  containerCabecera.classList.add("container-iconoPais");

  const containerDatos = document.createElement("div");
  const cards = document.createElement("section");
  cards.classList.add("cards");

  const agruparDatos = (labelText, valueText) => {
    const grupo = document.createElement("div");
    grupo.classList.add("dato");

    const label = document.createElement("span");
    label.textContent = labelText;
    label.classList.add("titulos");

    const value = document.createElement("span");
    value.textContent = valueText;
    value.classList.add("valor");

    grupo.appendChild(label);
    grupo.appendChild(value);
    return grupo;
  };

  containerCabecera.appendChild(nomb);
  containerCabecera.appendChild(iconURL);
  contenedorClima.appendChild(containerCabecera);
  contenedorClima.appendChild(des);

  cards.appendChild(agruparDatos("Temperatura", `${temperatura} °C`));
  cards.appendChild(agruparDatos("Humedad", `${humedad}%`));
  cards.appendChild(agruparDatos("Dirección del Viento", `${vientoGrados}°`));
  cards.appendChild(
    agruparDatos("Velocidad del Viento", `${velocidadViento} Km/h`)
  );

  containerDatos.appendChild(cards);
  contenedorClima.appendChild(containerDatos);
}

export function extraerDatosGuardados() {
  const recuperarDatos = JSON.parse(localStorage.getItem("datosGuardados"));

  if (!recuperarDatos) return;

  const nombreCiudad = recuperarDatos.nombreCiudad,
    humedad = recuperarDatos.data.main.humidity,
    temperatura = recuperarDatos.data.main.temp,
    descripcion = recuperarDatos.data.weather[0].description,
    icono = recuperarDatos.data.weather[0].icon,
    viento = recuperarDatos.data.wind.deg,
    velocidad = recuperarDatos.data.wind.speed;

  mostrarDatos(
    nombreCiudad,
    humedad,
    temperatura,
    descripcion,
    icono,
    viento,
    velocidad
  );
}

function mostrarSkeleton(ciudad) {
  $skeletonLoader.innerHTML = "";
  
  contenedorClima.classList.remove("visible", "show")

  $skeletonLoader.classList.remove("ocult");
  $skeletonLoader.classList.add("visible", "show");
  
  const $skeleton = document.createElement("div");
  $skeleton.classList.add("card-skeleton", "skeleton");
  $skeleton.setAttribute("data-ciudad", ciudad);

  $skeleton.innerHTML = `
      <div class="skeleton-header">
      <div class="skeleton skeleton-title"></div>
      <div class="skeleton skeleton-icon"></div>
    </div>
    <div class="skeleton skeleton-description"></div>
    <div class="skeleton-cards">
      <div class="skeleton skeleton-line"></div>
      <div class="skeleton skeleton-line"></div>
      <div class="skeleton skeleton-line"></div>
      <div class="skeleton skeleton-line"></div>
    </div>
  `;

  $skeletonLoader.appendChild($skeleton);

}
