//const url = 'https://api-k3nd.onrender.com/api/usuario'
const url = 'https://api-k3nd.onrender.com/api/usuario'

const listarDatos = async() => {
    let respuesta = ''
    let body = document.getElementById('contenido')
    // alert(url + `?_id=650479a5352c53b951e2d9f2`)
    //url: Es la url de la api.
    //Al deslpegarla en el servidor colocar la api del servidor
    //  urlAPI += `?_id=${encodeURIComponent(busqueda)}`;
        fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
    .then(function(data) {

        // Limpia la tabla antes de agregar datos nuevos
        table.clear().draw();

        console.log(data)
        let listaPermisos = data.permisos //Capturar el array devuelto por la api
        datos = 
        listaPermisos.map(function(permiso) {//Recorrer el array
           
            respuesta += `<tr><td>${permiso.ID}</td>`+
            `<td>${permiso.nombre}</td>`+
            `<td>${permiso.modulo}</td>`+
            `<td>
            <i onclick="window.location.href='actualizarPermisos.html?_id=${permiso._id}'" class="fa-solid fa-pen-to-square iconosRojos"></i>
            <i onclick='eliminar("${permiso._id}")' class="fa-solid fa-pen-to-square "></i>
            </td>`+
            `</tr>`
        })

        //onclick="window.location.href='actualizarPermisos.html'
        //'editar(${JSON.stringify(permisos)})'

        // Agrega los datos a la tabla y redibuja la tabla
            table.rows.add($(respuesta)).draw();
    })
}

const registrar = async()=>{
    let _id= document.getElementById('idper').value
    let _nombreper = document.getElementById('nombreper').value
    let _modulo = "ola"

    //
    let _compras = document.getElementById('compras')
    let _orden = document.getElementById('orden')
    let _ventas = document.getElementById('ventas')
    let _usuarios = document.getElementById('usuarios')
    //
    if (_compras.checked)
       _compras = true
    else
       _compras = false
    //
    if (_orden.checked)
       _orden = true
    else
       _orden = false
    //
    if (_ventas.checked)
       _ventas = true
    else
       _ventas = false
    //
    if (_usuarios.checked)
       _usuarios = true
    else
       _usuarios = false            

    /*
    let compras=document.getElementById('compras').value 
    let orden=document.getElementById('orden').value
    console.log(compras.checked,orden.checked)  
    */

        let permisos = {
            ID:_id,
            nombre:_nombreper,
            modulo:_modulo,
            compras:_compras,
            orden:_orden,
            ventas:_ventas,
            usuarios:_usuarios            
        }

        console.log(permisos)

    try {
        await fetch(url,  {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(permisos),//Convertir el objeto _usuario  a un JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
        .then(json => {
            //alert(json.msg)//Mensaje que retorna la API
            console.log(json)
            if(json.msg){
                Swal.fire(
                    json.msg,
                    '',
                    'success'
                    
                )
                .then(() => {

                    window.location.href = 'gestionPermisos.html'; 
                });
                ;
            }
        })
    }
    catch (e) {
        console.log("Error = ")
        console.log({name:e.name,
        message:e.message});
    }
    
}
/*
const editar= (permiso)=>{
    
    console.log(permiso);
    document.getElementById('idper').value = ''
    document.getElementById('nombreper').value = ''
    modulo = ''
    

    document.getElementById('idper').value = permiso.ID
    document.getElementById('nombreper').value = permiso.nombre
    modulo = permiso.modulo
   
    window.location.href = 'actualizarPermisos.html'; 

}
*/


function consultarPermiso(busqueda) {
    
    let urlAPI = url;
    // alert(busqueda)
    // Si se proporciona un parámetro de búsqueda, construye la URL de la API con ese parámetro
    // busqueda="64ff42958bb2a7c7251cc8b5"

    //alert(url + `?_id=65047516352c53b951e2d9c5`)

    fetch(urlAPI += `?_id=${encodeURIComponent(busqueda)}`, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
    .then(function(data) {
        let permiso = data.permisos[0]
        console.log("permiso : ")
        console.log(permiso)
        document.getElementById('nidper').value = permiso.ID;
        document.getElementById('nnombreper').value = permiso.nombre;        
        document.getElementById('_id').value = permiso._id;
        //
        document.getElementById('compras').value = permiso.compras
        document.getElementById('orden').value = permiso.orden
        document.getElementById('ventas').value = permiso.ventas
        document.getElementById('usuarios').value = permiso.usuarios

    }).catch(function (error) {
            console.error('1. Error al obtener los detalles del permiso:', error);
        });



    /*if (busqueda) {
        urlAPI += `?_id=${encodeURIComponent(busqueda)}`;
    }
    // alert(urlAPI)
    fetch(urlAPI, {
        method: 'GET',
        mode: 'cors',
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then((resp) => resp.json())
        .then(function (data) {
            let permiso = data.permisos[0]; // Suponiendo que obtienes un solo cliente
            console.log(permiso)
            // Llenar los campos del formulario con los datos del cliente
            document.getElementById('nidper').value = permiso._id;
            document.getElementById('nnombreper').value = permiso.nombre_cliente;
        })
        .catch(function (error) {
            console.error('Error al obtener los detalles del permiso:', error);
        });*/
}




const actualizar = async()=>{
    let _id = document.getElementById('_id').value
    let _ID= document.getElementById('nidper').value
    let _nombreper = document.getElementById('nnombreper').value
    let _modulo = "ola"
    //
    let _compras = document.getElementById('compras')
    let _orden = document.getElementById('orden')
    let _ventas = document.getElementById('ventas')
    let _usuarios = document.getElementById('usuarios')
    //
    if (_compras.checked)
       _compras = true
    else
       _compras = false
    //
    if (_orden.checked)
       _orden = true
    else
       _orden = false
    //
    if (_ventas.checked)
       _ventas = true
    else
       _ventas = false
    //
    if (_usuarios.checked)
       _usuarios = true
    else
       _usuarios = false        
    // alert(_compras.checked+" -- "+_orden.checked)

    // alert(checked(_compras))
    /*if (checked(_compras))
       alert(true)*/

    //return

    
        let permiso = {
            _id:_id,
            ID:_ID,
            nombre:_nombreper,
            modulo:_modulo,
            compras:_compras,
            orden:_orden,
            ventas:_ventas,
            usuarios:_usuarios
        }

        console.log(permiso)

        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(permiso),//Convertir el objeto _usuario  a un JSON
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
            .then(json => {
                Swal.fire({
                    title: json.msg,
                    icon: 'success',
                    showCancelButton: false, // Evita que aparezca el botón "Cancelar"
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                        // El usuario hizo clic en "OK"
                        window.location.href = 'gestionPermisos.html'; // Redireccionar después del clic en OK
                    }
                });
            })
    
}


const eliminar = (id) =>{
    if(confirm('¿Está seguro de realizar la eliminación') == true){

           let permiso = {
                _id: id
            }
           fetch(url,  {
                method: 'DELETE',
                mode: 'cors',
                body: JSON.stringify(permiso),//Convertir el objeto _usuario  a un JSON
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
            .then(json => {
                alert(json.msg)//Mensaje que retorna la API
            }) 
    }
}


if(document.querySelector('#btnRegistrar')){
    document.querySelector('#btnRegistrar')
    .addEventListener('click',registrar)
}

if(document.querySelector('#btnActualizar')){
    document.querySelector('#btnActualizar')
.addEventListener('click',actualizar)
}

