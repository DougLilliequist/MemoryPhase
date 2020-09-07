precision highp float;

uniform sampler2D tMap;
uniform sampler2D _OpticalFlowVelocity;
uniform float _Force;
uniform float _Inertia;

varying vec2 vUv;

void main() {

    vec4 vel = texture2D(tMap, vUv);
    vec3 opticalFlowVel = texture2D(_OpticalFlowVelocity, vUv).xyz;
    vec3 acc = vec3(0.0, 0.0, 0.0);

    acc += (opticalFlowVel * _Force);

    vel.xyz += acc;
    vel.xyz *= _Inertia;

    gl_FragColor = vel;

}