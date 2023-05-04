			import * as THREE from 'three';
			import { PLYLoader } from 'three/addons/loaders/PLYLoader.js';
			import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
			THREE.ColorManagement.enabled = false; 
			let renderer, scene, camera;
			let spotLight
			init();
			var  model = new THREE.Mesh()
			function init() {
				renderer = new THREE.WebGL1Renderer(  );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.getElementById('_3d').appendChild( renderer.domElement );
				renderer.shadowMap.enabled = true;
				renderer.shadowMap.type = THREE.PCFSoftShadowMap;
				renderer.toneMapping = THREE.ACESFilmicToneMapping;
				renderer.toneMappingExposure = 1;
				renderer.setAnimationLoop( render );
				scene = new THREE.Scene();
				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 100 );
				camera.position.set( 55,5, 0 );
				const controls = new OrbitControls( camera, renderer.domElement );
				controls.enableZoom = false;
				controls.enableRotate = false;
				controls.enablePan = false;
				controls.update();
				const ambient = new THREE.HemisphereLight( 0xffffff, 0x444444, 0.05 );
				scene.add( ambient );
				const loader = new THREE.TextureLoader().setPath( '' );
				const filenames = [ 'disturb.jpg'];
				const textures = { none: null };
				for ( let i = 0; i < filenames.length; i ++ ) {

					const filename = filenames[ i ];

					const texture = loader.load( filename );
					texture.minFilter = THREE.LinearFilter;
					texture.magFilter = THREE.LinearFilter;
					texture.colorSpace = THREE.SRGBColorSpace;

					textures[ filename ] = texture;

				}
				spotLight = new THREE.SpotLight( 0xffffff, 5 );
				spotLight.position.set( 25, 50, 25 );
				spotLight.angle = Math.PI / 6;
				spotLight.penumbra = 1;
				spotLight.decay = 2;
				spotLight.distance = 100;
				spotLight.map = textures[ 'disturb.jpg' ];
				var light = new THREE.PointLight( 0xffffff, 0.4, 100, 2);
				light.position.set(0,50,0);
				scene.add(light);
				scene.add(light);
				spotLight.castShadow = true;
				spotLight.shadow.mapSize.width = 1024;
				spotLight.shadow.mapSize.height = 1024;
				spotLight.shadow.camera.near = 10;
				spotLight.shadow.camera.far = 200;
				spotLight.shadow.focus = 1;
				scene.add( spotLight  );
				camera.rotateY(49.9)
				camera.rotateX(-50)
				const geometry = new THREE.PlaneGeometry( 1000, 1000 );
				const material = new THREE.MeshLambertMaterial( { color: 0x808080 } );
				const mesh = new THREE.Mesh( geometry, material );
				mesh.position.set( 0, - 1, 0 );
				mesh.rotation.x = - Math.PI / 2;
				mesh.receiveShadow = true;
				scene.add( mesh );
				
				
				new PLYLoader().load( 'scene.ply', function ( geometry ) {
					geometry.scale( 10, 10, 10);		
					geometry.computeVertexNormals();

					const material = new THREE.MeshPhongMaterial();
					model = new THREE.Mesh( geometry, material );
					model.rotation.y = 0;
					model.position.y = 10;
					model.rotation.x = -1,57079633
					model.castShadow = true;
					model.receiveShadow = false;
					scene.add( model );
				} );
				window.addEventListener( 'resize', onWindowResize );
			}
			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}
			function render() {

				const time = performance.now() / 3000;
				
				spotLight.position.x = Math.cos( time ) * 25;
				spotLight.position.z = Math.sin( time ) * 25;
				model.rotation.z += 0.01
				renderer.render( scene, camera )
			}
