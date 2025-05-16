const buscar = document.getElementById("buscar")
const botonBuscar = document.getElementById("boton-buscar");
const contenedorClima = document.getElementById("container");

const ciudades = {
  "quito": "Quito,ec",
  "guayaquil": "Guayaquil,ec",
  "lima": "Lima,pe",
  "bogota": "Bogotá,co",
  "caracas": "Caracas,ve",
  "santiago": "Santiago,cl",
  "buenos aires": "Buenos Aires,ar",
  "montevideo": "Montevideo,uy",
  "la paz": "La Paz,bo",
  "ciudad de mexico": "Mexico City,mx",
  "madrid": "Madrid,es",
  "barcelona": "Barcelona,es",
  "paris": "Paris,fr",
  "berlin": "Berlin,de",
  "roma": "Rome,it",
  "londres": "London,gb",
  "nueva york": "New York,us",
  "los angeles": "Los Angeles,us",
  "tokio": "Tokyo,jp",
  "seul": "Seoul,kr",
  "pekin": "Beijing,cn",
  "sidney": "Sydney,au",
  "toronto": "Toronto,ca",
  "bogota": "Bogotá,co",
  "mexico": "Mexico City,mx",
  "new york": "New York,us",
  "london": "London,gb"
};

botonBuscar.addEventListener("click", () =>{
    const ciudadEncontrada = Buscar(ciudades, buscar);
    if (ciudadEncontrada) {
        obtenerDatos(ciudadEncontrada);
    }else{
        console.warn("La ciudad no se encontro en la lista.")
        contenedorClima.innerHTML = `<p class="error">Ciudad no encontrada.</p>`;
    }
})

function Buscar(ciudades, buscar){
    let buscador = buscar.value.toLowerCase().trim();
    const claves = Object.keys(ciudades)

    if (buscador === "") {
        console.warn("Ingresa un Pais");
        return;
    }

    for (let i = 0; i < claves.length; i++) {
        const clave = claves[i];
        if (buscador === clave) {
            const valor = ciudades[clave];
            return valor;
        }    
    }
    console.log("No se encontro la ciudad.")
}

async function obtenerDatos(nombre) {
    const URL =  `http://api.openweathermap.org/data/2.5/weather?q=${nombre}&APPID=ab35e7b26434600d30ebbb2cfb87f5a7&units=metric`;
    try {
        await fetch(URL)
         .then((res) => res.json())
         .then((data) => {
            const nombre = data.name;
            const humedad = data.main.humidity;
            const temperatura = data.main.temp;
            const descripcion = data.weather[0].description;
            const icono = data.weather[0].icon;
            const vientoGrados = data.wind.deg; 
            const velocidadViento = data.wind.speed;

            mostrarDatos(nombre, humedad , temperatura, descripcion, icono, vientoGrados, velocidadViento);
         })
    } catch (error) {
        console.error(`Ocurrio un error al contactar a la API`)
        console.error(`si va hacer otra llamada esperar 10 minutos`)
         contenedorClima.innerHTML = `<p class="error">Error al obtener los datos del clima. Por favor, inténtalo de nuevo más tarde.</p>`;
    }
    
}

function mostrarDatos(nombre, humedad, temperatura, descripcion, icono, vientoGrados, velocidadViento) {
    contenedorClima.innerHTML = '';
    
    const nomb = document.createElement("h2");
    nomb.textContent = nombre;
    
    const iconURL = document.createElement("img");
    iconURL.setAttribute("src", `http://openweathermap.org/img/wn/${icono}@2x.png`);    
    
    const des = document.createElement("p");
    des.textContent = descripcion;
    
    
    const containerCabecera = document.createElement("div");
    containerCabecera.classList.add("container-iconoPais");
    
    
    const containerDatos = document.createElement("div");
    const cards = document.createElement("section");
    cards.classList.add("cards");
    
    const agruparDatos = (labelText, valueText) =>{
        const grupo = document.createElement("div");
        grupo.classList.add("dato")

        const label = document.createElement("span");
        label.textContent = labelText; 

        const value = document.createElement("span");
        value.textContent = valueText; 
        value.classList.add(valor);

        grupo.appendChild(label);
        grupo.appendChild(value);
        return grupo;

    }

    containerCabecera.appendChild(nomb);
    containerCabecera.appendChild(iconoUrl);
    contenedorClima.appendChild(containerCabecera);
    contenedorClima.appendChild(des);
    
    cards.appendChild(agruparDatos("Temperatura",`${temperatura} °C` ))
    cards.appendChild(agruparDatos("Humedad",`${humedad}%` ))
    cards.appendChild(crearGrupo("Dirección del Viento", `${vientoGrados}°`));
    cards.appendChild(crearGrupo("Velocidad del Viento", `${velocidadViento} Km/h`));
  
    containerDatos.appendChild(cards);
   contenedorClima.appendChild(containerDatos);
    
}
