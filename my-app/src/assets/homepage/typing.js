document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.getElementById('foodTypewriter');
    const newTexts = ["Fries", "Ice-cream", "Spaghetti", "Sisig", "Lechon", "Milktea", "Cheeseballs"];
    let newTextIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeText() {
        const currentText = newTexts[newTextIndex];

        if (isDeleting) {
            textElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeText, 1000); // Delay before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            newTextIndex = (newTextIndex + 1) % newTexts.length;
            setTimeout(typeText, 500); // Delay before typing next word
        } else {
            setTimeout(typeText, 100); // Typing speed (adjust as needed)
        }
    }

    typeText(); // Start typing immediately
});