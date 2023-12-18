document.addEventListener("DOMContentLoaded", function () {
  let footer = document.querySelectorAll(".footer p");
  let p = footer[1];
  p.innerHTML = "";
  let fecha = new Date();
  let anio = fecha.getFullYear();
  // console.log(anio);
  p.innerHTML = `Copyright © ${anio} Shigatsu Translation`;
});
let alto = window.scrollY
console.log(alto)
window.addEventListener("scroll", function () {
  let alto = window.scrollY
  // console.log(alto)
  this.document.querySelector(".header_nav-menu").classList.toggle("borrar", window.scrollY > 522)
})
///menu
let menu = document.querySelector(".header_nav-menu")
let btn_bars = document.querySelector(".bars")
let btn_cerrar = document.querySelector(".cerra")

let btns = document.querySelectorAll(".menu_list-item-modal")
let subMenus = document.querySelectorAll(".sub-menu");
let ancho = window.innerWidth;

btns.forEach(btn => {
  btn.addEventListener("click", e => {
    btn.classList.toggle("active");
    if (!isSubMenuLink) {
      e.preventDefault();
    }

  })
})

btn_bars.addEventListener("click", () => {
  menu.classList.toggle("mostrar")
  btn_bars.classList.add("ocultar")
  btn_cerrar.classList.add("mostrar_btn")
})

btn_cerrar.addEventListener("click", () => {
  menu.classList.toggle("mostrar")
  btn_cerrar.classList.remove("mostrar_btn");
  btn_bars.classList.remove("ocultar")
})

///modo oscuro
const bdark = document.querySelector(".btn_dark-mode");
const body = document.querySelector("body");
load();

bdark.addEventListener("click", e => {
  body.classList.toggle("darkmode");
  store(body.classList.contains("darkmode"));
});

function load() {
  const darkmode = localStorage.getItem("darkmode");
  if (!darkmode) {
    store("false");
  }
  else if (darkmode == "true") {
    body.classList.add("darkmode");
  }
}
function store(value) {
  localStorage.setItem("darkmode", value);
}

//loadirn con img
const preloader = document.querySelector(".preloader");
window.addEventListener("load", () => {
  preloader.style.display = "none";
})

let link = document.querySelectorAll(".volumes a")
console.log(link)
link.forEach(lin => {
  if (lin.href === "#" || lin.href.endsWith("#")) {
    lin.addEventListener("click", evt => {
      evt.preventDefault()
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Links no disponible',
        showConfirmButton: false,
        timer: 3500,
        width: '20em'
      });
    })
    lin.classList.add("disabled")
  } else {
    lin.setAttribute("target", "_blank")
    lin.classList.remove("disabled")
  }
})


//mostra disqus
function mostrar() {
  document.getElementById('disqus_thread').style.display = 'flex'
}

let contenido_pre = document.querySelectorAll('.pre');

contenido_pre.forEach(text => {
  let contenido = text.textContent;

  if (contenido.includes('☆')) {
    let nuevoTexto = contenido.replace(/\☆/g, "<span class='centrarEstrella'>☆</span>");
    text.innerHTML = nuevoTexto;
  } else if (contenido.includes('$$')) {
    let nuevoTexto = contenido.replace(/\$\$/g, "<span class='centrarEstrella'>$$$</span>");
    text.innerHTML = nuevoTexto;
  }
});

// p.innerHTML = `Copyright © ${anio} Shigatsu Translation`;
