$(document).ready(function(){
    
    $.ajax({

        url: 'https://pokeapi.co/api/v2/pokemon/',
        type: 'GET'

    }).done(function(resp){

        var pokedex = resp.results;
        
        pokedex.forEach(function(pokemon){
        
            var template = `
            
        <div class="row">

            <div class="col-md-4 mb-2">
                <div class="borderCard">
                    <div class="row">
                    <div class="col-md-4">
                        <img src="https://img.pokemondb.net/sprites/black-white/normal/${pokemon.name}.png"
                         alt="Bulbasaur" class="imgPokemon"></img>
                    </div>
                    <div class="col-md-4">
                        <p class="nombrePokemon"><strong>${pokemon.name}</strong><br><span class="idPokemon">${pokemon.id}</span></p>  
                    </div>
                    <div class="col-md-4">
                        <div class="tipo"></div>
                    </div>
                </div>
            </div>
            
            </div>
            <div class="col-md-4">
                <div class="borderCard">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="https://img.pokemondb.net/sprites/black-white/normal/${pokemon.name}.png"
                            alt="Bulbasaur" class="imgPokemon"></img>
                        </div>
                        <div class="col-md-4">
                            <p class="nombrePokemon"><strong>${pokemon.name}</strong><br><span class="idPokemon">${pokemon.id}</span></p>  
                        </div>
                        <div class="col-md-4">
                            <div class="tipo"></div>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div class="col-md-4">
                <div class="borderCard">
                    <div class="row">
                        <div class="col-md-4 mx-auto">
                            <img src="https://img.pokemondb.net/sprites/black-white/normal/${pokemon.name}.png"
                            alt="Bulbasaur" class="imgPokemon"></img>
                        </div>
                        <div class="col-md-4">
                            <p class="nombrePokemon"><strong>${pokemon.name}</strong><br><span class="idPokemon">${pokemon.id}</span></p>  
                        </div>
                        <div class="col-md-4">
                            <div class="tipo"></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>`;

            $('#list-pokemon').append(template);
        });

    });

    $(document).on('click', 'borderCard', function(){

        var numPokemon = $(this).attr('idPokemon');

        $.ajax({

            url: 'https://pokeapi.co/api/v2/pokemon/' + numPokemon,
            type: 'GET'
        }).done(function(resp){

            $('#modalPokemon').show();
        })
    }


)});