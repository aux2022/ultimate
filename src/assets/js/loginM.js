
$( document ).ready(function() {
    
    $('#exampleModal').modal({backdrop: 'static', keyboard: false})
        $('#exampleModal').modal('show',{backdrop: 'static', keyboard: false});
  });
 
  function CierraPopup() {
if(document.getElementById('user').value==='Francisco' && document.getElementById('pass').value==='Orozco4'){
$("#exampleModal").modal('hide');//ocultamos el modal
}
else{
if(document.getElementById('user').value==='Jorge' && document.getElementById('pass').value==='Reyes06'){
$("#exampleModal").modal('hide');//ocultamos el modal
}
else{
    if(document.getElementById('user').value==='Jose' && document.getElementById('pass').value==='JoseL3'){
        $("#exampleModal").modal('hide');//ocultamos el modal
        }
        else{
            if(document.getElementById('user').value==='Montse' && document.getElementById('pass').value==='Monse9'){
                $("#exampleModal").modal('hide');//ocultamos el modal
                }else{
                    if(document.getElementById('user').value==='Marco' && document.getElementById('pass').value==='Marco5'){
                        $("#exampleModal").modal('hide');//ocultamos el modal
                        }else{
                            if(document.getElementById('user').value==='Karla' && document.getElementById('pass').value==='Karla9'){
                                $("#exampleModal").modal('hide');//ocultamos el modal
                            }
                            else{alert('Error en las credenciales')}

                        }
                }
        }
    }
}


        
}



// 


