export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export function isObject(item: any): item is object {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

export default function deepMerge<T, R>(target: T, source: R): T {
  const output = { ...target };

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        const sourceValue = source[key];
        const targetValue = (output as any)[key];

        if (isObject(sourceValue) && isObject(targetValue)) {
          (output as any)[key] = deepMerge(targetValue, sourceValue);
        } else {
          (output as any)[key] = sourceValue;
        }
      }
    }
  }

  return output;
}
