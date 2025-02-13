# AI Build Framework

A development toolkit for building AI applications with integrated services.

## Overview

This framework provides a complete development environment for building AI-powered web applications. Here's how the services work together:

### Core Application

- A Next.js application provides the frontend interface and API routes
- Built with Refine Framework for rapid development of admin interfaces
- Protected by Keycloak authentication for secure access control

### AI and Data Processing

- **Flowise** serves as the AI workflow builder, allowing you to:
  - Create visual AI workflows without coding
  - Connect to various AI models and APIs
  - Generate and expose API endpoints for your AI flows
  - Store and process data using the integrated databases

### Data Storage

- **PostgreSQL with pgvector** handles vector storage and similarity search:

  - Stores embeddings for AI models
  - Enables semantic search capabilities
  - Provides fast vector similarity operations
  - Persists structured application data

- **MongoDB** manages document storage:
  - Stores unstructured data and documents
  - Handles metadata and relationships
  - Provides flexible schema for varying data types

### Administration & Monitoring

- **Keycloak** manages authentication and authorization:

  - Centralized user management
  - Role-based access control
  - OAuth2/OpenID Connect protocols
  - Single sign-on capabilities

- **pgAdmin & Mongo Express** provide database management:
  - Visual interfaces for database operations
  - Data browsing and querying
  - Schema management
  - Performance monitoring

All services are containerized and connected through a Docker network, enabling seamless communication while maintaining isolation and security.

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
    Database: postgres
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
- **Connection Strings**:
  - Admin: `mongodb://admin:ASlobdQ3ji@localhost:27017/?authSource=admin`

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
  - Database: postgres
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

### Keycloak (Authentication)

- **Port**: 8080
- **Access**: http://localhost:8080
- **Admin Credentials**:
  - Username: admin
  - Password: ASlobdQ3ji

#### Initial Setup

1. Create Realm

   - Log into Keycloak admin console
   - Click "Create Realm"
   - Set Name to "tdnportal"
   - Save

2. Create Client

   - In the tdnportal realm, go to Clients → Create client
   - Set Client ID to "tdnportal-client"
   - Set Client type to "OpenID Connect"
   - Enable "Client authentication" and "Authorization"
   - Configure Valid redirect URIs:
     - http://localhost:3000/\*
     - http://localhost:3000/api/auth/callback/keycloak
   - Set Valid post logout redirect URIs to: http://localhost:3000
   - Set Web origins to: http://localhost:3000

3. Configure Client Scopes

   - Go to Client scopes
   - Click on "tdnportal-client-dedicated"
   - Add Mappers:
     - email
     - profile
     - realm roles
     - groups

4. Create Test User

   - Go to Users → Add user
   - Set Username and Email
   - Enable "Email verified"
   - Set password (disable "Temporary")

5. Optional: Create Roles

   - Go to Realm roles
   - Create roles (e.g., "admin", "user")
   - Assign roles to users

6. Client Secret
   - Go to Clients → tdnportal-client → Credentials
   - Copy Client secret
   - Update KEYCLOAK_CLIENT_SECRET in .env.local

## Getting Started

1. Start all services:

```bash
docker compose up -d
```

2. Access the web interfaces:

   - Flowise: http://localhost:3002
   - Mongo Express: http://localhost:8081
   - pgAdmin: http://localhost:5050
   - Keycloak: http://localhost:8080

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
