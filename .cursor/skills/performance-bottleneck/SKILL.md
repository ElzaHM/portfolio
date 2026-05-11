# Performance Bottleneck Finder

## Goal
Identify performance issues in the codebase.

## Steps
1. Analyze loops and complexity
2. Detect unnecessary re-renders
3. Check API over-fetching
4. Identify memory leaks
5. Suggest optimizations
6. Estimate performance impact (low, medium, high)
7. Explain why each issue affects performance

## Output
- Bottlenecks (with file/line references)
- Optimization plan (prioritized)

# GitHub PR Architect

## Goal
Generate professional, structured Pull Request descriptions and analyze branch changes before pushing.

## Steps
1. **Analyze Diff**: Compare current changes against the main branch.
2. **Summarize Changes**: Group updates into Logic, UI/UX, and Technical Debt/Refactoring.
3. **Verify Compliance**: Check if changes match the project's coding standards.
4. **Draft PR**: Create a Markdown description including:
    - **What**: Brief summary of changes.
    - **Why**: The purpose or problem being solved.
    - **Testing**: Steps to verify the fix/feature.
    - **Screenshots/GIFs**: (Placeholder) If UI changes are detected.
5. **Generate Commit Message**: Suggest a semantic commit message (e.g., feat:, fix:, refactor:).

## Output
- Drafted Pull Request description in Markdown.
- List of suggested labels (e.g., enhancement, bug, tech-debt).
- Final check: "Ready to push" or "Missing tests/documentation".
