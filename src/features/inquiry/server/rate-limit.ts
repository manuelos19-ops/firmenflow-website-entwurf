const WINDOW_MS = 10 * 60 * 1_000;
const LIMIT = 5;
const buckets = new Map<string, number[]>();

export function checkRateLimit(key: string, now = Date.now()) {
  const recent = (buckets.get(key) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);
  if (recent.length >= LIMIT) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((WINDOW_MS - (now - recent[0])) / 1_000),
    };
  }
  recent.push(now);
  buckets.set(key, recent);
  return { allowed: true, retryAfterSeconds: 0 };
}

export function resetRateLimitsForTests() {
  buckets.clear();
}
