import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import BlogCard, { BlogCardSkeleton } from '../components/BlogCard';
import Link from 'next/link';
import { blogAPI, categoryAPI } from '../lib/api';

export default function Home({ initialFeaturedBlogs, initialRecentBlogs, categories }) {
  const [featuredBlogs, setFeaturedBlogs] = useState(initialFeaturedBlogs || []);
  const [recentBlogs, setRecentBlogs] = useState(initialRecentBlogs || []);
  const [loading, setLoading] = useState(!initialFeaturedBlogs && !initialRecentBlogs);

  useEffect(() => {
    if (!initialFeaturedBlogs && !initialRecentBlogs) {
      const fetchData = async () => {
        try {
          const [featuredResponse, recentResponse] = await Promise.all([
            blogAPI.getFeaturedBlogs(3),
            blogAPI.getBlogs(1, 6, ['featured_image', 'category', 'author']),
          ]);

          setFeaturedBlogs(featuredResponse.data || []);
          setRecentBlogs(recentResponse.data || []);
        } catch (error) {
          console.error('Error fetching homepage data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [initialFeaturedBlogs, initialRecentBlogs]);

  return (
    <Layout
      title="Weekly Blog - Amazing Content Every Week"
      description="Discover amazing content, insights, and stories on our weekly blog. Stay updated with the latest trends and tutorials."
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to{' '}
              <span className="text-gradient">Weekly Blog</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover amazing content, insights, and stories. Join thousands of readers who get inspired every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blog" className="btn-primary text-lg px-8 py-3">
                Explore All Posts
              </Link>
              <a
                href="/admin"
                className="btn-secondary text-lg px-8 py-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                Admin Dashboard
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      {(featuredBlogs.length > 0 || loading) && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Stories
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our most popular and impactful content, handpicked just for you.
              </p>
            </div>

            <div className="space-y-8">
              {loading ? (
                // Loading skeletons
                Array.from({ length: 3 }).map((_, index) => (
                  <BlogCardSkeleton key={index} featured={true} />
                ))
              ) : (
                featuredBlogs.map((blog, index) => (
                  <BlogCard key={blog.id} blog={blog} featured={true} />
                ))
              )}
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Recent Posts
              </h2>
              <p className="text-lg text-gray-600">
                Fresh content to keep you informed and inspired.
              </p>
            </div>
            <Link href="/blog" className="btn-primary hidden sm:inline-flex">
              View All Posts
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Loading skeletons
              Array.from({ length: 6 }).map((_, index) => (
                <BlogCardSkeleton key={index} />
              ))
            ) : recentBlogs.length > 0 ? (
              recentBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="max-w-md mx-auto">
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
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No posts yet</h3>
                  <p className="mt-2 text-gray-500">
                    Get started by creating your first blog post in the admin dashboard.
                  </p>
                  <div className="mt-6">
                    <a
                      href="/admin"
                      className="btn-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Go to Admin
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {recentBlogs.length > 0 && (
            <div className="text-center mt-12 sm:hidden">
              <Link href="/blog" className="btn-primary">
                View All Posts
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      {categories && categories.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Explore Categories
              </h2>
              <p className="text-lg text-gray-600">
                Find content that matches your interests.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category) => {
                const { name, slug, color, description } = category.attributes;
                return (
                  <Link
                    key={category.id}
                    href={`/category/${slug}`}
                    className="group card card-hover p-6 text-center"
                  >
                    <div
                      className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                      style={{ backgroundColor: color || '#3B82F6' }}
                    >
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {name}
                    </h3>
                    {description && (
                      <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Writing?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Access the powerful CMS to create, edit, and manage your blog content with ease.
          </p>
          <a
            href="/admin"
            className="bg-white text-primary-600 hover:bg-gray-50 font-semibold py-3 px-8 rounded-lg transition-colors inline-flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Admin Dashboard
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </section>
    </Layout>
  );
}

// This function runs on the server at build time (SSG) or on each request (SSR)
export async function getStaticProps() {
  try {
    // Fetch data in parallel for better performance
    const [featuredResponse, recentResponse, categoriesResponse] = await Promise.allSettled([
      blogAPI.getFeaturedBlogs(3),
      blogAPI.getBlogs(1, 6, ['featured_image', 'category', 'author']),
      categoryAPI.getCategories(),
    ]);

    return {
      props: {
        initialFeaturedBlogs: featuredResponse.status === 'fulfilled' ? featuredResponse.value.data : null,
        initialRecentBlogs: recentResponse.status === 'fulfilled' ? recentResponse.value.data : null,
        categories: categoriesResponse.status === 'fulfilled' ? categoriesResponse.value.data : null,
      },
      revalidate: 60, // Regenerate page at most once per minute
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        initialFeaturedBlogs: null,
        initialRecentBlogs: null,
        categories: null,
      },
      revalidate: 60,
    };
  }
}