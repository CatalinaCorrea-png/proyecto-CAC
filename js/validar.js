//* Todo se ejecuta cuando el DOM se carga completamente
document.addEventListener('DOMContentLoaded',()=>{
    //* Selecciona el formulario del dom
  const formulario = document.querySelector('form');

  // ---------------------------------
  //* Funcion para mostrar error
  const mostrarError = (input,mensaje) => {
    // Acceder al div padre/contenedor
    const divPadre = input.parentNode;
    // Encontramos elemento error-text
    const errorText = divPadre.querySelector('.error-text');
    // Agregar la clase 'error' al elemento padre
    divPadre.classList.add('error');
    // Agregamos el mensaje de error
    errorText.innerText = mensaje;
  }

  // ---------------------------------

  //* Eliminar mensaje de error
  const eliminarError = input => {
    // Accedemos a la etiqueta contenedora
    const divPadre = input.parentNode;
    // Eliminar clase error del elemento padre
    divPadre.classList.remove('error');
    // Encontrar elemento error-text
    const errorText = divPadre.querySelector('.error-text');
    // Establecemos el te4xto como vacío
    errorText.innerText = '';
  }

  // ---------------------------------
  //* Funcion para corroborar si los campos estan completos para quitar el error

  formulario.querySelectorAll('input').forEach(input =>{
    // Se activa cuando el valor de un elemento del form cambia y se sale del elemento
    input.addEventListener('change',()=>{
      // Obtenemos el valor del campo seleccionado
      const valor = input.value.trim(); //? Elimina espacio en blanco al principio y al final del valor obtenido.
      //* condicion para evaluar
      if (valor !== ''){
        eliminarError(input);
      }
    })
  })

  // ---------------------------------
  //* Funcion validar campo
  function validarCampo(campoId,mensaje) {
    const campo = document.getElementById(campoId);
    const value = campo.value.trim();

    if (value === ''){
      mostrarError(campo, mensaje);
      return  false; //? Indicamos que la validacion falló
    }else{
      eliminarError(campo);
      return true; //? Indicamos que la validacion fue exitosa
    }
  }

  // ---------------------------------
  //* Validar correo electronico utilizando expresion regular
  function isEmail(email) {
    const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionRegular.test(email); //? .test Devuelve TRUE si las cadena coinciden
  }
  //* Validar campo email
  function validarEmail(campoId,mensaje) {
    // obtenemos el campo mediante id
    const campo = document.getElementById(campoId);
    const email = campo.value.trim();

    if (email === ''){
      mostrarError(campo, 'Correo electronico obligatorio');
      return false; //? Validacion falla
    }else if (!isEmail(email)){
      mostrarError(campo,mensaje);
      return false; //? Validacion falla
    }else{
      eliminarError(campo);
      return true; //? Validacion exitosa
    }
  }

  //--------------------------------
  //* Funcion validar formulario
  const validarFormulario = () => {
    let validar = true;
    
        //* Validar EMAIL
    validar = validarEmail('email','Correo electronico no válido') && validar; 
    //* Validar CONTRASEÑA
validar = validarCampo('password','Contraseña obligatoria') && validar;
        //* Validar NOMBRE y APELLIDO
    validar = validarCampo('nombre','Campo obligatorio') && validar;  
    validar = validarCampo('apellido','Campo obligatorio') && validar; 
        //* Validar FECHA
    validar = validarCampo('fecha','Fecha no valida') && validar;

    return validar;
  }

  //---------------------------
  //* Evento de escucha para el submit del form

  formulario.addEventListener('submit',event => {
    event.preventDefault();
    if (!validarFormulario()){
      event.preventDefault();
      console.log("El formulario no es valido");
    }else{
      event.preventDefault();
      console.log("El formulario es valido");
    }
  })
});

