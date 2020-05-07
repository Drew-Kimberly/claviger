import * as fs from 'fs';
import * as glob from 'glob';
import * as yaml from 'js-yaml';
import {
  SecurityVulnerabilitySeverities,
  UpkeepDependencyReport,
  UpkeepGitRepo,
  UpkeepRepository,
  UpkeepSecurityAlert,
} from './interfaces';

export const parseRepositoryId = (
  repositoryPath: string
): string | undefined => {
  const matches = repositoryPath.match(/.+\/(.+)\.repository\.yml$/);
  return matches && matches.length > 1 ? matches[1] : undefined;
};

export const loadRepositoryFromFile = (
  repositoryPath: string
): UpkeepRepository => {
  return yaml.safeLoad(fs.readFileSync(repositoryPath).toString());
};

export const getUpkeepRepositoryDefaults = (): Partial<UpkeepRepository> => ({
  gitRepository:
    {
      ref: 'master',
      isLernaMonorepo: false,
    } as UpkeepGitRepo,
  securityAlert:
    {
      minSeverity: SecurityVulnerabilitySeverities.High,
    } as UpkeepSecurityAlert,
  dependencyReport:
    {
      includeSecurityOverview: true,
    } as UpkeepDependencyReport,
});

export const getUpkeepRepositories = (
  path: string
): Promise<UpkeepRepository[]> => {
  return new Promise((resolve, reject) => {
    glob(path + '/**/*.yml', (err, matches) => {
      if (err) {
        console.error(
          'An error occurred while loading repository configs',
          err
        );
        reject(err);
      }

      resolve(
        matches.map((repoPath: string) => {
          const defaults = getUpkeepRepositoryDefaults();
          const repository = loadRepositoryFromFile(repoPath);

          return {
            id: parseRepositoryId(repoPath),
            repositoryConfigPath: repoPath,
            ...defaults,
            ...repository,
            gitRepository: {
              ...defaults.gitRepository,
              ...repository.gitRepository,
            },
            securityAlert: {
              ...defaults.securityAlert,
              ...repository.securityAlert,
            },
            dependencyReport: {
              ...defaults.dependencyReport,
              ...repository.dependencyReport,
            },
          };
        })
      );
    });
  });
};
