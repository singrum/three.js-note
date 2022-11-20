let camera, scene, renderer;
window.addEventListener("resize", onResize, false);
function onResize(){
    camera.aspect = window.innerWidth / (window.innerHeight);
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function init(){
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set(-40,50,40);
    camera.lookAt(scene.position);


    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-10, 70, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);
    


    let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(100,100,1,1),
        new THREE.MeshLambertMaterial({color: 0xffffff})
        );
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0,0,0);
    plane.receiveShadow = true;
    scene.add(plane);


    
    const cubeLength = 4;
    let cube = new THREE.Mesh(
        new THREE.BoxGeometry(cubeLength,cubeLength,cubeLength),
        new THREE.MeshLambertMaterial({color: 0x00ffff})
    );
    cube.matrixAutoUpdate = false;
    cube.castShadow = true;
    scene.add(cube);

    let i = 0;
    let j = 0;
    let start = true
    let stepX = 0;
    let stepZ = 0;
    let direction = 0;
    function renderScene(){
        j += 0.002;
        camera.position.x = 50 * Math.cos(j);
        camera.position.z = 50 * Math.sin(j);
        camera.lookAt(scene.position);
        if(start){
            i += 0.05;
            if(direction === 0){
                cube.matrix = new THREE.Matrix4().makeTranslation(stepX * cubeLength,0,cubeLength/2 + stepZ* cubeLength).multiply(
                    new THREE.Matrix4().makeRotationX(i).multiply(
                    new THREE.Matrix4().makeTranslation(0,cubeLength/2, -cubeLength/2)
                ))
                if (i >= Math.PI/2){
                    start = false
                    stepZ++;
                }
            }
            else if(direction === 1){
                cube.matrix = new THREE.Matrix4().makeTranslation(stepX * cubeLength,0,-cubeLength/2 + stepZ* cubeLength).multiply(
                    new THREE.Matrix4().makeRotationX(-i).multiply(
                    new THREE.Matrix4().makeTranslation(0,cubeLength/2, cubeLength/2)
                ))
                if (i >= Math.PI/2){
                    start = false
                    stepZ--;
                }
            }
            else if(direction === 2){
                cube.matrix = new THREE.Matrix4().makeTranslation(cubeLength/2 + stepX * cubeLength,0,stepZ* cubeLength).multiply(
                    new THREE.Matrix4().makeRotationZ(-i).multiply(
                    new THREE.Matrix4().makeTranslation(-cubeLength/2,cubeLength/2,0)
                ))
                if (i >= Math.PI/2){
                    start = false
                    stepX++;
                }
            }
            else if(directiion = 3){
                cube.matrix = new THREE.Matrix4().makeTranslation(-cubeLength/2 + stepX * cubeLength,0,stepZ* cubeLength).multiply(
                    new THREE.Matrix4().makeRotationZ(i).multiply(
                    new THREE.Matrix4().makeTranslation(cubeLength/2,cubeLength/2,0)
                ))
                if (i >= Math.PI/2){
                    start = false
                    stepX--;
                }                
            }
        }
        else{
            direction = Math.floor(Math.random() * 4);
            i = 0;
            start = true;

        }
        
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    }


    //renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xEEEEEE);
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);
    renderScene();
}
window.onload = init;
