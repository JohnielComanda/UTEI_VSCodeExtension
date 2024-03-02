import * as vscode from 'vscode'
import * as fileHandlerUtils from './fileHandlerUtils'
import * as unitTestGenerator from './unitTestGenerator'
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
        fileHandlerUtils.replaceCodeFromActiveEditor(output)
      } catch (error) {
        vscode.window.showErrorMessage('Error: ' + error)
      }
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
