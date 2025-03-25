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
            image: true,
            instagram: true,
            showInstagram: true
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
        image: post.createdBy.image,
        instagram: post.createdBy.instagram,
        showInstagram: post.createdBy.showInstagram
      },
      createdById: post.createdById,
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

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check post limit
    const postCount = await db.post.count({
      where: { createdById: session.user.id }
    });

    if (postCount >= 10) {
      return NextResponse.json(
        { error: 'Maximum number of posts (10) reached. Please delete an existing post first.' },
        { status: 400 }
      );
    }

    const data = await request.json();
    const post = await db.post.create({
      data: {
        title: data.title,
        body: data.body,
        createdBy: { connect: { id: session.user.id } },
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
} 