import {CGFobject, CGFappearance,CGFtexture} from '../lib/CGF.js';
import { MyBillboard } from './MyBillboard.js';

export class MyTreeRowPatch extends CGFobject {
    constructor(scene,x,y,z,textures,appearances) {
        super(scene);
        this.x = x;
		this.y = y;
		this.z = z;

        for (var i=0;i<appearances.length;i++){
            appearances[i].setAmbient(0.1, 0.1, 0.1, 1);
            appearances[i].setDiffuse(0.9, 0.9, 0.9, 1);
            appearances[i].setSpecular(0.1, 0.1, 0.1, 1);
            appearances[i].setShininess(10.0);
            appearances[i].setTexture(textures[i]);
        }

        this.trees = []

        for (var i=0;i<9;i++){
            var randomPos = Math.random() * 5 - 2.5;
            var tree = new MyBillboard(this.scene,this.x,this.y,this.z + (i * 13) + randomPos);
            var randomNum = Math.floor(Math.random() * 3);
            tree.appearance = appearances[randomNum];
            var scaleX = Math.random() * 0.8 - 0.4;
            var scaleZ = Math.random() * 0.8 - 0.4;
            tree.scaleX = scaleX;
            tree.scaleZ = scaleZ;
            this.trees.push(tree);
        } 
    }

    display() {
        for (var i=0;i<this.trees.length;i++){            
            this.trees[i].display();
        }
    }
}