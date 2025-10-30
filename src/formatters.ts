import type { Problem } from 'un-oj';
import prettyBytes from 'pretty-bytes';

export function formatProblem(problem: Problem, platform: string, problemId: string): string {
  const parts: string[] = [];

  parts.push(`# ${problem.title}\n`);
  parts.push(`- Platform: ${platform}`);
  parts.push(`- Problem ID: ${problemId}`);

  if (problem.link)
    parts.push(`- Link: ${problem.link}`);

  if (problem.difficulty !== undefined)
    parts.push(`- Difficulty: ${problem.difficulty}`);

  if (problem.tags?.length) {
    const tagNames = problem.tags.map((tag) => {
      if (typeof tag === 'string')
        return tag;
      return tag.name || `#${tag.id}`;
    }).join(', ');
    parts.push(`- Tags: ${tagNames}`);
  }

  if (problem.timeLimit !== undefined) {
    const timeLimits = Array.isArray(problem.timeLimit) ? problem.timeLimit : [problem.timeLimit];
    parts.push(`- Time Limit: ${timeLimits[0] / 1000}s`);
  }

  if (problem.memoryLimit !== undefined) {
    const OPT = { binary: true, space: false };
    if (Array.isArray(problem.memoryLimit)) {
      const min = Math.min(...problem.memoryLimit), max = Math.max(...problem.memoryLimit);
      parts.push(`- Memory Limit: ${prettyBytes(min, OPT)} ~ ${prettyBytes(max, OPT)}`);
    } else {
      parts.push(`- Memory Limit: ${prettyBytes(problem.memoryLimit, OPT)}`);
    }
  }

  parts.push('');

  if (problem.description !== undefined) {
    parts.push('## Problem Description\n');
    if (typeof problem.description === 'string') {
      parts.push(problem.description);
    } else {
      if (problem.description.background !== undefined) {
        parts.push('### Background\n');
        parts.push(problem.description.background);
      }
      if (problem.description.details !== undefined) {
        parts.push('### Details\n');
        parts.push(problem.description.details);
      }
      if (problem.description.input !== undefined) {
        parts.push('### Input Format\n');
        parts.push(problem.description.input);
      }
      if (problem.description.output !== undefined) {
        parts.push('### Output Format\n');
        parts.push(problem.description.output);
      }
      if (problem.description.hint !== undefined) {
        parts.push('### Hint\n');
        parts.push(problem.description.hint);
      }
    }
  }

  if (problem.samples?.length) {
    parts.push('## Sample Test Cases\n');
    problem.samples.forEach((sample, index) => {
      parts.push(`### Sample ${index + 1}`);
      parts.push('**Input:**');
      parts.push('```');
      parts.push(sample.input);
      parts.push('```');
      parts.push('**Output:**');
      parts.push('```');
      parts.push(sample.output);
      parts.push('```');
      if (sample.hint)
        parts.push(`Hint: ${sample.hint}`);
    });
  }

  return parts.join('\n');
}
