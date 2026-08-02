---
title: 'Seekey Matugen 动态配色'
description: '为 Seekey 配置 Matugen 模板、colors.json、主题引用和壁纸切换更新流程。'
publishDate: '2026-08-02 20:04:00'
updatedDate: '2026-08-02 20:04:00'
tags:
  - Linux
  - Wayland
  - Matugen
  - Seekey
order: 5
---

Seekey 的菜单配色和按键气泡配色是两条独立路径：

- GUI 菜单读取 `~/.config/fuzzel/fuzzel.ini`，因此可直接继承写入 fuzzel 的配色。
- 按键气泡读取 Matugen 生成的 `colors.json`，再解析 `@matugen:<role>`。

## 让 Matugen 生成 Seekey 调色板

创建 `~/.config/matugen/templates/seekey-colors.json`：

```json
{
  "colors": {
    "surface": "{{colors.surface.default.hex}}",
    "on_surface": "{{colors.on_surface.default.hex}}",
    "outline": "{{colors.outline.default.hex}}",
    "outline_variant": "{{colors.outline_variant.default.hex}}"
  }
}
```

在 `~/.config/matugen/config.toml` 注册模板。把 `/home/you` 替换为真实家目录：

```toml
[config]

[templates.seekey]
input_path = '/home/you/.config/matugen/templates/seekey-colors.json'
output_path = '/home/you/.cache/matugen/colors.json'
```

生成一次：

```sh
matugen image /path/to/wallpaper.jpg --mode dark --source-color-index 0
```

## 在 Seekey 中启用

`colors.json` 有效时，GUI 根菜单会出现可用的**使用 Matugen 配色**。也可以设置：

```ini
[general]
theme=matugen
```

或者逐项引用：

```ini
[style]
foreground=@matugen:on_surface
background=@matugen:surface@0.86
border-color=@matugen:outline@0.45
placeholder-foreground=@matugen:on_surface@0.74
placeholder-background=@matugen:surface@0.56
placeholder-border-color=@matugen:outline_variant@0.65
```

末尾的 `@0.86` 表示透明度。显式 `[style]` 值会覆盖主题预设。

## 文件查找顺序

1. `seekey --matugen /path/to/colors.json`
2. `MATUGEN_COLORS`
3. `$XDG_CACHE_HOME/matugen/colors.json`
4. `~/.cache/matugen/colors.json`

显式路径必须存在且包含有效 JSON，否则启动失败。默认缓存缺失或角色不完整时，
Seekey 会在生成 GTK CSS 前回退到静态默认色，避免把无效引用交给 GTK。

自定义 `--matugen` 路径会继续传给 GUI/TUI 预览和 GUI 启动的主浮层。

## 换壁纸后更新

Seekey 不监视 JSON。壁纸脚本应先运行 Matugen，再重启浮层：

```sh
matugen image "$wallpaper" --mode dark --source-color-index 0 --quiet
pkill seekey
seekey --xdg &
```

若不希望脚本主动结束浮层，也可以只重新生成颜色，在下次启动时生效。

相关问题见[问题排查](/notes/seekey/troubleshooting)。
