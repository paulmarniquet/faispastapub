import type {Config} from "tailwindcss";

function withOpacity(variableName: string) {
    return ({opacityValue}) => {
        if (opacityValue !== undefined) {
            return `rgba(var(${variableName}), ${opacityValue})`;
        }
        return `rgb(var(${variableName}))`;
    };
}

export default {
    darkMode: "class",
    content: [
        "./components/**/*.{js,vue,ts}",
        "./pages/**/*.vue",
        "./default.vue",
        "./error.vue",
    ],
    theme: {
        extend: {
            colors: {
                "color-primary": withOpacity("--color-primary"),
                "color-background": withOpacity("--color-background"),
                "color-text": withOpacity("--color-text"),
                "color-secondary": withOpacity("--color-secondary"),
            },
        },
    },
    plugins: [],
} satisfies Config;
