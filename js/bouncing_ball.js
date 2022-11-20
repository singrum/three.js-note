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
    camera.position.set(-40,30,30);
    camera.lookAt(scene.position);


    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);
    
    let axes = new THREE.AxesHelper(20);
    scene.add(axes);

    let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(90,90,1,1),
        new THREE.MeshLambertMaterial({color: 0xcccccc})
        );
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0,0,0);
    plane.receiveShadow = true;
    scene.add(plane);

    let geom = new THREE.SphereGeometry(10,32,32)
    let material = new THREE.MeshLambertMaterial({color : 0xff0000})
    material.transplant = true;
    material.opacity = 0.3
    let sphere = new THREE.Mesh(geom, material)
    sphere.matrixAutoUpdate = false;
    scene.add(sphere)
    sphere.matrix.makeTranslation(0,10,0)
    
    


    let i = 0;
    function renderScene(){
        i +=0.01;
        camera.position.set(100 * Math.cos(i),60,100* Math.sin(i));
        camera.lookAt(scene.position);
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