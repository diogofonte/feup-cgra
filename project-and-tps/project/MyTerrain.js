import {CGFobject, CGFappearance, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';
/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);

        this.terrainShader = new CGFshader(scene.gl, 'shaders/terrain.vert', 'shaders/terrain.frag');
        this.terrainTex = new CGFtexture(scene, 'images/terrain2.png');
        this.terrainMap = new CGFtexture(scene, 'images/heightmap.jpg');
        this.altimetryMap = new CGFtexture(scene, 'images/altimetry2.png');
        this.plane = new MyPlane(scene, 30);

        this.terrainShader.setUniformsValues({ terrainTex: 0 });
        this.terrainShader.setUniformsValues({ terrainMap: 1 });
        this.terrainShader.setUniformsValues({ altimetryMap: 3 });
    }

    updateTextures(textures) {
        this.terrainTex = textures[0];
        this.terrainMap = textures[1];
    }

    display() {
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.terrainShader);

        this.terrainTex.bind(0);
        this.terrainMap.bind(1);
        this.altimetryMap.bind(3);

        this.scene.pushMatrix();
        this.scene.translate(0,-100,0);

        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(400, 400, 5);
        this.plane.display();

        this.scene.popMatrix();

        // restore default shader done in MyScene after Eggs display
    }

    setFillMode() {
        this.plane.setFillMode();
    }

    setLineMode() {
        this.plane.setLineMode();
    };

    enableNormalViz() {
        this.plane.enableNormalViz();
    }

    disableNormalViz() {
        this.plane.disableNormalViz();
    }
}