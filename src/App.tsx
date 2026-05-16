import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PageLoader from "@/components/PageLoader";

const Login = lazy(() => import("./pages/Login"));
const Overview = lazy(() => import("./pages/Overview"));
const ReportsVault = lazy(() => import("./pages/ReportsVault"));
const PatientsPage = lazy(() => import("./pages/PatientsPage"));
const CreateRequestPage = lazy(() => import("./pages/CreateRequestPage"));
const SendReportsPage = lazy(() => import("./pages/SendReportsPage"));
const UserDetailPage = lazy(() => import("./pages/UserDetailPage"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/create-request" element={<CreateRequestPage />} />
            <Route path="/reports-vault" element={<ReportsVault />} />
            <Route path="/send-reports" element={<SendReportsPage />} />
            <Route path="/user/:id" element={<UserDetailPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
