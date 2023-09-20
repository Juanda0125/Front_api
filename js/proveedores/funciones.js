//const url = 'https://api-k3nd.onrender.com/api/usuario'
const url = 'https://api-k3nd.onrender.com/api/proveedor'

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
        let listaProveedores = data.proveedores //Capturar el array devuelto por la api
        datos = 
        listaProveedores.map(function(proveedor) {//Recorrer el array
            respuesta += `<tr><td>${proveedor.ID}</td>`+
            `<td>${proveedor.nombre}</td>`+
            `<td>${proveedor.direccion}</td>`+
            `<td>${proveedor.telefono}</td>`+
            `<td>
            <i onclick="window.location.href='actualizarProveedores.html?_id=${proveedor._id}'" class="fa-solid fa-pen-to-square iconosRojos"></i>
            <i onclick="eliminar('${proveedor._id}')" class="fa-solid fa-pen-to-square "></i>
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
    let _id= document.getElementById('id_proveedor').value
    let _nombre_proveedor = document.getElementById('nombre_proveedor').value
    let _direccion_proveedor = document.getElementById('direccion_proveedor').value
    let _telefono_proveedor = document.getElementById('telefono_proveedor').value
    

   

        let proveedores = {
            ID:_id,
            nombre:_nombre_proveedor,
            direccion:_direccion_proveedor,
            telefono:_telefono_proveedor      
        }

        console.log(proveedores)

    try {
        await fetch(url,  {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(proveedores),//Convertir el objeto _usuario  a un JSON
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

                    window.location.href = 'gestionProveedores.html'; 
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


function consultarProveedor(busqueda) {
    //alert(busqueda)
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
        let proveedor = data.proveedores[0]
        console.log("proveedor : ")
        console.log(proveedor)
        document.getElementById('id_proveedor_actu').value = proveedor.ID;
        document.getElementById('nombre_proveedor_actu').value = proveedor.nombre;        
        document.getElementById('direccion_proveedor_actu').value = proveedor.direccion;
        document.getElementById('telefono_proveedor_actu').value = proveedor.telefono;
        document.getElementById('_id').value = proveedor._id;


        //
       
    }).catch(function (error) {
            console.error('1. Error al obtener los detalles:', error);
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
    let _ID= document.getElementById('id_proveedor_actu').value
    let _nombre_proveedor = document.getElementById('nombre_proveedor_actu').value
    let _direccion_proveedor = document.getElementById('direccion_proveedor_actu').value
    let _telefono_proveedor = document.getElementById('telefono_proveedor_actu').value

    


    
        let proveedor = {
            _id:_id,
            ID:_ID,
            nombre:_nombre_proveedor,
            direccion:_direccion_proveedor,
            telefono:_telefono_proveedor
        }

        console.log(proveedor)

        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(proveedor),//Convertir el objeto _usuario  a un JSON
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
                        window.location.href = 'gestionProveedores.html'; // Redireccionar después del clic en OK
                    }
                });
            })
    
}

const eliminar = (id) =>{
    if(confirm(`¿Está seguro de Realizar la Eliminación`) == true){
           let permiso  = {
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

            window.location.href = 'gestionProveedores.html'
    }
}

const eliminar1 = (id) =>{
    //alert(id)
    
    if(confirm(`¿Está seguro de Realizar la Eliminación ${id}`) == true){

            let permiso = {
                _id: id
            }
           
           fetch(url,  {
                method: 'DELETE',
                mode: 'cors',
                body: JSON.stringify(permiso),//Convertir el objeto _usuario  a un JSON
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then((resp) => resp.json())
            .catch(function (error) {
                console.error('1. Error al obtener los detalles del permiso:', error);
            });
            
            //Obtener la respuesta y convertirla a json
            /*.then(json => {
                alert(json.msg)//Mensaje que retorna la API
            })*/
            // window.location.href = 'gestionPermisos.html'     
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

