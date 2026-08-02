---
title: 'Seekey 显示逻辑与桌面兼容'
description: '说明按键合并、连续输入、长按处理、layer-shell、GNOME/KDE 降级和单实例机制。'
publishDate: '2026-08-02 20:03:00'
updatedDate: '2026-08-02 20:03:00'
tags:
  - Linux
  - Wayland
  - Seekey
order: 4
---

## 按键如何成为气泡

Seekey 的输入线程使用 `poll` 和 `libevdev` 读取可访问的键盘设备，再把结构化
事件投递到 GTK 主线程。GTK 操作不会发生在输入线程中。

显示规则如下：

- 普通字符会连续拼接为一个打字气泡。
- 停顿超过 `typing-idle-ms` 后，下一字符创建新气泡。
- 含 Ctrl、Alt、Super 等修饰键的操作显示为组合键。
- 连续重复的非打字操作显示为 `Key xN`。
- 内核长按重复事件不会不断创建新气泡，而是更新同一操作的计数和生命周期。
- 第一次真实输入前显示占位气泡，便于调整位置；输入后不再恢复。

气泡超过 `duration-ms` 后立即移除，或先添加 `fading` CSS 状态，再等待
`fade-ms` 移除。`max-items` 会从左侧清理最旧项，保证浮层不会无限增长。

## niri、Hyprland 与其他 wlroots 桌面

在支持 `wlr-layer-shell` 的环境中，Seekey 使用 overlay layer，锚定屏幕底边，
并根据 `align` 决定左侧、全宽居中或右侧锚点。该表面不属于普通工作区，因此
切换工作区后仍然可见。

```ini
[general]
layer-shell=auto
margin=0
margin-horizontal=0

[style]
align=right
```

- `auto`：优先 layer-shell，不可用时降级。
- `required`：layer-shell 不可用就退出，适合确保跨工作区行为。
- `off`：始终使用普通无边框窗口。

Seekey 会记住上次使用的显示器连接器名。TUI 中可按 `W` 清除窗口状态。

## GNOME 与 KDE Plasma

GNOME 和 KDE 默认不提供 `wlr-layer-shell`。Seekey 会创建透明、无边框、
点击穿透的普通窗口；输入读取和气泡样式不受影响，但“所有工作区可见”和
固定层级需要 Mutter/KWin 窗口规则配合。

> nakanosan 按：KDE 事实上适配了 wlr-layer-shell 的接口，因此可以直接使用 layer-shell。

降级窗口使用固定 `window-width`、`window-height`，`margin` 和
`margin-horizontal` 只对 layer-shell 有效。诊断时可运行：

```sh
seekey --no-layer-shell
seekey --layer-shell required
```

## 单实例与配置预览

普通浮层使用固定 GApplication ID `dev.seekey`。同一图形会话中重复运行命令，
只会激活已有实例，不会创建多个窗口或多个输入读取器。输入层还有独立运行锁，
即使应用 ID 机制失效，也会阻止第二个 evdev 读取器。

GUI/TUI 预览使用 non-unique 子进程，但预览不打开 evdev，并由另一把用户级锁
限制为一个。编辑器退出时会发送 `SIGTERM`、等待子进程并删除临时配置；父进程
异常退出时，`PR_SET_PDEATHSIG` 也会清理预览。

下一章：[Matugen 动态配色](/notes/seekey/matugen)。
