import axios from 'axios';

const API_URL = process.env.STRAPI_API_URL || 'http://localhost:1337';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to construct image URLs
export const getStrapiURL = (path = '') => {
  return `${API_URL}${path}`;
};

// Helper function to get media URL
export const getStrapiMedia = (media) => {
  if (!media) return null;

  const { url } = media.data ? media.data.attributes : media.attributes;
  const imageUrl = url.startsWith('/') ? getStrapiURL(url) : url;
  return imageUrl;
};

// Blog API functions
export const blogAPI = {
  // Get all blogs with pagination
  async getBlogs(page = 1, pageSize = 10, populate = []) {
    try {
      const populateQuery = populate.length > 0 ? `&populate=${populate.join(',')}` : '';
      const response = await api.get(
        `/blogs?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=published_at:desc${populateQuery}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  },

  // Get featured blogs
  async getFeaturedBlogs(limit = 3) {
    try {
      const response = await api.get(
        `/blogs?filters[is_featured][$eq]=true&pagination[pageSize]=${limit}&sort=published_at:desc&populate=featured_image,category,author`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching featured blogs:', error);
      throw error;
    }
  },

  // Get single blog by slug
  async getBlogBySlug(slug) {
    try {
      const response = await api.get(
        `/blogs?filters[slug][$eq]=${slug}&populate=featured_image,gallery,category,tags,author`
      );
      return response.data.data[0] || null;
    } catch (error) {
      console.error('Error fetching blog by slug:', error);
      throw error;
    }
  },

  // Get blogs by category
  async getBlogsByCategory(categorySlug, page = 1, pageSize = 10) {
    try {
      const response = await api.get(
        `/blogs?filters[category][slug][$eq]=${categorySlug}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=published_at:desc&populate=featured_image,category,author`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching blogs by category:', error);
      throw error;
    }
  },

  // Search blogs
  async searchBlogs(query, page = 1, pageSize = 10) {
    try {
      const response = await api.get(
        `/blogs?filters[$or][0][title][$containsi]=${query}&filters[$or][1][excerpt][$containsi]=${query}&filters[$or][2][content][$containsi]=${query}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=published_at:desc&populate=featured_image,category,author`
      );
      return response.data;
    } catch (error) {
      console.error('Error searching blogs:', error);
      throw error;
    }
  },
};

// Category API functions
export const categoryAPI = {
  async getCategories() {
    try {
      const response = await api.get('/categories?sort=name:asc');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  async getCategoryBySlug(slug) {
    try {
      const response = await api.get(`/categories?filters[slug][$eq]=${slug}`);
      return response.data.data[0] || null;
    } catch (error) {
      console.error('Error fetching category by slug:', error);
      throw error;
    }
  },
};

// Tag API functions
export const tagAPI = {
  async getTags() {
    try {
      const response = await api.get('/tags?sort=name:asc');
      return response.data;
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  },
};

export default api;