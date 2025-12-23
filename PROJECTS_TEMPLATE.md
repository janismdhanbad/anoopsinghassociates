# Projects Data Template Guide

## Overview
The projects system uses a centralized data structure stored in `projects.js` to manage all portfolio projects. This allows for easy date-based sorting and dynamic rendering across the website.

## File Structure
- **`projects.js`** - Contains the projects data array and utility functions
- **`script.js`** - Contains rendering functions for displaying projects
- **`index.html`** - Displays the latest 10 projects dynamically
- **`portfolio.html`** - Displays all projects sorted by date

## Adding a New Project

To add a new project, edit `projects.js` and add a new object to the `projects` array:

### Single Image Project:
```javascript
{
    date: 'YYYY-MM-DD',        // Format: Year-Month-Day (e.g., '2025-12-25')
    name: 'Project Name',      // Full project name
    category: 'category-type',  // One of: residential, commercial, institutional, industrial
    highlight: true,            // Optional: if true, appears in Project Highlights on homepage
    images: ['path/to/image.jpg'] // Array with single image (or use 'image' for backward compatibility)
}
```

### Multiple Images Project (Auto-Rotating Slideshow):
```javascript
{
    date: 'YYYY-MM-DD',
    name: 'Project Name',
    category: 'category-type',
    images: [
        'images/portfolio/project-image-1.jpg',
        'images/portfolio/project-image-2.jpg',
        'images/portfolio/project-image-3.jpg'
    ]
}
```

### Examples:

**Single Image:**
```javascript
{
    date: '2025-12-25',
    name: 'New Residential Complex',
    category: 'residential',
    images: ['images/portfolio/new-project.jpg']
}
```

**Multiple Images (Auto-Rotating):**
```javascript
{
    date: '2025-12-25',
    name: 'Luxury Apartment Complex',
    category: 'residential',
    highlight: true,  // Will appear in Project Highlights section
    images: [
        'images/portfolio/apartment-exterior.jpg',
        'images/portfolio/apartment-interior.jpg',
        'images/portfolio/apartment-amenities.jpg',
        'images/portfolio/apartment-view.jpg'
    ]
}
```

## Multiple Images Feature

When a project has multiple images:
- **Auto-Rotation**: Images automatically rotate every 3 seconds
- **Visual Indicators**: Dots at the bottom show which image is currently displayed
- **Hover to Pause**: Hovering over the project pauses the slideshow
- **Click Indicators**: Click on any indicator dot to jump to that specific image
- **Smooth Transitions**: Fade effect between images for a professional look

## Project Categories

You can use any category name you want! The filter buttons will automatically update to include all categories present in your projects.

**Common categories:**
- `residential` - Residential projects
- `commercial` - Commercial projects
- `institutional` - Institutional projects (schools, colleges, etc.)
- `industrial` - Industrial projects

**Adding a new category:**
Simply use a new category name in your project, and it will automatically appear as a filter button! For example:
- `mixed-use` - Mixed-use developments
- `hospitality` - Hotels and resorts
- `healthcare` - Hospitals and medical facilities
- `educational` - Schools and universities
- Or any custom category name you prefer

The filter buttons are generated automatically based on all unique categories found in your projects data.

## Highlight Feature
- Add `highlight: true` to any project to feature it in the Project Highlights section on the homepage
- Only projects with `highlight: true` appear on the homepage
- The portfolio page (`portfolio.html`) displays all projects regardless of highlight status
- Filter buttons on homepage only show categories from highlighted projects

## Date Format
- Use ISO format: `YYYY-MM-DD` (e.g., `2025-12-23`)
- Projects are automatically sorted by date (newest first) on the portfolio page
- The homepage (`index.html`) displays only projects with `highlight: true`
- The portfolio page (`portfolio.html`) displays all projects sorted by date

## Functions Available

### `getProjectsSortedByDate()`
Returns all projects sorted by date (newest first).

### `getLatestProjects(count)`
Returns the latest N projects. Default is 10.
```javascript
const latest = getLatestProjects(10);
```

### `getProjectsByCategory(category)`
Returns projects filtered by category.
```javascript
const residential = getProjectsByCategory('residential');
const all = getProjectsByCategory('all');
```

### `formatDate(dateString)`
Formats a date string for display.
```javascript
formatDate('2025-12-23'); // Returns: "Dec 23, 2025"
```

## Updating Existing Projects

To update the date of an existing project:
1. Open `projects.js`
2. Find the project in the `projects` array
3. Update the `date` field with the correct date in `YYYY-MM-DD` format

## Notes
- All existing projects are currently set to `2025-12-23` as a placeholder
- Update these dates with the actual project completion dates
- New projects added will automatically appear on both the homepage and portfolio page
- The homepage will always show the 10 most recent projects based on date

