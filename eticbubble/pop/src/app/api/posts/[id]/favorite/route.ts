import { NextResponse } from 'next/server';
import { db } from '@/server/db';
import { auth } from '@/server/auth';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const postId = parseInt(id);
    if (isNaN(postId)) {
      return NextResponse.json(
        { error: 'Invalid post ID' },
        { status: 400 }
      );
    }

    // Check if the post exists
    const post = await db.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Check if already favorited
    const existingFavorite = await db.favorite.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId: postId,
        },
      },
    });

    if (existingFavorite) {
      // Remove favorite
      await db.favorite.delete({
        where: {
          userId_postId: {
            userId: session.user.id,
            postId: postId,
          },
        },
      });
      return NextResponse.json({ favorited: false });
    }

    // Check favorite limit
    const favoriteCount = await db.favorite.count({
      where: { userId: session.user.id },
    });

    if (favoriteCount >= 5) {
      return NextResponse.json(
        { error: 'Maximum number of favorites (5) reached' },
        { status: 400 }
      );
    }

    // Add favorite
    await db.favorite.create({
      data: {
        userId: session.user.id,
        postId: postId,
      },
    });

    return NextResponse.json({ favorited: true });
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return NextResponse.json(
      { error: 'Failed to toggle favorite' },
      { status: 500 }
    );
  }
} 