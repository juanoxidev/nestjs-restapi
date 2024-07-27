SELECT 'CREATE DATABASE curso'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname= 'curso')\gexec