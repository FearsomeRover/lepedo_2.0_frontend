"use client";
import React, { createContext, useContext, useState } from 'react';

const dbUserContext = createContext<User[]>([]);


export const useUserContext = () => {
    const context = useContext(dbUserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};

// @ts-ignore
export const DBUserProvider: React.FC = ({ children }) => {
    const [users, setUsers] = useState<User[]>([]);

    const setDBUsers = (users: User[]) => {setUsers(users)};

    return (
        <dbUserContext.Provider value={users}>
            {children}
        </dbUserContext.Provider>
    );
};