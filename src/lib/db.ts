import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';

const client = createClient({
  url: 'http://127.0.0.1:8080',
});

export const db = drizzle(client);

if (process.env.NODE_ENV !== 'production') {
  migrate(db, { migrationsFolder: './migrations' });
}
