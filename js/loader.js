document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loading-screen");
    if (!loadingScreen) return;

    const progressBar = document.querySelector(".progress-bar");
    const loaderText = document.querySelector(".loader-text span");
    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 6) + 2; 
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                loadingScreen.style.opacity = "0";
                document.dispatchEvent(new Event('bootFinished'));
                
                setTimeout(() => {
                    loadingScreen.style.display = "none";
                }, 500);
            }, 400);
        }
        
        if (progressBar) progressBar.style.width = progress + "%";
        if (loaderText) loaderText.textContent = progress + "%";
    }, 80);
});