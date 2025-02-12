print('Creating application database and user...');

// Switch to appdb database
db = db.getSiblingDB('appdb');

// Create application user
db.createUser({
    user: 'appuser',
    pwd: 'ASlobdQ3ji',
    roles: [
        { role: 'readWrite', db: 'appdb' },
        { role: 'dbAdmin', db: 'appdb' }
    ]
});

// Create collections
db.createCollection('documents');
db.createCollection('metadata');

// Create indexes
db.documents.createIndex({ "title": "text", "content": "text" });
db.metadata.createIndex({ "timestamp": 1 });

print('MongoDB initialization completed successfully');
