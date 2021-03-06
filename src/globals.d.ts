declare module '*.scss' {
    const content: {[className: string]: string};
    export = content;
}

declare module 'typography-theme-noriega' {

    import { TypographyOptions } from 'typography';
    const Theme: TypographyOptions;

    export = Theme;
}
