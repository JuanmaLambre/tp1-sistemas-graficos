// Los atributos son caracteristicas propias de cada vertice.
attribute vec3 aVertexPosition;
attribute vec3 aVertexColor;
attribute vec3 aVertexNormal;

// Los uniforms son caracteristicas propias de una etapa de dibujado completa.
// Son comunes a todos los vertices involucrados en el dibujado.
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

// Los varying son propiedades que toman valor para cada fragmento a partir
// de interpolar linealmente entre los valores que se les asigna en cada 
// vertice del poligono al cual pertenecen.
varying highp vec4 vColor;    
varying highp vec4 vNormal;    

void main(void) {
    // gl_Position es una variable "built-in" de GLSL que es usada para 
    // almacenar la posicion resultante del fragmento.
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vColor = vec4(aVertexColor,1.0);
    vNormal = vec4(aVertexNormal,1.0);
}
