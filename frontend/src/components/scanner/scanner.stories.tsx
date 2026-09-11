import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ScannerGateView } from "./scanner-gate-view";
import { ScannerActiveView } from "./scanner-active-view";
import { ScanResultOverlay } from "./scan-result-overlay";

const meta: Meta = {
  title: "Scanner/Portal",
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "cobalt" },
  },
};

export default meta;

export const PasscodeGate: StoryObj<typeof ScannerGateView> = {
  render: () => <ScannerGateView onUnlock={fn()} />,
  parameters: {
    viewport: { defaultViewport: "mobile2" },
  },
};

export const ActiveScanner: StoryObj<typeof ScannerActiveView> = {
  render: () => (
    <ScannerActiveView 
      initialCheckedIn={142} 
      capacity={200}
      eventTitle="HackRVCE 2026"
      clubName="Coding Club RVCE"
    />
  ),
  parameters: {
    viewport: { defaultViewport: "mobile2" },
  },
};

export const SuccessOverlay: StoryObj<typeof ScanResultOverlay> = {
  render: () => (
    <ScanResultOverlay 
      result="success" 
      attendee={{ name: "Ananya", usn: "1RV22CS045" }}
      onDismiss={fn()} 
    />
  ),
  parameters: {
    viewport: { defaultViewport: "mobile2" },
  },
};

export const DuplicateOverlay: StoryObj<typeof ScanResultOverlay> = {
  render: () => (
    <ScanResultOverlay 
      result="duplicate" 
      onDismiss={fn()} 
    />
  ),
  parameters: {
    viewport: { defaultViewport: "mobile2" },
  },
};

export const InvalidOverlay: StoryObj<typeof ScanResultOverlay> = {
  render: () => (
    <ScanResultOverlay 
      result="invalid" 
      onDismiss={fn()} 
    />
  ),
  parameters: {
    viewport: { defaultViewport: "mobile2" },
  },
};
