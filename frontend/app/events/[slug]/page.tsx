import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { EventDetailsView } from "@/src/components/events/event-details-view";
import { MOCK_EVENTS } from "@/src/components/events/mock-events";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static params for all mock events (optional; works in dynamic mode too).
 */
export async function generateStaticParams() {
  return Object.keys(MOCK_EVENTS).map((slug) => ({ slug }));
}

/** Dynamic metadata for SEO */
export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = MOCK_EVENTS[slug];

  if (!event) {
    return { title: "Event Not Found — RVCE Events" };
  }

  return {
    title: `${event.title} — RVCE Events`,
    description: event.description.slice(0, 160),
    openGraph: {
      title: event.title,
      description: event.description.slice(0, 160),
      images: [{ url: event.bannerUrl }],
    },
  };
}

/**
 * Event Details page at /events/[slug].
 * Serves mocked data — no backend involved.
 */
export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = MOCK_EVENTS[slug];

  if (!event) {
    notFound();
  }

  const relatedEvents = Object.values(MOCK_EVENTS).filter((e) => e.slug !== slug);

  return <EventDetailsView event={event} relatedEvents={relatedEvents} />;
}
