// Arreglo para almacenar los préstamos
let prestamos = [];

/**
 * Calcula la cuota mensual de un préstamo
 * Fórmula: Cuota = (Préstamo * i) / (1 - (1 + i)^(-n))
 */
function calcularCuota() {
    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const prestamo = parseFloat(document.getElementById('prestamo').value);
    const meses = parseInt(document.getElementById('meses').value);
    const interes = parseFloat(document.getElementById('interes').value);
    
    // Validaciones
    if (!nombre) {
        mostrarResultado('Por favor, ingresa tu nombre.');
        return;
    }
    
    if (isNaN(prestamo) || prestamo <= 0) {
        mostrarResultado('Por favor, ingresa un monto de préstamo válido.');
        return;
    }
    
    if (isNaN(meses) || meses <= 0) {
        mostrarResultado('Por favor, ingresa un número de meses válido.');
        return;
    }
    
    if (isNaN(interes) || interes < 0) {
        mostrarResultado('Por favor, ingresa un interés válido.');
        return;
    }
    
    // Calcular cuota mensual usando la fórmula
    let cuota;
    if (interes === 0) {
        // Si el interés es 0, la cuota es simplemente el préstamo dividido por los meses
        cuota = prestamo / meses;
    } else {
        // Fórmula: Cuota = (Préstamo * i) / (1 - (1 + i)^(-n))
        const numerador = prestamo * interes;
        const denominador = 1 - Math.pow(1 + interes, -meses);
        cuota = numerador / denominador;
    }
    
    // Crear objeto de préstamo
    const objetoPrestamo = {
        nombre: nombre,
        prestamo: prestamo,
        meses: meses,
        interes: interes,
        cuota: cuota
    };
    
    // Agregar al arreglo
    prestamos.push(objetoPrestamo);
    
    // Formatear el resultado
    const interesPorc = (interes * 100).toFixed(2);
    const resultado = `${nombre} debe pagar $${formatearNumero(cuota)} cada mes por el préstamo de $${formatearNumero(prestamo)} a ${meses} meses con el interés del ${interesPorc}%`;
    
    mostrarResultado(resultado);
    
    // Limpiar formulario
    limpiarFormulario();
    
    // Mensaje de éxito
    console.log('✓ Préstamo agregado correctamente', objetoPrestamo);
}

/**
 * Muestra el resultado en el textarea
 */
function mostrarResultado(texto) {
    document.getElementById('resultado').value = texto;
}

/**
 * Muestra el reporte en el textarea de reportes
 */
function mostrarReporte(texto) {
    document.getElementById('reporte').value = texto;
}

/**
 * Formatea un número con separadores de miles
 */
function formatearNumero(numero) {
    return numero.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Limpia el formulario
 */
function limpiarFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('prestamo').value = '';
    document.getElementById('meses').value = '';
    document.getElementById('interes').value = '';
}

/**
 * Formatea un objeto de préstamo para mostrarlo
 */
function formatearPrestamo(p, index) {
    return `[${index + 1}] ${p.nombre}
  • Préstamo: $${formatearNumero(p.prestamo)}
  • Cuota Mensual: $${formatearNumero(p.cuota)}
  • Plazo: ${p.meses} meses
  • Interés: ${(p.interes * 100).toFixed(2)}%`;
}

// ==================== FUNCIONES DE REPORTES ====================

/**
 * Muestra todos los préstamos almacenados
 */
function mostrarTodos() {
    if (prestamos.length === 0) {
        mostrarReporte('No hay préstamos registrados.');
        return;
    }
    
    let reporte = `TODOS LOS PRÉSTAMOS (${prestamos.length} registrados)\n`;
    reporte += '='.repeat(60) + '\n\n';
    
    // Usar forEach para iterar sobre todos los préstamos
    prestamos.forEach((prestamo, index) => {
        reporte += formatearPrestamo(prestamo, index) + '\n\n';
    });
    
    mostrarReporte(reporte);
}

/**
 * a) Sumatoria de cada cuota
 */
function sumatoriaCuotas() {
    if (prestamos.length === 0) {
        mostrarReporte('No hay préstamos para calcular la sumatoria.');
        return;
    }
    
    // Usar map para obtener solo las cuotas y luego reduce para sumarlas
    const cuotas = prestamos.map(p => p.cuota);
    const suma = cuotas.reduce((acumulado, cuota) => acumulado + cuota, 0);
    
    let reporte = 'SUMATORIA DE TODAS LAS CUOTAS\n';
    reporte += '='.repeat(60) + '\n\n';
    reporte += `Total de préstamos: ${prestamos.length}\n`;
    reporte += `Suma total de cuotas: $${formatearNumero(suma)}\n\n`;
    reporte += 'Detalle de cuotas:\n';
    
    cuotas.forEach((cuota, index) => {
        reporte += `  ${index + 1}. $${formatearNumero(cuota)}\n`;
    });
    
    mostrarReporte(reporte);
}

/**
 * b) Extraer y desplegar objetos cuya cuota es mayor a $300,000
 */
function cuotasMayores300k() {
    // Usar filter para obtener préstamos con cuota > 300000
    const filtrados = prestamos.filter(p => p.cuota > 300000);
    
    if (filtrados.length === 0) {
        mostrarReporte('No hay préstamos con cuotas mayores a $300,000.');
        return;
    }
    
    let reporte = `PRÉSTAMOS CON CUOTA MAYOR A $300,000 (${filtrados.length} encontrados)\n`;
    reporte += '='.repeat(60) + '\n\n';
    
    filtrados.forEach((prestamo, index) => {
        reporte += formatearPrestamo(prestamo, index) + '\n\n';
    });
    
    mostrarReporte(reporte);
}

/**
 * c) Extraer y desplegar objetos que se pagan en menos de un año (< 12 meses)
 */
function prestamosMenosUnAnio() {
    // Usar filter para obtener préstamos con meses < 12
    const filtrados = prestamos.filter(p => p.meses < 12);
    
    if (filtrados.length === 0) {
        mostrarReporte('No hay préstamos con plazo menor a un año.');
        return;
    }
    
    let reporte = `PRÉSTAMOS A MENOS DE UN AÑO (${filtrados.length} encontrados)\n`;
    reporte += '='.repeat(60) + '\n\n';
    
    filtrados.forEach((prestamo, index) => {
        reporte += formatearPrestamo(prestamo, index) + '\n\n';
    });
    
    mostrarReporte(reporte);
}

/**
 * d) Encontrar el primer préstamo superior a $5,000,000
 */
function primerPrestamoMayor5M() {
    // Usar find para encontrar el primer préstamo > 5000000
    const encontrado = prestamos.find(p => p.prestamo > 5000000);
    
    if (!encontrado) {
        mostrarReporte('No se encontró ningún préstamo superior a $5,000,000.');
        return;
    }
    
    let reporte = 'PRIMER PRÉSTAMO SUPERIOR A $5,000,000\n';
    reporte += '='.repeat(60) + '\n\n';
    reporte += formatearPrestamo(encontrado, prestamos.indexOf(encontrado));
    
    mostrarReporte(reporte);
}

/**
 * e) Encontrar el primer préstamo con interés inferior al 2% (0.02)
 */
function primerInteresMenor2() {
    // Usar find para encontrar el primer préstamo con interés < 0.02
    const encontrado = prestamos.find(p => p.interes < 0.02);
    
    if (!encontrado) {
        mostrarReporte('No se encontró ningún préstamo con interés inferior al 2%.');
        return;
    }
    
    let reporte = 'PRIMER PRÉSTAMO CON INTERÉS INFERIOR AL 2%\n';
    reporte += '='.repeat(60) + '\n\n';
    reporte += formatearPrestamo(encontrado, prestamos.indexOf(encontrado));
    
    mostrarReporte(reporte);
}

/**
 * f) Incrementar el valor de cada cuota en $90,000
 */
function incrementarCuotas() {
    if (prestamos.length === 0) {
        mostrarReporte('No hay préstamos para incrementar.');
        return;
    }
    
    // Usar map para crear un nuevo arreglo con las cuotas incrementadas
    const prestamosIncrementados = prestamos.map(p => ({
        ...p,
        cuota: p.cuota + 90000
    }));
    
    let reporte = 'CUOTAS INCREMENTADAS EN $90,000\n';
    reporte += '='.repeat(60) + '\n\n';
    
    prestamosIncrementados.forEach((prestamo, index) => {
        reporte += `[${index + 1}] ${prestamo.nombre}\n`;
        reporte += `  • Cuota Original: $${formatearNumero(prestamos[index].cuota)}\n`;
        reporte += `  • Cuota Nueva: $${formatearNumero(prestamo.cuota)}\n`;
        reporte += `  • Incremento: $90,000.00\n\n`;
    });
    
    mostrarReporte(reporte);
}

/**
 * g) Decrementar los préstamos en $90,000
 */
function decrementarPrestamos() {
    if (prestamos.length === 0) {
        mostrarReporte('No hay préstamos para decrementar.');
        return;
    }
    
    // Usar map para crear un nuevo arreglo con los préstamos decrementados
    const prestamosDecrementados = prestamos.map(p => ({
        ...p,
        prestamo: Math.max(0, p.prestamo - 90000) // No permitir valores negativos
    }));
    
    let reporte = 'PRÉSTAMOS DECREMENTADOS EN $90,000\n';
    reporte += '='.repeat(60) + '\n\n';
    
    prestamosDecrementados.forEach((prestamo, index) => {
        reporte += `[${index + 1}] ${prestamo.nombre}\n`;
        reporte += `  • Préstamo Original: $${formatearNumero(prestamos[index].prestamo)}\n`;
        reporte += `  • Préstamo Nuevo: $${formatearNumero(prestamo.prestamo)}\n`;
        reporte += `  • Decremento: $90,000.00\n\n`;
    });
    
    mostrarReporte(reporte);
}

/**
 * h) Obtener un arreglo con solo las cuotas
 */
function obtenerSoloCuotas() {
    if (prestamos.length === 0) {
        mostrarReporte('No hay préstamos registrados.');
        return;
    }
    
    // Usar map para extraer solo las cuotas
    const soloCuotas = prestamos.map(p => p.cuota);
    
    // Usar join para crear una cadena formateada
    const cuotasFormateadas = soloCuotas.map((c, i) => 
        `  ${i + 1}. $${formatearNumero(c)}`
    ).join('\n');
    
    let reporte = `ARREGLO DE SOLO CUOTAS (${soloCuotas.length} elementos)\n`;
    reporte += '='.repeat(60) + '\n\n';
    reporte += 'Cuotas extraídas:\n';
    reporte += cuotasFormateadas + '\n\n';
    reporte += `Total acumulado: $${formatearNumero(soloCuotas.reduce((a, b) => a + b, 0))}`;
    
    mostrarReporte(reporte);
}

/**
 * Limpia todos los datos
 */
function limpiarDatos() {
    if (prestamos.length === 0) {
        mostrarReporte('No hay datos para limpiar.');
        return;
    }
    
    if (confirm(`¿Estás seguro de que deseas eliminar los ${prestamos.length} préstamos registrados?`)) {
        prestamos = [];
        mostrarReporte('Todos los datos han sido eliminados.');
        mostrarResultado('');
        console.log('✓ Datos limpiados correctamente');
    }
}

// ==================== FUNCIONES AUXILIARES ====================

/**
 * Muestra estadísticas generales en la consola
 */
function mostrarEstadisticas() {
    if (prestamos.length === 0) {
        console.log('No hay préstamos registrados.');
        return;
    }
    
    console.log('=== ESTADÍSTICAS GENERALES ===');
    console.log('Total de préstamos:', prestamos.length);
    console.log('Suma de préstamos:', prestamos.reduce((a, p) => a + p.prestamo, 0));
    console.log('Suma de cuotas:', prestamos.reduce((a, p) => a + p.cuota, 0));
    console.log('Promedio de cuotas:', prestamos.reduce((a, p) => a + p.cuota, 0) / prestamos.length);
    console.log('Promedio de meses:', prestamos.reduce((a, p) => a + p.meses, 0) / prestamos.length);
}

// ==================== INICIALIZACIÓN ====================

// Mensaje de bienvenida
console.log('%c¡Calculadora de Cuota Mensual!', 'color: #1a472a; font-size: 20px; font-weight: bold;');
console.log('%cDesarrollado para la práctica de Estructuras de Datos y Algoritmos I', 'color: #6b6b6b; font-size: 12px;');
console.log('%cUniversidad Autónoma de Occidente', 'color: #d4a574; font-size: 12px;');
console.log('\n💡 Tip: Puedes usar mostrarEstadisticas() en la consola para ver estadísticas generales.');

// Event listeners para Enter en los campos
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calcularCuota();
            }
        });
    });
});