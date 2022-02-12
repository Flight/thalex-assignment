import injectDevServer from "@cypress/react/plugins/react-scripts";

// eslint-disable-next-line import/no-default-export
export default (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
) => {
  injectDevServer(on, config);
  return config;
};
