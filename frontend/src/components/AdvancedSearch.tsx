import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Clock, X } from 'lucide-react';

import { Product } from '@/lib/types';

interface AdvancedSearchProps {
  onSearch: (query: string) => void;
  products: Product[];
  placeholder?: string;
}

const AdvancedSearch = ({ onSearch, products, placeholder = "Search products..." }: AdvancedSearchProps) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load search history from localStorage
    try {
      const history = localStorage.getItem('searchHistory');
      if (history) {
        setSearchHistory(JSON.parse(history));
      }
    } catch {
      setSearchHistory([]);
    }
  }, []);

  useEffect(() => {
    if (query.length > 1) {
      const filtered = products
        .flatMap(p => [p.brand, p.model, p.category])
        .filter(item => item.toLowerCase().includes(query.toLowerCase()))
        .filter((item, index, arr) => arr.indexOf(item) === index)
        .slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, products]);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      // Add to search history
      const newHistory = [searchQuery, ...searchHistory.filter(h => h !== searchQuery)].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      
      onSearch(searchQuery);
      setQuery(searchQuery);
      setShowSuggestions(false);
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(query)}
          onFocus={() => setShowSuggestions(true)}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery('');
              onSearch('');
            }}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 bg-background border border-quantum-border rounded-md mt-1 shadow-lg z-50">
          {/* Search History */}
          {searchHistory.length > 0 && query.length === 0 && (
            <div className="p-3 border-b border-quantum-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">Recent Searches</span>
                <Button variant="ghost" size="sm" onClick={clearHistory} className="h-6 text-xs">
                  Clear
                </Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {searchHistory.map((item, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => handleSearch(item)}
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-2">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-3 py-2 hover:bg-muted rounded cursor-pointer text-sm"
                  onClick={() => handleSearch(suggestion)}
                >
                  <Search className="w-3 h-3 inline mr-2 text-muted-foreground" />
                  {suggestion}
                </div>
              ))}
            </div>
          )}

          {query.length > 1 && suggestions.length === 0 && (
            <div className="p-3 text-sm text-muted-foreground text-center">
              No suggestions found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;