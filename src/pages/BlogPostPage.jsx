import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();
      if (error) console.error('Error fetching post:', error);
      else setPost(data);
      setLoading(false);
    };

    const fetchRelated = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .neq('slug', slug)
        .limit(3);
      if (error) console.error('Error fetching related posts:', error);
      else setRelatedPosts(data || []);
    };

    fetchPost();
    fetchRelated();
  }, [slug]);

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

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-indigo-600 hover:text-indigo-700">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - Alpenrose Digital Solutions</title>
        <meta name="description" content={post.excerpt || post.content.substring(0, 160)} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || post.content.substring(0, 160)} />
        <meta property="og:image" content={post.image || '/src/assets/logo.png'} />
      </Helmet>

      <div className="page-container">
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeIn} className="mb-8">
              <Link
                to="/blog"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(post.date).toLocaleDateString()}
                <User className="h-4 w-4 ml-4 mr-1" />
                {post.author || 'Alpenrose Team'}
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold gradient-text mb-6">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="text-xl text-gray-600 mb-8">{post.excerpt}</p>
              )}
            </motion.div>

            <motion.div {...fadeIn} className="mb-12">
              <img
                src={post.image || '/src/assets/logo.png'}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-3xl shadow-lg"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              {...fadeIn}
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <motion.div {...fadeIn} className="flex items-center justify-between border-t pt-8">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
              <div className="text-sm text-gray-500">
                Published on {new Date(post.date).toLocaleDateString()}
              </div>
            </motion.div>
          </div>
        </section>

        {relatedPosts.length > 0 && (
          <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2 {...fadeIn} className="text-3xl font-bold text-center mb-12">
                Related Posts
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.article
                    key={relatedPost.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-3xl shadow-lg overflow-hidden hover-lift"
                  >
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={relatedPost.image || '/src/assets/logo.png'}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {relatedPost.title}
                      </h3>
                      <Link
                        to={`/blog/${relatedPost.slug}`}
                        className="text-indigo-600 hover:text-indigo-700 text-sm font-semibold"
                      >
                        Read More →
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default BlogPostPage;
