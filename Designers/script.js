// Smooth scroll to alphabet section when an alphabet is clicked
document.querySelectorAll('.alphabet-filter .alphabet-link').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const targetId = link.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Filter designers by name
const filterInput = document.getElementById('filter-input');

// Filter designers based on input
filterInput.addEventListener('input', () => {
    const filterValue = filterInput.value.toLowerCase();
    const designers = document.querySelectorAll('.designer');
    let foundMatch = false;

    designers.forEach(designer => {
        const name = designer.textContent.toLowerCase();

        // If exact match, highlight and scroll to the designer section
        if (name.startsWith(filterValue)) {
            designer.style.backgroundColor = '#f0f0f0'; // Highlight matched designer
            if (!foundMatch) {
                designer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                foundMatch = true;
            }
            setTimeout(() => designer.style.backgroundColor = '', 1000); // Remove highlight after 1 second
        } else {
            designer.style.backgroundColor = ''; // Reset highlight for non-matched items
        }

        // Show only designers that include the filter value if no exact match
        designer.style.display = name.includes(filterValue) || foundMatch ? 'block' : 'none';
    });
});
