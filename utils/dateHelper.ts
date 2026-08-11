// utils/dateHelper.ts
// Date picker input सोबत काम करण्यासाठी common helper functions

export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}