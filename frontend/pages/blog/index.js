import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import BlogCard, { BlogCardSkeleton } from '../../components/BlogCard';
import Link from 'next/link';
import { blogAPI, categoryAPI } from '../../lib/api';

export default function BlogIndex({ initialBlogs, initialCategories, pagination: initialPagination }) {
  const router = useRouter();
  const [blogs, setBlogs] = useState(initialBlogs || []);
  const [categories, setCategories] = useState(initialCategories || []);
  const [pagination, setPagination] = useState(initialPagination || {});
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { page = 1, category: selectedCategory, search } = router.query;

  useEffect(() => {
    if (search && search !== searchQuery) {
      setSearchQuery(search);
    }
  }, [search]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    router.push({
      pathname: '/blog',
      query: { search: searchQuery, page: 1 },
    });
  };

  const handleCategoryFilter = (categorySlug) => {
    router.push({
      pathname: '/blog',
      query: categorySlug ? { category: categorySlug, page: 1 } : { page: 1 },
    });
  };

  const handlePageChange = (newPage) => {
    const query = { page: newPage };
    if (selectedCategory) query.category = selectedCategory;
    if (search) query.search = search;

    router.push({ pathname: '/blog', query });
  };

  return (
    <Layout
      title={`Blog${selectedCategory ? ` - ${selectedCategory}` : ''}${search ? ` - Search: ${search}` : ''} | Weekly Blog`}
      description="Explore all our blog posts, tutorials, and insights. Find content by category or search for specific topics."
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-50 to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {search ? `Search Results for "${search}"` : selectedCategory ? `Category: ${selectedCategory}` : 'All Blog Posts'}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {search ? `Found ${pagination.total || 0} posts` : 'Discover amazing content and insights'}
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-md mx-auto">
              <div className="flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search blog posts..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <button
                  type="submit"
                  className="btn-primary rounded-l-none px-6"
                  disabled={loading}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Filters */}
      {categories && categories.length > 0 && (
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-gray-700">Categories:</span>
              <button
                onClick={() => handleCategoryFilter(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !selectedCategory
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryFilter(category.attributes.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.attributes.slug
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.attributes.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Blog Posts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))}
          </div>
        ) : blogs && blogs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.pageCount > 1 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center space-x-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                    className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: Math.min(5, pagination.pageCount) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(pagination.page - 2 + i, pagination.pageCount - 4 + i + 1));
                    if (pageNum > pagination.pageCount) return null;

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-4 py-2 text-sm font-medium border rounded-md ${
                          pagination.page === pageNum
                            ? 'text-primary-600 bg-primary-50 border-primary-500'
                            : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page >= pagination.pageCount}
                    className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              {search ? 'No posts found' : 'No posts available'}
            </h3>
            <p className="mt-2 text-gray-500">
              {search
                ? `Try adjusting your search terms or browse all posts.`
                : `Get started by creating your first blog post in the admin dashboard.`
              }
            </p>
            <div className="mt-6 space-x-4">
              {search ? (
                <Link href="/blog" className="btn-primary">
                  Browse All Posts
                </Link>
              ) : (
                <a
                  href="/admin"
                  className="btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Go to Admin
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  try {
    const { page = 1, category, search } = query;
    const pageSize = 12;

    let blogsResponse;
    let categoriesResponse;

    // Fetch blogs based on query parameters
    if (search) {
      blogsResponse = await blogAPI.searchBlogs(search, parseInt(page), pageSize);
    } else if (category) {
      blogsResponse = await blogAPI.getBlogsByCategory(category, parseInt(page), pageSize);
    } else {
      blogsResponse = await blogAPI.getBlogs(parseInt(page), pageSize, ['featured_image', 'category', 'author']);
    }

    // Fetch categories for filter
    categoriesResponse = await categoryAPI.getCategories();

    return {
      props: {
        initialBlogs: blogsResponse.data || [],
        initialCategories: categoriesResponse.data || [],
        pagination: blogsResponse.meta?.pagination || {},
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        initialBlogs: [],
        initialCategories: [],
        pagination: {},
      },
    };
  }
}