const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");
const path = require("path");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Workaround: Metro fails to resolve `./providers/Provider.types` from
// expo-auth-session/build/index.js on certain setups (Windows + NativeWind preview).
// The file exists but Metro's fileSystemLookup doesn't find it through the
// nativeResolver chain. Intercept before withNativewind wraps the resolver.
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "./providers/Provider.types") {
    const fromDir = path.dirname(context.originModulePath);
    return {
      filePath: path.resolve(fromDir, "providers", "Provider.types.js"),
      type: "sourceFile",
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativewind(config);
