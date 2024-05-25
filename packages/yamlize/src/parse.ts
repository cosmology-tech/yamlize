import { readFileSync } from 'fs';
import yaml from 'js-yaml';
import objectPath from 'nested-obj';
import { dirname, join } from 'path';

function replaceTemplates(str: string, context: any) {
  const templateRegex = /\${{\s*([^.\s]+)\.([^}\s]+)\s*}}/g;
  let matches = [];
  let match;

  // Collect all matches first
  while ((match = templateRegex.exec(str)) !== null) {
    matches.push(match);
  }

  // Replace from end to start to avoid messing with indices
  for (let i = matches.length - 1; i >= 0; i--) {
    match = matches[i];
    const fullMatch = match[0];
    const type = match[1];
    const key = match[2];

    if (type !== 'yamlize') continue;

    if (!objectPath.has(context, key)) {
      throw new Error(`Template var missing: ${key}`);
    }

    // Replace the match
    const replacement = objectPath.get(context, key);
    str = str.substring(0, match.index) + replacement + str.substring(match.index + fullMatch.length);
  }

  return str;
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
    let importedYaml = {};
    if (obj['import-yaml']) {
      const importYaml = obj['import-yaml'];
      delete obj['import-yaml'];
      const yamlFile = join(dir, importYaml);
      const content = readFileSync(yamlFile, 'utf8');
      const parsed = yaml.load(content);
      importedYaml = parse(parsed, dirname(yamlFile), context);
    }
    for (let attr in obj) {
      switch (attr) {
      default:
        // @ts-ignore
        copy[attr] = parse(obj[attr], dir, context);
      }
    }
    return {
      ...copy,
      ...importedYaml
    };
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
};