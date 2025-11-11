declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

// If you are also using SCSS Modules:
declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

// Image imports
declare module '*.jpg' {
    const src: string;
    export default src;
}

declare module '*.jpeg' {
    const src: string;
    export default src;
}

declare module '*.png' {
    const src: string;
    export default src;
}

declare module '*.gif' {
    const src: string;
    export default src;
}

declare module '*.svg' {
    const src: string;
    export default src;
}

declare module '*.webp' {
    const src: string;
    export default src;
}