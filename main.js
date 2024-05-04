// 引入Babylon.js
import * as BABYLON from 'babylonjs';
import * as loader from 'babylonjs-loaders';
 
// 创建Babylon场景
const canvas = document.getElementById('renderCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);
 
// 添加相机和光源
const camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0), scene);
const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
 
// 创建一个简单的用户界面
scene.createDefaultCameraOrLight(true);
scene.activeCamera.attachControl(canvas, false);
let camel = null;
// 加载glb文件
BABYLON.SceneLoader.ImportMesh("", "camel/idle.glb", "", scene, function (newMeshes) {
    camel?.dispose();
    camel = newMeshes[0];
    // 这里可以处理加载后的Mesh，例如调整尺寸、位置等
    newMeshes[0].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    newMeshes[0].rotation = new BABYLON.Vector3(0, -Math.PI / 2, 0);
    newMeshes[0].position = new BABYLON.Vector3(0, -0.5, 0);
});
// 进入渲染循环
engine.runRenderLoop(function () {
    scene.render();
});
 
// 监听浏览器窗口大小变化
window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    engine.resize();
});

// 监听postMessage信息并更换骆驼模型
window.addEventListener("message", function (event) {
    if (event.data === "walk") {
        BABYLON.SceneLoader.ImportMesh("", "camel/walk.glb", "", scene, function (newMeshes) {
            camel?.dispose();
            camel = newMeshes[0];
            newMeshes[0].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
            newMeshes[0].rotation = new BABYLON.Vector3(0, -Math.PI / 2, 0);
            newMeshes[0].position = new BABYLON.Vector3(0, -0.5, 0);
        });
    } else if (event.data === "run") {
        BABYLON.SceneLoader.ImportMesh("", "camel/run.glb", "", scene, function (newMeshes) {
            camel?.dispose();
            camel = newMeshes[0];
            newMeshes[0].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
            newMeshes[0].rotation = new BABYLON.Vector3(0, -Math.PI / 2, 0);
            newMeshes[0].position = new BABYLON.Vector3(0, -0.5, 0);
        });
    } else if (event.data === "dead") {
        BABYLON.SceneLoader.ImportMesh("", "camel/dead.glb", "", scene, function (newMeshes) {
            camel?.dispose();
            camel = newMeshes[0];
            newMeshes[0].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
            newMeshes[0].rotation = new BABYLON.Vector3(0, -Math.PI / 2, 0);
            newMeshes[0].position = new BABYLON.Vector3(0, -0.5, 0);
        });
    } else {
        BABYLON.SceneLoader.ImportMesh("", "camel/idle.glb", "", scene, function (newMeshes) {
            camel?.dispose();
            camel = newMeshes[0];
            newMeshes[0].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
            newMeshes[0].rotation = new BABYLON.Vector3(0, -Math.PI / 2, 0);
            newMeshes[0].position = new BABYLON.Vector3(0.5, -0.5, 0);
        });
    }
});