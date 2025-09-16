import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import Layout from '../../components/Layout';
import { blogAPI, getStrapiMedia } from '../../lib/api';

export default function BlogPost({ blog }) {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed initially until getStaticProps() finishes running
  if (router.isFallback) {
    return (
      <Layout title="Loading...">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-6 w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!blog) {
    return (
      <Layout title="Post Not Found">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-8">
              Sorry, we couldn't find the blog post you're looking for.
            </p>
            <Link href="/" className="btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const {
    title,
    content,
    excerpt,
    featured_image,
    gallery,
    published_at,
    reading_time,
    category,
    tags,
    author,
    meta_title,
    meta_description,
  } = blog.attributes;

  const imageUrl = getStrapiMedia(featured_image);
  const categoryData = category?.data?.attributes;
  const tagsData = tags?.data || [];
  const authorData = author?.data?.attributes;
  const galleryData = gallery?.data || [];

  return (
    <Layout
      title={meta_title || title}
      description={meta_description || excerpt || `Read ${title} on Weekly Blog`}
    >
      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-600">
              Home
            </Link>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <Link href="/blog" className="hover:text-primary-600">
              Blog
            </Link>
            {categoryData && (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <Link href={`/category/${categoryData.slug}`} className="hover:text-primary-600">
                  {categoryData.name}
                </Link>
              </>
            )}
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-900">{title}</span>
          </div>
        </div>
      </nav>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-8">
          {/* Category Badge */}
          {categoryData && (
            <Link
              href={`/category/${categoryData.slug}`}
              className="inline-block px-3 py-1 text-sm font-semibold text-primary-600 bg-primary-50 rounded-full hover:bg-primary-100 transition-colors mb-4"
            >
              {categoryData.name}
            </Link>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center text-gray-500 text-sm space-x-4 mb-6">
            <time dateTime={published_at} className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {format(new Date(published_at), 'MMMM dd, yyyy')}
            </time>

            {reading_time && (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {reading_time} min read
              </span>
            )}

            {authorData && (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                By {authorData.username}
              </span>
            )}
          </div>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {excerpt}
            </p>
          )}
        </header>

        {/* Featured Image */}
        {imageUrl && (
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg prose-primary max-w-none mb-12">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Customize how different elements are rendered
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary-500 pl-6 py-4 bg-primary-50 rounded-r-lg my-6">
                  <div className="text-gray-700 italic">{children}</div>
                </blockquote>
              ),
              code: ({ inline, children }) =>
                inline ? (
                  <code className="bg-gray-100 text-primary-600 px-2 py-1 rounded text-sm font-mono">
                    {children}
                  </code>
                ) : (
                  <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    {children}
                  </code>
                ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {/* Gallery */}
        {galleryData.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryData.map((media) => {
                const mediaUrl = getStrapiMedia(media);
                if (!mediaUrl) return null;

                return (
                  <div key={media.id} className="relative aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={mediaUrl}
                      alt={media.attributes.alternativeText || title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tags */}
        {tagsData.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tagsData.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/tag/${tag.attributes.slug}`}
                  className="inline-block px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors"
                >
                  #{tag.attributes.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Author Info */}
        {authorData && (
          <div className="border-t border-gray-200 pt-8 mb-12">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-lg">
                    {authorData.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  {authorData.username}
                </h4>
                <p className="text-gray-600">Author</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex justify-between items-center">
            <Link
              href="/blog"
              className="flex items-center text-primary-600 hover:text-primary-700 font-semibold transition-colors group"
            >
              <svg
                className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Back to Blog
            </Link>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: title,
                      text: excerpt,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    // You could show a toast notification here
                    alert('Link copied to clipboard!');
                  }
                }}
                className="text-gray-500 hover:text-primary-600 transition-colors"
                title="Share this post"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    // Get all blog posts to generate paths
    const response = await blogAPI.getBlogs(1, 100, []);
    const blogs = response.data || [];

    // Generate paths for all blog posts
    const paths = blogs.map((blog) => ({
      params: { slug: blog.attributes.slug },
    }));

    return {
      paths,
      fallback: true, // Enable ISR for new posts
    };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return {
      paths: [],
      fallback: true,
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const blog = await blogAPI.getBlogBySlug(params.slug);

    if (!blog) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        blog,
      },
      revalidate: 60, // Regenerate the page at most once per minute
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      notFound: true,
    };
  }
}