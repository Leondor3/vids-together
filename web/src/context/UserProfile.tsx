
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface UserContextType {
    userName: string,
    setUserName: (name: string) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [userName, setUserName] = useState('');

    const userContextValue = { userName, setUserName };

    return (
        <UserContext.Provider value={userContextValue}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}