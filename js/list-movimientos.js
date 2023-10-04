$(document).ready(() => {

    $.ajax({
        type: "GET",
        url: "https://pokeapi.co/api/v2/move/",
        data: {
            limit: 100, order: 'desc'
        },

    }).done(respuesta => {
        var listaMovimientos = respuesta.results;
        listaMovimientos.forEach(card => {
            $.ajax({
                type: "GET",
                url: card.url,

            }).done(mov => {
                var firstLetter = mov.name.split('')[0].toUpperCase();
                var nombreMov = (firstLetter + mov.name.slice(1)).replace("-", " ");
                console.log(mov.type.name)
                var cardMovimiento = `<div class="col-4 movimiento mb-3">
                        <div class="card-movimiento shadow" style="border-color: ${colorBorderTipo(mov.type.name)}!important" >
                            <div class="row">
                                <div class="col-4">
                                    <div class="img-tipo-movimiento p-1">
                                        <img src="${getImgTipo(mov.damage_class.name)}" alt="tipo del ataque" class="w-100">
                                    </div>
                                </div>
                                <div class="col-4 p-3">
                                    <span class="fs-5 fw-bold">${nombreMov}</span><br>
                                    <span>#<span>${mov.id}</span></span>
                                </div>
                                <div class="col-4 p-3">
                                    <span>Potencia: <span class="fw-bold">${mov.power != null ? mov.power : 0}</span></span><br>
                                    <span>Precisión: <span class="fw-bold">${mov.accuracy != null ? mov.accuracy : 0}</span></span><br>
                                    <span>PP: <span class="fw-bold">${mov.pp}</span></span>
                                </div>
                            </div>
                        </div>
                    </div>`
                $('#lista-movimientos').append(cardMovimiento)

            });

        });

    });


    function colorBorderTipo(tipoAtaque) {
        switch (tipoAtaque) {
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

    function getImgTipo(modoAtaque) {
        switch (modoAtaque) {
            case 'physical':
                return "../img/ataque_fisico.PNG"
                break;
            case 'status':
                return "../img/ataque_sin_efecto.PNG"
                break;
            case 'special':
                return "../img/ataque_especial.PNG"
                break;
            default:
                return "0"
                break;
        }
    }
});