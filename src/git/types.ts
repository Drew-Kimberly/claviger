export interface ICloneable {
  gitUrl(): string;
  gitBranch(): string;
  cloneDepth(): number;
  cloneDestination(): string;
}

export interface IGit {
  clone(repo: ICloneable): Promise<boolean>;
}
