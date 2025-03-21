import { NextResponse } from 'next/server';
import { db } from '@/server/db';
import { auth } from '@/server/auth';

export async function GET() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    const posts = await db.post.findMany({
      include: {
        createdBy: {
          select: {
            name: true,
          },
        },
        favoritedBy: {
          select: {
            userId: true,
          },
        },
      },
      orderBy: [
        {
          favoritedBy: {
            _count: 'desc'
          }
        },
        {
          createdAt: 'desc'
        }
      ],
    });

    const transformedPosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      body: post.body,
      published: post.published,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      createdBy: {
        name: post.createdBy.name,
      },
      favoriteCount: post.favoritedBy.length,
      isFavorited: userId ? post.favoritedBy.some(fav => fav.userId === userId) : false,
    }));

    return NextResponse.json(transformedPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
} 