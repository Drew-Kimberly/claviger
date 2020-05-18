import {RepositoryDefinition} from '../repository-definition';
import {IRepository} from '../repository';
import {Maybe} from '../util';

export enum RepositoryTasks {
  SecurityAlert = 'security-alert',
  DependencyReport = 'dependency-report',
}

export interface IRepositoryTask {
  uuid: string;
  created: number;
  type: RepositoryTasks;
  definition: RepositoryDefinition;
}

export type RepositoryTaskProducer = (
  repository: IRepository
) => Maybe<IRepositoryTask>;

export type RepositoryTaskFilter = (task: IRepositoryTask) => boolean;
