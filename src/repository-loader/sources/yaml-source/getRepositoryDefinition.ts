import * as yaml from 'js-yaml';
import * as util from 'util';
import * as fs from 'fs';
import {RepositoryDefinition} from '../../../repository-definition';
import {Logger} from '../../../logger';
import {Maybe} from '../../../util';

const readFileAsync = util.promisify(fs.readFile);

const tryReadDefinitionFile = async (
  path: string,
  logger: Logger
): Promise<Maybe<string>> => {
  try {
    return (await readFileAsync(path)).toString();
  } catch (e) {
    logger.error(
      `The following error occurred while attempting to read file at path ${path}`,
      e
    );
    return undefined;
  }
};

const tryParseDefinitionYaml = async (
  yamlContents: string,
  path: string,
  logger: Logger
): Promise<Maybe<RepositoryDefinition>> => {
  try {
    return (await yaml.load(yamlContents)) as RepositoryDefinition;
  } catch (e) {
    logger.error(
      `The following error occurred while attempting to parse the YAML file at path ${path}`,
      e
    );
    return undefined;
  }
};

export const getRepositoryDefinition = async (
  path: string,
  logger: Logger
): Promise<Maybe<RepositoryDefinition>> => {
  const fileContents: Maybe<string> = await tryReadDefinitionFile(path, logger);
  if (!fileContents) return undefined;

  return await tryParseDefinitionYaml(fileContents, path, logger);
};
