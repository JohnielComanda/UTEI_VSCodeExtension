import * as vscode from 'vscode'
import * as registerUtils from './registerUtils'

export function activate(context: vscode.ExtensionContext) {
  // Register all C# command to be used in the menu
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generateCSharpNUnit',
    registerUtils.Framework.NUnit,
  )
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generateCSharpXUnit',
    registerUtils.Framework.XUnit,
  )
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generateCSharpMSTest',
    registerUtils.Framework.MSTest,
  )
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generateCSharpMoq',
    registerUtils.Framework.Moq,
  )
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generateCSharpNSubstitute',
    registerUtils.Framework.NSubstitute,
  )
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generateCSharpFluentAssertions',
    registerUtils.Framework.FluentAssertions,
  )

  // Register all Java command to be used in the menu
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generateJavaJUnit',
    registerUtils.Framework.JUnit,
  )
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generateJavaTestNG',
    registerUtils.Framework.TestNG,
  )
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generateJavaMockito',
    registerUtils.Framework.Mockito,
  )
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generateJavaPowerMock',
    registerUtils.Framework.PowerMock,
  )
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generateJavaAssertJ',
    registerUtils.Framework.AssertJ,
  )
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generateJavaHamcrest',
    registerUtils.Framework.Hamcrest,
  )
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generateJavaJmockit',
    registerUtils.Framework.Jmockit,
  )

  // Register all JavaScript command to be used in the menu
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generateJavaScriptJasmine',
    registerUtils.Framework.Jasmine,
  )
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generateJavaScriptMocha',
    registerUtils.Framework.Mocha,
  )
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generateJavaScriptJest',
    registerUtils.Framework.Jest,
  )
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generateJavaScriptQUnit',
    registerUtils.Framework.QUnit,
  )
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generateJavaScriptAva',
    registerUtils.Framework.Ava,
  )
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generateJavaScriptTape',
    registerUtils.Framework.Tape,
  )
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generateJavaScriptKarma',
    registerUtils.Framework.Karma,
  )
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generateJavaScriptCypress',
    registerUtils.Framework.Cypress,
  )

  // Register all Python command to be used in the menu
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generatePythonUnittest',
    registerUtils.Framework.Unittest,
  )
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generatePythonPytest',
    registerUtils.Framework.Pytest,
  )
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generatePythonNose2',
    registerUtils.Framework.Nose2,
  )
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generatePythonDoctest',
    registerUtils.Framework.Doctest,
  )
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generatePythonTox',
    registerUtils.Framework.Tox,
  )
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generatePythonHypothesis',
    registerUtils.Framework.Hypothesis,
  )
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generatePythonRobotregisterUtils.Framework',
    registerUtils.Framework.Robotframework,
  )
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generatePythonTestify',
    registerUtils.Framework.Testify,
  )

  // Register all C++ command to be used in the menu
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generateCppGoogleTest',
    registerUtils.Framework.GoogleTest,
  )
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generateCppCatch2',
    registerUtils.Framework.Catch2,
  )
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generateCppBoostTest',
    registerUtils.Framework.BoostTest,
  )
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generateCppCppUtest',
    registerUtils.Framework.CppUTest,
  )
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generateCppIgloo',
    registerUtils.Framework.Igloo,
  )
  registerUtils.registerGenerateUnitTestCommand(
    context,
    'utei.generateCppCppUnit',
    registerUtils.Framework.CppUnit,
  )
  registerUtils.registerGenerateUnitTestImprovedVersionCommand(
    context,
    'utei.generateImprovedVersion',
  )
  registerUtils.registerIdentifyEfficiencyCommand(
    context,
    'utei.identifyEfficiency',
  )
  registerUtils.registerInputApiKeyCommand(context, 
    'utei.askForApiKey'
  )
}
