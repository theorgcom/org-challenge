import Router from 'universal-router';
import routes from './routes';

import { ActionReturnType, OrgRouterContext } from './routes/types';

export default new Router<ActionReturnType, OrgRouterContext>(routes);
