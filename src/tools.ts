import AtCoder from 'un-oj/platforms/atcoder';
import Codeforces from 'un-oj/platforms/codeforces';
import Hydro from 'un-oj/platforms/hydro';
import LeetCode from 'un-oj/platforms/leetcode';
import Luogu from 'un-oj/platforms/luogu';
import Lyrio from 'un-oj/platforms/lyrio';
import MXOJ from 'un-oj/platforms/mxoj';
import * as vscode from 'vscode';
import { formatProblem } from './formatters.js';

interface GetOJProblemParameters {
  platform: 'luogu' | 'codeforces' | 'atcoder' | 'leetcode' | 'hydro' | 'lyrio' | 'mxoj'
  problemId: string
}

export class GetOJProblemTool implements vscode.LanguageModelTool<GetOJProblemParameters> {
  async invoke(
    options: vscode.LanguageModelToolInvocationOptions<GetOJProblemParameters>,
    _token: vscode.CancellationToken,
  ) {
    const { platform, problemId } = options.input;

    try {
      const oj = this.getPlatformInstance(platform);
      const problem = await oj.getProblem(problemId);
      const formattedProblem = formatProblem(problem, platform, problemId);

      return new vscode.LanguageModelToolResult([
        new vscode.LanguageModelTextPart(formattedProblem),
      ]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return new vscode.LanguageModelToolResult([
        new vscode.LanguageModelTextPart(`Failed to fetch problem: ${errorMessage}`),
      ]);
    }
  }

  prepareInvocation(
    options: vscode.LanguageModelToolInvocationPrepareOptions<GetOJProblemParameters>,
  ): vscode.ProviderResult<vscode.PreparedToolInvocation> {
    return {
      invocationMessage: `Fetch problem ${options.input.problemId} from ${options.input.platform}`,
    };
  }

  private getPlatformInstance(platform: string) {
    switch (platform) {
      case 'luogu':
        return new Luogu();
      case 'codeforces':
        return new Codeforces();
      case 'atcoder':
        return new AtCoder();
      case 'leetcode':
        return new LeetCode();
      case 'hydro':
        return new Hydro();
      case 'lyrio':
        return new Lyrio();
      case 'mxoj':
        return new MXOJ();
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }
}
