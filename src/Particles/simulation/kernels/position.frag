precision highp float;

uniform sampler2D tMap;
uniform sampler2D _OpticalFlow;
uniform sampler2D _Velocity;
uniform sampler2D _Params;

uniform mat4 _TextureProjectionMatrix;

uniform float _Seed;
uniform float _Aspect;
uniform vec2 _Bounds;

varying vec2 vUv;

vec2 hash22(vec2 p)
{
	vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yzx+33.33);
    return fract((p3.xx+p3.yz)*p3.zy);

}

void main() {

    vec4 pos = texture2D(tMap, vUv);
    vec4 vel = texture2D(_Velocity, vUv);
    float lifeRate = texture2D(_Params, vUv).x;

    float life = pos.w;

    if(life <= 0.0) {

        life = 0.0;
        //generate random position
        vec2 hash = hash22(vec2(gl_FragCoord.xy * 10.0 + _Seed));
        pos.x = mix(-_Bounds.x, _Bounds.x, hash.x);
        pos.y = mix(-_Bounds.y, _Bounds.y, hash.y);

        //get clip position of random position
        vec4 clipPos = _TextureProjectionMatrix * vec4(pos.x, pos.y, 0.0, 1.0);
        clipPos /= clipPos.w;
        clipPos.xy = clipPos.xy * 0.5 + 0.5;

        //aspect correct
        clipPos -= 0.5;
        clipPos.y /= _Aspect;
        clipPos += 0.5;

        //Sample optical flow texture and get it's length
        vec3 opticalFlow = texture2D(_OpticalFlow, clipPos.xy).xyz;
        float opticalFlowMag = dot(opticalFlow, opticalFlow);
        // pos.w = 1.0;
        //if there is motion at the sampled location, assign the random position
        //as new position and restore lifespan
        if(opticalFlowMag > 0.0) {
            pos.xyz = vec3(pos.x, pos.y, 0.0);
            life = 1.0;
        }

    } else {
        
        pos.xyz += vel.xyz;
        // life -= mix(0.005, 0.02, lifeRate);
        life -= mix(0.005, 0.02, lifeRate);

    }

    gl_FragColor = vec4(pos.xyz, life);

}