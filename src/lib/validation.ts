/**
 * Input sanitization and validation utilities for public submissions.
 * Provides defensive boundary protection before submitting to Supabase.
 */

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const PHONE_REGEX = /^[+]?[\d\s().-]{7,25}$/;

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  sanitizedValue?: string;
}

export const validator = {
  /**
   * Sanitize text input: strip script tags, trim whitespace, normalize newlines.
   */
  sanitizeText(input: unknown, maxLength = 2000): string {
    if (typeof input !== 'string') return '';
    let cleaned = input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/[<>]/g, '') // strip raw angle brackets to prevent HTML injection
      .trim();
    if (cleaned.length > maxLength) {
      cleaned = cleaned.substring(0, maxLength);
    }
    return cleaned;
  },

  /**
   * Validate email address.
   */
  validateEmail(email: unknown): ValidationResult {
    if (typeof email !== 'string' || !email.trim()) {
      return { isValid: false, error: 'Email address is required.' };
    }
    const sanitized = email.trim().toLowerCase();
    if (sanitized.length > 255) {
      return { isValid: false, error: 'Email exceeds maximum length (255 characters).' };
    }
    if (!EMAIL_REGEX.test(sanitized)) {
      return { isValid: false, error: 'Please enter a valid email address.' };
    }
    return { isValid: true, sanitizedValue: sanitized };
  },

  /**
   * Validate phone number.
   */
  validatePhone(phone: unknown): ValidationResult {
    if (typeof phone !== 'string' || !phone.trim()) {
      return { isValid: false, error: 'Phone number is required.' };
    }
    const sanitized = phone.trim();
    if (sanitized.length > 30) {
      return { isValid: false, error: 'Phone number exceeds maximum length.' };
    }
    if (!PHONE_REGEX.test(sanitized)) {
      return { isValid: false, error: 'Please enter a valid phone number (e.g. +91 90906 26207).' };
    }
    return { isValid: true, sanitizedValue: sanitized };
  },

  /**
   * Validate 3D design JSON payload size to prevent denial-of-service / database exhaustion.
   */
  validateDesignData(jsonStr: unknown, maxBytes = 500_000): ValidationResult {
    if (!jsonStr) return { isValid: true, sanitizedValue: '' };
    if (typeof jsonStr !== 'string') {
      try {
        jsonStr = JSON.stringify(jsonStr);
      } catch {
        return { isValid: false, error: 'Invalid 3D scene payload format.' };
      }
    }
    const str = jsonStr as string;
    if (new Blob([str]).size > maxBytes) {
      return { isValid: false, error: '3D scene payload exceeds maximum allowed size (500KB).' };
    }
    try {
      JSON.parse(str);
      return { isValid: true, sanitizedValue: str };
    } catch {
      return { isValid: false, error: 'Invalid JSON format in 3D scene data.' };
    }
  },
};
