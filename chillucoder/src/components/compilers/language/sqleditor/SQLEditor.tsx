import React, { useState, useEffect, useRef } from 'react';
import { Download, Upload, Play, Database, RefreshCw, Plus, Trash2, Save, FileText, Import, AlertCircle, History, Zap, Columns, Table } from 'lucide-react';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

// Type definitions
interface DatabaseItem {
  id: string;
  name: string;
  data: Uint8Array;
  createdAt: string;
}

interface QueryItem {
  id: string;
  name: string;
  sql: string;
  createdAt: string;
}

interface QueryResult {
  result?: any[][];
  columns?: string[];
  error?: string;
  executionTime?: number;
  rowsAffected?: number;
}

interface QueryHistoryItem {
  id: string;
  sql: string;
  executedAt: string;
}

// IndexedDB helper functions
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('SQLiteEditorDB', 2);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      if (!db.objectStoreNames.contains('databases')) {
        const dbStore = db.createObjectStore('databases', { keyPath: 'id' });
        dbStore.createIndex('name', 'name', { unique: false });
      }
      
      if (!db.objectStoreNames.contains('queries')) {
        const queryStore = db.createObjectStore('queries', { keyPath: 'id' });
        queryStore.createIndex('name', 'name', { unique: false });
      }

      if (!db.objectStoreNames.contains('history')) {
        const historyStore = db.createObjectStore('history', { keyPath: 'id' });
        historyStore.createIndex('executedAt', 'executedAt', { unique: false });
      }
    };
  });
};

const saveDatabaseToIndexedDB = async (database: DatabaseItem): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(['databases'], 'readwrite');
  const store = transaction.objectStore('databases');
  
  return new Promise((resolve, reject) => {
    const request = store.put(database);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

const loadDatabasesFromIndexedDB = async (): Promise<DatabaseItem[]> => {
  const db = await openDB();
  const transaction = db.transaction(['databases'], 'readonly');
  const store = transaction.objectStore('databases');
  
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const deleteDatabaseFromIndexedDB = async (id: string): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(['databases'], 'readwrite');
  const store = transaction.objectStore('databases');
  
  return new Promise((resolve, reject) => {
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

const saveQueryToIndexedDB = async (query: QueryItem): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(['queries'], 'readwrite');
  const store = transaction.objectStore('queries');
  
  return new Promise((resolve, reject) => {
    const request = store.put(query);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

const loadQueriesFromIndexedDB = async (): Promise<QueryItem[]> => {
  const db = await openDB();
  const transaction = db.transaction(['queries'], 'readonly');
  const store = transaction.objectStore('queries');
  
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const deleteQueryFromIndexedDB = async (id: string): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(['queries'], 'readwrite');
  const store = transaction.objectStore('queries');
  
  return new Promise((resolve, reject) => {
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

const saveHistoryItemToIndexedDB = async (historyItem: QueryHistoryItem): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(['history'], 'readwrite');
  const store = transaction.objectStore('history');
  
  return new Promise((resolve, reject) => {
    const request = store.put(historyItem);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

const loadHistoryFromIndexedDB = async (limit = 50): Promise<QueryHistoryItem[]> => {
  const db = await openDB();
  const transaction = db.transaction(['history'], 'readonly');
  const store = transaction.objectStore('history');
  const index = store.index('executedAt');
  
  return new Promise((resolve, reject) => {
    const request = index.openCursor(null, 'prev');
    const historyItems: QueryHistoryItem[] = [];
    
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
      if (cursor && historyItems.length < limit) {
        historyItems.push(cursor.value);
        cursor.continue();
      } else {
        resolve(historyItems);
      }
    };
    
    request.onerror = () => reject(request.error);
  });
};

const clearHistoryFromIndexedDB = async (): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(['history'], 'readwrite');
  const store = transaction.objectStore('history');
  
  return new Promise((resolve, reject) => {
    const request = store.clear();
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export default function SQLEditor() {
  const [sql, setSql] = useState('SELECT * FROM sqlite_master;');
  const [result, setResult] = useState<QueryResult | null>(null);
  const [databases, setDatabases] = useState<DatabaseItem[]>([]);
  const [queries, setQueries] = useState<QueryItem[]>([]);
  const [history, setHistory] = useState<QueryHistoryItem[]>([]);
  const [currentDatabase, setCurrentDatabase] = useState('');
  const [newDbName, setNewDbName] = useState('');
  const [queryName, setQueryName] = useState('');
  const [showCreateDb, setShowCreateDb] = useState(false);
  const [showSaveQuery, setShowSaveQuery] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'databases' | 'queries'>('editor');
  const [isExecuting, setIsExecuting] = useState(false);
  const [SQL, setSQL] = useState<any>(null);
  const [dbInstance, setDbInstance] = useState<any>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editorReady, setEditorReady] = useState(false);
  const [activeResultTab, setActiveResultTab] = useState<'results' | 'schema'>('results');
  const [schemaInfo, setSchemaInfo] = useState<any[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryFileInputRef = useRef<HTMLInputElement>(null);
  const sqlFileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<any>(null);

  // Load data from IndexedDB
  const loadDataFromIndexedDB = async () => {
    try {
      const [loadedDatabases, loadedQueries, loadedHistory] = await Promise.all([
        loadDatabasesFromIndexedDB(),
        loadQueriesFromIndexedDB(),
        loadHistoryFromIndexedDB()
      ]);
      
      setDatabases(loadedDatabases);
      setQueries(loadedQueries);
      setHistory(loadedHistory);
      
      if (loadedDatabases.length > 0) {
        const defaultDb = loadedDatabases.find(db => db.id === 'default') || loadedDatabases[0];
        setCurrentDatabase(defaultDb.id);
      }
    } catch (err) {
      console.error('Failed to load data from IndexedDB:', err);
      setError(`Failed to load saved data: ${(err as Error).message}`);
    }
  };

  // Initialize SQL.js from CDN
  useEffect(() => {
    async function initialize() {
      try {
        setIsInitializing(true);
        setError(null);
        
        // Load SQL.js from CDN
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js';
        
        script.onload = async () => {
          try {
            // @ts-ignore - SQL will be available globally after script loads
            const SQL = await window.initSqlJs({
              locateFile: (file: string) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
            });
            
            setSQL(SQL);
            await loadDataFromIndexedDB();
            
            const loadedDatabases = await loadDatabasesFromIndexedDB();
            if (loadedDatabases.length === 0) {
              await createDefaultDatabase(SQL);
            }
            
            setIsInitializing(false);
          } catch (err) {
            console.error('SQL.js initialization error:', err);
            setError(`SQL.js initialization failed: ${(err as Error).message}`);
            setIsInitializing(false);
          }
        };
        
        script.onerror = () => {
          setError('Failed to load SQL.js from CDN');
          setIsInitializing(false);
        };
        
        document.head.appendChild(script);
        
        return () => {
          if (document.head.contains(script)) {
            document.head.removeChild(script);
          }
        };
      } catch (err) {
        console.error('Initialization error:', err);
        setError(`Initialization failed: ${(err as Error).message}`);
        setIsInitializing(false);
      }
    }
    
    initialize();
  }, []);

  // Initialize database instance when current database changes
  useEffect(() => {
    if (!SQL || !currentDatabase) return;

    const db = databases.find(db => db.id === currentDatabase);
    if (db) {
      try {
        const newDb = new SQL.Database(db.data);
        setDbInstance(newDb);
        setError(null);
        loadSchemaInfo(newDb);
      } catch (err) {
        console.error('Database initialization error:', err);
        setError(`Failed to load database: ${(err as Error).message}`);
      }
    }
  }, [SQL, currentDatabase, databases]);

  // Load schema information
  const loadSchemaInfo = (db: any) => {
    try {
      const result = db.exec(`
        SELECT type, name, tbl_name, sql 
        FROM sqlite_master 
        WHERE name NOT LIKE 'sqlite_%'
        ORDER BY type, name;
      `);
      
      if (result.length > 0) {
        setSchemaInfo(result[0].values.map((row: any) => ({
          type: row[0],
          name: row[1],
          tbl_name: row[2],
          sql: row[3]
        })));
      } else {
        setSchemaInfo([]);
      }
    } catch (err) {
      console.error('Failed to load schema info:', err);
      setSchemaInfo([]);
    }
  };

  // Database management functions
  const saveDatabaseToStorage = async (db: DatabaseItem) => {
    try {
      await saveDatabaseToIndexedDB(db);
      setDatabases(prev => {
        const filtered = prev.filter(d => d.id !== db.id);
        return [...filtered, db];
      });
    } catch (err) {
      setError(`Failed to save database: ${(err as Error).message}`);
    }
  };

  const deleteDatabaseFromStorage = async (id: string) => {
    try {
      await deleteDatabaseFromIndexedDB(id);
      const updatedDatabases = databases.filter(db => db.id !== id);
      setDatabases(updatedDatabases);
      
      if (currentDatabase === id) {
        if (updatedDatabases.length > 0) {
          setCurrentDatabase(updatedDatabases[0].id);
        } else if (SQL) {
          await createDefaultDatabase(SQL);
        }
      }
    } catch (err) {
      setError(`Failed to delete database: ${(err as Error).message}`);
    }
  };

  const saveQueryToStorage = async (query: QueryItem) => {
    try {
      await saveQueryToIndexedDB(query);
      setQueries(prev => {
        const filtered = prev.filter(q => q.id !== query.id);
        return [...filtered, query];
      });
    } catch (err) {
      setError(`Failed to save query: ${(err as Error).message}`);
    }
  };

  const deleteQueryFromStorage = async (id: string) => {
    try {
      await deleteQueryFromIndexedDB(id);
      setQueries(prev => prev.filter(q => q.id !== id));
    } catch (err) {
      setError(`Failed to delete query: ${(err as Error).message}`);
    }
  };

  const addToHistory = async (sql: string) => {
    try {
      const historyItem: QueryHistoryItem = {
        id: Date.now().toString(),
        sql: sql,
        executedAt: new Date().toISOString()
      };
      
      await saveHistoryItemToIndexedDB(historyItem);
      setHistory(prev => [historyItem, ...prev.slice(0, 49)]);
    } catch (err) {
      console.error('Failed to save to history:', err);
    }
  };

  const clearHistory = async () => {
    try {
      await clearHistoryFromIndexedDB();
      setHistory([]);
    } catch (err) {
      setError(`Failed to clear history: ${(err as Error).message}`);
    }
  };

  // Handle editor mount
  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    setEditorReady(true);
    
    // Add keyboard shortcut for execution
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      executeSQL();
    });
  };

  // Execute SQL with enhanced support for special commands
  const executeSQL = async () => {
    if (!sql.trim() || !dbInstance) return;

    setIsExecuting(true);
    setError(null);

    try {
      const startTime = performance.now();
      let queryResult;
      let rowsAffected = 0;
      let executionTime = 0;

      // Add to history
      await addToHistory(sql);

      // Handle special commands that aren't standard SQLite
      const normalizedSql = sql.trim().toUpperCase();
      
      if (normalizedSql === 'SHOW TABLES' || normalizedSql === 'SHOW TABLES;') {
        // MySQL-style SHOW TABLES
        queryResult = dbInstance.exec(`
          SELECT name as Tables FROM sqlite_master 
          WHERE type='table' 
          AND name NOT LIKE 'sqlite_%'
          ORDER BY name;
        `);
      } 
      else if (normalizedSql.startsWith('DESCRIBE ') || normalizedSql.startsWith('DESC ')) {
        // MySQL-style DESCRIBE command
        const tableName = sql.split(/\s+/)[1].replace(';', '').trim();
        queryResult = dbInstance.exec(`PRAGMA table_info(${tableName});`);
      }
      else {
        // Standard SQL execution
        queryResult = dbInstance.exec(sql);
        rowsAffected = dbInstance.getRowsModified();
      }

      executionTime = performance.now() - startTime;

      if (queryResult.length === 0) {
        setResult({
          result: [],
          columns: [],
          executionTime,
          rowsAffected
        });
      } else {
        setResult({
          result: queryResult[0].values,
          columns: queryResult[0].columns,
          executionTime,
          rowsAffected
        });
      }
      
      // Refresh schema info after execution
      loadSchemaInfo(dbInstance);
      await updateCurrentDatabase();
    } catch (err) {
      setResult({ 
        error: `SQL Error: ${(err as Error).message}`,
        executionTime: 0
      });
    } finally {
      setIsExecuting(false);
    }
  };

  // Create a new database
  const createDatabase = async () => {
    if (!newDbName.trim() || !SQL) return;

    try {
      setError(null);
      const db = new SQL.Database();
      
      // Create sample tables
      db.exec(`
        CREATE TABLE users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE,
          age INTEGER,
          department_id INTEGER
        );
        
        CREATE TABLE products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          price REAL,
          category TEXT,
          stock INTEGER DEFAULT 0
        );
        
        CREATE TABLE departments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          budget REAL
        );
        
        INSERT INTO departments (name, budget) VALUES 
          ('Engineering', 100000),
          ('Marketing', 75000),
          ('Sales', 80000);
          
        INSERT INTO users (name, email, age, department_id) VALUES
          ('John Doe', 'john@example.com', 30, 1),
          ('Jane Smith', 'jane@example.com', 25, 2),
          ('Bob Johnson', 'bob@example.com', 35, 1),
          ('Alice Brown', 'alice@example.com', 28, 3);
          
        INSERT INTO products (name, price, category, stock) VALUES
          ('Laptop', 999.99, 'Electronics', 50),
          ('Book', 19.99, 'Education', 100),
          ('Coffee Mug', 9.99, 'Home', 200),
          ('Smartphone', 599.99, 'Electronics', 30);
      `);

      const newDb: DatabaseItem = {
        id: Date.now().toString(),
        name: newDbName,
        data: db.export(),
        createdAt: new Date().toISOString()
      };

      await saveDatabaseToStorage(newDb);
      setCurrentDatabase(newDb.id);
      setDbInstance(db);
      setNewDbName('');
      setShowCreateDb(false);
    } catch (err) {
      setError(`Failed to create database: ${(err as Error).message}`);
    }
  };

  // Create default database
  const createDefaultDatabase = async (SQLInstance: any) => {
    try {
      const db = new SQLInstance.Database();
      
      db.exec(`
        CREATE TABLE users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE,
          age INTEGER,
          department_id INTEGER
        );
        
        CREATE TABLE products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          price REAL,
          category TEXT,
          stock INTEGER DEFAULT 0
        );
        
        CREATE TABLE departments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          budget REAL
        );
        
        INSERT INTO departments (name, budget) VALUES 
          ('Engineering', 100000),
          ('Marketing', 75000),
          ('Sales', 80000);
          
        INSERT INTO users (name, email, age, department_id) VALUES
          ('John Doe', 'john@example.com', 30, 1),
          ('Jane Smith', 'jane@example.com', 25, 2),
          ('Bob Johnson', 'bob@example.com', 35, 1),
          ('Alice Brown', 'alice@example.com', 28, 3);
          
        INSERT INTO products (name, price, category, stock) VALUES
          ('Laptop', 999.99, 'Electronics', 50),
          ('Book', 19.99, 'Education', 100),
          ('Coffee Mug', 9.99, 'Home', 200),
          ('Smartphone', 599.99, 'Electronics', 30);
      `);

      const defaultDb: DatabaseItem = {
        id: 'default',
        name: 'default',
        data: db.export(),
        createdAt: new Date().toISOString()
      };

      await saveDatabaseToStorage(defaultDb);
      setCurrentDatabase('default');
      setDbInstance(db);
    } catch (err) {
      setError(`Failed to create default database: ${(err as Error).message}`);
      setIsInitializing(false);
    }
  };

  // Update current database in storage
  const updateCurrentDatabase = async () => {
    if (!currentDatabase || !dbInstance) return;

    try {
      const dbToUpdate = databases.find(db => db.id === currentDatabase);
      
      if (dbToUpdate) {
        const updatedDb = {
          ...dbToUpdate,
          data: dbInstance.export()
        };
        await saveDatabaseToStorage(updatedDb);
      }
    } catch (err) {
      setError(`Failed to update database: ${(err as Error).message}`);
    }
  };

  // Switch between databases
  const switchDatabase = async (dbId: string) => {
    const db = databases.find(d => d.id === dbId);
    
    if (db && SQL) {
      try {
        if (dbInstance) {
          dbInstance.close();
        }
        
        setCurrentDatabase(dbId);
        setDbInstance(new SQL.Database(db.data));
        setError(null);
        loadSchemaInfo(new SQL.Database(db.data));
      } catch (err) {
        setError(`Failed to switch database: ${(err as Error).message}`);
      }
    }
  };

  // Export database as SQLite file
  const exportDatabaseAsSQLite = () => {
    if (!dbInstance) return;

    try {
      const exportData = dbInstance.export();
      const blob = new Blob([exportData], { type: 'application/x-sqlite3' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${databases.find(db => db.id === currentDatabase)?.name || 'database'}.sqlite`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(`Failed to export database: ${(err as Error).message}`);
    }
  };

  // Import SQLite database
  const importSQLiteDatabase = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !SQL) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        setError(null);
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        const db = new SQL.Database(uint8Array);

        const newDb: DatabaseItem = {
          id: Date.now().toString(),
          name: file.name.replace('.sqlite', '').replace('.db', ''),
          data: db.export(),
          createdAt: new Date().toISOString()
        };

        await saveDatabaseToStorage(newDb);
        setCurrentDatabase(newDb.id);
        setDbInstance(db);
        loadSchemaInfo(db);
      } catch (err) {
        setError(`Error importing database: ${(err as Error).message}`);
      }
    };
    reader.onerror = () => {
      setError('Failed to read database file');
    };
    reader.readAsArrayBuffer(file);
    event.target.value = '';
  };

  // Enhanced export function that preserves all database objects
  const exportDatabaseAsSQL = () => {
    if (!dbInstance) return;

    try {
      // Get all database objects
      const schema = dbInstance.exec(`
        SELECT type, name, sql FROM sqlite_master
        WHERE name NOT LIKE 'sqlite_%'
        ORDER BY 
          CASE type
            WHEN 'table' THEN 1
            WHEN 'view' THEN 2
            WHEN 'index' THEN 3
            WHEN 'trigger' THEN 4
            ELSE 5
          END,
          name;
      `);

      let sqlExport = '';
      
      // Add PRAGMA statements
      sqlExport += "PRAGMA foreign_keys=OFF;\n";
      sqlExport += "BEGIN TRANSACTION;\n\n";

      // Add schema
      if (schema.length > 0 && schema[0].values) {
        schema[0].values.forEach((row: any) => {
          if (row[2]) { // sql column
            sqlExport += row[2] + ";\n\n";
          }
        });
      }

      // Add data
      const tables = dbInstance.exec(`
        SELECT name FROM sqlite_master 
        WHERE type = 'table' 
        AND name NOT LIKE 'sqlite_%'
        AND name NOT IN (
          SELECT name FROM sqlite_master 
          WHERE type = 'table' 
          AND sql LIKE '%WITHOUT ROWID%'
        );
      `);

      if (tables.length > 0) {
        tables[0].values?.forEach((tableRow: any) => {
          const tableName = tableRow[0];
          const data = dbInstance.exec(`SELECT * FROM ${tableName};`);
          
          if (data.length > 0 && data[0].values) {
            sqlExport += `\n-- Data for table ${tableName}\n`;
            data[0].values.forEach((row: any) => {
              const values = row.map((val: any) => 
                val === null ? 'NULL' : typeof val === 'string' ? `'${val.replace(/'/g, "''")}'` : val
              ).join(', ');
              sqlExport += `INSERT INTO ${tableName} VALUES (${values});\n`;
            });
          }
        });
      }

      sqlExport += "\nCOMMIT;\n";
      sqlExport += "PRAGMA foreign_keys=ON;\n";

      const blob = new Blob([sqlExport], { type: 'text/sql' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${databases.find(db => db.id === currentDatabase)?.name || 'database'}.sql`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(`Failed to export SQL: ${(err as Error).message}`);
    }
  };

  // Import SQL file
  const importSQL = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !SQL) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        setError(null);
        const sqlContent = e.target?.result as string;
        
        // Create a new database
        const db = new SQL.Database();
        
        // Execute the SQL script
        db.exec(sqlContent);

        const newDb: DatabaseItem = {
          id: Date.now().toString(),
          name: file.name.replace('.sql', '').replace('.db', ''),
          data: db.export(),
          createdAt: new Date().toISOString()
        };

        await saveDatabaseToStorage(newDb);
        setCurrentDatabase(newDb.id);
        setDbInstance(db);
        loadSchemaInfo(db);
      } catch (err) {
        setError(`Error importing SQL: ${(err as Error).message}`);
      }
    };
    reader.onerror = () => {
      setError('Failed to read SQL file');
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  // Save current query
  const saveCurrentQuery = async () => {
    if (!queryName.trim() || !sql.trim()) return;

    try {
      setError(null);
      const query: QueryItem = {
        id: Date.now().toString(),
        name: queryName,
        sql: sql,
        createdAt: new Date().toISOString()
      };

      await saveQueryToStorage(query);
      setQueryName('');
      setShowSaveQuery(false);
    } catch (err) {
      setError(`Failed to save query: ${(err as Error).message}`);
    }
  };

  // Load query into editor
  const loadQuery = (query: QueryItem) => {
    setSql(query.sql);
    setActiveTab('editor');
    if (editorRef.current) {
      editorRef.current.setValue(query.sql);
    }
  };

  // Load history item into editor
  const loadHistoryItem = (historyItem: QueryHistoryItem) => {
    setSql(historyItem.sql);
    if (editorRef.current) {
      editorRef.current.setValue(historyItem.sql);
    }
    setShowHistory(false);
  };

  // Delete query
  const deleteQuery = async (id: string) => {
    if (confirm('Are you sure you want to delete this query?')) {
      try {
        await deleteQueryFromStorage(id);
      } catch (err) {
        setError(`Failed to delete query: ${(err as Error).message}`);
      }
    }
  };

  // Export query
  const exportQuery = (query: QueryItem) => {
    try {
      const dataStr = JSON.stringify(query, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${query.name}_query.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(`Failed to export query: ${(err as Error).message}`);
    }
  };

  // Import query
  const importQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        setError(null);
        const data = JSON.parse(e.target?.result as string);
        const query: QueryItem = {
          ...data,
          id: Date.now().toString(),
          createdAt: new Date().toISOString()
        };
        await saveQueryToStorage(query);
      } catch (err) {
        setError('Invalid query file format');
      }
    };
    reader.onerror = () => {
      setError('Failed to read query file');
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  // Reset default database
  const resetToDefault = async () => {
    if (confirm('This will reset the default database to its original state. All current data will be lost. Continue?')) {
      try {
        await deleteDatabaseFromStorage('default');
        if (SQL) {
          await createDefaultDatabase(SQL);
        }
      } catch (err) {
        setError(`Failed to reset default database: ${(err as Error).message}`);
      }
    }
  };

  // Format SQL in editor
  const formatSQL = () => {
    if (editorRef.current) {
      const formatted = sql.replace(/\b(SELECT|FROM|WHERE|GROUP BY|HAVING|ORDER BY|LIMIT|JOIN|INNER JOIN|LEFT JOIN|RIGHT JOIN|INSERT INTO|UPDATE|DELETE FROM|CREATE TABLE|CREATE VIEW|CREATE INDEX|ALTER TABLE|DROP TABLE|DROP VIEW|DROP INDEX|BEGIN|COMMIT|ROLLBACK)\b/gi, '\n$1');
      editorRef.current.setValue(formatted);
      setSql(formatted);
    }
  };

  // Get sample queries
  const getSampleQueries = () => [
    'SELECT * FROM users;',
    'SELECT u.name, d.name as department FROM users u JOIN departments d ON u.department_id = d.id;',
    'SELECT category, COUNT(*) as product_count, AVG(price) as avg_price FROM products GROUP BY category;',
    'SELECT * FROM users WHERE age > 25 ORDER BY age DESC;',
    'UPDATE users SET age = age + 1 WHERE department_id = 1;',
    'INSERT INTO products (name, price, category, stock) VALUES (\'Tablet\', 299.99, \'Electronics\', 25);',
    'CREATE TABLE categories (id INT PRIMARY KEY, name VARCHAR(100) NOT NULL, description TEXT);',
    'CREATE VIEW young_users AS SELECT * FROM users WHERE age < 30;',
    'PRAGMA table_info(users);',
    'EXPLAIN QUERY PLAN SELECT * FROM users WHERE age > 25;',
    'SHOW TABLES;',
    'DESCRIBE users;'
  ];

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Database className="w-16 h-16 mx-auto mb-4 text-blue-600 animate-pulse" />
          <h1 className="text-2xl font-bold text-gray-800">Initializing SQL Editor</h1>
          <p className="text-gray-600 mt-2">Loading SQLite engine and saved data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="container mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4 flex items-center space-x-2 text-blue-800">
            <Database className="w-8 h-8" />
            <span>SQLite Editor</span>
            <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
              IndexedDB Storage
            </span>
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <div className="font-medium text-red-800">Error</div>
                <div className="text-red-700 text-sm">{error}</div>
              </div>
            </div>
          )}

          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                activeTab === 'editor'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>SQL Editor</span>
            </button>
            <button
              onClick={() => setActiveTab('databases')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                activeTab === 'databases'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Databases ({databases.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('queries')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                activeTab === 'queries'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              <Save className="w-4 h-4" />
              <span>Saved Queries ({queries.length})</span>
            </button>
          </div>

          <div className="bg-white p-4 rounded-lg mb-4 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-2">
                  <Database className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Current Database: <strong className="text-blue-700">{databases.find(db => db.id === currentDatabase)?.name || 'None'}</strong></span>
                </span>
                {currentDatabase && dbInstance && (
                  <span className="text-sm text-gray-500">
                    {dbInstance.exec("SELECT count(*) as count FROM sqlite_master WHERE type='table';")[0]?.values?.[0]?.[0] || 0} tables
                  </span>
                )}
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={exportDatabaseAsSQLite}
                  disabled={!currentDatabase}
                  className="px-2 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded text-xs flex items-center space-x-1 text-white transition-colors"
                >
                  <Download className="w-3 h-3" />
                  <span>Export SQLite</span>
                </button>
                <button
                  onClick={exportDatabaseAsSQL}
                  disabled={!currentDatabase}
                  className="px-2 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded text-xs flex items-center space-x-1 text-white transition-colors"
                >
                  <Download className="w-3 h-3" />
                  <span>Export SQL</span>
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2 py-1 bg-purple-600 hover:bg-purple-700 rounded text-xs flex items-center space-x-1 text-white transition-colors"
                >
                  <Upload className="w-3 h-3" />
                  <span>Import SQLite</span>
                </button>
                <button
                  onClick={() => sqlFileInputRef.current?.click()}
                  className="px-2 py-1 bg-indigo-600 hover:bg-indigo-700 rounded text-xs flex items-center space-x-1 text-white transition-colors"
                >
                  <Upload className="w-3 h-3" />
                  <span>Import SQL</span>
                </button>
                <button
                  onClick={resetToDefault}
                  disabled={currentDatabase !== 'default'}
                  className="px-2 py-1 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded text-xs flex items-center space-x-1 text-white transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset Default</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {activeTab === 'editor' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">SQL Query</label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowHistory(true)}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm flex items-center space-x-1 text-gray-700 transition-colors"
                  >
                    <History className="w-4 h-4" />
                    <span>History</span>
                  </button>
                  <button
                    onClick={formatSQL}
                    disabled={!sql.trim()}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-lg text-sm flex items-center space-x-1 text-gray-700 transition-colors"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Format</span>
                  </button>
                  <button
                    onClick={() => setShowSaveQuery(true)}
                    disabled={!sql.trim()}
                    className="px-3 py-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg text-sm flex items-center space-x-1 text-white transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Query</span>
                  </button>
                  <button
                    onClick={() => {
                      setSql('');
                      if (editorRef.current) {
                        editorRef.current.setValue('');
                      }
                    }}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm text-gray-700 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
              
              <div className="w-full h-60 border border-gray-300 rounded-lg overflow-hidden">
                <Editor
                  height="100%"
                  defaultLanguage="sql"
                  value={sql}
                  onChange={(value) => setSql(value || '')}
                  onMount={handleEditorDidMount}
                  options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    fontSize: 14,
                    wordWrap: 'on',
                    automaticLayout: true,
                    padding: { top: 10 },
                  }}
                  theme="vs"
                />
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={executeSQL}
                  disabled={!sql.trim() || isExecuting || !dbInstance}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg flex items-center space-x-2 font-medium text-white shadow-md transition-colors"
                >
                  {isExecuting ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                  <span>{isExecuting ? 'Executing...' : 'Execute Query'}</span>
                </button>

                <div className="text-sm text-gray-500">
                  Press Ctrl+Enter to execute
                </div>
              </div>
            </div>

            {result && (
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">Query Results</h3>
                  <div className="flex items-center space-x-4">
                    {result.executionTime && (
                      <span className="text-sm text-gray-500">
                        {result.executionTime.toFixed(2)} ms
                      </span>
                    )}
                    {result.rowsAffected !== undefined && result.rowsAffected > 0 && (
                      <span className="text-sm text-gray-500">
                        {result.rowsAffected} row(s) affected
                      </span>
                    )}
                    {result.result && Array.isArray(result.result) && (
                      <span className="text-sm text-gray-500">
                        {result.result.length} row(s) returned
                      </span>
                    )}
                  </div>
                </div>

                {result.error ? (
                  <div className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-red-600 font-semibold mb-1">SQL Error</div>
                      <div className="text-red-500 font-mono text-sm">{result.error}</div>
                    </div>
                  </div>
                ) : result.result ? (
                  <div>
                    {Array.isArray(result.result) ? (
                      result.result.length > 0 ? (
                        <div className="overflow-x-auto">
                          <table className="min-w-full border border-gray-300 rounded">
                            <thead>
                              <tr className="bg-gray-100">
                                {result.columns?.map((col, index) => (
                                  <th key={index} className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                                    {col}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {result.result.map((row, rowIndex) => (
                                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                  {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                                      {cell === null ? (
                                        <span className="text-gray-400 italic">NULL</span>
                                      ) : (
                                        String(cell)
                                      )}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <Database className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <div>No results found</div>
                        </div>
                      )
                    ) : (
                      <div className="p-3 bg-green-50 border border-green-200 rounded">
                        <div className="text-green-600 font-mono text-sm">{result.result}</div>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            )}

            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-800">Database Schema</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveResultTab('results')}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      activeResultTab === 'results'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Results
                  </button>
                  <button
                    onClick={() => setActiveResultTab('schema')}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      activeResultTab === 'schema'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Schema
                  </button>
                </div>
              </div>

              {activeResultTab === 'schema' ? (
                schemaInfo.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 rounded">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Type</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Table</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">SQL</th>
                        </tr>
                      </thead>
                      <tbody>
                        {schemaInfo.map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{item.type}</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{item.name}</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{item.tbl_name}</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700 font-mono whitespace-pre-wrap">{item.sql}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Table className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <div>No schema information available</div>
                  </div>
                )
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {getSampleQueries().map((query, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSql(query);
                        if (editorRef.current) {
                          editorRef.current.setValue(query);
                        }
                      }}
                      className="text-left p-2 bg-gray-50 hover:bg-blue-50 rounded text-sm font-mono border border-gray-200 transition-colors"
                      title="Click to load this query"
                    >
                      {query.length > 50 ? query.substring(0, 50) + '...' : query}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'databases' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Database Management</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowCreateDb(true)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center space-x-2 text-white shadow-md transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Database</span>
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2 text-white shadow-md transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span>Import Database</span>
                </button>
              </div>
            </div>

            <div className="grid gap-4">
              {databases.map((db) => {
                const sizeInMB = db.data ? (db.data.byteLength / (1024 * 1024)).toFixed(2) : 0;

                return (
                  <div key={db.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors shadow-sm">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold flex items-center space-x-2 text-gray-800">
                            <Database className="w-5 h-5 text-blue-600" />
                            <span>{db.name}</span>
                          </h3>
                          {currentDatabase === db.id && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">ACTIVE</span>
                          )}
                          {db.id === 'default' && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">DEFAULT</span>
                          )}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500 mb-3">
                          <div>
                            <div className="text-gray-700 font-medium">
                              {dbInstance && currentDatabase === db.id 
                                ? dbInstance.exec("SELECT count(*) as count FROM sqlite_master WHERE type='table';")[0]?.values?.[0]?.[0] || 0
                                : 'N/A'}
                            </div>
                            <div>Tables</div>
                          </div>
                          <div>
                            <div className="text-gray-700 font-medium">{sizeInMB} MB</div>
                            <div>Size</div>
                          </div>
                          <div>
                            <div className="text-gray-700 font-medium">{new Date(db.createdAt).toLocaleDateString()}</div>
                            <div>Created</div>
                          </div>
                          <div>
                            <div className="text-gray-700 font-medium">
                              {db.data ? 'Ready' : 'Corrupted'}
                            </div>
                            <div>Status</div>
                          </div>
                        </div>

                        {currentDatabase === db.id && dbInstance && (
                          <div className="text-sm">
                            <details>
                              <summary className="cursor-pointer text-gray-500 hover:text-gray-700">
                                View tables
                              </summary>
                              <div className="mt-2 bg-gray-50 p-2 rounded">
                                {dbInstance.exec(`
                                  SELECT name FROM sqlite_master 
                                  WHERE type='table' 
                                  AND name NOT LIKE 'sqlite_%'
                                  ORDER BY name;
                                `)[0]?.values?.map((row: any) => (
                                  <div key={row[0]} className="font-mono text-sm">{row[0]}</div>
                                ))}
                              </div>
                            </details>
                          </div>
                        )}
                      </div>

                      <div className="flex space-x-2 ml-4">
                        {currentDatabase !== db.id && (
                          <button
                            onClick={() => switchDatabase(db.id)}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm text-white transition-colors"
                          >
                            Switch
                          </button>
                        )}
                        <button
                          onClick={() => deleteDatabaseFromStorage(db.id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-sm flex items-center space-x-1 text-white transition-colors"
                          disabled={db.id === 'default'}
                          title={db.id === 'default' ? 'Cannot delete default database' : 'Delete database'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'queries' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Saved Queries</h2>
              <button
                onClick={() => queryFileInputRef.current?.click()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2 text-white shadow-md transition-colors"
              >
                <Import className="w-4 h-4" />
                <span>Import Query</span>
              </button>
            </div>

            {queries.length === 0 ? (
              <div className="text-center py-12 text-gray-500 bg-white rounded-lg border border-gray-200 shadow-sm">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <div className="text-lg mb-2">No saved queries yet</div>
                <div>Save your first query from the SQL Editor tab</div>
              </div>
            ) : (
              <div className="grid gap-4">
                {queries.map((query) => (
                  <div key={query.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors shadow-sm">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold flex items-center space-x-2 mb-2 text-gray-800">
                          <FileText className="w-4 h-4 text-purple-600" />
                          <span className="truncate">{query.name}</span>
                        </h3>
                        <p className="text-sm text-gray-500 mb-3">
                          Created: {new Date(query.createdAt).toLocaleString()}
                        </p>
                        <div className="bg-gray-50 p-3 rounded border border-gray-200 overflow-hidden">
                          <pre className="text-sm font-mono text-gray-700 whitespace-pre-wrap break-all">
                            {query.sql.length > 200 ? query.sql.substring(0, 200) + '...' : query.sql}
                          </pre>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4 flex-shrink-0">
                        <button
                          onClick={() => loadQuery(query)}
                          className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-lg text-sm text-white transition-colors"
                          title="Load query into editor"
                        >
                          Load
                        </button>
                        <button
                          onClick={() => exportQuery(query)}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm text-white transition-colors"
                          title="Export query to file"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteQuery(query.id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-sm text-white transition-colors"
                          title="Delete query"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Create Database Modal */}
        {showCreateDb && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg max-w-md w-full border border-gray-300 shadow-xl">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Create New Database</h3>
              <input
                type="text"
                value={newDbName}
                onChange={(e) => setNewDbName(e.target.value)}
                placeholder="Database name"
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newDbName.trim()) {
                    createDatabase();
                  } else if (e.key === 'Escape') {
                    setShowCreateDb(false);
                  }
                }}
                autoFocus
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowCreateDb(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createDatabase}
                  disabled={!newDbName.trim()}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg text-white transition-colors"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Save Query Modal */}
        {showSaveQuery && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg max-w-md w-full border border-gray-300 shadow-xl">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Save Query</h3>
              <input
                type="text"
                value={queryName}
                onChange={(e) => setQueryName(e.target.value)}
                placeholder="Query name"
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && queryName.trim()) {
                    saveCurrentQuery();
                  } else if (e.key === 'Escape') {
                    setShowSaveQuery(false);
                  }
                }}
                autoFocus
              />
              <div className="text-sm text-gray-500 mb-4">
                <div className="font-mono bg-gray-50 p-2 rounded border max-h-32 overflow-y-auto text-gray-700">
                  {sql.substring(0, 200)}{sql.length > 200 ? '...' : ''}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowSaveQuery(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveCurrentQuery}
                  disabled={!queryName.trim()}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg text-white transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Query History Modal */}
        {showHistory && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full border border-gray-300 shadow-xl max-h-[80vh] flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Query History</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={clearHistory}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-sm text-white transition-colors"
                  >
                    Clear History
                  </button>
                  <button
                    onClick={() => setShowHistory(false)}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {history.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <History className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <div>No query history yet</div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {history.map((item) => (
                      <div 
                        key={item.id} 
                        className="p-3 bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-200 cursor-pointer transition-colors"
                        onClick={() => loadHistoryItem(item)}
                      >
                        <div className="text-sm font-mono text-gray-700 whitespace-pre-wrap break-all mb-1">
                          {item.sql.length > 100 ? item.sql.substring(0, 100) + '...' : item.sql}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(item.executedAt).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Hidden file inputs */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={importSQLiteDatabase}
          accept=".sqlite,.db,.sqlite3"
          className="hidden"
        />
        <input
          type="file"
          ref={queryFileInputRef}
          onChange={importQuery}
          accept=".json"
          className="hidden"
        />
        <input
          type="file"
          ref={sqlFileInputRef}
          onChange={importSQL}
          accept=".sql,.txt"
          className="hidden"
        />
      </div>
    </div>
  );
}