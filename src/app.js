import OpticalFlowParticles from './index.js';
import * as dat from 'dat.gui';

class App {

    constructor() {

        window.gui = new dat.GUI()

        const opticalflowParticles = new OpticalFlowParticles();
        
    }

}

window.onload = () => new App();