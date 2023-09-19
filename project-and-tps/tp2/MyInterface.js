import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        /*this.gui.add(this.scene, 'displayDiamond').name('Display Diamond');

        this.gui.add(this.scene, 'displayTriangle').name('Display Triangle');

        this.gui.add(this.scene, 'displayParallelogram').name('Display Parallelo');

        this.gui.add(this.scene, 'displayTriangleSmall').name('Display SmallTri');

        this.gui.add(this.scene, 'displayTriangleBig').name('Display BigTri');*/

        this.gui.add(this.scene, 'displayTangram').name('Display Tangram');

        this.gui.add(this.scene, 'displayUnitCube').name('Display UnitCube');

        this.gui.add(this.scene, 'displayUnitCubeQuad').name('Display Unit Quad');

        return true;
    }
}