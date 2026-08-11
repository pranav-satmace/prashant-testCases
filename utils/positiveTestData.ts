// utils/positiveTestData.ts
// 100 valid data combinations generate करतो — quantity आणि lot number प्रत्येक run ला वेगळे असतील
// जेणेकरून प्रत्येक test खऱ्या अर्थाने वेगळा data-point test करेल (फक्त copy-paste नाही)

export interface PositiveCaseData {
  caseId: number;
  quantity: string;
  lotNumber: string;
  lot1Gross: string;
  lot1Packaged: string;
  lot2Gross: string;
  lot2Packaged: string;
}

export const positiveTestCases: PositiveCaseData[] = Array.from({ length: 100 }, (_, i) => {
  const caseId = i + 1;

  return {
    caseId,
    quantity: String(500 + caseId), // प्रत्येक वेळी वेगळी valid quantity
    lotNumber: `LOT_PM_${String(caseId).padStart(3, '0')}`,
    lot1Gross: String(200 + caseId),
    lot1Packaged: String(20 + (caseId % 10)),
    lot2Gross: String(300 + caseId),
    lot2Packaged: String(30 + (caseId % 10)),
  };
});