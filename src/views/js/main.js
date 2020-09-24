function button() {
    var documento = document.getElementById('documento').value;

    if(documento == null || documento.length == 0 ||/^\s+$/.test(documento)){
        alert('Ingrese documento')
        return false;
    }
    
}

$(document).ready(function () {
    $('input#documento')
      .keypress(function (event) {
        if (event.which < 48 || event.which > 57 || this.value.length === 15) {
          return false;
        }
      });
  });



function limpiarFormulario() {
    document.getElementById("Form").reset();
}

