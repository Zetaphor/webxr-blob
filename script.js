const debug = false;
let tempMatrix = new THREE.Matrix4();
let tempVector = new THREE.Vector3();
let camera, scene, renderer, container;
let conLeft, conRight, xrConLeft, xrConRight;
let light, testCube;
let sphere, sphere_geometry, sphere_material;

init();
requestSession();

window.addEventListener("unload", closeSession);

function init() {
  container = document.createElement('div');
  document.body.appendChild(container);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  scene.add(light);

  // conLeft = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1), new THREE.MeshLambertMaterial({ color: 0xff0000 }));
  // conRight = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1), new THREE.MeshLambertMaterial({ color: 0x0000ff }));
  // scene.add(conLeft, conRight);

  sphere_geometry = new THREE.SphereGeometry(1, 128, 128);
  sphere_material = new THREE.MeshNormalMaterial();
  // sphere_material.wireframe = true;
  sphere = new THREE.Mesh(sphere_geometry, sphere_material);
  sphere.position.y = 1;
  sphere.position.z = -1;
  scene.add(sphere);

  // testCube = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), new THREE.MeshLambertMaterial({ color: 0xff0000 }));
  // testCube.position.z -= 1;
  // testCube.position.y += 0.5;
  // scene.add(testCube);

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.xr.enabled = true;
}

function requestSession() {
  navigator.xr.isSessionSupported('immersive-vr').then(function (supported) {
    let options = { optionalFeatures: ['local-floor', 'bounded-floor'] };
    navigator.xr.requestSession('immersive-vr', options).then(onSessionStarted);
  });
}

function onSessionStarted(session) {
  renderer.xr.setSession(session);
  // xrConLeft = renderer.xr.getController(0);
  // xrConRight = renderer.xr.getController(1);
  animate();
}

async function closeSession(session) {
  await renderer.xr.getSession().end();
}

function animate() {
  renderer.setAnimationLoop(render);
}

function render() {
  // conLeft.position.x = xrConLeft.position.x;
  // conLeft.position.y = xrConLeft.position.y;
  // conLeft.position.z = xrConLeft.position.z;
  // conLeft.rotation.x = xrConLeft.rotation.x;
  // conLeft.rotation.y = xrConLeft.rotation.y;
  // conLeft.rotation.z = xrConLeft.rotation.z;

  // conRight.position.x = xrConRight.position.x;
  // conRight.position.y = xrConRight.position.y;
  // conRight.position.z = xrConRight.position.z;
  // conRight.rotation.x = xrConRight.rotation.x;
  // conRight.rotation.y = xrConRight.rotation.y;
  // conRight.rotation.z = xrConRight.rotation.z;

  // change '0.003' for more aggressive animation
  var time = performance.now() * 0.003;
  //console.log(time)

  //go through vertices here and reposition them

  // change 'k' value for more spikes
  var k = 3;
  for (var i = 0; i < sphere.geometry.vertices.length; i++) {
      var p = sphere.geometry.vertices[i];
      p.normalize().multiplyScalar(0.25 + 0.075 * noise.perlin3(p.x * k + time, p.y * k, p.z * k));
  }
  sphere.geometry.computeVertexNormals();
  sphere.geometry.normalsNeedUpdate = true;
  sphere.geometry.verticesNeedUpdate = true;

  renderer.render(scene, camera);
}