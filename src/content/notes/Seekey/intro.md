---
title: 'Seekey 文档总览'
description: 'Wayland 按键可视化工具 Seekey 的使用、配置、兼容性和开发文档入口。'
publishDate: '2026-08-02 20:00:00'
updatedDate: '2026-08-03 01:20:00'
tags:
  - Linux
  - Wayland
  - Seekey
order: 1
---

Seekey 是一个面向 Linux Wayland 的按键可视化工具。它通过 `libevdev`
读取键盘事件，把快捷键、连续输入和可选的鼠标操作显示成屏幕边缘的临时气泡。
浮层不会获取键盘焦点，并通过空输入区域实现鼠标点击穿透。

这本笔记以 Seekey 当前 `main` 分支为准。稳定包可能晚于本文档；排查功能差异时，
先运行 `seekey --version`，再确认安装的是 `seekey` 还是 `seekey-git`。

## 阅读顺序

1. [安装与权限](/notes/seekey/installation)：AUR、源码安装和输入设备权限。
2. [配置与编辑器](/notes/seekey/configuration)：配置查找顺序、GUI/TUI 和样式字段。
3. [显示逻辑与桌面兼容](/notes/seekey/behavior-and-compatibility)：按键合并、
   layer-shell、GNOME/KDE 和单实例行为。
4. [Matugen 动态配色](/notes/seekey/matugen)：生成 `colors.json` 并让气泡跟随壁纸。
5. [问题排查](/notes/seekey/troubleshooting)：没有气泡、位置错误、配置未生效等问题。
6. [开发与测试](/notes/seekey/development)：源码结构、测试和贡献流程。

## 最短使用路径

Arch Linux 可以从 AUR 安装：

```sh
paru -S seekey
```

安装后从桌面菜单启动，或直接运行：

```sh
seekey --xdg --config-gui
seekey --xdg
```

第一次没有按键气泡，通常不是 Wayland 协议问题，而是当前用户无法读取
`/dev/input/event*`。处理方式见[安装与权限](/notes/seekey/installation)。

## 功能边界

- niri、Hyprland、Sway、river、Wayfire、labwc 可通过 layer-shell 跨工作区常驻。
- GNOME/KDE 会使用普通透明窗口，需要桌面窗口规则来实现跨工作区固定。
- 普通浮层全局唯一，重复启动不会增加输入读取器。
- GUI/TUI 在主浮层未运行时才使用独立预览子进程；主浮层存在时跳过样例，屏幕上
  始终只有一个按键渲染面。
- Seekey 只保留短时间内用于展示的按键，不提供历史记录或日志存储。

源码位于 [GitHub](https://github.com/Nakanomk/Seekey)，采用 MIT 许可证。
