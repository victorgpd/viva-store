import { loggedScreensRoutes, screensRoutes } from "./app/routes";
import { NotificationProvider } from "./context/notificationContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([...screensRoutes, ...loggedScreensRoutes], { basename: "/viva-store/" });

  return (
    <NotificationProvider>
      <RouterProvider router={router} />
    </NotificationProvider>
  );
}

export default App;
