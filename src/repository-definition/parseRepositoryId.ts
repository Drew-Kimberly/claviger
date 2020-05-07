export const parseRepositoryId = (
  repositoryDefinitionPath: string
): string | undefined => {
  const matches = repositoryDefinitionPath.match(/.+\/(.+)\.repository\.yml$/);
  return matches && matches.length > 1 ? matches[1] : undefined;
};
