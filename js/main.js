let costoElectricidadBaseReturn;
let costoElectricidadPiezaReturn;
let costoAmortizacionBaseReturn;
let costoMaterialBaseReturn;
let costoPostReturn;
let costoPreReturn;
let costoAmortizacionReturn;
let costoFalloReturn;
let costoTotal;

//Verificación
let datoErroneo = false;

//Material y luz
let costoMaterial= 0;
let costoLuz= 0;
let costoPromedio = 0;

//Impresora
let costoImpresoraAmortizacion = 0;
let costoAmortizaciónTiempo = 0;
let diasActivaAnio = 0;
let horasActivas = 0;

let tasaFallos = 0;

//Costo operario
let costoOperario = 0;

//Cantidad de piezas
let seleccionNumeroPiezas = 0;
//Elección de número de piezas
let numeroPiezas = 0;

//Pieza
let tiempoPreproduccion = 0;
let tiempoPostproduccion = 0;
let piezaMasa = 0;
let piezaTiempo = 0;


//Funciones
function Multiplicar(dato1, dato2){
    return dato1 * dato2;
}

function Total(){
    return costoElectricidadPiezaReturn + costoPreReturn + costoPostReturn + costoFalloReturn + costoAmortizacionReturn + costoMaterialBaseReturn;
}

// Verificación
function VolverAEjecutar(dato, mensaje){
  
    if(!isNaN(dato)){
        if(mensaje != "None"){
        alert( mensaje + dato);
        }
    datoErroneo = false;}
        else{
        datoErroneo = true;
        alert("Lo sentimos, ha ingresado un dato incorrecto, por favor intente nuevamente");
        }
}

let AmortizacionImpresora = (costoImpresora, tiempo, dias, horas) => {
    return costoImpresora/(tiempo*dias*horas);
}

function TasaFallos(){
    return (costoElectricidadPiezaReturn + costoPreReturn + costoPostReturn + costoAmortizacionReturn + costoMaterialBaseReturn) * tasaFallos/100;
}
//Fin Funciones


alert("A continuación verá una serie de mensajes para poder calcular el valor aproximado de la impresión 3d");

do{
    while(isNaN(costoMaterial)|| costoMaterial==0){
    costoMaterial= parseFloat(prompt("Ingrese el coste del material por KG"));
}
    costoLuz= parseFloat(prompt("Ingrese el coste de luz por KWH"));
    costoPromedio = parseFloat(prompt("Ingrese el costo del consumo promedio KW"));
    costoElectricidadBaseReturn = Multiplicar(costoLuz, costoPromedio);
    VolverAEjecutar(costoElectricidadBaseReturn, "Costo electricidad por hora: ");
}while(datoErroneo);


do{
    costoImpresoraAmortizacion = parseFloat(prompt("Ingrese el costo de la impresora"));
    costoAmortizaciónTiempo = parseFloat(prompt("Ingrese el tiempo de amortización deseado (años)"));
    diasActivaAnio = parseFloat(prompt("Ingrese la cantidad de días que tiene encendida la impresora al año"));
    horasActivas = parseFloat(prompt("Ingrese la cantidad de horas activa por día"));
    costoAmortizacionBaseReturn = AmortizacionImpresora(costoImpresoraAmortizacion, costoAmortizaciónTiempo, diasActivaAnio, horasActivas);

    VolverAEjecutar(costoAmortizacionBaseReturn, "Amortización de la impresora precio/h: ");
}while(datoErroneo);


do{
    //Tasa fallos
    tasaFallos = parseFloat(prompt("Ingrese la tasa de fallos %, no ingrese el %, solo números"));

    //Costo operario
    costoOperario = parseFloat(prompt("Ingrese el costo de trabajo por hora"));

    do{
        //Cantidad de piezas
        seleccionNumeroPiezas = Math.round(parseInt(prompt("Ingrese la cantidad de piezas que va a imprimir (varias impresiones) (solo números enteros)")));
        numeroPiezas = seleccionNumeroPiezas;
    } while(numeroPiezas==0 || isNaN(numeroPiezas));
        

    for(i = 0; i < numeroPiezas; i++){
        let tiempoPreproduccionLoop = parseFloat(prompt("Ingrese el tiempo demandado para la preproducción de la pieza " + i + " en horas"));
        tiempoPreproduccion += tiempoPreproduccionLoop;

        let tiempoPostproduccionLoop = parseFloat(prompt("Ingrese el tiempo de la postproducción de la pieza " + i + " en horas"));
        tiempoPostproduccion += tiempoPostproduccionLoop;

        let piezaMasaLoop = parseFloat(prompt("Ingrese el peso de la pieza " + i + " en KG" ));
        piezaMasa += piezaMasaLoop;

        let piezaTiempoLoop = parseFloat(prompt("Ingrese el tiempo de impresión de la pieza " + i + " en horas"));
        piezaTiempo += piezaTiempoLoop;  
        }

    costoMaterialBaseReturn = Multiplicar(piezaMasa, costoMaterial);
    costoElectricidadPiezaReturn = Multiplicar( costoElectricidadBaseReturn, piezaTiempo);
    costoPreReturn = Multiplicar(costoOperario, tiempoPreproduccion);
    costoPostReturn = Multiplicar(costoOperario, tiempoPostproduccion);
    costoAmortizacionReturn = Multiplicar(costoAmortizacionBaseReturn, piezaTiempo);
    costoFalloReturn = TasaFallos();
    costoTotal = Total();
    //Compruebo que el valor total, que toma todos los valores, sigue siendo un número, de esa forma verifico que todo sea correcto
    VolverAEjecutar(costoTotal, "None");
} while(datoErroneo)

//Coste material;
alert("Costo material: " + costoMaterialBaseReturn);


//Electricidad
alert("Costo Electricidad - pieza/s: " + costoElectricidadPiezaReturn);

//Coste OperarioPre
alert("Costo pre-producción: " + costoPreReturn);

//Coste OperarioPost
alert("Costo post-producción: " + costoPostReturn);

//Coste Amortización
alert("Costo amortización: " + costoAmortizacionReturn);

//Coste Fallos
alert("Costo fallos: " + costoFalloReturn);

//Total
alert("Costo total: " + costoTotal);
