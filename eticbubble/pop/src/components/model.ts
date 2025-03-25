export interface User {
    id: string
    name: string | null
    email: string | null
}

export interface Favorite {
    id: number
    createdAt: Date
    userId: string
    postId: number
}

export interface Post {
    id: number
    title: string
    body: string
    published: boolean
    createdAt: Date
    updatedAt: Date
    createdBy: {
        name: string | null
        image: string | null
        instagram?: string | null
    }
    createdById: string
    favoritedBy: Favorite[]
    isFavorited?: boolean
    favoriteCount: number
}

export interface Comment {
    id: number
    owner: User
    post: Post
    body: string
    votes: number
}

export class PostPool {
    posts: Post[];

    constructor() {
        this.posts = []; 
    }

    async fetchPosts(): Promise<Post[]> { 
        try {
            const response = await fetch('/api/posts');
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            this.posts = data;
            return this.posts;
        } catch (error) {
            console.error('Error fetching posts:', error);
            return [];
        }
    }
}