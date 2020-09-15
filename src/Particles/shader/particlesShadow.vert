precision highp float;

attribute vec3 position;
attribute vec3 worldPosition;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

uniform sampler2D _Position;

varying vec2 vUv;
varying float vLife;

#define SCALE 0.0035


void main() {

    vec4 worldPos = texture2D(_Position, worldPosition.xy);

    float scalePhase = (worldPos.w * 8.0 * (1.0 - worldPos.w));

    vec4 modelViewPos = modelViewMatrix * vec4(worldPos.xyz, 1.0);
    modelViewPos.xy += position.xy * SCALE * scalePhase;

    gl_Position = projectionMatrix * modelViewPos;

    vUv = uv;
    vLife = worldPos.w;

}