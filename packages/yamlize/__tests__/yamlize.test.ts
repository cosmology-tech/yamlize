import { join } from 'path';

import { yamlize } from '../src';

const fixturesDir = join(__dirname, '../../../__fixtures__');
const metaYaml = join(fixturesDir, '/meta/meta.yaml');
const outFile = join(fixturesDir, '/output/workflow.yaml');

it('yamlize', () => {
    yamlize(metaYaml, outFile, {
        git: {
            USER_NAME: 'Cosmology',
            USER_EMAIL: 'developers@cosmology.zone',
        },
        EMSCRIPTEN_VERSION: '3.1.59',
        NODE_VERSION: '20.x' 
    });
})