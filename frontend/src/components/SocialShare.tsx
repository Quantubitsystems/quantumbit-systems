import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Linkedin, Share2 } from 'lucide-react';

interface SocialShareProps {
  url?: string;
  title?: string;
  description?: string;
}

const SocialShare = ({ 
  url = window.location.href, 
  title = "QuantumBit Systems - Professional Tech Solutions",
  description = "Check out QuantumBit Systems for web development, WiFi installation, and printer services in Nairobi"
}: SocialShareProps) => {
  
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: description, url });
      } catch (error) {
        console.log('Share cancelled');
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground mr-2">Share:</span>
      
      <Button variant="outline" size="sm" asChild>
        <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer">
          <Facebook className="w-4 h-4" />
        </a>
      </Button>
      
      <Button variant="outline" size="sm" asChild>
        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
          <Twitter className="w-4 h-4" />
        </a>
      </Button>
      
      <Button variant="outline" size="sm" asChild>
        <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
          <Linkedin className="w-4 h-4" />
        </a>
      </Button>

      {navigator.share && (
        <Button variant="outline" size="sm" onClick={handleNativeShare}>
          <Share2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default SocialShare;