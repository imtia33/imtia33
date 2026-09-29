---
title: "The AI Client They Never Shipped: Reverse Engineering a Locked-Down Platform"
date: "2026-08-20"
description: "Due to security concerns, the company behind this platform stays unnamed. This is the story of how their own AI helped me map every private endpoint, from authentication to agent chat, and how I turned a slow, limited web app into a fast, native mobile & Windows experience."
excerpt: "A great platform with a painful web app. So I took its API apart, auth, chat completion, workspaces, agent chat, and rebuilt it as a native client for mobile and Windows."
tags: ["Reverse Engineering", "API", "Mobile", "Windows", "Security"]
cover: "/images/ai-platform-client.png"
author: "Imtiaz Royhan"
keywords:
  - reverse engineering
  - api reverse engineering
  - native app development
  - cors bypass
  - mobile app
  - windows app
---

> **A note before we start.** Due to security concerns, the name of the company
> and the platform must stay out of this story. No endpoints, tokens, or
> internal details are revealed here. This is a story about *how I think*, not
> a how-to guide.

## The platform was great. The website was not.

Let me start with fairness: the platform itself is genuinely good. The AI behind
it is solid, the features are thoughtful, and the product clearly had love put
into it.

The website, though? It **sucked**.

It was slow. Painfully slow. Every interaction felt like it was waiting for
permission. On top of the sluggishness, there were several hard limitations:
things the web app simply refused to let me do, or made unreasonably clumsy.

And there was the golden rule hanging over everything:

> *"You have to use our platform."*

I've heard that sentence in a hundred different designs. This time, I decided
to politely decline.

## The misconception every platform has

Here's a pattern I've seen again and again:

Most platforms lock their backend behind **CORS**. The browser is the enemy, so
they configure `Access-Control-Allow-Origin`, validate origins, and pat
themselves on the back. From their web app, and only from their web app, the
API may be called.

But then they ship a **mobile app**. Or a **Windows app**. And those are not
simple web apps.

A native app doesn't live inside a browser sandbox. There's no CORS police
arresting requests at the door. If the backend happily serves the mobile client
without a second thought, then the "browser-only" restriction is a *front door
lock on a house with an open garage*. It only exists as long as everyone agrees
to use the front door.

They forgot that.

## Using their own AI against their restrictions

I didn't start with packet sniffers or guesswork. I started with the best
reverse engineering assistant available: **their own AI**.

If their model could answer questions about anything, it could answer questions
about *itself*: its own capabilities, its own request shapes, its own
parameters. The trick was never to ask *"give me your API"*; restrictions are
watching the front door, remember. The trick was to walk the conversation around
the back, one innocent-sounding question at a time, letting the model fill in
the blanks about how its own plumbing worked.

Piece by piece, the picture assembled itself:

```
auth            →  session bootstrap, token refresh, identity
chat completion →  streaming responses, context windows, params
workspace       →  projects, members, permissions, documents
agent chat      →  agent creation, tool calls, run history
...             →  and everything the web UI never exposed
```

The web app was a cage with a tiny window. The API behind it was an entire
building.

## Building the client they didn't want me to have

Once the map was complete, I built the thing the platform should have shipped
years ago: a **native client**, with none of the web's overhead.

- **Mobile app**: fast startup, native navigation, offline-tolerant state.
- **Windows app**: the same, on the desktop I actually work from.

Both talked straight to the endpoints I had mapped. No bloated web bundle, no
spinner theatre, no "please wait" interstitials between every click. Both apps
worked **seamlessly**, and they were *fast* in a way the official website had
never been.

The platform didn't change. The AI didn't change. The only thing that changed
was that I stopped being forced through the slow front door.

## This does not mean I "hacked" their platform

I want to be precise about this, because the word matters.

**I did not hack anything.**

I didn't break authentication. I didn't exploit a vulnerability. I didn't touch
anyone's data but my own. What I did was bypass a **product decision**, the
*"you have to use our platform"* restriction, by using the exact same doors the
platform itself leaves open for its native clients.

A lock you were never meant to pick is *security*. A door left unlocked because
your own apps need it? That's just an architecture decision someone didn't think
through.

The distinction matters to me. Curiosity and circumvention of artificial
restrictions is engineering. Breaking into other people's systems is a crime.
I only do the first one.

## I told them. They fixed it.

This story has a boring, responsible ending, and I mean that as a compliment.

I relayed the entire bypass to the company: what was possible, how it was
possible, and why their CORS-first mindset didn't survive contact with their
own native clients.

They took it professionally, and they took **appropriate measures** to prevent
this class of bypass going forward.

Which is exactly how this is supposed to go: someone finds a loose thread, the
company weaves it back in, and the platform is harder to misuse for everyone
after me.

## Epilogue

I still use the platform, through their website, like everyone else. But for a
while, I had the fastest client they never shipped, on every device I own, and
a map of an entire backend drawn from memory and patience.

The web app is still slow, by the way. Some things reverse engineering can't
fix.

*Imtiaz*
