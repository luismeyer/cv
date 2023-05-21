import { createContext, useContext } from "solid-js";

type NavigateFunction = (pathname: string) => void;

export const NavigateContext = createContext<NavigateFunction>();

export const useNavigate = () => {
  const navigate = useContext(NavigateContext);

  if (!navigate) {
    throw new Error("Missing navigate context");
  }

  return navigate;
};
