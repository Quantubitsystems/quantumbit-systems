import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Calendar, Users } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { LazyImage } from "@/components/LazyImage";


const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsData, testimonialsData] = await Promise.all([
        fetch('http://localhost:3001/api/projects').then(r => r.json()),
        fetch('http://localhost:3001/api/testimonials').then(r => r.json())
      ]);
      setProjects(projectsData);
      setTestimonials(testimonialsData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Convert API projects to display format
  const allProjects = projects.map(p => ({
    id: p.id,
    title: p.title,
    category: p.category,
    description: p.description,
    technologies: p.technologies ? p.technologies.split(', ') : [],
    status: p.status || 'Completed',
    client: 'Client',
    duration: '1 month',
    image: p.image_url || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    features: p.features ? p.features.split(', ').slice(0, 2) : ['Custom solution', 'Professional delivery'],
    project_url: p.project_url
  }));

  const categories = ["All", "Web Development", "Mobile Development", "Networking", "Technical Services", "IoT Solutions"];

  const filteredProjects = activeCategory === "All" 
    ? allProjects 
    : allProjects.filter(project => project.category === activeCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-orbitron">Loading projects...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead 
        title="Portfolio - Quantum Systems Projects & Success Stories"
        description="Explore our portfolio of web development, mobile apps, WiFi installations, and technical solutions. See how we've helped businesses in Nairobi, Kenya succeed."
        keywords="quantum systems portfolio, web development projects, mobile apps Kenya, WiFi installation cases, tech solutions Nairobi"
        structuredData={{
          "@type": "CollectionPage",
          "name": "Quantum Systems Portfolio",
          "description": "Portfolio showcasing our technology projects and client success stories",
          "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": allProjects.length
          }
        }}
      />
      <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Our Work
          </Badge>
          <h1 className="text-4xl md:text-6xl font-orbitron font-black mb-6">
            <span className="bg-gradient-quantum bg-clip-text text-transparent">
              Project
            </span>
            <br />
            <span className="text-foreground">Portfolio</span>
          </h1>
          <p className="text-xl text-muted-foreground font-exo max-w-3xl mx-auto leading-relaxed">
            Explore our completed projects and ongoing work. Each solution is 
            crafted with precision and tailored to meet specific client needs.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === activeCategory ? "quantum" : "outline"}
              className="font-exo"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="bg-quantum-card border-quantum-border overflow-hidden hover:shadow-glow transition-all duration-300 group">
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <LazyImage 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge 
                    variant={project.status === "Completed" ? "default" : project.status === "In Progress" ? "secondary" : "outline"}
                    className="font-exo"
                  >
                    {project.status}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-background/90 font-exo">
                    {project.category}
                  </Badge>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-orbitron font-bold mb-2 text-foreground">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground font-exo text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Project Meta */}
                <div className="flex items-center space-x-4 mb-4 text-xs text-muted-foreground font-exo">
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{project.client}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{project.duration}</span>
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <Badge key={index} variant="secondary" className="text-xs font-exo">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs font-exo">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Key Features */}
                <div className="mb-6">
                  <h4 className="font-exo font-semibold text-sm mb-2 text-foreground">Key Features:</h4>
                  <ul className="text-xs text-muted-foreground font-exo space-y-1">
                    {project.features.slice(0, 2).map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-primary rounded-full flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button variant="quantum" size="sm" className="flex-1 font-exo" asChild>
                    <a href={project.project_url || '/contact'} target={project.project_url ? '_blank' : '_self'} rel={project.project_url ? 'noopener noreferrer' : ''}>
                      View Details
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </Button>
                  {project.status === "Completed" && (
                    <Button variant="outline" size="sm" asChild>
                      <a href="/contact">
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <div className="bg-quantum-card border border-quantum-border rounded-2xl p-8 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-orbitron font-bold text-primary mb-2">{allProjects.length}</div>
              <div className="text-muted-foreground font-exo text-sm">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl font-orbitron font-bold text-accent mb-2">{allProjects.length}</div>
              <div className="text-muted-foreground font-exo text-sm">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-orbitron font-bold text-secondary mb-2">99%</div>
              <div className="text-muted-foreground font-exo text-sm">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-orbitron font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground font-exo text-sm">Support Available</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-orbitron font-bold mb-6 text-foreground">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-muted-foreground font-exo mb-8 max-w-2xl mx-auto">
            Let's create something amazing together. Contact us to discuss your 
            project requirements and see how we can help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="quantum" size="xl" asChild>
              <a href="/contact">
                Start New Project
              </a>
            </Button>
            <Button variant="glow" size="xl" asChild>
              <a href="/contact">
                Schedule Consultation
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Portfolio;