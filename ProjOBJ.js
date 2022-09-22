//import * as three from 'three';
//import { getMaterial } from './main.js'
//import { FontLoader } from 'FontLoader';
//import { TextGeometry } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
//
//
//
//
//
//export function TextBoundingBox(scene)
//{
//    let TextCollider2
//     var invisMater = new three.MeshPhongMaterial({visible: true})
//     var textCollidergeom = new three.BoxGeometry(18, 2.5, 3);
//     TextCollider2 = new three.Mesh(
//         textCollidergeom,
//         invisMater
//     )
//     scene.add(TextCollider2);
//     return TextCollider2;
//}
//
//export function InteractableText(scene)
//{
//    
//
//    let sfmlMesh;
//        const Fontloader = new FontLoader();
//        Fontloader.load('Gameplay_Regular.json', function (font) {
//            const tGeometry = new TextGeometry('/SFML-GUI', {
//                font: font,
//        		size: 1,
//        		height: 1
//            });
//            sfmlMesh = new three.Mesh(tGeometry, [
//                new three.MeshPhongMaterial({ emissive: 0x00ff00}),
//                new three.MeshPhongMaterial({ color: 0x00ff00})
//            ]);
//            //sfmlMesh.rotation.x =  proj.rotation.x;
//            //sfmlMesh.rotation.y =  proj.rotation.y;
//            //sfmlMesh.rotation.z =  proj.rotation.z;
//            //sfmlMesh.position.x =  proj.position.x-15;
//            //sfmlMesh.position.y =  proj.position.y+11;
//            //sfmlMesh.position.z =  proj.position.z+3;
//            scene.add(sfmlMesh);
//            return sfmlMesh;
//        });
//
//    }
//
//
//export function initTextMesh(scene, proj, x,y,z,rx,ry,rz,text, textSize) {
//        let textmesh;
//        const Fontloader = new FontLoader();
//        Fontloader.load('Gameplay_Regular.json', function (font) {
//            const tGeometry = new TextGeometry(text, {
//                font: font,
//        		size: textSize,
//        		height: textSize
//            });
//            textmesh = new three.Mesh(tGeometry, [
//                new three.MeshPhongMaterial({ emissive: 0x00ff00}),
//                new three.MeshPhongMaterial({ color: 0x00ff00})
//            ]);
//            textmesh.rotation.x = rx;
//            textmesh.rotation.y = ry;
//            textmesh.rotation.z = rz;
//            textmesh.position.x = x;
//            textmesh.position.y = y;
//            textmesh.position.z = z;
//            scene.add(textmesh);
//            return textmesh;
//        });
//        return textmesh;
//    }
//
// export function initText(scene, proj, x,y,z,rx,ry,rz,text, isCollideable = false) {
//     //let text = text;
//     
//     
//     //collider
//     var textCollider
//     if (isCollideable) {
//         const invisMat = new three.MeshPhongMaterial({visible: false})
//         var textCollidergeom = new three.BoxGeometry(12, 2.5, 3);
//         textCollider = new three.Mesh(
//             textCollidergeom,
//             invisMat
//         )
//         scene.add(textCollider);
//         
//     }
//     return textCollider;
//     
// }
////
//   // export function updateText(enlarge, proj, )
//   // {
//   //     if (enlarge) {
//   //         console.log('lol')
//   //         if ( sfmlGuiMesh.scale.x > 1.05) {
//   //            sfmlGuiMesh.scale.x = 1.05;
//   //            sfmlGuiMesh.scale.y = 1.05;
//   //            sfmlGuiMesh.scale.z = 1.05;
//   //         }
//   //          sfmlGuiMesh.scale.x += 0.01;
//   //          sfmlGuiMesh.scale.y += 0.01;
//   //          sfmlGuiMesh.scale.z += 0.01;
//   //       }
//   //       else {
//   //          sfmlGuiMesh.scale.x -= 0.01;
//   //          sfmlGuiMesh.scale.y -= 0.01;
//   //          sfmlGuiMesh.scale.z -= 0.01;
//   //         if ( sfmlGuiMesh.scale.x < 1) {
//   //            sfmlGuiMesh.scale.x = 1;
//   //            sfmlGuiMesh.scale.y = 1;
//   //            sfmlGuiMesh.scale.z = 1;
//   //         }
//   //       }
////
////
////
//   //      //textCollider.position.x =  proj.position.x-12;
//   //      //textCollider.position.y =  proj.position.y+12;
//   //      //textCollider.position.z =  proj.position.z+6;
//////
//   //      //textCollider.rotation.x =  proj.rotation.x;
//   //      //textCollider.rotation.y =  proj.rotation.y;
//   //      //textCollider.rotation.z =  proj.rotation.z;
//   // }
////
////
//   // 
//   //
//    export function initProj(scene) {
//
//        // boxSize = new three.Vector3(30, 40, 7)
//
//
//        var projGeo = new three.BoxGeometry(30,40,7);
//        var proj = new three.Mesh(
//            projGeo,
//            getMaterial(projGeo, 0.6),
//        );
//        proj = proj;
//        setPos(proj);
//
//        //init Text on the board 
//        initTextMesh(scene, proj,
//            proj.position.x-7,
//            proj.position.y+16,
//            proj.position.z+3,
//            proj.rotation.x,
//            proj.rotation.y,
//            0,
//            'Projects'           
//            );
//        var sfmlGui =  initText(scene,  proj,
//            proj.position.x-15,
//            proj.position.y+11,
//            proj.position.z+3,
//            proj.rotation.x,
//            proj.rotation.y,
//            0,
//            '/sfml-gui',
//            true         
//            );
//
//        var textmesh =  initTextMesh(scene,  proj,
//            proj.position.x-15,
//            proj.position.y+11,
//            proj.position.z+3,
//            proj.rotation.x,
//            proj.rotation.y,
//            0,
//            '/sfml-gui');
////
//        ////init Text on the board ^
//        
//        scene.add(proj);
//        
//        //console.log(proj.position.x);
//        return proj;
//    }
//
//    export function setPos(proj) {
//         proj.position.x = 30;
//         proj.position.y = 0;
//         proj.rotation.x = 0;
//         proj.rotation.y = -0.6; //2.4
//         proj.rotation.z = 0;
//    }



