import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "./data.json"

export default function Dashboard() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .mac-window-content {
          position: relative;
          transform: translateZ(0);
          isolation: isolate;
        }
        .mac-window-content [data-slot="sidebar-container"] {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          bottom: 0 !important;
          height: 100% !important;
          z-index: 10 !important;
        }
        .mac-window-content [data-slot="sidebar-wrapper"] {
          position: relative !important;
          height: 100% !important;
        }
        .mac-window-content [data-slot="sidebar-inner"] {
          height: 100% !important;
        }
      `}} />
      <div className="flex items-center justify-center min-h-screen bg-[linear-gradient(to_bottom_right,#e5e7eb,#d1d5db)] dark:bg-[linear-gradient(to_bottom_right,#111827,#1f2937)] p-4 md:p-8">
        <div className="w-full max-w-[1400px] bg-white dark:bg-gray-800 rounded-t-lg shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden border border-gray-300 dark:border-gray-600 mac-window-container">
          {/* macOS Window Frame */}
          <div className="bg-[#e8e8e8] dark:bg-gray-700 px-4 py-2.5 flex items-center gap-2.5 border-b border-gray-300 dark:border-gray-600">
            {/* Traffic Light Buttons */}
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[inset_0_1px_1px_0_rgba(0,0,0,0.2)]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[inset_0_1px_1px_0_rgba(0,0,0,0.2)]"></div>
              <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-[inset_0_1px_1px_0_rgba(0,0,0,0.2)]"></div>
            </div>
            {/* Window Title */}
            <div className="flex-1 text-center">
              <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">Dashboard — Bilio</span>
            </div>
            {/* Spacer for symmetry */}
            <div className="w-[52px]"></div>
          </div>
          
          {/* Dashboard Content */}
          <div className="relative h-[700px] md:h-[800px] overflow-hidden mac-window-content">
            <SidebarProvider
              style={
                {
                  "--sidebar-width": "calc(var(--spacing) * 72)",
                  "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
              }
              className="h-full"
            >
              <AppSidebar variant="inset" />
              <SidebarInset className="h-full overflow-hidden">
                <SiteHeader />
                <div className="flex flex-1 flex-col overflow-auto h-[calc(100%-var(--header-height))]">
                  <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                      <SectionCards />
                      <div className="px-4 lg:px-6">
                        <ChartAreaInteractive />
                      </div>
                      <DataTable data={data} />
                    </div>
                  </div>
                </div>
              </SidebarInset>
            </SidebarProvider>
          </div>
        </div>
      </div>
    </>
  )
}
