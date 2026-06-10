export function formatCompanyName(boardToken: string) {
  return boardToken.charAt(0).toUpperCase() + boardToken.slice(1);
}

export function formatUpdatedLabel(updatedAt: string | null) {
  if (!updatedAt) {
    return "recently";
  }

  const updatedTime = new Date(updatedAt).getTime();

  if (Number.isNaN(updatedTime) || updatedTime > Date.now()) {
    return "recently";
  }

  const elapsedMinutes = Math.max(
    1,
    Math.floor((Date.now() - updatedTime) / 60_000),
  );

  if (elapsedMinutes < 60) {
    return `${elapsedMinutes}m ago`;
  }

  const elapsedHours = Math.floor(elapsedMinutes / 60);

  if (elapsedHours < 24) {
    return `${elapsedHours}h ago`;
  }

  const elapsedDays = Math.floor(elapsedHours / 24);

  return `${elapsedDays}d ago`;
}
