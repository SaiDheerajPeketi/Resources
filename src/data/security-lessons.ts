import { applicationSecurityLessons } from "@/data/security-lessons/appsec";
import { securityFoundationLessons } from "@/data/security-lessons/foundations";
import { securityOperationsLessons } from "@/data/security-lessons/operations";
import type { FoundationLessonMap } from "@/data/foundations/types";

export const securityLessons: FoundationLessonMap = {
  ...securityFoundationLessons,
  ...applicationSecurityLessons,
  ...securityOperationsLessons
};
