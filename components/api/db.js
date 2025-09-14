
import { Pool } from 'pg';


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
    idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  });

  export default pool