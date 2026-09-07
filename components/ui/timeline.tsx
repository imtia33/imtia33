/**
 * Timeline — EXACT reconstruction from HeroUI Pro's compiled bundle.
 * 
 * Original module ID: 326975
 * Uses exact class names and CSS custom properties as defined in global.css
 */

import React, { createContext, use, useMemo } from "react";
import { tv } from "tailwind-variants";

// ---------------------------------------------------------------------------
// Variants / slot classes — EXACT from HeroUI Pro source
// ---------------------------------------------------------------------------

const timelineStyles = tv({
  defaultVariants: {
    axis: "start",
    density: "comfortable",
    itemAlign: "start",
    size: "md",
  },
  slots: {
    base: "timeline",
    connector: "timeline__connector",
    content: "timeline__content",
    item: "timeline__item",
    marker: "timeline__marker",
    rail: "timeline__rail",
  },
  variants: {
    axis: {
      center: { base: "timeline--axis-center" },
      start: { base: "timeline--axis-start" },
    },
    density: {
      comfortable: { base: "timeline--comfortable" },
      compact: { base: "timeline--compact" },
    },
    itemAlign: {
      center: { item: "timeline__item--align-center" },
      start: { item: "timeline__item--align-start" },
    },
    size: {
      lg: { base: "timeline--lg", marker: "timeline__marker--lg" },
      md: { base: "timeline--md", marker: "timeline__marker--md" },
      sm: { base: "timeline--sm", marker: "timeline__marker--sm" },
    },
  },
});

// Simple className composer (avoids external dependency issues)
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// ---------------------------------------------------------------------------
// Contexts
// ---------------------------------------------------------------------------

type Axis = "start" | "center";
type Placement = "start" | "end" | "alternate";
type ItemAlign = "start" | "center";
type Side = "start" | "end";
type Status = "default" | "current" | "success" | "warning" | "danger" | "muted";

interface TimelineContextValue {
  axis: Axis;
  itemAlign: ItemAlign;
  placement: Placement;
  slots?: ReturnType<typeof timelineStyles>;
}

const TimelineContext = createContext<TimelineContextValue>({
  axis: "start",
  itemAlign: "start",
  placement: "end",
});

interface TimelineItemContextValue {
  align: ItemAlign;
  index: number;
  isLast: boolean;
  side: Side;
  status: Status;
}

const TimelineItemContext = createContext<TimelineItemContextValue>({
  align: "start",
  index: 0,
  isLast: false,
  side: "end",
  status: "default",
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Type guard: is this child a <Timeline.Item>? */
function isTimelineItem(node: React.ReactNode): node is React.ReactElement {
  return React.isValidElement(node) && node.type === TimelineItem;
}

/** Type guard: is this child a <Timeline.Marker>? */
function isTimelineMarker(node: React.ReactNode): node is React.ReactElement {
  return React.isValidElement(node) && node.type === TimelineMarker;
}

/** Type guard: is this child a <Timeline.Connector>? */
function isTimelineConnector(node: React.ReactNode): node is React.ReactElement {
  return React.isValidElement(node) && node.type === TimelineConnector;
}

/** Type guard: is this child a <Timeline.Rail>? */
function isTimelineRail(node: React.ReactNode): node is React.ReactElement {
  return React.isValidElement(node) && node.type === TimelineRail;
}

/**
 * Resolves which side ("start" | "end") an item's content should render on.
 */
function resolveSide(index: number, placement: Placement, explicitSide?: Side): Side {
  if (explicitSide) return explicitSide;
  if (placement === "alternate") return index % 2 === 0 ? "end" : "start";
  return placement as Side;
}

// ---------------------------------------------------------------------------
// Timeline (root)
// ---------------------------------------------------------------------------

interface TimelineProps extends React.OlHTMLAttributes<HTMLOListElement> {
  axis?: Axis;
  placement?: Placement;
  size?: "sm" | "md" | "lg";
  density?: "compact" | "comfortable";
  itemAlign?: ItemAlign;
  children?: React.ReactNode;
}

const TimelineRoot = ({
  axis = "start",
  children,
  className,
  density = "comfortable",
  itemAlign = "start",
  placement = "end",
  size = "md",
  ...rest
}: TimelineProps) => {
  const slots = useMemo(
    () => timelineStyles({ axis, density, itemAlign, size }),
    [axis, density, itemAlign, size]
  );

  const contextValue = useMemo<TimelineContextValue>(
    () => ({ axis: axis ?? "start", itemAlign: itemAlign ?? "start", placement, slots }),
    [axis, itemAlign, placement, slots]
  );

  const children_ = React.Children.toArray(children);

  // Count how many actual Timeline.Item children there are (for isLast).
  let itemCount = 0;
  children_.forEach((child) => {
    if (isTimelineItem(child)) itemCount++;
  });

  // Assign each Item its resolved index / isLast / side.
  let runningIndex = 0;
  const processedChildren = children_.map((child) => {
    if (!isTimelineItem(child)) return child;
    const index = runningIndex++;
    const side = resolveSide(index, placement, (child.props as any).side);
    return React.cloneElement(child, {
      _index: index,
      _isLast: index === itemCount - 1,
      _side: side,
      key: child.key ?? `timeline-item-${index}`,
    } as any);
  });

  return (
    <TimelineContext value={contextValue}>
      <ol
        className={cn(slots.base(), className)}
        data-axis={axis}
        data-placement={placement}
        {...rest}
      >
        {processedChildren}
      </ol>
    </TimelineContext>
  );
};

// ---------------------------------------------------------------------------
// Timeline.Item
// ---------------------------------------------------------------------------

interface TimelineItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  status?: Status;
  align?: ItemAlign;
  side?: Side;
  children?: React.ReactNode;
  // internal props injected by TimelineRoot:
  _index?: number;
  _isLast?: boolean;
  _side?: Side;
}

const TimelineItem = (props: TimelineItemProps) => {
  const {
    _index: injectedIndex,
    _isLast: injectedIsLast,
    _side: injectedSide,
    align: alignProp,
    children,
    className,
    side: sideProp,
    status: statusProp,
    ...rest
  } = props;

  const status: Status = statusProp ?? "default";
  const { itemAlign, placement, slots } = use(TimelineContext);

  const index = injectedIndex ?? 0;
  const isLast = injectedIsLast ?? false;
  const align = alignProp ?? itemAlign;
  const side = injectedSide ?? resolveSide(index, placement, sideProp);

  const itemContextValue: TimelineItemContextValue = { align, index, isLast, side, status };

  // Parse children into categories
  let railElement: React.ReactElement | null = null;
  const standaloneMarkers: React.ReactElement[] = [];
  const standaloneConnectors: React.ReactElement[] = [];
  const contentChildren: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      contentChildren.push(child);
      return;
    }
    
    if (isTimelineRail(child)) {
      railElement = child;
    } else if (isTimelineMarker(child)) {
      standaloneMarkers.push(child);
    } else if (isTimelineConnector(child)) {
      standaloneConnectors.push(child);
    } else {
      contentChildren.push(child);
    }
  });

  // Build the rail element - always ensure both Marker and Connector exist
  const railChild: React.ReactElement = (() => {
    // Determine the marker to use (user-provided or default)
    const markerElement = standaloneMarkers.length > 0 ? 
      (standaloneMarkers.length === 1 ? standaloneMarkers[0] : <>{standaloneMarkers}</>) : 
      <TimelineMarker />;
    
    // Determine the connector to use (user-provided or default)
    // IMPORTANT: Always include a connector unless user explicitly provides one
    const connectorElement = standaloneConnectors.length > 0 ?
      (standaloneConnectors.length === 1 ? standaloneConnectors[0] : <>{standaloneConnectors}</>) :
      <TimelineConnector />;

    // If user provided a Rail element, merge with our marker/connector
    if (railElement) {
      const existingChildren = (railElement.props as any).children;
      const hasExistingContent = existingChildren !== undefined && existingChildren !== null && existingChildren !== false;
      
      // Check if user's Rail already contains a Connector component
      let hasConnector = false;
      if (hasExistingContent && Array.isArray(existingChildren)) {
        existingChildren.forEach((child: React.ReactNode) => {
          if (React.isValidElement(child) && child.type === TimelineConnector) {
            hasConnector = true;
          }
        });
      } else if (hasExistingContent && React.isValidElement(existingChildren) && existingChildren.type === TimelineConnector) {
        hasConnector = true;
      }
      
      // Always merge to ensure connector is present
      return React.cloneElement(railElement, {
        children: (
          <>
            {markerElement}
            {hasConnector ? standaloneConnectors : connectorElement}
          </>
        )
      } as any);
    }
    
    // No Rail provided - create one with marker + connector
    return (
      <TimelineRail>
        {markerElement}
        {connectorElement}
      </TimelineRail>
    );
  })();

  const ariaCurrent = status === "current" ? "true" : undefined;
  const itemClassName = cn(slots.item(), className);

  return (
    <TimelineItemContext value={itemContextValue}>
      <li
        aria-current={ariaCurrent}
        className={itemClassName}
        data-align={align}
        data-index={index}
        data-last={isLast || undefined}
        data-side={side}
        data-status={status}
        data-slot="timeline-item"
        {...rest}
      >
        {/* Content FIRST (matches original HeroUI Pro DOM order) */}
        {contentChildren.length > 0 ? contentChildren : <TimelineContent />}
        {/* Rail SECOND */}
        {railChild}
      </li>
    </TimelineItemContext>
  );
};

// ---------------------------------------------------------------------------
// Timeline.Rail
// ---------------------------------------------------------------------------

interface TimelineRailProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

const TimelineRail = ({ children, className, ...rest }: TimelineRailProps) => {
  const { slots } = use(TimelineContext);

  // Use a ref to inspect DOM after render for accurate detection
  // For now, we'll use a simpler heuristic: count non-string/number children
  // that look like markers (have data-slot or specific props)
  
  const railClassName = cn(slots.rail(), className);

  return (
    <span className={railClassName} data-slot="timeline-rail" {...rest}>
      {children}
    </span>
  );
};

// ---------------------------------------------------------------------------
// Status-based inline SVG icons — EXACT paths from HeroUI Pro
// ---------------------------------------------------------------------------

interface StatusIconSVGProps {
  status: Status;
}

/**
 * Renders the exact SVG icon for each status type as used in HeroUI Pro.
 * These are 16x16 viewBox SVGs matching the original compiled output.
 */
function StatusIconSVG({ status }: StatusIconSVGProps) {
  switch (status) {
    case "current":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
          <path fill="currentColor" fillRule="evenodd" d="m4.843 10.944-.194 2.335a.204.204 0 0 0 .339.17l2.21-1.964.589.013L8 11.5c1.695 0 3.087-.44 4.02-1.177.89-.702 1.48-1.76 1.48-3.323s-.59-2.62-1.48-3.323C11.087 2.94 9.695 2.5 8 2.5s-3.087.44-4.02 1.177C3.09 4.38 2.5 5.437 2.5 7c0 1.648.656 2.742 1.648 3.448zm1.141 3.625 1.77-1.572Q7.875 13 8 13c3.866 0 7-2 7-6s-3.134-6-7-6-7 2-7 6c0 2.117.878 3.674 2.277 4.67l-.123 1.484a1.704 1.704 0 0 0 2.83 1.415" clipRule="evenodd" />
        </svg>
      );
    case "warning":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
          <path fill="currentColor" d="m14.61 6.914-7.632 8.08a1.614 1.614 0 0 1-2.69-1.66L5.5 10H2.677A1.677 1.677 0 0 1 1.12 7.7l2.323-5.807A2.22 2.22 0 0 1 5.5.5h4c.968 0 1.637.967 1.298 1.873L10 4.5h3.569a1.431 1.431 0 0 1 1.04 2.414" />
        </svg>
      );
    case "danger":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
          <path fill="currentColor" fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m2.121-8.707L8.061 4.232 6.35 5.943 5.646 5.24l2.12-2.121 2.122 2.121zM8 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2" clipRule="evenodd" />
        </svg>
      );
    case "success":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
          <path fill="currentColor" fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m3.1-8.55a.75.75 0 1 0-1.2-.9L7.419 8.858 6.03 7.47a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.13-.08z" clipRule="evenodd" />
        </svg>
      );
    case "muted":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
          <path fill="currentColor" fillRule="evenodd" d="M13.5 8a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0M8.75 4.5a.75.75 0 0 0-1.5 0V8a.75.75 0 0 0 .3.6l2 1.5a.75.75 0 1 0 .9-1.2l-1.7-1.275z" clipRule="evenodd" />
        </svg>
      );
    case "default":
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
          <path fill="currentColor" d="M8 8.5c3.85 0 7 2.5 7 4.5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2c0-2 3.15-4.5 7-4.5M8 10c-1.61 0-3.064.526-4.092 1.234C2.798 12.001 2.5 12.733 2.5 13a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5c0-.267-.297-1-1.408-1.766C11.064 10.526 9.609 10 8 10m0-9a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7m0 1.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
        </svg>
      );
  }
}

// ---------------------------------------------------------------------------
// Timeline.Marker
// ---------------------------------------------------------------------------

interface TimelineMarkerProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: Status;
  children?: React.ReactNode;
  /** Optional avatar image URL to render inside the marker */
  avatar?: string;
}

const TimelineMarker = ({ children, className, status: statusProp, avatar, ...rest }: TimelineMarkerProps) => {
  const { slots } = use(TimelineContext);
  const { status: itemStatus } = use(TimelineItemContext);
  const status = statusProp ?? itemStatus;

  // Determine marker content:
  // 1. If children provided explicitly, use those (icons, custom content)
  // 2. If avatar prop provided, render an image with HeroUI Pro structure
  // 3. Otherwise, auto-render status-based icon
  let markerContent: React.ReactNode;
  const hasAvatar = Boolean(avatar) || (React.isValidElement(children) && 
    (children as React.ReactElement).type === 'img');
  
  if (children && !avatar) {
    // Explicit children take priority (custom icons, SVGs, etc.)
    markerContent = children;
  } else if (avatar || hasAvatar) {
    // Avatar image support - matches HeroUI Pro structure
    const imgSrc = avatar || (React.isValidElement(children) ? (children as React.ReactElement).props.src : null);
    markerContent = (
      <span className="avatar avatar--lg size-full">
        <img
          className="avatar__image"
          src={imgSrc as string}
          alt=""
          draggable={false}
        />
      </span>
    );
  } else {
    // Auto-render status-based icon using original SVG paths
    markerContent = <StatusIconSVG status={status} />;
  }

  // Add extra classes for avatar markers (matches original HeroUI Pro output)
  const extraClasses = hasAvatar ? "size-7 overflow-hidden border-0 p-0 shadow-none" : "";
  const markerClassName = cn(slots.marker(), extraClasses, className);

  return (
    <span
      className={markerClassName}
      data-slot="timeline-marker"
      data-status={status}
      aria-hidden="true"
      {...rest}
    >
      {markerContent}
    </span>
  );
};

// ---------------------------------------------------------------------------
// Timeline.Connector
// ---------------------------------------------------------------------------

interface TimelineConnectorProps extends React.HTMLAttributes<HTMLSpanElement> {
  force?: boolean;
}

const TimelineConnector = ({ className, force, ...rest }: TimelineConnectorProps) => {
  const { slots } = use(TimelineContext);
  const { isLast } = use(TimelineItemContext);

  // Connectors are hidden automatically for the last item, unless forced.
  if (isLast && !force) return null;

  const connectorClassName = cn(slots.connector(), className);

  return (
    <span
      aria-hidden="true"
      className={connectorClassName}
      data-force={force || undefined}
      data-slot="timeline-connector"
      {...rest}
    />
  );
};

// ---------------------------------------------------------------------------
// Timeline.Content
// ---------------------------------------------------------------------------

interface TimelineContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: Side;
  children?: React.ReactNode;
}

const TimelineContent = ({ children, className, side: sideProp, ...rest }: TimelineContentProps) => {
  const { slots } = use(TimelineContext);
  const { side: itemSide } = use(TimelineItemContext);
  const side = sideProp ?? itemSide;

  const contentClassName = cn(slots.content(), className);

  return (
    <div className={contentClassName} data-side={side} data-slot="timeline-content" {...rest}>
      {children}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Public exports
// ---------------------------------------------------------------------------

export const useTimelineItem = () => use(TimelineItemContext);

export const Timeline = Object.assign(TimelineRoot, {
  Connector: TimelineConnector,
  Content: TimelineContent,
  Item: TimelineItem,
  Marker: TimelineMarker,
  Rail: TimelineRail,
  Root: TimelineRoot,
  useItem: useTimelineItem,
});

export default Timeline;
