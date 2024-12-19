document.addEventListener("DOMContentLoaded", () => {
    const btnFireworks = document.getElementById("btnFireworks");
    const birthdayVideo = document.getElementById("birthdayVideo");
    const birthdayImage = document.getElementById("birthdayImage");
    const birthdayText = document.getElementById("birthdayText");
    const bigBangCanvas = document.getElementById("bigBangCanvas");
    const bigBangCtx = bigBangCanvas.getContext("2d");

    // Đặt kích thước canvas Big Bang
    bigBangCanvas.width = window.innerWidth;
    bigBangCanvas.height = window.innerHeight;

    function createBigBangEffect(callback) {
        let particles = [];
        const colors = ["#ff4444", "#44ff44", "#4444ff", "#ffbb33", "#9933ff"];
        const numParticles = 150;
        const centerX = bigBangCanvas.width / 2;
        const centerY = bigBangCanvas.height / 2;

        // Tạo danh sách các hạt
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

        // Vẽ hiệu ứng Big Bang
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
                // Hiệu ứng Big Bang kết thúc
                callback();
            }
        }

        animateBigBang();
    }

    // Chuyển màu hex sang RGB
    function hexToRgb(hex) {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `${r},${g},${b}`;
    }

    // Xử lý khi bấm nút
    if (btnFireworks) {
        btnFireworks.addEventListener("click", () => {
            // Ẩn nút bấm
            btnFireworks.classList.add("hidden");

            // Hiệu ứng Big Bang
            bigBangCanvas.classList.remove("hidden");
            createBigBangEffect(() => {
                // Kết thúc Big Bang, phát video
                bigBangCanvas.classList.add("hidden");
                birthdayVideo.classList.remove("hidden");

                // Phát video
                birthdayVideo.play();

                // Khi video kết thúc, hiện ảnh và chữ
                birthdayVideo.onended = () => {
                    birthdayVideo.classList.add("hidden");

                    // Hiện ảnh với hiệu ứng phóng to
                    birthdayImage.classList.remove("hidden");
                    birthdayImage.classList.add("visible");

                    // Hiện chữ "Chúc Mừng Sinh Nhật"
                    birthdayText.classList.remove("hidden");
                    birthdayText.classList.add("visible");
                };
            });
        });
    } else {
        console.error("Không tìm thấy nút 'Bấm vào đây!'");
    }
});
