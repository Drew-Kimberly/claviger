import * as path from 'path';
import {getRepositories} from './src/repository';
import {loggerFactory} from './src/logger';
import {
  createExecutable,
  Executable,
  IExecutionResult,
  isExecutionSuccessful,
} from './src/execute';
import {createGitService, IGit} from './src/git';

// Security alert.
(async () => {
  const logger = loggerFactory.createLogger();
  const git: IGit = createGitService(createExecutable, loggerFactory);

  const definitionsPath = path.join(__dirname, 'repositories');
  const destinationPath = path.join(__dirname, 'gitRepos/');
  const repositories = await getRepositories(definitionsPath, destinationPath);

  for (const repo of repositories) {
    if (!(await git.clone(repo))) {
      continue;
    }

    if (repo.isSecurityAlertEnabled()) {
      const auditCmd = `cd ${repo.cloneDestination()} && npm audit --json`;
      const audit: Executable = createExecutable(auditCmd);
      const auditResult: IExecutionResult = await audit();

      if (isExecutionSuccessful(auditResult) || auditResult.code === 1) {
        logger.info(
          `Results for ${repo.name()}`,
          JSON.parse(auditResult.output).metadata.vulnerabilities
        );
      } else {
        logger.error(
          `An error occurred for ${repo.name()}`,
          auditResult.error,
          auditResult.output
        );
      }
    }
  }
})();

export * from './src';
