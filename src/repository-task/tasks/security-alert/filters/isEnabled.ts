import {RepositoryTaskFilter} from '../../../types';

export const isEnabled: RepositoryTaskFilter = task =>
  Boolean(task.definition.securityAlert.enabled);
