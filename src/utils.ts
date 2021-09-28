export const transformText = (text: string, styleVariable: string) => {
    return text.replace(
        new RegExp(`(className|class)\\s*=\\s*['"]([\\w\\s-]+)['"]`, "g"),
        (match, classAttribute, className) => {
            const styleProperty = className.includes("-") ? `["${className}"]` : `.${className}`;
            return `${classAttribute}={${styleVariable}${styleProperty}}`;
        }
    );
};
