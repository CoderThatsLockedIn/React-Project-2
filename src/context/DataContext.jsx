import React, { createContext, useContext } from "react";
import useSubjects from "../hooks/useSubjects";
import useTasks from "../hooks/useTasks";
import useTopics from "../hooks/useTopics";

// 1. Create the Context
const DataContext = createContext();

// 2. The Provider Component
export function DataProvider({ children }) {
    // Call all your hooks here once
    const subjectData = useSubjects();
    const taskData = useTasks();
    const topicData = useTopics();

    // Combine them into one "Store"
    const value = {
        ...subjectData,
        ...taskData,
        ...topicData
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
}

// 3. Custom hook for easy access
export const useData = () => useContext(DataContext);