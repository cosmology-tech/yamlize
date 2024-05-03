import fs from 'fs';
import yaml from 'js-yaml';
import { sync as mkdirp } from 'mkdirp';
import { dirname } from 'path';

import { parse } from './parse';

export function yamlize(metaYamlFile: string, outFile: string, context: any): void {
    
    const metaYamlContent = fs.readFileSync(metaYamlFile, 'utf-8');
    const metaYamlDir = dirname(metaYamlFile);
    const metaYaml = yaml.load(metaYamlContent) as any;

    // Resolve imports and assemble the full Yaml
    const out = parse(metaYaml, metaYamlDir, context);

    // Convert the resolved JavaScript object back to Yaml
    const yamlOutput = yaml.dump(out, { lineWidth: -1 });

    // Write to a file or print to console
    mkdirp(dirname(outFile));
    fs.writeFileSync(outFile, yamlOutput);
}