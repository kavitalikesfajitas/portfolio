module.exports = async ({ github, context, core }) => {
  const identifier = process.env.IDENTIFIER;
  const body = identifier + '\n' + process.env.COMMENT_BODY;
  const prNumber = context.issue.number;

  if (!prNumber) {
    core.setFailed('No PR number found. This action must run from a pull_request context.');
    return;
  }

  const { data: comments } = await github.rest.issues.listComments({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: prNumber,
  });

  const existing = comments.find(c =>
    c.user.type === 'Bot' && c.body.includes(identifier)
  );

  if (existing) {
    await github.rest.issues.updateComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      comment_id: existing.id,
      body,
    });
    core.info(`Updated existing comment ${existing.id}`);
  } else {
    const { data: created } = await github.rest.issues.createComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: prNumber,
      body,
    });
    core.info(`Created new comment ${created.id}`);
  }
};
