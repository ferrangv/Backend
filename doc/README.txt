// Insertar una nueva medición:

Método: POST
URL: http://localhost:3000/mediciones
Body (JSON):
{
  "medicion": "temperatura",
  "valor": 25.5
}


// Obtener la última medición:

Método: GET
URL: http://localhost:3000/ultima-medicion