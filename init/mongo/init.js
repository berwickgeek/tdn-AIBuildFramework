print('Starting MongoDB initialization...');

try {
    // Switch to admin database first
    print('Creating admin user...');
    db = db.getSiblingDB('admin');
    db.createUser({
        user: 'admin',
        pwd: 'ASlobdQ3ji',
        roles: [{ role: 'root', db: 'admin' }],
        mechanisms: ['SCRAM-SHA-256']
    });
    print('Admin user created successfully');

    // Switch to appdb database
    print('Creating application database and user...');
    db = db.getSiblingDB('appdb');
    db.createUser({
        user: 'appuser',
        pwd: 'ASlobdQ3ji',
        roles: [
            { role: 'readWrite', db: 'appdb' },
            { role: 'dbAdmin', db: 'appdb' }
        ],
        mechanisms: ['SCRAM-SHA-256']
    });

    // Create collections
    print('Creating collections...');
    db.createCollection('documents');
    db.createCollection('metadata');

    // Create indexes
    print('Creating indexes...');
    db.documents.createIndex({ "title": "text", "content": "text" });
    db.metadata.createIndex({ "timestamp": 1 });

    print('MongoDB initialization completed successfully');
} catch (error) {
    print('Error during MongoDB initialization:');
    printjson(error);
    throw error;
}
