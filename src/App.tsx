import { loggedScreensRoutes, screensRoutes } from "./app/routes";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { NotificationProvider } from "./context/notificationContext";

function App() {
  const router = createHashRouter([...screensRoutes, ...loggedScreensRoutes]);

  return (
    <NotificationProvider>
      <RouterProvider router={router} />
    </NotificationProvider>
  );
}

export default App;
