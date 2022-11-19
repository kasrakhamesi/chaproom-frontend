export type ConvertMap = [
  string | [string, string],
  (
    | /* rename only */ null
    | /* nested object convert */ ConvertMap
    | /* other types like date convert */ ((
        value: any,
        direction: "a2b" | "b2a"
      ) => any)
    | /* enum convert */ Record<string | number, string | number>
  )
][];

export function convert(
  map: ConvertMap,
  input: Record<string, any>,
  direction: "a2b" | "b2a"
) {
  if (!input) return input;

  const convertedProperties: string[] = [];
  const result: Record<string, any> = {};

  map.forEach(([name, converter]) => {
    const fromName =
      typeof name === "string" ? name : name[direction === "a2b" ? 0 : 1];
    const toName =
      typeof name === "string" ? name : name[direction === "a2b" ? 1 : 0];

    if (!input.hasOwnProperty(fromName)) return;

    if (converter === null) {
      result[toName] = input[fromName];
      convertedProperties.push(fromName);
      return;
    }

    if (Array.isArray(converter)) {
      result[toName] = input[fromName]
        ? convert(converter, input[fromName], direction)
        : input[fromName];
      convertedProperties.push(fromName);
      return;
    }

    if (typeof converter === "function") {
      result[toName] = converter(input[fromName], direction);
      convertedProperties.push(fromName);
      return;
    }

    if (typeof converter === "object") {
      const keys = Object.keys(converter);
      const values = Object.values(converter);
      if ((direction === "a2b" ? keys : values).includes(input[fromName])) {
        result[toName] = (direction === "a2b" ? values : keys)[
          (direction === "a2b" ? keys : values).indexOf(input[fromName])
        ];
        convertedProperties.push(fromName);
      }
      return;
    }
  });

  Object.entries(input).forEach(([name, value]) => {
    if (!convertedProperties.includes(name)) {
      result[name] = value;
    }
  });

  return result;
}

export function convertDate(value: any, direction: "a2b" | "b2a") {
  if (value === null) return value;
  return direction === "a2b"
    ? typeof value === "string"
      ? new Date(value)
      : value
    : value.toISOString
    ? value.toISOString()
    : value;
}
