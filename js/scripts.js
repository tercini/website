$(document).ready(function(){
    new WOW().init();

    //ROLAGEM
    jQuery(document).ready(function($) { 
        $(".scroll").click(function(event){        
            event.preventDefault();
            // window.history.pushState({url: "" + $(this).attr('href') + ""}, $(this).attr('title') , $(this).attr('href'));
            $('html,body').animate({scrollTop:$(this.hash).offset().top -50}, 800);
       });
    });

    timetoscroll = "";
    $(window).scroll(function(e){
          clearTimeout(timetoscroll);
          var posY = (document.documentElement.scrollTop) ? document.documentElement.scrollTop : window.pageYOffset;
      timetoscroll = setTimeout(function(){
        if(posY > 200){
          $('#header2').fadeIn();
        }
        if(posY < 200){
          $('#header2').fadeOut();      
        }
      },100);
    });


    //FORM
    $('.form').submit(function(e){
        e.preventDefault();
        // alert('teste');
        $('.btn-padrao').attr('type','button');
        textoBotao = $(this).find('.btn-padrao').text();
        $('.btn-padrao').text('enviando...');
        $('.load').show();
        name = $(this).attr('id');
        $.ajax({
            url: 'php/'+name+'.php',
            data: new FormData(this),
            processData: false,
            contentType: false,
            type: 'POST',
            dataType: "html",
            success:function(retorno){
               $('#retorno').html(retorno);
            }
        });
    });

    //FORM
    $('.form2').submit(function(e){
        e.preventDefault();
        // alert('teste');
        $('.btn-padrao').attr('type','button');
        textoBotao = $(this).find('.btn-padrao').text();
        $('.btn-padrao').text('enviando...');
        $('.load').show();
        name = $(this).attr('id');
        $.ajax({
            url: '../php/'+name+'.php',
            data: new FormData(this),
            processData: false,
            contentType: false,
            type: 'POST',
            dataType: "html",
            success:function(retorno){
               $('#retorno').html(retorno);
            }
        });
    });

     //ADICIONA PRODUTO CARRINHO
    $('.adiciona_carrinho').submit(function(e){
        e.preventDefault();
        $.ajax({
            url: '../php/carrinho_funcoes.php',
            data: $(this).serialize(),
            type: 'POST',
            dataType: "html"
        }).done(function(data){
            $('#myModalAdd').modal()
            $('#myModalAdd .modal-body').html(data);
        });
    });

    //REMOVER PRODUTO CARRINHO
    $('.remove-produto').click(function(){
        idproduto = $(this).attr('id');
        $.ajax({
            url: 'php/carrinho_funcoes.php',
            data:{id:idproduto, acao:"del"},
            type: 'POST',
            dataType: "html"
        }).done(function(data){
            location.reload();
        })
    });

    //ATUALIZAR PRODUTO CARRINHO
    $('.atualiza-produto').submit(function(e){
        e.preventDefault();
        $.ajax({
            url: 'php/carrinho_funcoes.php',
            data: $(this).serialize(),
            type: 'POST',
            dataType: "html"
        }).done(function(data){
            location.reload();
        })
    });

    $('.finaliza-orcamento').click(function(){
        var hcarrinho = $('.carrinho').height();
        var hcarrinho = hcarrinho + 400;
        $('body').animate({scrollTop:hcarrinho}, '500');
        $("#formulario-orcamento").slideDown();
    });


});


function validateForm(formNumber) {
    var response;

    if (formNumber === 1) {
        response = grecaptcha.getResponse(0); // O primeiro reCAPTCHA
    } else if (formNumber === 2) {
        response = grecaptcha.getResponse(1); // O segundo reCAPTCHA
    }

    if (response.length === 0) {
        // O reCAPTCHA não foi preenchido
        alert("Por favor, preencha o reCAPTCHA.");
        return false;
    }

    // O reCAPTCHA foi preenchido corretamente
    return true;
}