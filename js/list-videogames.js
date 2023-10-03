$(document).ready(() => {
    $.ajax({
        type: "GET",
        url: "https://pokeapi.co/api/v2/generation/"
    }).done(respuesta => {
        var listaGeneraciones = respuesta.results;
        listaGeneraciones.forEach(generation => {
            var idGeneration = generation.url.split('').reverse()[1];
            $.ajax({
                type: "GET",
                url: generation.url
            }).done(generaciones => {
                var nombreRegion = generaciones.main_region.name;
                var nameGame = generaciones.version_groups[0].name;
                var imgGame = generaciones.pokemon_species[71].name;
                var cardVideojuego = `<div class="col-4 videojuego mb-3">
                        <div class="card-videojuego shadow">
                            <div class="row">
                                <div class="col-8">
                                    <div>
                                        <img src="https://img.pokemondb.net/sprites/black-white/normal/${imgGame}.png"
                                            alt="sprite pokemon" class="w-100">
                                    </div>
                                    <div class="ms-4">
                                        <span class="fs-4 fw-bold">Generación Nº<span>${idGeneration}</span></span><br>
                                        <span>Region: <span>${nombreRegion}</span></span><br>
                                        <span>Versión: <span>${nameGame}</span></span>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="pokemon-inicial1 shadow">
                                        <img src="https://img.pokemondb.net/sprites/black-white/normal/${generaciones.pokemon_species[0].name}.png"
                                            alt="sprite pokemon" class="w-100">
                                    </div>
                                    <div class="pokemon-inicial2 shadow">
                                        <img src="https://img.pokemondb.net/sprites/black-white/normal/${generaciones.pokemon_species[1].name}.png"
                                            alt="sprite pokemon" class="w-100">
                                    </div>
                                    <div class="pokemon-inicial3 shadow">
                                        <img src="https://img.pokemondb.net/sprites/black-white/normal/${generaciones.pokemon_species[2].name}.png"
                                            alt="sprite pokemon" class="w-100">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
                $('#lista-videojuegos').append(cardVideojuego);
            });

        });

    });
});