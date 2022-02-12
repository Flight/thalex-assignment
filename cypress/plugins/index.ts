import injectDevServer from "@cypress/react/plugins/react-scripts";

export default (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
) => {
  injectDevServer(on, config);
  return config;
};
