'use client';
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from 'google-spreadsheet';
import React from 'react';

type SheetsContextType = {
  sheets: Record<string, GoogleSpreadsheetWorksheet> | null;
  setSheets: React.Dispatch<
    React.SetStateAction<Record<string, GoogleSpreadsheetWorksheet> | null>
  >;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SheetsContext = React.createContext<SheetsContextType>({
  sheets: null,
  isLoading: false,
  setSheets: () => {},
  setIsLoading: () => {},
});

export function SheetsWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [sheets, setSheets] = React.useState<Record<
    string,
    GoogleSpreadsheetWorksheet
  > | null>(null);

  const contextValue = {
    sheets,
    isLoading,
    setSheets,
    setIsLoading,
  };

  return (
    <SheetsContext.Provider value={contextValue}>
      {children}
    </SheetsContext.Provider>
  );
}
