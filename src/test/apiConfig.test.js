import { describe, expect, it } from 'vitest';
import { resolveApiBaseURL } from '../lib/apiConfig';

describe('resolveApiBaseURL', () => {
  it('uses the configured API URL without trailing slashes', () => {
    expect(
      resolveApiBaseURL('https://api.example.com/api/v1///', false),
    ).toBe('https://api.example.com/api/v1');
  });

  it('uses localhost only during local development', () => {
    expect(resolveApiBaseURL(undefined, true)).toBe(
      'http://localhost:8000/api/v1',
    );
  });

  it('does not fall back to localhost in production', () => {
    expect(resolveApiBaseURL(undefined, false)).toBeNull();
  });
});
