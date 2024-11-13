// Smooth scroll to alphabet section when an alphabet is clicked
document.querySelectorAll('.alphabet-nav a').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Filter designers by name
const filterInput = document.getElementById('filter-input');
filterInput.addEventListener('input', () => {
    const filterValue = filterInput.value.toLowerCase();
    const designers = document.querySelectorAll('.designer');

    // Check for exact match and scroll to it
    let foundMatch = false;
    designers.forEach(designer => {
        const name = designer.textContent.toLowerCase();
        if (name.startsWith(filterValue)) {
            // Scroll to the designer section if a match is found
            designer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            designer.style.backgroundColor = '#f0f0f0'; // Highlight the matched designer
            setTimeout(() => designer.style.backgroundColor = '', 1000); // Remove highlight after 1 second
            foundMatch = true;
            return;
        }
    });

    // If no exact match, display designers that contain the filter value
    if (!foundMatch) {
        designers.forEach(designer => {
            const name = designer.textContent.toLowerCase();
            designer.style.display = name.includes(filterValue) ? '' : 'none';
        });
    }
});
