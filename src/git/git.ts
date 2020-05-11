import {ICloneable, IGit} from './types';
import {
  ExecutableFactory,
  IExecutionResult,
  isExecutionSuccessful,
} from '../execute';
import {ILoggable, ILoggerFactory, Logger} from '../logger';

const GIT_LOGGER_CHANNEL = 'git';

export const createCloneable = (
  url: string,
  branch: string,
  depth: number,
  destination: string
) => ({
  gitUrl: () => url,
  gitBranch: () => branch,
  cloneDepth: () => depth,
  cloneDestination: () => destination,
});

export const gitCloneCommand = (cloneable: ICloneable): string =>
  `git clone --depth=${cloneable.cloneDepth()} ${cloneable.gitUrl()} ${cloneable.cloneDestination()} -b ${cloneable.gitBranch()}`;

export const logCloneFailure = (
  logger: Logger,
  cloneable: ICloneable,
  result: IExecutionResult
): ILoggable =>
  logger.error(
    `Failed cloning ${cloneable.gitUrl()} on branch ${cloneable.gitBranch()} with depth ${cloneable.cloneDepth()} to ${cloneable.cloneDestination()}`,
    result.error,
    result.output
  );

export const interpretCloneResult = (
  result: IExecutionResult,
  onFailure?: (result: IExecutionResult) => void
): boolean => {
  if (!isExecutionSuccessful(result)) {
    if (onFailure) onFailure(result);
    return false;
  }

  return true;
};

export const createGitService = (
  executableFactory: ExecutableFactory,
  loggerFactory: ILoggerFactory
): IGit => {
  const logger: Logger = loggerFactory.createLogger(GIT_LOGGER_CHANNEL);
  return {
    clone: async (repo: ICloneable): Promise<boolean> => {
      const cloneExecutable = executableFactory(
        gitCloneCommand(repo),
        logger.info
      );

      return interpretCloneResult(await cloneExecutable(), result =>
        logCloneFailure(logger, repo, result)
      );
    },
  };
};
