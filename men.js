document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.querySelector('.main-content');
    const searchBar = document.getElementById('search-bar');
    const sortSelect = document.getElementById('sort-select');
    const productsPerPage = 9;
    let currentPage = 1;
    let allProducts = [];
    let filteredProducts = [];

    mainContent.innerHTML = '<div class="loading">Loading products...</div>';

    fetch('https://menproduct-45591-default-rtdb.firebaseio.com/.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            allProducts = Object.values(data);
            filteredProducts = [...allProducts];
            displayProducts(currentPage);
            createPagination(Math.ceil(filteredProducts.length / productsPerPage));
            
            searchBar.addEventListener('input', handleSearch);
            sortSelect.addEventListener('change', handleSort);
        })
        .catch(error => {
            mainContent.innerHTML = `
                <div class="error">
                    Error loading products: ${error.message}
                </div>
            `;
        });

    function handleSearch(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        filteredProducts = allProducts.filter(product => 
            product.title.toLowerCase().includes(searchTerm)
        );
        currentPage = 1;
        displayProducts(currentPage);
        createPagination(Math.ceil(filteredProducts.length / productsPerPage));
        
        if (filteredProducts.length === 0) {
            mainContent.innerHTML = `
                <div class="no-results">
                    No products found matching "${searchTerm}"
                </div>
            `;
        }
    }

    function handleSort(e) {
        const sortBy = e.target.value;
        switch(sortBy) {
            case 'default':
                filteredProducts = [...allProducts];
                break;
            case 'name-a-z':
                filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'name-z-a':
                filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
                break;
        }
        currentPage = 1;
        displayProducts(currentPage);
        createPagination(Math.ceil(filteredProducts.length / productsPerPage));
    }

    function displayProducts(page) {
        mainContent.innerHTML = '';
        const startIndex = (page - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

        if (productsToDisplay.length === 0) {
            mainContent.innerHTML = `
                <div class="no-results">
                    No products available
                </div>
            `;
            return;
        }

        productsToDisplay.forEach(product => {
            const productCard = `
                <div class="product-card" data-product-id="${product.id}">
                    <img src="${product.image}" alt="${product.title}" class="product-image">
                    <div class="product-info">
                        <div class="product-title">${product.title}</div>
                        <div class="product-description">${product.description}</div>
                        <div class="product-price">${product.price}</div>
                    </div>
                </div>
            `;
            mainContent.innerHTML += productCard;
        });

        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', () => {
                const productId = card.dataset.productId;
                window.location.href = `men_product_details.html?id=${productId}`;
            });
        });
    }

    function createPagination(totalPages) {
        const existingPagination = document.querySelector('.pagination');
        if (existingPagination) {
            existingPagination.remove();
        }
        
        if (totalPages <= 0) return;

        const paginationContainer = document.createElement('div');
        paginationContainer.className = 'pagination';
        
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.className = 'pagination-btn';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                updatePagination();
                displayProducts(currentPage);
                scrollToTop();
            }
        });

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.className = 'pagination-btn';
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                updatePagination();
                displayProducts(currentPage);
                scrollToTop();
            }
        });

        const pageNumbers = document.createElement('div');
        pageNumbers.className = 'page-numbers';
        
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.className = `page-btn ${currentPage === i ? 'active' : ''}`;
            pageButton.addEventListener('click', () => {
                if (currentPage !== i) {
                    currentPage = i;
                    updatePagination();
                    displayProducts(currentPage);
                    scrollToTop();
                }
            });
            pageNumbers.appendChild(pageButton);
        }

        paginationContainer.appendChild(prevButton);
        paginationContainer.appendChild(pageNumbers);
        paginationContainer.appendChild(nextButton);
        
        document.querySelector('.content-wrapper').appendChild(paginationContainer);

        function updatePagination() {
            document.querySelectorAll('.page-btn').forEach(btn => {
                btn.classList.toggle('active', parseInt(btn.textContent) === currentPage);
            });
            prevButton.disabled = currentPage === 1;
            nextButton.disabled = currentPage === totalPages;
        }

        function scrollToTop() {
            mainContent.scrollIntoView({ behavior: 'smooth' });
        }
    }

    document.querySelectorAll('.collapsible').forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });
});