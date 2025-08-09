# Adding New Tools to the ToolsSection

This document explains how to add new calculators/tools to the ToolsSection component.

## Overview

The ToolsSection component displays all available calculators in a grid layout on the homepage. It's designed to be easily extensible for future tools.

## File Structure

- `lib/tools.ts` - Configuration file containing all tool definitions
- `components/ToolsSection.tsx` - Component that renders the tools grid
- `app/sitemap.ts` - Dynamic sitemap generation (automatically includes all tools)
- `docs/ADDING_NEW_TOOLS.md` - This documentation file

## Adding a New Tool

### Step 1: Add Tool Configuration

Edit `lib/tools.ts` and add a new tool object to the `tools` array:

```typescript
{
  id: "your-tool-id",
  title: "Your Tool Title",
  description: "Brief description of what your tool does.",
  iconName: "IconName", // Must match one of the icons in iconMap
  href: "/your-tool-route",
  category: "Category Name",
  features: ["Feature 1", "Feature 2", "Feature 3"],
  color: "from-color-500 to-color-600" // Tailwind gradient classes
}
```

### Step 2: Add Icon (if needed)

If you need a new icon, add it to the `iconMap` in `components/ToolsSection.tsx`:

```typescript
import { YourNewIcon } from "lucide-react";

const iconMap: { [key: string]: React.ReactNode } = {
  // ... existing icons
  YourNewIcon: <YourNewIcon className="w-6 h-6" />,
};
```

### Step 3: Create the Tool Page

Create the actual calculator page at `app/your-tool-route/page.tsx` following the existing patterns.

### Step 4: Sitemap (Automatic)

The sitemap is automatically generated from the tools configuration in `app/sitemap.ts`. When you add a new tool to `lib/tools.ts`, it will automatically be included in the sitemap with:

- URL: `https://proratacalculator.co.uk/your-tool-route`
- Priority: 0.9 (high priority for tools)
- Change Frequency: weekly
- Last Modified: current date

## Tool Configuration Options

### Required Fields

- `id`: Unique identifier for the tool (used as React key)
- `title`: Display name of the tool
- `description`: Brief description of what the tool does
- `iconName`: Name of the icon (must exist in iconMap)
- `href`: Route to the tool page
- `category`: Category for grouping tools
- `features`: Array of key features (displayed as bullet points)
- `color`: Tailwind gradient classes for the icon background

### Available Icons

Currently supported icons (from Lucide React):

- `Calculator` - For general calculators
- `Calendar` - For date/time related tools
- `Clock` - For time-based calculations
- `PoundSterling` - For financial tools
- `Shield` - For protection/security tools
- `Users` - For people-related tools
- `FileText` - For document/text tools

### Color Options

Use Tailwind gradient classes:

- `from-blue-500 to-blue-600` - Blue theme
- `from-green-500 to-green-600` - Green theme
- `from-orange-500 to-orange-600` - Orange theme
- `from-purple-500 to-purple-600` - Purple theme
- `from-red-500 to-red-600` - Red theme

## Example: Adding a New Calculator

Here's a complete example of adding a "Pension Calculator":

### 1. Add to tools.ts

```typescript
{
  id: "pension-calculator",
  title: "Pension Calculator",
  description: "Calculate your pension contributions and retirement income based on UK pension rules.",
  iconName: "PoundSterling",
  href: "/pension-calculator",
  category: "Pensions",
  features: ["Pension contributions", "Retirement planning", "UK compliant"],
  color: "from-indigo-500 to-indigo-600"
}
```

### 2. Create the page

Create `app/pension-calculator/page.tsx` with your calculator implementation.

### 3. Test

Run `npm run build` to ensure everything compiles correctly.

### 4. Sitemap

The sitemap will automatically include your new tool at `https://proratacalculator.co.uk/pension-calculator`.

## Best Practices

1. **Consistent Naming**: Use kebab-case for IDs and routes
2. **Descriptive Titles**: Make titles clear and action-oriented
3. **Concise Descriptions**: Keep descriptions under 100 characters
4. **Relevant Features**: List 2-3 key features that users care about
5. **Appropriate Icons**: Choose icons that match the tool's purpose
6. **Category Grouping**: Use consistent categories for similar tools

## Categories

Current categories:

- Salary & Pay
- Holiday & Leave
- Redundancy
- Maternity & Family
- Sick Pay

Add new categories as needed, but try to group similar tools together.

## Troubleshooting

### Build Errors

If you get build errors:

1. Check that the icon name exists in `iconMap`
2. Ensure all required fields are provided
3. Verify the route exists and is accessible

### Styling Issues

If the tool card doesn't look right:

1. Check that the color gradient classes are valid
2. Ensure the description isn't too long
3. Verify the features array has 2-3 items

### Sitemap Issues

If your tool doesn't appear in the sitemap:

1. Check that the tool is properly added to `lib/tools.ts`
2. Verify the `href` field is correct
3. Run `npm run build` to regenerate the sitemap

## Future Enhancements

Potential improvements for the ToolsSection:

- Filtering by category
- Search functionality
- Tool popularity metrics
- User ratings/reviews
- Related tools suggestions
