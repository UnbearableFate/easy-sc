# easy-sc

一个小工具扩展：在 VS Code 的文件 Explorer 里，右键 bash 脚本，一键执行 `qsub`。

## 功能

- 在 Explorer 里右键 `.sh` / `.bash`（或语言模式为 `shellscript`）文件时，菜单中出现 `qsub`
- 点击后会在 VS Code 集成终端执行：`qsub <文件绝对路径>`

## 使用方法

1. 在文件 Explorer 中选中一个 bash 脚本（例如 `job.sh`）
2. 右键 → `qsub`
3. 会打开一个名为 `qsub` 的集成终端并执行提交命令

## 依赖/要求

- 系统环境中需要存在 `qsub` 命令（可在终端直接运行 `qsub`）

## Release Notes

### 0.0.1

- 初始版本：Explorer 右键 `qsub` 提交脚本
