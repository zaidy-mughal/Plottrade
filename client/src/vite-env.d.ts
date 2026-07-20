/// <reference types="vite/client" />
declare module "redux-persist/integration/react" {
    import * as React from "react";
    import { Persistor } from "redux-persist";
    export interface PersistGateProps {
        persistor: Persistor;
        loading?: React.ReactNode;
        children?: React.ReactNode | ((bootstrapped: boolean) => React.ReactNode);
        onBeforeLift?: () => void | Promise<void>;
    }
    export class PersistGate extends React.Component<PersistGateProps> { }
}