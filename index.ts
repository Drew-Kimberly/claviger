import * as path from 'path';
import {
  createRepositoryLoader,
  FailedLoadHandler,
} from './src/repository-loader';
import {createMemorySource} from './src/repository-loader/sources';
import {createLoggerFactory, loggerFactory, nullWriter} from './src/logger';
import {createMockDefinitions} from './src/repository-loader/__fixtures__';
import {createYamlSource} from './src/repository-loader/sources';
import {filter, map} from 'rxjs/operators';
import {createSecurityAlertTaskProducer} from './src/repository-task/tasks/security-alert';
import {createDependencyReportTaskProducer} from './src/repository-task/tasks/dependency-report';
import {isDefined} from './src/util';
import {createRepositoryTaskLoader} from './src/repository-task/createRepositoryTaskLoader';

(async () => {
  const logger = loggerFactory.createLogger();

  const sources = [
    // createMemorySource(createMockDefinitions(10)),
    createYamlSource(path.join(__dirname, 'repositories'), loggerFactory),
  ];

  const onFailedLoad: FailedLoadHandler = (source, e) =>
    logger.error(`An error occurred loading from source ${source.id()}`, e);

  const repositoryLoader = createRepositoryLoader(sources, onFailedLoad);

  const taskLoader = createRepositoryTaskLoader(
    createDependencyReportTaskProducer(loggerFactory),
    repositoryLoader
  );

  // const taskLoader = createRepositoryTaskLoader(
  //   createSecurityAlertTaskProducer(loggerFactory),
  //   repositoryLoader
  // );

  taskLoader.subscribe(task => logger.info(task.uuid));
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
