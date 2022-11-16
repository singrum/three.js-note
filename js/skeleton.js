let camera, scene, renderer;
window.addEventListener("resize", onResize, false);
function onResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function init(){
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set(40,30,30);
    camera.up = new THREE.Vector3(0,0,1);
    camera.lookAt(scene.position);
    scene.add(camera);

    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(80, 0, 80);
    spotLight.castShadow = true;
    scene.add(spotLight);
    
    let axes = new THREE.AxesHelper(20);
    scene.add(axes);


    function renderScene(){



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