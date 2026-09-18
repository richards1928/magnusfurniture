import { describe, it, expect } from 'vitest';
import { parseStoredJson, toSnakeCaseKeys, toCamelCaseKeys } from './storage';

describe('parseStoredJson', () => {
  it('returns fallback for malformed JSON', () => {
    expect(parseStoredJson('not-json', [])).toEqual([]);
  });

  it('parses valid JSON', () => {
    expect(parseStoredJson('[1,2,3]', [])).toEqual([1, 2, 3]);
  });
});

describe('case transformations', () => {
  it('converts camelCase keys to snake_case for Supabase insertion', () => {
    const input = {
      companyName: 'Acme Corp',
      contactName: 'Jane Doe',
      shortDescription: 'Modern desk',
      isFeatured: true,
    };
    expect(toSnakeCaseKeys(input)).toEqual({
      company_name: 'Acme Corp',
      contact_name: 'Jane Doe',
      short_description: 'Modern desk',
      is_featured: true,
    });
  });

  it('converts snake_case keys to camelCase when retrieving from Supabase', () => {
    const input = {
      company_name: 'Acme Corp',
      contact_name: 'Jane Doe',
      short_description: 'Modern desk',
      is_featured: true,
    };
    expect(toCamelCaseKeys(input)).toEqual({
      companyName: 'Acme Corp',
      contactName: 'Jane Doe',
      shortDescription: 'Modern desk',
      isFeatured: true,
    });
  });
});

