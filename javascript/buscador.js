// const opciones = [
//   { nombre: "kamatte", url: "Kamatte_Shinsotsu-chan_ga_Maikai_Sasotte.html" },
//   { nombre: "yuujin-chara", url: "Yuujin-chara_no_Ore ga_Motemakuru_Wakenaidarou.html" },
//   { nombre: "it semss", url: "itseems.html" },
//   { nombre: "Ordinary Days", url: "ordinary.html" },
//   { nombre: "In the After School Library", url: "In_the_After.html" },
//   { nombre: "Cursed, Pure Love", url: "cursed_pure.html" },
//   { nombre: "My Parent Remarried", url: "My_Parent.html" },
//   { nombre: "The Love Comedy Where", url: "TheLove.html" },
//   { nombre: "The Cool Tsukishiro-san", url: "TheCool.html" },
//   { nombre: "The Story Of How I", url: "TheStory.html" },
//   { nombre: "Classmate ga Tsukaima", url: "class.html" },
//   { nombre: "What Happens If A Friend’s", url: "What_Happens.html" },
//   { nombre: "Ryuu Kusari No Ori -Kokoro ", url: "ryuu.html" }
// ];

// const input = document.getElementById("buscar");
// const datalist = document.getElementById("opciones");

// opciones.forEach(opcion => {
//   const optionElement = document.createElement("option");
//   optionElement.value = opcion.nombre;
//   optionElement.dataset.url = opcion.url;
//   optionElement.target = "_blank";
//   datalist.appendChild(optionElement);
// });

// input.addEventListener("change", () => {
//   const opcionSeleccionada = opciones.find(opcion =>
//     opcion.nombre.toLowerCase() === input.value.toLowerCase()
//   );
//   if (opcionSeleccionada) {
//     window.open(opcionSeleccionada.url); // redirigir a la URL de la opción seleccionada en una nueva pestaña
//   }
// });

let search = document.querySelector(".search__input")
let card = document.querySelectorAll(".cards")

search.addEventListener("input", e => {
  let valor = search.value
  buscador(valor)
})

function buscador(value) {
  card.forEach(elem => {
    let encontrado = false
    let card_title = elem.querySelectorAll(".cards_title")
    card_title.forEach(title => {
      if (new RegExp(value.toLowerCase()).test(title.textContent.toLowerCase())) {
        encontrado = true
      }
    })
    resultado(encontrado, elem)
  })
}

function resultado(condicion, valor2) {
  if (condicion) {
    valor2.classList.remove("ocultar__card")
  } else {
    valor2.classList.add("ocultar__card")
    crearHtml()
  }
  if (search.value.length > 0) {
    crearHtml()
  }
}

function crearHtml() {
  let div = Array.from(card).filter(c => !c.classList.contains("ocultar__card"))
  console.log(div)
}