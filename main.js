//import Nebula, {SpriteRenderer} from "./node_modules/three-nebula/build/three-nebula.js";
import * as three from 'three';
import {RenderPass} from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/postprocessing/RenderPass.js';
import {EffectComposer} from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/postprocessing/EffectComposer';
import {UnrealBloomPass} from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/postprocessing/UnrealBloomPass';
import json from "./particles.json" assert {type: "json"};
import { FontLoader } from 'FontLoader';
import { TextGeometry } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import * as Proj from './ProjOBJ.js';



const CAMERA_Z = 60
var Rot = 0;
var Rot2 = 0;
const Cones = [0,0,0,0];
const Cones2 = [0,0,0,0];
var enlargeTwitter = false;
var bloomAnim = true;
var camanim = true;
var enlargeName = false;
var enlargeSfmlGUI = false;
var enlargeSeaside = false;
var enlargeController = false;
var enlargeClicker = false;
const scene = new three.Scene();
const camera = new three.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 1000);



const renderer = new three.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(CAMERA_Z);


const RenderScene = new RenderPass(scene, camera);
const composer = new EffectComposer(renderer);
composer.addPass(RenderScene);

const bloomPass = new UnrealBloomPass(
  new three.Vector2(window.innerWidth, window.innerHeight),
  0.5,
  0.1,
  0.1
);


composer.addPass(bloomPass);

//renderer.toneMapping = three.CineonToneMapping;
//renderer.toneMappingExposure = 1.5;


// returns green outline material.
export function getMaterial(geom, thickness = 0.2) {
  return new three.ShaderMaterial({
    uniforms: {
      size: {
        value: new three.Vector3(geom.parameters.width, geom.parameters.height, geom.parameters.depth).multiplyScalar(0.5)
      },
      thickness: {
      	value: thickness
      },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
  });
}



//ambient lighting
const ambientLight = new three.AmbientLight(0xffffff);
scene.add(ambientLight);


var geom = new three.BoxGeometry(10, 10, 10);
const cube = new three.Mesh(
  geom,
  getMaterial(geom, 0.8),
);

// Cones underneath floating Sign;

for (var i = 0; i < 3; i++) {
  var ConeGeom = new three.BoxGeometry(1.42, 2, 2.5);
  Cones[i] = new three.Mesh(ConeGeom, getMaterial(ConeGeom));
  Rot += 90;
  Cones[i].rotation.y = Rot;
  Cones[i].rotation.z = 0;
  Cones[i].rotation.x = 0.1;

  Cones[i].position.x = -9;
  Cones[i].position.y = 16.6;
  Cones[i].position.z = -4;

  scene.add(Cones[i]);
}
for (var i = 0; i < 3; i++) {
  var ConeGeom2 = new three.BoxGeometry(1.42, 2, 2.5);
  Cones2[i] = new three.Mesh(ConeGeom2, getMaterial(ConeGeom2));
  Rot2 += 90;
  Cones2[i].rotation.y = Rot2;
  Cones2[i].rotation.z = 0;
  Cones2[i].rotation.x = 0.1;

  Cones2[i].position.x = -22;
  Cones2[i].position.y = 16.6;
  Cones2[i].position.z = 3;

  scene.add(Cones2[i]);
}


var signGeo = new three.BoxGeometry(20, 5, 4);
const sign = new three.Mesh(
  signGeo, 
  getMaterial(signGeo),
);
sign.position.x = -15;
sign.position.y = 20;

sign.rotation.x = 0;
sign.rotation.y = 0.5;
sign.rotation.z = 0;

//textmesh

///
let text = "Clearly";
let textmesh;
const Fontloader = new FontLoader();
Fontloader.load('Gameplay_Regular.json', function (font) {
  const tGeometry = new TextGeometry(text, {
    font: font,
		size: 2,
		height: 5
  });
  textmesh = new three.Mesh(tGeometry, [
    new three.MeshPhongMaterial({ emissive: 0x00ff00}),
    new three.MeshPhongMaterial({ color: 0x00ff00})
  ]);
  textmesh.rotation.x = sign.rotation.x;
  textmesh.rotation.y = sign.rotation.y;
  textmesh.rotation.z = sign.rotation.z;
  scene.add(textmesh);
});

const invisMat = new three.MeshPhongMaterial({visible: false});
var TextCollidergeom = new three.BoxGeometry(16, 5, 7);
const textCollider = new three.Mesh(
  TextCollidergeom,
  invisMat
  
);
scene.add(textCollider);
const pointer = new three.Vector2();
const raycaster = new three.Raycaster();
const onMouseMove = (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {

    //if (intersects[0].object.id > 40 && intersects[0].object.id != 828) {
    //  intersects[0].object.position.set(intersects[0].object.position.x, intersects[0].object.position.y, intersects[0].object.position.z +0.1 );
    //}
    if (intersects[0].object.id == 23 ) {
      enlargeName = true;
      document.getElementById("point").style.cursor = "pointer";     
    }
    else{
      document.getElementById("point").style.cursor = "default";
      enlargeName = false;
      enlargeTwitter = false;
      enlargeSfmlGUI = false;
      enlargeSeaside = false;
      enlargeController = false;
      enlargeClicker = false;
    }
    if (intersects[0].object.id == 25) {
      enlargeSfmlGUI = true;
      document.getElementById("point").style.cursor = "pointer";  
    }
    if (intersects[0].object.id == 26) {
      enlargeSeaside = true;
      document.getElementById("point").style.cursor = "pointer";  
    }
    if (intersects[0].object.id == 27) {
      enlargeController = true;
      document.getElementById("point").style.cursor = "pointer";  
    }
    if (intersects[0].object.id == 28) {
      enlargeClicker = true;
      document.getElementById("point").style.cursor = "pointer";  
    }
    if (intersects[0].object.id == 828) {
      enlargeTwitter = true;
      document.getElementById("point").style.cursor = "pointer";  
    }
  }
  else {
    enlargeName = false;
    enlargeSfmlGUI = false;
    document.getElementById("point").style.cursor = "default";
  }
}
const onMouseClick = (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {
    if (intersects[0].object.id == 23) {
      window.open("https://github.com/clearlyyy");
    }
    else if (intersects[0].object.id == 25) {
      window.open("https://github.com/clearlyyy/sfml-gui")
    }
    else if (intersects[0].object.id == 26) {
      window.open("https://github.com/SeasideRoleplay")
    }
    else if (intersects[0].object.id == 27) {
      window.open("https://github.com/clearlyyy/Controller-Tester")
    }
    else if (intersects[0].object.id == 28) {
      window.open("https://github.com/clearlyyy/clear-clicker")
    }
    else if (intersects[0].object.id == 828) {
      window.open("https://twitter.com/devclearly")
    }
    console.log(intersects[0].object.id);   
  }  
}

window.addEventListener('mousemove',onMouseMove);
window.addEventListener('mousedown',onMouseClick);
var projGeo = new three.BoxGeometry(30,40,7);
//var projGeo = new three.BoxGeometry(0,0,0);
var proj = new three.Mesh(
    projGeo,
    getMaterial(projGeo, 0.6),
);
scene.add(proj)
proj.position.x = 30;
         proj.position.y = 0.5;
         proj.rotation.x = 0;
         proj.rotation.y = -0.45; //2.4 -0.6
         proj.rotation.z = 0;
var projectHeaderText = Proj.initTextMesh(scene, proj,
  proj.position.x-9.5,
  proj.position.y+15,
  proj.position.z+2,
  proj.rotation.x,
  proj.rotation.y,
  0,
  'Projects',
  1.8         
  );
var sfmlDesc = Proj.initTextMesh(scene, proj,
    proj.position.x-15,
    proj.position.y+9.5,
    proj.position.z+3,
    proj.rotation.x,
    proj.rotation.y,
    0,
    'Lightweight, Powerful GUI framework',
    0.6          
    );
scene.add(sfmlDesc);
var sfmlDesc2 = Proj.initTextMesh(scene, proj,
  proj.position.x-15,
  proj.position.y+8.5,
  proj.position.z+3,
  proj.rotation.x,
  proj.rotation.y,
  0,
  'made to be used with SFML in C++.',
  0.6         
  );
scene.add(sfmlDesc2);

var seaSideDesc = Proj.initTextMesh(scene, proj,
  proj.position.x-15,
  proj.position.y+4.5,
  proj.position.z+3,
  proj.rotation.x,
  proj.rotation.y,
  0,
  'Grand Theft Auto 5 Modded Server,',
  0.6         
  );
scene.add(seaSideDesc);
var seaSideDesc2 = Proj.initTextMesh(scene, proj,
  proj.position.x-15,
  proj.position.y+3.5,
  proj.position.z+3,
  proj.rotation.x,
  proj.rotation.y,
  0,
  'Created with Lua and Javascript',
  0.6         
  );
scene.add(seaSideDesc2);

var controllerDesc = Proj.initTextMesh(scene, proj,
  proj.position.x-15,
  proj.position.y+0,
  proj.position.z+3,
  proj.rotation.x,
  proj.rotation.y,
  0,
  'Program made to Test XINPUT Devices,',
  0.6         
  );
scene.add(controllerDesc);
var controllerDesc2 = Proj.initTextMesh(scene, proj,
  proj.position.x-15,
  proj.position.y-1,
  proj.position.z+3,
  proj.rotation.x,
  proj.rotation.y,
  0,
  'Made using /sfml-gui, in C++',
  0.6         
  );
scene.add(controllerDesc2);
var clickerDesc = Proj.initTextMesh(scene, proj,
  proj.position.x-15,
  proj.position.y-4.5,
  proj.position.z+3,
  proj.rotation.x,
  proj.rotation.y,
  0,
  'Powerful AutoClicker With Terminal Colors',
  0.6         
  );
scene.add(clickerDesc);
var clickerDesc2 = Proj.initTextMesh(scene, proj,
  proj.position.x-15,
  proj.position.y-5.5,
  proj.position.z+3,
  proj.rotation.x,
  proj.rotation.y,
  0,
  'And Range-Based CPS, made in C++ ',
  0.6         
  );
scene.add(clickerDesc2);

  function TextBoundingBox(scene, width = 14)
  {
      let TextCollider2
       var invisMater = new three.MeshPhongMaterial({visible: false})
       var textCollidergeom = new three.BoxGeometry(width, 2.5, 3);
       TextCollider2 = new three.Mesh(
           textCollidergeom,
           invisMater
       )
       scene.add(TextCollider2);
       return TextCollider2;
  }

let sfmlTextBoundingBox = TextBoundingBox(scene);
let sfmlText;
      //const Fontloader = new FontLoader();
      Fontloader.load('Gameplay_Regular.json', function (font) {
          const tGeometry = new TextGeometry('/SFML-GUI', {
              font: font,
      		size: 1.3,
      		height: 1.3
          });
          sfmlText = new three.Mesh(tGeometry, [
              new three.MeshPhongMaterial({ emissive: 0x00ff00}),
              new three.MeshPhongMaterial({ color: 0x00ff00})
          ]);
          console.log("BRUH");
          sfmlText.position.set(proj.position.x-15,proj.position.y+11,proj.position.z+3);
          sfmlText.rotation.x =  proj.rotation.x;
          sfmlText.rotation.y =  proj.rotation.y;
          sfmlText.rotation.z =  proj.rotation.z;
          //sfmlMesh.position.x =  proj.position.x-15;
          //sfmlMesh.position.y =  proj.position.y+11;
          //sfmlMesh.position.z =  proj.position.z+3;
          scene.add(sfmlText);
      });

var sfmlDesc = Proj.initText();

let seaSideBoundingBox = TextBoundingBox(scene, 25);
let seaSideText;
      //const Fontloader = new FontLoader();
      Fontloader.load('Gameplay_Regular.json', function (font) {
          const tGeometry = new TextGeometry('/Seaside Roleplay', {
              font: font,
      		size: 1.3,
      		height: 1.3
          });
          seaSideText = new three.Mesh(tGeometry, [
              new three.MeshPhongMaterial({ emissive: 0x00ff00}),
              new three.MeshPhongMaterial({ color: 0x00ff00})
          ]);
          seaSideText.position.set(proj.position.x-15,proj.position.y+6,proj.position.z+3);
          seaSideText.rotation.x =  proj.rotation.x;
          seaSideText.rotation.y =  proj.rotation.y;
          seaSideText.rotation.z =  proj.rotation.z;
          //sfmlMesh.position.x =  proj.position.x-15;
          //sfmlMesh.position.y =  proj.position.y+11;
          //sfmlMesh.position.z =  proj.position.z+3;
          scene.add(seaSideText);
      });

let controllerBoundingBox = TextBoundingBox(scene, 25);
let controllerText;
      Fontloader.load('Gameplay_Regular.json', function (font) {
          const tGeometry = new TextGeometry('/Controller-Tester', {
              font: font,
          size: 1.15,
          height: 1.15
          });
          controllerText = new three.Mesh(tGeometry, [
              new three.MeshPhongMaterial({ emissive: 0x00ff00}),
              new three.MeshPhongMaterial({ color: 0x00ff00})
          ]);
          controllerText.position.set(proj.position.x-15,proj.position.y+1.2,proj.position.z+3);
          controllerText.rotation.x =  proj.rotation.x;
          controllerText.rotation.y =  proj.rotation.y;
          controllerText.rotation.z =  proj.rotation.z;
          scene.add(controllerText);
      });

let clickerBoundingBox = TextBoundingBox(scene, 17);
let clickerText;
      //const Fontloader = new FontLoader();
      Fontloader.load('Gameplay_Regular.json', function (font) {
          const tGeometry = new TextGeometry('/clear-clicker', {
              font: font,
          size: 1.15,
          height: 1.15
          });
          clickerText = new three.Mesh(tGeometry, [
              new three.MeshPhongMaterial({ emissive: 0x00ff00}),
              new three.MeshPhongMaterial({ color: 0x00ff00})
          ]);
          clickerText.position.set(proj.position.x-15,proj.position.y-3.2,proj.position.z+3);
          clickerText.rotation.x =  proj.rotation.x;
          clickerText.rotation.y =  proj.rotation.y;
          clickerText.rotation.z =  proj.rotation.z;
          scene.add(clickerText);
        });
  var descBoardGeom = new three.BoxGeometry(32, 20, 10);
  const desc = new three.Mesh(
    descBoardGeom,
    getMaterial(descBoardGeom, 0.7),
  );
  scene.add(desc);
  
  desc.position.set(-29,-10,0);
  desc.rotation.set(0,0.4,0);

  var DescText = Proj.initTextMesh(scene, proj,desc.position.x-11.5,desc.position.y+7.5,desc.position.z+10,desc.rotation.x,desc.rotation.y,0,
    'Hi, Im Clearly. im a c++ Developer,',
    0.9         
    );
  scene.add(DescText);
  var DescText2 = Proj.initTextMesh(scene, proj,desc.position.x-11.5,desc.position.y+6,desc.position.z+10,desc.rotation.x,desc.rotation.y,0,
    'with 4+ years experience',
    0.9         
    );
  scene.add(DescText2);
  var DescText3 = Proj.initTextMesh(scene, proj,desc.position.x-11.5,desc.position.y+4.5,desc.position.z+10,desc.rotation.x,desc.rotation.y,0,
    'in a multitude of languages and',
    0.9         
    );
  scene.add(DescText3);
  var DescText3 = Proj.initTextMesh(scene, proj,desc.position.x-11.5,desc.position.y+3,desc.position.z+10,desc.rotation.x,desc.rotation.y,0,
    'and tools, Right now i mainly',
    0.9         
    );
  scene.add(DescText3);
  var DescText3 = Proj.initTextMesh(scene, proj,desc.position.x-11.5,desc.position.y+1.5,desc.position.z+10,desc.rotation.x,desc.rotation.y,0,
    'focus on framework development ',
    0.9         
    );
  scene.add(DescText3);
  var DescText3 = Proj.initTextMesh(scene, proj,desc.position.x-11.5,desc.position.y,desc.position.z+10,desc.rotation.x,desc.rotation.y,0,
    'and making games. Message me',
    0.9         
    );
  scene.add(DescText4);
  var DescText4 = Proj.initTextMesh(scene, proj,desc.position.x-11.5,desc.position.y-1.5,desc.position.z+10,desc.rotation.x,desc.rotation.y,0,
    'if you need a developer!',
    0.9         
    );
  scene.add(DescText4);
  let twitterText;
      Fontloader.load('Gameplay_Regular.json', function (font) {
          const tGeometry = new TextGeometry('twitter:  devclearly', {
              font: font,
      		size: 0.9,
      		height: 0.9
          });
          twitterText = new three.Mesh(tGeometry, [
              new three.MeshPhongMaterial({ emissive: 0x00ff00}),
              new three.MeshPhongMaterial({ color: 0x00ff00})
          ]);
          twitterText.position.set(desc.position.x-11.5,desc.position.y-6,desc.position.z+10);
          twitterText.rotation.x =  desc.rotation.x;
          twitterText.rotation.y =  desc.rotation.y;
          twitterText.rotation.z =  desc.rotation.z;
          scene.add(twitterText);
      });
  var DescText4 = Proj.initTextMesh(scene, proj,desc.position.x-11.5,desc.position.y-8,desc.position.z+10,desc.rotation.x,desc.rotation.y,0,
    'check out some of my projects!',
    0.9         
    );
  scene.add(DescText4);
  window.addEventListener( 'resize', onWindowResize, false );
  
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}


var PostRot = 0;
const Posts = [0,0,0,0];
for (var i = 0; i < 3; i++) {
  var PostsGeom = new three.BoxGeometry(1.42, 10, 2.5);
  Posts[i] = new three.Mesh(PostsGeom, getMaterial(PostsGeom));
  Rot += 90;
  Posts[i].rotation.y = Rot;
  Posts[i].rotation.z = 0;
  Posts[i].rotation.x = 0.1;

  Posts[i].position.x = 20;
  Posts[i].position.y = -20;
  Posts[i].position.z = -5;

  scene.add(Posts[i]);
}
var PostRot = 0;
const Posts2 = [0,0,0,0];
for (var i = 0; i < 3; i++) {
  var Posts2Geom = new three.BoxGeometry(1.42, 10, 2.5);
  Posts2[i] = new three.Mesh(Posts2Geom, getMaterial(Posts2Geom));
  Rot += 90;
  Posts2[i].rotation.y = Rot;
  Posts2[i].rotation.z = 0;
  Posts2[i].rotation.x = 0;

  Posts2[i].position.x = 39;
  Posts2[i].position.y = -20;
  Posts2[i].position.z = 6;

  scene.add(Posts2[i]);
}
scene.add(cube)

function createCube(x,y,z, rot=0)
{
  var geom = new three.BoxGeometry(10, 10, 10);
  const cube = new three.Mesh(
  geom,
  getMaterial(geom),
  );
  scene.add(cube);
  cube.position.set(x,y,z);
  cube.rotation.set(0,rot,0);
  return cube;
}
//INIT WALLS ->
for (var i = 0; i < 22; i++)
{
  for (var j = 0; j < 11; j++)
  {
    createCube(j*10-50,-27,i*10-28);
  }
}

//for (var i = 0; i < 11; i++)
//{
//  for (var j = 0; j < 10; j++)
//  {
//    createCube(j*10-50,i*10-27,-37);
//  }
//}
//for (var i = 0; i < 10; i++)
//{
//  for (var j = 0; j < 22; j++)
//  {
//    createCube(-50.1,i*10-27,j*10-50);
//  }
//}
//for (var i = 0; i < 10; i++)
//{
//  for (var j = 0; j < 22; j++)
//  {
//    createCube(50.1,i*10-27,j*10-50);
//  }
//}
let twitterBoundingBox = TextBoundingBox(scene, 18);
twitterBoundingBox.position.set(-32,-15,10)
twitterBoundingBox.rotation.set(desc.rotation.x, desc.rotation.y,desc.rotation.z)
function scaleUpdate(enlarge, mesh)
{
  if (enlarge) {
    if ( mesh.scale.x > 1.2) {
       mesh.scale.x = 1.2;
       mesh.scale.y = 1.2;
       mesh.scale.z = 1.2;
    }
     mesh.scale.x += 0.01;
     mesh.scale.y += 0.01;
     mesh.scale.z += 0.01;
  }
  else {
     mesh.scale.x -= 0.01;
     mesh.scale.y -= 0.01;
     mesh.scale.z -= 0.01;
    if ( mesh.scale.x < 1) {
       mesh.scale.x = 1;
       mesh.scale.y = 1;
       mesh.scale.z = 1;
    }
  }
}
bloomPass.strength = 4
camera.position.z = 300
camera.fov = 10;
document.getElementById("point").click();
camera.updateProjectionMatrix();

function animate() {
  requestAnimationFrame(() => animate());
  
  
  //intro bloom anim
  if (bloomAnim)
  {
    if (bloomPass.strength <= 0.5)
    {
      bloomAnim = false;
    }
    bloomPass.strength -= 0.02;
  }
  if (camanim) {
    camera.fov += 0.18;
    //console.log(camera.fov)
    camera.updateProjectionMatrix();
    if (camera.position.z >= 80)
    {
      camera.position.z -= 1;
    }
    if (camera.position.z <=80)
    {
      camera.position.z -= 0.4;
    }
    if (camera.position.z <= 60)
    {
      camanim = false;
    }
  }
  //


  cube.rotation.x += 0.01;
  cube.rotation.y += 0.005;
  cube.rotation.z += 0.01;
  onMouseMove;

  sfmlTextBoundingBox.position.x =  proj.position.x-11;
  sfmlTextBoundingBox.position.y =  proj.position.y+12;
  sfmlTextBoundingBox.position.z =  proj.position.z+6;

  sfmlTextBoundingBox.rotation.x =  proj.rotation.x;
  sfmlTextBoundingBox.rotation.y =  proj.rotation.y;
  sfmlTextBoundingBox.rotation.z =  proj.rotation.z;
  
  seaSideBoundingBox.position.x =  proj.position.x-6;
  seaSideBoundingBox.position.y =  proj.position.y+7;
  seaSideBoundingBox.position.z =  proj.position.z+10;

  seaSideBoundingBox.rotation.x =  proj.rotation.x;
  seaSideBoundingBox.rotation.y =  proj.rotation.y;
  seaSideBoundingBox.rotation.z =  proj.rotation.z;

  controllerBoundingBox.position.x =  proj.position.x-6;
  controllerBoundingBox.position.y =  proj.position.y+2;
  controllerBoundingBox.position.z =  proj.position.z+10;

  controllerBoundingBox.rotation.x =  proj.rotation.x;
  controllerBoundingBox.rotation.y =  proj.rotation.y;
  controllerBoundingBox.rotation.z =  proj.rotation.z;

  clickerBoundingBox.position.x =  proj.position.x-9;
  clickerBoundingBox.position.y =  proj.position.y-2.4;
  clickerBoundingBox.position.z =  proj.position.z+10;

  clickerBoundingBox.rotation.x =  proj.rotation.x;
  clickerBoundingBox.rotation.y =  proj.rotation.y;
  clickerBoundingBox.rotation.z =  proj.rotation.z;

  textCollider.position.x = sign.position.x+1;
  textCollider.position.y = sign.position.y;
  textCollider.position.z = sign.position.z+2;

  textCollider.rotation.x = sign.rotation.x;
  textCollider.rotation.y = sign.rotation.y;
  textCollider.rotation.z = sign.rotation.z;

  if (textmesh) {scaleUpdate(enlargeName, textmesh);}
  if (sfmlText){scaleUpdate(enlargeSfmlGUI, sfmlText);}
  if (seaSideText){scaleUpdate(enlargeSeaside, seaSideText);}
  if (controllerText){scaleUpdate(enlargeController, controllerText);}
  if (clickerText){scaleUpdate(enlargeClicker, clickerText);}
  if (twitterText){scaleUpdate(enlargeTwitter, twitterText);}

  for (var i = 0; i < 3; i++) {
    Cones[i].rotation.y += 0.01;
    Cones2[i].rotation.y += 0.01;
  }

  //Animate
  for (var i = 0; i < 3; i++) {
    if (Cones[i].position.y > 16) {
      moveSpeed = -0.01
    }
    if (Cones[i].position.y < 14) {
      moveSpeed = 0.01
    }
    Cones[i].position.y += moveSpeed;
    Cones2[i].position.y += moveSpeed;
  }
  if (textmesh) {
  textmesh.position.x = sign.position.x - 7.3;
  textmesh.position.y = sign.position.y - 1.4;
  textmesh.position.z = sign.position.z + 2.5;
  }
  
  sign.position.y += moveSpeed;
  //nebula.update();
  composer.render(scene, camera);
}

//Nebula.fromJSONAsync(json, three).then(loaded => {
//  const nebulaRenderer = new SpriteRenderer(scene, three);
//  const nebula = loaded.addRenderer(nebulaRenderer);
//  //loaded.emitters.forEach(emitter => {
//  //  emitter.position.x = -22;
//  //  emitter.position.y = 16.6;
//  //  emitter.position.z = 3;
//  //})
//  animate(nebula, loaded);
//});
scene.add(sign);

//scene.add(cube);
var moveSpeed = 0.02;
animate();

