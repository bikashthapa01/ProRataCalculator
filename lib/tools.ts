import {
  Calculator,
  Calendar,
  Clock,
  PoundSterling,
  Shield,
  TrendingUp,
  Users,
  FileText,
  ArrowRight,
} from "lucide-react";

export interface Tool {
  id: string;
  title: string;
  description: string;
  iconName: string;
  href: string;
  category: string;
  features: string[];
  color: string;
}

export const tools: Tool[] = [
  {
    id: "pro-rata-salary",
    title: "Pro Rata Salary Calculator",
    description:
      "Calculate your pro rata salary for part-time, reduced hours, or temporary work with accurate UK tax calculations.",
    iconName: "Calculator",
    href: "/pro-rata-salary-calculator",
    category: "Salary & Pay",
    features: [
      "Instant calculations",
      "UK tax compliant",
      "Multiple frequencies",
    ],
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "pro-rata-holiday",
    title: "Pro Rata Holiday Calculator",
    description:
      "Work out your holiday entitlement for part-time work, including bank holidays and leave calculations.",
    iconName: "Calendar",
    href: "/pro-rata-holiday-calculator",
    category: "Holiday & Leave",
    features: ["Holiday entitlement", "Bank holidays", "Leave calculations"],
    color: "from-green-500 to-green-600",
  },
  {
    id: "pro-rata-redundancy",
    title: "Pro Rata Redundancy Calculator",
    description:
      "Calculate your redundancy pay entitlement based on your length of service and weekly pay.",
    iconName: "Shield",
    href: "/pro-rata-redundancy-pay-calculator",
    category: "Redundancy",
    features: ["Statutory redundancy", "Length of service", "Weekly pay"],
    color: "from-orange-500 to-orange-600",
  },
  {
    id: "pro-rata-maternity",
    title: "Pro Rata Maternity Pay Calculator",
    description:
      "Calculate your maternity pay entitlement including Statutory Maternity Pay (SMP) for part-time workers.",
    iconName: "Users",
    href: "/pro-rata-maternity-pay-calculator",
    category: "Maternity & Family",
    features: ["SMP calculations", "Part-time workers", "Eligibility checks"],
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "pro-rata-sick-pay",
    title: "Pro Rata Sick Pay Calculator",
    description:
      "Calculate your Statutory Sick Pay (SSP) entitlement for part-time workers with 2025 rates.",
    iconName: "FileText",
    href: "/pro-rata-sick-pay-calculator",
    category: "Sick Pay",
    features: ["SSP calculations", "2025 rates", "Part-time workers"],
    color: "from-red-500 to-red-600",
  },
  {
    id: "pro-rata-bonus",
    title: "Pro Rata Bonus Calculator",
    description:
      "Work out your pro rata bonus entitlement for part-time or partial-year UK jobs with instant calculations and detailed breakdown.",
    iconName: "TrendingUp",
    href: "/pro-rata-bonus-calculator",
    category: "Bonuses & Benefits",
    features: [
      "Part-time bonuses",
      "Partial year calculations",
      "UK employment law",
    ],
    color: "from-yellow-500 to-yellow-600",
  },
  {
    id: "pro-rata-paternity-pay",
    title: "Pro Rata Paternity Pay Calculator",
    description:
      "Work out Statutory Paternity Pay for part-time or full-time UK workers using 2025 rules. Check eligibility and see your SPP rate instantly.",
    iconName: "Heart",
    href: "/pro-rata-paternity-pay-calculator",
    category: "Family & Parental Pay",
    features: ["Statutory Paternity Pay", "Part-time support", "2025 UK rules"],
    color: "from-blue-500 to-purple-600",
  },
  {
    id: "term-time-only-salary",
    title: "Term-Time Only Salary Calculator",
    description:
      "Convert an FTE salary to a UK term-time only salary. Enter term weeks, paid holidays, and hours to get annual, monthly, weekly, and daily pay with FTE comparison.",
    iconName: "School",
    href: "/term-time-only-salary-calculator",
    category: "Education & Schools",
    features: [
      "TTO salary calculation",
      "Real-time updates",
      "Education focused",
    ],
    color: "from-green-500 to-blue-600",
  },
];

// Helper function to add new tools
export function addTool(tool: Tool) {
  tools.push(tool);
}

// Helper function to get tools by category
export function getToolsByCategory(category: string): Tool[] {
  return tools.filter((tool) => tool.category === category);
}

// Helper function to get all categories
export function getCategories(): string[] {
  return Array.from(new Set(tools.map((tool) => tool.category)));
}
