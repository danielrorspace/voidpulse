import React, { useState } from "react";
import { EventEmitter } from "./useEventEmitter";
import { ChartTooltipInfo } from "../../utils/createExternalTooltipHandler";
import { FloatingPortal } from "@floating-ui/react";

export type TooltipData = {
  title?: string;
  subtitle?: string;
  dateString?: string;
  label?: {
    highlight?: string;
    annotation?: string;
  };
  sublabel?: {
    highlight?: string;
    annotation?: string;
  };
  percentChange?: {
    value: number;
    annotation?: string;
  };
  stripeColor?: string;
};

type Props = {
  $event: EventEmitter<ChartTooltipInfo | null>;
};

export const ChartTooltip: React.FC<Props> = ({ $event }) => {
  const [tooltipInfo, setTooltipInfo] = useState<null | ChartTooltipInfo>(null);

  $event.useSubscription((info) => {
    if (info?.posUpdate) {
      setTooltipInfo((d) => {
        if (!d) {
          return null;
        }
        return {
          ...d,
          waitForOnHover: false,
          left: info.left,
          top: info.top,
        };
      });
    } else {
      setTooltipInfo(info);
    }
  });

  if (!tooltipInfo || tooltipInfo.waitForOnHover) {
    return null;
  }

  const {
    left,
    top,
    title,
    subtitle,
    dateString,
    label,
    sublabel,
    percentChange,
    stripeColor,
  } = tooltipInfo;

  const inside = (
    <div
      className="absolute flex flex-row text-xs bg-primary-800 border border-primary-700 text-primary-100 p-2 rounded-lg shadow-lg z-20"
      style={{
        pointerEvents: "none",
        left: Math.min(left, window.innerWidth - 220),
        top: top,
      }}
    >
      <div
        className="rounded-full mr-2"
        style={{ width: "6px", backgroundColor: stripeColor }}
      />

      <div className="flex flex-col">
        <div className="font-semibold font-sm">{title}</div>
        <div className="text-primary-500">{subtitle}</div>
        <div className="text-xs text-primary-500">{dateString}</div>
        {/* Number of users/events */}
        <div className="mono-body mt-2">
          <div
            className="inline bg-primary-900/40 rounded-md"
            style={{ padding: 2 }}
          >
            {label?.highlight}
          </div>{" "}
          <span className="text-primary-500">{label?.annotation}</span>
        </div>
        <div>
          {sublabel?.highlight}{" "}
          <span className="text-primary-500">{sublabel?.annotation}</span>
        </div>
        {/* Shows if your data went up or down */}
        {percentChange ? (
          <div>
            <div
              className="inline mono-body bg-primary-900/40 rounded-md"
              style={{
                padding: 2,
                color: percentChange.value > 0 ? "teal" : "indianred",
              }}
            >
              {percentChange?.value}
              {"%"}
            </div>{" "}
            <div className="inline text-primary-500">
              {" "}
              {percentChange?.annotation}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );

  return <FloatingPortal>{inside}</FloatingPortal>;
};
