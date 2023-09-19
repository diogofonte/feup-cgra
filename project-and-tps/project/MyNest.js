import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MyCone } from './MyCone.js';
import { MySphere } from './MySphere.js';
import { MyBirdEgg } from './MyBirdEgg.js';

export class MyNest extends CGFobject {
	constructor(scene) {
		super(scene);
		this.x = 25;
		this.y = -88.6;
		this.z = -50;
		this.initBuffers();
        this.eggs = []
	}

	initBuffers() {
		this.floor = new MySphere(this.scene,1,20,20,false)
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(0.1, 0.1, 0.1, 1);
        this.appearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.appearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.appearance.setShininess(10.0);
        this.texture = new CGFtexture(this.scene, "images/nest.png");
		this.appearance.setTexture(this.texture);
        this.sides = []

        for (var i=0;i<10;i++){
            var side = new MySphere(this.scene,1,20,20,false);
            this.sides.push(side)
        }
        
        this.sidesText = new CGFappearance(this.scene);
        this.sidesText.setAmbient(0.1, 0.1, 0.1, 1);
        this.sidesText.setDiffuse(0.9, 0.9, 0.9, 1);
        this.sidesText.setSpecular(0.1, 0.1, 0.1, 1);
        this.sidesText.setShininess(10.0);
        this.texture = new CGFtexture(this.scene, "images/nestSides.png");
		this.sidesText.setTexture(this.texture); 
	}

	updateBuffers() {

	}

	display(){
        this.scene.pushMatrix()

        this.appearance.apply()
        this.scene.translate(this.x,this.y,this.z)
        this.scene.rotate(90 * Math.PI /180,1,0,0)
        this.scene.scale(7,7,0.8)
        this.floor.display()

        this.scene.popMatrix()

        for (var i=0;i<this.sides.length;i++){
            this.scene.pushMatrix()

            this.sidesText.apply()
            this.scene.translate(this.x + Math.cos((i * 36)* Math.PI / 180) * 6.8,this.y - 0.9,this.z + Math.sin((i * 36) * Math.PI / 180) * 6.8)
            this.scene.scale(2.25,2.6,2.25)
            this.sides[i].display()

            this.scene.popMatrix()
        }
	}
}
