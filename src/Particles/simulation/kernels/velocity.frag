precision highp float;

uniform sampler2D tMap;
uniform sampler2D _OpticalFlowVelocity;
uniform float _Force;

varying vec2 vUv;

#define INERTIA 0.7;

void main() {

    vec4 vel = texture2D(tMap, vUv);
    vec3 opticalFlowVel = texture2D(_OpticalFlowVelocity, vUv).xyz;

    vec3 acc = vec3(0.0, 0.0, 0.0);

    // acc += opticalFlowVel * _Force * length(opticalFlowVel);
    // acc += (opticalFlowVel * _Force) * mix(3.0, 1.0, length(opticalFlowVel) / 10.0);
    acc += (opticalFlowVel * _Force) * 1.0;

    vel.xyz += acc;
    vel.xyz *= INERTIA;

    gl_FragColor = vel;

}