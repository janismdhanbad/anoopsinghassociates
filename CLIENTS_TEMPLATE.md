# Clients Data Template Guide

## Overview
The clients system uses a centralized data structure stored in `clients.js` to manage all client information including major industrial clients (text list) and client logos. This allows for easy management and dynamic rendering across the website.

## File Structure
- **`clients.js`** - Contains the clients data arrays and utility functions
- **`script.js`** - Contains rendering functions for displaying clients
- **`clients.html`** - Displays all clients dynamically

## Adding a Major Industrial Client

To add a new major industrial client to the text list, edit `clients.js` and add a new entry to the `majorClients` array:

```javascript
const majorClients = [
    'DABUR INDIA, ALWAR',
    'YOUR NEW CLIENT NAME, LOCATION',  // Add your new client here
    // ... other clients
];
```

### Example:
```javascript
const majorClients = [
    'DABUR INDIA, ALWAR',
    'NEW COMPANY PRIVATE LIMITED, ALWAR',  // New client
    'UNITED SPRITS LIMITED, ALWAR',
    // ... rest of clients
];
```

## Adding a Client Logo

To add a new client logo, edit `clients.js` and add a new object to the `clientLogos` array:

```javascript
{
    name: 'Client Name',           // Display name for alt text
    image: 'path/to/logo.png'      // Path to logo image
}
```

### Example:
```javascript
const clientLogos = [
    {
        name: 'Buildwell',
        image: 'images/empanelled/BUILDWELL.png'
    },
    {
        name: 'New Client Company',
        image: 'images/empanelled/new-client-logo.png'  // New logo
    },
    // ... other logos
];
```

## Client Logo Image Requirements

- **Location**: Store logo images in the `images/empanelled/` directory
- **Formats**: Supported formats include PNG, JPG, JPEG
- **Naming**: Use descriptive filenames (e.g., `company-name-logo.png`)
- **Size**: Recommended size is around 200-300px width for best display

## Functions Available

### `getMajorClients()`
Returns all major industrial clients as an array of strings.
```javascript
const clients = getMajorClients();
```

### `getClientLogos()`
Returns all client logos as an array of objects.
```javascript
const logos = getClientLogos();
```

## Rendering Functions

### `renderMajorClients(containerSelector)`
Renders the major clients list into the specified container.
```javascript
renderMajorClients('.clients-list');
```

### `renderClientLogos(containerSelector)`
Renders the client logos grid into the specified container.
```javascript
renderClientLogos('.clients-logos-grid');
```

## Updating Existing Clients

### To update a client name:
1. Open `clients.js`
2. Find the client in the `majorClients` array
3. Update the name as needed

### To update a client logo:
1. Open `clients.js`
2. Find the logo object in the `clientLogos` array
3. Update the `name` or `image` path as needed

## Notes
- Major clients are displayed as a text list in columns
- Client logos are displayed in a responsive grid layout
- All changes to `clients.js` will automatically reflect on the clients page
- The clients page (`clients.html`) displays all clients regardless of any filters

