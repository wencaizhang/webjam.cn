---
title: daisyUI 的 dropdown 是什么原理以及如何关闭
slug: how-dropdown-works-and-how-to-close-in-daisyUI
summary: 'daisyUI 的 dropdown 是什么原理以及如何关闭'
date: '2025-03-02'
featured: true
tags:
  - daisyUI
  - dropdown
  - focus-within
  - document.activeElement
  - Element.closest()
draft: true
featured_image_url: https://static.webjam.cn/images/202503/daisyui-dropdown.webp
---

![](https://static.webjam.cn/images/202503/daisyui-dropdown.webp)

题图：daisyUI 的 Dropdown 组件代码分析截图

## 这篇文章写什么？

这篇文章分析 [daisyUI](https://daisyui.com/) 的 Dropdown 是什么原理以及如何使用 JS 关闭菜单

## 前置条件

懂得基本的 JS 和 CSS 知识。

## daisyUI 和 Dropdown 组件

通常情况下封装各种交互组件都需要 JS 的参与，而 [daisyUI](https://daisyui.com/) 的各种组件总是巧妙地使用伪元素或伪类来实现，这使得开发者在使用 daisyUI 的时候无需引入各种模块，只需要拷贝很少的 HTML 代码就能完成交互功能，这一点非常棒。

daisyUI 中的 [Dropdown](https://daisyui.com/components/dropdown/) 组件目前(v5.x 版本)有三种实现方式，分别是：

1. 利用 `details` 和 `summary` 元素实现
2. 利用 popover API 和 anchor 定位实现，这是该版本新增的方式
3. 利用 CSS focus 实现

本文主要是分析第三种利用 focus 的实现原理。

## Dropdown 的实现原理

Dropdown 也叫下拉菜单，用于点击按钮时打开菜单或其他元素。Dropdown 组件的 HTML 结构很简单，如下所示：

```html
<div class="dropdown">
  <div tabindex="0" role="button" class="btn m-1">Click</div>
  <ul
    tabindex="0"
    class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow"
  >
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div>
```

文档上有说明，因为在 Safari 浏览器会阻止 `button` 元素被聚焦，因此这里需要使用 `div` 来模拟按钮。

该组件的具体交互就是点击按钮，`ul` 元素就会从隐藏状态变为显示状态，点击组件以外的位置会重新隐藏 `ul` 元素。

默认情况下，`.dropdown-content` 处于不可见状态，这是因为下面 CSS 代码在生效：

```css
.dropdown:is(:not(details)) .dropdown-content {
  visibility: hidden;
  opacity: 0;
}
```

当点击按钮后，按钮将会处于聚焦状态，在下面的样式代码作用之下, CSS 将会匹配到 `.dropdown:focus-within` 伪类， `.dropdown-content` 就会显示出来：

```css
.dropdown:focus-within .dropdown-content {
  visibility: visible;
  opacity: 1;
}
```

因此，实现原理可以用下面示意图来表示:

```txt
                                                    可聚焦的按钮
                                                            │
<div>                                                       │
  <div tabindex="0" role="button">Click to open</div>  ─────╯
  <div tabindex="0">Content</div>   ───────╮
</div>                                     │
                                当按钮聚焦时显示内容
```

另外提一句，内容区域可以是 `ul` 也可以是 `div` 元素，只要它们都拥有 `tabindex="0"` 属性。

## 什么是 `:focus-within` 伪类

MDN 解释：

> :focus-within CSS 伪类表示当元素或其任意后代元素被聚焦时，将匹配该元素。换言之，它表示 :focus 伪类匹配到该元素自身或它的后代时，该伪类生效。（这也包括 shadow 树中的后代元素。） —— [:focus-within - MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:focus-within)

对比一下我们更熟悉的 `:focus` 伪类，`:focus` 只能匹配自身聚焦状态，通常是 `input` 元素使用：

```css
input:focus {
  border: 1px solid red;
}
```

而 `:focus-within` 除了自身为聚焦状态之外，它的任意子元素处于聚焦状态的时候，这个伪类都能生效，因此更使用在父元素上，例如在 Dropdown 组件中是应用于在外层的 `.dropdown` 元素上：

```css
.dropdown:focus-within .dropdown-content {
  visibility: visible;
  opacity: 1;
}
```

这样就能保证只要 Dropdown 组件中有任意一个元素处于聚焦状态，那么就显示 `.dropdown-content` 元素。

## 如何关闭 Dropdown

我们重新回顾 Dropdown 的 HTML 结构：

```html
<div class="dropdown">
  <div tabindex="0" role="button" class="btn m-1">Click</div>
  <ul
    tabindex="0"
    class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow"
  >
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div>
```

根据前面的知识我们知道，只要 `.dropdown` 及其任意子元素处于 focus 状态，`.dropdown-content` 元素都会处于显示状态。

那也就是说，当点击 `li` 元素的时候，`.dropdown-content` 总是处于显示状态。

但是有时候我希望在点击 `.dropdown-content` 的 `li` 元素之后，能实现两个效果

1. 触发点击事件函数，有可能是切换页面某个区域的内容
2. 关闭菜单，也就是隐藏 `.dropdown-content` 元素

实现第一个效果很简单，直接绑定点击事件即可。但是点击操作会使 `.dropdown-content` 处于显示状态，这和第二个效果是相反的结果。

因此，我们需要在点击事件中手动使其失去焦点，进而使其隐藏。

```jsx
const Dropdown = () => {
  const handleClick = () => {
    // 处理失去焦点逻辑
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  };

  return (
    <div className='dropdown'>
      <div tabIndex={0} role='button' className='btn m-1'>
        Click
      </div>
      <ul
        tabIndex={0}
        className='dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow'
      >
        <li onClick={handleClick}>
          <a>Item 1</a>
        </li>
        <li onClick={handleClick}>
          <a>Item 2</a>
        </li>
      </ul>
    </div>
  );
};
```

其中 `document.activeElement` 能直接获取当前拥有焦点的元素。

其实还有一种写法，因为我们知道目标元素就是 `.dropdown-content`, 而且被点击的元素就是目标元素的子元素，那就可以这样写

```js
const handleClick = (event) => {
  cosnt elem = event.target.closest('.dropdown-content')
  if (elem) {
    elem?.blur();
  }
};
```

其中 closest() 方法的作用是找到离自身最近而且符合指定选择器的的祖先元素。

两种方法都能实现，而且代码量也几乎一样，任选一种即可。

## 参考资料

- [:focus-within - CSS：层叠样式表 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:focus-within)
- [Document：activeElement 属性 - Web API | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/activeElement)
- [Element.closest() - Web API | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/closest)

## 结束

文本结束，感谢阅读。
