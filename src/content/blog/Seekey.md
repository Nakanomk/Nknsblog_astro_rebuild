---
title: 'Seekey：为 Wayland 写一个真正能常驻的按键显示器'
publishDate: 2026-08-02 18:09:49
description: '介绍我为 niri、Hyprland、GNOME 与 KDE 编写的轻量按键可视化工具 Seekey 0.2.1。'
tags:
  - Linux
  - Wayland
  - 开源
  - Seekey
language: '中文'
heroImage: { src: '../../../public/covers/Sixianglu.webp', color: '#c8a598' }
---

## 我需要一个 Wayland 下的按键显示器

录屏、直播或者演示软件时，把刚刚按下的快捷键显示在屏幕上是一件很自然的事。然而来到 Wayland 之后，这件事没有想象中简单：应用不能再随意监听全局键盘事件，不同合成器对悬浮窗口的处理也不完全相同。能在一个桌面里工作的方案，换到另一个桌面后可能无法置顶，甚至切一次工作区就消失。

我想要的工具很明确：它应当轻量、点击穿透、不会抢走焦点，能够把最近的操作稳定地留在屏幕边缘，同时兼顾 niri、Hyprland 这类合成器和 GNOME、KDE 这样的完整桌面环境。

于是便有了 [Seekey](/notes/seekey/intro)。

![Seekey 在 Wayland 桌面上显示按键气泡](https://img.nkns.cc/2026/06/0de85ce2c0f23714d6743a3e4696fbca.png)

这篇文章介绍它为什么存在；完整的安装、配置和排错内容已经整理到
[Seekey 文档笔记](/notes/seekey/intro)。

## 它如何显示按键

Seekey 直接通过 `libevdev` 读取 `/dev/input/event*`，不依赖某个合成器私有的键盘协议。按键会以横向排列的气泡从固定边界出现，并在设定时间后直接消失或渐隐。

显示逻辑也不只是把每个事件机械地打印出来：

- 连续打字会自动拼成一段文本，停顿一段时间后再开始新的气泡；
- `Ctrl + Shift + P` 之类的组合键会作为一个整体显示；
- 连续触发相同的非打字操作会合并为 `Key xN`，长按不会铺满整个屏幕；
- 方向键、鼠标键和其他特殊按键可以使用内置图标，也可以在配置中替换；
- 启动后会先保留一个占位气泡，方便在没有输入时调整窗口位置。

这套行为的目标不是记录输入，而是只保留眼前真正有用的操作。气泡存在于内存中，过期即被移除；窗口不接受输入，鼠标点击也会直接穿透到下面的应用。

## 在不同桌面上保持稳定

在 niri、Hyprland、Sway、river、Wayfire 和 labwc 上，Seekey 会优先使用 `gtk4-layer-shell`，把窗口锚定到屏幕边缘。它不属于普通工作区窗口，因此切换工作区后仍能留在屏幕上，还会记住上次使用的显示器。

GNOME 与 KDE 默认不支持 `wlr-layer-shell`，Seekey 会自动降级为透明的普通窗口。按键读取和气泡渲染仍然可用，只是跨工作区置顶需要配合桌面自身的窗口规则。程序会明确报告当前使用的模式，而不是静默地表现异常。

普通渲染进程使用唯一的应用 ID，同一会话中重复启动不会产生多个输入读取器。配置菜单也能判断浮层是否正在运行：未运行时显示启动操作，运行后则可以直接从菜单关闭，不必再用 `killall` 收尾。

## 配置不应该靠猜

Seekey 目前提供两种配置界面。

图形界面遵循 fuzzel 的紧凑启动器布局，可以搜索设置并直接修改数值、开关、主题和字体。它会读取现有的 `~/.config/fuzzel/fuzzel.ini` 配色；文件不存在或内容损坏时，则回退到内置样式。终端用户也可以使用 TUI 完成同样的配置工作。

无论打开 GUI 还是 TUI，屏幕上都会同时渲染真实的按键浮层预览。调整按键尺寸、字体、背景、边框宽度、圆角、对齐方式、显示时长或者渐隐速度时，不需要反复保存、退出再启动。Seekey 当前提供七套内置主题、自定义图标和 `@matugen:<role>` 颜色引用，可以让气泡跟随壁纸配色。各字段和配置文件优先级见[配置与编辑器](/notes/seekey/configuration)。

```sh
seekey --config-gui    # 图形配置菜单
seekey --config-tui    # 终端配置界面
seekey                 # 启动按键浮层
```

### 让配色跟随 Matugen

按键气泡的 Matugen 配色写在 Seekey 自己的配置文件里。默认情况下，Seekey 会读取 `$XDG_CACHE_HOME/matugen/colors.json`，也就是通常的 `~/.cache/matugen/colors.json`，然后在 `[style]` 中用 `@matugen:<role>` 引用 Material You 颜色：

```ini
[style]
foreground=@matugen:on_surface
background=@matugen:surface@0.86
border-color=@matugen:outline@0.45
placeholder-foreground=@matugen:on_surface@0.74
placeholder-background=@matugen:surface@0.56
placeholder-border-color=@matugen:outline_variant@0.65
```

末尾的 `@0.86` 是透明度；例如 `@matugen:surface@0.86` 会解析为带 86% 不透明度的 `surface` 色。若 `colors.json` 位于其他位置，可以通过 `MATUGEN_COLORS` 环境变量或 `seekey --matugen /path/to/colors.json` 指定。Matugen 重新生成颜色后需要重启按键浮层，新的配色才会生效。模板和壁纸脚本示例见 [Matugen 动态配色](/notes/seekey/matugen)。

这里还有一层需要分清：上面的配置控制的是**按键气泡**；配置 GUI 自身则读取 `~/.config/fuzzel/fuzzel.ini`。因此，若 Matugen 已经为 fuzzel 生成配色，Seekey 的配置菜单也会保持相同的桌面色彩，而不是另外维护一套菜单主题。

安装后还会生成 desktop 文件。第一次从应用菜单打开时，可以选择以后默认进入配置菜单，或者直接显示按键浮层。

## 安装 Seekey

Arch Linux 用户可以直接从 AUR 安装稳定版：

```sh
paru -S seekey
```

希望持续跟随 `main` 分支更新，则可以使用：

```sh
paru -S seekey-git
```

其他发行版可以从源码安装。仓库提供的脚本会处理依赖、编译、desktop 文件和输入设备权限：

```sh
git clone https://github.com/Nakanomk/Seekey.git
cd Seekey
./install.sh
```

第一次运行若没有按键出现，通常是当前用户还没有读取输入设备的权限。安装脚本会配置相应用户组，重新登录后即可生效；手动安装和各发行版的处理方式可以查看[安装与权限](/notes/seekey/installation)，异常表现则集中在[问题排查](/notes/seekey/troubleshooting)。

## 现在的 Seekey

Seekey `0.2.1` 已经能够承担日常录屏和演示工作：输入读取、气泡合并、多显示器状态、实时配置预览、Matugen 配色、桌面入口和中英文界面都已经落地。项目主体使用 C 与 GTK4 编写，以 MIT 协议开源。

它仍然是一个很年轻的项目。Wayland 桌面之间的差异不会凭空消失，GNOME/KDE 的窗口规则也还有继续改善的空间。但至少现在，我可以在自己的 niri 桌面上启动一个足够安静的工具，然后忘记它的存在——直到下一次按下快捷键。

- [GitHub 仓库](https://github.com/Nakanomk/Seekey)
- [博客内 Seekey 文档](/notes/seekey/intro)
- [AUR 稳定版](https://aur.archlinux.org/packages/seekey)
- [AUR Git 版](https://aur.archlinux.org/packages/seekey-git)
