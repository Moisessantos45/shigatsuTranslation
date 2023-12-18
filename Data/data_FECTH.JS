const btn_next = document.querySelector(".next")
const btn_previuos = document.querySelector(".previuos")
const contentText = document.querySelector(".texto_capitulo")
const home = document.querySelector(".home")
const links = ["itseems", "class", "cursed_pure", "In_the_After", "My_Parent", "TheStory", "yuujin"]

const has = window.location.hash.split("#")[1].split("_").slice(0, 2).join("_")
// console.log(has)
let indice = window.location.hash.split("#")[1].split("_")[2];
// console.log(indice)
let cantidad = +indice + 1;

const unirSimbolos = (texto) => {
    const simbolos = ["◊◊◊", "◊◊", "◊", "$$$", "$$", "$", "**", "*"];
    let resultado = '';
    let textoDividido = texto.split('\n');
    let bloquePre = '';

    for (let linea of textoDividido) {
        let esSimbolo = simbolos.includes(linea.trim());
        if (esSimbolo) {
            if (bloquePre !== '') {
                resultado += `<pre class="m-auto flex text">${bloquePre}</pre>\n`;
                bloquePre = '';
            }
            resultado += `<span class="m-auto">${linea}</span>\n`;
        } else {
            bloquePre += linea + '\n';
        }
    }

    if (bloquePre !== '') {
        resultado += `<pre class="m-auto flex text">${bloquePre}</pre>\n`;
    }


    return resultado;
}

const formatearTextoConImagenes = (texto) => {
    if (!new RegExp("https://i.ibb.co", 'i').test(texto)) {
        return `${unirSimbolos(texto)}`
    }
    const fragmentos = texto.split("https://i.ibb.co")
    return fragmentos.flatMap((fragmento, i) => {
        if (i === 0) {
            return [
                `${unirSimbolos(fragmento)}`
            ]
        } else {
            const indiceEspacio = fragmento.indexOf("\n");
            const url = `https://i.ibb.co${indiceEspacio !== -1 ? fragmento.slice(0, indiceEspacio) : fragmento
                }`;
            const resto = indiceEspacio !== -1 ? fragmento.slice(indiceEspacio) : "";
            return [
                ` <figure>
                    <img src="${url.trim()}" alt="" />
                </figure>
                ${unirSimbolos(resto)}`
            ]
        }
    }).join("");
}

const insertar_datos = (data) => {
    let section = ""
    const title = document.querySelector("title").textContent = data[0]
    const title_content = document.querySelector(".header-content_title_char").textContent = data[0]
    const contendedor = document.querySelector(".text")
    document.querySelector(".texto_capitulo section").remove()
    section += `<section class=' w-full contentText'> 
    ${formatearTextoConImagenes(data.filter((item, i) => i > 0).join("\n"))}  
    </section>`
    contentText.insertAdjacentHTML("afterbegin", section)
    const TitleHas = `${has}_${indice}`
    location.hash = TitleHas
    home.href = `/itseems.html`
}

document.addEventListener("DOMContentLoaded", async () => {
    cont_archivo(indice)
})

const cont_archivo = async () => {
    try {
        const response = await fetch(`/Data/${has}_${cantidad}.txt`)
        if (response.ok) {
            cantidad = cantidad
            return;
        } else {
            cantidad--
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        document.querySelector(".header-content_title_char").textContent = error.message
    }
}

const cargar = async (indice) => {
    try {
        const response = await fetch(`/Data/${has}_${indice}.txt`);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        data = await response.text();
        cont_archivo()
        const datos = data.split(/\n\s*\n/)
        if (indice > 1) {
            btn_previuos.classList.add("mostrar")
        } else {
            btn_previuos.classList.remove("mostrar")
        }
        if (indice < cantidad) {
            btn_next.classList.add("mostrar")
        } else {
            btn_next.classList.remove("mostrar")
        }
        insertar_datos(datos)
    } catch (error) {
        document.querySelector(".header-content_title_char").textContent = error.message
    }
}

window.onload = () => cargar(indice);

btn_next.addEventListener("click", () => {
    indice++
    cargar(indice)
})

btn_previuos.addEventListener("click", () => {
    indice--
    cargar(indice)
    cont_archivo()
})

