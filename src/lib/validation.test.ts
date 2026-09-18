import { describe, it, expect } from 'vitest';
import { validator } from './validation';

describe('Phase 4: Input Validation & Sanitization', () => {
  it('sanitizes HTML tags and script injections', () => {
    const malicious = '<script>alert("xss")</script>Hello <b>world</b>';
    const cleaned = validator.sanitizeText(malicious);
    expect(cleaned).not.toContain('<script>');
    expect(cleaned).not.toContain('<b>');
    expect(cleaned).toContain('Hello');
  });

  it('truncates extremely long strings to safe limits', () => {
    const longString = 'a'.repeat(5000);
    const cleaned = validator.sanitizeText(longString, 500);
    expect(cleaned.length).toBe(500);
  });

  it('validates correct and rejects invalid email addresses', () => {
    expect(validator.validateEmail('user@company.com').isValid).toBe(true);
    expect(validator.validateEmail('user.name+tag@sub.domain.co.in').isValid).toBe(true);
    expect(validator.validateEmail('').isValid).toBe(false);
    expect(validator.validateEmail('plainaddress').isValid).toBe(false);
    expect(validator.validateEmail('@missingusername.com').isValid).toBe(false);
    expect(validator.validateEmail('username@.com').isValid).toBe(false);
  });

  it('validates phone numbers with international prefixes and formatting', () => {
    expect(validator.validatePhone('+91 90906 26207').isValid).toBe(true);
    expect(validator.validatePhone('040-23456789').isValid).toBe(true);
    expect(validator.validatePhone('(555) 234-5678').isValid).toBe(true);
    expect(validator.validatePhone('abc-invalid').isValid).toBe(false);
    expect(validator.validatePhone('').isValid).toBe(false);
  });

  it('validates and size-checks 3D designer JSON payloads', () => {
    const validJson = JSON.stringify({ components: [{ id: '1', width: 100 }] });
    expect(validator.validateDesignData(validJson).isValid).toBe(true);

    const invalidJson = '{ not valid json';
    expect(validator.validateDesignData(invalidJson).isValid).toBe(false);

    // Oversized check (over 100 bytes for test)
    const bigData = JSON.stringify({ huge: 'x'.repeat(200) });
    expect(validator.validateDesignData(bigData, 100).isValid).toBe(false);
  });
});
