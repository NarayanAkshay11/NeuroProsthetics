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
        
        console.log('Form submitted:', formValues);
        
        contactForm.reset();
        
        alert('Thank you for your message! We will get back to you soon.');
    });

    // 3D Robotic Arm
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(300, 300);
    document.getElementById('robotic-arm-container').appendChild(renderer.domElement);

    // Create robotic arm
    const armBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 0.5, 0.5, 32),
        new THREE.MeshPhongMaterial({ color: 0x888888 })
    );
    scene.add(armBase);

    const lowerArm = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 2, 0.5),
        new THREE.MeshPhongMaterial({ color: 0x0088ff })
    );
    lowerArm.position.y = 1.25;
    armBase.add(lowerArm);

    const upperArm = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 1.5, 0.4),
        new THREE.MeshPhongMaterial({ color: 0x00ff88 })
    );
    upperArm.position.y = 1.75;
    lowerArm.add(upperArm);

    const claw = new THREE.Mesh(
        new THREE.ConeGeometry(0.2, 0.5, 32),
        new THREE.MeshPhongMaterial({ color: 0xff8800 })
    );
    claw.position.y = 1;
    claw.rotation.x = Math.PI;
    upperArm.add(claw);

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

        armBase.rotation.y += 0.01;
        lowerArm.rotation.x = Math.sin(Date.now() * 0.001) * 0.5;
        upperArm.rotation.x = Math.sin(Date.now() * 0.002) * 0.3;

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

            armBase.rotation.y += deltaMove.x * 0.01;
            lowerArm.rotation.x += deltaMove.y * 0.01;

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
