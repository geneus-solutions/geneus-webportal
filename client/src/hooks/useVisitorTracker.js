// src/hooks/useVisitorTracker.js
import { useEffect } from "react";
import { useAddVisitorDataMutation } from "../features/visitorData/visitorDataApiSlice";

const useVisitorTracker = () => {
  const [addVisitorData] = useAddVisitorDataMutation();
  useEffect(() => {
    const trackVisitor = async () => {
      const lastTracked = localStorage.getItem("lastVisitorTrack");
      const today = new Date().toISOString().slice(0, 10);
      if (lastTracked !== today) {
        try {
          await addVisitorData().unwrap();
          localStorage.setItem("lastVisitorTrack", today);
        } catch (error) {
          console.error("Error tracking visitor:", error);
        }
      }
    };
  
    trackVisitor();
  }, [addVisitorData]);
};

export default useVisitorTracker;
