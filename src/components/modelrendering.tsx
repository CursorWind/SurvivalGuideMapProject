import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { Sky } from 'three/examples/jsm/Addons.js';

export const guides:THREE.Mesh[]=[];
export const scene = new THREE.Scene();

const Three1 = () => {
  useEffect(() => {

    const brandingElement = document.getElementById('branding');
      if (brandingElement) {
        brandingElement.style.opacity = '1';
      }
    // Set up scene
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ logarithmicDepthBuffer: true, alpha:true });
    renderer.shadowMap.enabled = true;
    const controls = new OrbitControls( camera, renderer.domElement );
    renderer.setSize(window.innerWidth, window.innerHeight);

    //below code reused from threejs examples documentation
    let sky = new Sky(), sun = new THREE.Vector3();
    function initSky() {
      // Add Sky
      sky.scale.setScalar(450000);
      scene.add(sky);

      const effectController = {
        turbidity: 9.81,
        rayleigh: 2.181,
        mieCoefficient: 0.026,
        mieDirectionalG: 0.7,
        elevation: 7,
        azimuth: -177,
        exposure: renderer.toneMappingExposure
      };
    
      const skyconfig = function() {
        const uniforms = sky.material.uniforms;
        uniforms['turbidity'].value = effectController.turbidity;
        uniforms['rayleigh'].value = effectController.rayleigh;
        uniforms['mieCoefficient'].value = effectController.mieCoefficient;
        uniforms['mieDirectionalG'].value = effectController.mieDirectionalG;
    
        const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
        const theta = THREE.MathUtils.degToRad(effectController.azimuth);
    
        sun.setFromSphericalCoords(1, phi, theta);
    
        uniforms['sunPosition'].value.copy(sun);
    
        renderer.toneMappingExposure = effectController.exposure;
        renderer.render(scene, camera);
      };
      skyconfig();
    }    

    function init() {
      camera.position.set( 0, 100, 2000 );

      const helper = new THREE.GridHelper( 10000, 2, 0xffffff, 0xffffff );
      //this is used in development, disable it before pushing to main
      //scene.add( helper );

      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.5;
      document.body.appendChild( renderer.domElement );

      controls.enableZoom = true;
      controls.enablePan = false;

      initSky();

    }
    init();
    //plane initializing
    const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
    const planeMaterial = new THREE.MeshPhysicalMaterial({ color: 0xaababa, });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.receiveShadow = true;
    planeMesh.position.y=-0.57
    planeMesh.rotation.x = -Math.PI / 2;
    scene.add(planeMesh)

    scene.background = new THREE.Color(0x87CEEB);

    //loading code copied from documentation
    const loader = new GLTFLoader();
    loader.load('/models/SKFULLV.glb', (gltf) => {
      animate();
      const model = gltf.scene;
      scene.add(model);
      
      model.traverse((node) => {
        node.castShadow = true; // Enable casting shadows for model meshes
        node.receiveShadow = true; // Enable receiving shadows for model meshes
      });
      if (brandingElement) {
        brandingElement.style.opacity = '0';
    }
      
    }, (xhr) => {
      //console.log((xhr.loaded / 84787432) * 100 + '% loaded');
    }, (error) => {
      console.error('An error happened', error);
    });

    //initializing lighting stuff, not that important. skip if uninterested
    const directionalLight = new THREE.DirectionalLight(0xffffff, 6); // Bright white light
    directionalLight.position.set(-560, 300, 123);
    directionalLight.castShadow = true; // Enable shadows

    // Set up shadow properties for the light
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    scene.add(directionalLight);
    
    // Set camera position
    camera.position.z = 143*2;
    camera.position.y = 143;
    camera.position.x = -14.3;


    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      controls.update();
      renderer.render(scene, camera);

    };

    

    // Handle resize - just in case
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures useEffect runs once after initial render

  return <div id='scene-container'></div>;
};

export default Three1;