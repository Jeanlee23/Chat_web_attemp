
function whoami(){
        $.ajax({
            url:'/current',
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response){
                $('#cu_username').html("@" + response['username']);
                var name = response['name']+" "+response['fullname'];
                $('#cu_name').html(name);
                allusers();
            },
            error: function(response){
                alert(JSON.stringify(response));
            }
        });
    }

function allusers(){
    $.ajax({
        url:'/users',
        type:'GET',
        contentType: 'application/json',
        dataType:'json',
        success: function(response){
            var i = 0;
            $.each(response, function(){
                var f = '<div class="alert" onclick="showMessages('+response[i].id+')" >';
                f = f + response[i].username;
                f = f + '</div>';
                i = i+1;
                $('#allusers').append(f);
                $('#showUsers').val("Hide all users");
            });
        },
        error: function(response){
            alert(JSON.stringify(response));
        }
    });
}


function showMessages(id){
    $('#Enviar').on("click", function(){ sendMessage(id); });
    var id_data = JSON.stringify({
            "id": id
        });
    $.ajax({
        url:'/current_chat',
        type:'POST',
        data : id_data,
        contentType: 'application/json',
        dataType:'json',
        success: function(response){
            $('#mensajes').html("");
            var i = 0;
            $.each(response, function(){
                var f = '<div class="msg">';
                f = f + response[i].content;
                f = f + '</div>';
                $('#mensajes').append(f);
                i++;
            });
        },
        error: function(){
            alert('NO se pudo cargar el chat');
        }
    });
}


function sendMessage(id) {
    var text_content = $('#text_send').val();
    //$('#text_send').val("");
    var msg_data = JSON.stringify({
            "content" : text_content,
            "user_to_id": id
        });
    $.ajax({
        url:'/send_message',
        type:'POST',
        contentType: 'application/json',
        data : msg_data,
        dataType:'json',
        success: function(){
            console.log('Se envio el mensaje :)');
        },
        error: function(){
            alert('NO envio el mensaje :(');
        }
    });
    showMessages(id);
}