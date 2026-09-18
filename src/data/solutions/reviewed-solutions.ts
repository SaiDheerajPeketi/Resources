import { cpp17Atlas75 } from "@/data/solutions/cpp17-atlas75";
import { javaAtlas75 } from "@/data/solutions/java-atlas75";
import { pythonAtlas75 } from "@/data/solutions/python-atlas75";
import { typescriptAtlas75 } from "@/data/solutions/typescript-atlas75";
import {
  cpp17Atlas76To90,
  javaAtlas76To90,
  pythonAtlas76To90,
  typescriptAtlas76To90
} from "@/data/solutions/atlas76-90";

export const reviewedCppSolutions: Record<string, string> = { ...cpp17Atlas75, ...cpp17Atlas76To90 };
export const reviewedJavaSolutions: Record<string, string> = { ...javaAtlas75, ...javaAtlas76To90 };
export const reviewedPythonSolutions: Record<string, string> = { ...pythonAtlas75, ...pythonAtlas76To90 };
export const reviewedTypescriptSolutions: Record<string, string> = { ...typescriptAtlas75, ...typescriptAtlas76To90 };
