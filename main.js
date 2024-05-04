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
 
// 加载FBX文件
BABYLON.SceneLoader.ImportMesh("", "camel/walk.glb", "", scene, function (newMeshes) {
    // 这里可以处理加载后的Mesh，例如调整尺寸、位置等
    // newMeshes[0].scaling = new BABYLON.Vector3(100, 100, 100);
    newMeshes[0].rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
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