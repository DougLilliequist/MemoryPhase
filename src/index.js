import {
    Renderer
} from "../Vendors/ogl/src/core/Renderer.js";
import {
    Camera
} from "../Vendors/ogl/src/core/Camera.js";
import {
    Transform
} from "../Vendors/ogl/src/core/Transform.js";
import { Texture } from "../Vendors/ogl/src/core/Texture.js";
import Quad from "./Quad/index.js";
import Flow from "./Flow/index.js";
import Particles from "./Particles/index.js";
import SphereNormal from "./SphereNormal/index.js";


export default class OpticalFlowParticles {
    constructor() {
        this.renderer = new Renderer({
            width: window.innerWidth,
            height: window.innerHeight,
            antialias: false
        });

        this.gl = this.renderer.gl;
        this.gl.canvas.style.position = "absolute";
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        // this.gl.clearColor(0.7, 0.7, 0.7, 1.0);
        this.gl.canvas.style.top = "0";
        this.gl.canvas.style.left = "0";
        this.gl.canvas.style.width = "100%";
        this.gl.canvas.style.height = "100%";
        this.gl.canvas.style.overflow = "hidden";
        this.gl.canvas.style.zIndex = "-1";
        document.body.appendChild(this.gl.canvas);

        this.scene = new Transform();

        this.camera = new Camera(this.gl, {
            fov: 35,
            far: 10,
            aspect: window.innerWidth / window.innerHeight
        });

        this.camera.position.z = 1;

        this.initVideo();

        this.initOpticalFlow();

        this.initParticles();

        this.initQuad();

        this.initEvents();

        this.start();
    }

    initVideo() {

        this.streamAvailable = false;

        this.video = document.createElement("video");

        this.videoTexture = new Texture(this.gl, {
            generateMipmaps: false,
            width: 640,
            height: 480
        });

        const options = {
            audio: false,
            video: {
                width: 640,
                height: 480
            }
        };

        navigator.mediaDevices
            .getUserMedia(options)
            .then(stream => {
                this.video.srcObject = stream;
                this.video.play();
                this.streamAvailable = true;
            })
            .catch(error => {
                console.error("no camera found");
            });
    }

    initOpticalFlow() {

        this.flow = new Flow(this.gl, {
            width: 640,
            height: 480
        });

    }

    initParticles() {

        this.sphereNormal = new SphereNormal(this.gl);

        this.particles = new Particles(this.gl, {camera: this.camera, normal: this.sphereNormal.Texture});
        this.particles.setParent(this.scene);

    }

    initQuad() {

        this.quad = new Quad(this.gl);
        // this.quad.Output = this.flow.flowVectorTextureRead.texture;
        this.quad.setParent(this.scene);

    }

    initEvents() {
        window.addEventListener("resize", this.onResize);
    }

    start() {
        this.t = 0.0016;
        this.update();
    }

    render() {
        this.renderer.render({
            scene: this.scene,
            camera: this.camera
        });
    }

    update() {
        window.requestAnimationFrame(() => this.update());
        if (this.streamAvailable) {

            if (this.video.readyState >= this.video.HAVE_CURRENT_DATA) {

                this.videoTexture.image = this.video;
                this.videoTexture.needsUpdate = true;

                this.flow.update({
                    inputVideo: this.videoTexture
                });

            }


            this.particles.update({scene: this.scene, opticalFlow: this.flow.flowVectorTextureWrite.texture, t: this.t});

            // this.quad.update({
            //     inputVideo: this.video
            // });
            // this.quad.Output = this.particles.shadowPass.target.texture;
            // this.quad.Output = this.flow.flowVectorTextureWrite.texture;

        }
        this.render();
    }

    onResize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const aspect = w / h;
        this.renderer.setSize(w, h);
        this.camera.perspective({
            aspect
        });
    };
}