export function parseLabelNames(input: string | unknown[]): string[];

export function validatePrMetadata(input: {
  title: string;
  body?: string | null;
  baseRef: string;
  headRef: string;
  labels?: string | unknown[];
  approvalCount?: number;
}): Array<{
  id: string;
  label: string;
  passed: boolean;
  message: string;
}>;

