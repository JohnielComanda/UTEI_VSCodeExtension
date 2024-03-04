import * as vscode from 'vscode'
import * as fileHandlerUtils from './fileHandlerUtils'
import * as unitTestGenerator from './unitTestGenerator'
import * as efficiencyIdentifier from './identifyEfficiency'
import * as dotenv from 'dotenv'

dotenv.config({ path: 'C:\\Users\\Johniel\\utei\\.env' })

// Define list of unit test framework as enum
// This will is used for registering the command while giving hint to extension.ts file on what the title for the command
// Passed as parameter for registerCommand.Framework parameter in command registration in extension.ts file
export enum Framework {
  // CS Sharp
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

  // C++
  GoogleTest = 'GoogleTest',
  Catch2 = 'Catch2',
  BoostTest = 'BoostTest',
  CppUTest = 'CppUTest',
  UnitTestPP = 'UnitTestPP',
  Igloo = 'Igloo',
  CppUnit = 'CppUnit',
}

export function registerGenerateUnitTestCommand(
  context: vscode.ExtensionContext,
  command: string,
  framework: Framework,
) {
  const disposable = vscode.commands.registerCommand(command, async () => {
    const code = fileHandlerUtils.getCodeFromActiveEditor()
    if (code) {
      try {
        const output = unitTestGenerator.generateUnitTest(code, framework)
        fileHandlerUtils.promptForOutputDestination(output)
      } catch (error) {
        vscode.window.showErrorMessage('Error: ' + error)
      }
    }
  })

  context.subscriptions.push(disposable)
}

export function registerGenerateUnitTestImprovedVersionCommand(
  context: vscode.ExtensionContext,
  command: string,
) {
  const disposable = vscode.commands.registerCommand(command, async () => {
    const code = fileHandlerUtils.getCodeFromActiveEditor()
    console.log('CODE: ', code)
    if (code) {
      try {
        const output = unitTestGenerator.generateUnitTestImprovedVersion(code)
        if ((await output) == code) {
          vscode.window.showInformationMessage(
            'No Enhance Version - Unit Test is efficient enough',
          )
        } else {
          fileHandlerUtils.replaceCodeFromActiveEditor(output)
        }
      } catch (error) {
        vscode.window.showErrorMessage('Error: ' + error)
      }
    }
  })
  context.subscriptions.push(disposable)
}

export function registerIdentifyEfficiencyCommand(
  context: vscode.ExtensionContext,
  command: string,
) {
  const disposable = vscode.commands.registerCommand(command, async () => {
    const editor = vscode.window.activeTextEditor
    if (editor) {
      // Get the selection (Highlighted text)
      const selectionEditor = editor.selection
      const highlightedText = editor.document.getText(selectionEditor)
      console.log('Highlightedtext: ', highlightedText)
      const rating = efficiencyIdentifier.identifyEfficiency(highlightedText)
      rating.then((resolvedRating) => {
        // Print resolved value of the Promise
        console.log('Resolved rating:', resolvedRating)
        // Get the first character of the rating
        const ratingNumber: string = resolvedRating[0]
        const ratingNumberInt: number = parseInt(ratingNumber, 10) // Base 10
        console.log('First character of the rating:', ratingNumber)
        if (resolvedRating == '-1') {
          vscode.window.showInformationMessage(`Invalid Unit Test`)
        } else {
          vscode.window
            .showInformationMessage(
              `Efficiency Rating: ${resolvedRating}`,
              'Enhanced Unit Test',
            )
            .then(async (selection) => {
              if (selection === 'Enhanced Unit Test') {
                if (ratingNumberInt >= 4) {
                  vscode.window.showInformationMessage(
                    'No Enhance Version - Unit Test is efficient enough',
                  )
                } else {
                  const enhancedVersion =
                    await efficiencyIdentifier.generateEnhancedVersion(
                      highlightedText,
                      resolvedRating,
                    )
                  // Update the text
                  editor
                    .edit((editBuilder) => {
                      editBuilder.replace(selectionEditor, enhancedVersion)
                    })
                    .then((success) => {
                      if (success) {
                        console.log('Text updated successfully!')
                      } else {
                        console.log('Failed to update text.')
                      }
                    })
                  vscode.window.showInformationMessage(
                    'Unit Test successfully replaced',
                  )
                }
              }
            })
        }
      })
    } else {
      vscode.window.showInformationMessage('No text editor is active')
    }
  })
  context.subscriptions.push(disposable)
}

export function registerInputApiKeyCommand(
  context: vscode.ExtensionContext,
  command: string,
) {
  const disposable = vscode.commands.registerCommand(command, async () => {
    const userInput = await vscode.window.showInputBox({
      prompt:
        'Enter your OpenAI API Key or press Escape to use default key with rate limit',
      placeHolder: 'e.g., sk-*******************************',
    })
    if (userInput) {
      process.env.OPENAI_API_KEY = userInput
    }
  })

  context.subscriptions.push(disposable)
}
