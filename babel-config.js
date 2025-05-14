const { cache } = require("react");
const { presets } = require("./tailwind.config");

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", 
        { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};