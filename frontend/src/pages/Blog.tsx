import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';
import SocialShare from '@/components/SocialShare';
import { LazyImage } from '@/components/LazyImage';
import { config } from '@/lib/config';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [postsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${config.api.baseUrl}/api/blog`);
      const data = await response.json();
      const allPosts = data.length > 0 ? data : [
        {
          id: 1,
          title: "5 Signs Your Printer Needs Professional Repair",
          excerpt: "Don't wait until it's too late. Learn the warning signs that indicate your printer needs expert attention.",
          category: "Printer Repair",
          created_at: "2024-01-15",
          author: "Alex Kinyua",
          image_url: "/placeholder.svg"
        },
        {
          id: 2,
          title: "WiFi Installation Best Practices for Small Businesses",
          excerpt: "Ensure your business network is secure, fast, and reliable with these professional installation tips.",
          category: "Networking",
          created_at: "2024-01-10",
          author: "Alex Kinyua",
          image_url: "/placeholder.svg"
        },
        {
          id: 3,
          title: "Original vs Compatible Toner: What's the Difference?",
          excerpt: "Understanding the pros and cons of original and compatible toner cartridges for your business.",
          category: "Supplies",
          created_at: "2024-01-05",
          author: "Alex Kinyua",
          image_url: "/placeholder.svg"
        }
      ];
      setPosts(allPosts);
      setDisplayedPosts(allPosts.slice(0, postsPerPage));
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
      setPosts([]);
      setDisplayedPosts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead 
        title="Tech Blog | QuantumBit Systems - Expert IT Insights"
        description="Expert tech insights, tips, and industry updates. Learn about web development, networking, printer maintenance, and IT solutions from QuantumBit Systems."
        keywords="tech blog, IT insights, web development tips, networking guides, printer maintenance, technology updates, Nairobi tech"
      />
      <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Tech Insights</Badge>
          <h1 className="text-4xl md:text-6xl font-orbitron font-black mb-6">
            <span className="bg-gradient-quantum bg-clip-text text-transparent">Tech</span>
            <br />
            <span className="text-foreground">Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground font-exo max-w-3xl mx-auto">
            Expert insights, tips, and industry updates from QuantumBit Systems
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-quantum-card border border-quantum-border rounded-lg p-6 animate-pulse">
                <div className="aspect-video bg-muted rounded mb-4"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-6 bg-muted rounded mb-3"></div>
                <div className="h-16 bg-muted rounded mb-4"></div>
                <div className="flex justify-between">
                  <div className="h-4 bg-muted rounded w-20"></div>
                  <div className="h-4 bg-muted rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedPosts.map((post) => (
            <Card key={post.id} className="bg-quantum-card border-quantum-border overflow-hidden hover:shadow-glow transition-all duration-300 group">
              <div className="aspect-video bg-muted">
                <LazyImage 
                  src={post.image_url || post.image || '/placeholder.svg'} 
                  alt={post.title}
                  className="w-full h-full"
                />
              </div>
              <div className="p-6">
                <Badge variant="secondary" className="mb-3">{post.category}</Badge>
                <h3 className="font-orbitron font-bold text-lg mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground font-exo text-sm mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.created_at || post.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="sm" className="p-0 h-auto" asChild>
                    <a href={`/blog/${post.id}`}>
                      Read More <ArrowRight className="w-3 h-3 ml-1" />
                    </a>
                  </Button>
                  <SocialShare 
                    title={post.title}
                    description={post.excerpt}
                  />
                </div>
              </div>
            </Card>
            ))}
          </div>
        )}

        {displayedPosts.length < posts.length && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => {
                const nextPage = currentPage + 1;
                const newDisplayedPosts = posts.slice(0, nextPage * postsPerPage);
                setDisplayedPosts(newDisplayedPosts);
                setCurrentPage(nextPage);
              }}
            >
              Load More Articles
            </Button>
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default Blog;