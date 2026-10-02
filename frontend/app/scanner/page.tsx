import { Metadata } from "next";
import { ScannerPage } from "@/src/components/scanner/scanner-page";

export const metadata: Metadata = {
  title: "Live Scanner — RVCE Events",
  description: "Volunteer portal for event check-ins and access control.",
};

export default function Page() {
  return <ScannerPage />;
}
