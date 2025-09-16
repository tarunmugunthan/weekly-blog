import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { getStrapiMedia } from '../lib/api';

export default function BlogCard({ blog, featured = false }) {
  const {
    attributes: {
      title,
      slug,
      excerpt,
      featured_image,
      published_at,
      reading_time,
      category,
      author,
    },
  } = blog;

  const imageUrl = getStrapiMedia(featured_image);
  const categoryData = category?.data?.attributes;
  const authorData = author?.data?.attributes;

  const cardClasses = featured
    ? "card card-hover lg:flex lg:items-center lg:space-x-8"
    : "card card-hover";

  const imageClasses = featured
    ? "lg:w-1/2 h-64 lg:h-80"
    : "h-48";

  const contentClasses = featured
    ? "p-6 lg:w-1/2"
    : "p-6";

  return (
    <article className={cardClasses}>
      {/* Image */}
      <div className={`relative ${imageClasses} overflow-hidden`}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-purple-100 flex items-center justify-center">
            <svg className="w-12 h-12 text-primary-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        )}

        {/* Category Badge */}
        {categoryData && (
          <div className="absolute top-4 left-4">
            <Link
              href={`/category/${categoryData.slug}`}
              className="inline-block px-3 py-1 text-xs font-semibold text-white bg-primary-600 rounded-full hover:bg-primary-700 transition-colors"
            >
              {categoryData.name}
            </Link>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={contentClasses}>
        {/* Meta Information */}
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <time dateTime={published_at}>
            {format(new Date(published_at), 'MMMM dd, yyyy')}
          </time>
          {reading_time && (
            <>
              <span className="mx-2">•</span>
              <span>{reading_time} min read</span>
            </>
          )}
          {authorData && (
            <>
              <span className="mx-2">•</span>
              <span>By {authorData.username}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h2 className={`font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors ${featured ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
          <Link href={`/blog/${slug}`}>
            {title}
          </Link>
        </h2>

        {/* Excerpt */}
        {excerpt && (
          <p className={`text-gray-600 mb-4 line-clamp-3 ${featured ? 'text-lg' : ''}`}>
            {excerpt}
          </p>
        )}

        {/* Read More Link */}
        <Link
          href={`/blog/${slug}`}
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold transition-colors group"
        >
          Read More
          <svg
            className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

// Utility component for loading skeleton
export function BlogCardSkeleton({ featured = false }) {
  const cardClasses = featured
    ? "card lg:flex lg:items-center lg:space-x-8 animate-pulse"
    : "card animate-pulse";

  const imageClasses = featured
    ? "lg:w-1/2 h-64 lg:h-80"
    : "h-48";

  const contentClasses = featured
    ? "p-6 lg:w-1/2"
    : "p-6";

  return (
    <div className={cardClasses}>
      <div className={`${imageClasses} bg-gray-200`}></div>
      <div className={contentClasses}>
        <div className="flex items-center mb-3 space-x-2">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        <div className={`h-6 bg-gray-200 rounded mb-3 ${featured ? 'lg:h-8' : ''}`}></div>
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
  );
}