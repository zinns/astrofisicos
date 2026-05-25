export const BRANCH_NAME_PATTERN: RegExp;

export function getBranchName(inputBranchName?: string): string;

export function validateBranchName(branchName: string): {
  branchName: string;
  isValid: boolean;
  message: string;
};

