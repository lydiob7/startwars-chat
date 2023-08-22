/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        animation: {
            "hide-chat": "hide-chat .3s ease forwards",
            "minimize-chat": "minimize-chat .3s ease forwards",
            "maximize-chat": "maximize-chat .3s ease forwards"
        },
        keyframes: {
            "hide-chat": {
                to: {
                    maxHeight: "0"
                }
            },
            "minimize-chat": {
                from: {
                    maxHeight: "300vh"
                },
                to: {
                    maxHeight: "3rem"
                }
            },
            "maximize-chat": {
                to: {
                    maxHeight: "300vh"
                }
            }
        },
        extend: {
            borderWidth: {
                1: "1px"
            },
            colors: {
                primary: "#FBB889"
            },
            display: ["group-hover"]
        }
    },
    plugins: []
};
