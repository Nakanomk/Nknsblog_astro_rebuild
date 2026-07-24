---
title: 'LCSD Lesson 1'
publishDate: 2025-09-18
description: 'Notes about machine learning'
tags:
  - Machine Learning
  - Learn
language: '中文'
heroImage: { src: '../../../public/covers/Wanlingce.webp', color: '#edb9a2' }
---
## Chapter I 数字系统与信息

### 十进制及其特点

- 0 - 9 十个符号
- Base: 10
- Power: 10^i

### 二进制及其特点

- 0 - 1 两个符号
- Base: 2
- Power: 2^i

### 十进制和二进制转换

二进制转十进制：直接乘 Power

十进制转二进制：整数部分整除 2，小数部分连乘 2

### 其它转换

十六进制、八进制转十进制：直接乘 Power

十六进制、十进制、八进制和二进制互转：直接按 2 的次数为数字分组即可，转换的时候统一先转换到二进制。

## Chapter II 逻辑代数

### 逻辑代数的基本概念

一个由逻辑变量集 K 、常量 0 和 1 以及 或与非 三种基本运算组成的一个封闭系统
$$
L = \{K, +, \cdot, -, 0, 1\}
$$
**常量**：0 和 1 表示的假和真

**变量**：变化的逻辑量

### 逻辑门介绍

![image-20260629021041852](/home/nakanosan/.config/Typora/typora-user-images/image-20260629021041852.png)

![image-20260629021637805](/home/nakanosan/.config/Typora/typora-user-images/image-20260629021637805.png)

### 相关公理

*Axiom 1* 交换律

对于任意逻辑变量 A、B，有
$$
A + B = B + A \\
A \cdot B = B \cdot A
$$
*Axiom 2* 结合率

对于任意的逻辑变量 A、B、C，有
$$
(A + B) + C = A + (B + C) \\
(A \cdot B) \cdot C = A \cdot (B \cdot C)
$$
*Axiom 3* 分配率

对于任意的逻辑变量 A、B、C，有
$$
A \cdot (B + C) = A \cdot B + A \cdot C \\
A + (B \cdot C) = (A + B) \cdot (A + C)
$$
*Axiom 4* 0-1 律

对于任意的逻辑变量 A，有
$$
A + 0 = A,\ A \cdot 1 = A \\
A + 1 = 1,\ A \cdot 0 = 0
$$
**这条公理可以用来化简电路**

*Axiom 5* 互补律

对于任意逻辑变量 A，存在唯一的 $$ \bar{A} $$ ，使得
$$
\bar{A} + A = 1 \\
\bar{A} \cdot A = 0
$$


### 逻辑运算

或运算：逻辑加

与运算：逻辑乘

非运算：取反

与非运算：通用逻辑门
$$
F = \overline{A \cdot B \cdot C \cdots} \\
F = \overline{\overline{A \cdot B} \cdot 1} = \overline{\overline{A \cdot B}} = A \cdot B \\
F = \overline{\overline{A \cdot 1} \cdot \overline{B \cdot 1}} = \overline{\bar{A} \cdot \bar{B}} = A + B \\
F = \overline{A \cdot 1} = \bar{A}
$$
或非运算：通用逻辑门

复合运算：

- 异或运算

$$
F = A \oplus B = \bar{A}B + A\bar{B}
$$

​	异或运算是两变量运算，若需多变量进行异或运算可以如下进行：
$$
F = A \oplus B \oplus C \oplus D = (A \oplus B) \oplus (C \oplus D) \\
\mathrm{or}\ F = [(A \oplus B) \oplus C] \oplus D
$$

​	两者不同则为 1，相同则为零

- 同或运算

$$
F = A\odot B = \bar{A} \cdot \bar{B}
$$

​	两者相同则为 1，不同则为零

### 基本定理和规则

*Theorem 1*
$$
0+0=0\ 1+0=1\ \ \ \ 0·0=0\ 1·0=0 \\
0+1=1\ 1+1=1\ \ \ \ 0·1=0\ 1·1=1
$$
*Theorem 2* 幂等律
$$
A + A = A;\ A \cdot A = A
$$
*Theorem 3* 吸收律
$$
A + A \cdot B = A;\ A \cdot (A + B) = A
$$
