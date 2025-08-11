import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft, Share2, ChevronDown } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';
import { LazyImage } from '@/components/LazyImage';
import { config } from '@/lib/config';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`${config.api.baseUrl}/api/blog/${id}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
      } else {
        navigate('/blog');
      }
    } catch (error) {
      console.error('Failed to fetch blog post:', error);
      navigate('/blog');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto animate-pulse">
            <div className="h-8 bg-muted rounded mb-4"></div>
            <div className="h-12 bg-muted rounded mb-6"></div>
            <div className="aspect-video bg-muted rounded mb-8"></div>
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-4 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <>
      <SEOHead 
        title={`${post.title} | QuantumBit Systems Blog`}
        description={post.excerpt}
        keywords={`${post.category}, tech blog, ${post.title}`}
      />
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/blog')}
              className="mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>

            <article>
              <header className="mb-8">
                <Badge variant="secondary" className="mb-4">{post.category}</Badge>
                <h1 className="text-3xl md:text-5xl font-orbitron font-bold mb-6 text-foreground">
                  {post.title}
                </h1>
                <div className="flex items-center gap-6 text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.created_at).toLocaleDateString()}
                  </div>
                </div>
                {post.image_url && (
                  <div className="aspect-video mb-8">
                    <LazyImage 
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full rounded-lg"
                    />
                  </div>
                )}
              </header>

              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-wrap font-exo text-foreground leading-relaxed">
                  {post.content}
                </div>
              </div>

              <footer className="mt-12 pt-8 border-t border-quantum-border">
                <div className="flex items-center justify-between">
                  <Button variant="outline" onClick={() => navigate('/blog')}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    More Articles
                  </Button>
                  <div className="relative">
                    <Button 
                      variant="ghost"
                      onClick={() => setShowShareMenu(!showShareMenu)}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                    {showShareMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-quantum-card border border-quantum-border rounded-lg shadow-lg z-10">
                        <div className="py-2">
                          <button 
                            className="w-full px-4 py-2 text-left hover:bg-background transition-colors"
                            onClick={() => {
                              const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`;
                              window.open(url, '_blank');
                              setShowShareMenu(false);
                            }}
                          >
                            Share on Twitter
                          </button>
                          <button 
                            className="w-full px-4 py-2 text-left hover:bg-background transition-colors"
                            onClick={() => {
                              const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
                              window.open(url, '_blank');
                              setShowShareMenu(false);
                            }}
                          >
                            Share on Facebook
                          </button>
                          <button 
                            className="w-full px-4 py-2 text-left hover:bg-background transition-colors"
                            onClick={() => {
                              const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
                              window.open(url, '_blank');
                              setShowShareMenu(false);
                            }}
                          >
                            Share on LinkedIn
                          </button>
                          <button 
                            className="w-full px-4 py-2 text-left hover:bg-background transition-colors"
                            onClick={() => {
                              const url = `https://wa.me/?text=${encodeURIComponent(post.title + ' ' + window.location.href)}`;
                              window.open(url, '_blank');
                              setShowShareMenu(false);
                            }}
                          >
                            Share on WhatsApp
                          </button>
                          <button 
                            className="w-full px-4 py-2 text-left hover:bg-background transition-colors"
                            onClick={() => {
                              navigator.clipboard.writeText(window.location.href);
                              alert('Link copied!');
                              setShowShareMenu(false);
                            }}
                          >
                            Copy Link
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </footer>
            </article>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;