import { createRoot } from "react-dom/client";
import Router from "./routes/Router";

const root = createRoot(document.getElementById("root"));
root.render(<Router />);
