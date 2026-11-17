// ---------------------------------------------------------------------------
// LOCAL FEATURED ENTRY — Driver Check-in & Dispatch Management System.
// This project is NOT in Sanity yet, so it lives here as one clearly-marked
// local entry, merged at the top of the Projects section.
// WHEN YOU ADD IT AS A PROJECT DOCUMENT IN SANITY, DELETE THIS FILE'S
// ENTRY (and the import in components/projects.tsx + app/projects/[slug]).
// Facts only — from the production build (BUILD R24) at GoBolt. No public
// demo, no public repo, no spreadsheet ID or Apps Script URL is published.
// ---------------------------------------------------------------------------
import type { Project } from "./types";

export const FEATURED_LOCAL_SLUG = "driver-check-in-dispatch-system";

export interface CaseStudy {
  problem: string;
  solution: string;
  features: string[];
  contribution: string;
  challenges: string[];
}

export interface FeaturedProject extends Project {
  caseStudy: CaseStudy;
  category: "logistics";
  internal: true;
}

export const driverCheckInProject: FeaturedProject = {
  _id: "local-driver-check-in",
  title: "Driver Check-in & Dispatch Management System",
  description:
    "A Google Apps Script + Google Sheets system for warehouse driver check-in, route validation, dispatch and a real-time serving board — built for daily parcel operations at GoBolt.",
  image: null,
  tags: ["Google Apps Script", "Google Sheets", "JavaScript", "HTML", "CSS", "Warehouse Operations"],
  gradient: "from-blue-500 to-violet-600",
  featured: true,
  order: 0,
  category: "logistics",
  internal: true,
  // Top-level fields matching the Sanity project schema, so this entry can
  // be copied into Studio as a project document as-is.
  problem:
    "Drivers arriving at the warehouse needed a reliable way to check in against the day's dispatch plan, be validated against their assigned route, and be queued fairly when dock capacity was full — without paper lists or shouting across the dock.",
  solution:
    "A four-page Apps Script web app (Driver, Admin, Serving, Driver Status) backed by Google Sheets. Drivers check in with authentication and route validation; the system enforces a warehouse geofence, manages a live queue, and shows a real-time serving board so the dock team always knows who is loading, waiting, or done.",
  features: [
    "Driver check-in with authentication and route validation",
    "Warehouse geofence — 300 m radius around the warehouse pin",
    "Live queue: drivers within capacity start in Loading; queued drivers are promoted to Loading when a spot frees",
    "Driver self-cancel on Queued / Waiting / Loading, and admin promote-to-loading",
    "Per-zone maximum active drivers, with zones by parcel-zone letter and live dock assignments",
    "Expected vs Checked-in, built from the Dispatch sheet, with a missing-count badge",
    "Real-time serving board (15 s poll) and driver status page (10 s poll) that skip rebuilding when data is unchanged",
    "Daily Records sheet, auto-synced from login activity",
    "Missing Packages and Missorted Packages — Admin-only, with tracking-ID search",
    "Shift summary panel with Copy, and promotion alerts (banner, beeps, vibration)",
    "Admin edit and delete on driver cards; dark / light theme on all pages",
  ],
  contribution:
    "Designed and built the whole system end to end — data model across the Drivers, Logins, Missing Packages, Dispatch, Daily Records and Missorted sheets, the check-in and queue rules, the admin and serving screens, and the operational settings — and kept shipping tested builds (currently BUILD R24) while it ran in daily production use.",
  challenges: [
    "Queue fairness: a freed spot must promote the next queued driver straight to Loading, without losing anyone's place or letting two drivers take the same spot.",
    "Polling without disruption: the 15-second Admin/Serving and 10-second Driver Status polls must refresh live data without collapsing open package sections or rebuilding the page when nothing changed.",
    "Geofence honesty: check-in is blocked outside the warehouse radius, but driver coordinates are never stored.",
    "Optional-everything settings: zones and docks are both optional, and a cleared value must stay cleared rather than silently reverting.",
  ],
  journey: [
    { title: "Check-in", line: "Driver authenticates, route validated, inside 300 m geofence.", status: "CHECKED IN" },
    { title: "Loading", line: "Within capacity → Loading. Otherwise Queued, then promoted.", status: "LOADING" },
    { title: "Serving", line: "Live board: Expected vs Checked-in, in real time.", status: "SERVING" },
    { title: "Complete", line: "Route done, next driver promoted, records updated.", status: "COMPLETE" },
  ],
  caseStudy: {
    problem:
      "Drivers arriving at the warehouse needed a reliable way to check in against the day's dispatch plan, be validated against their assigned route, and be queued fairly when dock capacity was full — without paper lists or shouting across the dock.",
    solution:
      "A four-page Apps Script web app (Driver, Admin, Serving, Driver Status) backed by Google Sheets. Drivers check in with authentication and route validation; the system enforces a warehouse geofence, manages a live queue, and shows a real-time serving board so the dock team always knows who is loading, waiting, or done.",
    features: [
      "Driver check-in with authentication and route validation",
      "Warehouse geofence — 300 m radius around the warehouse pin",
      "Live queue: drivers within capacity start in Loading; queued drivers are promoted to Loading when a spot frees",
      "Driver self-cancel on Queued / Waiting / Loading, and admin promote-to-loading",
      "Per-zone maximum active drivers, with zones by parcel-zone letter and live dock assignments",
      "Expected vs Checked-in, built from the Dispatch sheet, with a missing-count badge",
      "Real-time serving board (15 s poll) and driver status page (10 s poll) that skip rebuilding when data is unchanged",
      "Daily Records sheet, auto-synced from login activity",
      "Missing Packages and Missorted Packages — Admin-only, with tracking-ID search",
      "Shift summary panel with Copy, and promotion alerts (banner, beeps, vibration)",
      "Admin edit and delete on driver cards; dark / light theme on all pages",
    ],
    contribution:
      "Designed and built the whole system end to end — data model across the Drivers, Logins, Missing Packages, Dispatch, Daily Records and Missorted sheets, the check-in and queue rules, the admin and serving screens, and the operational settings — and kept shipping tested builds (currently BUILD R24) while it ran in daily production use.",
    challenges: [
      "Queue fairness: a freed spot must promote the next queued driver straight to Loading, without losing anyone's place or letting two drivers take the same spot.",
      "Polling without disruption: the 15-second Admin/Serving and 10-second Driver Status polls must refresh live data without collapsing open package sections or rebuilding the page when nothing changed.",
      "Geofence honesty: check-in is blocked outside the warehouse radius, but driver coordinates are never stored.",
      "Optional-everything settings: zones and docks are both optional, and a cleared value must stay cleared rather than silently reverting.",
    ],
  },
};

export const featuredLocalProjects: FeaturedProject[] = [driverCheckInProject];
