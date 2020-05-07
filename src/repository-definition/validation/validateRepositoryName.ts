export const validateRepositoryName = (
  repositoryDefinitionPath: string
): boolean => {
  return repositoryDefinitionPath.match(/.+\.repository\.yml/) !== null;
};
