"use client";

import { useEffect, type CSSProperties } from "react";
import { useRouter } from "next/navigation";

import { AppSidebar } from "@/components/AppDashboard/app-sidebar";
import { ChartAreaInteractive } from "@/components/AppDashboard/chart-area-interactive";
import { DataTable } from "@/components/AppDashboard/data-table";
import { SectionCards } from "@/components/AppDashboard/section-cards";
import { SiteHeader } from "@/components/AppDashboard/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";

import data from "@/components/AppDashboard/data.json"

const page = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    document.body.classList.add("dashboard-page");

    return () => {
      document.body.classList.remove("dashboard-page");
    };
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/Auth/login?callback=%2FDashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return null;
  }

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            body.dashboard-page {
              background-color: hsl(var(--background));
            }
            body.dashboard-page > header {
              display: none !important;
            }
            body.dashboard-page footer {
              display: none !important;
            }
            .dashboard-shell {
              position: relative;
              isolation: isolate;
              height: 100%;
              width: 100%;
              min-height: 100vh;
            }
            .dashboard-shell [data-slot="sidebar-container"] {
              position: absolute !important;
              inset: 0 !important;
              height: 100% !important;
              z-index: 10;
            }
            .dashboard-shell [data-slot="sidebar"] {
              height: 100% !important;
            }
            .dashboard-shell [data-slot="sidebar-wrapper"],
            .dashboard-shell [data-slot="sidebar-inner"] {
              height: 100% !important;
            }
            .dashboard-layout {
              height: 100vh;
              min-height: 100vh;
            }
            @media (max-width: 767px) {
              .dashboard-layout {
                height: 100vh;
                min-height: 100vh;
              }
            }
          `,
        }}
      />
      <section className="dashboard-layout flex w-full overflow-hidden bg-background">
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as CSSProperties
          }
          className="dashboard-shell flex h-full w-full border-t border-border/50"
        >
          <AppSidebar variant="inset" />
          <SidebarInset className="flex h-full flex-1 flex-col overflow-hidden">
            <SiteHeader />
            <div className="flex flex-1 flex-col overflow-hidden">
              <div className="flex flex-1 flex-col gap-4 overflow-auto px-4 py-6 md:px-8 md:py-8">
                <SectionCards variant="compact" className="@container/main" />
                <div className="rounded-lg border border-border/60 bg-card px-4 py-6 shadow-sm lg:px-6">
                  <ChartAreaInteractive />
                </div>
                <div className="rounded-lg border border-border/60 bg-card shadow-sm">
                  <DataTable data={data} />
                </div>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </section>
    </>
  );
};

export default page;
