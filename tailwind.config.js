const {nextui} = require('@nextui-org/react');
const {addDynamicIconSelectors} = require('@iconify/tailwind');
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [nextui(), addDynamicIconSelectors()],
};
