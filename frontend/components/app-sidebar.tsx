"use client"

import * as React from "react"
import {
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileDescription,
  IconFileWord,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Invoices",
      url: "#",
      icon: IconFileDescription,
    },
    {
      title: "Expenses",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "Clients",
      url: "#",
      icon: IconUsers,
    },
    {
      title: "Reports",
      url: "#",
      icon: IconChartBar,
    },
  ],
  navClouds: [
    {
      title: "Invoices",
      icon: IconFileDescription,
      isActive: true,
      url: "#",
      items: [
        {
          title: "All Invoices",
          url: "#",
        },
        {
          title: "Pending",
          url: "#",
        },
        {
          title: "Paid",
          url: "#",
        },
        {
          title: "Overdue",
          url: "#",
        },
      ],
    },
    {
      title: "Recurring",
      icon: IconFileWord,
      url: "#",
      items: [
        {
          title: "Active Recurring",
          url: "#",
        },
        {
          title: "Draft",
          url: "#",
        },
      ],
    },
    {
      title: "Expenses",
      icon: IconListDetails,
      url: "#",
      items: [
        {
          title: "All Expenses",
          url: "#",
        },
        {
          title: "By Category",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Tax Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Financial Summary",
      url: "#",
      icon: IconChartBar,
    },
    {
      name: "Client Portal",
      url: "#",
      icon: IconDatabase,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">BillStack</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
