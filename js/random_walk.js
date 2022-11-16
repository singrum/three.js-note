let camera, scene, renderer;

function init(){
    window.addEventListener("resize", onResize, false);
    function onResize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    //scene의 구성요소 : camera, lights, objects
    scene = new THREE.Scene();
    
    //camera
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.x = 40;
    camera.position.y = 30;
    camera.position.z = 30;
    camera.up = new THREE.Vector3(0,0,1);
    camera.lookAt(scene.position);
    scene.add(camera);
    
    //ligths
    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(80, 0, 80);
    spotLight.castShadow = true;
    scene.add(spotLight);
    
    //object(axes)
    let axes = new THREE.AxesHelper(20);
    scene.add(axes);



    //sphere
    let sphere = new THREE.Mesh(
        new THREE.SphereGeometry(4,20,20), 
        new THREE.MeshLambertMaterial({color: 0x7777ff})
        );
    sphere.position.x = 0;
    sphere.position.y = 0;
    sphere.position.z = 2;
    scene.add(sphere);



    let i = 0.5, j =0;
    let theta, phi;
    function renderScene(){
        j += 0.03
        camera.position.x = 50 * Math.cos(j);
        camera.position.y = 50 * Math.sin(j);
        camera.lookAt(scene.position);
        theta = Math.random() * 2 * Math.PI;
        phi = Math.random() * 2 * Math.PI;
        sphere.position.x += i * Math.sin(theta) * Math.cos(phi);
        sphere.position.y += i * Math.sin(theta) * Math.sin(phi);
        sphere.position.z += i * Math.cos(theta);

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