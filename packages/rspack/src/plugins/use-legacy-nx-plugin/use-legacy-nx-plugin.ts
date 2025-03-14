import {
  type ExecutorContext,
  readCachedProjectGraph,
  readProjectsConfigurationFromProjectGraph,
  workspaceRoot,
} from '@nx/devkit';
import type { NxRspackExecutionContext } from '../../utils/config';
import type { NxAppRspackPluginOptions } from '../utils/models';
import type {
  Compiler,
  Configuration,
  RspackOptionsNormalized,
} from '@rspack/core';
import { normalizeOptions } from '../utils/plugins/normalize-options';
import { readNxJson } from 'nx/src/config/configuration';

/**
 * This function is used to wrap the legacy plugin function to be used with the `composePlugins` function.
 * Initially the rspack config would be passed to the legacy plugin function and the options would be passed as a second argument.
 * example:
 * module.exports = composePlugins(
 withNx(),
 (config) => {
 return config;
 }
 );

 Since composePlugins is async, this function is used to wrap the legacy plugin function to be async.
 Using the nxUseLegacyPlugin function, the first argument is the legacy plugin function and the second argument is the options.
 The context options are created and passed to the legacy plugin function.

 module.exports = async () => ({
 plugins: [
 ...otherPlugins,
 await nxUseLegacyPlugin(require({path}), options),
 ],
 });
 * @param fn The legacy plugin function usually from `combinedPlugins`
 * @param executorOptions The options passed usually inside the executor or the config file
 * @returns Rspack configuration
 */
export async function useLegacyNxPlugin(
  fn: (
    config: RspackOptionsNormalized,
    ctx: NxRspackExecutionContext
  ) => Promise<RspackOptionsNormalized>,
  executorOptions: NxAppRspackPluginOptions
) {
  if (global.NX_GRAPH_CREATION) {
    return;
  }
  const options = normalizeOptions(executorOptions);

  const projectGraph = readCachedProjectGraph();
  const projectName = process.env.NX_TASK_TARGET_PROJECT;
  const project = projectGraph.nodes[projectName];
  const targetName = process.env.NX_TASK_TARGET_TARGET;

  const context: ExecutorContext = {
    cwd: process.cwd(),
    isVerbose: process.env.NX_VERBOSE_LOGGING === 'true',
    root: workspaceRoot,
    projectGraph,
    projectsConfigurations:
      readProjectsConfigurationFromProjectGraph(projectGraph),
    nxJsonConfiguration: readNxJson(workspaceRoot),
    target: project.data.targets[targetName],
    targetName: targetName,
    projectName: projectName,
  };

  const configuration = process.env.NX_TASK_TARGET_CONFIGURATION;
  const ctx: NxRspackExecutionContext = {
    context,
    options: options as NxRspackExecutionContext['options'],
    configuration,
  };
  return {
    apply(compiler: Compiler) {
      compiler.hooks.beforeCompile.tapPromise('NxLegacyAsyncPlugin', () => {
        return new Promise<void>((resolve) => {
          fn(compiler.options, ctx).then((updated) => {
            // Merge options back shallowly since it's a fully functional configuration.
            // Most likely, the user modified the config in place, but this guarantees that updates are applied if users did something like:
            // `return { ...config, plugins: [...config.plugins, new MyPlugin()] }`
            Object.assign(compiler.options, updated);
            resolve();
          });
        });
      });
    },
  };
}
