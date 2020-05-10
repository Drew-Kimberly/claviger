import * as path from 'path';
import {getRepositories} from './src/repository';
import {loggerFactory} from './src/logger';
import {
  createExecutable,
  Executable,
  IExecutionResult,
  isExecutionSuccessful,
} from './src/execute';

// Security alert.
(async () => {
  const logger = loggerFactory.createLogger();
  const definitionsPath = path.join(__dirname, 'repositories');
  const repositories = await getRepositories(definitionsPath);

  for (const repo of repositories) {
    const clonedRepoDestination = path.join(__dirname, `gitRepos/${repo.id()}`);
    const cmd = `${repo.cloneCmd(clonedRepoDestination)}`;

    const clone: Executable = createExecutable(cmd, logger.info);
    const cloneResult = await clone();
    if (!isExecutionSuccessful(cloneResult)) {
      logger.error(
        `Failed cloning ${repo.name()} to ${clonedRepoDestination}`,
        cloneResult.error,
        cloneResult.output
      );
      continue;
    }

    if (repo.isSecurityAlertEnabled()) {
      const auditCmd = `cd ${clonedRepoDestination} && npm audit --json`;
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
