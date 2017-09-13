import path from 'path';
import { app } from 'electron';

// export const rootPath = process.env.NODE_ENV === 'development'
//     ? path.resolve(__dirname, '../../')
//     : path.resolve(remote.app.getPath('appData'), '/zoovie/');
// console.log(path.resolve(app.getAppPath(), '..', '..', '..', '..', '..'));

export const rootPath = process.env.NODE_ENV === 'development'
    ? path.resolve(app.getAppPath(), '..', '..', '..', '..', '..')
    : path.resolve(app.getAppPath(), '..', '..');