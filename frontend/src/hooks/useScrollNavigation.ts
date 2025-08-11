import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useScrollNavigation = (nextPage: string, prevPage?: string) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      const isAtTop = window.scrollY <= 50;
      
      if (e.deltaY > 0 && isAtBottom) {
        e.preventDefault();
        isScrolling = true;
        navigate(nextPage);
        setTimeout(() => { isScrolling = false; }, 800);
      } else if (e.deltaY < 0 && isAtTop && prevPage) {
        e.preventDefault();
        isScrolling = true;
        navigate(prevPage);
        setTimeout(() => { isScrolling = false; }, 800);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [navigate, nextPage, prevPage]);
};