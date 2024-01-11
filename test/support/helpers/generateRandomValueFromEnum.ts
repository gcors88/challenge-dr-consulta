export function generateRandomValueFromEnum<T>(enumObject: T): T[keyof T] {
  const result = Math.floor(Math.random() * Object.keys(enumObject).length);
  return enumObject[Object.keys(enumObject)[result]];
}
