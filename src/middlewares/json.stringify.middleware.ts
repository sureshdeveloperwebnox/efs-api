export async function stringifyBigInts<T>(obj: T): Promise<T> {
    if (typeof obj === 'bigint') {
      return obj.toString() as unknown as T;
    } else if (Array.isArray(obj)) {
      return Promise.all(obj.map(stringifyBigInts)) as unknown as Promise<T>;
    } else if (obj !== null && typeof obj === 'object') {
      const entries = await Promise.all(
        Object.entries(obj).map(async ([key, value]) => [key, await stringifyBigInts(value)])
      );
      return Object.fromEntries(entries) as T;
    }
    return obj;
  }
  