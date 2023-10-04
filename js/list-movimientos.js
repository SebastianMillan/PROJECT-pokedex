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
                console.log(mov.damage_class.name)
                var cardMovimiento = `<div class="col-4 movimiento mb-3">
                        <div class="card-movimiento shadow">
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


    function getImgTipo(tipoAtaque) {
        switch (tipoAtaque) {
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