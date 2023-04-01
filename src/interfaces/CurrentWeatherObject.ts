// To parse this data:
//
//   import { Convert, CurrentWeatherObject } from "./file";
//
//   const currentWeatherObject = Convert.toCurrentWeatherObject(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface CurrentWeatherObject {
  coord?: Coord;
  weather?: Weather[];
  base?: string;
  main?: Main;
  visibility?: number;
  wind?: Wind;
  rain?: Rain;
  clouds?: Clouds;
  dt?: number;
  sys?: Sys;
  timezone?: number;
  id?: number;
  name?: string;
  cod?: number;
}

export interface Clouds {
  all?: number;
}

export interface Coord {
  lon?: number;
  lat?: number;
}

export interface Main {
  temp?: number;
  feelsLike?: number;
  tempMin?: number;
  tempMax?: number;
  pressure?: number;
  humidity?: number;
  seaLevel?: number;
  grndLevel?: number;
}

export interface Rain {
  the1H?: number;
}

export interface Sys {
  type?: number;
  id?: number;
  country?: string;
  sunrise?: number;
  sunset?: number;
}

export interface Weather {
  id?: number;
  main?: string;
  description?: string;
  icon?: string;
}

export interface Wind {
  speed?: number;
  deg?: number;
  gust?: number;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toCurrentWeatherObject(json: string): CurrentWeatherObject {
    return cast(JSON.parse(json), r("CurrentWeatherObject"));
  }

  public static currentWeatherObjectToJson(
    value: CurrentWeatherObject
  ): string {
    return JSON.stringify(uncast(value, r("CurrentWeatherObject")), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ""): never {
  const prettyTyp = prettyTypeName(typ);
  const parentText = parent ? ` on ${parent}` : "";
  const keyText = key ? ` for key "${key}"` : "";
  throw Error(
    `Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(
      val
    )}`
  );
}

function prettyTypeName(typ: any): string {
  if (Array.isArray(typ)) {
    if (typ.length === 2 && typ[0] === undefined) {
      return `an optional ${prettyTypeName(typ[1])}`;
    } else {
      return `one of [${typ
        .map((a) => {
          return prettyTypeName(a);
        })
        .join(", ")}]`;
    }
  } else if (typeof typ === "object" && typ.literal !== undefined) {
    return typ.literal;
  } else {
    return typeof typ;
  }
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(
  val: any,
  typ: any,
  getProps: any,
  key: any = "",
  parent: any = ""
): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key, parent);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val, key, parent);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(
      cases.map((a) => {
        return l(a);
      }),
      val,
      key,
      parent
    );
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue(l("Date"), val, key, parent);
    }
    return d;
  }

  function transformObject(
    props: { [k: string]: any },
    additional: any,
    val: any
  ): any {
    if (val === null || typeof val !== "object" || Array.isArray(val)) {
      return invalidValue(l(ref || "object"), val, key, parent);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, key, ref);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key, ref);
      }
    });
    return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val, key, parent);
  }
  if (typ === false) return invalidValue(typ, val, key, parent);
  let ref: any = undefined;
  while (typeof typ === "object" && typ.ref !== undefined) {
    ref = typ.ref;
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
    return typ.hasOwnProperty("unionMembers")
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty("arrayItems")
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty("props")
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val, key, parent);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
  return { literal: typ };
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  CurrentWeatherObject: o(
    [
      { json: "coord", js: "coord", typ: u(undefined, r("Coord")) },
      { json: "weather", js: "weather", typ: u(undefined, a(r("Weather"))) },
      { json: "base", js: "base", typ: u(undefined, "") },
      { json: "main", js: "main", typ: u(undefined, r("Main")) },
      { json: "visibility", js: "visibility", typ: u(undefined, 0) },
      { json: "wind", js: "wind", typ: u(undefined, r("Wind")) },
      { json: "rain", js: "rain", typ: u(undefined, r("Rain")) },
      { json: "clouds", js: "clouds", typ: u(undefined, r("Clouds")) },
      { json: "dt", js: "dt", typ: u(undefined, 0) },
      { json: "sys", js: "sys", typ: u(undefined, r("Sys")) },
      { json: "timezone", js: "timezone", typ: u(undefined, 0) },
      { json: "id", js: "id", typ: u(undefined, 0) },
      { json: "name", js: "name", typ: u(undefined, "") },
      { json: "cod", js: "cod", typ: u(undefined, 0) },
    ],
    false
  ),
  Clouds: o([{ json: "all", js: "all", typ: u(undefined, 0) }], false),
  Coord: o(
    [
      { json: "lon", js: "lon", typ: u(undefined, 3.14) },
      { json: "lat", js: "lat", typ: u(undefined, 3.14) },
    ],
    false
  ),
  Main: o(
    [
      { json: "temp", js: "temp", typ: u(undefined, 3.14) },
      { json: "feels_like", js: "feelsLike", typ: u(undefined, 3.14) },
      { json: "temp_min", js: "tempMin", typ: u(undefined, 3.14) },
      { json: "temp_max", js: "tempMax", typ: u(undefined, 3.14) },
      { json: "pressure", js: "pressure", typ: u(undefined, 0) },
      { json: "humidity", js: "humidity", typ: u(undefined, 0) },
      { json: "sea_level", js: "seaLevel", typ: u(undefined, 0) },
      { json: "grnd_level", js: "grndLevel", typ: u(undefined, 0) },
    ],
    false
  ),
  Rain: o([{ json: "1h", js: "the1H", typ: u(undefined, 3.14) }], false),
  Sys: o(
    [
      { json: "type", js: "type", typ: u(undefined, 0) },
      { json: "id", js: "id", typ: u(undefined, 0) },
      { json: "country", js: "country", typ: u(undefined, "") },
      { json: "sunrise", js: "sunrise", typ: u(undefined, 0) },
      { json: "sunset", js: "sunset", typ: u(undefined, 0) },
    ],
    false
  ),
  Weather: o(
    [
      { json: "id", js: "id", typ: u(undefined, 0) },
      { json: "main", js: "main", typ: u(undefined, "") },
      { json: "description", js: "description", typ: u(undefined, "") },
      { json: "icon", js: "icon", typ: u(undefined, "") },
    ],
    false
  ),
  Wind: o(
    [
      { json: "speed", js: "speed", typ: u(undefined, 3.14) },
      { json: "deg", js: "deg", typ: u(undefined, 0) },
      { json: "gust", js: "gust", typ: u(undefined, 3.14) },
    ],
    false
  ),
};
