document.addEventListener('DOMContentLoaded', () => {
    const prompts = document.querySelectorAll('.terminal-prompt span');
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    prompts.forEach(prompt => {
        prompt.style.visibility = 'hidden';
    });

    const typeWriter = async (element) => {
        const text = element.getAttribute('data-text') || element.textContent;
        if (!element.getAttribute('data-text')) element.setAttribute('data-text', text);
        
        element.textContent = ''; 
        element.style.visibility = 'visible'; 
        
        await sleep(50); 

        for (let i = 0; i < text.length; i++) {
            element.textContent += text.charAt(i);
            await sleep(Math.random() * 70 + 30);
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const startObserver = () => {
        prompts.forEach(prompt => {
            observer.observe(prompt);
        });
    };

    if (document.getElementById("loading-screen")) {
        document.addEventListener('bootFinished', startObserver);
    } else {
        startObserver();
    }
});