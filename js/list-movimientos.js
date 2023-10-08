$(document).ready(() => {

    var pages;
    var numOffset = 0;
    var limit = 42;
    var numPage = 1;
    cargarMovimientos(numOffset);

    $(document).on('click', '.page', function () {
        numPage = $(this).attr('page')
        numOffset = limit * (numPage - 1);
        cargarMovimientos(numOffset);
    });
    $(document).on('click', '.avanz-page', function () {
        if (numPage < pages) {
            numPage++;
            numOffset = limit * (numPage - 1);
            cargarMovimientos(numOffset);
        }

    });
    $(document).on('click', '.return-page', function () {
        if (numPage > 1) {
            numPage--;
            numOffset = limit * (numPage - 1);
            cargarMovimientos(numOffset);
        }

    });

    function cargarMovimientos(numOffset) {
        $.ajax({
            type: "GET",
            url: 'https://pokeapi.co/api/v2/move/?limit= ' + limit + ' &offset=' + numOffset,

        }).done(respuesta => {
            $('#lista-movimientos').html('');
            $('.page').remove();
            pages = Math.ceil(respuesta.count / limit);
            var templatePag;
            for (let i = pages; i > 0; i--) {
                templatePag = `<span class="p-1 page" page="${i}">${i}</span>`
                $('.return-page').after(templatePag);
            }
            var numeroPagina = Number(1) + Number(numPage);
            $('.page:nth-child(' + numeroPagina + ')').css("font-weight", "bold");
            var listaMovimientos = respuesta.results;
            listaMovimientos.forEach(card => {
                $.ajax({
                    type: "GET",
                    url: card.url,

                }).done(mov => {
                    var cardMovimiento = `<div class="col-4 movimiento mb-3" movId="${mov.id}">
                        <div class="card-movimiento shadow" style="border-color: ${colorBorderTipo(mov.type.name)}!important" >
                            <div class="row">
                                <div class="col-4">
                                    <div class="img-tipo-movimiento p-1">
                                        <img src="${getImgModo(mov.damage_class.name)}" alt="tipo del ataque" class="w-100">
                                    </div>
                                </div>
                                <div class="col-4 p-3">
                                    <span class="fs-5 fw-bold">${formatNames(mov.name)}</span><br>
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
    }

    $(document).on('click', '.movimiento', function () {

        var movId = $(this).attr('movId');

        $.ajax({
            url: `https://pokeapi.co/api/v2/move/${movId}`,
            type: 'GET'
        }).done(mov => {
            $('#nameMov').text(formatNames(mov.name));
            $('#idMov').text(movId);
            $('#descMov').text(formatNames(mov.flavor_text_entries[0].flavor_text));
            $('#tipoMov').text(formatNames(mov.type.name));
            $('#objMov').text(formatNames(mov.target.name))
            $('#powMov').text(mov.power != null ? mov.power : 0);
            $('#preMov').text(mov.accurancy != null ? mov.accuracy : 0);
            $('#ppMov').text(mov.pp != null ? mov.pp : 0);
            $('#imgModoMov').attr("src", getImgModo(mov.damage_class.name));
            $('#imgTipoMov').attr("src", getTipoMov(mov));
            $('.modal-content').css("border-color", colorBorderTipo(mov.type.name));
            $('.modal-content').css("border-width", "5px");
            $('#detalleMove').modal('show');
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

    function getImgModo(modoAtaque) {
        switch (modoAtaque) {
            case 'physical':
                return "../img/ataque_fisico.png"
                break;
            case 'status':
                return "../img/ataque_sin_efecto.png"
                break;
            case 'special':
                return "../img/ataque_especial.png"
                break;
            default:
                return "0"
                break;
        }
    }

    function formatNames(nameSinFormat) {
        var firstLetter = nameSinFormat.split('')[0].toUpperCase();
        return (firstLetter + nameSinFormat.slice(1)).replace("-", " ");
    }

    function getTipoMov(mov) {

        var tipo = mov.type.name;
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