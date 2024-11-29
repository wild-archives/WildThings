import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import user from '@/routers/user.ts';
import auth from '@/routers/auth.ts';
import authService from './lib/auth.ts';

const app = new Hono<{
  Variables: {
    user: typeof authService.$Infer.Session.user | null;
    session: typeof authService.$Infer.Session.session | null;
  };
}>();

app
  .use('*', async (c, next) => {
    const session = await authService.api.getSession({
      headers: c.req.raw.headers,
    });

    if (!session) {
      c.set('user', null);
      c.set('session', null);
      return next();
    }

    c.set('user', session.user);
    c.set('session', session.session);
    return next();
  })
  .basePath('/api')
  .route('/user', user)
  .on(['POST', 'GET'], '/auth/**', (c) => {
    return authService.handler(c.req.raw);
  })
  .get('/', (context) => {
    return context.html('<h1>Wild Archive is running!</h1>');
  });

const port = 2334;
console.log(`Server is running on http://localhost:${port} ! :)`);

serve({
  fetch: app.fetch,
  port,
});
