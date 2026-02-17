# 🖥️ Backend - Calculadora de Cuota Mensual

Backend Node.js con Express para el procesamiento de cálculos de cuotas mensuales de préstamos.

**Universidad Autónoma de Occidente**  
Desarrollo FrontEnd Dinámico - Estructuras de Datos y Algoritmos I

---

## 📋 Descripción

Este backend proporciona una API REST para calcular cuotas mensuales de préstamos utilizando la fórmula financiera estándar. Almacena los préstamos en memoria y proporciona endpoints para consultar, buscar y eliminar registros.

### Fórmula de Cálculo

```
cuota = prestamo * ((1 + i)^n * i) / ((1 + i)^n - 1)
```

Donde:
- **prestamo**: Monto del préstamo solicitado
- **i**: Tasa de interés en formato decimal (ej: 0.15 para 15%)
- **n**: Número de meses para pagar el préstamo

**Caso especial**: Cuando el interés es 0%, la fórmula se simplifica a: `cuota = prestamo / n`

---

## 🔧 Requisitos Previos

Antes de ejecutar el backend, asegúrate de tener instalado:

- **Node.js** (versión 14 o superior)
  - Descarga desde: https://nodejs.org/
  - Verifica la instalación: `node --version`

- **npm** (viene incluido con Node.js)
  - Verifica la instalación: `npm --version`

---

## 📦 Instalación

### 1. Clonar el repositorio (si aún no lo has hecho)

```bash
git clone https://github.com/JFMurillo-cop/Practica1_FrontEnd_Dinamico.git
cd Practica1_FrontEnd_Dinamico
```

### 2. Instalar las dependencias

```bash
npm install
```

Este comando instalará:
- **express** (^4.18.2): Framework web para Node.js
- **cors** (^2.8.5): Middleware para habilitar CORS
- **nodemon** (^3.0.1): Herramienta de desarrollo para reinicio automático

---

## 🚀 Ejecución del Servidor

### Modo Producción

Para ejecutar el servidor en modo producción:

```bash
node index.js
```

o también:

```bash
npm start
```

### Modo Desarrollo (con auto-recarga)

Para ejecutar el servidor con nodemon (reinicio automático al detectar cambios):

```bash
npm run dev
```

### Salida Esperada

Cuando el servidor se inicia correctamente, verás:

```
============================================================
🚀 SERVIDOR BACKEND - CALCULADORA DE CUOTA MENSUAL
============================================================
✓ Servidor iniciado correctamente
✓ Puerto: 3000
✓ URL: http://localhost:3000
✓ API disponible en: http://localhost:3000/api
============================================================
📋 Endpoints disponibles:
  POST   /api/calcular-cuota
  GET    /api/prestamos
  GET    /api/prestamos/buscar/:nombre
  DELETE /api/prestamos
============================================================
💡 Para detener el servidor: Ctrl+C
============================================================
```

### Detener el Servidor

Para detener el servidor, presiona:

```
Ctrl+C
```

---

## 📡 Documentación de la API

### Base URL

```
http://localhost:3000
```

---

### 1. Calcular Cuota Mensual

Calcula la cuota mensual de un préstamo y lo almacena en memoria.

**Endpoint:** `POST /api/calcular-cuota`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "nombre": "Juan Pérez",
  "prestamo": 5000000,
  "meses": 12,
  "interes": 0.15
}
```

**Parámetros:**
- `nombre` (string, requerido): Nombre del solicitante del préstamo
- `prestamo` (number, requerido): Monto del préstamo (debe ser > 0)
- `meses` (number, requerido): Número de meses (debe ser entero > 0)
- `interes` (number, requerido): Tasa de interés en decimal (debe ser ≥ 0)

**Respuesta Exitosa (201 Created):**
```json
{
  "success": true,
  "resultado": "Juan Pérez – $484029.91 -- $5000000.00 -- 12 meses -- interés 15.00%",
  "datos": {
    "id": 1,
    "nombre": "Juan Pérez",
    "prestamo": 5000000,
    "meses": 12,
    "interes": 0.15,
    "cuota": 484029.91,
    "fecha": "2024-01-15T10:30:00.000Z"
  }
}
```

**Respuesta de Error (400 Bad Request):**
```json
{
  "success": false,
  "error": "El nombre no puede estar vacío"
}
```

---

### 2. Obtener Todos los Préstamos

Obtiene la lista completa de préstamos almacenados.

**Endpoint:** `GET /api/prestamos`

**Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "prestamos": [
    {
      "id": 1,
      "nombre": "Juan Pérez",
      "prestamo": 5000000,
      "meses": 12,
      "interes": 0.15,
      "cuota": 484029.91,
      "fecha": "2024-01-15T10:30:00.000Z"
    },
    {
      "id": 2,
      "nombre": "María García",
      "prestamo": 10000000,
      "meses": 24,
      "interes": 0.12,
      "cuota": 529246.62,
      "fecha": "2024-01-15T10:35:00.000Z"
    }
  ],
  "total": 2,
  "resultado": "Juan Pérez – $484029.91 -- $5000000.00 -- 12 meses -- interés 15.00%\nMaría García – $529246.62 -- $10000000.00 -- 24 meses -- interés 12.00%"
}
```

**Respuesta Sin Datos (200 OK):**
```json
{
  "success": true,
  "prestamos": [],
  "total": 0,
  "resultado": "No hay préstamos registrados."
}
```

---

### 3. Buscar Préstamos por Nombre

Busca préstamos que contengan el nombre especificado (búsqueda parcial, no distingue mayúsculas/minúsculas).

**Endpoint:** `GET /api/prestamos/buscar/:nombre`

**Parámetros de URL:**
- `nombre` (string): Nombre o parte del nombre a buscar

**Ejemplo:** `GET /api/prestamos/buscar/juan`

**Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "prestamos": [
    {
      "id": 1,
      "nombre": "Juan Pérez",
      "prestamo": 5000000,
      "meses": 12,
      "interes": 0.15,
      "cuota": 484029.91,
      "fecha": "2024-01-15T10:30:00.000Z"
    }
  ],
  "total": 1,
  "resultado": "Juan Pérez – $484029.91 -- $5000000.00 -- 12 meses -- interés 15.00%"
}
```

**Respuesta Sin Resultados (200 OK):**
```json
{
  "success": true,
  "prestamos": [],
  "total": 0,
  "resultado": "No se encontraron préstamos para \"pedro\""
}
```

---

### 4. Eliminar Todos los Préstamos

Elimina todos los préstamos almacenados en memoria.

**Endpoint:** `DELETE /api/prestamos`

**Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "mensaje": "Todos los préstamos han sido eliminados",
  "eliminados": 2
}
```

---

## 📝 Formato de Salida

El formato de salida para cada préstamo es:

```
nombre – $ cuota  -- $ préstamo -- n meses -- interés i%
```

**Ejemplo:**
```
Juan Pérez – $484029.91 -- $5000000.00 -- 12 meses -- interés 15.00%
```

---

## 🧪 Ejemplos de Uso

### Usando cURL

#### 1. Calcular una cuota:

```bash
curl -X POST http://localhost:3000/api/calcular-cuota \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "prestamo": 5000000,
    "meses": 12,
    "interes": 0.15
  }'
```

#### 2. Obtener todos los préstamos:

```bash
curl http://localhost:3000/api/prestamos
```

#### 3. Buscar préstamos por nombre:

```bash
curl http://localhost:3000/api/prestamos/buscar/juan
```

#### 4. Eliminar todos los préstamos:

```bash
curl -X DELETE http://localhost:3000/api/prestamos
```

---

### Usando Postman

#### 1. Calcular Cuota:
- **Método:** POST
- **URL:** `http://localhost:3000/api/calcular-cuota`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "nombre": "Juan Pérez",
    "prestamo": 5000000,
    "meses": 12,
    "interes": 0.15
  }
  ```

#### 2. Obtener Todos:
- **Método:** GET
- **URL:** `http://localhost:3000/api/prestamos`

#### 3. Buscar por Nombre:
- **Método:** GET
- **URL:** `http://localhost:3000/api/prestamos/buscar/juan`

#### 4. Eliminar Todos:
- **Método:** DELETE
- **URL:** `http://localhost:3000/api/prestamos`

---

## ✅ Validaciones Implementadas

El backend valida:

1. **Nombre:** No puede estar vacío
2. **Préstamo:** Debe ser un número positivo (> 0)
3. **Meses:** Debe ser un número entero positivo (> 0)
4. **Interés:** Debe ser un número no negativo (≥ 0)

### Mensajes de Error:

- `"El nombre no puede estar vacío"`
- `"El préstamo debe ser un número positivo"`
- `"Los meses deben ser un número entero positivo"`
- `"El interés debe ser un número no negativo"`

---

## 🗂️ Estructura de Datos

Cada préstamo almacenado tiene la siguiente estructura:

```javascript
{
  id: 1,                           // Número incremental
  nombre: "Juan Pérez",            // String
  prestamo: 5000000,               // Number
  meses: 12,                       // Number (entero)
  interes: 0.15,                   // Number (decimal)
  cuota: 484029.91,                // Number (calculado)
  fecha: "2024-01-15T10:30:00.000Z" // ISO String
}
```

---

## 🔍 Verificación de Resultados

Puedes verificar que los cálculos sean correctos usando:

- **PymesFuturo Calculadora:** https://www.pymesfuturo.com/calculadora_1.html
- Cualquier calculadora financiera online

**Ejemplo de verificación:**
- Préstamo: $5,000,000
- Meses: 12
- Interés: 15% (0.15)
- **Cuota esperada:** ~$484,029.91

---

## 🛠️ Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución de JavaScript
- **Express**: Framework web minimalista y flexible
- **CORS**: Middleware para habilitar Cross-Origin Resource Sharing
- **Nodemon**: Herramienta de desarrollo para reinicio automático

---

## 📁 Estructura del Proyecto

```
Practica1_FrontEnd_Dinamico/
│
├── index.js              # Servidor backend (Node.js/Express)
├── package.json          # Configuración del proyecto y dependencias
├── package-lock.json     # Versiones exactas de dependencias
├── README-BACKEND.md     # Documentación del backend (este archivo)
├── README.md             # Documentación del frontend
│
├── index.html            # Interfaz de usuario (frontend)
├── script.js             # Lógica del frontend
├── styles.css            # Estilos del frontend
│
├── node_modules/         # Dependencias (generado por npm install)
└── .gitignore           # Archivos ignorados por Git
```

---

## 🚨 Solución de Problemas

### El servidor no inicia

1. Verifica que Node.js esté instalado: `node --version`
2. Verifica que las dependencias estén instaladas: `npm install`
3. Verifica que el puerto 3000 no esté en uso:
   - Windows: `netstat -ano | findstr :3000`
   - Linux/Mac: `lsof -i :3000`

### Error: Cannot find module 'express'

Ejecuta: `npm install`

### Puerto 3000 en uso

Si el puerto 3000 ya está en uso, puedes:
1. Detener el proceso que usa ese puerto
2. Modificar el puerto en `index.js` (cambiar `const PORT = 3000`)

### Error de CORS

El middleware CORS ya está configurado. Si persisten problemas:
1. Verifica que `app.use(cors())` esté antes de las rutas
2. Reinicia el servidor

---

## 💻 Comandos Útiles

```bash
# Instalar dependencias
npm install

# Iniciar servidor (producción)
npm start
# o
node index.js

# Iniciar servidor (desarrollo con auto-recarga)
npm run dev

# Ver versión de Node.js
node --version

# Ver versión de npm
npm --version

# Limpiar caché de npm (si hay problemas)
npm cache clean --force
```

---

## 📝 Notas Importantes

1. **Almacenamiento:** Los datos se almacenan en memoria. Al reiniciar el servidor, todos los préstamos se pierden.

2. **CORS:** El servidor tiene CORS habilitado para permitir peticiones desde cualquier origen.

3. **Archivos Estáticos:** El servidor sirve automáticamente los archivos del frontend (index.html, script.js, styles.css).

4. **Logs:** El servidor muestra logs informativos en la consola para cada operación.

5. **Validación:** Todas las entradas son validadas antes de procesarse.

6. **Manejo de Errores:** Todos los endpoints tienen manejo de errores con try-catch.

---

## 🎯 Endpoints Resumidos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/calcular-cuota` | Calcular y guardar préstamo |
| GET | `/api/prestamos` | Obtener todos los préstamos |
| GET | `/api/prestamos/buscar/:nombre` | Buscar por nombre |
| DELETE | `/api/prestamos` | Eliminar todos |

---

## 👨‍💻 Autores

Juan Felipe Murillo Y Nicolás García

**Universidad Autónoma de Occidente**  
Desarrollo FrontEnd Dinámico - Estructuras de Datos y Algoritmos I

---

## 📄 Licencia

Este proyecto fue creado con fines educativos para la Universidad Autónoma de Occidente.

---

**¡Backend listo para calcular préstamos! 🚀**
