# AGENTS.md

Guidance for AI agents maintaining this site. The owner, Mason, writes the
posts; agents build and maintain everything around them.

## North star: keep the workflow simple

Mason's day-to-day workflow (writing a post, adding a quote) lives in
`WORKFLOW.md`. It must always stay simple to understand and to do.

- Judge every change by its effect on that workflow. If a change makes
  writing a post or adding a quote harder, needs more steps, more front
  matter, or more things to remember, the change is wrong. Find a simpler
  design or push back.
- **After any change, check whether `WORKFLOW.md` is still accurate. If it
  isn't, update it in the same piece of work.** If the updated workflow is
  noticeably more complicated than before, treat that as a sign the change
  went wrong.
- `WORKFLOW.md` is gitignored and excluded from the build on purpose. Keep
  it that way.

## Never write Mason's words

- Do not write, rewrite, or edit the prose in `_posts/` or the quotes in
  `_data/commonplace.yml`. Every post says the words are his own (see
  `_includes/ai-disclosure.html` and `ai.md`), and that must stay true.
- Placeholder or example text you add elsewhere (page intros, sample
  quotes) should be pointed out to Mason so he can replace it.

## The site

- Jekyll 3.10 via the `github-pages` gem, deployed by GitHub Pages on push
  to `main`. Only plugins GitHub Pages allows will work; no custom plugins.
- Preview: `bundle exec jekyll serve` → <http://localhost:4000>.
- Theme: Kanagawa Dragon, with accents saturated slightly above stock. All
  colors are SCSS variables at the top of `assets/main.scss`; use those
  rather than new hex values.

| Thing | Where |
|---|---|
| Posts | `_posts/YYYY-MM-DD-title.md` (`layout`, `title`, optional `tags`) |
| Commonplace Book quotes | `_data/commonplace.yml`, rendered by `commonplace.md` |
| Tags page | `tags.md` (one page, anchors per tag; no plugin) |
| AI disclosure | callout `_includes/ai-disclosure.html` (top of every post), page `ai.md` |
| Header nav | pages with a `title`, ordered by `nav_order`; hide with `nav_exclude: true` |
| Footer links | `_includes/footer.html` |
| Site icon | `favicon.ico`, `assets/icons/` (circular, transparent corners; apple-touch stays square) |

## Working conventions

- Any new top-level Markdown file that shouldn't be public must be added
  to `exclude:` in `_config.yml`. Jekyll publishes `.md` files otherwise.
- Check changes in the browser before calling them done.
- Don't commit or push unless Mason asks.

## Owner preferences

Mason will add more opinions here as he uses the site.
