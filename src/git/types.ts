import {IExecutionResult} from '../execute';

export interface ICloneable {
  gitUrl(): string;
  gitBranch(): string;
  cloneDepth(): number;
  cloneDestination(): string;
}

export interface IGit {
  clone(repo: ICloneable): Promise<boolean>;
}

export type GitCloneExecutable = (
  destination: string
) => Promise<IExecutionResult>;
