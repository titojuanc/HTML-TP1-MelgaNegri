function cambiarImagen(color) {
    const img = document.getElementById('producto-imagen');
    const colorTexto = document.getElementById('color-texto');
    const colorTabla = document.getElementById('color-tabla');

    if (window.location.pathname.includes("producto_slim.html")) {
        console.log("Estás en la página de producto");
        if (color === 'negro') {img.src = "imagenes/AIRV_Slim.png";} 
        else if (color === 'blanco') {img.src = "imagenes/AIRV_Slim_B.png";}
    } 
    else if (window.location.pathname.includes("producto_airv.html")){
        if (color === 'negro') {img.src = "imagenes/AIRV.png";} 
        else if (color === 'blanco') {img.src = "imagenes/AIRV_B.png";}
    }
    else if (window.location.pathname.includes("producto_pro.html")){
        if (color === 'negro') {img.src = "imagenes/AIRV_Pro.png";} 
        else if (color === 'blanco') {img.src = "imagenes/AIRV_Pro_B.png";}
    }
    if (color === 'negro') {
        colorTexto.innerText = "Negro";
        colorTabla.innerText = "Negro";
        } else if (color === 'blanco') {
        colorTexto.innerText = "Blanco";
        colorTabla.innerText = "Blanco";
        }
  }

  function mostrarToast(mensaje) {
    const toastMsg = document.getElementById('toast-msg');
    toastMsg.textContent = mensaje;

    const toast = new bootstrap.Toast(document.getElementById('liveToast'));
    toast.show();
  }

  function enviarConsulta() {
    const textarea = document.querySelector('textarea');
    const mensaje = textarea.value.trim();
    const toast = document.getElementById('consulta-toast');
    const toastText = document.getElementById('consulta-toast-text');

    if (mensaje === "") {
      toastText.innerText = "⚠️ Escribí una consulta antes de enviar.";
      toast.classList.remove("bg-success");
      toast.classList.add("bg-danger");
    } else {
      toastText.innerText = "✅ Tu consulta fue enviada al vendedor.";
      toast.classList.remove("bg-danger");
      toast.classList.add("bg-success");
      textarea.value = "";
    }

    toast.style.display = "block";

    // Ocultar automáticamente en 3 segundos
    setTimeout(() => {
      toast.style.display = "none";
    }, 3000);
  }

  function ocultarConsultaToast() {
    document.getElementById('consulta-toast').style.display = "none";
  }

  function agregarAlCarrito() {
    const imagen = document.getElementById('producto-imagen').src;
    const nombre = document.querySelector('h5').innerText;
    const precio = document.querySelector('.text-success.fw-bold').innerText;
    var carrito = JSON.parse(localStorage.getItem("carrito")); 
    var cantidad = 1;
    var TeamMomo=false;

    const producto = {
      imagen,
      nombre,
      precio,
      cantidad
    };
  
    if(carrito == null){
        console.log("Entre soy null")
        localStorage.setItem("carrito", JSON.stringify([producto]))
    }
    else{
        console.log("Entre no soy null")

        for(let i=0;i<carrito.length;i++){
            if(carrito[i].imagen == producto.imagen){
                carrito[i].cantidad++;
                TeamMomo=true;
                break;
            }
        }
        if(!TeamMomo){
            carrito.push(producto);
        }
    
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    mostrarToast("Producto agregado al carrito.");
  }

  function recorrerCarrito(){

  }
  
  function mostrarCarrito() {
    const contenedor = document.getElementById("carrito-contenido");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
    contenedor.innerHTML = "";
  
    if (carrito.length === 0) {
      contenedor.innerHTML = '<p class="text-muted">No hay artículos agregados.</p>';
      return;
    }
  
    carrito.forEach((producto, index) => {
      const item = document.createElement("div");
      item.className = "card mb-3";
      item.innerHTML = `
        <div class="row g-0">
          <div class="col-4">
            <img src="${producto.imagen}" class="img-fluid rounded-start" style="object-fit: contain; max-height: 100px;">
          </div>
          <div class="col-8">
            <div class="card-body p-2">
              <h5 class="card-title mb-1">${producto.nombre}</h5>
              <p class="card-text mb-2">${producto.precio}</p>
              <button class="btn btn-sm btn-outline-danger" onclick="eliminarDelCarrito(${index})">Eliminar</button>
            </div>
          </div>
        </div>
      `;
      contenedor.appendChild(item);
    });
  }
  