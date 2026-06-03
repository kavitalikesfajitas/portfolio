# GitHub and Git (multiple accounts)

If your laptop uses **more than one GitHub identity**, two things work together:

1. **SSH host alias (authentication)** — In `~/.ssh/config`, a separate `Host` (e.g. `github.com-personal`) points at `github.com` but uses your **personal** SSH key. Clones and remotes must use that host so GitHub sees the right account:

   ```bash
   git clone git@github.com-personal:kavitalikesfajitas/contentful-proxy.git
   ```

   Use `owner/repo` for any other personal repo. Using `git@github.com:...` may use your **work** key and fail for **private** personal repos (GitHub often reports that as `Repository not found`).

   Check which user a host uses:

   ```bash
   ssh -T git@github.com                 # often work / default
   ssh -T git@github.com-personal         # should greet your personal username
   ```

2. **Conditional Git config (commit identity)** — In `~/.gitconfig`, an `includeIf` loads `~/.gitconfig-personal` for repositories under `~/Development/personal/`. That sets **name and email for commits** in those repos. It does **not** pick which SSH key runs; the URL host (`github.com-personal` vs `github.com`) and `~/.ssh/config` do.

**After cloning**, confirm the remote still uses the personal host so push/pull use the correct key:

```bash
git remote -v
# expect git@github.com-personal:owner/repo.git
```

If you copied a URL with `git@github.com:`, change it:

```bash
git remote set-url origin git@github.com-personal:OWNER/REPO.git
```
