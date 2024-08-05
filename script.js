document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData.entries());
        
        // Send form data to a particular email
        console.log('Form submitted:', formValues);
        
        // Clear the form
        contactForm.reset();
        
        // Show a success message
        alert('Thank you for your message! We will get back to you soon.');
    });

    // 3D Geometric Shapes
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(300, 300);
    document.getElementById('geometric-shapes-container').appendChild(renderer.domElement);

    // Create geometric shapes
    const geometry1 = new THREE.IcosahedronGeometry(0.8, 0);
    const geometry2 = new THREE.OctahedronGeometry(0.8, 0);
    const geometry3 = new THREE.TetrahedronGeometry(0.8, 0);
    const material1 = new THREE.MeshPhongMaterial({ color: 0x3498db });
    const material2 = new THREE.MeshPhongMaterial({ color: 0xe74c3c });
    const material3 = new THREE.MeshPhongMaterial({ color: 0x2ecc71 });
    const shape1 = new THREE.Mesh(geometry1, material1);
    const shape2 = new THREE.Mesh(geometry2, material2);
    const shape3 = new THREE.Mesh(geometry3, material3);
    shape1.position.set(-1, 0.6, 0);
    shape2.position.set(1, 0.6, 0);
    shape3.position.set(0, -0.8, 0);
    scene.add(shape1);
    scene.add(shape2);
    scene.add(shape3);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    camera.position.z = 4;

    // Mouse control variables
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    // Add mouse move event listener
    renderer.domElement.addEventListener('mousemove', onMouseMove, false);

    function onMouseMove(event) {
        const rect = renderer.domElement.getBoundingClientRect();
        mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }

    // Animation
    function animate() {
        requestAnimationFrame(animate);

        // Update rotation based on mouse position
        targetRotationY = mouseX * Math.PI;
        targetRotationX = mouseY * Math.PI;

        // Apply rotation to shapes
        shape1.rotation.x += (targetRotationX - shape1.rotation.x) * 0.05;
        shape1.rotation.y += (targetRotationY - shape1.rotation.y) * 0.05;
        shape2.rotation.x += (targetRotationX - shape2.rotation.x) * 0.05;
        shape2.rotation.y += (targetRotationY - shape2.rotation.y) * 0.05;
        shape3.rotation.x += (targetRotationX - shape3.rotation.x) * 0.05;
        shape3.rotation.y += (targetRotationY - shape3.rotation.y) * 0.05;

        renderer.render(scene, camera);
    }

    animate();

    // Responsive design for mobile
    function resizeShapesContainer() {
        const container = document.getElementById('geometric-shapes-container');
        if (window.innerWidth <= 768) {
            renderer.setSize(150, 150);
            camera.position.z = 2;
            container.style.right = '10px';
            container.style.top = '70%';
        } else {
            renderer.setSize(300, 300);
            camera.position.z = 4;
            container.style.right = '20px';
            container.style.top = '50%';
        }
    }

    window.addEventListener('resize', resizeShapesContainer);
    resizeShapesContainer();
});
