import { readFileSync } from "fs";
import yaml from 'js-yaml';
import objectPath from 'nested-obj';
import { dirname, join } from "path";

const templateRegex = /\${{\s*([^.\s]+)\.([^}\s]+)\s*}}/g;

function replaceTemplates(str: string, context: any) {
  let currentStr = str;

  let match;
  while ((match = templateRegex.exec(currentStr)) !== null) {
    const fullMatch = match[0];
    const type = match[1];
    const key = match[2];

    if (type !== 'yamlize') continue;

    if (!objectPath.has(context, key)) {
      throw new Error(`Template var missing: ${key}`);
    }

    // Replace the first found template and then look for the next
    currentStr = currentStr.replace(fullMatch, objectPath.get(context, key));
  }

  return currentStr;
}
export const parse = (obj: any, dir: string, context: any): any => {
  let copy;

  if (typeof obj === 'string') {
    return replaceTemplates(obj, context);
  }

  // Handle the other simple types, and null or undefined
  if (null === obj || 'object' !== typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = parse(obj[i], dir, context);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object || typeof obj === 'object') {
    copy = {};
    if (obj['import-yaml']) {
      const yamlFile = join(dir, obj['import-yaml']);
      const content = readFileSync(yamlFile, 'utf8');
      const parsed = yaml.load(content);
      copy = parse(parsed, dirname(yamlFile), context);
      return copy;
    }
    for (let attr in obj) {
      switch (attr) {
        default:
          // @ts-ignore
          copy[attr] = parse(obj[attr], dir, context);
      }
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
};