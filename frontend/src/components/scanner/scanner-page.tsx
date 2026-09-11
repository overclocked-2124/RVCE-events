"use client";

import React, { useState } from "react";
import { ScannerGateView } from "./scanner-gate-view";
import { ScannerActiveView } from "./scanner-active-view";

export function ScannerPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  if (!isUnlocked) {
    return <ScannerGateView onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <ScannerActiveView 
      initialCheckedIn={142} 
      capacity={200}
      eventTitle="HackRVCE 2026"
      clubName="Coding Club RVCE"
    />
  );
}
