import { ExtensionContext, commands, window, workspace } from 'vscode';
import * as cp from 'child_process';
import * as fs from 'fs'; 
export function activate(context: ExtensionContext) {

	let disposable = commands.registerCommand('momoko-value.build-values', () => {
		let path = `${workspace.rootPath}\\automation\\build-values.ps1`;
		if(!fs.existsSync(path)){
			window.showErrorMessage("The Path to build-values.ps1 is wrong!");
			return;
		}
		var spawn = cp.spawn, child;
		child = spawn("powershell.exe", [path]);
		window.showInformationMessage("Building values...");
		child.stdout.on("data", function (data) {
			console.log("Powershell Data: " + data);
		});
		child.stderr.on("data", function (data) {
			console.log("Powershell Errors: " + data);
		});
		child.on("exit", function () {
			console.log("Powershell Script finished");
			window.showInformationMessage("The values are all builded.");
		});
		child.stdin.end();
	});
	context.subscriptions.push(disposable);
}

export function deactivate() { }
