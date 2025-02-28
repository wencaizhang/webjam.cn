---
title: Ubuntu 系统安装 zsh 和 oh-my-zsh（一）
slug: zsh_01
summary: 'Ubuntu 系统安装 zsh 和 oh-my-zsh（一） '
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

这篇文章写使用 zsh 作为默认 shell 的安装过程。

## 对谁有用

程序员，尤其是经常使用终端的程序员。

## 前置知识 - 什么是 shell？

首先，终端不是 shell，终端只是一个和电脑交互的界面。

当你在终端中输入指令，电脑会执行指令。

而 shell 则是执行这个指令的那个角色。

## 系统还有哪些 shell 可用？

想知道你的系统有几种 shell，可以通过下面命令查看：

```bash
cat /etc/shells
```

在我的电脑上显示结果是：

```bash
/bin/bash
/bin/csh
/bin/dash
/bin/ksh
/bin/sh
/bin/tcsh
/bin/zsh
```

## 为什么要用 zsh

根据上面结果来看，有那么多 shell 可用，那么为什么还要用 zsh？答案是：好用！

常见的 shell 有 bash/zsh/fish 等选择，像 Ubuntu 系统默认使用的是 bash，甚至 mac 系统默认使用的是 zsh。

也尝试过 fish，但是有些 bash 命令不兼容，我希望能够在兼容的前提下尽可能的强大好用。

而 zsh 在兼容 bash 的同时，又做到了功能强大。

## 如何安装 zsh ？

一般来说系统自带的软件包管理工具(`brew`/`pacman`)都能直接安装 zsh。

比如 Ubuntu 系统，直接执行这条命令就可以了

```bash
apt install zsh -y
```

苹果系统可以用 brew (默认已经是 zsh 了)

```bash
brew install zsh
```

如果是其他系统，则参考文档：[https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH)，

安装完成后，通过 `zsh --version` 来确认是否安装成功。

## 如何从 bash 切换到 zsh

直接执行 `zsh` 命令即可：

```bash
zsh
```

从 zsh 切换到 bash 也是类似的：

```bash
bash
```

但是这种切换都是**临时**的，当你下次打开终端仍然会恢复为默认 shell。

## 如何查看默认 shell 是哪个？

执行下面命令。

```bash
echo $SHELL
```

如果输出 `/bin/zsh` 或者 `/usr/bin/zsh` 就说明是 `zsh`，总之看最后一个单词就知道了

## 如何设置默认的 shell？

设置 zsh 为默认：

```bash
chsh -s $(which zsh)
```

设置 bash 为默认：

```bash
chsh -s $(which bash)
```

`chsh -s` 命令后面是 shell 的路径，但不同系统上的路径是不一样的，比如在我的 mac 上 zsh 路径是 `/bin/zsh`，而在 Ubuntu 系统上 zsh 的路径又变成了`/usr/bin/zsh`，而使用 `$(which zsh)` 就可以保证路径总是正确的。

## 原来的 bash 配置怎么办？

zsh 是兼容 bash 的，所以在 `~/.zshrc` 中增加下面代码即可：

```bash
source ~/.bash_profile
```

`~/.zshrc` 是 zsh 的配置文件，这行代码的作用让 zsh 加载 bash 的配置，

## 未完待续

zsh 搭配 oh-my-zsh 才能发挥其强大功能，关于 oh-my-zsh 的安装请看[下一篇](./zsh_02)。
