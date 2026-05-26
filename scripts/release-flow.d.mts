export function normalizeVersion(version: string): string;

export function extractReleaseLabel(labels: string | unknown[]): string;

export function bumpVersion(version: string, releaseLabel: string): string;

export function extractReleaseTrackingIssue(text: string): number;

export function extractReleaseVersionFromTitle(title: string): string;

export function buildReleaseTrackingIssueTitle(dateStamp: string): string;

export function buildReleaseTrackingIssueBody(dateStamp: string): string;

export function buildReleasePrTitle(issueNumber: number): string;

export function buildReleasePrBody(issueNumber: number): string;

export function buildMainReleasePrTitle(version: string): string;

export function buildMainReleasePrBody(
  issueNumber: number,
  version: string,
): string;

export function buildDevelopSyncPrTitle(issueNumber: number): string;

export function buildDevelopSyncPrBody(
  issueNumber: number,
  version: string,
): string;

export function buildReleaseTag(version: string): string;

export function buildReleaseIssueComment(version: string): string;

export function getTodayDateStamp(date?: Date): string;
