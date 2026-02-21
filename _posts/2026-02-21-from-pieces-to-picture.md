---
layout: post
title: "From Pieces to Picture"
date: 2026-02-21
categories: [Personal, Leadership, Books, Podcast]
author: Tobias Eichermüller
---

And so the journey of chasing the holy grail continues. If your LinkedIn feed looks anything like mine, you've seen it: recycled wisdom optimized for engagement. Sometimes fully AI generated and completely interchangeable. You scroll, you nod, you forget. Don't get me wrong: AI generated content isn't inherently bad. The problem starts when your own ideas get blurred or diluted along the way. Or worse, when they never existed in the first place.

## Making It Click

For me, books are the antidote. LLMs and GenAI increasingly take over how we select and process information. I'm critical of this: context matters as much for humans as it does for machines. And context is exactly what books provide.

I think of it like a puzzle. A LinkedIn post is a single piece. You don't know what the full picture looks like or where it fits. A book gives you all the pieces and the picture on the box. Authors who've really thought through their subject will lay out their ideas and perspectives from different angles, building them up layer by layer. You get a 360 degree view. You see how topics flow into each other, how they connect and build. Always the same, but different. Until it finally clicks. This is what I call **"Repetitive Grind"**. Jeff Bezos put it similarly in a [conversation with Lex Fridman](https://youtu.be/DcWqzZ3I2cY?t=6124) (1:41:53 to 1:44:35):

> *"It's important to spend some of your time and some of your life doing long attention span things. Singular focus on a thing for prolonged periods of time. That's certainly what books do."*

## Making It Stick

But here's the thing: even a complete picture fades if you just passively consume it. I read several books in 2025 and wanted to write a year end review. Easier said than done. It's hard to remember details in retrospect, you know? Turns out, having the pieces isn't enough. You need to actively arrange them yourself. Writing things down in your own words. Reshaping ideas. Integrating them into your work. And writing works best when you share it. So here we are. From pieces to picture.

## The Book That Caught Me

![Book Cover]({{ site.baseurl }}/assets/images/blogposts/from-pieces-to-picture/book-cover-stanier.jpg)
*Become a Great Engineering Leader by James Stanier*

I wanted to sharpen my leadership skills. At the same time, the term Engineering Manager kept coming up at work. And with it, the question of who should ideally own the technology strategy and roadmap. So it made sense to dig into this from both angles.

What makes it special is that this book is Repetitive Grind in action. Vertically, because it covers the same topics from tactical, operational, and strategic perspectives. You see the career path unfold. Horizontally, because it structures related themes alongside each other. Take relationships: the book covers how to work with senior individual contributors, then peers, then your manager, then cross functional partners. Same core principle of achieving together. Different contexts. Each chapter builds on the previous one. You see the connections.

Three chapters resonated most with my current role and challenges. I want to briefly walk through my personal highlights on each of them. All quotes from here on are from Stanier's book.

## Boxes and Lines

> *"If you design an org chart well, you create the right conditions for teams to do their best work, often completely autonomously. If you design an org chart poorly, you can create a political environment where more energy is spent on fighting fires and resolving inner turmoil than is spent on actually getting the work done."*

This resonates with my experience. When structure is unclear, everything becomes a negotiation. Every decision requires a meeting. The actual work gets buried under process and politics.

Stanier illustrates this with an example in the book: a SaaS analytics company with four teams (Reviews, News, Social Media, and Data). The company had grown quickly. Engineers were unhappy. Commercial teams were frustrated with the speed of development. Clients complained about inconsistent UX, slow data updates, missing metadata. The product was successful, but the department was a mess.

The root cause? The Data team had to collaborate with every other team while also doing their own work. They ran the crawlers, managed storage, and consulted with three product teams. They became a bottleneck. Crawling speed suffered because it always lost priority to urgent requests from other teams. Meanwhile, each product team focused inward on their own area. Nobody owned the holistic user experience.

![Bad Org Chart Example]({{ site.baseurl }}/assets/images/org-chart-ai-generated-bad-example.png)
*AI generated illustration showing organizational bottlenecks*

The fix wasn't hiring more people or working harder. It was restructuring. The original four teams became seven:

- The overloaded Data team was split into three specialized teams: Crawling (focused solely on speed of data acquisition), Data Platform (storage with clear APIs), and Collection (collaborating with product teams on data quality, metadata, and crawling intervals).
- A new Dashboards team was created to own visual consistency and the holistic user experience.
- The three product teams (Reviews, News, Social Media) stayed, but now had clear interaction modes with the new teams instead of constantly consulting with Data.

Why seven instead of four? Because each team now had one clear focus. The Crawling team could finally prioritize speed without being pulled into storage issues. The Dashboards team could enforce consistency without fighting three product teams. The Data Platform team could build APIs instead of answering questions all day. The Collection team could ensure data quality without being overwhelmed by crawling and storage responsibilities.

The org chart itself was the problem. And the org chart was the solution.

In reality, it doesn't always work out this cleanly. Sometimes it really is just a resource problem. Other times you need flexibility and can't cut teams that finely. But when targeted organizational changes are possible, they can speed up decisions, reduce friction, and give focus. You get less mental load through fewer cognitive switches, and the team gets a personal boost when their mission is clear and they don't have to play the "jack of all trades" anymore.

### The Org Chart as a Tool

According to Stanier, a well designed org chart helps you:

| Benefit | Description |
|---------|-------------|
| **Clarify accountability** | The grouping of people into teams, groups, and departments makes it clear who owns which projects and parts of the products. |
| **Understand who manages who** | The edges between nodes make it clear who is accountable for the performance of others and allow for clear lines of escalation. |
| **Show relative investment** | Understanding the relative size of different teams shows where resources are currently allocated and helps plan for future investment. |
| **Encourage collaboration or autonomy** | By assigning related responsibilities to a group of teams, you encourage collaboration between them. Conversely, keeping teams separate encourages them to act autonomously. |
| **Avoid duplication** | A high level view of teams and responsibilities helps avoid duplication of effort when planning and executing projects. |

Simple in theory. The real challenge is actually doing it. It sounds obvious in hindsight, but it took me the repetitive grind of reading this book for it to really sink in. Org charts aren't just something you inherit or react to. They should be used proactively and deliberately to shape the future. Not just to document the present.

> *"You should therefore periodically review your org chart to ensure that it is still fit for the priorities of your organization. A typical cadence for doing this is once per year."*

### Span of Control

But even the best designed org chart falls apart if you get the span of control wrong. That's how many people each type of manager can or should handle. Stanier breaks it down with a scale, showing that depending on how many reports you have, you operate in a different mode.

![Number of Reports]({{ site.baseurl }}/assets/images/blogposts/from-pieces-to-picture/yourplaceintheorgchart/numberofreports.png)
*Source: Become a Great Engineering Leader by James Stanier*

| Reports <br><small>*(ranges overlap; boundaries are fluid)*</small> | Mode | Description |
|---------|------|-------------|
| 1 to 2 | **Redundant** | Not enough management work to stay utilized and grow. Should convert to IC or get a larger team. |
| 3 to 6 | **Hands on** | Works for managers who still contribute individually, are new to management, or act as technical leads. |
| 5 to 10 | **Ideal mix** | The sweet spot. Enough to delegate and provide guidance, not so many you lose effectiveness. This should be the majority of your organization. |
| 12 to 15 | **Coordinator** | Management and coordination tasks dominate. Everything runs through delegation. Sustainable only temporarily. |
| 15+ | **Diminished Impact** | Simply too much going on. Impact diminishes. Recipe for attrition. |

But what determines the ideal span? Stanier lists these factors:

| Factor | Description |
|--------|-------------|
| **Practical limits** | More people means more one on ones, more meetings, more topics. |
| **Seniority of the manager** | More experienced managers can handle larger spans. |
| **Seniority of the reports** | Senior staff are more self sufficient and need less guidance. |
| **Level of individual contribution** | Managers who still do hands on work need smaller teams. Those who delegate and focus on strategy can manage more. |
| **Type of work** | Highly collaborative teams work better with lower spans. Teams managing many independent streams can be bigger. |

Reading this made something click. With more than ten direct reports, I spend multiple hours every week on 1:1s alone. The math doesn't lie. I can't understand every topic in depth anymore without sacrificing the time and focus required to push strategic initiatives and drive change forward. What held me back wasn't just capacity. It was identity. I never wanted to become one of those managers who lose touch with the craft. I wanted to lead by example. I wanted to take things off people's plates when it got tough. I didn't want to leave them alone.

The uncomfortable truth is that sometimes my involvement wasn't help. It was perfectionism. Or control. Or unnecessary presence in meetings that didn't actually need me there, even if you don't always know that upfront. Accepting that my value is no longer in understanding every detail but in creating space for others changed how I see my role. Stepping back isn't abandoning the team. It's trusting them.

But even with the right structure in place, there's another trap waiting. You can have clear ownership, the right span of control, and well defined teams. And still drown.

## The Swamp

Never ending stream of tasks. Projects blur together. Priorities shift daily. Everything feels equally urgent.

Stanier calls this "the swamp."

> *"All of the projects you oversee, the conversations you have, and the decisions you make can become a never ending stream of tasks. The priority, framing, accountability, and meaning of everything become flattened."*

![The Swamp]({{ site.baseurl }}/assets/images/blogposts/from-pieces-to-picture/thegamesweplay/theswamp.png)
*Source: Become a Great Engineering Leader by James Stanier*

According to Stanier, the uncomfortable truth is that the swamp is actually a problem you caused yourself. All of the tasks and conversations are floating around in the mess because you and the people you work with haven't built the structure needed to organize, separate, and frame them. You deal with them randomly with no clear way to make sense of them.

I've been there. Regularly, if I'm honest. Managers in the swamp spend their days wading through the mess, stumbling across arbitrary tasks, projects, and decisions. At the beginning of the day, they have no idea what they are going to be doing. They roll up their sleeves and trouser legs and dive in. They bump into issues at random as they wade through the muddy water. A team is not performing as expected. Better look at that. Actually, isn't that someone else's responsibility? Oh, there are also some candidates to review for several open positions. Yep, better do that as well. Okay, what's next? Looks like there are some support issues. Better look at that, too.

You know you're in it when you can't answer "What are you working on?" without listing ten things. When every day feels like putting out fires. Continually reacting to one thing after another, dipping in and out of one project to the next while wading through mud, is exhausting.

### Finite Games

According to Stanier, the solution is to transform the swamp into finite games. The framework we use is that of [finite and infinite games](https://en.wikipedia.org/wiki/Finite_and_Infinite_Games), a model introduced by James Carse. Finite games are games that have a defined start and end, with a set of rules agreed upon by all players, and the aim is to win.

![Finite Games]({{ site.baseurl }}/assets/images/blogposts/from-pieces-to-picture/thegamesweplay/finitegameplatforms.png)
*Source: Become a Great Engineering Leader by James Stanier*

Stanier illustrates this with an example: same tasks, same swamp, but now with three clear goals on signs: "Grow team to 12", "Build new timeline", "Get app rating to 4.5". Each goal is a finite game with entry criteria, rules, and exit criteria. The chaos gets structure.

According to Stanier, each finite game has three components:

| Component | Description | Questions to Ask |
|-----------|-------------|------------------|
| **Entry criteria** | Define your current situation | What is the problem you are trying to solve? What is the opportunity you are trying to take advantage of? |
| **Rules** | Define the constraints you are operating within | Budget, timeline, resources. What are the boundaries? |
| **Exit criteria** | Define what winning looks like | What will you have achieved to know you have won? |

Instead of "What are you working on?" you ask "What game are you playing, and what does winning look like?" Suddenly, conversations have structure. Priorities become clear. In addition to enabling greater delegation, finite games enable far better coaching opportunities. You can frame your conversations around entry criteria, rules, and exit criteria. You can ask questions like, "what is the current situation that we are in?" This generates far more interesting conversations than status updates.

But here's the balance to strike: too many games, and your team fragments. Everyone is pulled in different directions, context switching becomes constant, and meaningful progress on any single game becomes impossible. Too few games, and you're back in the swamp. Without enough structure to organize your work, tasks float around aimlessly, priorities blur, and everything feels equally urgent. As you work with your staff, it is your job to keep the number of finite games at an appropriate level. According to Stanier, the main form of entropy in organizations is the gradual increase in the number of finite games being played to the point that the organization becomes unable to make meaningful progress on any of them.

Any time a new priority emerges, frame it as a finite game and ask the question: "Why now?" If it is important enough, the answer will be clear, and it will form the entry criteria for a new finite game. If it isn't, then it can be deprioritized until later. If it's the case that a new finite game needs to be played, then you can work with your staff to understand which of the existing ones can be paused in order to make space.

Given that there are clear exit criteria in each finite game, you and your staff have the ability to be creative in the way that you achieve them. Finding the fastest route to the exit within the rules is a key skill in leadership that you can use when coaching. Are you really on the fastest route to win? If not, what's blocking you, and what could you do differently?

### The Infinite Game

And then there's the bigger picture: finite games are tactical, collections of them are operational, and at the top sits the infinite game. The strategic level. Purpose, culture, values. Building a company that can keep playing forever. Infinite games have no defined start or end. The players come and go, and the rules change all of the time. The aim of the game is to keep playing.

![Games and Strategy]({{ site.baseurl }}/assets/images/blogposts/from-pieces-to-picture/thegamesweplay/gamesandstrategy.png)
*Source: Become a Great Engineering Leader by James Stanier*

> *"Your job as a leader is to ensure that all of the work that your organization is doing is contributing to the infinite game that you are playing."*

Every finite game should serve the infinite game. If it doesn't, why are you doing it?

Stanier illustrates this with an example: Consider two start ups. Both of them are building a similar product: a web application that allows people to manage their personal finances. Both of them are playing the same finite games: shipping features, hiring staff, and hitting targets for active users. Internally, at each company, however, the focus is different. The first company has defined its mission as "enabling the world to make better financial decisions." The second company has defined its mission as "become the first personal finances app to IPO."

During the early days of both companies, progress is similar when one is compared to the other. However, as time goes on, the differences become more apparent. The first company, with its mission to enable the world to make better financial decisions, invests in longer term initiatives such as producing financial education content, brokering partnerships with financial institutions, and investing heavily in customer support. The second company, because of its mission to IPO as quickly as possible, invests in shorter term initiatives, such as building features that will primarily increase the number of users and investing heavily in marketing campaigns with celebrities.

Over time, the first company becomes the market leader. It has a loyal user base that trusts it, the largest data sets and connectivity, the best customer support, and the most comprehensive educational content. The second company grows a large user base that eventually becomes frustrated at the pace of product development and the quality of the product, and so they switch to the first company. In an ironic twist, the first company IPOs, and the second company is acquired by it.

The difference between the two companies is the first company has aligned on playing an infinite game that is focused on the long term, and the second company is playing a finite game. Finite games steer you toward the exit criteria. Infinite games mean that you can continue playing, forever. If you don't understand the infinite game you're contributing toward, competitors that are playing one will outlast you.

In reality, finding the right number of finite games isn't always straightforward. Some work doesn't fit neatly into games, and priorities can shift faster than you can reframe them. But the framework still helps. It forces you and your team members to think about what you're actually trying to achieve and why. It becomes clearer where effort pays off most, and where it doesn't.

Finite games remind me of [OKRs](https://en.wikipedia.org/wiki/Objectives_and_key_results) (Objectives and Key Results). Both frameworks share the same core idea: define clear goals with measurable outcomes and a time frame. The key difference is that finite games add the dimension of entry criteria and rules, which makes them particularly useful for framing ongoing work and conversations. OKRs are typically set quarterly with an Objective and 3-5 Key Results, while finite games can be more flexible in duration and help you understand not just what you're doing, but why you're doing it and what winning looks like. For both frameworks, the infinite game equivalent would ideally be a company mission or vision that focuses on continuing to play indefinitely, rather than reaching short term financial goals.

## When to Call for Help

The third chapter that I found particularly valuable, it was actually more of a subchapter, deals with a situation that every leader and individual contributor faces: when you can't make a decision yourself and need help.

Consider this scenario: A critical security vulnerability needs immediate attention. But your team is also committed to launching a new feature in two weeks. Both can't happen. The security team wants to fix the vulnerability now. The product team needs the launch on time. Work blocked.

What do you do?

According to Stanier, **escalations are actually a healthy part of any organization** and a sign that you recognize when you need help. You escalate when you can't make a globally optimal decision at your level, either because you lack the authority or the information.

When you are faced with a situation that needs an escalation, follow this process:

- Identify the problem
- Get all parties to agree it should be escalated
- Work together to define the problem, choices, and ramifications of each choice
- Make a recommendation
- Escalate in writing and keep the conversation transparent so all parties can see it

But here's where most people fail. Most people either:

- Avoid escalating entirely
- Try to solve it themselves and fail
- Escalate poorly by dumping the problem on their manager

These two quotes explain what poorly executed escalations look like:

> *"Your staff don't enumerate the options. Your staff may come to you with a problem, but they don't have a clear set of options for you to choose from. This is an essential part of the escalation since it forces them to think through the situation clearly. Also, bluntly, if they don't, they are expecting you to do their work for them."*

> *"Your staff don't make a recommendation. You should not be doing their work for them. Ensure that a recommendation comes with any escalation, and push back on them until they can provide one."*

There are battles that make 100% sense objectively, but just aren't worth fighting. No escalation will help you there. Recognizing when to move on is a skill that comes with experience. But when you do escalate, well structured escalations build trust. They work when you do them right. When someone comes with a problem without options or a recommendation, in my experience that's not an escalation. That's reverse delegation.

## The Rest of the Puzzle

The book covers much more than these three chapters. It dives deep into performance management and raising standards, aligning engineering with business cycles and sales, budget management and financial planning, fostering collaboration between Engineering, Product, and UX teams, communicating effectively at scale and using writing as a thinking tool, developing and communicating strategy, and leading through different phases of company growth and difficulty. Each chapter builds on the previous ones, creating that repetitive grind effect I mentioned earlier.

But the chapters I mentioned above resonated most with my current work. They address the challenges I'm actively working through: leveraging organizational structure, transforming competing priorities into clear focus, and structuring escalations effectively.

If any of this speaks to you, I'd recommend picking up the book. The full picture is worth it.

From pieces to picture.
