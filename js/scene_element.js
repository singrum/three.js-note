
let scene, camera, renderer;




function init(){

    //scene의 구성요소 : camera, lights, objects
    scene = new THREE.Scene();
    
    //camera
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.x = -40;
    camera.position.y = 30;
    camera.position.z = 30;
    camera.lookAt(scene.position);
    scene.add(camera);

    //object(plane)
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
    
    //ligths
    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);
    
    //object(axes)
    let axes = new THREE.AxesHelper(20);
    scene.add(axes);

    //object(box)
    let box = new THREE.Mesh(
        new THREE.BoxGeometry(4,4,4),
        new THREE.MeshLambertMaterial({color : 0xdddddd})
    )
    box.position.x = 0;
    box.position.y = 2;
    box.position.z = 0;
    box.castShadow = true;
    scene.add(box)

    //gui 생성
    let controls = new function(){
        this.rotationSpeed = 0.02;
    }
    let gui = new dat.GUI();
    gui.add(controls, "rotationSpeed", 0, 0.5);

    function renderScene(){
        box.rotation.x += controls.rotationSpeed;
        box.rotation.y += controls.rotationSpeed;
        box.rotation.z += controls.rotationSpeed;
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    }

    //renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xEEEEEE);
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);
    renderScene()
}


window.onload = init;