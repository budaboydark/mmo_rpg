$(document).ready(function(){

    $('.js-cadastro').click(function(){
        window.location.href = "/cadastro";
    });

    $('.js-return-login').click(function(){
        window.location.href = "/";
    });

    $('#btn_sair').click(function(){
        window.location.href = '/sair';
    });

    $('#btn_suditos').click(function(){
        $('#msg').hide();

        $.ajax({
            url: '/suditos',
            method: 'get',
            success: function(data){
                $('#acoes').html(data);
            }
        });
    });

    $('#btn_pergaminho').click(function(){
        $('#msg').hide();
        
        $.ajax({
            url: '/pergaminhos',
            method: 'get',
            success: function(data){
                $('#acoes').html(data);
                clearTimeout(timerId);
                cronometro();
            }
        });
    });

});

var timerId = null;

function cronometro(){

    $('.js-tempo-restante').each(function(){
        var segundos = $(this).html();
        var segundos_atuais = parseInt(segundos) - 1;
        if(segundos_atuais < 0){
            window.location.href = "/jogo?msg=C"
        }else{
            $(this).html(segundos_atuais);
        }
    });

    timerId = setTimeout('cronometro()',1000);

}