import { useCallback, useEffect, useRef, useState } from 'react';

function useInfiniteScroll(options: IntersectionObserverInit | undefined) {
  const referenced = useRef<HTMLDivElement>(null),
    [isLast, setIsLast] = useState(false),
    callback = useCallback((entries) => {
      const [entry] = entries;
      setIsLast(entry.isIntersecting);
    }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options),
      element = referenced.current;
    if (element) observer.observe(element);
    return () => (element ? observer.disconnect() : void 0);
  }, [options, callback]);

  return [referenced, isLast];
}

export default useInfiniteScroll;
