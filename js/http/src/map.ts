const HashMap = Java.type<any>("java.util.HashMap");

export const asJavaMap = <T>(records: Record<string, T>): any => {
  const javaMap = new HashMap();
  for (let key in records) {
    javaMap.put(key, records[key]);
  }
  return javaMap;
};
