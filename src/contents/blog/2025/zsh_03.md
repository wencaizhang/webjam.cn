---
title: Ubuntu 系统安装 zsh 和 oh-my-zsh（三）
slug: zsh_03
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

这篇文件写在安装 zsh 和 oh-my-zsh 之后如何安装和启用一些有特定功能的插件，来让你的 zsh 更好用。

## 前置条件

安装了 zsh 和 oh-my-zsh，并将 zsh 设置为默认 shell。

## 配置主题

默认主题是 `robbyrussell`，你可以修改为你想要的，比如

```bash
ZSH_THEME="ys"
```

更多主题可以在这里找到：[https://github.com/ohmyzsh/ohmyzsh/wiki/Themes](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes)

有趣的是，你还可以使用随机主题，如果你改成这样的：

```bash
ZSH_THEME="random"
```

## 配置插件

如果 zsh 和 oh-my-zsh 都安装完成，那你能够在 `~/.zshrc` 配置文件中找到下面一行代码：

```conf
plugins=(git)
```

这是默认启用的 git 插件，如果想要增加更多的插件，在小括号内增加即可（用空格隔开）。

仓库 [https://github.com/unixorn/awesome-zsh-plugins](https://github.com/unixorn/awesome-zsh-plugins) 收集了丰富的 zsh 的框架、教程、插件与主题等，有兴趣可以查看。

### git 插件

zsh 默认加载了该插件，无需改动即可使用。

```bash
plugins=(git)
```

该插件会在终端显示当前目录是否为 git 仓库，如果是 git 仓库还会显示当前分支以及当前分支是否有改动。

该插件还对很多 git 命令提供了简化（别名）：[https://gitee.com/mirrors/oh-my-zsh/blob/master/plugins/git/README.md](https://gitee.com/mirrors/oh-my-zsh/blob/master/plugins/git/README.md)

### z 快速切换路径

启用方式为在 git 后添加插件名称：

```bash
plugins=(git z)
```

z 插件会记住你在命令行中访问过的每个路径，并且记录每个路径的访问次数。

以此为基础，你只要输入路径的一部分，它就能猜到你想访问的路径，如此，只要访问过一次目标路径，下一此就可以轻松跳转过去。

还有一个类似功能的插件叫做 wd: [https://github.com/mfaerevaag/wd](https://github.com/mfaerevaag/wd)。您可选择自己喜欢的启用。

### extract 解压缩

这个插件可以让你轻松的解压不同格式的文件。

```bash
plugins=(git z extract)
```

启用之后，可以直接使用下面命令即可完成解压

```bash
extract <文件名>
```

### 命令行语法高亮插件 zsh-syntax-highlighting

因为这个插件不是 zsh 内置，因此需要 clone 仓库到本地：

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git
echo "source ${(q-)PWD}/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ${ZDOTDIR:-$HOME}/.zshrc
```

同样的，你可以使用国内资源代替：

```bash
git clone https://gitee.com/mirror-hub/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

下载完成之后启用该插件

```bash
plugins=(git z extract zsh-syntax-highlighting)
```

### 命令行自动建议提示插件 zsh-autosugggestions

这个插件同样也需要 clone 到本地，这是从 GitHub 拉代码：

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

或者选择从国内 clone 代码：

```bash
git clone https://gitee.com/mirrors/zsh-autosuggestions.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

完成之后，启用该插件

```bash
plugins=(git z extract zsh-syntax-highlighting zsh-autosuggestions)
```

## 资源

Gitee 提供了 GitHub 代码镜像服务用来提升国内下载速度的镜像仓库组织：[https://gitee.com/organizations/mirrors/projects](https://gitee.com/organizations/mirrors/projects)

## 结束

上面是我自己在用的几个实用插件，有兴趣可以在[https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins) 这里找到更多。
