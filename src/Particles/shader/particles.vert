precision highp float;

attribute vec3 position;
attribute vec3 worldPosition;
// attribute vec3 normal;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 modelMatrix;
// uniform mat3 normalMatrix;

uniform mat4 shadowProjectionMatrix;
uniform mat4 shadowViewMatrix;

uniform sampler2D _Position;
uniform sampler2D _Velocity;

varying vec2 vUv;
varying vec4 vShadowCoord;
varying vec3 vNormal;
varying float vLife;

#define SCALE 0.003

void main() {


    vec4 worldPos = texture2D(_Position, worldPosition.xy);

    float scalePhase = (worldPos.w * 8.0 * (1.0 - worldPos.w));

    vec4 modelViewPos = modelViewMatrix * vec4(worldPos.xyz, 1.0);
    modelViewPos.xy += position.xy * SCALE * scalePhase;

    vec4 shadowModelViewPos = shadowViewMatrix * modelMatrix * vec4(worldPos.xyz, 1.0);
    shadowModelViewPos.xy += position.xy * SCALE* scalePhase;
    vec4 shadowCoord = shadowProjectionMatrix * shadowModelViewPos;
    vShadowCoord = shadowCoord;

    gl_Position = projectionMatrix * modelViewPos;

    vUv = uv;
    // vNormal = normal;
    vLife = worldPos.w;

}