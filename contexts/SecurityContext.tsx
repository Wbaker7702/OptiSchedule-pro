import React, { createContext, useContext, useState, ReactNode } from 'react';

export type SecurityLevel = 'Standard' | 'High' | 'Absolute';
export type Environment = 'Development' | 'Staging' | 'Production';
export type SyncFrequency = 'Real-time' | '5-min' | 'Daily';

interface SecurityContextType {
  securityLevel: SecurityLevel;
  setSecurityLevel: (level: SecurityLevel) => void;
  sessionTimeout: string;
  setSessionTimeout: (minutes: string) => void;
  autoRemediate: boolean;
  setAutoRemediate: (enabled: boolean) => void;
  hubspotConnected: boolean;
  setHubspotConnected: (connected: boolean) => void;
  environment: Environment;
  setEnvironment: (env: Environment) => void;
  syncFrequency: SyncFrequency;
  setSyncFrequency: (freq: SyncFrequency) => void;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export const SecurityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [securityLevel, setSecurityLevel] = useState<SecurityLevel>('High');
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [autoRemediate, setAutoRemediate] = useState(true);
  const [hubspotConnected, setHubspotConnected] = useState(false);
  const [environment, setEnvironment] = useState<Environment>('Production');
  const [syncFrequency, setSyncFrequency] = useState<SyncFrequency>('Real-time');

  return (
    <SecurityContext.Provider
      value={{
        securityLevel,
        setSecurityLevel,
        sessionTimeout,
        setSessionTimeout,
        autoRemediate,
        setAutoRemediate,
        hubspotConnected,
        setHubspotConnected,
        environment,
        setEnvironment,
        syncFrequency,
        setSyncFrequency,
      }}
    >
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};
