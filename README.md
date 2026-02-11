# 🧮 Calculadora de Cuota Mensual

Proyecto desarrollado para la práctica de **Desarrollo FrontEnd Dinámico** - Estructuras de Datos y Algoritmos I

**Universidad Autónoma de Occidente**  
Profesor: JOHN ALEXANDER VARGAS
Estudiantes: Juan Felipe Murillo Y Nicolás García
---

## 📋 Descripción

Aplicación web que permite calcular la cuota mensual de préstamos utilizando la fórmula financiera estándar. Incluye gestión completa de múltiples préstamos y reportes avanzados usando funciones de arrays de JavaScript.

### Fórmula de Cálculo

```
Cuota = (Préstamo × i) / (1 - (1 + i)^(-n))
```

Donde:
- **Préstamo**: Monto solicitado
- **i**: Tasa de interés (decimal, ej: 0.15 = 15%)
- **n**: Número de meses

---

## 🚀 Características

### ✨ Funcionalidades Principales

1. **Cálculo de Cuota Mensual**
   - Ingreso de datos del solicitante
   - Validación de formularios
   - Cálculo automático con fórmula financiera
   - Formato de salida personalizado

2. **Almacenamiento de Datos**
   - Arreglo de objetos JavaScript
   - Propiedades: nombre, préstamo, meses, interés, cuota

3. **Reportes Avanzados**
   - Ver todos los préstamos
   - Sumatoria de cuotas (usando `map` y `reduce`)
   - Filtrar cuotas > $300,000 (usando `filter`)
   - Filtrar préstamos < 12 meses (usando `filter`)
   - Buscar préstamo > $5,000,000 (usando `find`)
   - Buscar interés < 2% (usando `find`)
   - Incrementar cuotas +$90,000 (usando `map`)
   - Decrementar préstamos -$90,000 (usando `map`)
   - Extraer solo cuotas (usando `map` y `join`)

---

## 🛠️ Instalación y Uso

### Prerrequisitos

- Visual Studio Code
- Extensión Live Server para VS Code
- Navegador web actualizado (Chrome, Firefox, Edge, Safari)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/calculadora-cuota-mensual.git
   cd calculadora-cuota-mensual
   ```

2. **Abrir en Visual Studio Code**
   ```bash
   code .
   ```

3. **Instalar Live Server** (si no lo tienes)
   - Abre VS Code
   - Ve a Extensiones (Ctrl+Shift+X)
   - Busca "Live Server"
   - Instala la extensión de Ritwick Dey

4. **Ejecutar la aplicación**
   - Haz clic derecho en `index.html`
   - Selecciona "Open with Live Server"
   - La aplicación se abrirá automáticamente en tu navegador

---

## 📁 Estructura del Proyecto

```
calculadora-cuota-mensual/
│
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos y diseño visual
├── script.js           # Lógica de la aplicación
├── README.md           # Este archivo
└── .gitignore          # Archivos ignorados por Git
```

---

## 💡 Guía de Uso

### 1. Calcular una Cuota

1. Ingresa el **nombre del solicitante**
2. Ingresa el **monto del préstamo** (ej: 5000000)
3. Ingresa el **número de meses** (ej: 24)
4. Ingresa el **interés en formato decimal** (ej: 0.15 para 15%)
5. Haz clic en **"Calcular Cuota"**
6. El resultado aparecerá en el área de resultados

### 2. Ver Reportes

- **Ver Todos los Préstamos**: Muestra todos los préstamos registrados
- **Sumatoria de Cuotas**: Suma total de todas las cuotas mensuales
- **Cuotas > $300,000**: Filtra préstamos con cuotas superiores a $300,000
- **Préstamos < 1 Año**: Filtra préstamos con plazo menor a 12 meses
- **Préstamo > $5,000,000**: Encuentra el primer préstamo superior a 5 millones
- **Interés < 2%**: Encuentra el primer préstamo con interés inferior al 2%
- **Incrementar Cuotas**: Simula incremento de $90,000 en cada cuota
- **Decrementar Préstamos**: Simula reducción de $90,000 en cada préstamo
- **Ver Solo Cuotas**: Extrae y muestra únicamente las cuotas
- **Limpiar Todo**: Elimina todos los datos (requiere confirmación)

### 3. Ejemplos de Datos de Prueba

**Préstamo 1:**
- Nombre: Juan Pérez
- Préstamo: $5,000,000
- Meses: 24
- Interés: 0.15 (15%)

**Préstamo 2:**
- Nombre: María García
- Préstamo: $10,000,000
- Meses: 36
- Interés: 0.12 (12%)

**Préstamo 3:**
- Nombre: Carlos López
- Préstamo: $2,000,000
- Meses: 6
- Interés: 0.01 (1%)

---

## 🎨 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Diseño responsive con animaciones
- **JavaScript ES6+**: Lógica de negocio
  - Arrow functions
  - Template literals
  - Destructuring
  - Array methods (map, filter, reduce, find, forEach, join)
  - Spread operator

---

## 📚 Funciones de Array Implementadas

| Función | Uso en el Proyecto |
|---------|-------------------|
| `forEach` | Iterar sobre todos los préstamos |
| `map` | Transformar datos (incrementar/decrementar, extraer cuotas) |
| `filter` | Filtrar por condiciones (cuotas, meses) |
| `reduce` | Sumar todas las cuotas |
| `find` | Encontrar el primer elemento que cumple condición |
| `join` | Unir arreglo de cuotas en string |

---

## ✅ Verificación de Resultados

Puedes verificar los cálculos usando:
- [PymesFuturo - Calculadora de Préstamos](https://www.pymesfuturo.com/calculadora_1.html)
- Calculadora financiera online

---

## 🎯 Objetivos de Aprendizaje

- [x] Manipulación del DOM
- [x] Validación de formularios
- [x] Uso de funciones de array (map, filter, reduce, find, forEach, join)
- [x] Almacenamiento en memoria con arrays y objetos
- [x] Formateo de números y monedas
- [x] Diseño responsive
- [x] Buenas prácticas de código

---

## 🐛 Debugging

### Consola del Navegador

El proyecto incluye mensajes útiles en la consola:
- ✓ Confirmación de acciones
- 💡 Tips y sugerencias
- Errores de validación

**Función especial:**
```javascript
mostrarEstadisticas()
```
Ejecuta esta función en la consola para ver estadísticas generales.

---


## 👨‍💻 Autor

Desarrollado como parte de la práctica de **Estructuras de Datos y Algoritmos I**

**Universidad Autónoma de Occidente**  

---

## 📄 Licencia

Este proyecto fue creado con fines educativos para la Universidad Autónoma de Occidente.

---

## 🆘 Soporte

Si encuentras algún problema o tienes sugerencias:
1. Revisa la consola del navegador (F12)
2. Verifica que Live Server esté activo
3. Asegúrate de tener un navegador actualizado

---

**¡Feliz cálculo de préstamos! 🎉**
