import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { routePages } from "../../app/routes";
import { Suspense, useEffect, type ComponentType } from "react";
import { Navbar } from "../../components/layout/Navbar";
import { NotFound } from "../../components/routing/NotFound";
import { Footer } from "../../components/layout/Footer";
import { ReferencesProvider } from "../../components/article/References";
import {
  PageLoadBoundary,
  PageLoading,
} from "../../components/routing/PageLoadState";
import {
  RouteContentReady,
  RouteScrollManager,
} from "../../components/routing/RouteScrollManager";
import { RouteLoadingScreen } from "../../components/routing/RouteLoadingScreen";
import { BackToTop } from "../../components/navigation/BackToTop";

interface PageRouteProps {
  title: string;
  component: ComponentType;
}

// Every page renders its own hero (ArticlePage or the Home stage), so the
// route only adds the shared loading/error boundary and citation context.
function PageRoute({ title, component: Component }: PageRouteProps) {
  return (
    <ReferencesProvider>
      <PageLoadBoundary title={title}>
        <Suspense fallback={<PageLoading />}>
          <Component />
          <RouteContentReady />
        </Suspense>
      </PageLoadBoundary>
    </ReferencesProvider>
  );
}

const App = () => {
  const { pathname } = useLocation();
  const pageMeta = routePages.find(({ path }) => path === pathname);
  const isFullscreen = pageMeta?.layout === "fullscreen";

  // Set Page Title
  const title = pageMeta ? pageMeta.title : "Not Found";

  // Fullscreen pages (e.g. scroll-driven Home) drop the fixed-navbar body offset
  useEffect(() => {
    document.body.classList.toggle("fullscreen-page", isFullscreen);
    document.body.classList.toggle("inner-page", !isFullscreen);
    return () => {
      document.body.classList.remove("fullscreen-page");
      document.body.classList.remove("inner-page");
    };
  }, [isFullscreen]);

  useEffect(() => {
    document.title = `${title} | ${import.meta.env.VITE_TEAM_NAME} - iGEM ${import.meta.env.VITE_TEAM_YEAR}`;
  }, [title]);

  return (
    <>
      <RouteScrollManager enabled={!isFullscreen} />
      {/* Navigation */}
      <Navbar />
      <RouteLoadingScreen title={title} />
      <BackToTop />

      {/* Page content */}
      <Routes>
        {routePages.map(({ path, title, component }) => (
          <Route
            key={path}
            path={path}
            element={
              <PageRoute key={path} title={title} component={component} />
            }
          />
        ))}
        <Route
          path="*"
          element={
            <ReferencesProvider>
              <NotFound />
              <RouteContentReady />
            </ReferencesProvider>
          }
        />
      </Routes>

      {/* Footer */}
      {/* MUST mention license AND have a link to team wiki's repository on gitlab.igem.org */}
      <Footer />
    </>
  );
};

export default App;
