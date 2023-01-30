import { useEffect, useRef } from "react";

export const useIntersectionObserver = (callback, deps = []) => {
  const ref = useRef(null);
  const intersectionObserver = useRef(null);

  useEffect(() => {
    if (!window.IntersectionObserver || !ref?.current) return;
    const node = ref.current;

    function unobserve() {
      if (node) {
        intersectionObserver.current?.unobserve(node);
      }
    }

    function handleEntries([entry]) {
      if (entry.isIntersecting) {
        callback();
        unobserve();
      }
    }

    intersectionObserver.current = new IntersectionObserver(handleEntries, {
      threshold: 0.1,
    });
    intersectionObserver.current.observe(node);

    return unobserve;
  }, deps);

  return ref;
};
