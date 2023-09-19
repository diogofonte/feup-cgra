import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import {MyPanorama} from "./MyPanorama.js"
import { MyBird } from "./MyBird.js";
import { MySizeTestQuads } from "./MySizeTestQuads.js";
import { MyBirdEgg } from "./MyBirdEgg.js";
import { MyTerrain} from "./MyTerrain.js";
import { MyNest } from "./MyNest.js";
import { MyTreeGroupPatch } from "./MyTreeGroupPatch.js";
import { MyTreeRowPatch } from "./MyTreeRowPatch.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.setUpdatePeriod(20)
    
    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.speedFactor = 1;
    this.displayTestQuads = false;

    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    
    this.earthMat = new CGFappearance(this);
    this.earthMat.setAmbient(0.1, 0.1, 0.1, 1);
    this.earthMat.setDiffuse(0.9, 0.9, 0.9, 1);
    this.earthMat.setSpecular(0.1, 0.1, 0.1, 1);
    this.earthMat.setShininess(10.0);
    this.earthMat.loadTexture('images/panoram.jpg');
    this.earthMat.setTextureWrap('REPEAT', 'REPEAT');

    var treeTexta = new CGFtexture(this, "images/billboardtree1.png");
    var treeTextb = new CGFtexture(this, "images/billboardtree2.png");
    var treeTextc = new CGFtexture(this, "images/billboardtree3.png");
    var treeTexts = [treeTexta,treeTextb,treeTextc];

    var patchAppearanceA = new CGFappearance(this);
    var patchAppearanceB = new CGFappearance(this);
    var patchAppearanceC = new CGFappearance(this);
    var patchAppearances = [patchAppearanceA,patchAppearanceB,patchAppearanceC];
    
    //Initialize scene objects
    this.axis = new CGFaxis(this);
    //this.plane = new MyPlane(this,30);
    this.panorama = new MyPanorama(this,this.earthMat);
    this.penguin = new MyBird(this);
    this.testQuad = new MySizeTestQuads(this);
    this.terrain = new MyTerrain(this);
    this.nest = new MyNest(this);
    this.treePatches = [];
    this.treeRows = [];

    for (var i=0;i<2;i++) {
      switch (i) {
        case 0:
          var treePatch = new MyTreeGroupPatch(this,0,-76,-90,treeTexts,patchAppearances);
          break;
        case 1:
          var treePatch = new MyTreeGroupPatch(this,-40,-78,-10,treeTexts,patchAppearances);
          break;
        default:
          break;
      }
      
      this.treePatches.push(treePatch);
    }

    for (var i=0;i<2;i++) {
      switch (i) {
        case 0:
          var treeRow = new MyTreeRowPatch(this,-20,-76,-100,treeTexts,patchAppearances);
          break;
        case 1:
          var treeRow = new MyTreeRowPatch(this,40,-78,-80,treeTexts,patchAppearances);
          break;
        default:
          break;
      }
      
      this.treeRows.push(treeRow);
    }
    
    this.eggNumber = 4;
    this.eggs = [];
    var textEgg = new CGFtexture(this, "images/yoshi.png");
		
    for (var i =0 ;i<this.eggNumber;i++) {
      var egg = new MyBirdEgg(this,1,30,30);
      egg.x = Math.floor(Math.random() * 31);
      egg.y = -87.6;
      egg.z = Math.floor(Math.random() * (0 - (-40) + 1)) - 40;
      egg.texture = textEgg;
      egg.appearance.setTexture(textEgg);

      this.eggs.push(egg);
    }
  }
  
  initLights() {
    this.lights[0].setPosition(0, 0, 0, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
    this.lights[1].setPosition(0.0, 0.0, 0.0, 0.0);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[1].setSpecular(1.0, 1.0, 0.0, 1.0);
    //this.lights[1].disable();
    this.lights[1].setVisible(true);
    this.lights[1].update();
  }

  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(37, -72, 8),
      vec3.fromValues(15, -84.6, -20)
    );
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();
    this.lights[1].update();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section

    this.pushMatrix();

    this.translate(this.camera.position[0],this.camera.position[1],this.camera.position[2]);
    this.panorama.display();

    this.popMatrix();

    this.panorama.display();


    //Bird Display
    this.pushMatrix();
    //this.scale(0.7 * this.scaleFactor,0.7 * this.scaleFactor,0.7 * this.scaleFactor) here in case of mantain h=3
    
    if (this.penguin.speed != 0) {
      this.translate(this.penguin.position[0] + (Math.sin(this.penguin.turnAngle * Math.PI /180) * (this.penguin.speed/60) * (this.speedFactor)),this.penguin.position[1],this.penguin.position[2] + (Math.cos(this.penguin.turnAngle * Math.PI /180) * (this.penguin.speed/60) * (this.speedFactor)));
    } else {
      this.translate(this.penguin.position[0],this.penguin.position[1],this.penguin.position[2]);
    }

    this.scale(0.7 * this.scaleFactor,0.7 * this.scaleFactor,0.7 * this.scaleFactor);
    
    this.penguin.position[0] += (Math.sin(this.penguin.turnAngle * Math.PI /180) * (this.penguin.speed/60) * (this.speedFactor));
    this.penguin.position[2] += (Math.cos(this.penguin.turnAngle * Math.PI /180) * (this.penguin.speed/60) * (this.speedFactor));
    this.penguin.hoverAnimation();
  
    if (this.penguin.turnLeft || this.penguin.turnRight) {
      this.penguin.turn();
    } else {
      this.rotate(this.penguin.turnAngle * Math.PI /180 ,0,1,0);
    }

    if (this.penguin.divingDown || this.penguin.divingUp) {
      this.penguin.dive();
    }
    
    this.penguin.display();
    
    this.popMatrix();

    if (this.displayTestQuads) this.testQuad.display();


    // Terrain
    this.pushMatrix();
    this.terrain.display();
    this.popMatrix();

    this.setActiveShader(this.eggShader);

    // Eggs
    for (var i =0 ;i<this.eggs.length;i++) {
      this.pushMatrix();
      this.translate(this.eggs[i].x,this.eggs[i].y,this.eggs[i].z);
      this.eggs[i].display();
      this.popMatrix();
    }
    
    if (this.penguin.eggs.length > 0) {  
      this.penguin.eggs[0].display();
    }

    if (this.nest.eggs.length > 0) {
      for (let i = 0; i < this.nest.eggs.length; i++) {
        this.pushMatrix();
        if (this.nest.eggs[i].droped) {
          if (this.nest.eggs[i].y - 9.81 / 60 > this.nest.y + 1) { // If it is still falling (gravity acceleration)
            const targetX = this.nest.x + Math.cos((i * 36) * Math.PI / 180) * 3; // Target x position in the nest
            const targetY = this.nest.y + 1; // Target y position in the nest
            const targetZ = this.nest.z + Math.sin((i * 36) * Math.PI / 180) * 3; // Target z position in the nest
            
            const initialX = this.nest.eggs[i].initialX;
            const initialY = this.nest.eggs[i].initialY;
            const initialZ = this.nest.eggs[i].initialZ;
            const currentY = this.nest.eggs[i].y;

            const t = (currentY - initialY) / (targetY - initialY); // Calculate the interpolation factor

            // Apply parabolic interpolation to x and z positions
            const interpolatedX = initialX + (targetX - initialX) * t * t;
            const interpolatedZ = initialZ + (targetZ - initialZ) * t * t;

            
            this.translate(interpolatedX, currentY, interpolatedZ);
            this.nest.eggs[i].y -= 9.81 / 60; // Update the y coordinate
          } else {
            this.nest.eggs[i].droped = false;
          }
        } else {
          this.nest.eggs[i].initialX = this.nest.eggs[i].x;
          this.nest.eggs[i].initialY = this.nest.eggs[i].y;
          this.nest.eggs[i].initialZ = this.nest.eggs[i].z;
          
          this.translate(this.nest.x + Math.cos((i * 36) * Math.PI / 180) * 3, this.nest.y + 1, this.nest.z + Math.sin((i * 36) * Math.PI / 180) * 3);
        }
        
        
        
        this.nest.eggs[i].display();
        this.popMatrix();
      }
    }

    this.setActiveShader(this.defaultShader);
    

    // Nest
    this.nest.display();


    // Billboard 
    for (var i=0;i<this.treePatches.length;i++) {
      this.treePatches[i].display();
    }

    for (var i=0;i<this.treeRows.length;i++) {
      this.treeRows[i].display();
    }
  }

  update(t) {
    this.checkKeys();
  }

  checkKeys() {
    var text="Keys pressed: ";
    var keysPressed=false;
    this.penguin.turnLeft = false;
    this.penguin.turnRight = false;
    // Check for key codes e.g. in https://keycode.info/
    if (this.gui.isKeyPressed("KeyW")) {
      this.penguin.accelerate(true);
      keysPressed=true;
    }
    if (this.gui.isKeyPressed("KeyS")) {
      this.penguin.accelerate(false);
      keysPressed=true;
    }
    if (this.gui.isKeyPressed("KeyA")) {
      if (!this.penguin.turnRight) {
        this.penguin.turnLeft = true;
      }
      keysPressed=true;
    }
    if (this.gui.isKeyPressed("KeyD")) {
      if (!this.penguin.turnLeft){
        this.penguin.turnRight = true;
      }
      keysPressed=true;
    }
    if (this.gui.isKeyPressed("KeyR")) {
      this.penguin.resetBird();
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("KeyP")) {
      if (!this.penguin.divingDown && !this.penguin.divingUp) {
        this.penguin.divingDown = true;
        keysPressed = true;
      }
    }
    if (this.gui.isKeyPressed("KeyO")) {
      if (this.penguin.eggs.length != 0) {
        if (!this.penguin.eggs[0].droped){
          this.penguin.releaseEgg();
        }
      }
    }
  } 
}