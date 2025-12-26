// Projects Data Template
// Each project should have: date (YYYY-MM-DD format), name, category, images (array) or image (single)
// Optional: highlight (boolean) - if true, project will appear in Project Highlights section on homepage
// Categories: You can use any category name! Filter buttons are auto-generated from unique categories in projects
// Common categories: residential, commercial, institutional, industrial
// For multiple images, use 'images' array. For single image, use 'image' (backward compatible)

const projects = [
    {
        date: '2025-12-23',
        name: 'Status Residency, Bhiwadi',
        category: 'residential',
        highlight: true, // Will appear in Project Highlights on homepage
        // Example with multiple images - images will auto-rotate every 3 seconds
        // To add more images, just add them to the array:
        images: [
            'images/portfolio/thirteen.jpg',
            // 'images/portfolio/thirteen-2.jpg',  // Uncomment and add more images
            // 'images/portfolio/thirteen-3.jpg'
        ]
    },
    {
        date: '2025-12-23',
        name: 'Apna Ghar Shalimar Alwar',
        category: 'residential',
        highlight: true,
        images: ['images/portfolio/fourteen.jpg']
    },
    {
        date: '2025-12-23',
        name: 'Hill View Garden Bhiwadi',
        category: 'residential',
        images: ['images/portfolio/fifteen.jpg']
    },
    {
        date: '2025-12-23',
        name: 'AGS Ext. Luxury Flats Alwar',
        category: 'residential',
        highlight: true,
        images: ['images/portfolio/sixteen.jpg']
    },
    {
        date: '2025-12-23',
        name: 'AGS Ext G+2 Alwar',
        category: 'residential',
        images: ['images/portfolio/seventeen.jpg']
    },
    {
        date: '2025-12-23',
        name: 'AGS Greens Alwar',
        category: 'residential',
        images: ['images/portfolio/eighteen.jpg']
    },
    {
        date: '2025-12-23',
        name: 'Fort View Residency, Alwar',
        category: 'residential',
        highlight: true,
        images: ['images/portfolio/nineteen.jpg']
    },
    {
        date: '2025-12-23',
        name: 'IET College, Alwar',
        category: 'institutional',
        highlight: true,
        images: ['images/portfolio/twenty.jpg']
    },
    {
        date: '2025-12-23',
        name: 'Polytechnic College, Nagar',
        category: 'institutional',
        images: ['images/portfolio/twentyone.jpg']
    },
    {
        date: '2025-12-23',
        name: 'Chaudhary Goli Singh Mahavidhalya, Nagar',
        category: 'institutional',
        images: ['images/portfolio/twentytwo.jpg']
    },
    {
        date: '2025-12-23',
        name: 'Tanya Resort',
        category: 'commercial',
        highlight: true,
        images: ['images/portfolio/twentythird.jpg']
    },
    {
        date: '2025-12-23',
        name: 'Sahil Hospital',
        category: 'commercial',
        highlight: true,
        images: ['images/portfolio/Royal-Court-Neemrana.jpg']
    },
    {
        date: '2025-12-23',
        name: 'Gulab Jain',
        category: 'interior',
        highlight: true,
        images: ['images/portfolio/Royal-Court-Neemrana.jpg']
    }
];

// Function to get projects sorted by date (newest first)
function getProjectsSortedByDate() {
    return [...projects].sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Function to get latest N projects
function getLatestProjects(count = 10) {
    return getProjectsSortedByDate().slice(0, count);
}

// Function to get projects by category
function getProjectsByCategory(category) {
    if (category === 'all') {
        return projects;
    }
    return projects.filter(project => project.category === category);
}

// Function to format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Helper function to get images array (supports both 'images' array and 'image' single for backward compatibility)
function getProjectImages(project) {
    if (project.images && Array.isArray(project.images)) {
        return project.images;
    } else if (project.image) {
        return [project.image];
    }
    return [];
}

// Function to get all unique categories from projects
function getAllCategories() {
    const categories = new Set();
    projects.forEach(project => {
        if (project.category) {
            categories.add(project.category);
        }
    });
    return Array.from(categories).sort();
}

// Function to format category name for display (capitalize first letter)
function formatCategoryName(category) {
    return category.charAt(0).toUpperCase() + category.slice(1);
}

// Function to get highlighted projects (for homepage Project Highlights section)
function getHighlightedProjects() {
    return projects.filter(project => project.highlight === true);
}

