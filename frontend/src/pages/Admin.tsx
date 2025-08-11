import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api, type Product } from "@/lib/api";
import { config } from "@/lib/config";
import Loading from "@/components/Loading";
import AdminAuth from "@/components/AdminAuth";
import OrderStatus from "@/components/OrderStatus";
import { Package, ShoppingCart, Users, TrendingUp } from "lucide-react";

interface Order {
  id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  brand: string;
  model: string;
  quantity: number;
  total_amount: number;
  status: string;
  created_at: string;
}

interface Testimonial {
  id: number;
  customer_name: string;
  customer_email: string;
  company: string;
  rating: number;
  message: string;
  status: string;
  created_at: string;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [projects, setProjects] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingBlogPost, setEditingBlogPost] = useState(null);
  const [socialLinks, setSocialLinks] = useState({
    facebook: 'https://facebook.com/quantumbitsystems',
    twitter: 'https://twitter.com/quantumbitsys',
    linkedin: 'https://linkedin.com/company/quantumbit-systems',
    instagram: 'https://instagram.com/quantumbitsystems'
  });
  const formRef = useRef<HTMLFormElement>(null);
  const projectFormRef = useRef<HTMLFormElement>(null);
  const blogFormRef = useRef<HTMLFormElement>(null);
  const socialFormRef = useRef<HTMLFormElement>(null);

  const loadData = async () => {
    try {
      const headers = { 'Authorization': `Bearer ${config.api.adminToken}` };
      const [productsData, ordersData, testimonialsData, projectsData, subscribersData, blogData] = await Promise.all([
        api.getProducts(),
        fetch(`${config.api.baseUrl}/api/orders`, { headers }).then(r => r.json()),
        fetch(`${config.api.baseUrl}/api/admin/testimonials`, { headers }).then(r => r.json()),
        fetch(`${config.api.baseUrl}/api/projects`).then(r => r.json()),
        fetch(`${config.api.baseUrl}/api/admin/subscribers`, { headers }).then(r => r.json()),
        fetch(`${config.api.baseUrl}/api/admin/blog`, { headers }).then(r => r.json()),
        fetch(`${config.api.baseUrl}/api/admin/settings`, { headers }).then(r => r.json()).catch(() => socialLinks)
      ]);
      setProducts(productsData);
      setOrders(ordersData);
      setTestimonials(testimonialsData);
      setProjects(projectsData);
      setSubscribers(subscribersData);
      setBlogPosts(blogData);
      const settingsData = await Promise.resolve(arguments[0][5]);
      setSocialLinks(settingsData || socialLinks);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => {
      setIsAuthenticated(true);
      loadData();
    }} />;
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
  };

  const approveTestimonial = async (id: number) => {
    try {
      const response = await fetch(`${config.api.baseUrl}/api/admin/testimonials/${id}/approve`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${config.api.adminToken}` }
      });
      if (response.ok) {
        alert('Testimonial approved successfully!');
        loadData();
      } else {
        alert('Failed to approve testimonial');
      }
    } catch (error) {
      console.error('Failed to approve testimonial:', error);
      alert('Failed to approve testimonial');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <Loading message="Loading dashboard..." />
      </div>
    );
  }

  const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
  const lowStockProducts = products.filter(p => p.stock < 5);
  const pendingTestimonials = testimonials.filter(t => t.status === 'pending');

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Badge variant="outline" className="mb-4">
              Admin Dashboard
            </Badge>
          </div>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-orbitron font-black mb-6">
            <span className="bg-gradient-quantum bg-clip-text text-transparent">
              QuantumBit
            </span>
            <br />
            <span className="text-foreground">Dashboard</span>
          </h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-quantum-card border-quantum-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground font-exo text-sm">Total Products</p>
                <p className="text-2xl font-orbitron font-bold text-foreground">{products.length}</p>
              </div>
              <Package className="w-8 h-8 text-primary" />
            </div>
          </Card>

          <Card className="bg-quantum-card border-quantum-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground font-exo text-sm">Total Orders</p>
                <p className="text-2xl font-orbitron font-bold text-foreground">{orders.length}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-accent" />
            </div>
          </Card>

          <Card className="bg-quantum-card border-quantum-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground font-exo text-sm">Revenue</p>
                <p className="text-2xl font-orbitron font-bold text-foreground">
                  KSh {totalRevenue.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-secondary" />
            </div>
          </Card>

          <Card className="bg-quantum-card border-quantum-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground font-exo text-sm">Low Stock</p>
                <p className="text-2xl font-orbitron font-bold text-foreground">{lowStockProducts.length}</p>
              </div>
              <Package className="w-8 h-8 text-destructive" />
            </div>
          </Card>
        </div>

        {/* Add/Edit Product Form */}
        <Card className="bg-quantum-card border-quantum-border p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-orbitron font-bold text-foreground">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>
            {editingProduct && (
              <Button variant="outline" size="sm" onClick={() => {
                setEditingProduct(null);
                formRef.current?.reset();
              }}>
                Cancel Edit
              </Button>
            )}
          </div>
          <form ref={formRef} className="grid grid-cols-1 md:grid-cols-6 gap-4" onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(formRef.current!);
            const productData = {
              brand: formData.get('brand')?.toString() || '',
              model: formData.get('model')?.toString() || '',
              price: parseInt(formData.get('price')?.toString() || '0'),
              stock: parseInt(formData.get('stock')?.toString() || '0'),
              category: formData.get('category')?.toString() || '',
              image_url: formData.get('image_url')?.toString() || ''
            };
            
            try {
              const url = editingProduct 
                ? `${config.api.baseUrl}/api/products/${editingProduct.id}`
                : `${config.api.baseUrl}/api/products`;
              const method = editingProduct ? 'PUT' : 'POST';
              
              const response = await fetch(url, {
                method,
                headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${config.api.adminToken}`
                },
                body: JSON.stringify(productData)
              });
              
              if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Failed to ${editingProduct ? 'update' : 'add'} product`);
              }
              
              loadData();
              formRef.current?.reset();
              setEditingProduct(null);
              alert(`Product ${editingProduct ? 'updated' : 'added'} successfully!`);
            } catch (error) {
              console.error(`Failed to ${editingProduct ? 'update' : 'add'} product:`, error);
              alert(`Failed to ${editingProduct ? 'update' : 'add'} product: ${error.message}`);
            }
          }}>
            <input name="brand" placeholder="Brand (HP, Canon)" defaultValue={editingProduct?.brand || ''} className="px-3 py-2 rounded border bg-white text-black" required />
            <input name="model" placeholder="Model (CF217A)" defaultValue={editingProduct?.model || ''} className="px-3 py-2 rounded border bg-white text-black" required />
            <input name="price" type="number" placeholder="Price (8500)" defaultValue={editingProduct?.price || ''} className="px-3 py-2 rounded border bg-white text-black" required />
            <input name="stock" type="number" placeholder="Stock (10)" defaultValue={editingProduct?.stock || ''} className="px-3 py-2 rounded border bg-white text-black" required />
            <input name="image_url" placeholder="Image URL (optional)" defaultValue={editingProduct?.image_url || ''} className="px-3 py-2 rounded border bg-white text-black" />
            <input 
              name="category" 
              placeholder="Category (toner, ink, opc_drum, etc.)" 
              defaultValue={editingProduct?.category || ''}
              className="px-3 py-2 rounded border bg-white text-black" 
              list="categories"
              required 
            />
            <datalist id="categories">
              <option value="toner">Toner</option>
              <option value="ink">Ink</option>
              <option value="opc_drum">OPC Drum</option>
              <option value="cleaning_blade">Cleaning Blade</option>
              <option value="fuser_roller">Fuser Roller</option>
              <option value="teflon">Teflon</option>
            </datalist>
            <Button type="submit" className="bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded font-semibold">
              {editingProduct ? 'Update Product' : 'Add Product'}
            </Button>
          </form>
        </Card>

        {/* Social Media Settings */}
        <Card className="bg-quantum-card border-quantum-border p-6 mb-8">
          <h3 className="text-xl font-orbitron font-bold text-foreground mb-4">Social Media Links</h3>
          <form ref={socialFormRef} className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(socialFormRef.current!);
            const newSocialLinks = {
              facebook: formData.get('facebook')?.toString() || '',
              twitter: formData.get('twitter')?.toString() || '',
              linkedin: formData.get('linkedin')?.toString() || '',
              instagram: formData.get('instagram')?.toString() || ''
            };
            
            try {
              const response = await fetch(`${config.api.baseUrl}/api/admin/settings`, {
                method: 'POST',
                headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${config.api.adminToken}`
                },
                body: JSON.stringify({ socialLinks: newSocialLinks })
              });
              
              if (response.ok) {
                setSocialLinks(newSocialLinks);
                alert('Social media links updated successfully!');
              } else {
                alert('Failed to update social media links');
              }
            } catch (error) {
              console.error('Failed to update social links:', error);
              alert('Failed to update social media links');
            }
          }}>
            <input name="facebook" placeholder="Facebook URL" defaultValue={socialLinks.facebook} className="px-3 py-2 rounded border bg-white text-black" />
            <input name="twitter" placeholder="Twitter URL" defaultValue={socialLinks.twitter} className="px-3 py-2 rounded border bg-white text-black" />
            <input name="linkedin" placeholder="LinkedIn URL" defaultValue={socialLinks.linkedin} className="px-3 py-2 rounded border bg-white text-black" />
            <input name="instagram" placeholder="Instagram URL" defaultValue={socialLinks.instagram} className="px-3 py-2 rounded border bg-white text-black" />
            <Button type="submit" className="bg-primary text-white hover:bg-primary/90 px-6 py-2 rounded font-semibold col-span-full">
              Update Social Links
            </Button>
          </form>
        </Card>

        {/* Add/Edit Blog Post Form */}
        <Card className="bg-quantum-card border-quantum-border p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-orbitron font-bold text-foreground">
              {editingBlogPost ? 'Edit Blog Post' : 'Add New Blog Post'}
            </h3>
            {editingBlogPost && (
              <Button variant="outline" size="sm" onClick={() => {
                setEditingBlogPost(null);
                blogFormRef.current?.reset();
              }}>
                Cancel Edit
              </Button>
            )}
          </div>
          <form ref={blogFormRef} className="grid grid-cols-1 gap-4" onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(blogFormRef.current!);
            const blogData = {
              title: formData.get('title')?.toString() || '',
              excerpt: formData.get('excerpt')?.toString() || '',
              content: formData.get('content')?.toString() || '',
              category: formData.get('category')?.toString() || '',
              author: formData.get('author')?.toString() || '',
              status: formData.get('status')?.toString() || 'published'
            };
            
            try {
              const url = editingBlogPost 
                ? `${config.api.baseUrl}/api/admin/blog/${editingBlogPost.id}`
                : `${config.api.baseUrl}/api/admin/blog`;
              const method = editingBlogPost ? 'PUT' : 'POST';
              
              const response = await fetch(url, {
                method,
                headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${config.api.adminToken}`
                },
                body: JSON.stringify(blogData)
              });
              
              if (!response.ok) throw new Error(`Failed to ${editingBlogPost ? 'update' : 'add'} blog post`);
              
              loadData();
              blogFormRef.current?.reset();
              setEditingBlogPost(null);
              alert(`Blog post ${editingBlogPost ? 'updated' : 'added'} successfully!`);
            } catch (error) {
              console.error(`Failed to ${editingBlogPost ? 'update' : 'add'} blog post:`, error);
              alert(`Failed to ${editingBlogPost ? 'update' : 'add'} blog post`);
            }
          }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input name="title" placeholder="Blog Post Title" defaultValue={editingBlogPost?.title || ''} className="px-3 py-2 rounded border bg-white text-black" required />
              <input name="category" placeholder="Category (Tech, Business)" defaultValue={editingBlogPost?.category || ''} className="px-3 py-2 rounded border bg-white text-black" required />
              <input name="author" placeholder="Author Name" defaultValue={editingBlogPost?.author || ''} className="px-3 py-2 rounded border bg-white text-black" required />
            </div>
            <textarea name="excerpt" placeholder="Short excerpt/summary" defaultValue={editingBlogPost?.excerpt || ''} className="px-3 py-2 rounded border bg-white text-black" rows={2} required></textarea>
            <textarea name="content" placeholder="Full blog post content (Markdown supported)" defaultValue={editingBlogPost?.content || ''} className="px-3 py-2 rounded border bg-white text-black" rows={8} required></textarea>
            <div className="flex gap-4">
              <select name="status" defaultValue={editingBlogPost?.status || 'published'} className="px-3 py-2 rounded border bg-white text-black" required>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
              <Button type="submit" className="bg-primary text-white hover:bg-primary/90 px-6 py-2 rounded font-semibold">
                {editingBlogPost ? 'Update Post' : 'Add Post'}
              </Button>
            </div>
          </form>
        </Card>

        {/* Add/Edit Project Form */}
        <Card className="bg-quantum-card border-quantum-border p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-orbitron font-bold text-foreground">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h3>
            {editingProject && (
              <Button variant="outline" size="sm" onClick={() => {
                setEditingProject(null);
                projectFormRef.current?.reset();
              }}>
                Cancel Edit
              </Button>
            )}
          </div>
          <form ref={projectFormRef} className="grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(projectFormRef.current!);
            const projectData = {
              title: formData.get('title')?.toString() || '',
              description: formData.get('description')?.toString() || '',
              category: formData.get('category')?.toString() || '',
              technologies: formData.get('technologies')?.toString() || '',
              features: formData.get('features')?.toString() || '',
              project_url: formData.get('project_url')?.toString() || '',
              image_url: formData.get('image_url')?.toString() || '',
              status: formData.get('status')?.toString() || 'completed'
            };
            
            try {
              const url = editingProject 
                ? `${config.api.baseUrl}/api/projects/${editingProject.id}`
                : `${config.api.baseUrl}/api/projects`;
              const method = editingProject ? 'PUT' : 'POST';
              
              const response = await fetch(url, {
                method,
                headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${config.api.adminToken}`
                },
                body: JSON.stringify(projectData)
              });
              
              if (!response.ok) throw new Error(`Failed to ${editingProject ? 'update' : 'add'} project`);
              
              loadData();
              projectFormRef.current?.reset();
              setEditingProject(null);
              alert(`Project ${editingProject ? 'updated' : 'added'} successfully!`);
            } catch (error) {
              console.error(`Failed to ${editingProject ? 'update' : 'add'} project:`, error);
              alert(`Failed to ${editingProject ? 'update' : 'add'} project`);
            }
          }}>
            <input name="title" placeholder="Project Title" defaultValue={editingProject?.title || ''} className="px-3 py-2 rounded border bg-white text-black" required />
            <input name="category" placeholder="Category (Web Development)" defaultValue={editingProject?.category || ''} className="px-3 py-2 rounded border bg-white text-black" required />
            <select name="status" defaultValue={editingProject?.status || 'completed'} className="px-3 py-2 rounded border bg-white text-black" required>
              <option value="completed">Completed</option>
              <option value="in progress">In Progress</option>
              <option value="planning">Planning</option>
            </select>
            <textarea name="description" placeholder="Project Description" defaultValue={editingProject?.description || ''} className="px-3 py-2 rounded border bg-white text-black col-span-full" rows={2} required></textarea>
            <input name="technologies" placeholder="Technologies (React, Node.js, etc.)" defaultValue={editingProject?.technologies || ''} className="px-3 py-2 rounded border bg-white text-black" />
            <input name="features" placeholder="Key Features (comma separated)" defaultValue={editingProject?.features || ''} className="px-3 py-2 rounded border bg-white text-black" />
            <input name="project_url" placeholder="Project URL (optional)" defaultValue={editingProject?.project_url || ''} className="px-3 py-2 rounded border bg-white text-black" />
            <input name="image_url" placeholder="Image URL (optional)" defaultValue={editingProject?.image_url || ''} className="px-3 py-2 rounded border bg-white text-black col-span-2" />
            <Button type="submit" className="bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded font-semibold">
              {editingProject ? 'Update Project' : 'Add Project'}
            </Button>
          </form>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Blog Posts Management */}
          <Card className="bg-quantum-card border-quantum-border p-6">
            <h3 className="text-xl font-orbitron font-bold text-foreground mb-4">Blog Posts ({blogPosts.length})</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {blogPosts.map((post) => (
                <div key={post.id} className="p-3 bg-background rounded-lg border border-quantum-border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-exo font-semibold text-foreground text-sm">{post.title}</p>
                    <div className="flex items-center gap-1">
                      <Badge variant={post.status === 'published' ? 'secondary' : 'outline'} className="text-xs">
                        {post.status}
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 px-1 text-xs"
                        onClick={() => {
                          setEditingBlogPost(post);
                          blogFormRef.current?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 px-1 text-xs text-destructive hover:text-destructive"
                        onClick={async () => {
                          if (confirm(`Delete blog post "${post.title}"?`)) {
                            try {
                              const response = await fetch(`${config.api.baseUrl}/api/admin/blog/${post.id}`, {
                                method: 'DELETE',
                                headers: { 'Authorization': `Bearer ${config.api.adminToken}` }
                              });
                              if (response.ok) {
                                loadData();
                                alert('Blog post deleted successfully!');
                              } else {
                                alert('Failed to delete blog post');
                              }
                            } catch (error) {
                              console.error('Failed to delete blog post:', error);
                              alert('Failed to delete blog post');
                            }
                          }
                        }}
                      >
                        Del
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{post.category} • {post.author}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{post.excerpt}</p>
                </div>
              ))}
              {blogPosts.length === 0 && (
                <p className="text-muted-foreground font-exo text-center py-4">No blog posts yet!</p>
              )}
            </div>
          </Card>

          {/* Projects Management */}
          <Card className="bg-quantum-card border-quantum-border p-6">
            <h3 className="text-xl font-orbitron font-bold text-foreground mb-4">All Projects ({projects.length})</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {projects.map((project) => (
                <div key={project.id} className="p-3 bg-background rounded-lg border border-quantum-border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-exo font-semibold text-foreground">{project.title}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        project.status === 'completed' ? 'secondary' : 
                        project.status === 'in progress' ? 'default' : 'outline'
                      }>
                        {project.status}
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 px-2 text-xs"
                        onClick={() => {
                          setEditingProject(project);
                          projectFormRef.current?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 px-2 text-xs text-destructive hover:text-destructive"
                        onClick={async () => {
                          if (confirm(`Delete project "${project.title}"?`)) {
                            try {
                              const response = await fetch(`${config.api.baseUrl}/api/projects/${project.id}`, {
                                method: 'DELETE',
                                headers: { 'Authorization': `Bearer ${config.api.adminToken}` }
                              });
                              if (response.ok) {
                                loadData();
                                alert('Project deleted successfully!');
                              } else {
                                alert('Failed to delete project');
                              }
                            } catch (error) {
                              console.error('Failed to delete project:', error);
                              alert('Failed to delete project');
                            }
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{project.category}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{project.description}</p>
                </div>
              ))}
              {projects.length === 0 && (
                <p className="text-muted-foreground font-exo text-center py-4">No projects yet!</p>
              )}
            </div>
          </Card>

          {/* Products Management */}
          <Card className="bg-quantum-card border-quantum-border p-6">
            <h3 className="text-xl font-orbitron font-bold text-foreground mb-4">All Products ({products.length})</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {products.map((product) => (
                <div key={product.id} className="p-3 bg-background rounded-lg border border-quantum-border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-exo font-semibold text-foreground">{product.brand} {product.model}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant={product.stock === 0 ? "destructive" : product.stock < 5 ? "outline" : "secondary"}>
                        {product.stock} left
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 px-2 text-xs"
                        onClick={() => {
                          setEditingProduct(product);
                          formRef.current?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 px-2 text-xs text-destructive hover:text-destructive"
                        onClick={async () => {
                          if (confirm(`Delete product "${product.brand} ${product.model}"?`)) {
                            try {
                              const response = await fetch(`${config.api.baseUrl}/api/products/${product.id}`, {
                                method: 'DELETE',
                                headers: { 'Authorization': `Bearer ${config.api.adminToken}` }
                              });
                              if (response.ok) {
                                loadData();
                                alert('Product deleted successfully!');
                              } else {
                                alert('Failed to delete product');
                              }
                            } catch (error) {
                              console.error('Failed to delete product:', error);
                              alert('Failed to delete product');
                            }
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">KSh {product.price.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                </div>
              ))}
              {products.length === 0 && (
                <p className="text-muted-foreground font-exo text-center py-4">No products yet!</p>
              )}
            </div>
          </Card>

          {/* Newsletter Subscribers */}
          <Card className="bg-quantum-card border-quantum-border p-6">
            <h3 className="text-xl font-orbitron font-bold text-foreground mb-4">Newsletter Subscribers ({subscribers.length})</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {subscribers.map((subscriber) => (
                <div key={subscriber.id} className="p-3 bg-background rounded-lg border border-quantum-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-exo font-semibold text-foreground">{subscriber.email}</p>
                      <p className="text-xs text-muted-foreground">{new Date(subscriber.created_at).toLocaleDateString()}</p>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                </div>
              ))}
              {subscribers.length === 0 && (
                <p className="text-muted-foreground font-exo text-center py-4">No subscribers yet!</p>
              )}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <Card className="bg-quantum-card border-quantum-border p-6">
            <h3 className="text-xl font-orbitron font-bold text-foreground mb-4">Recent Orders</h3>
            <div className="space-y-4">
              {orders.slice(0, 3).map((order) => (
                <div key={order.id} className="p-3 bg-background rounded-lg border border-quantum-border">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-exo font-semibold text-foreground">{order.customer_name}</p>
                      <p className="text-sm text-muted-foreground">{order.brand} {order.model}</p>
                    </div>
                    <p className="font-orbitron font-bold text-primary">KSh {order.total_amount.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <OrderStatus status={order.status || 'pending'} orderId={order.id.toString()} />
                    <select 
                      value={order.status || 'pending'}
                      onChange={async (e) => {
                        try {
                          const response = await fetch(`${config.api.baseUrl}/api/admin/orders/${order.id}`, {
                            method: 'PATCH',
                            headers: { 
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${config.api.adminToken}`
                            },
                            body: JSON.stringify({ status: e.target.value })
                          });
                          if (response.ok) {
                            loadData();
                            alert('Order status updated!');
                          } else {
                            alert('Failed to update status');
                          }
                        } catch (error) {
                          console.error('Failed to update order status:', error);
                          alert('Failed to update status');
                        }
                      }}
                      className="px-2 py-1 text-xs rounded border bg-white text-black"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Low Stock Alert */}
          <Card className="bg-quantum-card border-quantum-border p-6">
            <h3 className="text-xl font-orbitron font-bold text-foreground mb-4">Low Stock Alert</h3>
            <div className="space-y-4">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-background rounded-lg border border-quantum-border">
                  <div>
                    <p className="font-exo font-semibold text-foreground">{product.brand} {product.model}</p>
                    <p className="text-sm text-muted-foreground">KSh {product.price.toLocaleString()}</p>
                  </div>
                  <Badge variant={product.stock === 0 ? "destructive" : "outline"}>
                    {product.stock} left
                  </Badge>
                </div>
              ))}
              {lowStockProducts.length === 0 && (
                <p className="text-muted-foreground font-exo text-center py-4">All products are well stocked!</p>
              )}
            </div>
          </Card>

          {/* Pending Testimonials */}
          <Card className="bg-quantum-card border-quantum-border p-6">
            <h3 className="text-xl font-orbitron font-bold text-foreground mb-4">
              Pending Reviews ({pendingTestimonials.length})
            </h3>
            <div className="space-y-4">
              {pendingTestimonials.slice(0, 3).map((testimonial) => (
                <div key={testimonial.id} className="p-3 bg-background rounded-lg border border-quantum-border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-exo font-semibold text-foreground">{testimonial.customer_name}</p>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-primary">⭐</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{testimonial.company}</p>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{testimonial.message}</p>
                  <Button 
                    size="sm" 
                    variant="quantum" 
                    className="w-full"
                    onClick={() => approveTestimonial(testimonial.id)}
                  >
                    Approve Review
                  </Button>
                </div>
              ))}
              {pendingTestimonials.length === 0 && (
                <p className="text-muted-foreground font-exo text-center py-4">No pending reviews!</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;