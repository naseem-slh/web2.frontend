import React from "react";

interface LoginInfo {
    userId: string;
    role: "u" | "a"

}

interface LoginContextType {
    loginInfo: LoginInfo | null;
    setLoginInfo: (loginInfo: LoginInfo | null) => void
}

// export only for provider
export const LoginContext = React.createContext<LoginContextType>({} as LoginContextType);

// export for consumers
export const useLoginContext = () => React.useContext(LoginContext);
