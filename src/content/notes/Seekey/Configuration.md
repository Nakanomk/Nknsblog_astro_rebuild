---
title: 'Seekey 配置与编辑器'
description: 'Seekey 配置文件查找顺序、GUI/TUI、按键样式、字体、主题和常用命令参考。'
publishDate: '2026-08-02 20:02:00'
updatedDate: '2026-08-02 20:02:00'
tags:
  - Linux
  - Wayland
  - Seekey
order: 3
---

# Seekey 配置与编辑器

## 配置文件查找顺序

Seekey 每次只读取一个 INI 文件，优先级如下：

1. `--config /path/to/file.ini`
2. 传入 `--xdg` 时的 `$XDG_CONFIG_HOME/seekey/config.ini`
3. 当前工作目录的 `seekey.ini`
4. 内置默认值

普通 `seekey` 不会隐式读取 `~/.config/seekey/config.ini`；安装的 desktop 文件
会主动传入 `--xdg`。用下面的命令确认实际来源和最终值：

```sh
seekey --print-config
seekey --xdg --print-config
seekey --validate-config
```

初始化配置：

```sh
seekey --init-config
seekey --init-config --xdg
```

## GUI 和 TUI

```sh
seekey --config-gui
seekey --config-tui
```

两个编辑器都会启动独立的示例浮层，实时渲染尚未保存的样式。预览子进程不读取
evdev；用户级运行锁保证同一时间只有一个编辑器预览。GUI 根菜单会根据主浮层
状态显示“启动按键浮层”或“关闭按键浮层”。

GUI 使用 fuzzel 风格的提示行、固定列表和搜索交互，并读取
`~/.config/fuzzel/fuzzel.ini` 的布局和颜色。该文件缺失或损坏时会使用内置样式。

## 常用行为设置

```ini
[general]
duration-ms=1200
typing-idle-ms=650
fade-ms=180
max-items=5
layer-shell=auto
theme=default
merge-repeats=true
merge-modifiers=true
show-mouse=false
```

- `duration-ms`：气泡保持可见的时间。
- `typing-idle-ms`：超过该停顿后，下一个字符另开打字气泡。
- `merge-repeats`：把重复非打字操作合并为 `Key xN`。
- `merge-modifiers`：把 `Ctrl` 后续扩展为 `Ctrl + C`，而不是创建两个气泡。
- `show-mouse`：显示点击与滚轮；默认关闭。

## 布局与字体

```ini
[style]
align=right
disappear=fade
spacing=7
overlay-padding=12
key-min-width=0
key-padding-x=14
key-padding-y=8
key-radius=6
key-border-width=1
key-font-px=20
key-font-weight=700
font-family=inherit
typing-max-width=480
```

`align` 决定气泡从左、中央或固定右边界排列。`font-family=inherit` 使用桌面 GTK
字体，也可以填写 Pango 可识别的字体族。`typing-max-width=0` 表示不限制连续输入
气泡宽度。

当前主题包括 `default`、`light`、`nord`、`dracula`、`catppuccin`、
`monokai` 和 `matugen`。`[style]` 中显式写出的颜色总是覆盖主题值。

Matugen 单独见[动态配色](/notes/seekey/matugen)，窗口锚定见
[显示逻辑与桌面兼容](/notes/seekey/behavior-and-compatibility)。
