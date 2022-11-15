// scene, camera, renderer 설정
function setting(){
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    let renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xEEEEEE);
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    //축 설정 : rgb = xyz
    let axes = new THREE.AxesHelper(20);
    scene.add(axes);
    return [scene, camera, renderer]
}

function init(){
    [scene, camera, renderer] = setting();
    // plane 설정
    // mesh(geometry, meterial)
    // material constructor : MeshBasicMaterial(광원 반응x), MeshLambertMaterial(광원 반응o)
    // geometry : 폭, 높이, widthSegements, heightSegements
    let planeGeometry = new THREE.PlaneGeometry(60,20,1,1);
    let planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);


    // rotation, position
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;

    //그림자 적용 받기
    plane.receiveShadow = true;
    scene.add(plane);


    //cube 설정
    //mesh(geometry, material)
    let cubeGeometry = new THREE.BoxGeometry(4,4,4);
    let cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
    let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    
    //position
    cube.position.x = -4;
    cube.position.y = 4;
    cube.position.z = 0;
    //그림자 적용 받기
    cube.castShadow = true;
    scene.add(cube)

    //sphere 설정
    //mesh(geometry, material)
    let sphereGeometry = new THREE.SphereGeometry(4,20,20);
    let sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
    let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    //position
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    //그림자 적용 받기
    sphere.castShadow = true;
    scene.add(sphere);

    //camera 설정
    //position, lookAt
    camera.position.x = -40;
    camera.position.y = 30;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    
    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    //그림자 적용 받기
    spotLight.castShadow = true;
    scene.add(spotLight);


    //element(body)에 renderer.domElement 넣기
    document.body.appendChild(renderer.domElement);

    //렌더링
    renderer.render(scene,camera);
}
window.onload = init;