import * as vscode from 'vscode'
import { gptRequestHandler } from './gptRequestHandler'

enum Framework {
  // CS  harp
  NUnit = 'NUnit',
  XUnit = 'XUnit',
  MSTest = 'MSTest',
  Moq = 'Moq',
  NSubstitute = 'NSubstitute',
  FluentAssertions = 'FluentAssertions',

  // Java
  JUnit = 'JUnit',
  TestNG = 'TestNG',
  Mockito = 'Mockito',
  PowerMock = 'PowerMock',
  AssertJ = 'AssertJ',
  Hamcrest = 'Hamcrest',
  Jmockit = 'Jmockit',

  // JavaScript
  Jasmine = 'Jasmine',
  Mocha = 'Mocha',
  Jest = 'Jest',
  QUnit = 'QUnit',
  Ava = 'Ava',
  Tape = 'Tape',
  Karma = 'Karma',
  Cypress = 'Cypress',

  // Python
  Unittest = 'Unittest',
  Pytest = 'Pytest',
  Nose2 = 'Nose2',
  Doctest = 'Doctest',
  Tox = 'Tox',
  Hypothesis = 'Hypothesis',
  Robotframework = 'Robotframework',
  Testify = 'Testify',

  // Adding C++ testing frameworks
  GoogleTest = 'GoogleTest',
  Catch2 = 'Catch2',
  BoostTest = 'BoostTest',
  CppUTest = 'CppUTest',
  UnitTestPP = 'UnitTestPP',
  Igloo = 'Igloo',
  CppUnit = 'CppUnit',
}

export function activate(context: vscode.ExtensionContext) {
  // C#
  registerUnitTestCommand(context, 'utei.generateCSharpNUnit', Framework.NUnit)
  registerUnitTestCommand(context, 'utei.generateCSharpXUnit', Framework.XUnit)
  registerUnitTestCommand(
    context,
    'utei.generateCSharpMSTest',
    Framework.MSTest,
  )
  registerUnitTestCommand(context, 'utei.generateCSharpMoq', Framework.Moq)
  registerUnitTestCommand(
    context,
    'utei.generateCSharpNSubstitute',
    Framework.NSubstitute,
  )
  registerUnitTestCommand(
    context,
    'utei.generateCSharpFluentAssertions',
    Framework.FluentAssertions,
  )

  // Java
  registerUnitTestCommand(context, 'utei.generateJavaJUnit', Framework.JUnit)
  registerUnitTestCommand(context, 'utei.generateJavaTestNG', Framework.TestNG)
  registerUnitTestCommand(
    context,
    'utei.generateJavaMockito',
    Framework.Mockito,
  )
  registerUnitTestCommand(
    context,
    'utei.generateJavaPowerMock',
    Framework.PowerMock,
  )
  registerUnitTestCommand(
    context,
    'utei.generateJavaAssertJ',
    Framework.AssertJ,
  )
  registerUnitTestCommand(
    context,
    'utei.generateJavaHamcrest',
    Framework.Hamcrest,
  )
  registerUnitTestCommand(
    context,
    'utei.generateJavaJmockit',
    Framework.Jmockit,
  )

  // JavaScript
  registerUnitTestCommand(
    context,
    'utei.generateJavaScriptJasmine',
    Framework.Jasmine,
  )
  registerUnitTestCommand(
    context,
    'utei.generateJavaScriptMocha',
    Framework.Mocha,
  )
  registerUnitTestCommand(
    context,
    'utei.generateJavaScriptJest',
    Framework.Jest,
  )
  registerUnitTestCommand(
    context,
    'utei.generateJavaScriptQUnit',
    Framework.QUnit,
  )
  registerUnitTestCommand(context, 'utei.generateJavaScriptAva', Framework.Ava)
  registerUnitTestCommand(
    context,
    'utei.generateJavaScriptTape',
    Framework.Tape,
  )
  registerUnitTestCommand(
    context,
    'utei.generateJavaScriptKarma',
    Framework.Karma,
  )
  registerUnitTestCommand(
    context,
    'utei.generateJavaScriptCypress',
    Framework.Cypress,
  )

  // Python
  registerUnitTestCommand(
    context,
    'utei.generatePythonUnittest',
    Framework.Unittest,
  )
  registerUnitTestCommand(
    context,
    'utei.generatePythonPytest',
    Framework.Pytest,
  )
  registerUnitTestCommand(context, 'utei.generatePythonNose2', Framework.Nose2)
  registerUnitTestCommand(
    context,
    'utei.generatePythonDoctest',
    Framework.Doctest,
  )
  registerUnitTestCommand(context, 'utei.generatePythonTox', Framework.Tox)
  registerUnitTestCommand(
    context,
    'utei.generatePythonHypothesis',
    Framework.Hypothesis,
  )
  registerUnitTestCommand(
    context,
    'utei.generatePythonRobotframework',
    Framework.Robotframework,
  )
  registerUnitTestCommand(
    context,
    'utei.generatePythonTestify',
    Framework.Testify,
  )

  // C++
  registerUnitTestCommand(
    context,
    'utei.generateCppGoogleTest',
    Framework.GoogleTest,
  )
  registerUnitTestCommand(context, 'utei.generateCppCatch2', Framework.Catch2)
  registerUnitTestCommand(
    context,
    'utei.generateCppBoostTest',
    Framework.BoostTest,
  )
  registerUnitTestCommand(
    context,
    'utei.generateCppCppUtest',
    Framework.CppUTest,
  )
  registerUnitTestCommand(context, 'utei.generateCppIgloo', Framework.Igloo)
  registerUnitTestCommand(context, 'utei.generateCppCppUnit', Framework.CppUnit)
}

function registerUnitTestCommand(
  context: vscode.ExtensionContext,
  command: string,
  framework: Framework,
) {
  const disposable = vscode.commands.registerCommand(command, async () => {
    const code = getCodeFromActiveEditor()
    if (code) {
      try {
        const output = generateUnitTest(code, framework)
        console.log(output)
        promptForOutputDestination(output)
      } catch (error) {
        vscode.window.showErrorMessage('Error: ' + error)
      }
    }
  })
  context.subscriptions.push(disposable)
}

async function promptForOutputDestination(output: Promise<string>) {
  const userInput = await vscode.window.showInputBox({
    prompt:
      'Do you want to use the output in a new file (Enter the name for the new file) or Escape to copy it in your clipboard?',
    placeHolder: 'e.g., Test.cs',
  })

  if (userInput) {
    vscode.window.showInformationMessage('Generating unit test...')
    if (userInput != '') {
      const newFileUri = vscode.Uri.joinPath(
        vscode.workspace.workspaceFolders![0].uri,
        userInput,
      )
      vscode.window.showInformationMessage('Creating a new file...')

      await vscode.workspace.fs.writeFile(newFileUri, Buffer.from(await output))

      vscode.window.showInformationMessage(`New file "${userInput}" created.`)
    } else {
      vscode.window.showErrorMessage('Invalid file name.')
    }
  } else if (userInput === undefined) {
    vscode.window.showInformationMessage('Generating unit test...')
    const editor = vscode.window.activeTextEditor
    if (editor && output) {
      await vscode.env.clipboard.writeText(await output)
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

function getCodeFromActiveEditor(): string | undefined {
  const editor = vscode.window.activeTextEditor
  if (editor) {
    const selections = editor.selections
    console.log('selections: ', selections)
    if (selections.length > 1) {
      const highlightedCodeSnippets: string[] = []
      selections.forEach((selection) => {
        const highlightedCode = editor.document.getText(selection)
        highlightedCodeSnippets.push(highlightedCode)
      })
      return highlightedCodeSnippets.join('\n')
    }
    console.log('whole code: ', editor.document.getText())
    return editor.document.getText()
  }
  vscode.window.showErrorMessage('No active text editor found.')
  return undefined
}

async function generateUnitTest(
  code: string | undefined,
  framework: string | undefined,
): Promise<string> {
  const prompt = `Generate a complete usable unit test given the method:
	\`\`\`
	${code}
	\`\`\`
	using ${framework}
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
