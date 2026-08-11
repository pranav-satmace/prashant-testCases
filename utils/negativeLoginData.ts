// utils/negativeLoginData.ts
// Login साठी 100 invalid combinations — विविध प्रकारच्या चुकीच्या inputs cover करतात:
// रिकामे fields, चुकीचा password, चुकीचा email format, extra spaces, SQL injection strings इ.

export interface NegativeCaseData {
  caseId: number;
  description: string;
  username: string;
  password: string;
}

const validUsername = 'Prashant@satmace.com';
const validPassword = 'Satma@201';

const baseNegativeCases: Omit<NegativeCaseData, 'caseId'>[] = [
  { description: 'रिकामे username आणि password', username: '', password: '' },
  { description: 'रिकामे username, valid password', username: '', password: validPassword },
  { description: 'valid username, रिकामे password', username: validUsername, password: '' },
  { description: 'Invalid email format (@ नाही)', username: 'prashantsatmace.com', password: validPassword },
  { description: 'Invalid email format (domain नाही)', username: 'prashant@', password: validPassword },
  { description: 'Username मध्ये extra spaces', username: '  Prashant@satmace.com  ', password: validPassword },
  { description: 'Password मध्ये extra spaces', username: validUsername, password: '  Satma@201  ' },
  { description: 'Wrong case username', username: 'PRASHANT@SATMACE.COM', password: validPassword },
  { description: 'SQL Injection attempt username', username: "' OR '1'='1", password: validPassword },
  { description: 'SQL Injection attempt password', username: validUsername, password: "' OR '1'='1" },
  { description: 'Script tag username (XSS attempt)', username: '<script>alert(1)</script>', password: validPassword },
  { description: 'फक्त Numeric username', username: '123456', password: validPassword },
  { description: 'Special characters only username', username: '!@#$%^&*()', password: validPassword },
  { description: 'Non-existent registered email', username: 'nonexistent.user@satmace.com', password: validPassword },
  { description: 'Password खूप लहान', username: validUsername, password: '1' },
];

// वरील base cases + खूप सारे wrong-password variants generate करून एकूण 100 पर्यंत पोहोचवतो
const wrongPasswordVariants: Omit<NegativeCaseData, 'caseId'>[] = Array.from(
  { length: 100 - baseNegativeCases.length },
  (_, i) => ({
    description: `Wrong password variant #${i + 1}`,
    username: validUsername,
    password: `WrongPass${i + 1}!`,
  }),
);

export const negativeLoginCases: NegativeCaseData[] = [...baseNegativeCases, ...wrongPasswordVariants].map(
  (item, index) => ({
    caseId: index + 1,
    ...item,
  }),
);