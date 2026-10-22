# How to use this kit in Antigravity

1. Create an empty folder `shruti-portfolio`, copy everything in this kit into it (including the hidden `.agent` folder), and open that folder as the Antigravity workspace.
2. Rules: `AGENTS.md` and `.agent/rules/portfolio.md` hold the always-on rules. If your Antigravity version looks for rules elsewhere, paste the contents of AGENTS.md into Settings > Rules (workspace).
3. Paste this into the agent to start Phase 0:

> Read AGENTS.md, docs/DESIGN.md, docs/CONTENT.md and docs/PLAN.md fully. Execute Phase 0 of docs/PLAN.md only. When the gate passes, summarize what you built and stop.

4. After Phase 0 passes, open the Agent Manager and start FIVE agents in parallel, one per workstream (A to E), each on its own branch/worktree. Use this prompt, changing the letter:

> You are workstream A in docs/PLAN.md. Read AGENTS.md, docs/DESIGN.md, docs/CONTENT.md and docs/PLAN.md. Build only the paths you own. Follow the motion budget exactly. Run lint and build, check the result in the browser at 360, 768 and 1440 widths, update docs/PROGRESS.md, then stop.

5. When all five finish, start ONE agent for Phase 2:

> Execute Phase 2 of docs/PLAN.md. Merge all ws-* branches, then do the motion audit, performance, accessibility and responsive passes. Report what you changed.

6. If an agent drifts mid-session, tell it: "Re-read AGENTS.md and docs/DESIGN.md, then continue."
