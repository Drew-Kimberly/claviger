import {SecurityVulnerabilitySeverities} from '../types';
import {getRepositoryDefinitionDefaults} from '../getRepositoryDefinitionDefaults';

describe('Test suite for getRepositoryDefinitionDefaults', () => {
  test('Expected defaults are returned', () => {
    const expected = {
      gitRepository: {
        ref: 'master',
        isMonorepo: false,
      },
      securityAlert: {
        minSeverity: SecurityVulnerabilitySeverities.High,
      },
      dependencyReport: {
        includeSecurityOverview: true,
      },
    };

    expect(getRepositoryDefinitionDefaults()).toEqual(expected);
  });
});
