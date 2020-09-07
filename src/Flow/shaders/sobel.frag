precision highp float;

uniform sampler2D _InputImage;
uniform vec2 _TexelSize;
uniform float _Direction;

varying vec2 vUV;

void main() {

    float sobel = 0.0;

    if(_Direction <= 0.0) {

        sobel += texture2D(_InputImage, vUV + vec2(-_TexelSize.x, -_TexelSize.y)).x * -1.0;
        sobel += texture2D(_InputImage, vUV + vec2(-_TexelSize.x, 0.0)).x * -2.0;
        sobel += texture2D(_InputImage, vUV + vec2(-_TexelSize.x, _TexelSize.y)).x * -1.0;

        sobel += texture2D(_InputImage, vUV + vec2(_TexelSize.x, -_TexelSize.y)).x * 1.0;
        sobel += texture2D(_InputImage, vUV + vec2(_TexelSize.x, 0.0)).x * 2.0;
        sobel += texture2D(_InputImage, vUV + vec2(_TexelSize.x, _TexelSize.y)).x * 1.0;

    } else {

        sobel += texture2D(_InputImage, vUV + vec2(-_TexelSize.x, -_TexelSize.y)).x * -1.0;
        sobel += texture2D(_InputImage, vUV + vec2(0.0, -_TexelSize.y)).x * -2.0;
        sobel += texture2D(_InputImage, vUV + vec2(_TexelSize.x, -_TexelSize.y)).x * -1.0;

        sobel += texture2D(_InputImage, vUV + vec2(-_TexelSize.x, _TexelSize.y)).x * 1.0;
        sobel += texture2D(_InputImage, vUV + vec2(0.0, _TexelSize.y)).x * 2.0;
        sobel += texture2D(_InputImage, vUV + vec2(_TexelSize.x, _TexelSize.y)).x * 1.0;

    }

    gl_FragColor = vec4(sobel);

}
