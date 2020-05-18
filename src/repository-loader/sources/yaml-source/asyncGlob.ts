import glob from 'glob';

export const asyncGlob = (pattern: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const callback = (err: Error | null, matches: string[] = []): void => {
      if (err) return reject(err);

      return resolve(matches);
    };

    glob(pattern, {strict: true}, callback);
  });
};
