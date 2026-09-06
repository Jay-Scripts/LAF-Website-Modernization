import "server-only";

export const impactMetricKeys = ["housing", "transport", "meals", "activities", "care-cart"] as const;

export type ImpactMetricKey = (typeof impactMetricKeys)[number];

export type PublicImpactMetric = {
  program: string;
  current: number;
  historical2024: number;
  historical2025: number | null;
  total: number | null;
};

export type PublicImpactMetrics = Record<ImpactMetricKey, PublicImpactMetric>;

export const fallbackImpactMetrics: PublicImpactMetrics = {
  housing: { program: "Housing", current: 2953, historical2024: 974, historical2025: null, total: null },
  transport: { program: "Transportation", current: 803, historical2024: 520, historical2025: null, total: null },
  meals: { program: "Meals", current: 8654, historical2024: 570, historical2025: null, total: null },
  activities: { program: "LAF Activity Center", current: 241, historical2024: 47, historical2025: null, total: null },
  "care-cart": { program: "Care Cart", current: 2846, historical2024: 1132, historical2025: null, total: null },
};

type SheetsValuesResponse = {
  values?: unknown;
};

const SHEET_RANGE = "'Website Dashboard'!A1:F6";

function isImpactMetricKey(value: string): value is ImpactMetricKey {
  return (impactMetricKeys as readonly string[]).includes(value);
}

function parseNumber(value: unknown) {
  if (typeof value === "number") return Number.isFinite(value) && value >= 0 ? value : null;
  if (typeof value !== "string") return null;

  const normalized = value.replace(/,/g, "").trim();
  if (!normalized) return null;

  const parsed = Number(normalized);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

function parseSheetValues(values: unknown): PublicImpactMetrics {
  const metrics: PublicImpactMetrics = structuredClone(fallbackImpactMetrics);
  if (!Array.isArray(values) || values.length < 2 || !Array.isArray(values[0])) return metrics;

  const headers = values[0].map((value) => String(value).trim().toLowerCase());
  const programIndex = headers.indexOf("program");
  const currentIndex = headers.indexOf("2026 ytd");
  const historical2024Index = headers.indexOf("2024");
  const historical2025Index = headers.indexOf("2025");
  const totalIndex = headers.indexOf("total");
  const keyIndex = headers.indexOf("key");

  if ([programIndex, currentIndex, historical2024Index, historical2025Index, totalIndex, keyIndex].some((index) => index < 0)) return metrics;

  for (const value of values.slice(1)) {
    if (!Array.isArray(value)) continue;

    const key = String(value[keyIndex] ?? "").trim().toLowerCase();
    if (!isImpactMetricKey(key)) continue;

    const current = parseNumber(value[currentIndex]);
    const historical2024 = parseNumber(value[historical2024Index]);
    const historical2025 = parseNumber(value[historical2025Index]);
    const total = parseNumber(value[totalIndex]);

    const program = String(value[programIndex] ?? "").trim();
    metrics[key] = {
      program: program || fallbackImpactMetrics[key].program,
      current: current ?? fallbackImpactMetrics[key].current,
      historical2024: historical2024 ?? fallbackImpactMetrics[key].historical2024,
      historical2025,
      total,
    };
  }

  return metrics;
}

export async function getPublicImpactMetrics(): Promise<PublicImpactMetrics> {
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!apiKey || !spreadsheetId) {
    console.warn("Public impact metrics are not configured; using fallback values.");
    return structuredClone(fallbackImpactMetrics);
  }

  try {
    const encodedRange = encodeURIComponent(SHEET_RANGE);
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${encodedRange}?key=${encodeURIComponent(apiKey)}`,
      { next: { revalidate: 600 } },
    );

    if (!response.ok) throw new Error("Google Sheets request failed");

    const payload = (await response.json()) as SheetsValuesResponse;
    return parseSheetValues(payload.values);
  } catch {
    console.error("Public impact metrics could not be refreshed; using fallback values.");
    return structuredClone(fallbackImpactMetrics);
  }
}
