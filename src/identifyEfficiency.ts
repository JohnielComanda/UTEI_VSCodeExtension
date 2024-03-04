import * as vscode from 'vscode'
import { gptRequestHandler } from './gptRequestHandler'

export async function identifyEfficiency(
  code: string | undefined,
): Promise<string> {
  vscode.window.showInformationMessage('Identifying Efficiency Please Wait...')
  const prompt = `Rate this unit test honestly if not a unit test return -1:
      \`\`\`
      ${code}
      \`\`\`
      \`\`\`
      very strictly on a scale of 5 where 5 means very high performing, 4 means high, 3 means has room for improvement, 2 means low, and 1 very low. The criteria is it's estimated runtime, compile time, unit test code efficiency, and adherence to writing of a proper unit test. reply with just number 1 to 5 and nothing else and Explaination why you came up with that rating provide a summary of the performance of the unit test, the output should look like this 1 Summary: Provide here the information.`
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

export async function generateEnhancedVersion(
  code: string | undefined,
  reason: string | undefined,
): Promise<string> {
  const prompt = `Write an improved version of the following unit test method:
      ${code}
      given this feedback
      ${reason}
      that adheres to the proper conventions of writing proper unit test and just respond with a code nothing more.`
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
