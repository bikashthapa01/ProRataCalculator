import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ProRataInputs {
  fullTimeSalary: number;
  fullTimeHours: number;
  actualHours: number;
  frequency: "yearly" | "monthly" | "weekly" | "daily";
  startDate?: string;
  endDate?: string;
}

export interface ProRataResults {
  yearly: number;
  monthly: number;
  weekly: number;
  daily: number;
  hourly: number;
  percentage: number;
  explanation: string;
}

// SSP-specific interfaces
export interface SSPInputs {
  workingDaysPerWeek: number;
  sickDays: number;
  averageWeeklyPay: number;
  annualSalary?: number;
  averageWeeklyHours?: number;
}

export interface SSPResults {
  isEligible: boolean;
  totalSSP: number;
  dailySSPRate: number;
  qualifyingDays: number;
  periodCovered: number;
  weeklySSP: number;
  explanation: string;
  breakdown: SSPBreakdown[];
}

export interface SSPBreakdown {
  label: string;
  value: number;
  formattedValue: string;
  description: string;
  icon: string;
}

export function calculateSSP(inputs: SSPInputs): SSPResults {
  const {
    workingDaysPerWeek,
    sickDays,
    averageWeeklyPay,
    annualSalary,
    averageWeeklyHours,
  } = inputs;

  // 2025/26 SSP rates
  const WEEKLY_SSP_RATE = 116.75;
  const MINIMUM_WEEKLY_EARNINGS = 123;
  const MINIMUM_SICK_DAYS = 4;

  // Calculate weekly pay if not provided
  let weeklyPay = averageWeeklyPay;
  if (!weeklyPay && annualSalary && averageWeeklyHours) {
    // Estimate weekly pay from annual salary and hours
    const fullTimeHours = 37.5; // Standard full-time hours
    const fullTimeWeeklyPay = annualSalary / 52;
    weeklyPay = (fullTimeWeeklyPay / fullTimeHours) * averageWeeklyHours;
  }

  // Check eligibility
  const isEligible =
    weeklyPay >= MINIMUM_WEEKLY_EARNINGS && sickDays >= MINIMUM_SICK_DAYS;

  if (!isEligible) {
    return {
      isEligible: false,
      totalSSP: 0,
      dailySSPRate: 0,
      qualifyingDays: 0,
      periodCovered: 0,
      weeklySSP: WEEKLY_SSP_RATE,
      explanation: `You do not qualify for SSP. You need to earn at least ${formatCurrency(
        MINIMUM_WEEKLY_EARNINGS
      )} per week and be off work for at least ${MINIMUM_SICK_DAYS} consecutive days.`,
      breakdown: [],
    };
  }

  // Calculate daily SSP rate
  const dailySSPRate = WEEKLY_SSP_RATE / workingDaysPerWeek;

  // Calculate qualifying days (working days during sick period)
  // For SSP, qualifying days are the working days that fall within the sick period
  // This is a simplified calculation - in reality, it depends on the actual calendar dates
  const weeksOfSickLeave = Math.ceil(sickDays / 7);
  let totalQualifyingDays = 0;

  // Calculate qualifying days for each week of sick leave
  for (let week = 0; week < weeksOfSickLeave; week++) {
    const daysInThisWeek = Math.min(7, sickDays - week * 7);
    // For each week, calculate how many working days fall within the sick period
    // This is a simplified approach - assumes working days are evenly distributed
    const workingDaysInThisWeek = Math.min(workingDaysPerWeek, daysInThisWeek);
    totalQualifyingDays += workingDaysInThisWeek;
  }

  // Ensure we don't exceed the actual sick days
  totalQualifyingDays = Math.min(totalQualifyingDays, sickDays);

  // Calculate total SSP
  const totalSSP = dailySSPRate * totalQualifyingDays;

  // Calculate period covered (in weeks)
  const periodCovered = Math.ceil(sickDays / 7);

  // Generate breakdown
  const breakdown: SSPBreakdown[] = [
    {
      label: "Weekly SSP Rate",
      value: WEEKLY_SSP_RATE,
      formattedValue: formatCurrency(WEEKLY_SSP_RATE),
      description: "Standard weekly SSP rate for 2025/26",
      icon: "pound-sterling",
    },
    {
      label: "Working Days per Week",
      value: workingDaysPerWeek,
      formattedValue: `${workingDaysPerWeek} days`,
      description: "Your normal working days per week",
      icon: "calendar",
    },
    {
      label: "Daily SSP Rate",
      value: dailySSPRate,
      formattedValue: formatCurrency(dailySSPRate),
      description: `Weekly SSP divided by your working days (${formatCurrency(
        WEEKLY_SSP_RATE
      )} ÷ ${workingDaysPerWeek})`,
      icon: "calculator",
    },
    {
      label: "Qualifying Days",
      value: totalQualifyingDays,
      formattedValue: `${totalQualifyingDays} days`,
      description: `Working days during your ${sickDays}-day sick period`,
      icon: "check-circle",
    },
    {
      label: "Total SSP",
      value: totalSSP,
      formattedValue: formatCurrency(totalSSP),
      description: `Daily rate × qualifying days (${formatCurrency(
        dailySSPRate
      )} × ${totalQualifyingDays})`,
      icon: "trending-up",
    },
  ];

  // Generate explanation
  const explanation = `You qualify for SSP! You'll receive ${formatCurrency(
    totalSSP
  )} for ${totalQualifyingDays} qualifying days over ${periodCovered} week${
    periodCovered > 1 ? "s" : ""
  }. Your daily SSP rate is ${formatCurrency(
    dailySSPRate
  )} based on your ${workingDaysPerWeek} working days per week.`;

  return {
    isEligible: true,
    totalSSP: Math.round(totalSSP * 100) / 100,
    dailySSPRate: Math.round(dailySSPRate * 100) / 100,
    qualifyingDays: totalQualifyingDays,
    periodCovered,
    weeklySSP: WEEKLY_SSP_RATE,
    explanation,
    breakdown,
  };
}

export function calculateProRata(inputs: ProRataInputs): ProRataResults {
  const { fullTimeSalary, fullTimeHours, actualHours, frequency } = inputs;

  // Calculate the pro rata percentage
  const percentage = (actualHours / fullTimeHours) * 100;

  // Calculate hourly rate based on frequency
  let fullTimeYearly: number;

  switch (frequency) {
    case "yearly":
      fullTimeYearly = fullTimeSalary;
      break;
    case "monthly":
      fullTimeYearly = fullTimeSalary * 12;
      break;
    case "weekly":
      fullTimeYearly = fullTimeSalary * 52;
      break;
    case "daily":
      fullTimeYearly = fullTimeSalary * 260; // Assuming 260 working days per year
      break;
    default:
      fullTimeYearly = fullTimeSalary;
  }

  // Calculate hourly rate based on actual full-time hours
  const fullTimeYearlyHours = fullTimeHours * 52;
  const hourlyRate = fullTimeYearly / fullTimeYearlyHours;

  // Calculate pro rata amounts
  const proRataYearly = fullTimeYearly * (percentage / 100);
  const proRataMonthly = proRataYearly / 12;
  const proRataWeekly = proRataYearly / 52;
  const proRataDaily = proRataYearly / 260;
  const proRataHourly = hourlyRate;

  // Generate explanation
  const explanation = `Your pro rata salary is ${percentage.toFixed(
    1
  )}% of the full-time equivalent. This means you work ${actualHours} hours compared to ${fullTimeHours} hours full-time. Your hourly rate is ${formatCurrency(
    proRataHourly
  )}.`;

  return {
    yearly: Math.round(proRataYearly),
    monthly: Math.round(proRataMonthly),
    weekly: Math.round(proRataWeekly),
    daily: Math.round(proRataDaily),
    hourly: Math.round(proRataHourly * 100) / 100,
    percentage: Math.round(percentage * 10) / 10,
    explanation,
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

// Bonus calculation interfaces
export interface BonusInputs {
  fullBonusAmount: number;
  fullTimeWeeklyHours: number;
  actualWeeklyHours: number;
  employmentStartDate?: string;
  employmentEndDate?: string;
  bonusPeriodStartDate?: string;
  bonusPeriodEndDate?: string;
}

export interface BonusResults {
  finalBonus: number;
  partTimeFactor: number;
  partialYearFactor: number;
  partTimeBonus: number;
  partialYearBonus: number;
  explanation: string;
  breakdown: BonusBreakdown[];
}

export interface BonusBreakdown {
  label: string;
  value: number;
  formattedValue: string;
  description: string;
  icon: string;
}

// SPP calculation interfaces
export interface SPPInputs {
  averageWeeklyEarnings: number;
  employmentStartDate: string;
  expectedWeekOfChildbirth: string;
  plannedLeaveStartDate: string;
  weeksOfLeave: number; // 1 or 2
  annualSalary?: number;
  averageWeeklyHours?: number;
}

export interface SPPResults {
  isEligible: boolean;
  eligibilityReason: string;
  qualifyingWeek: string;
  weeksEmployed: number;
  totalSPP: number;
  weeklyRate: number;
  nintyPercentOfEarnings: number;
  statutoryWeeklyCap: number;
  explanation: string;
  breakdown: SPPBreakdown[];
}

export interface SPPBreakdown {
  label: string;
  value: number;
  formattedValue: string;
  description: string;
  icon: string;
}

export function calculateSPP(inputs: SPPInputs): SPPResults {
  const {
    averageWeeklyEarnings,
    employmentStartDate,
    expectedWeekOfChildbirth,
    weeksOfLeave,
    annualSalary,
    averageWeeklyHours,
  } = inputs;

  // 2025/26 SPP rates - same as SMP for the 33-week period
  const SPP_WEEKLY_CAP = 187.18;
  const MIN_WEEKLY_EARNINGS = 125; // Updated for 2025/26
  const MIN_WEEKS_EMPLOYED = 26;
  const QUALIFYING_WEEK_OFFSET = 15; // 15 weeks before expected childbirth

  // Calculate weekly earnings if not provided directly
  let weeklyEarnings = averageWeeklyEarnings;
  if (!weeklyEarnings && annualSalary && averageWeeklyHours) {
    // Estimate weekly pay from annual salary and hours
    const fullTimeHours = 37.5; // Standard full-time hours
    const fullTimeWeeklyPay = annualSalary / 52;
    weeklyEarnings = (fullTimeWeeklyPay / fullTimeHours) * averageWeeklyHours;
  }

  // Calculate qualifying week (15 weeks before expected childbirth)
  const childbirthDate = new Date(expectedWeekOfChildbirth);
  const qualifyingWeekDate = new Date(childbirthDate);
  qualifyingWeekDate.setDate(
    qualifyingWeekDate.getDate() - QUALIFYING_WEEK_OFFSET * 7
  );

  // Calculate weeks employed
  const startDate = new Date(employmentStartDate);
  const weeksEmployed = Math.floor(
    (qualifyingWeekDate.getTime() - startDate.getTime()) /
      (1000 * 60 * 60 * 24 * 7)
  );

  // Check eligibility
  const isEligible =
    weeksEmployed >= MIN_WEEKS_EMPLOYED &&
    weeklyEarnings >= MIN_WEEKLY_EARNINGS &&
    weeksOfLeave >= 1 &&
    weeksOfLeave <= 2;

  let eligibilityReason = "";
  if (!isEligible) {
    if (weeksEmployed < MIN_WEEKS_EMPLOYED) {
      eligibilityReason = `You must be employed for at least ${MIN_WEEKS_EMPLOYED} weeks by the qualifying week (${
        MIN_WEEKS_EMPLOYED - weeksEmployed
      } weeks short)`;
    } else if (weeklyEarnings < MIN_WEEKLY_EARNINGS) {
      eligibilityReason = `You must earn at least £${MIN_WEEKLY_EARNINGS}/week on average (you earn £${weeklyEarnings.toFixed(
        2
      )})`;
    } else if (weeksOfLeave < 1 || weeksOfLeave > 2) {
      eligibilityReason = "You can take 1 or 2 weeks of paternity leave";
    }
  } else {
    eligibilityReason = "You are eligible for Statutory Paternity Pay";
  }

  // Calculate SPP rate and total
  const nintyPercentOfEarnings = weeklyEarnings * 0.9;
  const weeklyRate = Math.min(SPP_WEEKLY_CAP, nintyPercentOfEarnings);
  const totalSPP = isEligible ? weeklyRate * weeksOfLeave : 0;

  // Generate breakdown
  const breakdown: SPPBreakdown[] = [
    {
      label: "Average Weekly Earnings",
      value: weeklyEarnings,
      formattedValue: formatCurrency(weeklyEarnings),
      description: "Your actual average weekly earnings",
      icon: "pound-sterling",
    },
    {
      label: "90% of Weekly Earnings",
      value: nintyPercentOfEarnings,
      formattedValue: formatCurrency(nintyPercentOfEarnings),
      description: "90% of your average weekly earnings",
      icon: "percent",
    },
    {
      label: "Statutory Weekly Cap",
      value: SPP_WEEKLY_CAP,
      formattedValue: formatCurrency(SPP_WEEKLY_CAP),
      description: "Maximum SPP rate for 2025/26",
      icon: "shield",
    },
    {
      label: "Your Weekly SPP Rate",
      value: weeklyRate,
      formattedValue: formatCurrency(weeklyRate),
      description: `Lower of 90% (${formatCurrency(
        nintyPercentOfEarnings
      )}) or cap (${formatCurrency(SPP_WEEKLY_CAP)})`,
      icon: "calculator",
    },
    {
      label: "Weeks of Leave",
      value: weeksOfLeave,
      formattedValue: `${weeksOfLeave} week${weeksOfLeave > 1 ? "s" : ""}`,
      description: "Number of weeks you plan to take",
      icon: "calendar",
    },
    {
      label: "Total SPP Payment",
      value: totalSPP,
      formattedValue: formatCurrency(totalSPP),
      description: `${formatCurrency(weeklyRate)} × ${weeksOfLeave} week${
        weeksOfLeave > 1 ? "s" : ""
      }`,
      icon: "check-circle",
    },
  ];

  // Generate explanation
  let explanation = "";
  if (isEligible) {
    explanation = `Based on ${weeksEmployed} weeks of employment and average weekly earnings of £${weeklyEarnings.toFixed(
      2
    )}, your Statutory Paternity Pay is £${totalSPP.toFixed(
      2
    )} for ${weeksOfLeave} week${weeksOfLeave > 1 ? "s" : ""} of leave.`;
  } else {
    explanation = `You do not qualify for SPP. ${eligibilityReason}`;
  }

  return {
    isEligible,
    eligibilityReason,
    qualifyingWeek: qualifyingWeekDate.toLocaleDateString("en-GB"),
    weeksEmployed,
    totalSPP: Math.round(totalSPP * 100) / 100,
    weeklyRate: Math.round(weeklyRate * 100) / 100,
    nintyPercentOfEarnings: Math.round(nintyPercentOfEarnings * 100) / 100,
    statutoryWeeklyCap: SPP_WEEKLY_CAP,
    explanation,
    breakdown,
  };
}

// TTO calculation interfaces
export interface TTOInputs {
  fteAnnualSalary: number;
  fullTimeWeeklyHours: number;
  contractedWeeklyHours: number;
  termWeeksWorked: number;
  paidHolidayWeeks: number;
  bankHolidayWeeks: number;
  dailyDivisor: number;
  spreadOver12Months: boolean;
}

export interface TTOResults {
  annualTTOSalary: number;
  weeklyPay: number;
  monthlyPay: number;
  dailyPay: number;
  fteComparisonPercent: number;
  hoursFactor: number;
  paidWeeks: number;
  ttoPayFactor: number;
  breakdown: TTOBreakdown[];
  explanation: string;
  monthlyLabel: string;
}

export interface TTOBreakdown {
  label: string;
  value: number;
  formattedValue: string;
  description: string;
  icon: string;
}

export function calculateTTO(inputs: TTOInputs): TTOResults {
  const {
    fteAnnualSalary,
    fullTimeWeeklyHours,
    contractedWeeklyHours,
    termWeeksWorked,
    paidHolidayWeeks,
    bankHolidayWeeks,
    dailyDivisor,
    spreadOver12Months,
  } = inputs;

  // Calculate hours factor
  const hoursFactor = contractedWeeklyHours / fullTimeWeeklyHours;

  // Calculate paid weeks
  const paidWeeks = termWeeksWorked + paidHolidayWeeks + bankHolidayWeeks;

  // Calculate TTO pay factor
  const ttoPayFactor = paidWeeks / 52;

  // Calculate annual TTO salary
  const annualTTOSalary = fteAnnualSalary * hoursFactor * ttoPayFactor;

  // Calculate weekly pay
  const weeklyPay = annualTTOSalary / paidWeeks;

  // Calculate monthly pay
  let monthlyPay: number;
  let monthlyLabel: string;

  if (spreadOver12Months) {
    monthlyPay = annualTTOSalary / 12;
    monthlyLabel = "Monthly (spread over 12 months)";
  } else {
    const numberOfPaidMonths = paidWeeks / 4.333; // Average weeks per month
    monthlyPay = annualTTOSalary / numberOfPaidMonths;
    monthlyLabel = `Monthly (paid over ~${Math.round(
      numberOfPaidMonths
    )} months)`;
  }

  // Calculate daily pay
  const dailyPay = weeklyPay / dailyDivisor;

  // Calculate FTE comparison percentage
  const fteComparisonPercent = hoursFactor * ttoPayFactor * 100;

  // Generate breakdown
  const breakdown: TTOBreakdown[] = [
    {
      label: "FTE Annual Salary",
      value: fteAnnualSalary,
      formattedValue: formatCurrency(fteAnnualSalary),
      description: "Full-time equivalent annual salary",
      icon: "pound-sterling",
    },
    {
      label: "Hours Factor",
      value: hoursFactor,
      formattedValue: `${(hoursFactor * 100).toFixed(1)}%`,
      description: `${contractedWeeklyHours} hours ÷ ${fullTimeWeeklyHours} hours`,
      icon: "clock",
    },
    {
      label: "Paid Weeks",
      value: paidWeeks,
      formattedValue: `${paidWeeks} weeks`,
      description: `${termWeeksWorked} term + ${paidHolidayWeeks} holiday${
        bankHolidayWeeks > 0 ? ` + ${bankHolidayWeeks} bank holiday` : ""
      } weeks`,
      icon: "calendar",
    },
    {
      label: "TTO Pay Factor",
      value: ttoPayFactor,
      formattedValue: `${(ttoPayFactor * 100).toFixed(1)}%`,
      description: `${paidWeeks} weeks ÷ 52 weeks`,
      icon: "percent",
    },
    {
      label: "Annual TTO Salary",
      value: annualTTOSalary,
      formattedValue: formatCurrency(annualTTOSalary),
      description: `${formatCurrency(fteAnnualSalary)} × ${(
        hoursFactor * 100
      ).toFixed(1)}% × ${(ttoPayFactor * 100).toFixed(1)}%`,
      icon: "check-circle",
    },
  ];

  // Generate explanation
  const explanation = `Your term-time only salary is ${formatCurrency(
    Math.round(annualTTOSalary)
  )} per year, which is ${fteComparisonPercent.toFixed(
    1
  )}% of a full-time, full-year equivalent salary. This is based on working ${contractedWeeklyHours} hours per week for ${termWeeksWorked} term weeks plus ${paidHolidayWeeks} paid holiday weeks${
    bankHolidayWeeks > 0 ? ` and ${bankHolidayWeeks} bank holiday weeks` : ""
  }.`;

  return {
    annualTTOSalary: Math.round(annualTTOSalary),
    weeklyPay: Math.round(weeklyPay * 100) / 100,
    monthlyPay: Math.round(monthlyPay * 100) / 100,
    dailyPay: Math.round(dailyPay * 100) / 100,
    fteComparisonPercent: Math.round(fteComparisonPercent * 10) / 10,
    hoursFactor: Math.round(hoursFactor * 1000) / 1000,
    paidWeeks: Math.round(paidWeeks * 10) / 10,
    ttoPayFactor: Math.round(ttoPayFactor * 1000) / 1000,
    breakdown,
    explanation,
    monthlyLabel,
  };
}

export function calculateBonus(inputs: BonusInputs): BonusResults {
  const {
    fullBonusAmount,
    fullTimeWeeklyHours,
    actualWeeklyHours,
    employmentStartDate,
    employmentEndDate,
    bonusPeriodStartDate,
    bonusPeriodEndDate,
  } = inputs;

  // Calculate part-time factor
  const partTimeFactor = actualWeeklyHours / fullTimeWeeklyHours;
  const partTimeBonus = fullBonusAmount * partTimeFactor;

  // Calculate partial year factor if dates are provided
  let partialYearFactor = 1;
  let employedDays = 365; // Default to full year
  let totalDaysInPeriod = 365;

  if (employmentStartDate || employmentEndDate) {
    // Determine bonus period dates (default to tax year: 6 April to 5 April)
    const currentYear = new Date().getFullYear();
    const defaultBonusPeriodStart = new Date(currentYear, 3, 6); // April 6th
    const defaultBonusPeriodEnd = new Date(currentYear + 1, 3, 5); // April 5th next year

    const bonusStart = bonusPeriodStartDate
      ? new Date(bonusPeriodStartDate)
      : defaultBonusPeriodStart;
    const bonusEnd = bonusPeriodEndDate
      ? new Date(bonusPeriodEndDate)
      : defaultBonusPeriodEnd;

    // Calculate total days in bonus period
    totalDaysInPeriod =
      Math.ceil(
        (bonusEnd.getTime() - bonusStart.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1;

    // Determine employment period within bonus period
    const empStart = employmentStartDate
      ? new Date(employmentStartDate)
      : bonusStart;
    const empEnd = employmentEndDate ? new Date(employmentEndDate) : bonusEnd;

    // Ensure employment dates are within bonus period
    const actualStart = empStart > bonusStart ? empStart : bonusStart;
    const actualEnd = empEnd < bonusEnd ? empEnd : bonusEnd;

    if (actualStart <= actualEnd) {
      employedDays =
        Math.ceil(
          (actualEnd.getTime() - actualStart.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1;
      partialYearFactor = employedDays / totalDaysInPeriod;
    } else {
      // No overlap between employment and bonus period
      partialYearFactor = 0;
      employedDays = 0;
    }
  }

  // Calculate partial year bonus
  const partialYearBonus = partTimeBonus * partialYearFactor;

  // Final bonus amount
  const finalBonus = partialYearBonus;

  // Generate breakdown
  const breakdown: BonusBreakdown[] = [
    {
      label: "Full Bonus Amount",
      value: fullBonusAmount,
      formattedValue: formatCurrency(fullBonusAmount),
      description: "The full annual bonus amount specified",
      icon: "pound-sterling",
    },
    {
      label: "Part-Time Factor",
      value: partTimeFactor,
      formattedValue: `${(partTimeFactor * 100).toFixed(1)}%`,
      description: `${actualWeeklyHours} hours ÷ ${fullTimeWeeklyHours} hours`,
      icon: "clock",
    },
    {
      label: "Part-Time Adjustment",
      value: partTimeBonus,
      formattedValue: formatCurrency(partTimeBonus),
      description: `${formatCurrency(fullBonusAmount)} × ${(
        partTimeFactor * 100
      ).toFixed(1)}%`,
      icon: "calculator",
    },
  ];

  if (partialYearFactor < 1) {
    breakdown.push(
      {
        label: "Partial Year Factor",
        value: partialYearFactor,
        formattedValue: `${(partialYearFactor * 100).toFixed(1)}%`,
        description: `${employedDays} days employed ÷ ${totalDaysInPeriod} days in period`,
        icon: "calendar",
      },
      {
        label: "Partial Year Adjustment",
        value: partialYearBonus,
        formattedValue: formatCurrency(partialYearBonus),
        description: `${formatCurrency(partTimeBonus)} × ${(
          partialYearFactor * 100
        ).toFixed(1)}%`,
        icon: "trending-down",
      }
    );
  }

  breakdown.push({
    label: "Final Pro Rata Bonus",
    value: finalBonus,
    formattedValue: formatCurrency(finalBonus),
    description: "Your actual bonus entitlement",
    icon: "check-circle",
  });

  // Generate explanation
  let explanation = `Your pro rata bonus is ${formatCurrency(finalBonus)}.`;

  if (partTimeFactor < 1) {
    explanation += ` This includes a ${(partTimeFactor * 100).toFixed(
      1
    )}% reduction for part-time work (${actualWeeklyHours} hours vs ${fullTimeWeeklyHours} hours).`;
  }

  if (partialYearFactor < 1) {
    explanation += ` It also includes a ${(partialYearFactor * 100).toFixed(
      1
    )}% reduction for working ${employedDays} days out of ${totalDaysInPeriod} days in the bonus period.`;
  }

  if (partTimeFactor === 1 && partialYearFactor === 1) {
    explanation = `You are entitled to the full bonus amount of ${formatCurrency(
      finalBonus
    )} as you work full-time for the complete bonus period.`;
  }

  return {
    finalBonus: Math.round(finalBonus * 100) / 100,
    partTimeFactor: Math.round(partTimeFactor * 1000) / 1000,
    partialYearFactor: Math.round(partialYearFactor * 1000) / 1000,
    partTimeBonus: Math.round(partTimeBonus * 100) / 100,
    partialYearBonus: Math.round(partialYearBonus * 100) / 100,
    explanation,
    breakdown,
  };
}
