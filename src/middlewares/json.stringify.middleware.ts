export async function stringifyBigInts<T>(obj: T): Promise<T> {
  if (typeof obj === 'bigint') {
    return obj.toString() as unknown as T;
  }

  // Detect Decimal.js-like instances
  if (obj !== null && typeof obj === 'object' && typeof (obj as any).toString === 'function') {
    const str = obj.toString();
    if (!isNaN(str as any)) {
      return str as unknown as T;
    }
  }

  // Detect and parse stringified arrays like '["Beginner"]'
  if (typeof obj === 'string') {
    try {
      const parsed = JSON.parse(obj);
      if (Array.isArray(parsed)) {
        const result = await Promise.all(parsed.map(item => stringifyBigInts(item)));
        return result as unknown as T;
      }
    } catch {
      // Not a valid JSON string — ignore
    }
  }

  if (Array.isArray(obj)) {
    const result = await Promise.all(obj.map(item => stringifyBigInts(item)));
    return result as unknown as T;
  }

  if (obj !== null && typeof obj === 'object') {
    const entries = await Promise.all(
      Object.entries(obj).map(async ([key, value]) => {
        const newValue = await stringifyBigInts(value);
        return [key, newValue];
      })
    );
    return Object.fromEntries(entries) as T;
  }

  return obj;
}
