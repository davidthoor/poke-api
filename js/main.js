const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";
// recorremos los resultados json 
for (let i = 1; i <= 100; i++) {
    // se extraen los datos con fetch URL pokeapi y el contador i
    fetch(URL + i)
    //el resultado de la api en json
        .then((response) => response.json())
        
        .then(data => mostrarPokemon(data))
}

// funcion para ver los pokemones
function mostrarPokemon(poke) {
// variable para separar por categoria
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');
// id de pokemon
    let pokeId = poke.id.toString();

// mostrar la tarjeta con js para que sea actualizada desde js
    const div = document.createElement("div");
    div.classList.add("col-3");
    div.innerHTML = ` 
    <div class="card" >
        <div>
            <img src="${poke.sprites.other["official-artwork"].front_default}" class="card-img-top" alt="${poke.name}">
        </div>
            <div class="card-body">
                <p class="card-title">#${pokeId}</p>
                <h2 class="card-text"> ${poke.name}</h2>
            </div>
            <ul class="list-group list-group-flush">
            <li class="list-group-item"><b> Tipo: </b> ${tipos}</li>
            <li class="list-group-item"><b> Altura: </b> ${poke.height}m </li>
            <li class="list-group-item"><b> Peso: </b> ${poke.weight}kg </li>
            </ul>
            <div class="card-body">
            <br>
          </div>
        </div>
    `;
    listaPokemon.append(div);
}
// escuchar al elemento boton para ejecutar segun sea el evento asignado
botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;
    listaPokemon.innerHTML = "";
    for (let i = 1; i <= 100; i++) {
        fetch(URL + i)
            .then((response) => response.json())    
            .then(data => {

                if(botonId === "ver-todos") {
                    document.getElementById("nombrePokemon").value = "";
                    mostrarPokemon(data);
                }
            })
    }
}))

// funcion para buscar pokemones por nombre
function buscarPokemon(){
    var nombre = document.getElementById("nombrePokemon").value;
    listaPokemon.innerHTML = "";
    for (let i = 1; i <= 100; i++) {
        fetch(URL + i)
            .then((response) => response.json())    
            .then(data => {
                    if (data.name == nombre) {
                        mostrarPokemonGrande(data);
                    }
            })
    }
}
// funcion para ver los pokemones
function mostrarPokemonGrande(poke) {
    // variable para separar por categoria
        let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
        tipos = tipos.join('');
    // id de pokemon
        let pokeId = poke.id.toString();
    
    // mostrar la tarjeta con js para que sea actualizada desde js
        const div = document.createElement("div");
        div.classList.add("col-10");
        div.innerHTML = ` 
        <div class="card" >
            <div>
                <img src="${poke.sprites.other["official-artwork"].front_default}" class="card-img-top" alt="${poke.name}">
            </div>
                <div class="card-body">
                    <p class="card-title">#${pokeId}</p>
                    <h2 class="card-text"><b> Nombre: </b> ${poke.name}</h2>
                </div>
                <ul class="list-group list-group-flush">
                <li class="list-group-item"> <b> Tipo: </b> ${tipos}</li>
                <li class="list-group-item"><b> Altura: </b> ${poke.height}m </li>
                <li class="list-group-item"><b> Peso: </b> ${poke.weight}kg </li>
                </ul>
                <div class="card-body">
                <br>
              </div>
            </div>
        `;
        listaPokemon.append(div);
    }