import {createMemorySource} from '../sources';
import {createMockDefinitions} from '../__fixtures__';
import {
  PackageManagers,
  RepositoryDefinition,
  SecurityVulnerabilitySeverities,
} from '../../repository-definition';
import {createRepositoryLoader} from '../createRepositoryLoader';

describe('Test suite for createRepositoryLoader', () => {
  test('Observed repository definitions are mapped to a repository instance', done => {
    const source = createMemorySource(createMockDefinitions(1));
    const expectedDefinition: RepositoryDefinition = {
      id: 'repository-1',
      name: 'Repository Fixture 1',
      packageManager: PackageManagers.NPM,
      emails: [],
      gitRepository: {
        isMonorepo: false,
        ref: 'master',
        url: 'testing',
      },
      dependencyReport: {
        enabled: true,
        includeSecurityOverview: true,
      },
      securityAlert: {
        enabled: true,
        minSeverity: SecurityVulnerabilitySeverities.High,
      },
    };

    const loader = createRepositoryLoader([source]);

    loader.subscribe(
      repo => {
        expect(repo.id()).toEqual(expectedDefinition.id);
        expect(repo.getDefinition()).toEqual(expectedDefinition);
      },
      error => {},
      () => done()
    );
  });
});
