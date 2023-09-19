import {CGFobject} from '../lib/CGF.js';
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
        constructor(scene) {
                super(scene);
        }

        display(){

                this.scene.pushMatrix();

                var translate = [
                        1,0,0,0,
                        0,1,0,0,
                        0,0,1,0,
                        -2.2,2.7,0,1
                ]

                var angle = 35 * Math.PI / 180;

                var rotate = [
                        Math.cos(angle),Math.sin(angle),0,0,
                        -Math.sin(angle),Math.cos(angle),0, 0,
                        0, 0, 1,0,
                        0,0,0,1
                ]

                this.scene.multMatrix(translate);
                this.scene.multMatrix(rotate);
                this.scene.tp2Diamond.display();

                this.scene.popMatrix();

                //-----------------------------------------------------

                this.scene.pushMatrix()

                translate = [
                        1,0,0,0,
                        0,1,0,0,
                        0,0,1,0,
                        -2.5,0,0,1
                ]

                this.scene.multMatrix(translate);
                this.scene.triangleBig.display();

                this.scene.popMatrix();

                //-----------------------------------------------------

                this.scene.pushMatrix();

                translate = [
                        1,0,0,0,
                        0,1,0,0,
                        0,0,1,0,
                        -1,0,0,1
                ]

                angle = 180 * Math.PI / 180;

                rotate = [
                        Math.cos(angle), Math.sin(angle), 0, 0,
                        -Math.sin(angle), Math.cos(angle), 0, 0,
                        0, 0, 1, 0,
                        0, 0, 0, 1
                ]

                this.scene.multMatrix(translate);
                this.scene.multMatrix(rotate);
                this.scene.triangleBig2.display();

                this.scene.popMatrix();

                //-----------------------------------------------------

                this.scene.pushMatrix();

                angle = 270 * Math.PI / 180;

                rotate = [
                        Math.cos(angle), -Math.sin(angle), 0, 0,
                        Math.sin(angle), Math.cos(angle), 0, 0,
                        0, 0, 1, 0,
                        0, 0, 0, 1
                ]

                this.scene.multMatrix(rotate);
                this.scene.parallelogram.display();

                this.scene.popMatrix();

                //-----------------------------------------------------

                this.scene.pushMatrix();

                this.scene.translate(1.5,0,0);
                this.scene.scale(1.5,1.5,1);
                this.scene.triangleSmall.display();

                this.scene.popMatrix();

                //-----------------------------------------------------

                this.scene.pushMatrix();

                this.scene.translate(3.4,0,0);

                angle = 180 * Math.PI / 180;
                
                this.scene.rotate(angle,0,0,1);
                this.scene.triangleSmall.display();

                this.scene.popMatrix();

                //-----------------------------------------------------

                this.scene.pushMatrix();

                angle = 270 * Math.PI / 180;

                this.scene.rotate(angle,0,0,1);
                this.scene.translate(-3.5,1,0);
                this.scene.triangleSmall.display();

                this.scene.popMatrix();
        }
}