import {GPGPU} from '../../../Vendors/ogl/src/extras/GPGPU';
import { Texture } from '../../../Vendors/ogl/src/core/Texture';
import {params} from '../../params.js';
import { Vec2 } from '../../../Vendors/ogl/src/math/Vec2';
import { Mat4 } from '../../../Vendors/ogl/src/math/Mat4';

const velocityCaptureKernel = require('./kernels/velocityCapture.frag');
const positionKernel = require('./kernels/position.frag');
const velocityKernel = require('./kernels/velocity.frag');
const colorCaptureKernel = require('./kernels/colorCapture.frag');

export default class Simulator {

    constructor(gl, {width, height, camera}) {
        
        this.gl = gl;

        this.countX = width;
        this.countY = height;
        this.camera = camera;
        this.viewportWidth;
        this.viewportHeight;

        this.modelViewMatrix = new Mat4();
        this.viewProjectionMatrix = new Mat4();

        this.calcViewportDimensions();
        this.initEvents();
        this.initVelocityCapture();
        this.initVelocity();
        this.initPosition();
        // this.initColorCapture();
        
    }

    calcViewportDimensions() {

        const dist = this.camera.position.z;
        this.viewportHeight = Math.tan((this.camera.fov * (Math.PI / 180.0)) * 0.5) * dist;
        this.viewportWidth = this.viewportHeight * this.camera.aspect;

    }

    initEvents() {

        window.addEventListener('resize', this.onResize);

    }

    initVelocityCapture() {

        const initCapturedVelocityData = new Float32Array(this.countX * this.countY * 4);
        this.velocityCapture = new GPGPU(this.gl, {data: initCapturedVelocityData});

        const uniforms = {

            _OpticalFlow: {
                value: new Texture(this.gl)
            },
            _Position: null,
            _TextureProjectionMatrix: {
                value: this.viewProjectionMatrix
            },
            _Aspect: {
                value: (this.gl.renderer.width / this.gl.renderer.height) / (640.0 / 480.0)
            }

        }

        this.velocityCapture.addPass({
            fragment: velocityCaptureKernel,
            uniforms
        });

    }

    initVelocity() {

        const initVelocityData = new Float32Array(this.countX * this.countY * 4.0);
        this.velocity = new GPGPU(this.gl, {data: initVelocityData});

        const velocityParams = gui.addFolder("velocity");
        velocityParams.add(params.simulation.velocity, "FORCE", 0.001, 0.1).listen();

        const uniforms = {

            _OpticalFlowVelocity: null,
            _Position: null,
            _Force: {
                value: params.simulation.velocity.FORCE 
            },
            _Aspect: {
                value: (this.gl.renderer.width / this.gl.renderer.height) / (640.0 / 480.0)
            }

        }

        this.velocity.addPass({
            fragment: velocityKernel,
            uniforms
        });

    }

    initPosition() {

        const initPositionData = new Float32Array(this.countX * this.countY * 4);
        const widthBounds = this.viewportWidth;
        const heightBounds = this.viewportHeight;

        let positionIterator = 0;

        for(let y = 0; y < this.countY; y++) {
            for(let x = 0; x < this.countX; x++) {

                let posX = (Math.random() * 2.0 - 1.0) * widthBounds;
                let posY = (Math.random() * 2.0 - 1.0) * heightBounds;
                
                // initSpawnPositionData[(spawnPositionIterator * 4.0) + 0] = posX;
                // initSpawnPositionData[(spawnPositionIterator * 4.0) + 1] = posY;
                // initSpawnPositionData[(spawnPositionIterator * 4.0) + 2] = 0.0;
                // initSpawnPositionData[(spawnPositionIterator * 4.0) + 3] = 0.0;

                // spawnPositionIterator++;

                initPositionData[positionIterator++] = posX;
                initPositionData[positionIterator++] = posY;
                initPositionData[positionIterator++] = 0.0;
                initPositionData[positionIterator++] = 0.0;

            }

        }

        const paramsData = new Float32Array(this.countX * this.countY * 4.0);
        let paramsDataIterator = 0;
        for(let i = 0; i < this.countX * this.countY; i++) {

            paramsData[paramsDataIterator++] = Math.random();
            paramsData[paramsDataIterator++] = Math.random();
            paramsData[paramsDataIterator++] = Math.random();
            paramsData[paramsDataIterator++] = Math.random();

        }

        const paramsTexture = this.createDataTexture({data: paramsData, size: this.countX});

        this.position = new GPGPU(this.gl, {data: initPositionData});

        const uniforms = {
            _OpticalFlow: {
                value: new Texture(this.gl)
            },
            _TextureProjectionMatrix: {
                value: this.viewProjectionMatrix
            },
            _Aspect: {
                value: (this.gl.renderer.width / this.gl.renderer.height) / (640.0 / 480.0)
            },
            _Velocity: {
                value: null
            },
            _Params: {
                value: paramsTexture
            },
            _Bounds: {
                value: new Vec2(widthBounds, heightBounds)
            },
            _Seed: {
                value: 0
            }
        }

        this.position.addPass({
            fragment: positionKernel,
            uniforms
        });

    }

    initColorCapture() {

        const initColorData = new Float32Array(this.countX * this.countY * 4);
        this.colorCapture = new GPGPU(this.gl, {data: initColorData});

        const uniforms = {
            _OpticalFlow: {
                value: new Texture(this.gl)
            },
            _TextureProjectionMatrix: {
                value: this.viewProjectionMatrix
            },
            _InputImg: {
                value: new Texture(this.gl)
            },
            _Resolution: {
                value: new Vec2(this.gl.renderer.width, this.gl.renderer.height)
            },
            _Position: null
        }

        this.colorCapture.addPass({
            fragment: colorCaptureKernel,
            uniforms
        });

    }

    captureVelocity({opticalFlow}) {

        this.velocityCapture.passes[0].program.uniforms._OpticalFlow.value = opticalFlow;
        this.velocityCapture.passes[0].program.uniforms._Position = this.position.uniform;
        this.velocityCapture.render();

    }

    updateVelocity() {

        this.velocity.passes[0].program.uniforms._Position = this.position.uniform;
        this.velocity.passes[0].program.uniforms._OpticalFlowVelocity = this.velocityCapture.uniform;
        this.velocity.passes[0].program.uniforms._Force.value = params.simulation.velocity.FORCE;
        this.velocity.render();

    }

    updatePosition({opticalFlow, t}) {

        this.position.passes[0].program.uniforms._Velocity = this.velocity.uniform;
        this.position.passes[0].program.uniforms._OpticalFlow.value = opticalFlow;
        this.position.passes[0].program.uniforms._Seed.value += t;
        this.position.render();
    }

    updateColorCapture({opticalFlow, inputImg}) {
        
        this.colorCapture.passes[0].program.uniforms._Position = this.position.uniform;
        this.colorCapture.passes[0].program.uniforms._OpticalFlow.value = opticalFlow;
        this.colorCapture.passes[0].program.uniforms._InputImg.value = inputImg;
        this.colorCapture.render();
    }

    update({opticalFlow, worldMatrix, t}) {

        this.modelViewMatrix.multiply(this.camera.viewMatrix, worldMatrix);
        this.viewProjectionMatrix.multiply(this.camera.projectionMatrix, this.modelViewMatrix);

        this.updateVelocity();
        this.updatePosition({opticalFlow, t});
        this.captureVelocity({opticalFlow});

    }

    get Velocity() {
        return this.velocity.uniform
    }

    get Position() {
        return this.position.uniform
    }

    // get Color() {
    //     return this.colorCapture.uniform
    // }

    createDataTexture({data, size}) {

        return new Texture(this.gl, {
            image: data,
            target: this.gl.TEXTURE_2D,
            type: this.gl.FLOAT,
            format: this.gl.RGBA,
            internalFormat: this.gl.renderer.isWebgl2 ? this.gl.RGBA32F : this.gl.RGBA,
            wrapS: this.gl.CLAMP_TO_EDGE,
            wrapT: this.gl.CLAMP_TO_EDGE,
            generateMipmaps: false,
            minFilter: this.gl.NEAREST,
            magFilter: this.gl.NEAREST,
            width: size,
            flipY: false
        })

    }

    onResize = () => {

        this.calcViewportDimensions();
        this.position.passes[0].uniform._Bounds.value.set(this.viewportWidth, this.viewportHeight);

    }

}