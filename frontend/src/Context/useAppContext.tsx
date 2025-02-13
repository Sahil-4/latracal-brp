import { useContext } from "react";
import { AppContext } from "./AppContext.js";

export const useAppContext = () => useContext(AppContext);
