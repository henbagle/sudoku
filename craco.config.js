// configuration file for craco
// - a drop in replacement for react-scripts with extra customization

module.exports = {
    style: {
        postcss: {
            plugins: [require("tailwindcss"), require("autoprefixer")],
        },
    },
};
