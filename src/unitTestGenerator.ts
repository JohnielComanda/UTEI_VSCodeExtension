import * as vscode from 'vscode'
import { gptRequestHandler } from './gptRequestHandler'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function generateUnitTest(
  code: string | undefined,
  framework: string | undefined,
): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  vscode.window.showInformationMessage('Generating unit test...')
  const prompt = `Generate a complete usable unit test given this code:
      \`\`\`
      ${code}
      \`\`\`
      using ${framework}
      \`\`\`
      that adheres to the proper conventions of writing unit test and return just the unit test ready and usable for working codebase that has an import statements and without any additional information and comments. If the code is not unit testable just respond with -1 with no other information and comments`
  if (code) {
    try {
      const response = await gptRequestHandler(prompt)
      return response
    } catch (error) {
      vscode.window.showErrorMessage(
        'Error: No response found either an invalid API Key Input or the system has reached the API rate limit',
      )
    }
  }
  return ''
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function generateUnitTestImprovedVersion(
  code: string | undefined,
): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  vscode.window.showInformationMessage('Generating an enhanced version...')
  const prompt = `Generate a complete improved version of the given code:
      \`\`\`
      ${code}
      \`\`\`
      that adheres to the proper conventions and return a complete and without any additional information and comments. If the code is not a unit test just respond with -1 with no other information and comments`
  if (code) {
    try {
      const response = await gptRequestHandler(prompt)
      return response
    } catch (error) {
      vscode.window.showErrorMessage(
        'Error: No response found either an invalid API Key Input or the system has reached the API rate limit',
      )
    }
  }
  return ''
}
