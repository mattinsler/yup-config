import fs from 'fs';
import path from 'path';
import * as yup from 'yup';

export * from 'yup';

const configCache: {
  [file: string]: any;
} = {};

export type Schema<T extends object> = yup.ObjectSchemaDefinition<T>;
export type Output<S> = S extends Schema<infer T> ? T : never;

export function getConfig<T extends object>(obj: object, schema: Schema<T>): Readonly<T> {
  return yup.object().shape(schema).validateSync(obj);
}

export function loadConfig<T extends object>(file: string, schema: Schema<T>): Readonly<T> {
  const filePath = path.resolve(file);

  if (fs.existsSync(filePath)) {
    const data = require(filePath);
    configCache[filePath] = data.default || data;
  } else {
    configCache[filePath] = {};
  }

  return getConfig(configCache[filePath], schema);
}
