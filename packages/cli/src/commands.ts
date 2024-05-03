import { readFileSync } from 'fs';
import { CLIOptions, Inquirerer } from 'inquirerer'
import yaml from 'js-yaml';
import { ParsedArgs } from 'minimist';
import { yamlize } from 'yamlize';

import { readAndParsePackageJson } from './package';
import { help } from './usage';

export const commands = async (argv: Partial<ParsedArgs>, prompter: Inquirerer, _options: CLIOptions) => {
  if (argv.version || argv.v) {
    console.log(readAndParsePackageJson().version);
    process.exit(0);
  }

  if (argv.help || argv.h) {
    help();
    process.exit(0);
  }

  argv = await prompter.prompt(argv, [
    // use false, TODO: add optional flag on questions allowSkip: boolean
    // @ts-ignore
    {
      type: 'text',
      name: 'config',
      message: 'path to the config',
      required: false,
      default: false,
      useDefault: true
    },
    {
      type: 'text',
      name: 'inFile',
      message: 'Provide the path the meta yaml file',
      required: true
    },
    {
      type: 'text',
      name: 'outFile',
      message: 'Provide the path the output yaml file',
      required: true
    }
  ]);

  let context: any = {};

  if (argv.config) {
      const ctxContent = readFileSync(argv.config, 'utf-8');
      context = yaml.load(ctxContent) as any;
  }

  yamlize(argv.inFile, argv.outFile, context);
  
  return argv;

};