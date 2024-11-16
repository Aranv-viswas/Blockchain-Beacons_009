// script.js

document.getElementById('search-icon').addEventListener('click', function() {
    const searchContainer = document.querySelector('.search-container');
    searchContainer.style.display = searchContainer.style.display === 'flex' ? 'none' : 'flex';
});

function openTab(event, tabName) {
    // Hide all tab-content
    const tabContent = document.querySelectorAll('.tab-content');
    tabContent.forEach((tab) => {
        tab.classList.remove('active');
    });

    // Remove active class from all tab-links
    const tabLinks = document.querySelectorAll('.tab-link');
    tabLinks.forEach((tabLink) => {
        tabLink.classList.remove('active');
    });

    // Show the current tab
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}
