// Tax Calculator for UK and Scotland - Multi-Year Support

export interface TaxBand {
  name: string;
  rate: number;
  threshold: number;
  upper: number | null;
}

export interface TaxRates {
  year: string;
  region: string;
  personalAllowance: number;
  taperStart: number;
  taperEnd: number;
  bands: TaxBand[];
}

export interface NIRates {
  region: string;
  primaryThreshold: number;
  upperEarningsLimit: number;
  rates: {
    name: string;
    rate: number;
    threshold: number;
    upper: number | null;
  }[];
}

// Compute effective personal allowance — tapers by £1 for every £2 earned above £100k
function getEffectivePA(
  grossSalary: number,
  personalAllowance: number,
  taperStart: number
): number {
  if (grossSalary <= taperStart) return personalAllowance;
  return Math.max(0, personalAllowance - Math.floor((grossSalary - taperStart) / 2));
}

// Compute income tax across bands, starting from effectivePA as the zero-tax floor
function computeIncomeTax(
  grossSalary: number,
  effectivePA: number,
  bands: TaxBand[]
): { total: number; breakdown: Record<string, number> } {
  if (grossSalary <= effectivePA) return { total: 0, breakdown: {} };
  const breakdown: Record<string, number> = {};
  let total = 0;
  let prevCeiling = effectivePA;

  for (const band of bands) {
    const bandTop = band.upper !== null ? band.upper : grossSalary;
    const taxable = Math.max(0, Math.min(grossSalary, bandTop) - prevCeiling);
    if (taxable > 0) {
      breakdown[band.name] = taxable * band.rate;
      total += breakdown[band.name];
    }
    prevCeiling = bandTop;
    if (prevCeiling >= grossSalary) break;
  }

  return { total, breakdown };
}

// Compute National Insurance using band thresholds directly
function computeNI(
  grossSalary: number,
  rates: { name: string; rate: number; threshold: number; upper: number | null }[]
): { total: number; breakdown: Record<string, number> } {
  const breakdown: Record<string, number> = {};
  let total = 0;
  // NI starts at the primary threshold; everything below is exempt
  let prevCeiling = rates[0].threshold - 1;

  for (const rate of rates) {
    const rateTop = rate.upper !== null ? rate.upper : grossSalary;
    const taxable = Math.max(0, Math.min(grossSalary, rateTop) - prevCeiling);
    if (taxable > 0) {
      breakdown[rate.name] = taxable * rate.rate;
      total += breakdown[rate.name];
    }
    prevCeiling = rateTop;
    if (prevCeiling >= grossSalary) break;
  }

  return { total, breakdown };
}

// 2026/27 Tax Year Rates (thresholds frozen until April 2028; same values as 2025/26)
export const TAX_BANDS_2026 = {
  uk: {
    year: "2026/27",
    region: "England, Wales, NI",
    personalAllowance: 12570,
    taperStart: 100000,
    taperEnd: 125140,
    bands: [
      { name: "Basic Rate", rate: 0.2, threshold: 12571, upper: 50270 },
      { name: "Higher Rate", rate: 0.4, threshold: 50271, upper: 125140 },
      { name: "Additional Rate", rate: 0.45, threshold: 125141, upper: null },
    ],
  },
  scotland: {
    year: "2026/27",
    region: "Scotland",
    personalAllowance: 12570,
    taperStart: 100000,
    taperEnd: 125140,
    bands: [
      { name: "Starter Rate", rate: 0.19, threshold: 12571, upper: 14876 },
      { name: "Basic Rate", rate: 0.2, threshold: 14877, upper: 26561 },
      { name: "Intermediate Rate", rate: 0.21, threshold: 26562, upper: 43662 },
      { name: "Higher Rate", rate: 0.42, threshold: 43663, upper: 75000 },
      { name: "Advanced Rate", rate: 0.45, threshold: 75001, upper: 125140 },
      { name: "Top Rate", rate: 0.48, threshold: 125141, upper: null },
    ],
  },
};

export const NI_RATES_2026 = {
  employee: {
    year: "2026/27",
    region: "UK",
    primaryThreshold: 12570,
    upperEarningsLimit: 50270,
    rates: [
      { name: "Main Rate", rate: 0.08, threshold: 12571, upper: 50270 },
      { name: "Upper Rate", rate: 0.02, threshold: 50271, upper: null },
    ],
  },
  employer: {
    year: "2026/27",
    region: "UK",
    secondaryThreshold: 9100,
    rate: 0.138,
  },
};

// 2025/26 Tax Year Rates
export const TAX_BANDS_2025 = {
  uk: {
    year: "2025/26",
    region: "England, Wales, NI",
    personalAllowance: 12570,
    taperStart: 100000,
    taperEnd: 125140,
    bands: [
      { name: "Basic Rate", rate: 0.2, threshold: 12571, upper: 50270 },
      { name: "Higher Rate", rate: 0.4, threshold: 50271, upper: 125140 },
      { name: "Additional Rate", rate: 0.45, threshold: 125141, upper: null },
    ],
  },
  scotland: {
    year: "2025/26",
    region: "Scotland",
    personalAllowance: 12570,
    taperStart: 100000,
    taperEnd: 125140,
    bands: [
      { name: "Starter Rate", rate: 0.19, threshold: 12571, upper: 14876 },
      { name: "Basic Rate", rate: 0.2, threshold: 14877, upper: 26561 },
      { name: "Intermediate Rate", rate: 0.21, threshold: 26562, upper: 43662 },
      { name: "Higher Rate", rate: 0.42, threshold: 43663, upper: 75000 },
      { name: "Advanced Rate", rate: 0.45, threshold: 75001, upper: 125140 },
      { name: "Top Rate", rate: 0.48, threshold: 125141, upper: null },
    ],
  },
};

export const NI_RATES_2025 = {
  employee: {
    year: "2025/26",
    region: "UK",
    primaryThreshold: 12570,
    upperEarningsLimit: 50270,
    rates: [
      { name: "Main Rate", rate: 0.08, threshold: 12571, upper: 50270 },
      { name: "Upper Rate", rate: 0.02, threshold: 50271, upper: null },
    ],
  },
  employer: {
    year: "2025/26",
    region: "UK",
    secondaryThreshold: 9100,
    rate: 0.138,
  },
};

// 2024/25 Tax Year Rates (NI main rate was 8% for the full year from April 2024)
export const TAX_BANDS_2024 = {
  uk: {
    year: "2024/25",
    region: "England, Wales, NI",
    personalAllowance: 12570,
    taperStart: 100000,
    taperEnd: 125140,
    bands: [
      { name: "Basic Rate", rate: 0.2, threshold: 12571, upper: 50270 },
      { name: "Higher Rate", rate: 0.4, threshold: 50271, upper: 125140 },
      { name: "Additional Rate", rate: 0.45, threshold: 125141, upper: null },
    ],
  },
  scotland: {
    year: "2024/25",
    region: "Scotland",
    personalAllowance: 12570,
    taperStart: 100000,
    taperEnd: 125140,
    bands: [
      { name: "Starter Rate", rate: 0.19, threshold: 12571, upper: 14876 },
      { name: "Basic Rate", rate: 0.2, threshold: 14877, upper: 26561 },
      { name: "Intermediate Rate", rate: 0.21, threshold: 26562, upper: 43662 },
      { name: "Higher Rate", rate: 0.42, threshold: 43663, upper: 75000 },
      { name: "Advanced Rate", rate: 0.45, threshold: 75001, upper: 125140 },
      { name: "Top Rate", rate: 0.48, threshold: 125141, upper: null },
    ],
  },
};

export const NI_RATES_2024 = {
  employee: {
    year: "2024/25",
    region: "UK",
    primaryThreshold: 12570,
    upperEarningsLimit: 50270,
    rates: [
      { name: "Main Rate", rate: 0.08, threshold: 12571, upper: 50270 },
      { name: "Upper Rate", rate: 0.02, threshold: 50271, upper: null },
    ],
  },
  employer: {
    year: "2024/25",
    region: "UK",
    secondaryThreshold: 9100,
    rate: 0.138,
  },
};

// Tax year registry
export const TAX_YEARS = {
  "2026/27": {
    taxBands: TAX_BANDS_2026,
    niRates: NI_RATES_2026,
  },
  "2025/26": {
    taxBands: TAX_BANDS_2025,
    niRates: NI_RATES_2025,
  },
  "2024/25": {
    taxBands: TAX_BANDS_2024,
    niRates: NI_RATES_2024,
  },
} as const;

export type TaxYear = keyof typeof TAX_YEARS;

export interface TaxCalculation {
  grossSalary: number;
  personalAllowance: number;
  taxableIncome: number;
  incomeTax: number;
  nationalInsurance: number;
  takeHomePay: number;
  effectiveTaxRate: number;
  taxYear: TaxYear;
  breakdown: {
    incomeTax: Record<string, number>;
    nationalInsurance: Record<string, number>;
  };
}

export interface ScottishTaxCalculation extends TaxCalculation {
  scottishIncomeTax: number;
  scottishBreakdown: Record<string, number>;
}

export function getAvailableTaxYears(): TaxYear[] {
  return Object.keys(TAX_YEARS) as TaxYear[];
}

export function getDefaultTaxYear(): TaxYear {
  return "2026/27";
}

export function calculateUKTax(
  grossSalary: number,
  isScotland: boolean = false,
  taxYear: TaxYear = "2026/27"
): TaxCalculation | ScottishTaxCalculation {
  if (isScotland) {
    return calculateScottishTax(grossSalary, taxYear);
  }
  return calculateUKIncomeTax(grossSalary, taxYear);
}

export function calculateUKIncomeTax(
  grossSalary: number,
  taxYear: TaxYear = "2026/27"
): TaxCalculation {
  const taxData = TAX_YEARS[taxYear];
  const { personalAllowance, taperStart, bands } = taxData.taxBands.uk;

  const effectivePA = getEffectivePA(grossSalary, personalAllowance, taperStart);
  const taxableIncome = Math.max(0, grossSalary - effectivePA);

  const { total: incomeTax, breakdown: taxBreakdown } = computeIncomeTax(
    grossSalary,
    effectivePA,
    bands
  );

  const { total: nationalInsurance, breakdown: niBreakdown } = computeNI(
    grossSalary,
    taxData.niRates.employee.rates
  );

  const takeHomePay = grossSalary - incomeTax - nationalInsurance;
  const effectiveTaxRate =
    grossSalary > 0 ? ((incomeTax + nationalInsurance) / grossSalary) * 100 : 0;

  return {
    grossSalary,
    personalAllowance: effectivePA,
    taxableIncome,
    incomeTax,
    nationalInsurance,
    takeHomePay,
    effectiveTaxRate,
    taxYear,
    breakdown: {
      incomeTax: taxBreakdown,
      nationalInsurance: niBreakdown,
    },
  };
}

export function calculateScottishTax(
  grossSalary: number,
  taxYear: TaxYear = "2026/27"
): ScottishTaxCalculation {
  const taxData = TAX_YEARS[taxYear];
  const { personalAllowance, taperStart, bands } = taxData.taxBands.scotland;

  const effectivePA = getEffectivePA(grossSalary, personalAllowance, taperStart);
  const taxableIncome = Math.max(0, grossSalary - effectivePA);

  const { total: scottishIncomeTax, breakdown: scottishBreakdown } = computeIncomeTax(
    grossSalary,
    effectivePA,
    bands
  );

  const { total: nationalInsurance, breakdown: niBreakdown } = computeNI(
    grossSalary,
    taxData.niRates.employee.rates
  );

  const takeHomePay = grossSalary - scottishIncomeTax - nationalInsurance;
  const effectiveTaxRate =
    grossSalary > 0
      ? ((scottishIncomeTax + nationalInsurance) / grossSalary) * 100
      : 0;

  return {
    grossSalary,
    personalAllowance: effectivePA,
    taxableIncome,
    incomeTax: scottishIncomeTax,
    nationalInsurance,
    takeHomePay,
    effectiveTaxRate,
    taxYear,
    breakdown: {
      incomeTax: scottishBreakdown,
      nationalInsurance: niBreakdown,
    },
    scottishIncomeTax,
    scottishBreakdown,
  };
}

export { formatCurrency, formatPercentage } from "@/lib/utils";
