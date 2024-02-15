// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { HelloWorldPanel } from "./helloWorldPanel";
import { SidebarProvider } from "./SidebarProvider";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const { window, commands, StatusBarAlignment } = vscode;
  const { subscriptions, extensionUri } = context;

  // Extract the window object
  const { createStatusBarItem, registerWebviewViewProvider } = window;
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  const sidebarProvider = new SidebarProvider(extensionUri);

  const item = createStatusBarItem(StatusBarAlignment.Right);
  item.text = "$(tasklist)";
  item.command = "tbdl.addTasks";
  item.show();
  item.tooltip = "Create a task from the selected item.";

  subscriptions.push(
    registerWebviewViewProvider("tbdl-sidebar", sidebarProvider)
  );

  subscriptions.push(
    commands.registerCommand("tbdl.addTasks", () => {
      const { activeTextEditor, showInformationMessage } = window;
      if (!activeTextEditor) {
        showInformationMessage("No active editor tab!");
        return;
      }

      const { document, selection } = activeTextEditor;
      const text = document.getText(selection);

      // showInformationMessage("Text: " + text);
      sidebarProvider._view?.webview.postMessage({
        type: "add-task",
        value: text,
      });
    })
  );
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  subscriptions.push(
    commands.registerCommand("tbdl.helloWorld", () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      //   vscode.window.showInformationMessage("Hello from TBDL!");
      HelloWorldPanel.createOrShow(extensionUri);
    })
  );

  subscriptions.push(
    commands.registerCommand("tbdl.refresh", async () => {
      // The code you place here will be executed every time your command is executed
      // HelloWorldPanel.kill();
      // HelloWorldPanel.createOrShow(extensionUri);
      await commands.executeCommand("workbench.action.closeSidebar");
      await commands.executeCommand("tbdl-sidebar.focus");
      // setTimeout(() => {
      //   commands.executeCommand(
      //     "workbench.action.webview.openDeveloperTools"
      //   );
      // }, 500);
    })
  );

  subscriptions.push(
    commands.registerCommand("tbdl.askQuestion", async () => {
      const { showInformationMessage } = window;
      const answer = await showInformationMessage(
        "How was your day?",
        "good",
        "bad",
        "fine"
      );

      switch (answer) {
        case "good":
          showInformationMessage("Glad to hear that!");
          break;
        case "bad":
          showInformationMessage("I'm sorry to hear that.");
          break;
        case "fine":
          showInformationMessage("Hope it gets better!");
          break;
        default:
          break;
      }
    })
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
