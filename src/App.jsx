import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Body from "../layout/Body";

// 🔥 Lazy Loaded Components
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

// 🔥 Fallback Loader (You can replace with animated loader)
const Loader = () => (
  <div className="text-center py-20 text-xl font-semibold text-[#001a4d]">
    Loading...
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<Loader />}>
            <CrousleSection />
            <CourseContainer />
            <Testimonal />
            <Partner />
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
      {
        path: "services/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <ServiceDetail />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
