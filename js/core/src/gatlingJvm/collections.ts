const ArrayList = Java.type<any>("java.util.ArrayList");
const HashMap = Java.type<any>("java.util.HashMap");

const asJavaList = (elements: unknown[]): unknown => {
  const javaList = new ArrayList();
  for (let i = 0; i < elements.length; i++) {
    javaList.add(asJava(elements[i]));
  }
  return javaList;
};

const asJavaMap = (records: object): unknown => {
  const javaMap = new HashMap();
  // for...in rather than Object.entries: no intermediate arrays, called on every session.set with an object value
  for (const key in records) {
    if (Object.hasOwn(records, key)) {
      javaMap.put(key, asJava((records as Record<string, unknown>)[key]));
    }
  }
  return javaMap;
};

export const asJava = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return asJavaList(value);
  } else if (typeof value === "object" && value !== null) {
    return asJavaMap(value);
  } else {
    return value;
  }
};
