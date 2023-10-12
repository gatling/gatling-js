const Arrays = Java.type<any>("java.util.Arrays");

export const asJavaList = <T>(...elements: T[]): any => arrayAsJavaList(elements);

export const arrayAsJavaList = <T>(array: T[]): any => Arrays.asList(array);
