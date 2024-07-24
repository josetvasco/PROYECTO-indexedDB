(function () {
  let DB;
  const formulario = document.querySelector('#formulario');

  document.addEventListener('DOMContentLoaded', () => {
      conectarDB();

      formulario.addEventListener('submit', validarCliente)
  });

  function validarCliente(e) {
    e.preventDefault();

    //Leer todos los inputs
    const nombre = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;
    const telefono = document.querySelector('#telefono').value;
    const empresa = document.querySelector('#empresa').value;

    if( nombre === '' || email === '' || telefono === '' || empresa === '' ) {
      imprimirElerta('Todos los campos son obligatorios', 'error');
      return;
    }

    //Crear un objeto con la información

    const cliente = {
      nombre,
      email,
      telefono,
      empresa,
    }
    
    cliente.id = Date.now();

    crearNuevoCliente(cliente); 
  }

  function crearNuevoCliente(cliente) {
    const transaction = DB.transaction(['crm'], 'readwrite');

    const objectStore = transaction.objectStore('crm');

    objectStore.add(cliente);

    transaction.onerror = function() {
      imprimirElerta('Correo ya está registrado', 'error');
    }

    transaction.oncomplete = function() {
      imprimirElerta('Cliente agregado exitosamente');
      
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    }
  }

})();