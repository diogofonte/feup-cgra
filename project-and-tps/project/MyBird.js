import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MyBody } from './MyBody.js';
import { MyWing } from './MyWing.js';
import { MyCone } from './MyCone.js';
import { MyCylinder } from './MyCylinder.js';
/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBird extends CGFobject {

    constructor(scene) {
		super(scene);
		this.initBuffers();
        this.wingAnimAngle = 0
        this.wingAnimUp = true;
        this.wingAnimDown = false;
        this.hoverAnimHeight = 0;
        this.hoverAnimUp = false;
        this.hoverAnimDown = true;
        this.turnLeft = false;
        this.turnRight = false;
        this.turnAngle = 0;
        this.speed = 0;
        this.position = [25,-84.6,-30];
        this.divingDown = false;
        this.divingUp = false;
        this.eggs = [];
        this.divingSpeed = 3; //has to dive and come up in 2 seconds, 6 units = 3 units/second
	}

    initBuffers() {
        this.body = new MyBody(this.scene,2,30,30);
        this.head = new MyBody(this.scene,1,30,30);
        this.wingLeft = new MyWing(this.scene);
        this.wingRight = new MyWing(this.scene);
        this.beak = new MyCone(this.scene, 20,20);
        this.eyeLeft = new MyCylinder(this.scene,30,30);
        this.eyeRight = new MyCylinder(this.scene,30,30);
        this.footLeft = new MyCone(this.scene,20,20);
        this.footRight = new MyCone(this.scene,20,20);
 
        this.bodyTexture = new CGFappearance(this.scene);
        this.bodyTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.bodyTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.bodyTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.bodyTexture.setShininess(10.0);
        this.bodyTexture.loadTexture("images/bodyPengu.png");

        this.headTexture = new CGFappearance(this.scene);
        this.headTexture.setAmbient(1, 1, 1, 1);
        this.headTexture.setDiffuse(1, 1, 1, 1);
        this.headTexture.setSpecular(1, 1, 1, 0);
        this.headTexture.setShininess(10.0);
        this.headTexture.loadTexture("images/headPengu.png");
        this.headTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.beakTexture = new CGFappearance(this.scene);
        this.beakTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.beakTexture.setDiffuse(1, 0.5, 0, 1);
        this.beakTexture.setSpecular(1, 1, 1, 0);
        this.beakTexture.setShininess(10.0);

        this.eyeTexture = new CGFappearance(this.scene);
        this.eyeTexture.setAmbient(0, 0, 0, 1);
        this.eyeTexture.setDiffuse(0, 0, 0, 1);
        this.eyeTexture.setSpecular(1, 1, 1, 0);
        this.eyeTexture.setShininess(10.0);
    }

    display(){
        //body
        this.scene.pushMatrix();

        this.bodyTexture.apply();
        this.scene.scale(0.4,0.5,0.6);
        this.scene.rotate(90 * Math.PI / 180,0,0,1);
        this.body.display();        

        this.scene.popMatrix();

        //head
        this.scene.pushMatrix();

        this.scene.translate(0,0.6,0.65);
        this.scene.scale(0.6,0.65,0.6);
        this.scene.rotate(90 * Math.PI/180,0,1,0);
        this.scene.rotate(70 * Math.PI /180,0,0,1);
        this.headTexture.apply();
        this.head.display();
        
        this.scene.popMatrix();

        //wings - left
        this.scene.pushMatrix();

        this.wingsAnimationLeft(); 
        this.wingLeft.display();

        this.scene.popMatrix();
    
        //wings - right
        this.scene.pushMatrix();

        var angle = 180 * Math.PI/180;
        this.scene.rotate(angle,0,0,1);
        this.wingsAnimationRight();
        this.wingRight.display();

        this.scene.popMatrix();

        //beak
        this.scene.pushMatrix();

        angle = 70 * Math.PI/180;
        this.scene.rotate(angle,1,0,0);
        this.scene.scale(0.2,0.5,0.2);
        this.scene.translate(0,2.3,-0.6);
        this.beakTexture.apply();
        this.beak.display();

        this.scene.popMatrix();

        //eyes - left

        this.scene.pushMatrix();

        this.eyeTexture.apply();
        angle = -50 * Math.PI/180;
        this.scene.translate(0.3,0.85,1);
        this.scene.scale(0.1,0.1,0.1);
        this.scene.rotate(angle,0,1,0);
        this.eyeLeft.display();

        this.scene.popMatrix();

        //eyes - right
        this.scene.pushMatrix();

        this.eyeTexture.apply();
        angle = 50 * Math.PI/180;
        this.scene.translate(-0.3,0.85,1);
        this.scene.scale(0.1,0.1,0.1);
        this.scene.rotate(angle,0,1,0);
        this.eyeRight.display();
        
        this.scene.popMatrix();

        //feet - left
        this.scene.pushMatrix();

        this.beakTexture.apply();
        angle = 230 * Math.PI/180;
        this.scene.rotate(angle,1,0,0);
        this.scene.translate(0.3,0.85,0);
        this.scene.scale(0.2,0.3,0.4);
        this.footLeft.display();

        this.scene.popMatrix();

        //feet - right
        this.scene.pushMatrix();
    
        angle = 230 * Math.PI/180;
        this.scene.rotate(angle,1,0,0);
        this.scene.translate(-0.3,0.85,0);
        this.scene.scale(0.2,0.3,0.4);
        this.footRight.display();
        
        this.scene.popMatrix();   
    }

    wingsAnimationLeft() {
        if (this.wingAnimUp) {
            if (this.wingAnimAngle < 20 && this.wingAnimAngle + (0.3 + this.speed * 0.2) * this.scene.speedFactor < 20) {
                this.scene.rotate(-(( this.wingAnimAngle + (0.3 + this.speed * 0.2) * this.scene.speedFactor) * Math.PI/180),0,0,1)
                this.wingAnimAngle += (0.3 + this.speed * 0.2) * this.scene.speedFactor
                if (this.wingAnimAngle > 20) {
                    this.wingAnimUp = false;
                    this.wingAnimDown = true;
                }
            } else {
                this.wingAnimUp = false;
                this.wingAnimDown = true;
            }        
        }
    
        if (this.wingAnimDown) {
            if (this.wingAnimAngle > -20 && this.wingAnimAngle + (0.3 + this.speed * 0.2) * this.scene.speedFactor > -20) {
                this.scene.rotate(-((this.wingAnimAngle + (0.3 + this.speed * 0.2) * this.scene.speedFactor) * Math.PI/180),0,0,1)
                this.wingAnimAngle -= (0.3 + this.speed * 0.2) * this.scene.speedFactor
                if (this.wingAnimAngle < -20) {
                    this.wingAnimUp = true;
                    this.wingAnimDown = false;
                }
            } else {
                this.wingAnimUp = true;
                this.wingAnimDown = false;
            }
        }        
    }

    wingsAnimationRight() {
        if (this.wingAnimUp) {
            if (this.wingAnimAngle < 20 && this.wingAnimAngle + (0.3 + this.speed * 0.2) * this.scene.speedFactor < 20) {
                this.scene.rotate((( this.wingAnimAngle + (0.3 + this.speed * 0.2) * this.scene.speedFactor)  * Math.PI/180),0,0,1)
                this.wingAnimAngle += (0.3 + this.speed * 0.2) * this.scene.speedFactor
                if (this.wingAnimAngle > 20) {
                    this.wingAnimUp = false;
                    this.wingAnimDown = true;
                }
            } else {
                this.wingAnimUp = false;
                this.wingAnimDown = true;
            }
            
        }
        
        if (this.wingAnimDown) {
            if (this.wingAnimAngle > -20 && this.wingAnimAngle + (0.3 + this.speed * 0.2) * this.scene.speedFactor > -20) {
                this.scene.rotate(((this.wingAnimAngle + (0.3 + this.speed * 0.2) * this.scene.speedFactor ) * Math.PI/180),0,0,1)
                this.wingAnimAngle -= (0.3 + this.speed * 0.2) * this.scene.speedFactor
                if (this.wingAnimAngle < -20) {
                    this.wingAnimUp = true;
                    this.wingAnimDown = false;
                }
            } else {
                this.wingAnimUp = true;
                this.wingAnimDown = false;
            }
        } 
    }

    hoverAnimation() {
        if (this.hoverAnimUp) {
            if (this.hoverAnimHeight < 0.5 && this.hoverAnimHeight + 0.0142 < 0.5) {
                this.scene.translate(0,(this.hoverAnimHeight + 0.0142),0);
                this.hoverAnimHeight += 0.0142
            
                if (this.hoverAnimHeight > 0.5) {
                    this.hoverAnimUp = false
                    this.hoverAnimDown = true;
                    
                }
            } else {
                this.hoverAnimUp = false
                this.hoverAnimDown = true;
            }
        }

        if (this.hoverAnimDown) {
            if (this.hoverAnimHeight > -0.5) {
                this.scene.translate(0,this.hoverAnimHeight + 0.0142,0);
                this.hoverAnimHeight -= 0.0142
    
                if (this.hoverAnimHeight < -0.5) {
                    this.hoverAnimUp = true;
                    this.hoverAnimDown = false; 
                }
            } else {   
                this.hoverAnimUp = true;
                this.hoverAnimDown = false;
            }
        }
    }

    turn() {
        if (this.turnLeft) {
            this.scene.rotate(( (this.turnAngle + 0.5) * Math.PI/180),0,1,0)
            this.turnAngle += 1.5
        }
        if (this.turnRight) {
            this.scene.rotate(( (this.turnAngle + 0.5) * Math.PI/180),0,1,0)
            this.turnAngle -= 1.5
        }
    }

    accelerate(v) {
        if (v) {
            if (this.speed + 0.1 <= 10) {
                this.speed +=0.1;
            }
        } else {
            if (this.speed - 0.1 >= 0) {
                this.speed -=0.1;
            }
        }
    }

    resetBird() {
        this.speed = 0;
        this.turnAngle = 0;
        this.position = [25,-84.6,-30]
    }

    dive() {
        if (this.divingDown) {
            if (this.position[1] - this.divingSpeed/60 > -87.6) {
              this.scene.translate(0,-this.divingSpeed/60,0)
              this.position[1] -= this.divingSpeed/60;
              this.scene.rotate(30 * Math.PI/180,1,0,0)
            } else {
              this.collectEggs()
              this.divingDown = false;
              this.divingUp = true
            }
          } else if (this.divingUp) {
            if (this.position[1] + this.divingSpeed/60 < -84.6) {
              this.scene.translate(0,this.divingSpeed/60,0)
              this.position[1] += this.divingSpeed/60;
            }
            else{
              this.position[1] = -84.6
              this.divingUp = false
            }
        }
    }


    collectEggs() {
        var removed = null;
        for (var i=0;i<this.scene.eggs.length;i++) {
            var obj1MinX = this.position[0] - 3 / 2;
            var obj1MaxX = this.position[0] + 3 / 2;
            var obj1MinY = this.position[1] - 2 / 2;
            var obj1MaxY = this.position[1] + 2 / 2;
            var obj1MinZ = this.position[2] - 2 / 2;
            var obj1MaxZ = this.position[2] + 2 / 2;

            var obj2MinX = this.scene.eggs[i].x - 2 / 2;
            var obj2MaxX = this.scene.eggs[i].x + 2 / 2;
            var obj2MinY = this.scene.eggs[i].y - 3 / 2;
            var obj2MaxY = this.scene.eggs[i].y + 3 / 2;
            var obj2MinZ = this.scene.eggs[i].z - 2 / 2;
            var obj2MaxZ = this.scene.eggs[i].z + 2 / 2;

            // Check if the objects overlap in the x, y, and z axes
            if (obj1MinX <= obj2MaxX && obj1MaxX >= obj2MinX &&
                obj1MinY <= obj2MaxY && obj1MaxY >= obj2MinY &&
                obj1MinZ <= obj2MaxZ && obj1MaxZ >= obj2MinZ) {
                removed = i
                this.eggs.push(this.scene.eggs[i])
            }
        }
        if (removed != null){
            this.scene.eggs.splice(removed, 1);
        }
    }

    releaseEgg(){
        var dx = this.position[0] - this.scene.nest.x;
        var dz = this.position[2] - this.scene.nest.z;
        var distance = Math.sqrt(dx * dx + dz * dz);
        if (distance <= 5.5) {
            this.eggs[0].x = this.position[0]
            this.eggs[0].y = this.position[1] - 1.2
            this.eggs[0].z = this.position[2]
            this.eggs[0].initialX = this.position[0]
            this.eggs[0].initialY = this.position[1] - 1.2
            this.eggs[0].initialZ = this.position[2]
            this.eggs[0].droped = true;
            this.scene.nest.eggs.push(this.eggs[0])
            this.eggs.pop();
        } 
        
        
    }
    





}