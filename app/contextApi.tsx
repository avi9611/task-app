"use client";
import { useUser } from "@clerk/nextjs";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "todo" | "inprogress" | "completed";
  selected: boolean;
  dueDate: string;
  clerkUserId: string;
}

interface GlobalContext {
  mobileView: {
    isMobileView: boolean;
    setIsMobileView: (isMobileView: boolean) => void;
  };
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  isLoading: boolean;
}

const GlobalContext = createContext<GlobalContext>({
  mobileView: {
    isMobileView: false,
    setIsMobileView: () => {},
  },
  tasks: [],
  setTasks: () => {},
  isLoading: true,
});

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [isMobileView, setIsMobileView] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<Task[]>([]); 
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2300);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!isLoaded || !isSignedIn || !user) return;

      try {
        const response = await fetch(`/api/task?clerkUserId=${user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data.tasks || []); 
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        setTasks([]);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchTasks();
  }, [isLoaded, isSignedIn, user]); 

  useEffect(() => {
    function handleResize() {
      setIsMobileView(window.innerWidth <= 1100);
    }
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        mobileView: {
          isMobileView,
          setIsMobileView,
        },
        tasks,
        setTasks,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export default GlobalContextProvider;
