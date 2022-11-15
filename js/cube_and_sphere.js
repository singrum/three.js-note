// scene, camera, renderer 설정

let scene, camera, renderer;

function setting(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    renderer = new THREE.WebGLRenderer();

    //축 설정 : rgb = xyz
    let axes = new THREE.AxesHelper(20);
    scene.add(axes);
}

function init(){
    setting();
    scene.add(camera)
    // plane 설정
    // mesh(geometry, meterial)
    // material constructor : MeshBasicMaterial(광원 반응x), MeshLambertMaterial(광원 반응o)
    // geometry : 폭, 높이, widthSegements, heightSegements
    let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(60,20,1,1),
        new THREE.MeshLambertMaterial({color: 0xcccccc})
        );


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
    let cube = new THREE.Mesh(
        new THREE.BoxGeometry(4,4,4),
        new THREE.MeshLambertMaterial({color: 0xff0000})
        );
    
    //position
    cube.position.x = -4;
    cube.position.y = 4;
    cube.position.z = 0;
    //그림자 적용 받기
    cube.castShadow = true;
    scene.add(cube)

    //sphere 설정
    //mesh(geometry, material)
    let sphere = new THREE.Mesh(
        new THREE.SphereGeometry(4,20,20), 
        new THREE.MeshLambertMaterial({color: 0x7777ff})
        );
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
    renderer.setClearColor(0xEEEEEE);
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.render(scene,camera);
}
window.onload = init;