---
layout: post
title: "Back with a Banger"
date: 2026-04-17
categories: [Personal, AI-Assisted Development, Game]
author: Tobias Eichermüller
---

It is fascinating what you can achieve when you put in enough time and curiosity.

<div style="margin: 1rem 0 1.5rem; padding: 1rem 1.2rem 1.1rem; border: 1px solid rgba(22, 163, 74, 0.35); border-radius: 14px; background: linear-gradient(135deg, rgba(22, 163, 74, 0.12), rgba(22, 163, 74, 0.04)); text-align: center;">
  <div style="display: inline-block; margin-bottom: 0.45rem; padding: 0.2rem 0.55rem; border-radius: 999px; background: rgba(22, 163, 74, 0.18); color: #166534; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;">
    The formula is simple:
  </div>
  <div style="font-size: clamp(1.4rem, 5vw, 2.25rem); font-weight: 600; letter-spacing: 0.03em; line-height: 1.2; color: #14532d;">
    Time x Curiosity = Something great
  </div>
</div>

Whenever I think about that, I'm reminded of something Andrej Karpathy said on the [Lex Fridman Podcast](https://www.youtube.com/watch?v=cdiD-9MMpb0&t=9383s):

> *"I'm kind of like a believer on a high level in this 10,000 hours kind of concept where you just kind of have to just pick the things where you can spend time and you care about and you're interested in. You literally have to put in 10,000 hours of work. It doesn't even matter as much where you put it, and you'll iterate and you'll improve."*

And that’s exactly how it was with my "Neunerln" project. I had a few nights over the Easter holidays and I wanted at all costs to build a card game that I could play online with others under my own rules and ideas. Since Neunerln is a regional variant of the more well-known [MauMau card game](https://en.wikipedia.org/wiki/Mau-Mau_%28card_game%29) specific to the [Oberpfalz](https://de.wikipedia.org/wiki/Oberpfalz) region of Bavaria, there was nothing like it available. Moreover, all existing implementations were either pretty "mau" or just plain "MauMau" 😉 (“mau” is German slang for “meh”). So I had to build it myself. I'll tell you upfront: it was a painful path, but also a genuinely exciting and insightful ride. My new buddy [Cursor](https://cursor.com/) and I vibed our way to ✌️ictory. I would even say that after some time I had created something like a development methodology that kinda worked for me.

## Cards on the Table (Look, Numbers, and Stack)

Before we revisit my bloody beginnings and the disastrous user interface, here's an overview of the game's current status, backed up by some figures and an overview of the techstack.

<p class="overview-block-label">Current Look</p>

<div class="blog-image-grid">
  <div class="blog-image-item">
    <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/cards-on-the-table-look-numbers-and-stack/01_login.png', 'Cards on the Table - Login screen')" class="blog-image-thumb">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/cards-on-the-table-look-numbers-and-stack/01_login.png" alt="Cards on the Table - Login screen" />
    </button>
    <em>Login screen</em>
  </div>
  <div class="blog-image-item">
    <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/cards-on-the-table-look-numbers-and-stack/02_email_link_login.png', 'Cards on the Table - Email link login form')" class="blog-image-thumb">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/cards-on-the-table-look-numbers-and-stack/02_email_link_login.png" alt="Cards on the Table - Email link login form" />
    </button>
    <em>Email link login form</em>
  </div>
  <div class="blog-image-item">
    <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/cards-on-the-table-look-numbers-and-stack/03_mail.png', 'Cards on the Table - Magic login link mail')" class="blog-image-thumb">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/cards-on-the-table-look-numbers-and-stack/03_mail.png" alt="Cards on the Table - Magic login link mail" />
    </button>
    <em>Magic login link mail</em>
  </div>
  <div class="blog-image-item">
    <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/cards-on-the-table-look-numbers-and-stack/04_lobby.png', 'Cards on the Table - Lobby with open tables')" class="blog-image-thumb">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/cards-on-the-table-look-numbers-and-stack/04_lobby.png" alt="Cards on the Table - Lobby with open tables" />
    </button>
    <em>Lobby with open tables</em>
  </div>
  <div class="blog-image-item">
    <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/cards-on-the-table-look-numbers-and-stack/05_waiting_room.png', 'Cards on the Table - Waiting room before match start')" class="blog-image-thumb">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/cards-on-the-table-look-numbers-and-stack/05_waiting_room.png" alt="Cards on the Table - Waiting room before match start" />
    </button>
    <em>Waiting room before match start</em>
  </div>
  <div class="blog-image-item">
    <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/cards-on-the-table-look-numbers-and-stack/06_profile.png', 'Cards on the Table - Profile side panel')" class="blog-image-thumb">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/cards-on-the-table-look-numbers-and-stack/06_profile.png" alt="Cards on the Table - Profile side panel" />
    </button>
    <em>Profile side panel</em>
  </div>
  <div class="blog-image-item">
    <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/cards-on-the-table-look-numbers-and-stack/07_game_rules.png', 'Cards on the Table - In app game rules panel')" class="blog-image-thumb">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/cards-on-the-table-look-numbers-and-stack/07_game_rules.png" alt="Cards on the Table - In app game rules panel" />
    </button>
    <em>In app game rules panel</em>
  </div>
  <div class="blog-image-item">
    <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/cards-on-the-table-look-numbers-and-stack/08_leaderboard.png', 'Cards on the Table - Leaderboard panel')" class="blog-image-thumb">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/cards-on-the-table-look-numbers-and-stack/08_leaderboard.png" alt="Cards on the Table - Leaderboard panel" />
    </button>
    <em>Leaderboard panel</em>
  </div>
  <div class="blog-image-item">
    <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/cards-on-the-table-look-numbers-and-stack/09_ingame.png', 'Cards on the Table - In game table view')" class="blog-image-thumb">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/cards-on-the-table-look-numbers-and-stack/09_ingame.png" alt="Cards on the Table - In game table view" />
    </button>
    <em>In game table view</em>
  </div>
  <div class="blog-image-item">
    <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/cards-on-the-table-look-numbers-and-stack/10_round_result.png', 'Cards on the Table - Round result dialog')" class="blog-image-thumb">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/cards-on-the-table-look-numbers-and-stack/10_round_result.png" alt="Cards on the Table - Round result dialog" />
    </button>
    <em>Round result dialog</em>
  </div>
</div>

<p class="overview-block-label">By the Numbers</p>

| Metric | Value |
|--------|-------|
| Lines of code | 96,500 |
| Total files | 369 |
| Commits | 189 (Fixes 47%, Features 35%, Chore 13%, Refactoring 5%) |
| Unit Tests (Vitest) | 270 |
| E2E Tests (Playwright) | 10 |
| Cursor plan files <br> `.plan.md` | 91 |
| Cursor skills <br> `.agents/skills/` | **start-dev** (run the app locally)<br>**auto-restart** (restart the local dev server so the latest code runs)<br>**qa-check** (run the full quality gate: lint, types, unit tests, build, plus end-to-end tests) <br>**cleanup** (remove dead code and duplication)<br>**commit** (concise commit message based on agent instructions and outcome)<br>**push** (stage, commit, and push only files changed in this chat thread)|
| Cursor rules <br> `.cursor/rules/` | **always-apply** (project-wide core rules)<br>**autonomous-workflow** (build, then validate with tests)<br>**design-system** (shared components over bespoke UI)<br>**ux-guidelines** (UX and visuals; screenshots)<br>**quality-assurance** (QA checklist after each change)<br>**testing** (automate logic and end-to-end flows)<br>**railway-cli** (prefer Railway CLI over the web console when available) |

<p class="overview-block-label">Tech Stack</p>

| Area | Details |
|------|---------|
| Frontend and app | Next.js 14, React 18, TypeScript 5 |
| Styling | Tailwind CSS, PostCSS, Autoprefixer |
| Animation | Framer Motion |
| Auth | NextAuth (Auth.js) 5 Beta |
| DB | PostgreSQL (pg) |
| Realtime | WebSocket (ws) |
| Server | Custom server with tsx |
| Quality | ESLint, Prettier |

## Well begun is half done (Plan Mode)

Getting started was quick. I opened Cursor and in lazy mode, ahem, plan mode, I described my personal vision for the game via voice chat. Since this is a common card game pattern, the coding agent understood the core mechanics fast. I let it research the game first, then I corrected the rules based on my own preferences. That part was still easy. 

It became harder when we moved toward online multiplayer questions. That was when I learned in the ongoing discussion that I needed WebSockets and could not simply host only a frontend on Vercel. Typical serverless hosting does not match a game that needs a long-lived connection to each client.

For UI and UX, the coding agent and I initially leaned on existing competitors. The card game baseline was basically solved (more on that later). 

Last but not least I deliberately kept technology and provider choices open, with one requirement only: use modern state-of-the-art options that are cost efficient and scalable. Many topics still stayed out of scope until the first locally playable version, including hosting, database, and mail delivery. That's it. After the long and insightful discussion, once we had settled the essential questions, I hit the Cursor build button for the first time.

## First Playable Build (Local Setup)

Creating code is one thing. Getting it to run locally is another.

To get to the first runnable version, I had to learn the basics. Start servers. As a semi-technical person, I kept having to look up how to start the right dev servers and scripts for each language in the mix. That sounds like friction, but it was never a real wall. I could either use Ask Mode or tell the coding agent to run the commands for me.

Early on the repo was split: a Python backend and a TypeScript frontend, so I had to run two dev servers in the right order. Over time I got used to doing parts of that myself, and I moved repeat flows into skills and commands like `/start-dev` and `/auto-restart`. More often than not though, manual execution was simply still the fastest option.

## Vibe Code Reality Check (User Interface)

The first user interface looked like one of those typical vibe coded apps you see everywhere. To be honest, I hated it. Still, I accepted it for the moment and focused on the basic game flow and rules. Yes, it had bugs, but you could actually play. 

Next, I really wanted proper Bavarian Tarock cards. It was a long road. At first I had to live with Jacks wearing steel helmets and Kings with spiky crowns. One thing I got right relatively early was the fan shaped card arrangement. I spent something like ten prompts on it. However, I will say up front that I later moved away from this whole visual direction, so my invested time there was basically down the drain.

Anyway, after fixing the fan layout, I could focus again on rules and UX flow.

> **Warning:** The following scenes may not appeal to viewers with an appreciation for aesthetics and design.

<div class="blog-image-grid blog-image-stack">
  <div class="blog-image-item">
    <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/vibe-code-reality-check-user-interface/vibecoded-slop-but-playable.png', 'Vibe Code Reality Check - First playable table')" class="blog-image-thumb">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/vibe-code-reality-check-user-interface/vibecoded-slop-but-playable.png" alt="Vibe Code Reality Check - First playable table" />
    </button>
    <em>Vibecoded slop, but playable</em>
  </div>
  <div class="blog-image-item">
    <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/vibe-code-reality-check-user-interface/crappy-hand-card-interactions.png', 'Vibe Code Reality Check - Mobile style interaction')" class="blog-image-thumb">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/vibe-code-reality-check-user-interface/crappy-hand-card-interactions.png" alt="Vibe Code Reality Check - Mobile style interaction" />
    </button>
    <em>Crappy hand card interactions</em>
  </div>
  <div class="blog-image-item">
    <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/vibe-code-reality-check-user-interface/faaaaan-layout-first-real-table-feeling.png', 'Vibe Code Reality Check - Early card layout')" class="blog-image-thumb">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/vibe-code-reality-check-user-interface/faaaaan-layout-first-real-table-feeling.png" alt="Vibe Code Reality Check - Early card layout" />
    </button>
    <em>Faaaaan layout &amp; first real table feeling</em>
  </div>
</div>

## Rules Under Pressure (Rules and UX-Flow)

You would think card game rules are easy to explain. But if you must explain them to a machine, it becomes a different challenge. Many MauMau and Neunerln variants exist online and partly contradict each other, and that headwind matters most when you try to turn the rule set into one consistent UX flow. The images below show several game states where I initially thought dialogs were mandatory. In the end I did not need them.

<div class="blog-image-grid blog-image-grid--two-up">
  <div class="blog-image-item">
    <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/rules-under-pressure-rules-and-ux-flow/penalty-7.png', 'Rules Under Pressure - Penalty dialog for 7 card')" class="blog-image-thumb">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/rules-under-pressure-rules-and-ux-flow/penalty-7.png" alt="Rules Under Pressure - Penalty dialog for 7 card" />
    </button>
    <em>penalty dialog for 7 card</em>
  </div>
  <div class="blog-image-item">
    <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/rules-under-pressure-rules-and-ux-flow/penalty-10.png', 'Rules Under Pressure - Penalty dialog for 10 card')" class="blog-image-thumb">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/rules-under-pressure-rules-and-ux-flow/penalty-10.png" alt="Rules Under Pressure - Penalty dialog for 10 card" />
    </button>
    <em>penalty dialog for 10 card</em>
  </div>
  <div class="blog-image-item">
    <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/rules-under-pressure-rules-and-ux-flow/play-10.png', 'Rules Under Pressure - Play 10 card dialog')" class="blog-image-thumb">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/rules-under-pressure-rules-and-ux-flow/play-10.png" alt="Rules Under Pressure - Play 10 card dialog" />
    </button>
    <em>play dialog for 10 card</em>
  </div>
  <div class="blog-image-item">
    <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/rules-under-pressure-rules-and-ux-flow/play-10-v2.png', 'Rules Under Pressure - Play 10 card dialog v2')" class="blog-image-thumb">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/rules-under-pressure-rules-and-ux-flow/play-10-v2.png" alt="Rules Under Pressure - Play 10 card dialog v2" />
    </button>
    <em>play dialog for 10 card v2</em>
  </div>
  <div class="blog-image-item">
    <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/rules-under-pressure-rules-and-ux-flow/penalty-10-counter.png', 'Rules Under Pressure - Penalty dialog for 10 card with counter option')" class="blog-image-thumb">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/rules-under-pressure-rules-and-ux-flow/penalty-10-counter.png" alt="Rules Under Pressure - Penalty dialog for 10 card with counter option" />
    </button>
    <em>penalty dialog for 10 card with counter option</em>
  </div>
  <div class="blog-image-item">
    <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/rules-under-pressure-rules-and-ux-flow/penalty-10-counter-final.png', 'Rules Under Pressure - Current counter flow without mandatory dialog')" class="blog-image-thumb">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/rules-under-pressure-rules-and-ux-flow/penalty-10-counter-final.png" alt="Rules Under Pressure - Current counter flow without mandatory dialog" />
    </button>
    <em>current 10 card counter state without dialog</em>
  </div>
</div>

I do not want to dig into the rules here, but one example is enough for context: there is a rule where you can counter an existing 10 card attack by playing another 10 as a counter. The last pair of screenshots above demonstrates the transformation from a heavy dialog to a dialogless UX flow. The following text is one of the prompts I used to get there.

```text
Here is the counter dialog that still needs adjustments.

If an opponent pushes me a card with a 10 card, no dialog should appear. Instead, that card should stay visible on my hand as face down until I tap it or until the next player is on turn.

When tapped, the card flips and can then be played normally.

As long as the card remains face down and I cannot see what is under it, I can use that card in this turn for a 10 counter.

I can only do a 10 counter if I also have a 10 and play it.

If I play my 10 on top of an already placed 10 and the received card has not been flipped yet, then after placing my 10 I can select one additional card except the already flipped one. This can also come from the draw pile.

Only after that should a dialog appear when I need to push two cards, or three or four if three or four 10 cards were stacked. That target player receives all those cards. I do not see what was under the face down cards except for the cards I selected myself.

Understood? If not, please ask questions.
```

Fun fact: I only had to adjust this game logic two more times after that. Of course, I could have crafted the prompt more cleanly, like in [Gherkin](https://en.wikipedia.org/wiki/Cucumber_%28software%29) style. But honestly, doing so takes more time than three iterations of fixing it to perfection with sloppy prompts, and I am dead sure about that, as you can see from the counter example below:

```gherkin
Feature: Ten card counter without an early penalty dialog

Scenario: A ten push arrives without blocking the table
Given an opponent pushes me a card together with a ten
When the pushed card appears on my hand
Then no dialog should open
And the pushed card stays face down until I tap it or until the next player is on turn

Scenario: Revealing the pushed card
Given a pushed card sits face down on my hand
When I tap that card
Then it flips face up
And I may play it like any other card afterward

Scenario: Ten counter while the pushed card is still hidden
Given the pushed card is still face down and I cannot see it
When it is still my turn
Then I may use that face down card toward a ten counter

Scenario: What a legal ten counter needs
Given I want to answer with a ten counter
Then I must also hold a ten and play that ten

Scenario: Stacking tens before anything is flipped
Given a ten is already on the discard pile
And the card I received with that ten is still face down
When I play my ten on that stack
Then after my ten is placed I may take exactly one more card into this resolution
And that card may not be an already flipped card
And that card may come from my hand or from the draw pile

Scenario: When the push dialog may return
Given the resolution reaches the point where I must push cards to another player
When two, three, or four tens were stacked in this chain
Then a dialog may appear only to push the matching count of cards
And the target player receives all of those cards
And I do not see what was under remaining face down cards except for cards I selected myself
```

But for me, asking directly without too much preparation in agent mode when uncertain, instead of over planning, became a good balance between implementation speed and quality in this project. At one point I even considered drawing a flowchart to describe parts of the game flow precisely (No I did NOT do that 😅). The rules were fiddly but solvable. It felt like specifying a new feature for an already well established legacy application with tons of edge cases and customization. Kinda my specialty.

As for user experience, several hundred games went into shaping a sensible flow step by step. Most of the friction sat in dialog-heavy situations. In the end I removed virtually all of those popups. On small viewports they were a nightmare anyway.

## Ship When Green (Tests, Lint, and Playwright)

So while I was still hardening the game rules, I also defined clear testing rules for the project itself. We (so mostly my buddy) added unit tests for all classes plus specific Playwright end to end tests. Every new feature and every change had to pass these tests, along with ESLint, typecheck, and `next build`, before the agent could return it as finished. Building this test setup early with Cursor was more than annoying, especially because I had little practical Playwright experience. The agent kept trying to convince me to run the tests myself instead. This sucker was even lazier than I was. I hated it whenever the agent tried to outsource the work back to me.

## One Stack to Rule Them (Backend Rework)
> **Warning:** Quick stop at theory station, no ticket required.

At some point during development I listened to a German podcast episode about spec driven development with Simon Martinelli from [Software Architektur im Stream](https://youtu.be/_VkC-CCEptk?t=501) (8:21 to 11:39). He explains why it helps to use the same technology and language in backend and frontend when coding agents are involved.

Here are his main arguments on that:

- Unified context: the agent does not have to jump between different language paradigms and frameworks, for example Java with Spring on one side and TypeScript with Angular on the other. The whole solution space stays in one language, which reduces false assumptions and syntax errors.
- Consistent guardrails: instead of separate best practices for frontend and backend, one shared set of architecture rules is enough. That makes it easier for the agent to follow them consistently.
- Less interface boilerplate: if frontend and backend are technologically closer, the agent needs to create and keep fewer complex REST contracts, DTOs, and validations in sync. Logic and UI can connect more directly, and boundary errors happen less often.
- End to end use cases in one pass: one functional flow can be represented in a few related files. The AI can keep the path from data layer to interface in one view, improving code coherence.

Inspired by that, I replaced the Python backend with Node.js and TypeScript and moved everything into one web app: UI, HTTP endpoints, and realtime all run in one server process, not as separate services in two languages. The game rules now live as shared TypeScript logic, so browser and server use the same mental model. Tests for rules and typical user paths stay in one ecosystem instead of maintaining a Python world and a JavaScript world in parallel.

The complete rework went surprisingly smoothly. Mostly one longer prompt, and nothing obviously blew up. Part of that is probably because the work sat mainly in backend logic, where changes are easier to land cleanly than in the UI, which almost always feels fiddlier. It also helped that tests and QA were already defined, so the agent knew what "done" meant.

## Kill Your Darlings (Mobile First and Design System)

I wanted to build the game mainly for myself at first. But once it started to take shape, I wanted to share it with other people. However, I could not simply tell them to run the local version with `npm run dev`. To make it even worse, in 2026 people are used to smartphones and tablets anyway. Is there still a normie out there who regularly uses a desktop PC or laptop? So my whole app had to become mobile first.

The biggest problem was my own stubbornness. I had fallen too much in love with the card fan, the typical semicircular hand layout, and with my beloved South, West, North, East player order, because I thought it matched real-life seating at a card table. On a phone-sized screen there simply was not enough space for that layout and that seating idea. That was "kill your darlings" in practice, a phrase that stuck with me after user-centered design training, shoutout to Prof. K. Beiderwellen.

Instead, cards are now arranged linearly with dynamic overlap so total width stays constant, independent of hand size. Furthermore, I placed all opponents in the north for three reasons:

1. In Neunerln you always play against everyone else, so they naturally belong on the opposite side.

2. East and West can be used for side panels and a vertical action bar. This makes sense because smartphone players mainly use their thumbs, and a right side action bar is easy to reach.

3. This draws focus to the lower half of the screen, including draw pile and discard pile plus the player's own cards, which are touched frequently and must be easy to reach.

Finally, I let the game table fill essentially the whole viewport, so cards and piles get maximum space inside the page. I removed outer frame elements and moved all functionality into the vertical action bar. Where deeper guidance was needed, I used a side panel. To maximize space, I enabled browser fullscreen by default in game, which worked well in decent browsers (no, Safari, you are not part of that collection).

<div class="four-up-gallery">
  <div>
    <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/kill-your-darlings-mobile-first-and-design-system/i-see-cards-everywhere.png', 'Kill Your Darlings, first mobile first iteration')" class="blog-image-thumb">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/kill-your-darlings-mobile-first-and-design-system/i-see-cards-everywhere.png" alt="Kill Your Darlings, first mobile first iteration" />
    </button>
    <em>v1 - I see cards everywhere!</em>
  </div>
  <div>
    <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/kill-your-darlings-mobile-first-and-design-system/edge-case-too-many-cards-on-hand-detected.png', 'Kill Your Darlings, second mobile first iteration')" class="blog-image-thumb">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/kill-your-darlings-mobile-first-and-design-system/edge-case-too-many-cards-on-hand-detected.png" alt="Kill Your Darlings, second mobile first iteration" />
    </button>
    <em>v2 - Edge case "too many cards on hand" detected</em>
  </div>
  <div>
    <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/kill-your-darlings-mobile-first-and-design-system/too-much-outer-frames.png', 'Kill Your Darlings, current mobile first layout')" class="blog-image-thumb">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/kill-your-darlings-mobile-first-and-design-system/too-much-outer-frames.png" alt="Kill Your Darlings, current mobile first layout" />
    </button>
    <em>v3 - Too many outer frames</em>
  </div>
  <div>
    <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/kill-your-darlings-mobile-first-and-design-system/hello-vertical-action-bar.png', 'Kill Your Darlings, refined mobile first layout with design system consistency')" class="blog-image-thumb">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/kill-your-darlings-mobile-first-and-design-system/hello-vertical-action-bar.png" alt="Kill Your Darlings, refined mobile first layout with design system consistency" />
    </button>
    <em>v4 - Hello vertical action bar</em>
  </div>
</div>

Around this time, I also started to make sure the user interface looked and stayed consistent. Therefore, I asked my agent to introduce a design system. The agent aligned existing UI components and enforced a new ruleset so every newly introduced user interface only added a new component, or a variant of an existing one, when something was truly missing. This rule was not perfect, but it still helped with general controls like buttons, input fields, and banner messages.

## Sound Makes It Real (Audio and Voiceover)

At that point the game already looked really good, but without sound it still felt lameeee. Sound is a huge part of good interaction. We connect emotions to sound, at least I do. Even today I sometimes hear that classic [ICQ](https://www.icq.com/) tone [Oh Oh](https://www.youtube.com/watch?v=RhGHerssyk4) in my head when chatting and receiving a live message. I miss those times. Why did that disappear anyway? After that I never really jumped on the next messaging hype thing, which back then was Facebook Messenger, except later on WhatsApp, like probably nearly everybody. So yeah, good old Zuck still got me.

Back to the point. Online sound libraries had no fitting sounds. And yes, AI generated sounds were mostly poor. Whenever something was half decent, it still lacked originality and warmth. So I searched for our [Schafkopf cards](https://en.wikipedia.org/wiki/Schafkopf) at home, the same kind of deck people in Oberpfalz typically use for Neunerln, and I recorded classic card sounds with a microphone and [Audacity](https://www.audacityteam.org/), then edited them.

<div class="blog-image-single">
  <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/sound-makes-it-real-audio-and-voiceover/audacity.png', 'Audacity editing view for recorded card and voice sounds')" class="blog-image-thumb">
    <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/sound-makes-it-real-audio-and-voiceover/audacity.png" alt="Audacity editing view for recorded card and voice sounds" />
  </button>
  <em>Cleaning and trimming my own sound recordings in Audacity</em>
</div>

The card placement sound was the first one. As soon as it entered the game flow, it felt like finally hitting the rhythm of the melody. Smooth. Then I added draw and shuffle sounds. Because it was so much fun, I kept going and added many more sounds and variations.
But the real highlight was voice over. Hearing my own voice in Bavarian dialect for color calls or after wins like "Ja besser geht's ja gar net!" and losses like "Zefix" was next level. It worked so well that I not only played games for implementation and QA purposes, I also played extra games just for fun. Goal achieved.

<div class="blog-audio-row">
  <div>
    <strong>Card placement sound</strong><br />
    <audio controls preload="none">
      <source src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/sound-makes-it-real-audio-and-voiceover/card-placement-sound.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  </div>
  <div>
    <strong>Voice over win</strong><br />
    <audio controls preload="none">
      <source src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/sound-makes-it-real-audio-and-voiceover/voice-over-win.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  </div>
  <div>
    <strong>Voice over loss</strong><br />
    <audio controls preload="none">
      <source src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/sound-makes-it-real-audio-and-voiceover/voice-over-loss.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  </div>
</div>

## Let Them In (Auth)

Well, almost. We want real players, we want to track games and stats, and we may add an Elo rating later. So what do we need? You guessed it: login and authentication. For years I have avoided any platform in my personal life that did not offer SSO, the way the devil flees from holy water, so classic email-and-password registration was off the table for my app.

So I did what anyone without deep auth expertise would do: I SPENT HOURS READING DOCS.

Just kidding. I told Cursor to show me options that make sign in as easy as possible for users. We came to the conclusion that SSO with Google and Apple was the logical choice, because it covers nearly all smartphone users in my target group except a few outliers. But once again, I had not accounted for Apple. While the SSO setup itself is basically free, I still would have needed the Apple Developer Program for the very affordable *cough* 99 dollars. Come on Apple.

So I needed an alternative to cover the roughly 35 to 45 percent iOS share in German speaking countries: email magic link. In principle, just passwordless auth via email. For our target group, this also avoids password reset drama. The drama showed up in implementation instead. I had forgotten you still need an email provider to send messages. And those email templates also needed styling. Here too I went with the conventional state-of-the-art setup from [resend.com](https://resend.com/).

<div class="blog-image-grid blog-image-grid--three-up">
  <div class="blog-image-item">
    <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/let-them-in-auth/mail_v1.png', 'Email template preview first iteration')" class="blog-image-thumb">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/let-them-in-auth/mail_v1.png" alt="Email template preview first iteration" />
    </button>
    <em>v1 - default message by resend.com</em>
  </div>
  <div class="blog-image-item">
    <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/let-them-in-auth/mail_v2.png', 'Email template preview desktop mailbox view')" class="blog-image-thumb">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/let-them-in-auth/mail_v2.png" alt="Email template preview desktop mailbox view" />
    </button>
    <em>v2 - after some prompts</em>
  </div>
  <div class="blog-image-item">
    <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/let-them-in-auth/mail_v3.png', 'Email template preview mobile mailbox view')" class="blog-image-thumb">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/let-them-in-auth/mail_v3.png" alt="Email template preview mobile mailbox view" />
    </button>
    <em>v3 - after even more prompts</em>
  </div>
</div>

Let us put it this way: Google SSO was ten times faster to implement, especially because the coding agent guided me through the OAuth setup in Google Cloud Console. My default prompt in those cases was:

```text
Guide me through the configuration step by step.
```

supported by the following prompt

```text
Here is a screenshot of the exact place where I currently am in the menu. Where do I go next?
```

As a final bonus, I also added a guest mode with no login at all, limited to three games, for the truly lazy users who want to skip onboarding and try it first. This is how my login page looked in the end after a couple of iterations.

<div class="four-up-gallery">
  <div>
    <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/let-them-in-auth/login_v1.png', 'Login screen iteration 1')" class="blog-image-thumb">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/let-them-in-auth/login_v1.png" alt="Login screen iteration 1" />
    </button>
    <em>v1 - only Google SSO</em>
  </div>
  <div>
    <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/let-them-in-auth/login_v2.png', 'Login screen iteration 2')" class="blog-image-thumb">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/let-them-in-auth/login_v2.png" alt="Login screen iteration 2" />
    </button>
    <em>v2 - more sign in options</em>
  </div>
  <div>
    <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/let-them-in-auth/login_v3.png', 'Login screen iteration 3')" class="blog-image-thumb">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/let-them-in-auth/login_v3.png" alt="Login screen iteration 3" />
    </button>
    <em>v3 - maybe guest login should be a separate block</em>
  </div>
  <div>
    <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/let-them-in-auth/login_v4.png', 'Login screen iteration 4, final layout')" class="blog-image-thumb">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/let-them-in-auth/login_v4.png" alt="Login screen iteration 4, final layout" />
    </button>
    <em>v4 - better make it clean and simple</em>
  </div>
</div>

## The CLI Advantage (Tooling for Agents)

Over time you get used to letting the agent handle everything. That makes it worth checking early, when you pick tools, whether they ship a proper CLI so the agent can drive them end to end. I did not do that during OAuth setup, but I did use it while setting up my [Neon database](https://neon.tech/) and while setting up hosting for the app on [Railway](https://railway.app/). Beautiful new world. In my private selection criteria, a good CLI now has the same critical importance as SSO.

Neon's homepage with its slogan is a pretty good example of this idea:

> Integrate with a single command and the LLM does the hard work.

<div class="blog-image-single">
  <button type="button" onclick="openBlogImageLightbox('{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/the-cli-advantage-tooling-for-agents/neon.png', 'Neon homepage hero with IDE, neonctl init in the terminal, and agent integration messaging')" class="blog-image-thumb">
    <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/the-cli-advantage-tooling-for-agents/neon.png" alt="Neon homepage hero with IDE, neonctl init in the terminal, and agent integration messaging" />
  </button>
  <em>Neon homepage: Postgres with an agent-focused CLI</em>
</div>

## Logo Lessons (Branding and Assets)

Some things are better left to dedicated experts, focused AI tools, or external providers. That includes all kinds of audio and visual assets. If coding agents and generic LLM providers struggle with one thing, it is producing stylistically strong and consistent assets. Sometimes you get lucky, but as soon as small edits are needed, outputs quickly become inconsistent and frustrating. So I chose a classic simple reproducible logo in SVG style after some very frustrating back and forth with AI-generated designs.

Below is a short sample of the "creative" AI output.

<div class="logo-lessons-gallery">
  <div class="logo-lessons-card">
    <div class="logo-lessons-card-visual">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/logo-lessons-branding-and-assets/cursor_v1.svg" alt="Logo draft from Cursor agent, version 1" />
    </div>
    <em>v1 - Maybe I'll let Cursor do this</em>
  </div>
  <div class="logo-lessons-card">
    <div class="logo-lessons-card-visual">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/logo-lessons-branding-and-assets/cursor_v2.svg" alt="Logo draft from Cursor agent, version 2" />
    </div>
    <em>v2 - OK, I'll give it another try</em>
  </div>
  <div class="logo-lessons-card">
    <div class="logo-lessons-card-visual">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/logo-lessons-branding-and-assets/gemini_v1.png" alt="AI generated ornate logo concept, Gemini version 1" />
    </div>
    <em>v3 - Ah, whatever. Nano Banana FTW</em>
  </div>
  <div class="logo-lessons-card">
    <div class="logo-lessons-card-visual">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/logo-lessons-branding-and-assets/gemini_v2.png" alt="AI generated ornate logo concept, Gemini version 2" />
    </div>
    <em>v4 - Not bad.</em>
  </div>
  <div class="logo-lessons-card">
    <div class="logo-lessons-card-visual">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/logo-lessons-branding-and-assets/gemini_v3.png" alt="AI generated ornate logo concept, Gemini version 3" />
    </div>
    <em>v5 - Just one minor change. Gosh, no!</em>
  </div>
  <div class="logo-lessons-card">
    <div class="logo-lessons-card-visual">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/logo-lessons-branding-and-assets/current_logo.svg" alt="Final simple reproducible logo in SVG" />
    </div>
    <em>v6 - Maybe we keep it simple and stick with Cursor</em>
  </div>
</div>

## Mockups as Thinking Tool (Ideation)

The same inconsistency problems largely apply to mockups as well. Whether I generated them directly in Cursor or in any other AI application with image generation support, they still cannot serve as a direct implementation blueprint for an agent. But they helped me evaluate ideas without immediately changing code. Before touching the repo, I used mockups to think through questions such as:

- What would the game look like without opponent cards?
- What would the game look like in a wood style?
- How could we introduce a Schafkopf knocking rule where points are doubled?

Some proposals were so far from reality and playability that you had to wonder whether the AI was secretly designing an art project or a new religion. Still, they pushed me into directions I would not have explored as quickly through coding alone. In the end, mockups were less "build exactly this" and more "let us see how wild this idea can get" before cutting it back to something implementable.

<div style="display: flex; flex-direction: column; gap: 12px; margin: 1rem 0 1.5rem;">
  <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-start;">
    <div style="flex: 1 1 45%; min-width: 0;">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/mockups-as-thinking-tool-ideation/mockup%20-%20without%20opponent%20cards.png" alt="mockup slop - without opponent cards - Player names appear twice" style="width: 100%; height: auto;" />
      <em>mockup slop - without opponent cards - Player names appear twice</em>
    </div>
    <div style="flex: 1 1 45%; min-width: 0;">
      <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/mockups-as-thinking-tool-ideation/mockup%20-%20double%20points.png" alt="mockup slop - double points - way too many non-fitting visuals" style="width: 100%; height: auto;" />
      <em>mockup slop - double points - way too many non-fitting visuals</em>
    </div>
  </div>
  <div style="min-width: 0;">
    <img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/mockups-as-thinking-tool-ideation/mockup%20-%20wood%20style.png" alt="mockup slop - wood style - is the menu now on top or bottom?!" style="width: 100%; height: auto;" />
    <em>mockup slop - wood style - is the menu now on top or bottom?!</em>
  </div>
</div>

## The Name Is the Game (Domain and Launch)

Buying a domain sounds simple until you are in the middle of it. Every marketplace flashes first year deals at you, while renewal prices quietly wait around the corner. I genuinely lost track of how many top-level domains exist. Still, `neunerln.by` looked tempting, even though I knew full well that `.by` means Belarus, not Bavaria. Anyway, [tld-list.com](https://tld-list.com/) helped me a lot, especially because you can sort and filter registration and renewal prices.

Right after I bought the domain, I hit the part of the launch I had feared most. As it turned out, that was the calmest stage of all. I expected some mystic ops ritual. In practice it was clicking through forms, typing DNS values, and waiting for propagation to finish. Almost disappointingly normal.

<img src="{{ site.baseurl }}/assets/images/blogposts/back-with-a-banger/the-name-is-the-game-domain-and-launch/DNS.png" alt="Spaceship DNS dashboard for neunerln.com with nameservers, propagation status, and empty custom records" />
<em>Default DNS only: nameservers live, no custom records yet.</em>

By contrast, what felt surreal was the sense that I had acquired a piece of the internet. Even though under the hood it is still just a rented row and a handful of records. But it is still mine, and it is <span style="display: inline-block; vertical-align: 0.08em; padding: 0.2rem 0.55rem; border-radius: 999px; background: rgba(22, 163, 74, 0.18); color: #166534; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;">LIVE</span>.

Time x Curiosity can truly reveal something great. In my case that turned out to be:

<div style="margin: 1.25rem 0 0.25rem; padding: 1.35rem 1.1rem 1.45rem; text-align: center; border: 1px solid rgba(22, 163, 74, 0.42); border-radius: 14px; background: linear-gradient(145deg, rgba(22, 163, 74, 0.14), rgba(22, 163, 74, 0.05)); box-shadow: 0 10px 30px rgba(15, 118, 110, 0.08);">
  
  <a href="https://neunerln.com/" style="display: inline-block; font-size: clamp(1.4rem, 5vw, 2.25rem); font-weight: 600; color: #14532d; text-decoration: none; letter-spacing: 0.03em; line-height: 1.2; border-bottom: 3px solid rgba(21, 128, 61, 0.45); padding-bottom: 0.08em;">Neunerln.com</a>
</div>
