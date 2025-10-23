import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('date', { ascending: false });
      if (error) console.error('Error fetching posts:', error);
      else setPosts(data || []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
    viewport: { once: true, amount: 0.2 }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Digital Marketing Blog Patna | Alpenrose Digital Solutions</title>
        <meta name="description" content="Digital marketing blog Patna - Stay updated with latest SEO, social media, and digital marketing trends, tips, and insights from Alpenrose Digital Solutions in Bihar." />
        <meta name="keywords" content="content marketing Patna, SEO content marketing Patna, digital marketing services Patna, best digital marketing agency Patna, marketing agency Bihar" />
        <meta property="og:title" content="Digital Marketing Blog Patna | Alpenrose Digital Solutions" />
        <meta property="og:description" content="Digital marketing blog Patna - Stay updated with latest SEO, social media, and digital marketing trends, tips, and insights from Alpenrose Digital Solutions in Bihar." />
        <meta property="og:image" content="/src/assets/logo.png" />
        <meta property="og:url" content="https://ards.in/blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Digital Marketing Blog Patna",
            "description": "Stay updated with the latest digital marketing trends, tips, and insights from Alpenrose Digital Solutions in Patna, Bihar.",
            "publisher": {
              "@type": "Organization",
              "name": "Alpenrose Digital Solutions",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Patna",
                "addressRegion": "Bihar",
                "addressCountry": "India"
              }
            }
          })}
        </script>
      </Helmet>

      <div className="page-container">
        <section className="hero-gradient py-24 text-white text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="space-y-6"
          >
            <h1 className="text-4xl lg:text-6xl font-extrabold">Our Blog</h1>
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
              Insights, trends, and expert advice on digital marketing and business growth.
            </p>
          </motion.div>
        </section>

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {posts.length === 0 ? (
              <motion.div {...fadeIn} className="text-center">
                <p className="text-lg text-gray-600">No blog posts available yet. Check back soon!</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="bg-white rounded-3xl shadow-lg overflow-hidden hover-lift group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image || '/src/assets/logo.png'}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.date).toLocaleDateString()}
                        <User className="h-4 w-4 ml-4 mr-1" />
                        {post.author || 'Alpenrose Team'}
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt || post.content.substring(0, 150) + '...'}
                      </p>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-semibold"
                      >
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogPage;
