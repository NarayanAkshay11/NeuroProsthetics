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
        
        // Here you would typically send the form data to a server
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
    const geometry1 = new THREE.IcosahedronGeometry(1, 0);
    const geometry2 = new THREE.OctahedronGeometry(1, 0);
    const geometry3 = new THREE.TetrahedronGeometry(1, 0);

    const material1 = new THREE.MeshPhongMaterial({ color: 0x3498db });
    const material2 = new THREE.MeshPhongMaterial({ color: 0xe74c3c });
    const material3 = new THREE.MeshPhongMaterial({ color: 0x2ecc71 });

    const shape1 = new THREE.Mesh(geometry1, material1);
    const shape2 = new THREE.Mesh(geometry2, material2);
    const shape3 = new THREE.Mesh(geometry3, material3);

    shape1.position.set(-1.5, 1, 0);
    shape2.position.set(1.5, 1, 0);
    shape3.position.set(0, -1, 0);

    scene.add(shape1);
    scene.add(shape2);
    scene.add(shape3);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    camera.position.z = 5;

    // Animation
    function animate() {
        requestAnimationFrame(animate);

        shape1.rotation.x += 0.01;
        shape1.rotation.y += 0.01;

        shape2.rotation.x += 0.01;
        shape2.rotation.z += 0.01;

        shape3.rotation.y += 0.01;
        shape3.rotation.z += 0.01;

        renderer.render(scene, camera);
    }

    animate();

    // Mouse interaction
    let isDragging = false;
    let previousMousePosition = {
        x: 0,
        y: 0
    };

    renderer.domElement.addEventListener('mousedown', (e) => {
        isDragging = true;
    });

    renderer.domElement.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaMove = {
                x: e.offsetX - previousMousePosition.x,
                y: e.offsetY - previousMousePosition.y
            };

            scene.rotation.y += deltaMove.x * 0.01;
            scene.rotation.x += deltaMove.y * 0.01;

            previousMousePosition = {
                x: e.offsetX,
                y: e.offsetY
            };
        }
    });

    renderer.domElement.addEventListener('mouseup', (e) => {
        isDragging = false;
    });
});
