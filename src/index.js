import { Buscar, seleccionarCiudad } from "./main.js";

const d = document,
  $ciudadBuscar = d.getElementById("buscar"),
  $selectCiudades = d.getElementById("ciudadesEncontradas"),
  $btnCerrar = d.getElementById("boton");

let timer;

d.addEventListener("DOMContentLoaded", () => {
  $ciudadBuscar.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      Buscar();
    }, 500);
  });

  $selectCiudades.addEventListener("change", () => {
    seleccionarCiudad();
  });
});

d.addEventListener("click", (e) => {
  const isClickOutside =
    !e.target.closest("#buscar") && !e.target.closest("#ciudadesEncontradas")&& !e.target.closest("#boton");

  if (isClickOutside) {
    $ciudadBuscar.value = "";
    $selectCiudades.style.display = "none";
    $btnCerrar.classList.add("oculto")
  }
});

d.addEventListener("keyup" , (e)=>{
  if (e.target.matches("#buscar")) {
    $btnCerrar.classList.remove("oculto");
  }else{
    $btnCerrar.classList.add("oculto");
  }
})