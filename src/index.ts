import * as vscode from 'vscode';
import { GetOJProblemTool } from './tools.js';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.lm.registerTool('oi-copilot_getOJProblem', new GetOJProblemTool()),
  );
}
