import DOMPurify from 'dompurify';

export const sanitizeInput = (data: Record<string, unknown>): Record<string, unknown> => {
  const sanitizedData: Record<string, unknown> = {};

  for (const key in data) {
    if (typeof data[key] === 'string') {
      sanitizedData[key] = DOMPurify.sanitize(data[key]);
    } else {
      sanitizedData[key] = data[key]; 
    }
  }

  return sanitizedData;
};
