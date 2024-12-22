import { secretStore } from '@/lib/store';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  console.log("POST /api/secrets received");
  try {
    const body = await req.json();
    console.log("Request body received", { hasData: !!body.encryptedData });
    
    const id = crypto.randomBytes(16).toString('hex');
    console.log("Generated ID:", id);
    
    secretStore.store(id, body.encryptedData);
    console.log("Secret stored successfully");
    
    return NextResponse.json({ id });
  } catch (error) {
    console.error('Error storing secret:', error);
    return NextResponse.json(
      { error: 'Failed to store secret' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  console.log("GET /api/secrets received for id:", id);
  
  if (!id) {
    return NextResponse.json(
      { error: 'No ID provided' },
      { status: 400 }
    );
  }

  const secret = secretStore.retrieve(id);
  console.log("Secret retrieval attempt:", id, secret ? "found" : "not found");
  
  if (!secret) {
    return NextResponse.json(
      { error: 'Secret not found or already viewed' },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: secret.encryptedData });
}