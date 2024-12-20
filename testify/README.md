
## Shortcut key
KeyBinding: `Ctrl+Alt+g`

### Works
when: A condition under which the keybinding is active. Here are some common conditions:
    - editorTextFocus: Active when the text editor is focused.
    - resourceLangId == javascript || resourceLangId == typescript: Active only for JavaScript or TypeScript files.
    - explorerViewletVisible: Active when the Explorer viewlet is visible.

### Clear package.json file path
Testify prompt you to select your package.json file path during your first test generation, it makes use of the file in it subsequent operations.

You can clear the file path by typing the command `ctrl+shift+P` and search for Testify: Clear Stored package.json Path