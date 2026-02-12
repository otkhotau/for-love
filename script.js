document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const mainCard = document.getElementById('main-card');
    const successCard = document.getElementById('success-card');
    const heartsContainer = document.getElementById('hearts-container');

    // 1. Create floating background hearts
    function createHearts() {
        const symbols = ['❤️', '💖', '💘', '💝', '💕'];
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerText = symbols[Math.floor(Math.random() * symbols.length)];

        // Randomize position and animation properties
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 4 + 's'; // 4-7s
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.fontSize = Math.random() * 1.5 + 1 + 'rem';

        heartsContainer.appendChild(heart);

        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, 7000);
    }

    setInterval(createHearts, 300);

    // 2. "No" button running away logic
    const moveNoButton = () => {
        // Change text first so we measure the new size correctly
        const texts = ['Em chắc chưa?', 'Suy nghĩ kỹ đi!', 'Đừng mà 😢', 'Bấm nút kia kìa!', 'Hong bé ơi!', 'Sai nút rùi!'];
        noBtn.innerText = texts[Math.floor(Math.random() * texts.length)];

        // Force layout update to get new size
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;

        // Get viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Calculate boundaries with padding
        const padding = 20;
        const minX = padding;
        const maxX = viewportWidth - btnWidth - padding;
        const minY = padding;
        const maxY = viewportHeight - btnHeight - padding;

        // Ensure we have space (handle very small screens gracefully)
        const safeMaxX = Math.max(minX, maxX);
        const safeMaxY = Math.max(minY, maxY);

        // Random position within safe bounds
        const newX = Math.random() * (safeMaxX - minX) + minX;
        const newY = Math.random() * (safeMaxY - minY) + minY;

        noBtn.style.position = 'fixed';
        noBtn.style.transition = 'left 0.3s ease, top 0.3s ease';
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;

        // Ensure no rotation is applied
        noBtn.style.transform = 'none';
    };

    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent click on mobile tap if possible
        moveNoButton();
    });
    noBtn.addEventListener('click', moveNoButton); // Just in case they catch it

    // 3. "Yes" button click effect
    yesBtn.addEventListener('click', () => {
        // Trigger confetti
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff4d6d', '#ff8fa3', '#ffffff']
        });

        // Continuous confetti for a few seconds
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff4d6d', '#ff8fa3']
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff4d6d', '#ff8fa3']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());

        // Switch cards with animation
        mainCard.style.opacity = '0';
        mainCard.style.transform = 'scale(0.8)';

        setTimeout(() => {
            mainCard.style.display = 'none';
            successCard.classList.remove('hidden');
            // Trigger reflow
            void successCard.offsetWidth;
            successCard.style.opacity = '1';
            successCard.style.transform = 'scale(1)';
        }, 400);
    });
});
