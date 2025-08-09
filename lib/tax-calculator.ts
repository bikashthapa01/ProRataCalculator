// Tax Calculator for UK and Scotland - Multi-Year Support
// Updated with latest HMRC rates for 2025/26 and future-proof structure

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

// 2025/26 Tax Year Rates - Updated with correct rates
export const TAX_BANDS_2025 = {
  uk: {
    year: "2025/26",
    region: "England, Wales, NI",
    personalAllowance: 12570,
    taperStart: 100000,
    taperEnd: 125140,
    bands: [
      {
        name: "Basic Rate",
        rate: 0.2,
        threshold: 12571,
        upper: 50270,
      },
      {
        name: "Higher Rate",
        rate: 0.4,
        threshold: 50271,
        upper: 125140,
      },
      {
        name: "Additional Rate",
        rate: 0.45,
        threshold: 125141,
        upper: null, // no upper limit
      },
    ],
  },
  scotland: {
    year: "2025/26",
    region: "Scotland",
    personalAllowance: 12570,
    taperStart: 100000,
    taperEnd: 125140,
    bands: [
      {
        name: "Starter Rate",
        rate: 0.19,
        threshold: 12571,
        upper: 14876,
      },
      {
        name: "Basic Rate",
        rate: 0.2,
        threshold: 14877,
        upper: 26561,
      },
      {
        name: "Intermediate Rate",
        rate: 0.21,
        threshold: 26562,
        upper: 43662,
      },
      {
        name: "Higher Rate",
        rate: 0.42,
        threshold: 43663,
        upper: 75000,
      },
      {
        name: "Advanced Rate",
        rate: 0.45,
        threshold: 75001,
        upper: 125140,
      },
      {
        name: "Top Rate",
        rate: 0.48,
        threshold: 125141,
        upper: null,
      },
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
      {
        name: "Main Rate",
        rate: 0.08,
        threshold: 12571,
        upper: 50270,
      },
      {
        name: "Upper Rate",
        rate: 0.02,
        threshold: 50271,
        upper: null, // no upper limit
      },
    ],
  },
  employer: {
    year: "2025/26",
    region: "UK",
    secondaryThreshold: 9100,
    rate: 0.138,
  },
};

// Future tax years can be added here
export const TAX_BANDS_2024 = {
  uk: {
    year: "2024/25",
    region: "England, Wales, NI",
    personalAllowance: 12570,
    taperStart: 100000,
    taperEnd: 125140,
    bands: [
      {
        name: "Basic Rate",
        rate: 0.2,
        threshold: 12571,
        upper: 50270,
      },
      {
        name: "Higher Rate",
        rate: 0.4,
        threshold: 50271,
        upper: 125140,
      },
      {
        name: "Additional Rate",
        rate: 0.45,
        threshold: 125141,
        upper: null,
      },
    ],
  },
  scotland: {
    year: "2024/25",
    region: "Scotland",
    personalAllowance: 12570,
    taperStart: 100000,
    taperEnd: 125140,
    bands: [
      {
        name: "Starter Rate",
        rate: 0.19,
        threshold: 12571,
        upper: 14876,
      },
      {
        name: "Basic Rate",
        rate: 0.2,
        threshold: 14877,
        upper: 26561,
      },
      {
        name: "Intermediate Rate",
        rate: 0.21,
        threshold: 26562,
        upper: 43662,
      },
      {
        name: "Higher Rate",
        rate: 0.42,
        threshold: 43663,
        upper: 75000,
      },
      {
        name: "Advanced Rate",
        rate: 0.45,
        threshold: 75001,
        upper: 125140,
      },
      {
        name: "Top Rate",
        rate: 0.48,
        threshold: 125141,
        upper: null,
      },
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
      {
        name: "Main Rate",
        rate: 0.12,
        threshold: 12571,
        upper: 50270,
      },
      {
        name: "Upper Rate",
        rate: 0.02,
        threshold: 50271,
        upper: null,
      },
    ],
  },
  employer: {
    year: "2024/25",
    region: "UK",
    secondaryThreshold: 9100,
    rate: 0.138,
  },
};

// Tax year registry - easy to add new years
export const TAX_YEARS = {
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
  return "2025/26";
}

export function calculateUKTax(
  grossSalary: number,
  isScotland: boolean = false,
  taxYear: TaxYear = "2025/26"
): TaxCalculation | ScottishTaxCalculation {
  if (isScotland) {
    return calculateScottishTax(grossSalary, taxYear);
  }

  return calculateUKIncomeTax(grossSalary, taxYear);
}

export function calculateUKIncomeTax(
  grossSalary: number,
  taxYear: TaxYear = "2025/26"
): TaxCalculation {
  const taxData = TAX_YEARS[taxYear];
  const personalAllowance = taxData.taxBands.uk.personalAllowance;
  const taxableIncome = Math.max(0, grossSalary - personalAllowance);

  // Calculate income tax
  let incomeTax = 0;
  const taxBreakdown: Record<string, number> = {};

  for (const band of taxData.taxBands.uk.bands) {
    if (taxableIncome > band.threshold - personalAllowance) {
      const bandStart = Math.max(band.threshold - personalAllowance, 0);
      const bandEnd = band.upper
        ? Math.min(band.upper - personalAllowance, taxableIncome)
        : taxableIncome;

      if (bandEnd > bandStart) {
        const bandAmount = bandEnd - bandStart;
        const bandTax = bandAmount * band.rate;
        incomeTax += bandTax;
        taxBreakdown[band.name] = bandTax;
      }
    }
  }

  // Calculate National Insurance
  let nationalInsurance = 0;
  const niBreakdown: Record<string, number> = {};

  for (const rate of taxData.niRates.employee.rates) {
    if (grossSalary > rate.threshold - 1) {
      const rateStart = Math.max(rate.threshold - 1, 0);
      const rateEnd = rate.upper
        ? Math.min(rate.upper, grossSalary)
        : grossSalary;

      if (rateEnd > rateStart) {
        const rateAmount = rateEnd - rateStart;
        const rateNI = rateAmount * rate.rate;
        nationalInsurance += rateNI;
        niBreakdown[rate.name] = rateNI;
      }
    }
  }

  const takeHomePay = grossSalary - incomeTax - nationalInsurance;
  const effectiveTaxRate =
    grossSalary > 0 ? ((incomeTax + nationalInsurance) / grossSalary) * 100 : 0;

  return {
    grossSalary,
    personalAllowance,
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
  taxYear: TaxYear = "2025/26"
): ScottishTaxCalculation {
  const taxData = TAX_YEARS[taxYear];
  const personalAllowance = taxData.taxBands.scotland.personalAllowance;
  const taxableIncome = Math.max(0, grossSalary - personalAllowance);

  // Calculate Scottish income tax
  let scottishIncomeTax = 0;
  const scottishBreakdown: Record<string, number> = {};

  for (const band of taxData.taxBands.scotland.bands) {
    if (taxableIncome > band.threshold - personalAllowance) {
      const bandStart = Math.max(band.threshold - personalAllowance, 0);
      const bandEnd = band.upper
        ? Math.min(band.upper - personalAllowance, taxableIncome)
        : taxableIncome;

      if (bandEnd > bandStart) {
        const bandAmount = bandEnd - bandStart;
        const bandTax = bandAmount * band.rate;
        scottishIncomeTax += bandTax;
        scottishBreakdown[band.name] = bandTax;
      }
    }
  }

  // Calculate National Insurance (same as UK)
  let nationalInsurance = 0;
  const niBreakdown: Record<string, number> = {};

  for (const rate of taxData.niRates.employee.rates) {
    if (grossSalary > rate.threshold - 1) {
      const rateStart = Math.max(rate.threshold - 1, 0);
      const rateEnd = rate.upper
        ? Math.min(rate.upper, grossSalary)
        : grossSalary;

      if (rateEnd > rateStart) {
        const rateAmount = rateEnd - rateStart;
        const rateNI = rateAmount * rate.rate;
        nationalInsurance += rateNI;
        niBreakdown[rate.name] = rateNI;
      }
    }
  }

  const takeHomePay = grossSalary - scottishIncomeTax - nationalInsurance;
  const effectiveTaxRate =
    grossSalary > 0
      ? ((scottishIncomeTax + nationalInsurance) / grossSalary) * 100
      : 0;

  return {
    grossSalary,
    personalAllowance,
    taxableIncome,
    incomeTax: scottishIncomeTax, // For compatibility
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

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}
