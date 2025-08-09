# Pro Rata Calculator

A professional, premium Pro Rata Calculator website built with Next.js 15 and the App Router. This calculator helps users determine their pro rata salary, pay, and holiday entitlement for part-time, reduced hours, and temporary work arrangements.

## Features

- **Professional Design**: Dark mode with glassmorphism effects and gradient accents
- **Mobile-First**: Optimized for all device sizes with responsive design
- **SEO Optimized**: Semantic HTML, meta tags, and schema.org markup
- **Instant Calculations**: Real-time pro rata salary calculations
- **Copy Results**: Easy sharing of calculation results
- **FAQ Section**: Comprehensive answers to common questions
- **UK Compliant**: Follows HMRC guidelines and UK employment law

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **SEO**: Optimized metadata and schema markup

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd pro-rata-calculator
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
prorata/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Main page component
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx          # Hero section
│   ├── ProRataCalculator.tsx # Main calculator
│   ├── FAQ.tsx           # FAQ section
│   └── Footer.tsx        # Footer component
├── lib/                   # Utility functions
│   └── utils.ts          # Calculator logic and utilities
├── design.json           # Design system configuration
├── tailwind.config.js    # Tailwind configuration
└── package.json          # Dependencies and scripts
```

## Design System

The project follows a comprehensive design system defined in `design.json`:

- **Dark Theme**: Professional dark mode with purple gradient accents
- **Typography**: Inter font family with clear hierarchy
- **Components**: Glassmorphic cards, pill buttons, and gradient effects
- **Layout**: Mobile-first responsive design with proper spacing
- **Animations**: Smooth transitions and micro-interactions

## Calculator Features

- **Salary Input**: Full-time salary with frequency selection
- **Hours Configuration**: Adjustable full-time and actual working hours
- **Real-time Results**: Instant calculation of pro rata amounts
- **Multiple Formats**: Yearly, monthly, weekly, daily, and hourly rates
- **Percentage Display**: Clear pro rata percentage calculation
- **Copy Functionality**: Easy sharing of results

## SEO Features

- **Semantic HTML**: Proper use of `<header>`, `<main>`, `<section>`, `<footer>`
- **Meta Tags**: Comprehensive metadata for search engines
- **Schema Markup**: FAQ schema.org markup for rich snippets
- **Open Graph**: Social media optimization
- **Structured Data**: WebApplication schema for enhanced search results

## Performance

- **Server Components**: Next.js 15 server components for optimal performance
- **Client Components**: Strategic use of client components where needed
- **Optimized Images**: Next.js Image optimization
- **Code Splitting**: Automatic code splitting by Next.js
- **Caching**: Built-in caching strategies

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.

---

Built with ❤️ for UK workers who need accurate pro rata calculations.
