import { CGFobject, CGFappearance } from '../lib/CGF.js';



/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
        constructor(scene) {
                super(scene);
                this.initMaterials();
        }

        initBuffers() {
                this.initGLBuffers();
        }

        updateBuffers() {

        }

        initMaterials() {
                // Red
                this.red = new CGFappearance(this.scene);
                this.red.setAmbient(0.1, 0.1, 0.1, 1);
                this.red.setDiffuse(1, 0, 0, 1);
                this.red.setSpecular(1, 1, 1, 0);
                this.red.setShininess(10.0);

                // Yellow
                this.yellow = new CGFappearance(this.scene);
                this.yellow.setAmbient(0.1, 0.1, 0.1, 1);
                this.yellow.setDiffuse(1, 1, 0, 1);
                this.yellow.setSpecular(1, 1, 1, 0);
                this.yellow.setShininess(10.0);

                // Green
                this.green = new CGFappearance(this.scene);
                this.green.setAmbient(0.1, 0.1, 0.1, 1);
                this.green.setDiffuse(0, 1, 0, 1);
                this.green.setSpecular(1, 1, 1, 0);
                this.green.setShininess(10.0);

                // Blue
                this.blue = new CGFappearance(this.scene);
                this.blue.setAmbient(0.1, 0.1, 0.1, 1);
                this.blue.setDiffuse(0, 0.4, 0.85, 1);
                this.blue.setSpecular(1, 1, 1, 0);
                this.blue.setShininess(10.0);

                // Pink
                this.pink = new CGFappearance(this.scene);
                this.pink.setAmbient(0.1, 0.1, 0.1, 1);
                this.pink.setDiffuse(1, 0.4, 0.6, 1);
                this.pink.setSpecular(1, 1, 1, 0);
                this.pink.setShininess(10.0);

                // Orange
                this.orange = new CGFappearance(this.scene);
                this.orange.setAmbient(0.1, 0.1, 0.1, 1);
                this.orange.setDiffuse(1, 0.5, 0, 1);
                this.orange.setSpecular(1, 1, 1, 0);
                this.orange.setShininess(10.0);

                // Purple
                this.purple = new CGFappearance(this.scene);
                this.purple.setAmbient(0.1, 0.1, 0.1, 1);
                this.purple.setDiffuse(0.58, 0, 0.827, 1);
                this.purple.setSpecular(1, 1, 1, 0);
                this.purple.setShininess(10.0);


            
                this.textMaterial = new CGFappearance(this.scene);
                this.textMaterial.setAmbient(0.1, 0.1, 0.1, 1);
                this.textMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
                this.textMaterial.setSpecular(0.1, 0.1, 0.1, 1);
                this.textMaterial.setShininess(10.0);
                this.textMaterial.loadTexture('images/tangram.png');
                this.textMaterial.setTextureWrap('REPEAT', 'REPEAT');


                
        
         


                
        }

        display() {

                this.scene.pushMatrix();

                var angle = 35 * Math.PI / 180;

                this.scene.translate(-2.2, 2.7, 0);
                this.scene.rotate(angle, 0, 0, 1);
                //this.green.apply();
                this.textMaterial.apply()
                this.scene.tp2Diamond.updateTexCoords([0.0, 0.5, 
                                                       0.25, 0.75, 
                                                       0.25, 0.25, 
                                                       0.5, 0.5])
                this.scene.tp2Diamond.display();

                this.scene.popMatrix();

                //-----------------------------------------------------

                this.scene.pushMatrix();

                this.scene.translate(-2.5, 0, 0);
                this.textMaterial.apply()
                this.scene.triangleBig.updateTexCoords([0.0, 0.0, 
                                                       0.5, 0.5, 
                                                       1.0, 0.0, 
                                                       0.0, 0.0])
                this.scene.triangleBig.display();

                this.scene.popMatrix();

                //-----------------------------------------------------

                this.scene.pushMatrix();

                angle = 180 * Math.PI / 180;

                this.scene.translate(-1, 0, 0);
                this.scene.rotate(angle, 0, 0, 1);
                this.textMaterial.apply()
                this.scene.triangleBig2.updateTexCoords([1.0, 0.0, 
                                                       0.5, 0.5, 
                                                       1.0, 1.0, 
                                                       1.0, 1.0])
                this.scene.triangleBig2.display();

                this.scene.popMatrix();

                //-----------------------------------------------------

                this.scene.pushMatrix();

                angle = 90 * Math.PI / 180;

                this.scene.rotate(angle, 0, 0, 1);
                this.textMaterial.apply()
                this.scene.parallelogram.updateTexCoords([0.25, 0.75, 
                                                       0.5, 1.0, 
                                                       1.0, 1.0, 
                                                       0.75, 0.75])
                this.scene.parallelogram.display();

                this.scene.popMatrix();

                //-----------------------------------------------------

                this.scene.pushMatrix();

                this.scene.translate(1.5, 0, 0);
                this.scene.scale(1.5, 1.5, 1);
                this.textMaterial.apply()
                this.scene.triangleSmall.updateTexCoords([0.0, 1.0, 
                                                       0.5, 1.0, 
                                                       0.0, 0.5, 
                                                       0.75, 0.75])
                this.scene.triangleSmall.display();

                this.scene.popMatrix();

                //-----------------------------------------------------

                this.scene.pushMatrix();

                angle = 180 * Math.PI / 180;

                this.scene.translate(3.4, 0, 0);
                this.scene.rotate(angle, 0, 0, 1);
                this.textMaterial.apply()
                this.scene.triangleSmall.updateTexCoords([0.25, 0.25, 
                                                       0.0, 0.0, 
                                                       0.0, 0.5, 
                                                       0.75, 0.75])
                this.scene.triangleSmall.display();

                this.scene.popMatrix();

                //-----------------------------------------------------

                this.scene.pushMatrix();

                angle = 270 * Math.PI / 180;

                this.scene.rotate(angle, 0, 0, 1);
                this.scene.translate(-3.5, 1, 0);
                this.textMaterial.apply()
                this.scene.triangleSmall.updateTexCoords([0.5, 0.5, 
                                                       0.25, 0.75, 
                                                       0.75, 0.75, 
                                                       0.75, 0.75])
                this.scene.triangleSmall.display();

                this.scene.popMatrix();
        }

        enableNormalViz() {
                this.scene.triangleBig.enableNormalViz();
                this.scene.tp2Diamond.enableNormalViz();
                this.scene.triangleBig2.enableNormalViz();
                this.scene.triangleSmall.enableNormalViz();
                this.scene.parallelogram.enableNormalViz();
        }

        disableNormalViz() {
                this.scene.triangleBig.disableNormalViz();
                this.scene.tp2Diamond.disableNormalViz();
                this.scene.triangleBig2.disableNormalViz();
                this.scene.triangleSmall.disableNormalViz();
                this.scene.parallelogram.disableNormalViz();
        }
}