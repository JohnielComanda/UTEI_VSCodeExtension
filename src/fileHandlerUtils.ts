import * as vscode from 'vscode'

export async function promptForOutputDestination(output: Promise<string>) {
  const userInput = await vscode.window.showInputBox({
    prompt:
      'Do you want to use the output in a new file (Enter the name for the new file) or Escape to copy it in your clipboard?',
    placeHolder: 'e.g., Test.cs',
  })

  const response = await output

  if (response === '-1' || response === '') {
    vscode.window.showErrorMessage('Input code is not testable.')
    return
  }

  if (userInput) {
    if (userInput != '') {
      const newFileUri = vscode.Uri.joinPath(
        vscode.workspace.workspaceFolders![0].uri,
        userInput,
      )
      vscode.window.showInformationMessage('Creating a new file...')

      await vscode.workspace.fs.writeFile(newFileUri, Buffer.from(response))

      vscode.window.showInformationMessage(`New file "${userInput}" created.`)
    } else {
      vscode.window.showErrorMessage('Invalid file name.')
    }
  } else if (userInput === undefined) {
    const editor = vscode.window.activeTextEditor
    if (editor && response) {
      await vscode.env.clipboard.writeText(response)
      vscode.window.showInformationMessage(
        'Unit test is copied in your clipboard. Kindly Paste it in your existing file',
      )
    } else {
      vscode.window.showErrorMessage(
        'Invalid input. Please Type "file name" or press "Escape".',
      )
    }
  }
}

export function getCodeFromActiveEditor(): string | undefined {
  const editor = vscode.window.activeTextEditor
  if (editor) {
    const selection = editor.selection
    if (!selection.isEmpty) {
      const start = selection.active
      const end = selection.anchor
      const range = new vscode.Range(start, end)
      return editor.document.getText(range)
    } else {
      return editor.document.getText()
    }
  }
  vscode.window.showErrorMessage('No active text editor found.')
  return undefined
}

export async function replaceCodeFromActiveEditor(output: Promise<string>) {
  const editor = vscode.window.activeTextEditor
  const response = await output
  if (editor && response) {
    const selection = editor.selection
    if (!selection.isEmpty) {
      await editor.edit((editBuilder) => {
        editBuilder.replace(selection, response)
      })
      vscode.window.showInformationMessage(
        'Successfully replaced the selected code with its enhanced version',
      )
    } else {
      await editor.edit((editBuilder) => {
        const document = editor.document
        const lastLine = document.lineAt(document.lineCount - 1)
        const range = new vscode.Range(
          new vscode.Position(0, 0),
          lastLine.range.end,
        )
        console.log('RANGE', range)
        editBuilder.replace(range, response)
      })
    }

    vscode.window.showInformationMessage(
      'Successfully replaced the existing code with its enhanced version',
    )
  } else {
    vscode.window.showErrorMessage(
      'Invalid input. Please Type "file name" or press "Escape".',
    )
  }
}
