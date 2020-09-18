import path from 'path';
import webpack from 'webpack';
import { spawn } from './lib/cp';
import webpackConfig from './webpack.config';

const options = {
  cwd: path.resolve(__dirname, '../build'),
  stdio: ['ignore', 'inherit', 'inherit'],
};

/**
 * Creates application bundles from the source files.
 */
function bundle() {
  const tasks = [];
  tasks.push(
    new Promise((resolve, reject) => {
      webpack(webpackConfig).run((err, stats) => {
        if (err) {
          return reject(err);
        }

        console.info(stats.toString(webpackConfig[0].stats));
        return resolve();
      });
    }),
  );
  if (process.argv.includes('--lambda')) {
    tasks.push(spawn('npm', ['install'], options));
  }
  return Promise.all(tasks);
}

export default bundle;
