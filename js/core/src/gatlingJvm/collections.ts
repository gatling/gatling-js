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
  Object.entries(records).forEach(([key, value]) => {
    javaMap.put(key, asJava(value));
  });
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
