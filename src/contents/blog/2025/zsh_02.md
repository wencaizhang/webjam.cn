---
title: Ubuntu 系统安装 zsh 和 oh-my-zsh（二）
slug: zsh_02
summary: '全新的个人网站, awesome!'
date: '2025-02-22'
featured: true
tags:
  - zsh
  - oh-my-zsh
  - shell
  - terminal
draft: true
featured_image_url: /images/zsh.svg
---

## 这篇文章写什么？

写如何安装 oh-my-zsh，特别是在遇到网络问题的时候如何处理。

## 对谁有用

程序员，尤其是经常使用终端（想要使用 zsh）的程序员。

## 前置条件

已经安装了 zsh 并且将 zsh 作为默认 shell。具体做法请看上一篇。

## 那 oh-my-zsh 是什么？

通俗回答：能让你的 zsh 更牛叉

英文回答：Unleash your terminal like never before. ([https://ohmyz.sh/](https://ohmyz.sh/))

翻译：以前所未有的方式释放您的终端。

oh-my-zsh 是基于 Zsh 的功能做了一个扩展，方便的插件管理、主题自定义，以及漂亮的自动完成效果

## 如何安装 oh-my-zsh

下面两条命令任选一个在终端执行即可。

```bash
# 使用 curl
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# 或者使用 wget
sh -c "$(wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
```

## 安装失败了

安装失败大概率就是网络问题，上面的命令是要从指定的路径下载一个 `sh` 脚本文件，执行这个脚本文件会从 `github.com` 下载一个仓库。

因此你需要能同时访问 `https://raw.githubusercontent.com` 和 `github.com`。

## 如何解决网络问题

明修栈道暗度陈仓。把安装 zsh 所需要的资源都用国内资源代替。

先下载这个脚本文件，下载后会保存为 `install.sh`

```bash
wget https://gitee.com/mirrors/oh-my-zsh/raw/master/tools/install.sh
```

打开这个文件，修改其中指向 `github.com` 的仓库地址。

先找到这部分代码(在 71 行)

```bash
# Default settings
REPO=${REPO:-ohmyzsh/ohmyzsh}
REMOTE=${REMOTE:-https://github.com/${REPO}.git}
```

改成下面这样(`ohmyzsh` 改成 `mirrors`， `github` 改成 `gitee`)：

```bash
# Default settings
REPO=${REPO:-mirrors/ohmyzsh}
REMOTE=${REMOTE:-https://gitee.com/${REPO}.git}
```

修改完给 `install.sh` 添加可执行权限：

```bash
chmod +x install.sh
```

然后执行`install.sh`：

```bash
./install.sh
```

安装完成之后，会询问你是否直接将终端改为 zsh，按 `y` 回车即可。

## 配置一下更好用

### 配置主题

默认主题是 `robbyrussell`，你可以修改为你想要的，比如

```bash
ZSH_THEME="ys"
```

更多主题可以在这里找到：[https://github.com/ohmyzsh/ohmyzsh/wiki/Themes](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes)

有趣的是，你还可以使用随机主题，如果你改成这样的：

```bash
ZSH_THEME="random"
```

## 提到的国内资源

Gitee 提供了 GitHub 代码镜像服务用来提升国内下载速度的镜像仓库组织：[https://gitee.com/organizations/mirrors/projects](https://gitee.com/organizations/mirrors/projects)

## 未完待续

zsh 更为强大的插件系统将在[下一篇](./zsh_03)中介绍。
