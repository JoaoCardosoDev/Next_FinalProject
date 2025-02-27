export interface User {
    id: number
    name: string
    email: string
}

export interface Post {
    id: number
    // owner: User
    title: string
    body: string
    up: number
    down: number
    score: number
    // comments: Comment[]
}

export interface Comment {
    id: number
    owner: User
    post: Post
    body: string
    votes: number
}

export class PostPool {
    posts:[];

    constructor() {
        this.posts = []; 
    }

    async fetchPosts(): Promise<[]> { 
            const response = await fetch('https://dummyjson.com/posts');
            const data = await response.json();

            this.posts = data.posts.map((post: any) => ({
                id: post.id,
                title: post.title,
                body: post.body,
                up: post.reactions.likes,
                down: post.reactions.dislikes,
                score: (post.reactions.likes - post.reactions.dislikes)
            }));

            this.posts.sort((a, b) => b.score - a.score);

            return this.posts; 
    }
}