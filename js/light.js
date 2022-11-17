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
    camera.lookAt(scene.position);
    scene.add(camera);

    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(80, 90, 80);
    spotLight.castShadow = true;
    scene.add(spotLight);
    let ambientLight = new THREE.AmbientLight(0x000000);
    spotLight.position.set(80, 90, 80);
    scene.add(ambientLight);
    
    let axes = new THREE.AxesHelper(20);
    scene.add(axes);

    let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(60,40,1,1),
        new THREE.MeshLambertMaterial({color: 0xcccccc})
    )
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    plane.receiveShadow = true;
    scene.add(plane);

    let cube = new THREE.Mesh(
        new THREE.BoxGeometry(10,10,10),
        new THREE.MeshLambertMaterial({color: 0xcccccc})
    )
    cube.position.set(0,5,0)
    scene.add(cube);
        
    let i = 0;
    function renderScene(){
        i += 10;
        ambientLight = new THREE.AmbientLight(i)
        scene.add(ambientLight);
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