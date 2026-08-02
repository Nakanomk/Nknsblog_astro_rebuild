---
title: 'Seekey 安装与权限'
description: '安装 Seekey、选择稳定版或 Git 版，并配置 /dev/input 输入设备读取权限。'
publishDate: '2026-08-02 20:01:00'
updatedDate: '2026-08-02 20:01:00'
tags:
  - Linux
  - Wayland
  - Seekey
order: 2
---

# Seekey 安装与权限

## Arch Linux 与 AUR

稳定版适合日常使用：

```sh
paru -S seekey
```

需要跟随 `main` 分支的新功能时使用 Git 包：

```sh
paru -S seekey-git
```

两者都提供 `seekey` 命令并互相冲突，不应同时安装。确认当前来源：

```sh
seekey --version
pacman -Qo "$(command -v seekey)"
```

## 从源码安装

```sh
git clone https://github.com/Nakanomk/Seekey.git
cd Seekey
./install.sh
```

默认安装到用户目录；系统安装使用：

```sh
./install.sh --system
```

安装脚本会检查发行版依赖、编译程序、安装示例配置与 desktop 文件，并处理
输入设备权限。卸载使用 `./install.sh --uninstall`。

只想在源码目录测试时：

```sh
make
./seekey --validate-config
./seekey
```

## 为什么需要输入权限

Seekey 不通过合成器私有协议监听键盘，而是读取 `/dev/input/event*`。普通用户
通常不能直接读取这些设备。安装后需要确保当前用户属于安装规则使用的输入组，
并重新登录，让新的组权限进入会话。

```sh
groups
ls -l /dev/input/event*
```

不要长期使用 `sudo seekey`。root 进程会连接错误的图形会话、产生 root 所有的
状态文件，也扩大了输入读取权限。正确做法是修复 udev/用户组权限。

## Desktop 文件

安装会创建 `dev.seekey.desktop`。主入口执行 `seekey --xdg --desktop-launch`，
因此使用 `~/.config/seekey/config.ini`。第一次从应用菜单打开时，Seekey 会询问
以后进入配置菜单还是直接启动按键浮层；选择保存在
`$XDG_STATE_HOME/seekey/window.ini`。

无论保存了什么偏好，下面的命令始终打开 GUI：

```sh
seekey --xdg --config-gui
```

下一章：[配置与编辑器](/notes/seekey/configuration)。
