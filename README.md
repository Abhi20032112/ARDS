# Alpenrose Digital Solutions Website

A modern, animated React website for Alpenrose Digital Solutions, featuring BrandRadiator-inspired animations and Supabase CMS integration.

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion powered animations with reduced motion support
- **CMS Integration**: Supabase backend for dynamic content management
- **SEO Optimized**: Helmet meta tags, OpenGraph, and structured data
- **Performance**: Lazy loading, optimized images, and efficient builds

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Supabase
- **Icons**: Lucide React
- **Routing**: React Router

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/alpenrose-digital-solutions.git
cd alpenrose-digital-solutions
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

## CMS Setup

### Supabase Configuration

1. Create a new Supabase project
2. Run the following SQL to create tables:

```sql
-- Projects table
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contacts table
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Content Management

#### Adding Projects

Insert sample projects:
```sql
INSERT INTO projects (title, description, image, category) VALUES
('E-commerce Platform', 'Complete digital transformation for retail business', '/assets/project1.jpg', 'web-development'),
('Social Media Campaign', 'Viral marketing campaign reaching 1M+ users', '/assets/project2.jpg', 'marketing'),
('Brand Identity', 'Complete rebrand with modern logo and guidelines', '/assets/project3.jpg', 'branding');
```

#### Adding Blog Posts

```sql
INSERT INTO blog_posts (title, slug, content, excerpt, date) VALUES
('Digital Marketing Trends 2024', 'digital-marketing-trends-2024',
 'Content about latest trends...', 'Overview of emerging digital marketing trends', '2024-01-15');
```

#### Managing Testimonials

```sql
INSERT INTO testimonials (name, message, rating) VALUES
('John Doe', 'Excellent service and results!', 5),
('Jane Smith', 'Highly recommend their expertise', 5);
```

## Animation Customization

### Key Animation Classes

- `.reveal-fade`: Fade in on scroll
- `.reveal-zoom`: Scale in on scroll
- `.hover-lift`: Lift effect on hover
- `.icon-spin`: Icon rotation animation
- `.card-hover`: Card hover effects
- `.tilt-card`: 3D tilt on hover

### Framer Motion Variants

Common variants used throughout the site:

```javascript
const fadeIn = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
  viewport: { once: true, amount: 0.2 }
};
```

### Reduced Motion Support

All animations respect `prefers-reduced-motion` media query for accessibility.

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify/Vercel

1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in deployment settings

## Performance Optimization

- **Lazy Loading**: Images load on demand
- **Code Splitting**: Route-based code splitting
- **Image Optimization**: WebP format with fallbacks
- **Bundle Analysis**: Use `npm run build` to analyze bundle size

## SEO Features

- Dynamic meta tags via React Helmet
- OpenGraph tags for social sharing
- JSON-LD structured data
- Sitemap generation (future enhancement)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary to Alpenrose Digital Solutions.

## Support

For technical support or questions:
- Email: support@alpenrose-digital.com
- Website: https://alpenrose-digital.com/contact
