import { NextResponse } from 'next/server';
import clientPromise from '@/utils/mongodb';
import { MongoClient } from 'mongodb';

export async function POST(request: Request) {
  let client: MongoClient | null = null;
  
  try {
    const { collectionName, document } = await request.json();
    
    if (!collectionName || !document) {
      return NextResponse.json(
        { error: 'Collection name and document are required' },
        { status: 400 }
      );
    }

    client = await clientPromise;
    const db = client.db("appdb");
    
    const result = await db.collection(collectionName).insertOne(document);
    
    return NextResponse.json({
      success: true,
      insertedId: result.insertedId,
      document: document
    });
  } catch (e: any) {
    console.error('MongoDB Error:', e);
    return NextResponse.json(
      { error: 'Failed to insert document', details: e?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  let client: MongoClient | null = null;
  
  try {
    console.log('Attempting to connect to MongoDB...');
    client = await clientPromise;
    console.log('Successfully connected to MongoDB');
    
    const db = client.db("appdb");
    console.log('Connected to database: appdb');
    
    // Get all collections
    console.log('Fetching collections...');
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);
    console.log('Found collections:', collectionNames);
    
    // Get first 10 documents from each collection
    console.log('Fetching documents from collections...');
    const result = await Promise.all(
      collectionNames.map(async (name) => {
        const docs = await db.collection(name).find({}).limit(10).toArray();
        console.log(`Found ${docs.length} documents in collection ${name}`);
        return {
          collection: name,
          documents: docs
        };
      })
    );
    
    console.log('Successfully fetched all data');
    return NextResponse.json(result);
  } catch (e: any) {
    console.error('MongoDB Error:', e);
    return NextResponse.json(
      { error: 'Failed to fetch MongoDB data', details: e?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
