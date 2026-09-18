import { paymentLessons } from "@/data/fintech-lessons/payments";
import { quantLessons } from "@/data/fintech-lessons/quant";
import { financialRiskLessons } from "@/data/fintech-lessons/risk";
import type { FoundationLessonMap } from "@/data/foundations/types";

export const fintechLessons: FoundationLessonMap = {
  ...paymentLessons,
  ...financialRiskLessons,
  ...quantLessons
};
