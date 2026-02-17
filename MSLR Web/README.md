# LinkedIn Jobs Page Clone

A responsive LinkedIn-style jobs page built with HTML, CSS, and JavaScript using Tailwind CSS for modern styling.

## Features

### 🎨 **Modern UI Design**
- Clean, professional LinkedIn-inspired interface
- Responsive design that works on desktop and mobile
- Smooth animations and hover effects
- Custom scrollbars and visual feedback

### 📱 **Layout Structure**
- **Header**: Full-width fixed header with navigation and search
- **Left Sidebar (30%)**: Fixed sidebar with user profile and navigation menu
- **Right Content (70%)**: Scrollable content area with job listings
- **Footer**: Simple footer at the bottom

### 🔧 **Interactive Features**
- **Navigation**: Switch between different content sections (Preferences, My Jobs, Career Insights)
- **Job Cards**: Interactive job listings with hover effects
- **Search**: Functional search inputs with debounced search
- **Dismiss**: Remove job cards and sections with smooth animations
- **Responsive**: Adapts to different screen sizes

### 🎯 **Key Components**

#### Header
- LinkedIn logo and branding
- Search functionality for jobs and location
- Navigation menu with notification badges
- User profile dropdown

#### Left Sidebar
- **User Profile Card**: Profile picture, name, title, location, company
- **Quick Actions Menu**: Navigation links to different sections
- **Post Job Button**: Call-to-action button
- **Footer Links**: Standard LinkedIn footer links

#### Right Content Area
- **Top Job Picks**: Personalized job recommendations
- **Suggested Searches**: Quick search tags for common job titles
- **Premium Section**: Premium features promotion
- **Dynamic Content**: Different sections based on navigation

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # Custom CSS styles
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Custom styles and animations
- **JavaScript**: Interactive functionality
- **Tailwind CSS**: Utility-first CSS framework
- **Font Awesome**: Icons and visual elements

## Getting Started

1. **Clone or download** the project files
2. **Open `index.html`** in your web browser
3. **No build process required** - everything works out of the box!

## Usage

### Navigation
- Click on the sidebar menu items to switch between different content sections
- Use the search bar to search for jobs (console logging for demo)
- Click on job cards to interact with them

### Responsive Design
- **Desktop**: Full layout with fixed sidebar
- **Tablet**: Adjusted proportions for medium screens
- **Mobile**: Stacked layout for small screens

### Interactive Elements
- **Job Cards**: Hover for effects, click for interaction
- **Search Tags**: Click to simulate job searches
- **Dismiss Buttons**: Remove cards with smooth animations
- **Navigation Links**: Switch content sections

## Customization

### Colors
The design uses LinkedIn's color scheme:
- Primary Blue: `#0077b5`
- Secondary Blue: `#00a0dc`
- Gray tones for text and backgrounds

### Adding New Sections
1. Add new content div in the right content area
2. Add corresponding navigation link in the sidebar
3. Update JavaScript to handle the new section

### Styling
- Modify `styles.css` for custom animations and effects
- Use Tailwind classes in HTML for quick styling
- Add new CSS classes for specific components

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Features to Add

- [ ] Real job search API integration
- [ ] User authentication
- [ ] Job application functionality
- [ ] Save/bookmark jobs
- [ ] Email notifications
- [ ] Advanced filtering
- [ ] Dark mode toggle

## Contributing

Feel free to fork this project and add your own features or improvements!

## License

This is a demonstration project for educational purposes.

---

**Note**: This is a frontend-only demonstration. For a production application, you would need to integrate with backend services for job data, user authentication, and other features.


