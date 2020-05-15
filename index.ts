import * as path from 'path';
import {
  createRepositoryLoader,
  FailedLoadHandler,
} from './src/repository-loader';
import {createMemorySource} from './src/repository-loader/memory-source';
import {loggerFactory} from './src/logger';
import {createMockDefinitions} from './src/repository-loader/__fixtures__';
import {createYamlSource} from './src/repository-loader/yaml-source';

(async () => {
  const logger = loggerFactory.createLogger();

  const sources = [
    createMemorySource(createMockDefinitions(10)),
    createYamlSource(path.join(__dirname, 'repositories')),
  ];

  const onFailedLoad: FailedLoadHandler = (source, e) =>
    logger.error(`An error occurred loading from source ${source.id()}`, e);

  const repositoryLoader = createRepositoryLoader(sources, onFailedLoad);
  repositoryLoader.subscribe(repo => logger.info(repo.id()));
})();

// Security alert.
// (async () => {
//   const logger = loggerFactory.createLogger();
//   const git: IGit = createGitService(createExecutable, loggerFactory);
//
//   const definitionsPath = path.join(__dirname, 'repositories');
//   const destinationPath = path.join(__dirname, 'gitRepos/');
//   const repositories = await getRepositories(definitionsPath, destinationPath);
//
//   for (const repo of repositories) {
//     if (!(await git.clone(repo))) {
//       continue;
//     }
//
//     if (repo.isSecurityAlertEnabled()) {
//       const auditCmd = `cd ${repo.cloneDestination()} && npm audit --json`;
//       const audit: Executable = createExecutable(auditCmd);
//       const auditResult: IExecutionResult = await audit();
//
//       if (isExecutionSuccessful(auditResult) || auditResult.code === 1) {
//         logger.info(
//           `Results for ${repo.name()}`,
//           JSON.parse(auditResult.output).metadata.vulnerabilities
//         );
//       } else {
//         logger.error(
//           `An error occurred for ${repo.name()}`,
//           auditResult.error,
//           auditResult.output
//         );
//       }
//     }
//   }
// })();

export * from './src';
