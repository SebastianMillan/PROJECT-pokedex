$(document).ready(function () {

    var pages;
    var numOffset = 0;
    var limit = 42;
    var numPage = 1;
    cargarPokemons(numOffset);

    $(document).on('click', '.page', function () {
        numPage = $(this).attr('page');
        numOffset = limit * (numPage - 1);
        cargarPokemons(numOffset);
    });
    $(document).on('click', '.avanz-page', function () {
        if (numPage < pages) {
            numPage++;
            numOffset = limit * (numPage - 1);
            cargarPokemons(numOffset);
        }

    });
    $(document).on('click', '.return-page', function () {
        if (numPage > 1) {
            numPage--;
            numOffset = limit * (numPage - 1);
            cargarPokemons(numOffset);
        }

    });

    function cargarPokemons(numOffset) {
        $.ajax({
            url: 'https://pokeapi.co/api/v2/pokemon/?limit=' + limit + '&offset=' + numOffset,
            type: 'GET',
        }).done(function (resp) {
            $('#list-pokemon').html("");
            $('.page').remove();
            pages = Math.ceil(resp.count / limit);
            var templatePag;
            for (let i = pages; i > 0; i--) {
                templatePag = `<span class="p-1 page" page="${i}">${i}</span>`
                $('.return-page').after(templatePag);
            }
            var numeroPagina = Number(1) + Number(numPage);
            $('.page:nth-child(' + numeroPagina + ')').css("font-weight", "bold");
            var pokedex = resp.results;
            pokedex.forEach(function (pokemon) {
                $.ajax({
                    type: "GET",
                    url: pokemon.url
                }).done(function (pokemonInfo) {

                    var primeraLetra = pokemonInfo.name.split('')[0].toUpperCase();
                    var nombreBien = (primeraLetra + pokemonInfo.name.slice(1).replace("-", " "));

                    var template = `
                    <div class="col-md-4 mb-2">
                        <div class="borderCard" style="border-color: ${cambiarColorBorde(pokemonInfo)}!important" idPokemon=${pokemonInfo.id}>
                            <div class="row">
                                <div class="col-md-4">
                                    <img src="${pokemonInfo.sprites.front_default}"
                                         alt="${nombreBien}" class="imgPokemon"></img>
                                </div>
                                <div class="col-md-4">
                                    <p class="nombrePokemon"><strong>${nombreBien}</strong><br><span class="idPokemon">
                                    #${pokemonInfo.id}</span></p>
                                </div>
                                <div class="col-md-4">       
                                    <div class="tipo w-50"><img src="${colocarFotoTipo(pokemonInfo)}"></img></div>                                    
                                </div>
                            </div>
                        </div>
                    </div>`;

                    $('#list-pokemon').append(template);

                });
            });
        });
    }



    $(document).on('click', '.borderCard', function () {

        var numPokemon = $(this).attr('idPokemon');

        $.ajax({
            url: 'https://pokeapi.co/api/v2/pokemon/' + numPokemon,
            type: 'GET'

        }).done(function (resp) {

            $('#fotoPokemon').attr('src', resp.sprites.front_default);
            $('#nombrePokemon').text(formatNames(resp.name));
            $('#numPokemon').text(resp.id);
            if (resp.types.length == 1)
                $('#tipoPokemon').text(formatNames(resp.types[0].type.name));
            else
                $('#tipoPokemon').text(formatNames(resp.types[0].type.name) + " / " + formatNames(resp.types[1].type.name));
            $('#habilidadPokemon').text(formatNames(resp.abilities[0].ability.name));
            $('#psPokemon').text(resp.stats[0].base_stat);
            $('#atPokemon').text(resp.stats[1].base_stat);
            $('#defPokemon').text(resp.stats[2].base_stat);
            $('#saPokemon').text(resp.stats[3].base_stat);
            $('#sdEspecial').text(resp.stats[4].base_stat);
            $('#velPokemon').text(resp.stats[5].base_stat);
            $('.modal-content').css("border-color", cambiarColorBorde(resp));
            $('.modal-content').css("border-width", "5px");
            $('#imgTipoPokemon').attr('src', colocarFotoTipo(resp));
            $('#imgPokemon').attr('src', resp.sprites.front_default);

            $('#modalPokemon').modal('show');

        });
    });

    function formatNames(nameSinFormat) {
        var firstLetter = nameSinFormat.split('')[0].toUpperCase();
        return (firstLetter + nameSinFormat.slice(1)).replace("-", " ");
    }

    function cambiarColorBorde(pokemon) {
        var tipo = pokemon.types[0].type.name;
        var colorBorde = '';
        switch (tipo) {
            case 'grass':
                colorBorde = '#5CBE64';
                break;
            case 'fire':
                colorBorde = '#FBAE46';
                break;
            case 'water':
                colorBorde = '#6CBDE4';
                break;
            case 'poison':
                colorBorde = '#C261D4';
                break;
            case 'bug':
                colorBorde = '#AFC836';
                break;
            case 'ground':
                colorBorde = '#D29463';
                break;
            case 'dark':
                colorBorde = '#9298A4';
                break;
            case 'electric':
                colorBorde = '#FBE273';
                break;
            case 'fairy':
                colorBorde = '#F3A7E7';
                break;
            case 'fighting':
                colorBorde = '#E74347';
                break;
            case 'ghost':
                colorBorde = '#7773D4';
                break;
            case 'ice':
                colorBorde = '#8CDDD4';
                break;
            case 'normal':
                colorBorde = '#A3A49E';
                break;
            case 'psychic':
                colorBorde = '#FE9F92';
                break;
            case 'rock':
                colorBorde = '#D7CD90'
                break;
            case 'steel':
                colorBorde = '#58A6AA';
                break;
            case 'dragon':
                colorBorde = '#0180C7';
                break;
            case 'flying':
                colorBorde = '#A6C2F2';
                break;
            default:
                colorBorde = '#000000';
                break;
        }

        return colorBorde;
    }

    function cambiarColorCirculo(pokemon) {

        var tipo = pokemon.types[0].type.name;
        var colorCirculo = '';

        switch (tipo) {

            case 'grass':
                colorCirculo = '#5CBE64';
                break;
            case 'fire':
                colorCirculo = '#FBAE46';
                break;
            case 'water':
                colorCirculo = '#6CBDE4';
                break;
            case 'poison':
                colorCirculo = '#C261D4';
                break;
            case 'bug':
                colorCirculo = '#AFC836';
                break;
            case 'ground':
                colorCirculo = '#D29463';
                break;
            case 'dark':
                colorCirculo = '#9298A4';
                break;
            case 'electric':
                colorCirculo = '#FBE273';
                break;
            case 'fairy':
                colorCirculo = '#F3A7E7';
                break;
            case 'fighting':
                colorCirculo = '#E74347';
                break;
            case 'ghost':
                colorCirculo = '#7773D4';
                break;
            case 'ice':
                colorCirculo = '#8CDDD4';
                break;
            case 'normal':
                colorCirculo = '#A3A49E';
                break;
            case 'psychic':
                colorCirculo = '#FE9F92';
                break;
            case 'rock':
                colorCirculo = '#D7CD90'
                break;
            case 'steel':
                colorCirculo = '#58A6AA';
                break;
            case 'dragon':
                colorCirculo = '#0180C7';
                break;
            case 'flying':
                colorCirculo = '#A6C2F2';
                break;
            default:
                colorCirculo = '#000000';
                break;
        }

        return colorCirculo;
    }

    function colocarFotoTipo(pokemon) {

        var tipo = pokemon.types[0].type.name;
        var foto = '';

        switch (tipo) {

            case 'dragon':
                foto = 'https://archives.bulbagarden.net/media/upload/thumb/7/70/Dragon_icon_SwSh.png/80px-Dragon_icon_SwSh.png';
                break;

            case 'grass':
                foto = 'https://archives.bulbagarden.net/media/upload/thumb/a/a8/Grass_icon_SwSh.png/80px-Grass_icon_SwSh.png';
                break;

            case 'fire':
                foto = 'https://archives.bulbagarden.net/media/upload/thumb/a/ab/Fire_icon_SwSh.png/80px-Fire_icon_SwSh.png';
                break;

            case 'water':
                foto = 'https://archives.bulbagarden.net/media/upload/thumb/8/80/Water_icon_SwSh.png/80px-Water_icon_SwSh.png';
                break;

            case 'poison':
                foto = 'https://archives.bulbagarden.net/media/upload/thumb/8/8d/Poison_icon_SwSh.png/80px-Poison_icon_SwSh.png';
                break;

            case 'bug':
                foto = 'https://archives.bulbagarden.net/media/upload/thumb/9/9c/Bug_icon_SwSh.png/80px-Bug_icon_SwSh.png';
                break;

            case 'ground':
                foto = 'https://archives.bulbagarden.net/media/upload/thumb/2/27/Ground_icon_SwSh.png/80px-Ground_icon_SwSh.png';
                break;

            case 'dark':
                foto = 'https://archives.bulbagarden.net/media/upload/thumb/d/d5/Dark_icon_SwSh.png/80px-Dark_icon_SwSh.png';
                break;

            case 'electric':
                foto = 'https://archives.bulbagarden.net/media/upload/thumb/7/7b/Electric_icon_SwSh.png/80px-Electric_icon_SwSh.png';
                break;

            case 'fairy':
                foto = 'https://archives.bulbagarden.net/media/upload/thumb/c/c6/Fairy_icon_SwSh.png/80px-Fairy_icon_SwSh.png';
                break;

            case 'fighting':
                foto = 'https://archives.bulbagarden.net/media/upload/thumb/3/3b/Fighting_icon_SwSh.png/80px-Fighting_icon_SwSh.png';
                break;

            case 'ghost':
                foto = 'https://archives.bulbagarden.net/media/upload/thumb/0/01/Ghost_icon_SwSh.png/80px-Ghost_icon_SwSh.png';
                break;

            case 'ice':
                foto = 'https://archives.bulbagarden.net/media/upload/thumb/1/15/Ice_icon_SwSh.png/80px-Ice_icon_SwSh.png';
                break;

            case 'normal':
                foto = 'https://archives.bulbagarden.net/media/upload/thumb/9/95/Normal_icon_SwSh.png/80px-Normal_icon_SwSh.png';
                break;

            case 'psychic':
                foto = 'https://archives.bulbagarden.net/media/upload/thumb/7/73/Psychic_icon_SwSh.png/80px-Psychic_icon_SwSh.png';
                break;

            case 'rock':
                foto = 'https://archives.bulbagarden.net/media/upload/thumb/1/11/Rock_icon_SwSh.png/80px-Rock_icon_SwSh.png';
                break;

            case 'steel':
                foto = 'https://archives.bulbagarden.net/media/upload/thumb/0/09/Steel_icon_SwSh.png/80px-Steel_icon_SwSh.png';
                break;

            case 'flying':
                foto = 'https://archives.bulbagarden.net/media/upload/thumb/b/b5/Flying_icon_SwSh.png/80px-Flying_icon_SwSh.png';
                break;

            default:
                return foto;
                break;
        }

        return foto;
    }
});