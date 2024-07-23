(function() {
  let DB;

  const nombreInput = document.querySelector('#nombre');
  const emailInput = document.querySelector('#email');
  const telefonoInput = document.querySelector('#telefono');
  const empresaInput = document.querySelector('#empresa');

  document.addEventListener('DOMContentLoaded', () => {
    conectarDB();

    //Verificar el ID del url
    const parametrosURL = new URLSearchParams(window.location.search);
    const idCLiente = parametrosURL.get('id');

    if( idCLiente ) {
      setTimeout(() => {
        obtenerCliente(idCLiente);
      }, 100);
    }
  })

  function obtenerCliente(id) {
    const transaction = DB.transaction(['crm'], 'readwrite');
    const objectStore = transaction.objectStore('crm');

    const cliente = objectStore.openCursor();

    cliente.onsuccess = function(e) {
      const cursor = e.target.result;

      if(cursor) {
        
        if(cursor.value.id === Number(id) ) {
          llenarFormulario(cursor.value);
        }

        cursor.continue();
      } 
    }
  } 

  function llenarFormulario(datosCliente) {

  }

  function conectarDB() {
    const abrirConexion = window.indexedDB.open('crm', 1);

    abrirConexion.error = function() {
      console.log('Hubo un error');
    }

    abrirConexion.onsuccess = function() {
      DB = abrirConexion.result;
    }
  }

})();