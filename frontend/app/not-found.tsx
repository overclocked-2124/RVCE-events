import type { Metadata } from "next";
import { NotFoundView } from "@/src/components/feedback/not-found-view";

export const metadata: Metadata = {
  title: "404 — Lost on Campus | RVCE Events",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  // The events catalog route does not exist yet, so both CTAs resolve to the
  // landing page. Point `exploreHref` at /events once that route ships.
  return <NotFoundView homeHref="/" exploreHref="/" />;
}
