/* auto-generated by NAPI-RS */
/* eslint-disable */

export declare class ExternalObject<T> {
  readonly '': {
    readonly '': unique symbol
    [K: symbol]: T
  }
}
export declare class ChildProcess {
  kill(): void
  onExit(callback: (message: string) => void): void
  onOutput(callback: (message: string) => void): void
}

export declare class HashPlanner {
  constructor(nxJson: NxJson, projectGraph: ExternalObject<ProjectGraph>)
  getPlans(taskIds: Array<string>, taskGraph: TaskGraph): Record<string, string[]>
  getPlansReference(taskIds: Array<string>, taskGraph: TaskGraph): JsExternal
}

export declare class ImportResult {
  file: string
  sourceProject: string
  dynamicImportExpressions: Array<string>
  staticImportExpressions: Array<string>
}

export declare class NxCache {
  cacheDirectory: string
  constructor(workspaceRoot: string, cachePath: string, dbConnection: ExternalObject<Connection>)
  get(hash: string): CachedResult | null
  put(hash: string, terminalOutput: string, outputs: Array<string>, code: number): void
  applyRemoteCacheResults(hash: string, result: CachedResult): void
  getTaskOutputsPath(hash: string): string
  copyFilesFromCache(cachedResult: CachedResult, outputs: Array<string>): void
  removeOldCacheRecords(): void
}

export declare class NxTaskHistory {
  constructor(db: ExternalObject<Connection>)
  recordTaskRuns(taskRuns: Array<TaskRun>): void
  getFlakyTasks(hashes: Array<string>): Array<string>
}

export declare class RustPseudoTerminal {
  constructor()
  runCommand(command: string, commandDir?: string | undefined | null, jsEnv?: Record<string, string> | undefined | null, execArgv?: Array<string> | undefined | null, quiet?: boolean | undefined | null, tty?: boolean | undefined | null): ChildProcess
  /**
   * This allows us to run a pseudoterminal with a fake node ipc channel
   * this makes it possible to be backwards compatible with the old implementation
   */
  fork(id: string, forkScript: string, pseudoIpcPath: string, commandDir: string | undefined | null, jsEnv: Record<string, string> | undefined | null, execArgv: Array<string> | undefined | null, quiet: boolean): ChildProcess
}

export declare class TaskDetails {
  constructor(db: ExternalObject<Connection>)
  recordTaskDetails(tasks: Array<HashedTask>): void
}

export declare class TaskHasher {
  constructor(workspaceRoot: string, projectGraph: ExternalObject<ProjectGraph>, projectFileMap: ExternalObject<ProjectFiles>, allWorkspaceFiles: ExternalObject<Array<FileData>>, tsConfig: Buffer, tsConfigPaths: Record<string, Array<string>>, options?: HasherOptions | undefined | null)
  hashPlans(hashPlans: ExternalObject<Record<string, Array<HashInstruction>>>, jsEnv: Record<string, string>): NapiDashMap
}

export declare class Watcher {
  origin: string
  /**
   * Creates a new Watcher instance.
   * Will always ignore the following directories:
   * * .git/
   * * node_modules/
   * * .nx/
   */
  constructor(origin: string, additionalGlobs?: Array<string> | undefined | null, useIgnore?: boolean | undefined | null)
  watch(callback: (err: string | null, events: WatchEvent[]) => void): void
  stop(): Promise<void>
}

export declare class WorkspaceContext {
  workspaceRoot: string
  constructor(workspaceRoot: string, cacheDir: string)
  getWorkspaceFiles(projectRootMap: Record<string, string>): NxWorkspaceFiles
  glob(globs: Array<string>, exclude?: Array<string> | undefined | null): Array<string>
  hashFilesMatchingGlob(globs: Array<string>, exclude?: Array<string> | undefined | null): string
  incrementalUpdate(updatedFiles: Array<string>, deletedFiles: Array<string>): Record<string, string>
  updateProjectFiles(projectRootMappings: ProjectRootMappings, projectFiles: ExternalObject<ProjectFiles>, globalFiles: ExternalObject<Array<FileData>>, updatedFiles: Record<string, string>, deletedFiles: Array<string>): UpdatedWorkspaceFiles
  allFileData(): Array<FileData>
  getFilesInDirectory(directory: string): Array<string>
}

export interface CachedResult {
  code: number
  terminalOutput: string
  outputsPath: string
}

export declare export function connectToNxDb(cacheDir: string, nxVersion: string): ExternalObject<Connection>

export declare export function copy(src: string, dest: string): void

export interface DepsOutputsInput {
  dependentTasksOutputFiles: string
  transitive?: boolean
}

export interface EnvironmentInput {
  env: string
}

export declare const enum EventType {
  delete = 'delete',
  update = 'update',
  create = 'create'
}

export declare export function expandOutputs(directory: string, entries: Array<string>): Array<string>

export interface ExternalDependenciesInput {
  externalDependencies: Array<string>
}

export interface ExternalNode {
  packageName?: string
  version: string
  hash?: string
}

export interface FileData {
  file: string
  hash: string
}

export interface FileMap {
  projectFileMap: ProjectFiles
  nonProjectFiles: Array<FileData>
}

export interface FileSetInput {
  fileset: string
}

export declare export function findImports(projectFileMap: Record<string, Array<string>>): Array<ImportResult>

export declare export function getBinaryTarget(): string

/**
 * Expands the given outputs into a list of existing files.
 * This is used when hashing outputs
 */
export declare export function getFilesForOutputs(directory: string, entries: Array<string>): Array<string>

export declare export function getTransformableOutputs(outputs: Array<string>): Array<string>

export declare export function hashArray(input: Array<string>): string

export interface HashDetails {
  value: string
  details: Record<string, string>
}

export interface HashedTask {
  hash: string
  project: string
  target: string
  configuration?: string
}

export interface HasherOptions {
  selectivelyHashTsConfig: boolean
}

export declare export function hashFile(file: string): string | null

export interface InputsInput {
  input: string
  dependencies?: boolean
  projects?: string | Array<string>
}

export const IS_WASM: boolean

/** Stripped version of the NxJson interface for use in rust */
export interface NxJson {
  namedInputs?: Record<string, Array<JsInputs>>
}

export interface NxWorkspaceFiles {
  projectFileMap: ProjectFiles
  globalFiles: Array<FileData>
  externalReferences?: NxWorkspaceFilesExternals
}

export interface NxWorkspaceFilesExternals {
  projectFiles: ExternalObject<ProjectFiles>
  globalFiles: ExternalObject<Array<FileData>>
  allWorkspaceFiles: ExternalObject<Array<FileData>>
}

export interface Project {
  root: string
  namedInputs?: Record<string, Array<JsInputs>>
  tags?: Array<string>
  targets: Record<string, Target>
}

export interface ProjectGraph {
  nodes: Record<string, Project>
  dependencies: Record<string, Array<string>>
  externalNodes: Record<string, ExternalNode>
}

export declare export function remove(src: string): void

export interface RuntimeInput {
  runtime: string
}

export interface Target {
  executor?: string
  inputs?: Array<JsInputs>
  outputs?: Array<string>
  options?: string
  configurations?: string
  parallelism?: boolean
}

export interface Task {
  id: string
  target: TaskTarget
  outputs: Array<string>
  projectRoot?: string
}

export interface TaskGraph {
  roots: Array<string>
  tasks: Record<string, Task>
  dependencies: Record<string, Array<string>>
}

export interface TaskRun {
  hash: string
  status: string
  code: number
  start: number
  end: number
}

export interface TaskTarget {
  project: string
  target: string
  configuration?: string
}

export declare export function testOnlyTransferFileMap(projectFiles: Record<string, Array<FileData>>, nonProjectFiles: Array<FileData>): NxWorkspaceFilesExternals

/**
 * Transfer the project graph from the JS world to the Rust world, so that we can pass the project graph via memory quicker
 * This wont be needed once the project graph is created in Rust
 */
export declare export function transferProjectGraph(projectGraph: ProjectGraph): ExternalObject<ProjectGraph>

export interface UpdatedWorkspaceFiles {
  fileMap: FileMap
  externalReferences: NxWorkspaceFilesExternals
}

export declare export function validateOutputs(outputs: Array<string>): void

export interface WatchEvent {
  path: string
  type: EventType
}

/** Public NAPI error codes that are for Node */
export declare const enum WorkspaceErrors {
  ParseError = 'ParseError',
  Generic = 'Generic'
}

