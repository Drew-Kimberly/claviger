import {
  PackageManagers,
  RepositoryDefinition,
  SecurityVulnerabilitySeverities,
} from '../../repository-definition';
import {createRepository} from '../createRepository';

describe('Test suite for createRepository', () => {
  const definition: RepositoryDefinition = {
    id: 'foo',
    name: 'Foo Repo',
    packageManager: PackageManagers.NPM,
    emails: ['foo-email@test.com'],
    gitRepository: {
      url: 'foo-repo-url',
      ref: 'foo',
      isMonorepo: true,
    },
    securityAlert: {
      enabled: true,
      minSeverity: SecurityVulnerabilitySeverities.Low,
    },
    dependencyReport: {
      enabled: true,
      includeSecurityOverview: true,
    },
  };

  test('The created IRepository instance has a getDefinition callable', () => {
    const repo = createRepository(definition);
    expect(repo.getDefinition()).toEqual(definition);
  });

  test('The created IRepository instance has an id callable', () => {
    const repo = createRepository(definition);
    expect(repo.id()).toEqual(definition.id);
  });

  test('The created IRepository instance has a name callable', () => {
    const repo = createRepository(definition);
    expect(repo.name()).toEqual(definition.name);
  });

  test('The created IRepository instance has a getPackageManager callable', () => {
    const repo = createRepository(definition);
    expect(repo.getPackageManager()).toEqual(definition.packageManager);
  });

  test('The created IRepository instance has a getEmails callable', () => {
    const repo = createRepository(definition);
    expect(repo.getEmails()).toEqual(definition.emails);
  });

  test('The created IRepository instance has a getGitRepoUrl callable', () => {
    const repo = createRepository(definition);
    expect(repo.getGitRepoUrl()).toEqual(definition.gitRepository.url);
  });

  test('The created IRepository instance has a getGitRepoRef callable', () => {
    const repo = createRepository(definition);
    expect(repo.getGitRepoRef()).toEqual(definition.gitRepository.ref);
  });

  test('The getGitRepoRef callable defaults to "master"', () => {
    const repo = createRepository({
      ...definition,
      gitRepository: {url: definition.gitRepository.url},
    });

    expect(repo.getGitRepoRef()).toEqual('master');
  });

  test('The created IRepository instance has a isMonorepo callable', () => {
    const repo = createRepository(definition);

    expect(repo.isMonorepo()).toEqual(definition.gitRepository.isMonorepo);
  });

  test('The created IRepository instance has a isSecurityAlertEnabled callable', () => {
    const repo = createRepository(definition);
    expect(repo.isSecurityAlertEnabled()).toEqual(
      definition.securityAlert.enabled
    );
  });

  test('The created IRepository instance has a securityAlertMinSeverity callable', () => {
    const repo = createRepository(definition);
    expect(repo.securityAlertMinSeverity()).toEqual(
      definition.securityAlert.minSeverity
    );
  });

  test('The securityAlertMinSeverity callable defaults to SecurityVulnerabilitySeverities.High', () => {
    const repo = createRepository({
      ...definition,
      securityAlert: {enabled: true},
    });

    expect(repo.securityAlertMinSeverity()).toEqual(
      SecurityVulnerabilitySeverities.High
    );
  });

  test('The created IRepository instance has a isDependencyReportEnabled callable', () => {
    const repo = createRepository(definition);
    expect(repo.isDependencyReportEnabled()).toEqual(
      definition.dependencyReport.enabled
    );
  });

  test('The created IRepository instance has a includeSecurityOverviewInDependencyReport callable', () => {
    const repo = createRepository(definition);
    expect(repo.includeSecurityOverviewInDependencyReport()).toEqual(
      definition.dependencyReport.includeSecurityOverview
    );
  });
});
