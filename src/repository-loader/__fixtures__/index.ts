import {
  PackageManagers,
  RepositoryDefinition,
} from '../../repository-definition';

export const createDefinitionFixture = (id: string): RepositoryDefinition => ({
  id: `repository-${id}`,
  name: `Repository Fixture ${id}`,
  packageManager: PackageManagers.NPM,
  gitRepository: {
    url: 'testing',
  },
  emails: [],
  securityAlert: {
    enabled: true,
  },
  dependencyReport: {
    enabled: true,
  },
});

export const createMockDefinitions = (
  numDefinitions: number,
  offset = 0
): RepositoryDefinition[] => [
  ...new Array(numDefinitions)
    .fill(0)
    .map((val, idx) => createDefinitionFixture((idx + 1 + offset).toString())),
];
