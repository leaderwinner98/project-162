AFRAME.registerComponent('throw', {
    init: function () {
        // Add keydown event listener to throw the ball
        window.addEventListener('keydown', (event) => {
            if (event.key === ' ') { // Adjust this key as needed
                this.throwBall();
            }
        });
    },
    throwBall: function () {
        // Get camera direction in Three.js Vector3 variable
        const camera = document.querySelector('[camera]');
        const direction = new THREE.Vector3();
        camera.object3D.getWorldDirection(direction);

        // Set velocity in camera direction
        const velocity = direction.multiplyScalar(10); // Adjust speed as needed

        // Create ball entity
        const ball = document.createElement('a-sphere');
        ball.setAttribute('radius', '0.1');
        ball.setAttribute('color', 'white');
        ball.setAttribute('position', camera.getAttribute('position'));

        // Apply velocity to ball
        ball.setAttribute('velocity', velocity);

        // Add collide event listener to ball
        ball.addEventListener('collide', (event) => {
            // Remove ball from scene
            event.target.parentNode.removeChild(event.target);

            // Apply force to pins on collision
            const collidedEntity = event.detail.body.el;
            // Apply force to pins using Cannon.js method
            // Example: collidedEntity.body.applyForce(force, collidedEntity.object3D.position);
        });

        // Add ball to scene
        const scene = document.querySelector('a-scene');
        scene.appendChild(ball);
    }
});
