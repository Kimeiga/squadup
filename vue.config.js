module.exports = {
  pwa: {
    themeColor: "#FFFFFF",
    appleMobileWebAppStatusBarStyle: "black",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "public/service-worker.js"
    }
  },
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    devtool: "source-map"
  }
};
