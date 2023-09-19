attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSamplerWaterMap;
uniform float timeFactor;

void main() {
    vTextureCoord = aTextureCoord;

    vec3 offset = aVertexNormal * texture2D(uSamplerWaterMap, sin(timeFactor)*vec2(0.0,0.1) + vTextureCoord).b * 0.05;

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}