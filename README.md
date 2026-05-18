# Simple webdevelopers portfolio

### [Demo](https://roshanjossey.github.io)

This site is built with [Middleman](https://middlemanapp.com).

## Local development

```bash
bundle install
bundle exec middleman server
```

Open http://localhost:4567

## Deploy to GitHub Pages

Pushes to `master` run [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which builds with Middleman and publishes the `build/` output via GitHub Actions (not Jekyll).

**One-time repo setup:** GitHub → **Settings** → **Pages** → **Build and deployment** → **Source:** **GitHub Actions**.

To build locally without deploying:

```bash
bundle exec middleman build
# output in build/
```

Optional: `bundle exec rake publish` copies `build/` into the repo root (legacy workflow; CI deploys from `build/` directly).
