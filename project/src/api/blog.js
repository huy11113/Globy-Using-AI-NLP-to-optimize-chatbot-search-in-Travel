const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const fetchApi = async (endpoint) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api${endpoint}`);
        if (!response.ok) throw new Error("Network response was not ok");
        return await response.json();
    } catch (error) {
        return { success: false, message: error.message, data: [] };
    }
};

export const getAllPosts = () => fetchApi('/blog');
export const getPostById = (id) => fetchApi(`/blog/${id}`);