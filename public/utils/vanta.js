// Only initialize Vanta when the user has scrolled or after a delay
let vantaEffect = null;

function initVanta() {
    if (vantaEffect) return;
    
    vantaEffect = VANTA.WAVES({
        el: "#background",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 0.75, // Reduced for mobile
        color: 0x0,
        shininess: 40.00, // Reduced for better performance
        waveHeight: 15.00, // Reduced for better performance
        waveSpeed: 0.75, // Reduced for better performance
        zoom: 0.65
    });
}

// Initialize after a short delay or on user interaction
document.addEventListener('DOMContentLoaded', () => {
    // Delay initialization
    setTimeout(initVanta, 1000);

    // Or initialize on scroll
    window.addEventListener('scroll', () => {
        initVanta();
    }, { once: true });
}); 