'use client'

import React, { useEffect, useState } from 'react';
import { PostPool } from './model';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";

export default function Pool() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const pool = new PostPool();
        pool.fetchPosts().then(fetchPosts => {
            setPosts(fetchPosts);
        });
    }, []);

    return (
        <div className='flex p-32'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {posts.map((post, index) => (
                    <div key={index}  className='min-w-12'>
                        <Card>
                            <CardHeader>
                                <CardTitle>{post.title}</CardTitle>
                                <CardDescription>Username here PH</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>{post.body}</p>
                            </CardContent>
                            <CardFooter>
                                <p>Up: {post.up}</p>
                                <p>Down: {post.down}</p>
                                <p>Score: {post.score}</p>
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}