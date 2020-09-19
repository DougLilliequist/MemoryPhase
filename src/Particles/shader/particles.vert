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
varying vec3 vWorldPos;
varying float vVelocity;

// #define SCALE 0.0085
// #define SCALE 0.0085
// #define SCALE 0.0075
// #define SCALE 0.035
#define SCALE 0.025

void main() {


    vec4 worldPos = texture2D(_Position, worldPosition.xy);
    float velocityScale = texture2D(_Velocity, worldPosition.xy).w;

    float scalePhase = (worldPos.w * 4.0 * (1.0 - worldPos.w));
    // float scalePhase = worldPos.w;

    vec4 modelViewPos = modelViewMatrix * vec4(worldPos.xyz, 1.0);
    modelViewPos.xy += position.xy * SCALE * scalePhase * mix(0.7, 1.1, min(1.0, velocityScale));

    gl_Position = projectionMatrix * modelViewPos;

    vec4 shadowModelViewPos = shadowViewMatrix * modelMatrix * vec4(worldPos.xyz, 1.0);
    //shadowModelViewPos.xy += position.xy * SCALE* scalePhase;
    vec4 shadowCoord = shadowProjectionMatrix * shadowModelViewPos;
    vShadowCoord = shadowCoord;

    vUv = uv;
    // vNormal = normal;
    vLife = worldPos.w;
    vWorldPos = worldPos.xyz;
    vVelocity = velocityScale;

}