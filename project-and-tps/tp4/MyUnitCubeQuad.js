import {CGFobject,CGFappearance} from '../lib/CGF.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene,textures) {
		super(scene);
        this.textures = textures

        /*
        this.topMaterial = new CGFappearance(this.scene);
        this.topMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.topMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.topMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.topMaterial.setShininess(10.0);
        this.topMaterial.loadTexture('images/tangram.png');
        this.topMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.sideMaterial = new CGFappearance(this.scene);
        this.sideMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.sideMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.sideMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.sideMaterial.setShininess(10.0);
        this.sideMaterial.loadTexture('images/tangram.png');
        this.sideMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.bottomMaterial = new CGFappearance(this.scene);
        this.bottomMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.bottomMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.bottomMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.bottomMaterial.setShininess(10.0);
        this.bottomMaterial.loadTexture('images/tangram.png');
        this.bottomMaterial.setTextureWrap('REPEAT', 'REPEAT');
        */
	}
	
	display(){

        this.scene.pushMatrix(); //top
        var angle = 270 * Math.PI / 180
        this.scene.rotate(angle,1,0,0)
        this.scene.translate(0,0,0.5)

        this.textures[0].bind()
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.quad.display();


        this.scene.popMatrix();

        //----------------------------------

        this.scene.pushMatrix(); //backSide
        var angle = 180 * Math.PI / 180
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(angle,0,1,0)
        this.textures[1].bind()
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.quad.display();

        this.scene.popMatrix();

        //----------------------------------

        this.scene.pushMatrix(); //frontSide

        //var angle = -90 * Math.PI / 180
        //this.scene.rotate(angle,1,0,0)
        this.scene.translate(0,0,0.5);
        this.textures[1].bind()
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.quad.display();

        this.scene.popMatrix();

        //----------------------------------

        this.scene.pushMatrix(); //rightSide

        var angle = 90 * Math.PI / 180
        this.scene.rotate(angle,0,1,0)
        this.scene.translate(0,0,0.5)
        this.textures[1].bind()
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.quad.display();

        this.scene.popMatrix();

        //----------------------------------

        this.scene.pushMatrix(); //leftSide

        var angle = -90 * Math.PI / 180
        this.scene.rotate(angle,0,1,0)
        this.scene.translate(0,0,0.5)
        this.textures[1].bind()
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.quad.display();

        this.scene.popMatrix();

        //----------------------------------

        this.scene.pushMatrix(); //bottom

        var angle = 90 * Math.PI / 180
        this.scene.rotate(angle,1,0,0)
        
        this.scene.translate(0,0,0.5)
        this.textures[5].bind()
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.quad.display();
        
        this.scene.popMatrix();
    }
}

