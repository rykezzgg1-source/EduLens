# EduLens — populated demonstration

The public interface is a browser-local, fully populated prototype. It contains ready-made Student, Teacher, Director and Deputy accounts and never invokes ChatGPT sign-in or sign-out. Selecting a test identity does not authenticate a real user or grant access to institutional server records.

## Demonstration data and persistence

`web/demo-engine.js` generates stable, linked fictitious data. Six catalog entries use verified real institution names and cities; three institutions are wholly fictitious. Each school demo has classes 1А–11Б. College and university groups have program-specific durations. Programs, group structures, pupils, staff, rooms, results, achievements and conversations are all explicitly fictitious, including inside real-named institutions. There is no affiliation claim and the catalog is not a complete national registry.

The model generates 22–28 learners per group, subject assignments, attendance, varied grades across equal comparison periods, individual and group achievements, conflict-free lessons, homework, curriculum diagnostics, hour plans, announcements, active and closed polls, events, subject chats and private appeal examples.

Only changes to the generated model are saved in localStorage under `edulens-demo-v2`, rather than the full seed. Account selection, grades, history, messages, votes, timetable changes, memberships and profile settings survive reloads and role switches in the same browser. Other devices have independent data. Storage errors are reported and mutations roll back in memory. Reset removes only this key, leaving the old `edulens-v1` workspace and server records intact. Demo file attachments are limited to 250 KB each; profile avatars to 500 KB.

Demo role and audience checks model the experience; they are not a security boundary against someone controlling their own browser. Anonymous polls expose aggregate results through the UI, and seeded vote identities correspond to actual generated audience members. One demo identity can vote only once. Do not enter real personal or confidential information into this prototype.

## Preserved server and previous workspace

The existing Cloudflare Worker API, D1 schema, R2 binding and server access-control tests are retained unchanged. The demo UI never calls those APIs or seeds the real database. Existing server account data is not merged into the fictitious dataset. Platform hosting access controls are preserved independently of the demo selector. The project is public according to Sites; if the hosting platform applies an access screen, it is outside this UI.

The previous local curriculum analytics remain at `/demo/`, with their own existing data and tests. CSV/manual diagnostics and hour allocation are also available to demo teachers in the new interface.

## Catalog evidence

Names, cities and types were checked on 11 November 2026. The six real entries use these official sources; no staff or student data was copied:

- Republican Physics and Mathematics School, Almaty and Astana: https://fizmat.kz/ru/kontakty/
- Almaty Technological College: https://www.atc-edu.kz/ and https://www.gov.kz/article/707?lang=ru
- ASTANA POLYTECHNIC higher college, Astana: https://polytech.edu.kz/ and https://procurement.gov.kz/ru/registry/show_supplier/6930
- Al-Farabi Kazakh National University, Almaty: https://welcome.kaznu.kz/ru/17506/page/
- L.N. Gumilyov Eurasian National University, Astana: https://enu.kz/ru/page/contacts%2Fadministration

## Development and verification

`npm run dev` serves a local preview. `/__preview/mobile` is a development-only 390×844 iframe fixture for checking actual responsive layout. It is not included in the production Worker routes.

`node --test tests/demo.test.mjs tests/server.test.mjs tests/engine.test.cjs tests/school.test.cjs tests/workspace.test.cjs` checks data consistency across all nine demo institutions, course bounds, roster counts, all timetable conflicts, voting counts/audiences, role scoping, grade-to-graph updates, persistence, shared timetable editing, private appeals, reset isolation and retained server/curriculum behavior.

`npm run build` embeds `web/` into `dist/server/index.js`, preserving the Worker ESM stack and existing D1/R2 hosting manifest. No new libraries or client secrets are needed. Help is explicitly reference-only, without an external model. Motion follows `prefers-reduced-motion` and the per-account motion preference. Page motion keys prevent replay during unchanged data refreshes; chat polling avoids rebuilding an unchanged message list.
