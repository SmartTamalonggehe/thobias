import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import daisyui from "daisyui";
import colors from "./resources/js/utils/colors";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
    ],

    theme: {
        extend: {
            backgroundImage: {
                "primary-gradient":
                    "linear-gradient(238deg, #A8D5BA 0%, #6BBF59 99.66%)",
            },
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
        },
        container: {
            center: true,
        },
    },
    plugins: [forms, daisyui, typography],
    daisyui: {
        themes: [
            {
                light: {
                    ...colors,
                },
                dark: {
                    ...colors,
                },
            },
        ],
    },
    darkMode: "class",
};
