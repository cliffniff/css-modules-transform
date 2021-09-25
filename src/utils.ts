import { window } from "vscode";

export const transformText = (text: string, styleVariable: string) => {
    const classAttribute = /react/.test(window.activeTextEditor?.document.languageId + "")
        ? "className"
        : "class";

    return text.replace(
        new RegExp(`(${classAttribute})\\s*=\\s*['"]([\\w\\s-]+)['"]`, "g"),
        (match, classAttribute, className) => {
            return `${classAttribute}={${styleVariable}.${className}}`;
        }
    );
};
