export const transformText = (text: string, styleVariable: string) => {
    return text.replace(
        new RegExp(`(className|class)\\s*=\\s*['"]([\\w\\s-]+)['"]`, "g"),
        (match, classAttribute, className) => {
            return `${classAttribute}={${styleVariable}.${className}}`;
        }
    );
};
