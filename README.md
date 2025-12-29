# easy-sc

`easy-sc` is a VS Code extension focused on providing convenient job management workflows for PBS-based HPC (supercomputer) users.

## Current Features

### Easy `qsub` from the File Explorer

- Right-click a Bash script in the VS Code Explorer and choose `qsub` to submit it.
- Supports single selection and multi-selection. When multiple scripts are selected, it submits them sequentially in one line (e.g. `qsub "file1" && qsub "file2"`).
- Submissions are executed in the VS Code integrated terminal (a terminal named `qsub` will be opened).

## Requirements

- `qsub` must be available in your environment (i.e. `qsub` works in your terminal/session on the target machine).
- Applies to `.sh` / `.bash` files (or when the language mode is `shellscript`).

## Release Notes

### 0.0.1

- Initial release: Explorer context menu `qsub` for quick submission

## Build from Source and Contribution

Please reference [vscode official doc](https://code.visualstudio.com/api/get-started/your-first-extension)