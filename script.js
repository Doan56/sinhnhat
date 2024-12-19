document.addEventListener("DOMContentLoaded", () => {
    const btnFireworks = document.getElementById("btnFireworks");
    const birthdayVideo = document.getElementById("birthdayVideo");
    const birthdayImage = document.getElementById("birthdayImage");
    const birthdayText = document.getElementById("birthdayText");
    const bigBangCanvas = document.getElementById("bigBangCanvas");
    const bigBangCtx = bigBangCanvas.getContext("2d");

    bigBangCanvas.width = window.innerWidth;
    bigBangCanvas.height = window.innerHeight;

    function createBigBangEffect(callback) {
        let particles = [];
        const colors = ["#ff4444", "#44ff44", "#4444ff", "#ffbb33", "#9933ff"];
        const numParticles = 150;
        const centerX = bigBangCanvas.width / 2;
        const centerY = bigBangCanvas.height / 2;


        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: centerX,
                y: centerY,
                angle: Math.random() * 2 * Math.PI,
                speed: Math.random() * 6 + 2,
                radius: Math.random() * 5 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: 1
            });
        }


        function animateBigBang() {
            bigBangCtx.clearRect(0, 0, bigBangCanvas.width, bigBangCanvas.height);

            particles.forEach((particle, index) => {
                particle.x += Math.cos(particle.angle) * particle.speed;
                particle.y += Math.sin(particle.angle) * particle.speed;
                particle.alpha -= 0.02;

                if (particle.alpha <= 0) {
                    particles.splice(index, 1);
                }

                bigBangCtx.beginPath();
                bigBangCtx.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI);
                bigBangCtx.fillStyle = `rgba(${hexToRgb(particle.color)}, ${particle.alpha})`;
                bigBangCtx.fill();
            });

            if (particles.length > 0) {
                requestAnimationFrame(animateBigBang);
            } else {
        
                callback();
            }
        }

        animateBigBang();
    }

    function hexToRgb(hex) {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `${r},${g},${b}`;
    }

    if (btnFireworks) {
        btnFireworks.addEventListener("click", () => {
    
            btnFireworks.classList.add("hidden");

    
            bigBangCanvas.classList.remove("hidden");
            createBigBangEffect(() => {
        
                bigBangCanvas.classList.add("hidden");
                birthdayVideo.classList.remove("hidden");

        
                birthdayVideo.play();

        
                birthdayVideo.onended = () => {
                    birthdayVideo.classList.add("hidden");

            
                    birthdayImage.classList.remove("hidden");
                    birthdayImage.classList.add("visible");

                    birthdayText.classList.remove("hidden");
                    birthdayText.classList.add("visible");
                };
            });
        });
    } else {
        console.error("Không tìm thấy nút 'Bấm vào đây!'");
    }
});
