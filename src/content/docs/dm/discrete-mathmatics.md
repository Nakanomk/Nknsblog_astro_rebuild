---
title: 'Week 1'
publishDate: 2025-09-02 14:23:53
description: 'Records About DM Week1'
tags:
  - Code  - Learn
language: '中文'
heroImage: { src: '../../../public/covers/Wanlingce.jpg', color: '#edb9a2' }
---
# Week 1 数论和密码学

## 整除

### 定义

如果 a 和 b 是整数 且 a ≠ 0, 那么如果存在一个整数 c， 使得 b = ac， 则称 a 整除 b， 记为 $ a\ |\ b $

- 当 a 整除 b 时，我们称 a 是 b 的 **因数** 或 **除数**，并且称 b 是 a 的 **倍数**
- 如果 $ a\ |\ b $，那么 $\frac{b}{a}$ 是一个整数
- 如果 a 不整除 b，我们记作 $ a\ \nmid\ b $

### 例题

判断 $3\mid7$ 和 $3\mid12$ 是否成立.

### 例题解答

- $3\nmid7$ 因为 $\frac{7}{3}$ 不是整数
- $3\mid12$ 因为 $\frac{12}{3}$ 是整数

### 定理

- **线性组合性** 如果 $ a\mid b$ 且 $a\mid c$，那么 $a\mid (b+c)$.
- 如果 $ a\mid b$ ，那么对于所有的整数 c，$a\mid bc$.
- **传递性** 如果 $ a\mid b$ 并且 $b\mid c$ ，那么 $a\mid c$.
- **大小关系** 如果 $ a\mid b$ ，$b\neq 0$ ，那么 $\lvert{a}\rvert\leq\lvert{b}\rvert$.

### 推论

若 $ a, b, c$ 是整数，且 $a\neq 0$ ，且 $ a\mid b$ 和 $a\mid c$ ，则对任意整数 $m$ 和 $n$ ，$a\mid (mb + nc)$ .

### 练习

证明：如果 $c\mid(a-b)$，$c\mid (a'-b')$ ，那么 $c\mid(aa'-bb')$

## 除法算法

当一个整数被一个正整数除时，会得到一个商和一个余数.这通常被称为“除法算法”（Division Algorithm），但实际上它是一个定理.

### 定义

如果 $a$ 是一个整数，$b$ 是一个正整数，那么存在唯一的整数 $q$ 和 $r$，使得 $0\leq r< b$，并且 $a = bq+r$.
