// Filter prompts by category
function filterByCategory(category) {
    const cards = document.querySelectorAll('.prompt-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    let visibleCount = 0;
    
    // Show/hide cards based on category
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });
    
    // Update count
    document.getElementById('promptCount').textContent = visibleCount;
}

// Search prompts
function filterPrompts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.prompt-card');
    let visibleCount = 0;
    
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const tags = Array.from(card.querySelectorAll('.tag'))
            .map(tag => tag.textContent.toLowerCase())
            .join(' ');
        
        const matchesSearch = title.includes(searchTerm) || 
                            description.includes(searchTerm) || 
                            tags.includes(searchTerm);
        
        if (matchesSearch) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });
    
    // Update count
    document.getElementById('promptCount').textContent = visibleCount;
    
    // Reset category filter buttons when searching
    if (searchTerm !== '') {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => btn.classList.remove('active'));
        filterButtons[0].classList.add('active'); // Activate "All" button
    }
}

// Initialize count on page load
window.addEventListener('DOMContentLoaded', () => {
    const totalCards = document.querySelectorAll('.prompt-card').length;
    document.getElementById('promptCount').textContent = totalCards;
});