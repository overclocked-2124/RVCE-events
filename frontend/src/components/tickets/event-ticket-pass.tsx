"use client";

import React from "react";
import { QRCodeSVG } from "qrcode.react";

export type TicketStatus = "CONFIRMED" | "CHECKED_IN" | "GENERAL_ADMISSION" | "VIP";

export interface EventTicketProps {
  /** Alphanumeric unique identifier, e.g. "RVCE-EVT-98213" */
  ticketCode: string;
  /** Full Title of the Event */
  eventTitle: string;
  /** Organizing club or department name, e.g. "Coding Club RVCE" */
  clubName: string;
  /** Human readable or formatted date, e.g. "Sat, Oct 24, 2026" */
  date: string;
  /** Scheduled time slot, e.g. "10:00 AM - 4:00 PM" */
  time: string;
  /** Venue or hall name, e.g. "IEM Auditorium, Mechanical Block" */
  venue: string;
  /** Full attendee name */
  attendeeName: string;
  /** Attendee University Seat Number */
  usn: string;
  /** Academic department badge, e.g. "CSE", "ISE", "ECE" */
  department: string;
  /** Token or URL payload encoded into the scannable QR */
  qrPayload: string;
  /** Current state / tier badge */
  status?: TicketStatus;
  /** Important admission instructions */
  admissionNotes?: string;
  /** Render ticket skeleton state */
  isLoading?: boolean;
  /** Optional custom class name */
  className?: string;
}

export const EventTicketPass: React.FC<EventTicketProps> = ({
  ticketCode,
  eventTitle,
  clubName,
  date,
  time,
  venue,
  attendeeName,
  usn,
  department,
  qrPayload,
  status = "CONFIRMED",
  admissionNotes = "Present this QR code at the entrance for verification. Non-transferable.",
  isLoading = false,
  className = "",
}) => {
  if (isLoading) {
    return (
      <div
        className={`relative mx-auto w-full max-w-3xl animate-pulse rounded-2xl border border-[rgba(253,205,215,0.2)] bg-[#1e1b4b] p-6 shadow-2xl ${className}`}
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4 py-2">
            <div className="h-6 w-1/3 rounded-full bg-[rgba(253,205,215,0.15)]" />
            <div className="h-9 w-3/4 rounded bg-[rgba(253,205,215,0.15)]" />
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="h-10 rounded bg-[rgba(253,205,215,0.1)]" />
              <div className="h-10 rounded bg-[rgba(253,205,215,0.1)]" />
              <div className="h-10 rounded bg-[rgba(253,205,215,0.1)]" />
              <div className="h-10 rounded bg-[rgba(253,205,215,0.1)]" />
            </div>
          </div>
          <div className="w-full md:w-56 border-t md:border-t-0 md:border-l border-dashed border-[rgba(253,205,215,0.2)] pt-6 md:pt-0 md:pl-6 flex flex-col items-center justify-center space-y-3">
            <div className="h-40 w-40 rounded-xl bg-[rgba(253,205,215,0.15)]" />
            <div className="h-4 w-24 rounded bg-[rgba(253,205,215,0.1)]" />
          </div>
        </div>
      </div>
    );
  }

  const isCheckedIn = status === "CHECKED_IN";

  return (
    <div
      className={`relative mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-[rgba(253,205,215,0.25)] bg-[#1D1568] text-[#FDCDD7] shadow-[0_20px_50px_rgba(0,0,0,0.4)] print:border-black print:bg-white print:text-black print:shadow-none ${
        isCheckedIn ? "opacity-75 grayscale-[25%]" : ""
      } ${className}`}
    >
      {/* Perforated edge notches (Ticket Stubs) */}
      <div className="hidden md:block absolute -top-4 right-[232px] h-8 w-8 rounded-full bg-[#4A32F9] border-b border-[rgba(253,205,215,0.25)] print:hidden" />
      <div className="hidden md:block absolute -bottom-4 right-[232px] h-8 w-8 rounded-full bg-[#4A32F9] border-t border-[rgba(253,205,215,0.25)] print:hidden" />

      {/* Checked-In Stamp Overlay */}
      {isCheckedIn && (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <div className="rotate-[-18deg] rounded-xl border-4 border-emerald-400/80 px-8 py-2 text-3xl md:text-5xl font-extrabold uppercase tracking-widest text-emerald-300 backdrop-blur-xs shadow-2xl">
            CHECKED IN
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row">
        {/* Main Body */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
          <div>
            {/* Header / Badges */}
            <div className="flex items-center justify-between gap-2 pb-4">
              <span className="inline-flex items-center rounded-full border border-[rgba(253,205,215,0.3)] bg-[rgba(253,205,215,0.1)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#FDCDD7]">
                {clubName}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                  isCheckedIn
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-[#FF9E85]/20 text-[#FF9E85] border border-[#FF9E85]/40"
                }`}
              >
                {status.replace("_", " ")}
              </span>
            </div>

            {/* Event Title */}
            <h2 className="font-aalto text-2xl md:text-4xl text-[#FFE3EA] leading-tight tracking-wide mb-6">
              {eventTitle}
            </h2>

            {/* Event Schedule & Location Grid */}
            <div className="grid grid-cols-2 gap-4 border-t border-b border-[rgba(253,205,215,0.15)] py-4 my-2">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#B9AEDD]">Date</p>
                <p className="font-semibold text-sm md:text-base text-[#F4F1FF]">{date}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#B9AEDD]">Time</p>
                <p className="font-semibold text-sm md:text-base text-[#F4F1FF]">{time}</p>
              </div>
              <div className="col-span-2">
                <p className="text-[11px] uppercase tracking-wider text-[#B9AEDD]">Venue</p>
                <p className="font-semibold text-sm md:text-base text-[#F4F1FF]">{venue}</p>
              </div>
            </div>

            {/* Attendee Verification Grid */}
            <div className="grid grid-cols-2 gap-4 pt-3">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#B9AEDD]">Attendee</p>
                <p className="font-semibold text-sm md:text-base text-[#FFE3EA] truncate">
                  {attendeeName}
                </p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#B9AEDD]">USN & Dept</p>
                <p className="font-mono text-sm md:text-base font-medium text-[#FFE3EA]">
                  {usn} <span className="text-xs text-[#B9AEDD]">({department})</span>
                </p>
              </div>
            </div>
          </div>

          {/* Footer Fineprint */}
          <div className="pt-6 border-t border-[rgba(253,205,215,0.1)] mt-4">
            <p className="text-[11px] leading-relaxed text-[#B9AEDD]">
              {admissionNotes}
            </p>
          </div>
        </div>

        {/* Perforated Divider */}
        <div className="relative flex md:flex-col items-center justify-center">
          <div className="w-full md:w-0 h-0 md:h-full border-t-2 md:border-t-0 md:border-l-2 border-dashed border-[rgba(253,205,215,0.25)]" />
        </div>

        {/* QR Stub / Verification Sidebar */}
        <div className="w-full md:w-60 bg-[#1e1b4b] p-6 flex flex-col items-center justify-between text-center print:bg-white">
          <div className="w-full flex flex-col items-center">
            <p className="text-[11px] uppercase tracking-widest text-[#B9AEDD] mb-3">
              Scan for Entry
            </p>

            {/* QR Code Container */}
            <div className="rounded-2xl bg-white p-3 shadow-md border-2 border-[rgba(253,205,215,0.3)] flex items-center justify-center">
              <QRCodeSVG
                value={qrPayload}
                size={144}
                level="H"
                includeMargin={false}
                aria-label={`QR Code for ticket ${ticketCode}`}
              />
            </div>

            {/* Alphanumeric Ticket Code */}
            <div className="mt-4">
              <span className="text-[10px] uppercase tracking-wider text-[#B9AEDD] block">
                Pass Code
              </span>
              <span className="font-mono font-bold text-sm tracking-wider text-[#F4F1FF]">
                {ticketCode}
              </span>
            </div>
          </div>

          <div className="mt-6 w-full text-[10px] text-[#B9AEDD]/80">
            RVCE Digital Pass System
          </div>
        </div>
      </div>
    </div>
  );
};