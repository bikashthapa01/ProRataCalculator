"use client";

import { useEffect, useState } from 'react';
import { BlogService } from '@/lib/services/blog-service';

export default function BlogTestPage() {
  const [categories, setCategories] = useState<any>(null);
  const [posts, setPosts] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testQueries = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Testing GraphQL queries...');
        
        const [categoriesData, postsData] = await Promise.all([
          BlogService.getCategories(),
          BlogService.getBlogPosts(5),
        ]);
        
        console.log('Categories data:', categoriesData);
        console.log('Posts data:', postsData);
        
        setCategories(categoriesData);
        setPosts(postsData);
      } catch (error) {
        console.error('Error testing queries:', error);
        setError(error instanceof Error ? error.message : 'Failed to test queries');
      } finally {
        setLoading(false);
      }
    };

    testQueries();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Testing GraphQL Queries...</h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Error Testing Queries</h1>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">GraphQL Query Test Results</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Categories */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(categories, null, 2)}
            </pre>
          </div>
          
          {/* Posts */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Posts</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(posts, null, 2)}
            </pre>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <a 
            href="/blog"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Blog
          </a>
        </div>
      </div>
    </div>
  );
}
