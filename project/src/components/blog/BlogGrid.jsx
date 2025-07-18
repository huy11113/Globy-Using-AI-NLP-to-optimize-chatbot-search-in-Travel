import React from 'react';

const BlogGrid = ({ posts }) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-2xl font-semibold text-gray-500">
          😢 Không tìm thấy bài viết nào phù hợp.
        </p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
      {posts.map((post) => (
        <article
          key={post.id}
          className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group transform hover:-translate-y-2 transition-all duration-300"
        >
          <div className="relative">
            <img
              className="w-full h-56 object-cover"
              src={post.imageUrl}
              alt={post.title}
            />
            <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              {post.category}
            </div>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
              {post.title}
            </h3>
            <p className="text-gray-600 text-sm flex-grow">{post.excerpt}</p>
            <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
              <p>
                bởi <span className="font-semibold">{post.author}</span>
              </p>
              <p>{post.date}</p>
            </div>
            <a
              href="#"
              className="mt-6 inline-block text-center bg-gray-100 text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors duration-300"
            >
              Đọc thêm →
            </a>
          </div>
        </article>
      ))}
    </section>
  );
};

export default BlogGrid;
