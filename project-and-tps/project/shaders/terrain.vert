attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

varying vec2 vTextureCoord;
uniform sampler2D terrainMap;
uniform sampler2D terrainTex;

varying float altimetryZ;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

void main() {
    vTextureCoord = aTextureCoord;

    vec4 filter = texture2D(terrainMap, vTextureCoord);
    
    
    
    vec4 color = texture2D(terrainTex, vTextureCoord);
    
    

    vec3 offset = vec3(0.0, 0.0, 0.0);
    

    offset = aVertexNormal * filter.b * 8.0;
    
    altimetryZ = aVertexNormal.z * filter.b * (-1.0);

    

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}
