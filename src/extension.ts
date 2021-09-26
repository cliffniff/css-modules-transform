import { commands, window, Selection, workspace, ExtensionContext } from "vscode";
import { transformText } from "./utils";

export const activate = (context: ExtensionContext) => {
    let fileSaveWatcher = workspace.onWillSaveTextDocument(({ document, waitUntil }) => {
        if (
            document.uri.scheme === "file" &&
            (document.languageId === "typescriptreact" || document.languageId === "javascriptreact")
        ) {
            waitUntil(commands.executeCommand("css-modules-transform.transformClasses", false));
        }
    });

    let transformClassCommand = commands.registerCommand(
        "css-modules-transform.transformClasses",
        (forced = true) => {
            const editor = window.activeTextEditor;

            if (editor) {
                const styleVariable = editor.document
                    .getText()
                    .match(/^.*?import\s(.*?)\sfrom\s['"].*?.module.css['"]/);

                if (
                    !forced &&
                    (!styleVariable ||
                        new RegExp(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*|<!--[\s\S]*?-->$/).test(
                            styleVariable[0]
                        ))
                ) {
                    return;
                }

                let text: string;

                let selection = editor.selection;

                if (selection.isEmpty) {
                    text = editor.document.getText();

                    const startLine = editor.document.lineAt(0);
                    const endLine = editor.document.lineAt(editor.document.lineCount - 1);

                    selection = new Selection(startLine.range.start, endLine.range.end);
                } else {
                    text = editor.document.getText(selection);
                }

                const transformedText = transformText(text, (styleVariable && styleVariable[1]) || "styles");

                editor.edit((editBuilder) => {
                    editBuilder.replace(selection, transformedText);
                });
            }
        }
    );

    context.subscriptions.push(fileSaveWatcher);
    context.subscriptions.push(transformClassCommand);
};

export const deactivate = () => {};
