export const formatPhone = (phone: string): string => {
  // Sanitize spaces, hyphens, parentheses, etc.
  let sanitized = phone.replace(/[\s\-\(\)]/g, '');

  // If the number doesn't start with '+', prepend a country code.
  if (!sanitized.startsWith('+')) {
    // Basic heuristic: if it's a 10 digit number starting with a typical Indian prefix (e.g. 6-9), assume +91
    if (sanitized.length === 10 && /^[6-9]/.test(sanitized)) {
      sanitized = '+91' + sanitized;
    } else {
      // Default fallback (can be changed based on primary demographic)
      sanitized = '+91' + sanitized;
    }
  }

  return sanitized;
};
