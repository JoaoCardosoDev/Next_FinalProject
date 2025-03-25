import { NextResponse } from 'next/server';
import { db } from '@/server/db';
import { auth } from '@/server/auth';

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { instagram, showInstagram } = await request.json();

    // Update user's Instagram link and visibility
    await db.user.update({
      where: { id: session.user.id },
      data: { 
        instagram,
        showInstagram 
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating Instagram settings:', error);
    return NextResponse.json(
      { error: 'Failed to update Instagram settings' },
      { status: 500 }
    );
  }
} 