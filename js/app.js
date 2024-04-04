const ingresos = [
    new Ingreso('Sueldo',2000.00),
    new Ingreso('Venta coche',1500.00),
];


const egresos = [
    new Egreso('Renta',900),
    new Egreso('Comida',500),
]


let cargarApp = () =>{
    cargarCabecero();
    cargarIngresos();
    cargaEgresos();
}

let totalIngresos = () =>{
    let totalIngreso = 0
    for (let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = () =>{
    let totalEgreso = 0; 

    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso; 
}

let cargarCabecero = () =>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

const formatoMoneda = (valor) =>{
    return valor.toLocaleString('en-US',{style:'currency',currency:"USD", minimumFractionDigits: 2});
}

const formatoPorcentaje = (valor) =>{
    return valor.toLocaleString('en-US',{style: "percent",minimumFractionDigits:2})
}

const cargarIngresos = () =>{
    let ingresosHTML = ''; 
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso); 
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}


const crearIngresoHTML = (ingreso) => {
   let ingresoHTML =  `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <i class="bi bi-x"
                onclick='eliminarIngreso(${ingreso.id})'></i>   
            </button>
        </div>
    </div>
</div>
`;
    return ingresoHTML;
}


const eliminarIngreso = (id) =>{
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(indiceEliminar,1);
    cargarCabecero();
    cargarIngresos();
}

const cargaEgresos = () => {
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso) => {
    let egresoHTML = `    
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
            <i class="bi bi-x"
            onclick='eliminarEgreso(${egreso.id})'></i>   
            </button>  
            </button>
        </div>
    </div>
</div>
`
return egresoHTML; 
}

const eliminarEgreso = (id) =>{
    let egresoEliminado = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(egresoEliminado,1); 
    cargarCabecero();
    cargaEgresos();
}

let agregarDato = () =>{
    let forma = document.forms['forma']; 
    let tipo = forma['tipo']; 
    let descripcion = forma['descripcion'];
    let valor = forma['valor']; 

    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push(new Ingreso(descripcion.value,+valor.value)); //El signo + convierte a un valor numérico
            cargarCabecero();
            cargarIngresos();
        }
        else if (tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value,+valor.value));
            cargarCabecero();
            cargaEgresos();
        }
    }
}



