function setting(){
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    let renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xEEEEEE);
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    let axes = new THREE.AxesHelper(20);
    scene.add(axes);
    return [scene, camera, renderer]
}
function renderScene(){
    // cube.rotation.x += 0.02;
    // cube.rotation.y += 0.02;
    // cube.rotation.z += 0.02;
    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
}

function init(){
    [scene, camera, renderer] = setting();

    let planeGeometry = new THREE.PlaneGeometry(60,20,1,1);
    let planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    plane.receiveShadow = true;
    scene.add(plane);

    let cubeGeometry = new THREE.BoxGeometry(4,4,4);
    let cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
    let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    
    cube.position.x = 0;
    cube.position.y = 2;
    cube.position.z = 0;
    cube.castShadow = true;
    scene.add(cube)

    camera.position.x = -40;
    camera.position.y = 30;
    camera.position.z = 30;
    camera.lookAt(scene.position);

        
    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    document.body.appendChild(renderer.domElement);
    renderScene();
}
window.onload = init;