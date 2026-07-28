import { describe, it, expect } from 'vitest';
import { parseStoredJson } from './storage';

describe('parseStoredJson', () => {
  it('returns fallback for malformed JSON', () => {
    expect(parseStoredJson('not-json', [])).toEqual([]);
  });

  it('parses valid JSON', () => {
    expect(parseStoredJson('[1,2,3]', [])).toEqual([1, 2, 3]);
  });
});
