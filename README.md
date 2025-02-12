# AI Build Framework

A development toolkit for building AI applications with integrated services.

## Services

### Flowise

- **Port**: 3002
- **Credentials**:
  - Username: admin
  - Password: ASlobdQ3ji
- **Access**: http://localhost:3002
- **Database Connections**:
  > **Important Note**: While PostgreSQL is exposed externally on port 5433, Flowise must use the internal Docker network hostname "postgres" and port 5432 for connections. This is because services within the Docker network reference each other using their service names as hostnames.
  - MongoDB: Uses internal connection `mongodb://appuser:ASlobdQ3ji@mongodb:27017/appdb?authSource=appdb`
  - PostgreSQL Configuration:
    ```
    Connect Credential: local
    Host: postgres
    Database: appdb
    Port: 5432
    Username: admin
    Password: ASlobdQ3ji
    Table Name: documents
    Distance Strategy: Cosine
    File Upload: Off
    Additional Configuration: {} (empty object)
    Top K: 4
    Postgres Metadata Filter: {} (empty object)
    ```

### MongoDB

- **Port**: 27017
- **Admin Credentials**:
  - Username: admin
  - Password: ASlobdQ3ji
- **Application Credentials**:
  - Username: appuser
  - Password: ASlobdQ3ji
  - Database: appdb
- **Connection Strings**:
  - Admin: `mongodb://admin:ASlobdQ3ji@localhost:27017/?authSource=admin`
  - Application: `mongodb://appuser:ASlobdQ3ji@localhost:27017/appdb?authSource=appdb`

### Mongo Express (MongoDB Web Interface)

- **Port**: 8081
- **Access**: http://localhost:8081
- **Credentials**:
  - Username: admin
  - Password: ASlobdQ3ji

### PostgreSQL with pgvector

- **Port**: 5433
- **Credentials**:
  - Username: admin
  - Password: ASlobdQ3ji
  - Database: appdb
- **Connection String**: `postgresql://admin:ASlobdQ3ji@localhost:5433/appdb`
- **Vector Store Setup**:
  - Enabled pgvector extension
  - Created `documents` table with:
    ```sql
    id: SERIAL PRIMARY KEY
    content: TEXT
    metadata: JSONB
    embedding: vector(1536)  -- For OpenAI embeddings
    ```
  - Vector similarity index using IVFFlat
  - Cosine distance metric for similarity search

### pgAdmin (PostgreSQL Web Interface)

- **Port**: 5050
- **Access**: http://localhost:5050
- **Credentials**:
  - Email: admin@admin.com
  - Password: ASlobdQ3ji

## Getting Started

1. Start all services:

```bash
docker compose up -d
```

2. Access the web interfaces:

   - Flowise: http://localhost:3002
   - Mongo Express: http://localhost:8081
   - pgAdmin: http://localhost:5050

3. Connect to databases:
   - MongoDB: Use MongoDB Compass or any MongoDB client with the connection strings above
   - PostgreSQL: Use any PostgreSQL client with the connection details above

## Service Details

### MongoDB

- Vector store capabilities through native array support
- Initialized with two collections:
  - `documents`: Includes text search indexes on title and content fields
  - `metadata`: Includes timestamp index for efficient temporal queries

### PostgreSQL

- Includes pgvector extension for vector operations
- Optimized for AI/ML workloads with vector similarity search capabilities

### Flowise

- Low-code UI for building AI workflows
- Integrated with both MongoDB and PostgreSQL for data persistence
- Customizable API endpoints for workflow automation

## Development

### Directory Structure

```
.
├── docker-compose.yml    # Service configurations
├── init/
│   ├── mongo/           # MongoDB initialization scripts
│   │   └── init.js      # Creates users, collections, and indexes
│   └── postgres/        # PostgreSQL initialization scripts
│       └── init.sql     # Database setup and extensions
```

### Environment Variables

All sensitive information is configured in the docker-compose.yml file. For production deployments, consider using a .env file or secure secrets management.

### Service Dependencies

Services are configured with healthchecks to ensure proper startup order:

1. PostgreSQL and MongoDB start first with healthchecks:
   - PostgreSQL: Checks database readiness using `pg_isready`
   - MongoDB: Verifies connection using `db.adminCommand('ping')`
2. Flowise starts only after both databases are healthy
3. Web interfaces (pgAdmin, Mongo Express) start after their respective databases

### Networking

All services are connected through a Docker network named 'aibf-network', enabling seamless inter-service communication while maintaining isolation.

## Data Persistence

- MongoDB data: Stored in named volume `aibf-mongodb-data`
- PostgreSQL data: Stored in named volume `aibf-postgres-data`
- pgAdmin settings: Stored in named volume `aibf-pgadmin-data`
