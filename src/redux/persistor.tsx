"use client";
import { persistor, store } from "./store";
import { PersistGate } from 'redux-persist/integration/react';

export function Persistor({ children }: { children: React.ReactNode }) {
    return <PersistGate persistor={persistor}>{children}</PersistGate>;
}