// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import { gptRequestHandler } from './gptRequestHandler'

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "utei" is now active!')

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    'utei.generateUnitTestFromHighlightedCode',
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      const code = getHighlightedCodeFromActiveEditor()
      const output = generateUnitTestFromHighlightedCode(code)
      console.log(output)
      promptForOutputDestination(output)
    },
  )

  context.subscriptions.push(disposable)
}

async function promptForOutputDestination(output: Promise<string>) {
  const userInput = await vscode.window.showInputBox({
    prompt:
      'Do you want to use the output in a new file (type "new") or an existing file (type "existing")?',
    placeHolder: 'Type "new" or "existing"',
  })

  if (userInput === 'new') {
    const newFileName = await vscode.window.showInputBox({
      prompt: 'Enter the name for the new file',
      placeHolder: 'e.g., output.txt',
    })

    if (newFileName) {
      const newFileUri = vscode.Uri.joinPath(
        vscode.workspace.workspaceFolders![0].uri,
        newFileName,
      )

      // Create the new file
      await vscode.workspace.fs.writeFile(newFileUri, Buffer.from(await output))

      vscode.window.showInformationMessage(`New file "${newFileName}" created.`)
    } else {
      vscode.window.showErrorMessage('Invalid file name.')
    }
  } else if (userInput === 'existing') {
    const editor = vscode.window.activeTextEditor
    if (editor) {
      await vscode.env.clipboard.writeText(await output)
      vscode.window.showInformationMessage(
        'Unit test is copied in your clipboard. Kidly Paste it in your existing file',
      )
    } else {
      vscode.window.showErrorMessage(
        'Invalid input. Please type "new" or "existing".',
      )
    }
  }
}

function getHighlightedCodeFromActiveEditor(): string | undefined {
  const editor = vscode.window.activeTextEditor
  if (editor) {
    const selections = editor.selections
    const highlightedCodeSnippets: string[] = []
    selections.forEach((selection) => {
      const highlightedCode = editor.document.getText(selection)
      highlightedCodeSnippets.push(highlightedCode)
    })

    return highlightedCodeSnippets.join('\n')
  }
  vscode.window.showErrorMessage('No active text editor found.')
  return undefined
}

async function generateUnitTestFromHighlightedCode(
  code: string | undefined,
): Promise<string> {
  const prompt = `Generate a complete usable unit test given the method:
	\`\`\`
	${code}
	\`\`\`
	that adheres to the proper conventions of writing unit test and return just the unit test without any addition information.`
  if (code) {
    try {
      const response = await gptRequestHandler(prompt)
      vscode.window.showInformationMessage(
        'Received response from OpenAI: ' + response,
      )
      return response
    } catch (error) {
      vscode.window.showErrorMessage('Error: ' + error)
    }
  }
  return ''
}
