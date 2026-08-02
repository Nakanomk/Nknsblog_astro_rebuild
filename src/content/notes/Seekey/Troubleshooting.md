---
title: 'Seekey 问题排查'
description: '排查没有按键气泡、配置未生效、Matugen 回退、窗口位置和重复实例问题。'
publishDate: '2026-08-02 20:05:00'
updatedDate: '2026-08-03 01:20:00'
tags:
  - Linux
  - Wayland
  - Seekey
order: 6
---

## 没有按键气泡

先查看输入设备权限：

```sh
groups
ls -l /dev/input/event*
seekey --debug-input
```

若没有任何可读键盘，Seekey 会明确报告 `No readable keyboard devices`。
使用安装脚本配置 udev/用户组后需要重新登录。不要用 `sudo seekey` 绕过权限。

## 修改配置后没有变化

```sh
seekey --print-config
seekey --xdg --print-config
seekey --validate-config
```

查找顺序是 `--config`、`--xdg`、当前目录 `seekey.ini`、内置默认值。desktop
入口使用 `--xdg`，终端里的普通 `seekey` 可能读取了当前目录配置。

Seekey 在启动时读取配置。编辑文件或重新生成 Matugen 颜色后，需要重启主浮层。

## Matugen 看起来没有生效

```sh
jq . ~/.cache/matugen/colors.json
seekey --xdg --print-config
```

确认 JSON 根对象中有 `colors`，并包含 `surface`、`on_surface`、`outline` 和
`outline_variant`。未知角色不会以字面值进入 GTK CSS，而是使用静态回退色；
因此“看起来像默认主题”往往表示路径或角色错误。

完整设置见 [Matugen 动态配色](/notes/seekey/matugen)。

## 窗口切换工作区后消失

运行时日志应显示 layer-shell 已启用。可以要求严格模式：

```sh
seekey --layer-shell required
```

GNOME/KDE 默认只能使用普通窗口，需要配置“所有工作区可见”和置顶规则。
`margin`、`margin-horizontal` 在普通窗口模式下不控制位置。

## 怀疑启动了多个 Seekey

```sh
pgrep -a seekey
```

真实输入浮层没有运行时，配置编辑器会创建一个不读取 evdev 的预览子进程；主浮
层已经运行时则跳过样例。GUI 中关闭主浮层后才补上样例，启动主浮层前会先删除
样例，因此正常情况下只应看到一个按键渲染面。普通主浮层仍通过 GApplication ID
和输入锁保持唯一。

## GUI 样式与 fuzzel 不一致

Seekey 读取 `~/.config/fuzzel/fuzzel.ini` 的 `font`、`lines`、`width`、padding、
border 和标准 `[colors]`。重复的 `[colors]` 段由 GLib key file 规则合并，后写
的同名键生效。缺失的 GTK CSS `@import` 会由 GTK 报警，但不属于 Seekey 配置。

若仍无法定位，可带上以下输出提交 issue：

```sh
seekey --version
seekey --print-config
echo "$XDG_CURRENT_DESKTOP"
```
