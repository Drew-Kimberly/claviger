import * as path from 'path';
import {exec} from 'child_process';
import {getUpkeepRepositories} from './src/repository';

// Security alert.
(async () => {
  const configPath = path.join(__dirname, 'repositories');
  const configs = await getUpkeepRepositories(configPath);

  configs.forEach(config => {
    const clonedRepo = path.join(__dirname, `gitRepos/${config.id}`);
    exec(
      `git clone --depth=1 ${config.gitRepository.url} ${clonedRepo} -b ${config.gitRepository.ref} && cd ${clonedRepo}`,
      (error, stdout, stderr) => {
        if (error) {
          throw error;
        }
        if (stderr) {
          console.log(stderr);
        }

        console.log(stdout);

        if (config.securityAlert.enabled) {
          exec('npm audit --json', (err, stdout) => {
            if (err) {
              throw err;
            }

            const auditResults = JSON.parse(stdout);
            console.log(`Results for ${config.name}:`, auditResults);
          });
        }
      }
    );
  });
})();

export * from './src';
