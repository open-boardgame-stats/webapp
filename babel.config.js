module.exports = (api) => {
  api.cache(() => process.env.NODE_ENV === "production");
  return {
    presets: ["react-app"],
  };
};
