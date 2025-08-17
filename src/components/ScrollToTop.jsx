import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation(); // automatically gets current path

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top on route change
  }, [pathname]);

  return null;
};

export default ScrollToTop;
