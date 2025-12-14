import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "../layout/Body";

// Admin (non-lazy where needed)
import AdminLogin from "./component/admin/AdminLogin";
import AdminLayout from "./component/admin/AdminLayout";
import ProtectedRoute from "./component/admin/ProtectedRoute";
import AppliedUser from "./component/admin/AppliedUser";
import Testimonials from "./component/admin/Testimonials";

// =======================
// LAZY IMPORTS (UNCHANGED PATHS)
// =======================
const CourseContainer = lazy(() =>
  import("./component/Course/CourseContainer")
);
const Testimonal = lazy(() => import("./component/Testimonals/Testimonal"));
const Partner = lazy(() => import("./component/Partners/Partner"));
const Service = lazy(() => import("./component/services/Service"));
const Contact = lazy(() => import("./component/Contact"));
const About = lazy(() => import("./component/about/About"));
const CrousleSection = lazy(() => import("./component/CrousleSection"));
const Form = lazy(() => import("./component/Form"));
const ServiceDetail = lazy(() => import("./component/services/ServiceDetails"));

// Admin lazy
const AdminDashboard = lazy(() => import("./component/admin/AdminDashBorad"));
const AdminServices = lazy(() => import("./component/admin/Services"));

// =======================
// LOADER
// =======================
const Loader = () => (
  <div className="flex justify-center items-center py-20 text-xl font-semibold text-[#001a4d]">
    Loading...
  </div>
);

// =======================
// ROUTER (PATH SAME)
// =======================
const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <>
              <CrousleSection />
              <CourseContainer />
              <Testimonal />
              <Partner />
            </>
          </Suspense>
        ),
      },
      {
        path: "services",
        element: (
          <Suspense fallback={<Loader />}>
            <Service />
          </Suspense>
        ),
      },
      {
        path: "services/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <ServiceDetail />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<Loader />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<Loader />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "form",
        element: (
          <Suspense fallback={<Loader />}>
            <Form />
          </Suspense>
        ),
      },
    ],
  },

  // 🔐 Admin Login
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },

  // 🔐 Admin Protected Area
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <AdminDashboard />
          </Suspense>
        ),
      },
      {
        path: "services",
        element: (
          <Suspense fallback={<Loader />}>
            <AdminServices />
          </Suspense>
        ),
      },
      {
        path: "applied-users",
        element: <AppliedUser />,
      },
      {
        path: "testimonials",
        element: <Testimonials />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
