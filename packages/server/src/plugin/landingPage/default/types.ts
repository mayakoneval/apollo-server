export interface ApolloServerPluginLandingPageDefaultBaseOptions {
  /**
   * By default, the landing page plugin uses the latest version of the landing
   * page published to Apollo's CDN. If you'd like to pin the current version,
   * pass the SHA served at
   * https://apollo-server-landing-page.cdn.apollographql.com/_latest/version.txt
   * here.
   */
  version?: string;
  /**
   * Set to false to suppress the footer which explains how to configure the
   * landing page.
   */
  footer?: boolean;
  /**
   * Users can configure their landing page to link to Studio Explorer with a
   * document loaded in the UI.
   */
  document?: string;
  /**
   * Users can configure their landing page to link to Studio Explorer with
   * variables loaded in the UI.
   */
  variables?: Record<string, any>;

  /**
   * Users can configure their landing page to link to Studio Explorer with
   * headers loaded in the UI.
   */
  headers?: Record<string, string>;

  includeCookies?: boolean;
  // For Apollo use only.
  __internal_apolloStudioEnv__?: 'staging' | 'prod';
}

export interface ApolloServerPluginNonEmbeddedLandingPageLocalDefaultOptions
  extends ApolloServerPluginLandingPageDefaultBaseOptions {
  /**
   * Users can configure their landing page to render an embedded Explorer if
   * given a graphRef, or an embedded Sandbox if there is not graphRef provided.
   */
  embed: false;
}

export interface ApolloServerPluginNonEmbeddedLandingPageProductionDefaultOptions
  extends ApolloServerPluginLandingPageDefaultBaseOptions {
  /**
   * If specified, provide a link (with opt-in auto-redirect) to the Studio page
   * for the given graphRef. (You need to explicitly pass this here rather than
   * relying on the server's ApolloConfig, because if your server is publicly
   * accessible you may not want to display the graph ref publicly.)
   */
  graphRef?: string;
  /**
   * Users can configure their landing page to render an embedded Explorer if
   * given a graphRef, or an embedded Sandbox if there is not graphRef provided.
   */
  embed?: false;
}

export interface ApolloServerPluginEmbeddedLandingPageLocalDefaultOptions
  extends ApolloServerPluginLandingPageDefaultBaseOptions {
  /**
   * Users can configure their landing page to render an embedded Explorer if
   * given a graphRef, or an embedded Sandbox if there is not graphRef provided.
   */
  embed?: true | EmbeddableSandboxOptions;
  /**
   * The ID of a collection, paired with an operation ID to populate in the Sandbox on load.
   *
   * You can find these values from a registered graph in Studio by
   * clicking the ... menu next to an operation in the Explorer of that graph and
   * selecting View operation details.
   */
  defaultOperation?: {
    collectionId?: string;
    operationId?: string;
  };
}

export interface ApolloServerPluginEmbeddedLandingPageProductionDefaultOptions
  extends ApolloServerPluginLandingPageDefaultBaseOptions {
  /**
   * Use this registered's graphs schema to populate the embedded Explorer.
   * Required if passing `embed: true`
   */
  graphRef: string;
  /**
   * Users can configure their landing page to render an embedded Explorer.
   */
  embed: true | EmbeddableExplorerOptions;
  /**
   * The ID of a collection, paired with an operation ID to populate in the Sandbox on load.
   *
   * You can find these values from a registered graph in Studio by
   * clicking the ... menu next to an operation in the Explorer of that graph and
   * selecting View operation details.
   */
  defaultOperation?: {
    collectionId?: string;
    operationId?: string;
  };
}

type EmbeddableSandboxOptions = {
  initialState?: {
    /**
     * If true, the embedded Sandbox periodically polls your initialEndpoint for schema updates.
     *
     * The default value is true.
     */
    pollForSchemaUpdates?: boolean;
    /**
     * Headers that are applied by default to every operation executed by the landing page's Sandbox.
     * Users can disable the application of these headers, but they can't modify their values.
     *
     * The landing page's Sandbox always includes these headers in its introspection queries
     * to your endpoint.
     */
    sharedHeaders?: Record<string, string>;
  };
  /**
   * By default, the Apollo Server embedded Sandbox has a url input box that is not editable by users.
   *
   * Set `endpointIsEditable` to `true` to enable users of your
   * Apollo Server landing page to change the endpoint url.
   */
  endpointIsEditable?: boolean;
};

type EmbeddableExplorerOptions = {
  /**
   * Display options can be configured for the embedded Explorer.
   */
  displayOptions?: {
    /**
     * If true, the embedded Explorer includes the panels for setting
     * request headers and environment variables.
     * If false, those panels are not present.
     *
     * The default value is true.
     */
    showHeadersAndEnvVars: boolean;
    /**
     * If open, the Explorer's Documentation panel (the left column) is
     * initially expanded. If closed, the panel is initially collapsed.
     *
     * The default value is open.
     */
    docsPanelState: 'open' | 'closed';
    /**
     * If dark, the Explorer's dark theme is used. If light, the light theme is used.
     *
     * The default value is dark.
     */
    theme: 'light' | 'dark';
  };
  /**
   * If true, the embedded Explorer uses localStorage to persist its state
   * (including operations, tabs, variables, and headers) between user sessions.
   * This state is automatically populated in the Explorer on page load.
   *
   * If false, the embedded Explorer loads with an example query
   * based on your schema (unless you provide document).
   *
   * The default value is false.
   */
  persistExplorerState: boolean;
};

export type ApolloServerPluginLandingPageLocalDefaultOptions =
  | ApolloServerPluginEmbeddedLandingPageLocalDefaultOptions
  | ApolloServerPluginNonEmbeddedLandingPageLocalDefaultOptions;

export type ApolloServerPluginLandingPageProductionDefaultOptions =
  | ApolloServerPluginEmbeddedLandingPageProductionDefaultOptions
  | ApolloServerPluginNonEmbeddedLandingPageProductionDefaultOptions;

export type LandingPageConfig =
  | ApolloServerPluginLandingPageLocalDefaultOptions
  | ApolloServerPluginLandingPageProductionDefaultOptions;
