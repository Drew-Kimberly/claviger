import {PackageManagers, RepositoryDefinition} from '../../types';
import {validateRepositoryDefinition} from '../../validation';

describe('Test suite for validateRepositoryDefinition', () => {
  test('A valid repository definition instance returns no validation errors', async () => {
    const definition: RepositoryDefinition = {
      id: 'valid-def',
      name: 'Valid Repo',
      packageManager: PackageManagers.NPM,
      emails: [],
      gitRepository: {
        url: 'test-url',
      },
      dependencyReport: {
        enabled: true,
      },
      securityAlert: {
        enabled: false,
      },
    };

    const result = await validateRepositoryDefinition(definition);

    expect(result).toEqual([]);
  });

  test('An invalid repository definition instance returns validation errors', async () => {
    const missingNameDef = {
      name: 'Valid Repo',
      packageManager: PackageManagers.NPM,
      emails: [],
      gitRepository: {
        url: 'test-url',
      },
      dependencyReport: {
        enabled: true,
      },
      securityAlert: {
        enabled: false,
      },
    };

    // @ts-ignore
    const result = await validateRepositoryDefinition(missingNameDef);

    expect(result).toHaveLength(1);
    expect(result[0].message).toEqual("should have required property 'id'");
  });
});
