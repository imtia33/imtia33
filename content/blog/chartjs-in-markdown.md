---
title: "Visualizing Data with Chart.js in Markdown"
date: "2026-09-09"
description: "A demo of embedding Chart.js charts directly in markdown blog posts using a custom fenced code block convention. Bar, line, and doughnut charts rendered server-side from JSON config."
tags: ["chartjs", "data-viz", "markdown", "demo"]
author: "Imtiaz Royhan"
cover: "/images/reads-over-time.png"
---

One of the things I wanted for this blog was the ability to drop a chart into a post without writing a React component every time. The solution: a custom fenced code block convention. If I write a fenced block tagged as `chart`, the markdown renderer parses the JSON inside and hands it to Chart.js.

## How it works

A chart block looks like this:

````
```chart
{
  "type": "bar",
  "data": {
    "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    "datasets": [
      {
        "label": "Contributions",
        "data": [12, 19, 3, 5, 2, 3],
        "backgroundColor": "#FD366E"
      }
    ]
  },
  "options": {
    "responsive": true,
    "plugins": { "legend": { "display": true } }
  }
}
```
````

The renderer detects the `chart` language tag, parses the JSON, and renders a responsive Chart.js chart. No extra components, no boilerplate.

## Monthly contributions

Here's a bar chart showing my GitHub contributions over the first half of the year:

```chart
{
  "type": "bar",
  "data": {
    "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    "datasets": [
      {
        "label": "2026 Contributions",
        "data": [42, 58, 31, 67, 89, 124],
        "backgroundColor": "rgba(253, 54, 110, 0.7)",
        "borderColor": "#FD366E",
        "borderWidth": 1
      }
    ]
  },
  "options": {
    "responsive": true,
    "plugins": {
      "legend": { "display": true, "position": "top" }
    },
    "scales": {
      "y": { "beginAtZero": true }
    }
  }
}
```

## Appwrite feature progress

A doughnut chart showing the done/pending split for the Appwrite feature timeline:

```chart
{
  "type": "doughnut",
  "data": {
    "labels": ["Done", "Pending"],
    "datasets": [
      {
        "data": [3, 8],
        "backgroundColor": ["#22c55e", "#94a3b8"],
        "borderColor": ["#16a34a", "#64748b"],
        "borderWidth": 2
      }
    ]
  },
  "options": {
    "responsive": true,
    "plugins": {
      "legend": { "display": true, "position": "right" }
    }
  }
}
```

## Tech stack radar

A line chart of my tech stack proficiency over time:

```chart
{
  "type": "line",
  "data": {
    "labels": ["2023", "2024", "2025", "2026"],
    "datasets": [
      {
        "label": "React Native",
        "data": [40, 65, 85, 95],
        "borderColor": "#FD366E",
        "backgroundColor": "rgba(253, 54, 110, 0.1)",
        "tension": 0.3,
        "fill": true
      },
      {
        "label": "Next.js",
        "data": [20, 45, 70, 88],
        "borderColor": "#3ECF8E",
        "backgroundColor": "rgba(62, 207, 142, 0.1)",
        "tension": 0.3,
        "fill": true
      },
      {
        "label": "Appwrite",
        "data": [10, 30, 60, 90],
        "borderColor": "#F38020",
        "backgroundColor": "rgba(243, 128, 32, 0.1)",
        "tension": 0.3,
        "fill": true
      }
    ]
  },
  "options": {
    "responsive": true,
    "plugins": { "legend": { "display": true } },
    "scales": {
      "y": { "beginAtZero": true, "max": 100 }
    }
  }
}
```

## The implementation

The renderer uses a custom `code` component in `react-markdown`. When the language is `chart`, it passes the JSON string to a client-side `<ChartBlock>` component that registers the Chart.js components and renders the chart. Charts are client-rendered because Chart.js needs a canvas, but the surrounding markdown is server-rendered for SEO and performance.

Inline code like `const x = 42` renders with a subtle background, while fenced code blocks get syntax highlighting and a copy button. Try clicking the copy button on any code block above.
