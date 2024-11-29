import { Hono } from 'hono';
import {
  getUserInfo,
  getUserExtraAttributes,
  updateUserProfile,
  updateLastSeen,
} from '@/service/user.ts';
import type { UpdateUserProfileInput } from '@/service/user.ts';

const app = new Hono();

app
  .get('/me', async (c) => {
    const user = await getUserInfo(c);
    return c.json(user);
  })
  .get('/me/attributes', async (c) => {
    const attributes = await getUserExtraAttributes(c);
    return c.json(attributes);
  })
  .patch('/me', async (c) => {
    const input = await c.req.json<UpdateUserProfileInput>();
    const updatedUser = await updateUserProfile(c, input);
    return c.json(updatedUser);
  })
  .put('/last-seen', async (c) => {
    await updateLastSeen(c);
    return c.json({ success: true });
  });

export default app;
