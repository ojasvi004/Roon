import DOMPurify from 'dompurify';

export const sanitizeInput = (data: Record<string, any>): Record<string, any> => {
  const sanitizedData: Record<string, any> = {};

  for (const key in data) {
    if (typeof data[key] === 'string') {
      sanitizedData[key] = DOMPurify.sanitize(data[key]);
    } else {
      sanitizedData[key] = data[key]; 
    }
  }

  return sanitizedData;
};
