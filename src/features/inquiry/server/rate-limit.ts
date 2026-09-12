const WINDOW_MS = 10 * 60 * 1_000;
const LIMIT = 5;
// Obergrenze, damit die Map auf langlebigen Instanzen nicht unbegrenzt wächst
const MAX_BUCKETS = 5_000;

const buckets = new Map<string, number[]>();

function pruneStaleBuckets(now: number) {
  for (const [key, timestamps] of buckets) {
    if (timestamps.every((timestamp) => now - timestamp >= WINDOW_MS)) {
      buckets.delete(key);
    }
  }
}

export function checkRateLimit(key: string, now = Date.now()) {
  if (buckets.size >= MAX_BUCKETS) {
    pruneStaleBuckets(now);
  }

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
