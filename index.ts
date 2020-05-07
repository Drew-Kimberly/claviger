import * as path from 'path';
import {exec} from 'child_process';
import {
  getRepositoryDefinitions,
  RepositoryDefinition,
} from './src/repository-definition';

// Security alert.
(async () => {
  const definitionsPath = path.join(__dirname, 'repositories');
  const definitions: RepositoryDefinition[] = await getRepositoryDefinitions(
    definitionsPath
  );

  for (const definition of definitions) {
    const clonedRepo = path.join(__dirname, `gitRepos/${definition.id}`);
    exec(
      `git clone --depth=1 ${definition.gitRepository.url} ${clonedRepo} -b ${definition.gitRepository.ref} && cd ${clonedRepo}`,
      (error, stdout, stderr) => {
        if (error) {
          throw error;
        }
        if (stderr) {
          console.log(stderr);
        }

        console.log(stdout);

        if (definition.securityAlert.enabled) {
          exec('npm audit --json', (err, stdout) => {
            if (err) {
              throw err;
            }

            const auditResults = JSON.parse(stdout);
            console.log(`Results for ${definition.name}:`, auditResults);
          });
        }
      }
    );
  }
})();

export * from './src';
