export const help = (): void => {
  console.log(`
Usage:

yamlize --config <path to config file>
        --inFile <path to the meta yaml file>
        --outFile <path to the output yaml file>

Options:

--help, -h                 Show this help message.
--version, -v              Show the version number.
--config                   Path to the config file (optional).
--inFile                   Path to the meta yaml file where the configuration is defined.
--outFile                  Path where the generated yaml file will be saved.
`);
};