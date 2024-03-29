// Type definitions for Electron 20.3.7
// Project: http://electronjs.org/
// Definitions by: The Electron Team <https://github.com/electron/electron>
// Definitions: https://github.com/electron/electron-typescript-definitions

/// <reference types="node" />

interface NativeImage {

  // Docs: https://electronjs.org/docs/api/native-image

  /**
   * Creates an empty `NativeImage` instance.
   */
  createEmpty(): NativeImage;
  /**
   * Creates a new `NativeImage` instance from `buffer` that contains the raw bitmap
   * pixel data returned by `toBitmap()`. The specific format is platform-dependent.
   */
  createFromBitmap(buffer: Buffer, options: CreateFromBitmapOptions): NativeImage;
  /**
   * Creates a new `NativeImage` instance from `buffer`. Tries to decode as PNG or
   * JPEG first.
   */
  createFromBuffer(buffer: Buffer, options?: CreateFromBufferOptions): NativeImage;
  /**
   * Creates a new `NativeImage` instance from `dataURL`.
   */
  createFromDataURL(dataURL: string): NativeImage;
  /**
   * Creates a new `NativeImage` instance from the NSImage that maps to the given
   * image name. See `System Icons` for a list of possible values.
   *
   * The `hslShift` is applied to the image with the following rules:
   *
   * * `hsl_shift[0]` (hue): The absolute hue value for the image - 0 and 1 map to 0
   * and 360 on the hue color wheel (red).
   * * `hsl_shift[1]` (saturation): A saturation shift for the image, with the
   * following key values: 0 = remove all color. 0.5 = leave unchanged. 1 = fully
   * saturate the image.
   * * `hsl_shift[2]` (lightness): A lightness shift for the image, with the
   * following key values: 0 = remove all lightness (make all pixels black). 0.5 =
   * leave unchanged. 1 = full lightness (make all pixels white).
   *
   * This means that `[-1, 0, 1]` will make the image completely white and `[-1, 1,
   * 0]` will make the image completely black.
   *
   * In some cases, the `NSImageName` doesn't match its string representation; one
   * example of this is `NSFolderImageName`, whose string representation would
   * actually be `NSFolder`. Therefore, you'll need to determine the correct string
   * representation for your image before passing it in. This can be done with the
   * following:
   *
   * `echo -e '#import <Cocoa/Cocoa.h>\nint main() { NSLog(@"%@", SYSTEM_IMAGE_NAME);
   * }' | clang -otest -x objective-c -framework Cocoa - && ./test`
   *
   * where `SYSTEM_IMAGE_NAME` should be replaced with any value from this list.
   *
   * @platform darwin
   */
  createFromNamedImage(imageName: string, hslShift?: number[]): NativeImage;
  /**
   * Creates a new `NativeImage` instance from a file located at `path`. This method
   * returns an empty image if the `path` does not exist, cannot be read, or is not a
   * valid image.
   */
  createFromPath(path: string): NativeImage;
  /**
   * fulfilled with the file's thumbnail preview image, which is a NativeImage.
   *
   * @platform darwin,win32
   */
  createThumbnailFromPath(path: string, maxSize: Size): Promise<Electron.NativeImage>;
}

interface WebFrame extends NodeJS.EventEmitter {

  // Docs: https://electronjs.org/docs/api/web-frame

  /**
   * Attempts to free memory that is no longer being used (like images from a
   * previous navigation).
   *
   * Note that blindly calling this method probably makes Electron slower since it
   * will have to refill these emptied caches, you should only call it if an event in
   * your app has occurred that makes you think your page is actually using less
   * memory (i.e. you have navigated from a super heavy page to a mostly empty one,
   * and intend to stay there).
   */
  clearCache(): void;
  /**
   * A promise that resolves with the result of the executed code or is rejected if
   * execution throws or results in a rejected promise.
   *
   * Evaluates `code` in page.
   *
   * In the browser window some HTML APIs like `requestFullScreen` can only be
   * invoked by a gesture from the user. Setting `userGesture` to `true` will remove
   * this limitation.
   */
  executeJavaScript(code: string, userGesture?: boolean, callback?: (result: any, error: Error) => void): Promise<any>;
  /**
   * A promise that resolves with the result of the executed code or is rejected if
   * execution could not start.
   *
   * Works like `executeJavaScript` but evaluates `scripts` in an isolated context.
   *
   * Note that when the execution of script fails, the returned promise will not
   * reject and the `result` would be `undefined`. This is because Chromium does not
   * dispatch errors of isolated worlds to foreign worlds.
   */
  executeJavaScriptInIsolatedWorld(worldId: number, scripts: WebSource[], userGesture?: boolean, callback?: (result: any, error: Error) => void): Promise<any>;
  /**
   * A child of `webFrame` with the supplied `name`, `null` would be returned if
   * there's no such frame or if the frame is not in the current renderer process.
   */
  findFrameByName(name: string): WebFrame;
  /**
   * that has the supplied `routingId`, `null` if not found.
   */
  findFrameByRoutingId(routingId: number): WebFrame;
  /**
   * The frame element in `webFrame's` document selected by `selector`, `null` would
   * be returned if `selector` does not select a frame or if the frame is not in the
   * current renderer process.
   */
  getFrameForSelector(selector: string): WebFrame;
  /**
   * * `images` MemoryUsageDetails
   * * `scripts` MemoryUsageDetails
   * * `cssStyleSheets` MemoryUsageDetails
   * * `xslStyleSheets` MemoryUsageDetails
   * * `fonts` MemoryUsageDetails
   * * `other` MemoryUsageDetails
   *
   * Returns an object describing usage information of Blink's internal memory
   * caches.
   *
   * This will generate:
   */
  getResourceUsage(): ResourceUsage;
  /**
   * A list of suggested words for a given word. If the word is spelled correctly,
   * the result will be empty.
   */
  getWordSuggestions(word: string): string[];
  /**
   * The current zoom factor.
   */
  getZoomFactor(): number;
  /**
   * The current zoom level.
   */
  getZoomLevel(): number;
  /**
   * A key for the inserted CSS that can later be used to remove the CSS via
   * `webFrame.removeInsertedCSS(key)`.
   *
   * Injects CSS into the current web page and returns a unique key for the inserted
   * stylesheet.
   */
  insertCSS(css: string, options?: InsertCSSOptions): string;
  /**
   * Inserts `text` to the focused element.
   */
  insertText(text: string): void;
  /**
   * True if the word is misspelled according to the built in spellchecker, false
   * otherwise. If no dictionary is loaded, always return false.
   */
  isWordMisspelled(word: string): boolean;
  /**
   * Removes the inserted CSS from the current web page. The stylesheet is identified
   * by its key, which is returned from `webFrame.insertCSS(css)`.
   */
  removeInsertedCSS(key: string): void;
  /**
   * Set the security origin, content security policy and name of the isolated world.
   * Note: If the `csp` is specified, then the `securityOrigin` also has to be
   * specified.
   */
  setIsolatedWorldInfo(worldId: number, info: Info): void;
  /**
   * Sets a provider for spell checking in input fields and text areas.
   *
   * If you want to use this method you must disable the builtin spellchecker when
   * you construct the window.
   *
   * The `provider` must be an object that has a `spellCheck` method that accepts an
   * array of individual words for spellchecking. The `spellCheck` function runs
   * asynchronously and calls the `callback` function with an array of misspelt words
   * when complete.
   *
   * An example of using node-spellchecker as provider:
   */
  setSpellCheckProvider(language: string, provider: Provider): void;
  /**
   * Sets the maximum and minimum pinch-to-zoom level.
   *
   * > **NOTE**: Visual zoom is disabled by default in Electron. To re-enable it,
   * call:
   *
   * > **NOTE**: Visual zoom only applies to pinch-to-zoom behavior. Cmd+/-/0 zoom
   * shortcuts are controlled by the 'zoomIn', 'zoomOut', and 'resetZoom' MenuItem
   * roles in the application Menu. To disable shortcuts, manually define the Menu
   * and omit zoom roles from the definition.
   */
  setVisualZoomLevelLimits(minimumLevel: number, maximumLevel: number): void;
  /**
   * Changes the zoom factor to the specified factor. Zoom factor is zoom percent
   * divided by 100, so 300% = 3.0.
   *
   * The factor must be greater than 0.0.
   */
  setZoomFactor(factor: number): void;
  /**
   * Changes the zoom level to the specified level. The original size is 0 and each
   * increment above or below represents zooming 20% larger or smaller to default
   * limits of 300% and 50% of original size, respectively.
   *
   * > **NOTE**: The zoom policy at the Chromium level is same-origin, meaning that
   * the zoom level for a specific domain propagates across all instances of windows
   * with the same domain. Differentiating the window URLs will make zoom work
   * per-window.
   */
  setZoomLevel(level: number): void;
  /**
   * A `WebFrame | null` representing the first child frame of `webFrame`, the
   * property would be `null` if `webFrame` has no children or if first child is not
   * in the current renderer process.
   *
   */
  readonly firstChild: (WebFrame) | (null);
  /**
   * A `WebFrame | null` representing next sibling frame, the property would be
   * `null` if `webFrame` is the last frame in its parent or if the next sibling is
   * not in the current renderer process.
   *
   */
  readonly nextSibling: (WebFrame) | (null);
  /**
   * A `WebFrame | null` representing the frame which opened `webFrame`, the property
   * would be `null` if there's no opener or opener is not in the current renderer
   * process.
   *
   */
  readonly opener: (WebFrame) | (null);
  /**
   * A `WebFrame | null` representing parent frame of `webFrame`, the property would
   * be `null` if `webFrame` is top or parent is not in the current renderer process.
   *
   */
  readonly parent: (WebFrame) | (null);
  /**
   * An `Integer` representing the unique frame id in the current renderer process.
   * Distinct WebFrame instances that refer to the same underlying frame will have
   * the same `routingId`.
   *
   */
  readonly routingId: number;
  /**
   * A `WebFrame | null` representing top frame in frame hierarchy to which
   * `webFrame` belongs, the property would be `null` if top frame is not in the
   * current renderer process.
   *
   */
  readonly top: (WebFrame) | (null);

  _isEvalAllowed: () => boolean
}

interface Clipboard {

  // Docs: https://electronjs.org/docs/api/clipboard

  /**
   * An array of supported formats for the clipboard `type`.
   */
  availableFormats(type?: 'selection' | 'clipboard'): string[];
  /**
   * Clears the clipboard content.
   */
  clear(type?: 'selection' | 'clipboard'): void;
  /**
   * Whether the clipboard supports the specified `format`.
   *
   * @experimental
   */
  has(format: string, type?: 'selection' | 'clipboard'): boolean;
  /**
   * Reads `format` type from the clipboard.
   *
   * `format` should contain valid ASCII characters and have `/` separator. `a/c`,
   * `a/bc` are valid formats while `/abc`, `abc/`, `a/`, `/a`, `a` are not valid.
   *
   * @experimental
   */
  read(format: string): string;
  /**
   * * `title` string
   * * `url` string
   *
   * Returns an Object containing `title` and `url` keys representing the bookmark in
   * the clipboard. The `title` and `url` values will be empty strings when the
   * bookmark is unavailable.  The `title` value will always be empty on Windows.
   *
   * @platform darwin,win32
   */
  readBookmark(): ReadBookmark;
  /**
   * Reads `format` type from the clipboard.
   *
   * @experimental
   */
  readBuffer(format: string): Buffer;
  /**
   * The text on the find pasteboard, which is the pasteboard that holds information
   * about the current state of the active application’s find panel.
   *
   * This method uses synchronous IPC when called from the renderer process. The
   * cached value is reread from the find pasteboard whenever the application is
   * activated.
   *
   * @platform darwin
   */
  readFindText(): string;
  /**
   * The content in the clipboard as markup.
   */
  readHTML(type?: 'selection' | 'clipboard'): string;
  /**
   * The image content in the clipboard.
   */
  readImage(type?: 'selection' | 'clipboard'): NativeImage;
  /**
   * The content in the clipboard as RTF.
   */
  readRTF(type?: 'selection' | 'clipboard'): string;
  /**
   * The content in the clipboard as plain text.
   */
  readText(type?: 'selection' | 'clipboard'): string;
  /**
   * Writes `data` to the clipboard.
   */
  write(data: Data, type?: 'selection' | 'clipboard'): void;
  /**
   * Writes the `title` (macOS only) and `url` into the clipboard as a bookmark.
   *
   * **Note:** Most apps on Windows don't support pasting bookmarks into them so you
   * can use `clipboard.write` to write both a bookmark and fallback text to the
   * clipboard.
   *
   * @platform darwin,win32
   */
  writeBookmark(title: string, url: string, type?: 'selection' | 'clipboard'): void;
  /**
   * Writes the `buffer` into the clipboard as `format`.
   *
   * @experimental
   */
  writeBuffer(format: string, buffer: Buffer, type?: 'selection' | 'clipboard'): void;
  /**
   * Writes the `text` into the find pasteboard (the pasteboard that holds
   * information about the current state of the active application’s find panel) as
   * plain text. This method uses synchronous IPC when called from the renderer
   * process.
   *
   * @platform darwin
   */
  writeFindText(text: string): void;
  /**
   * Writes `markup` to the clipboard.
   */
  writeHTML(markup: string, type?: 'selection' | 'clipboard'): void;
  /**
   * Writes `image` to the clipboard.
   */
  writeImage(image: NativeImage, type?: 'selection' | 'clipboard'): void;
  /**
   * Writes the `text` into the clipboard in RTF.
   */
  writeRTF(text: string, type?: 'selection' | 'clipboard'): void;
  /**
   * Writes the `text` into the clipboard as plain text.
   */
  writeText(text: string, type?: 'selection' | 'clipboard'): void;
}

interface CrashReporter {

  // Docs: https://electronjs.org/docs/api/crash-reporter

  /**
   * Set an extra parameter to be sent with the crash report. The values specified
   * here will be sent in addition to any values set via the `extra` option when
   * `start` was called.
   *
   * Parameters added in this fashion (or via the `extra` parameter to
   * `crashReporter.start`) are specific to the calling process. Adding extra
   * parameters in the main process will not cause those parameters to be sent along
   * with crashes from renderer or other child processes. Similarly, adding extra
   * parameters in a renderer process will not result in those parameters being sent
   * with crashes that occur in other renderer processes or in the main process.
   *
   * **Note:** Parameters have limits on the length of the keys and values. Key names
   * must be no longer than 39 bytes, and values must be no longer than 20320 bytes.
   * Keys with names longer than the maximum will be silently ignored. Key values
   * longer than the maximum length will be truncated.
   */
  addExtraParameter(key: string, value: string): void;     /**
   * The current 'extra' parameters of the crash reporter.
   */
  getParameters(): Record<string, string>;
  /**
   * Remove an extra parameter from the current set of parameters. Future crashes
   * will not include this parameter.
   */
  removeExtraParameter(key: string): void;
}


interface ContextBridge {
  // Docs: https://electronjs.org/docs/api/context-bridge

  exposeInMainWorld(apiKey: string, api: any): void;
}


interface IpcRenderer extends NodeJS.EventEmitter {

  // Docs: https://electronjs.org/docs/api/ipc-renderer

  /**
   * Resolves with the response from the main process.
   *
   * Send a message to the main process via `channel` and expect a result
   * asynchronously. Arguments will be serialized with the Structured Clone
   * Algorithm, just like `window.postMessage`, so prototype chains will not be
   * included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw
   * an exception.
   *
   * The main process should listen for `channel` with `ipcMain.handle()`.
   *
   * For example:
   *
   * If you need to transfer a `MessagePort` to the main process, use
   * `ipcRenderer.postMessage`.
   *
   * If you do not need a response to the message, consider using `ipcRenderer.send`.
   *
   * > **Note** Sending non-standard JavaScript types such as DOM objects or special
   * Electron objects will throw an exception.
   *
   * Since the main process does not have support for DOM objects such as
   * `ImageBitmap`, `File`, `DOMMatrix` and so on, such objects cannot be sent over
   * Electron's IPC to the main process, as the main process would have no way to
   * decode them. Attempting to send such objects over IPC will result in an error.
   *
   * > **Note** If the handler in the main process throws an error, the promise
   * returned by `invoke` will reject. However, the `Error` object in the renderer
   * process will not be the same as the one thrown in the main process.
   */
  invoke(channel: string, ...args: any[]): Promise<any>;
  /**
   * Listens to `channel`, when a new message arrives `listener` would be called with
   * `listener(event, args...)`.
   */
  on(channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void): this;
  /**
   * Adds a one time `listener` function for the event. This `listener` is invoked
   * only the next time a message is sent to `channel`, after which it is removed.
   */
  once(channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void): this;
  /**
   * Send a message to the main process, optionally transferring ownership of zero or
   * more `MessagePort` objects.
   *
   * The transferred `MessagePort` objects will be available in the main process as
   * `MessagePortMain` objects by accessing the `ports` property of the emitted
   * event.
   *
   * For example:
   *
   * For more information on using `MessagePort` and `MessageChannel`, see the MDN
   * documentation.
   */
  postMessage(channel: string, message: any, transfer?: MessagePort[]): void;
  /**
   * Removes all listeners, or those of the specified `channel`.
   */
  removeAllListeners(channel: string): this;
  /**
   * Removes the specified `listener` from the listener array for the specified
   * `channel`.
   */
  removeListener(channel: string, listener: (...args: any[]) => void): this;
  /**
   * Send an asynchronous message to the main process via `channel`, along with
   * arguments. Arguments will be serialized with the Structured Clone Algorithm,
   * just like `window.postMessage`, so prototype chains will not be included.
   * Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an
   * exception.
   *
   * > **NOTE:** Sending non-standard JavaScript types such as DOM objects or special
   * Electron objects will throw an exception.
   *
   * Since the main process does not have support for DOM objects such as
   * `ImageBitmap`, `File`, `DOMMatrix` and so on, such objects cannot be sent over
   * Electron's IPC to the main process, as the main process would have no way to
   * decode them. Attempting to send such objects over IPC will result in an error.
   *
   * The main process handles it by listening for `channel` with the `ipcMain`
   * module.
   *
   * If you need to transfer a `MessagePort` to the main process, use
   * `ipcRenderer.postMessage`.
   *
   * If you want to receive a single response from the main process, like the result
   * of a method call, consider using `ipcRenderer.invoke`.
   */
  send(channel: string, ...args: any[]): void;
  /**
   * The value sent back by the `ipcMain` handler.
   *
   * Send a message to the main process via `channel` and expect a result
   * synchronously. Arguments will be serialized with the Structured Clone Algorithm,
   * just like `window.postMessage`, so prototype chains will not be included.
   * Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an
   * exception.
   *
   * > **NOTE:** Sending non-standard JavaScript types such as DOM objects or special
   * Electron objects will throw an exception.
   *
   * Since the main process does not have support for DOM objects such as
   * `ImageBitmap`, `File`, `DOMMatrix` and so on, such objects cannot be sent over
   * Electron's IPC to the main process, as the main process would have no way to
   * decode them. Attempting to send such objects over IPC will result in an error.
   *
   * The main process handles it by listening for `channel` with `ipcMain` module,
   * and replies by setting `event.returnValue`.
   *
   * > :warning: **WARNING**: Sending a synchronous message will block the whole
   * renderer process until the reply is received, so use this method only as a last
   * resort. It's much better to use the asynchronous version, `invoke()`.
   */
  sendSync(channel: string, ...args: any[]): any;
  /**
   * Sends a message to a window with `webContentsId` via `channel`.
   */
  sendTo(webContentsId: number, channel: string, ...args: any[]): void;
  /**
   * Like `ipcRenderer.send` but the event will be sent to the `<webview>` element in
   * the host page instead of the main process.
   */
  sendToHost(channel: string, ...args: any[]): void;

  _events: {}

  _eventsCount: 0

  _maxListeners: undefined

}

interface Shell {

  // Docs: https://electronjs.org/docs/api/shell

  /**
   * Play the beep sound.
   */
  beep(): void;
  /**
   * Open the given external protocol URL in the desktop's default manner. (For
   * example, mailto: URLs in the user's default mail agent).
   */
  openExternal(url: string, options?: OpenExternalOptions): Promise<void>;
  /**
   * Resolves with a string containing the error message corresponding to the failure
   * if a failure occurred, otherwise "".
   *
   * Open the given file in the desktop's default manner.
   */
  openPath(path: string): Promise<string>;
  /**
   * Show the given file in a file manager. If possible, select the file.
   */
  showItemInFolder(fullPath: string): void;
  /**
   * Resolves when the operation has been completed. Rejects if there was an error
   * while deleting the requested item.
   *
   * This moves a path to the OS-specific trash location (Trash on macOS, Recycle Bin
   * on Windows, and a desktop-environment-specific location on Linux).
   */
  trashItem(path: string): Promise<void>;
}

interface UtoolsElectron {
  clipboard: Clipboard
  contextBridge: ContextBridge;
  crashReporter: CrashReporter
  ipcRenderer: IpcRenderer
  nativeImage: NativeImage
  shell: Shell
  webFrame: WebFrame
  /** @deprecated */
  deprecate: any
}

declare var electron: UtoolsElectron;
