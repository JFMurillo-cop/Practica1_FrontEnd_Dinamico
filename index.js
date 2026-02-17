// ============================================================================
// SERVIDOR BACKEND - CALCULADORA DE CUOTA MENSUAL
// ============================================================================
// Universidad Autónoma de Occidente
// Desarrollo FrontEnd Dinámico - Estructuras de Datos y Algoritmos I
// ============================================================================

const express = require('express');
const cors = require('cors');
const path = require('path');

// Inicializar la aplicación Express
const app = express();
const PORT = 3000;

// ============================================================================
// MIDDLEWARE
// ============================================================================

// Habilitar CORS para permitir peticiones desde el frontend
app.use(cors());

// Middleware para parsear JSON en el body de las peticiones
app.use(express.json());

// Servir archivos estáticos (HTML, CSS, JS del frontend)
app.use(express.static(path.join(__dirname)));

// ============================================================================
// ALMACENAMIENTO EN MEMORIA
// ============================================================================

// Array para almacenar los préstamos
let prestamos = [];

// Contador para IDs autoincrementales
let contadorId = 1;

// ============================================================================
// FUNCIONES AUXILIARES
// ============================================================================

/**
 * Calcula la cuota mensual de un préstamo usando la fórmula financiera
 * 
 * Fórmula: cuota = prestamo * ((1 + i)^n * i) / ((1 + i)^n - 1)
 * 
 * Donde:
 * - prestamo: Monto del préstamo
 * - i: Tasa de interés en decimal (ej: 0.15 para 15%)
 * - n: Número de meses
 * 
 * Caso especial: Si i = 0, entonces cuota = prestamo / n
 * 
 * @param {number} prestamo - Monto del préstamo
 * @param {number} meses - Número de meses (n)
 * @param {number} interes - Tasa de interés en decimal (i)
 * @returns {number} - Cuota mensual calculada
 */
function calcularCuotaMensual(prestamo, meses, interes) {
    if (interes === 0) {
        // Caso especial: interés 0%
        return prestamo / meses;
    }
    
    // Fórmula: cuota = prestamo * ((1 + i)^n * i) / ((1 + i)^n - 1)
    const factorPotencia = Math.pow(1 + interes, meses);
    const numerador = prestamo * factorPotencia * interes;
    const denominador = factorPotencia - 1;
    
    return numerador / denominador;
}

/**
 * Formatea el resultado del préstamo según el formato especificado
 * Formato: nombre – $ cuota  -- $ préstamo -- n meses -- interés i%
 * 
 * @param {object} prestamo - Objeto del préstamo
 * @returns {string} - Texto formateado
 */
function formatearResultado(prestamo) {
    const cuotaFormateada = prestamo.cuota.toFixed(2);
    const prestamoFormateado = prestamo.prestamo.toFixed(2);
    const interesPorc = (prestamo.interes * 100).toFixed(2);
    
    return `${prestamo.nombre} – $${cuotaFormateada} -- $${prestamoFormateado} -- ${prestamo.meses} meses -- interés ${interesPorc}%`;
}

/**
 * Valida los datos de entrada para el cálculo de la cuota
 * 
 * @param {string} nombre - Nombre del solicitante
 * @param {number} prestamo - Monto del préstamo
 * @param {number} meses - Número de meses
 * @param {number} interes - Tasa de interés
 * @returns {object} - { valido: boolean, error: string }
 */
function validarDatos(nombre, prestamo, meses, interes) {
    // Validar nombre
    if (!nombre || nombre.trim() === '') {
        return { valido: false, error: 'El nombre no puede estar vacío' };
    }
    
    // Validar préstamo
    if (typeof prestamo !== 'number' || isNaN(prestamo) || prestamo <= 0) {
        return { valido: false, error: 'El préstamo debe ser un número positivo' };
    }
    
    // Validar meses
    if (typeof meses !== 'number' || isNaN(meses) || meses <= 0 || !Number.isInteger(meses)) {
        return { valido: false, error: 'Los meses deben ser un número entero positivo' };
    }
    
    // Validar interés
    if (typeof interes !== 'number' || isNaN(interes) || interes < 0) {
        return { valido: false, error: 'El interés debe ser un número no negativo' };
    }
    
    return { valido: true };
}

// ============================================================================
// ENDPOINTS DEL API
// ============================================================================

/**
 * POST /api/calcular-cuota
 * Calcula la cuota mensual de un préstamo y lo almacena
 * 
 * Body esperado:
 * {
 *   "nombre": "Juan Pérez",
 *   "prestamo": 5000000,
 *   "meses": 12,
 *   "interes": 0.15
 * }
 * 
 * Respuesta exitosa:
 * {
 *   "success": true,
 *   "resultado": "Juan Pérez – $484029.91 -- $5000000.00 -- 12 meses -- interés 15.00%",
 *   "datos": { objeto completo del préstamo }
 * }
 */
app.post('/api/calcular-cuota', (req, res) => {
    try {
        // Extraer datos del body
        const { nombre, prestamo, meses, interes } = req.body;
        
        // Validar datos
        const validacion = validarDatos(nombre, prestamo, meses, interes);
        if (!validacion.valido) {
            return res.status(400).json({
                success: false,
                error: validacion.error
            });
        }
        
        // Calcular la cuota mensual
        const cuota = calcularCuotaMensual(prestamo, meses, interes);
        
        // Crear objeto del préstamo
        const nuevoPrestamo = {
            id: contadorId++,
            nombre: nombre.trim(),
            prestamo: prestamo,
            meses: meses,
            interes: interes,
            cuota: cuota,
            fecha: new Date().toISOString()
        };
        
        // Almacenar en el array
        prestamos.push(nuevoPrestamo);
        
        // Formatear resultado
        const resultado = formatearResultado(nuevoPrestamo);
        
        // Log del servidor
        console.log('✓ Préstamo calculado y almacenado:', {
            id: nuevoPrestamo.id,
            nombre: nuevoPrestamo.nombre,
            cuota: cuota.toFixed(2)
        });
        
        // Responder con éxito
        res.status(201).json({
            success: true,
            resultado: resultado,
            datos: nuevoPrestamo
        });
        
    } catch (error) {
        console.error('✗ Error al calcular cuota:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor al calcular la cuota'
        });
    }
});

/**
 * GET /api/prestamos
 * Obtiene todos los préstamos almacenados
 * 
 * Respuesta exitosa:
 * {
 *   "success": true,
 *   "prestamos": [ array de préstamos ],
 *   "total": número total de préstamos,
 *   "resultado": texto formateado con todos los préstamos
 * }
 */
app.get('/api/prestamos', (req, res) => {
    try {
        if (prestamos.length === 0) {
            return res.json({
                success: true,
                prestamos: [],
                total: 0,
                resultado: 'No hay préstamos registrados.'
            });
        }
        
        // Formatear todos los préstamos
        const resultadosFormateados = prestamos.map(p => formatearResultado(p));
        const resultado = resultadosFormateados.join('\n');
        
        console.log(`✓ Consultados ${prestamos.length} préstamos`);
        
        res.json({
            success: true,
            prestamos: prestamos,
            total: prestamos.length,
            resultado: resultado
        });
        
    } catch (error) {
        console.error('✗ Error al obtener préstamos:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor al obtener préstamos'
        });
    }
});

/**
 * GET /api/prestamos/buscar/:nombre
 * Busca préstamos por nombre (búsqueda parcial, case-insensitive)
 * 
 * Parámetro: nombre (en la URL)
 * 
 * Respuesta exitosa:
 * {
 *   "success": true,
 *   "prestamos": [ array de préstamos encontrados ],
 *   "total": número de préstamos encontrados,
 *   "resultado": texto formateado con los préstamos encontrados
 * }
 */
app.get('/api/prestamos/buscar/:nombre', (req, res) => {
    try {
        const nombreBusqueda = req.params.nombre.toLowerCase().trim();
        
        if (!nombreBusqueda) {
            return res.status(400).json({
                success: false,
                error: 'Debe proporcionar un nombre para buscar'
            });
        }
        
        // Filtrar préstamos que contengan el nombre buscado (case-insensitive)
        const prestamosEncontrados = prestamos.filter(p => 
            p.nombre.toLowerCase().includes(nombreBusqueda)
        );
        
        if (prestamosEncontrados.length === 0) {
            return res.json({
                success: true,
                prestamos: [],
                total: 0,
                resultado: `No se encontraron préstamos para "${req.params.nombre}"`
            });
        }
        
        // Formatear resultados
        const resultadosFormateados = prestamosEncontrados.map(p => formatearResultado(p));
        const resultado = resultadosFormateados.join('\n');
        
        console.log(`✓ Encontrados ${prestamosEncontrados.length} préstamos para "${req.params.nombre}"`);
        
        res.json({
            success: true,
            prestamos: prestamosEncontrados,
            total: prestamosEncontrados.length,
            resultado: resultado
        });
        
    } catch (error) {
        console.error('✗ Error al buscar préstamos:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor al buscar préstamos'
        });
    }
});

/**
 * DELETE /api/prestamos
 * Elimina todos los préstamos del array (limpia el almacenamiento)
 * 
 * Respuesta exitosa:
 * {
 *   "success": true,
 *   "mensaje": "Todos los préstamos han sido eliminados",
 *   "eliminados": número de préstamos eliminados
 * }
 */
app.delete('/api/prestamos', (req, res) => {
    try {
        const cantidad = prestamos.length;
        
        // Limpiar el array
        prestamos = [];
        
        // Reiniciar el contador de IDs
        contadorId = 1;
        
        console.log(`✓ Eliminados ${cantidad} préstamos`);
        
        res.json({
            success: true,
            mensaje: 'Todos los préstamos han sido eliminados',
            eliminados: cantidad
        });
        
    } catch (error) {
        console.error('✗ Error al eliminar préstamos:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor al eliminar préstamos'
        });
    }
});

// ============================================================================
// RUTA PRINCIPAL - Servir el frontend
// ============================================================================

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ============================================================================
// MANEJO DE RUTAS NO ENCONTRADAS
// ============================================================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Ruta no encontrada'
    });
});

// ============================================================================
// INICIAR EL SERVIDOR
// ============================================================================

app.listen(PORT, () => {
    console.log('='.repeat(60));
    console.log('🚀 SERVIDOR BACKEND - CALCULADORA DE CUOTA MENSUAL');
    console.log('='.repeat(60));
    console.log(`✓ Servidor iniciado correctamente`);
    console.log(`✓ Puerto: ${PORT}`);
    console.log(`✓ URL: http://localhost:${PORT}`);
    console.log(`✓ API disponible en: http://localhost:${PORT}/api`);
    console.log('='.repeat(60));
    console.log('📋 Endpoints disponibles:');
    console.log('  POST   /api/calcular-cuota');
    console.log('  GET    /api/prestamos');
    console.log('  GET    /api/prestamos/buscar/:nombre');
    console.log('  DELETE /api/prestamos');
    console.log('='.repeat(60));
    console.log('💡 Para detener el servidor: Ctrl+C');
    console.log('='.repeat(60));
});
