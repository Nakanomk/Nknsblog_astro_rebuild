---
title: 'Seekey 开发与测试'
description: 'Seekey 的模块边界、输入与渲染数据流、测试套件和提交前检查。'
publishDate: '2026-08-02 20:06:00'
updatedDate: '2026-08-03 01:20:00'
tags:
  - C
  - GTK4
  - Wayland
  - Seekey
order: 7
---

Seekey 使用 C、GTK4、GLib、libevdev、json-glib 和 ncurses。layer-shell 在编译和
运行时都按可选能力处理，使同一二进制能在 wlroots、GNOME 和 KDE 环境运行。

## 主要模块

| 文件                    | 职责                                             |
| ----------------------- | ------------------------------------------------ |
| `src/main.c`            | GTK 应用、气泡生命周期、打字与重复合并、窗口创建 |
| `src/input.c`           | 扫描 evdev、输入线程、修饰键状态和主线程投递     |
| `src/config.c`          | INI 加载/保存、CLI、迁移、主题与 Matugen         |
| `src/gui.c`             | fuzzel 风格 GUI、桌面入口偏好、启动/关闭主浮层   |
| `src/tui.c`             | ncurses 配置编辑器及纯字段操作                   |
| `src/preview_session.c` | 主浮层状态探测与 GUI/TUI 共用的隔离预览子进程    |
| `src/layer_shell.c`     | 可选 layer-shell 加载、锚点和层级                |
| `src/runtime_lock.c`    | 用户级输入锁与预览锁                             |
| `src/window_state.c`    | 显示器与 desktop 启动偏好持久化                  |

## 数据流

```text
/dev/input/event*
    -> libevdev poll thread
    -> KeyEventMessage
    -> GLib main context
    -> typing/combo/repeat decision
    -> GTK label + timeout
```

所有 GTK 调用都留在主线程。输入线程只解析设备事件并发送结构化消息。

## 构建和测试

```sh
make
make check
```

当前测试套件包含 105 项无头单元测试，覆盖配置迁移与严格校验、Matugen 解析和
回退、TUI 字段、按键名称、CSS、窗口状态及跨进程锁。GTK 事件循环和真实 evdev
仍需运行时检查。

进一步静态检查可运行：

```sh
scan-build --status-bugs make -B seekey
```

提交前至少执行：

```sh
make check
git diff --check
./seekey --validate-config
```

源码、问题追踪和贡献入口位于
[GitHub 仓库](https://github.com/Nakanomk/Seekey)。回到[文档总览](/notes/seekey/intro)。
