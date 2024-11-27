import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import user from '@/routers/user.ts';
import auth from '@/routers/auth.ts';

const app = new Hono();

app
  .basePath('/api')
  .route('/user', user)
  .route('/auth', auth)
  .get('/', (context) => {
    return context.html('<h1>Wild Archive is running!</h1>');
  });

const port = 2334;
console.log(`Server is running on http://localhost:${port} ! :)`);

serve({
  fetch: app.fetch,
  port,
});
