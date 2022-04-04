//It's like theyre bushes now I liked this

let snowman = class {


    constructor(name, height){
        this.name = name;
        this.height = height;
    }
    build(x, z){

    for(let i = 0; i < this.height * 1.5; i+=1.5){

    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 4-i*0.75, segments: 2}, scene);


var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
myMaterial.diffuseColor = new BABYLON.Color3(.84, .95, .70);

   sphere.material = myMaterial;

    sphere.position.y = -0.5 + i;
    sphere.position.x = x;
    sphere.position.z = z;
    }


    }

}


let scooter = new snowman('Scooter', 3);
let scooter2 = new snowman('Scooter2', 2);
let scooter3 = new snowman('Scooter3', 1);
console.log(scooter); 


var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });

}

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);





    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

   

    scooter.build(0, 0, 0);
    scooter2.build(2, 2, 2);
    scooter3.build(-2, 2, -2);

    return scene;
};
        window.initFunction = async function() {
            
            
            var asyncEngineCreation = async function() {
                try {
                return createDefaultEngine();
                } catch(e) {
                console.log("the available createEngine function failed. Creating the default engine instead");
                return createDefaultEngine();
                }
            }

            window.engine = await asyncEngineCreation();
if (!engine) throw 'engine should not be null.';
startRenderLoop(engine, canvas);
window.scene = createScene();};
initFunction().then(() => {sceneToRender = scene                    
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});