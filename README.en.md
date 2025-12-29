# easy-sc

A small utility extension: right-click a Bash script in VS Code Explorer and submit it with `qsub` in one click.

## Features

- Adds a `qsub` entry to the Explorer context menu for `.sh` / `.bash` files (or when the language mode is `shellscript`)
- On click, runs: `qsub <absolute-file-path>` in the VS Code integrated terminal

## Usage

1. In the Explorer, select a Bash script (e.g. `job.sh`)
2. Right-click → `qsub`
3. A terminal named `qsub` opens and executes the submission command

## Requirements

- `qsub` must be available in your environment (i.e. `qsub` works in your terminal)

## Release Notes

### 0.0.1

- Initial release: Explorer context menu `qsub` to submit scripts
