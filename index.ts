import * as path from 'path';
import {exec} from 'child_process';
import {getRepositories} from './src/repository';

// Security alert.
(async () => {
  const definitionsPath = path.join(__dirname, 'repositories');
  const repositories = await getRepositories(definitionsPath);

  for (const repo of repositories) {
    const clonedRepoDestination = path.join(__dirname, `gitRepos/${repo.id()}`);
    exec(
      `${repo.cloneCmd(clonedRepoDestination)} && cd ${clonedRepoDestination}`,
      (error, stdout, stderr) => {
        if (error) {
          throw error;
        }
        if (stderr) {
          console.log(stderr);
        }

        console.log(stdout);

        if (repo.isSecurityAlertEnabled()) {
          exec('npm audit --json', (err, stdout) => {
            if (err) {
              throw err;
            }

            const auditResults = JSON.parse(stdout);
            console.log(`Results for ${repo.name()}:`, auditResults);
          });
        }
      }
    );
  }
})();

export * from './src';
