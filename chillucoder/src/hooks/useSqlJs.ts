import { useEffect, useState } from 'react';

export default function useSqlJs() {
  const [SQL, setSQL] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      try {
        // Dynamically import SQL.js to avoid SSR issues
        const initSqlJs = (await import('sql.js/dist/sql-wasm.js')).default;
        
        // Load from CDN
        const SQL = await initSqlJs({
          locateFile: (file) => `https://sql.js.org/dist/${file}`
        });
        
        setSQL(SQL);
      } catch (err) {
        setError(`Failed to initialize SQL.js: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  return { SQL, loading, error };
}