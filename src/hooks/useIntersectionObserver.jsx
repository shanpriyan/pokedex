import { useEffect, useRef } from "react";

export const useIntersectionObserver = (callback, deps = []) => {
  const node = useRef(null);

  useEffect(() => {
    if (!window.IntersectionObserver || !node.current) return;

    function handleEntries([entry]) {
      if (entry.isIntersecting) callback();
    }

    const options = { threshold: 1 };
    const observer = new IntersectionObserver(handleEntries, options);
    observer.observe(node.current);
    return () => observer.unobserve(node.current);
  }, deps);

  return node;
};
