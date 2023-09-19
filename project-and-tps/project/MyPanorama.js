import {CGFobject} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyPanorama extends CGFobject {
	constructor(scene, texture) {
		super(scene);
        this.texture = texture
		this.initBuffers();
		this.x = 0;
		this.y = 0;
		this.z = 0;
	}

	initBuffers() {
        this.sphere = new MySphere(this.scene, 1, 30, 30,true);
		this.sphere.indices = [];

		for (var i = 0; i < this.sphere.stacks; i++) {
			for (var j = 0; j < this.sphere.slices; j++) {
				var a = i * (this.sphere.slices + 1) + j;
				var b = a + this.sphere.slices + 1;

				this.sphere.indices.push(a + 1, b, a );
				this.sphere.indices.push(a + 1, b + 1,b);
			}
		}
	}

	updateBuffers() {

	}

    display(){
        this.scene.pushMatrix();

        this.texture.apply();
        var angle = -90 * Math.PI/180;
        this.scene.rotate(angle,1,0,0);
		this.scene.scale(200,200,200)
        this.sphere.display();

        this.scene.popMatrix();
    }
}