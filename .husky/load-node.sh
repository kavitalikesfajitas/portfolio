# Ensure `yarn`/`node` are on PATH no matter how git was launched
# (terminal, GitHub Desktop, VS Code, etc.) and regardless of node manager.
# GUI git clients don't source ~/.zshrc, so resolve the toolchain ourselves.
if ! command -v yarn >/dev/null 2>&1; then
  export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"                       # nvm
  command -v fnm >/dev/null 2>&1 && eval "$(fnm env --use-on-cd)" 2>/dev/null  # fnm
  [ -s "$HOME/.asdf/asdf.sh" ] && \. "$HOME/.asdf/asdf.sh"              # asdf
  [ -d "$HOME/.volta/bin" ] && export PATH="$HOME/.volta/bin:$PATH"     # volta
  for d in /opt/homebrew/bin /usr/local/bin "$HOME/.local/bin"; do      # brew/global fallback
    [ -d "$d" ] && export PATH="$PATH:$d"
  done
fi
