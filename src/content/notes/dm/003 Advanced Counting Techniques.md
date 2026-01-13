---
title: 'Advanced Counting Techniques'
description: 'Records About Recurrence Relations, Generating Functions, and Inclusion-Exclusion Principle'
publishDate: 2025-10-02 14:23:53
tags:
  - Code
  - Learn
language: '中文'
heroImage: { src: '../../../public/covers/Wanlingce.jpg', color: '#edb9a2' }
order: 3
---

# Part 3 高级计数

## 递推关系的应用

### 定义

数列 $\{a_n\}$ 的 **递推关系 (Recurrence Relation)** 是一个方程，它将 $a_n$ 表示为该数列之前的一个或多个项的函数，即 $a_0, a_1, \dots, a_{n-1}$，其中 $n$ 为所有满足 $n \ge n_0$ 的整数，$n_0$ 是一个非负整数。

- **解**：如果一个数列的各项满足递推关系，则称该数列为递推关系的解。
- **初始条件**：数列的初始条件指定了递推关系生效前的各项（例如 $a_0, a_1$ 等）。

### 经典例子

#### 斐波那契数列 (Fibonacci Sequence)

**问题**：一对年轻的兔子（一公一母）被放置在一个岛上。兔子在满两个月前不会繁殖。两个月大后，每对兔子每个月都会产下一对兔子。假设兔子永远不会死亡，求在经过 $n$ 个月后岛上兔子的对数的递归关系。

**递推关系**：
$$
f_n = f_{n-1} + f_{n-2}, \quad n \ge 3
$$
**初始条件**：$f_1 = 1, f_2 = 1$。

#### 汉诺塔 (Tower of Hanoi)

**问题**：将 $n$ 个圆盘从柱子 1 移动到柱子 2，每次只能移动一个圆盘，且大圆盘不能放在小圆盘上。

**递推关系**：
设 $H_n$ 为移动 $n$ 个圆盘所需的最小移动次数。
$$
H_n = 2H_{n-1} + 1
$$
**初始条件**：$H_1 = 1$。
**显式公式**：$H_n = 2^n - 1$。

#### 位串计数

**问题**：找出长度为 $n$ 的不包含两个连续 0 的位串的数量 $a_n$。

**递推关系**：
- 结尾为 1：前 $n-1$ 位必须合法，数量为 $a_{n-1}$。
- 结尾为 0：前一位必须是 1（因为不能有连续 0），再前 $n-2$ 位必须合法，数量为 $a_{n-2}$。
$$
a_n = a_{n-1} + a_{n-2}, \quad n \ge 3
$$
**初始条件**：$a_1 = 2$ (0, 1), $a_2 = 3$ (01, 10, 11)。
**注意**：$a_n = f_{n+2}$，其中 $f_n$ 是斐波那契数。

#### 卡塔兰数 (Catalan Numbers)

**问题**：$C_n$ 表示对 $n+1$ 个数 $x_0 \cdot x_1 \cdots x_n$ 进行括号化的方法数。

**递推关系**：
$$
C_n = \sum_{k=0}^{n-1} C_k C_{n-k-1}
$$
**初始条件**：$C_0 = 1, C_1 = 1$。

## 线性递推关系的求解

### 线性齐次递推关系

**定义**：形式为
$$
a_n = c_1 a_{n-1} + c_2 a_{n-2} + \dots + c_k a_{n-k}
$$
其中 $c_1, c_2, \dots, c_k$ 为常数且 $c_k \ne 0$。

#### 求解方法（特征方程法）

1.  **写出特征方程**：
    $$
    r^k - c_1 r^{k-1} - c_2 r^{k-2} - \dots - c_k = 0
    $$
2.  **求解特征根**：
    - **情况 1：$k$ 个不同的实根 $r_1, r_2, \dots, r_k$**
      通解为：
      $$
      a_n = \alpha_1 r_1^n + \alpha_2 r_2^n + \dots + \alpha_k r_k^n
      $$
    - **情况 2：有重根**
      如果 $r_1$ 是 $m$ 重根，则它对应的项为：
      $$
      (\alpha_{1,0} + \alpha_{1,1}n + \dots + \alpha_{1,m-1}n^{m-1}) r_1^n
      $$
3.  **代入初始条件**：解线性方程组求出常数 $\alpha_i$。

**示例**：$a_n = a_{n-1} + 2a_{n-2}$，初始条件 $a_0=2, a_1=7$。
特征方程：$r^2 - r - 2 = 0 \Rightarrow (r-2)(r+1)=0 \Rightarrow r_1=2, r_2=-1$。
通解：$a_n = \alpha_1 2^n + \alpha_2 (-1)^n$。
代入初始条件解得 $\alpha_1=3, \alpha_2=-1$。
所以 $a_n = 3 \cdot 2^n - (-1)^n$。

### 线性非齐次递推关系

**定义**：形式为
$$
a_n = c_1 a_{n-1} + c_2 a_{n-2} + \dots + c_k a_{n-k} + F(n)
$$
其中 $F(n)$ 是仅依赖于 $n$ 的函数。

#### 求解方法

**定理**：通解由两部分组成：
$$
a_n = a_n^{(h)} + a_n^{(p)}
$$
- $a_n^{(h)}$ 是对应的**齐次递推关系**的通解。
- $a_n^{(p)}$ 是非齐次递推关系的一个**特解**。

**常见 $F(n)$ 的特解形式**：
- 若 $F(n)$ 是 $n$ 的 $t$ 次多项式，且 1 不是特征根，则设特解为 $n$ 的 $t$ 次多项式。
- 若 $F(n) = C \cdot s^n$，且 $s$ 不是特征根，则设特解为 $A \cdot s^n$。
- 若 $s$ 是 $m$ 重特征根，则特解形式需乘以 $n^m$。

**示例**：$a_n = 3a_{n-1} + 2n, a_1=3$。
齐次部分 $a_n^{(h)} = \alpha 3^n$。
设特解 $a_n^{(p)} = cn + d$（因为 $F(n)=2n$ 是一次多项式且 1 不是特征根）。
代入原方程解得 $c=-1, d=-3/2$。
通解 $a_n = \alpha 3^n - n - 3/2$。
代入 $a_1=3$ 解得 $\alpha = 11/6$。

## 分治算法与递归关系

### 分治递归关系

设一个递归算法将规模为 $n$ 的问题划分为 $a$ 个子问题，每个子问题规模为 $n/b$，合并步骤需 $g(n)$ 次操作。
$$
f(n) = a f(n/b) + g(n)
$$

### 主定理 (Master Theorem)

对于 $f(n) = a f(n/b) + c n^d$，其中 $a \ge 1, b > 1, c > 0, d \ge 0$：

$$
f(n) \text{ is } \begin{cases} 
O(n^d) & \text{if } a < b^d \\
O(n^d \log n) & \text{if } a = b^d \\
O(n^{\log_b a}) & \text{if } a > b^d 
\end{cases}
$$

**示例**：
- **二分查找**：$f(n) = f(n/2) + 2$ ($a=1, b=2, d=0$) $\Rightarrow a = b^d \Rightarrow O(\log n)$。
- **归并排序**：$M(n) = 2M(n/2) + n$ ($a=2, b=2, d=1$) $\Rightarrow a = b^d \Rightarrow O(n \log n)$。
- **快速整数乘法**：$f(n) = 3f(n/2) + Cn$ ($a=3, b=2, d=1$) $\Rightarrow a > b^d \Rightarrow O(n^{\log_2 3}) \approx O(n^{1.585})$。

## 容斥原理 (Inclusion-Exclusion Principle)

### 定理

对于有限集 $A_1, A_2, \dots, A_n$：
$$
\left| \bigcup_{i=1}^n A_i \right| = \sum_{1 \le i \le n} |A_i| - \sum_{1 \le i < j \le n} |A_i \cap A_j| + \sum_{1 \le i < j < k \le n} |A_i \cap A_j \cap A_k| - \dots + (-1)^{n-1} \left| \bigcap_{i=1}^n A_i \right|
$$

### 应用

#### Onto (满射) 函数的数量

从 $m$ 个元素的集合到 $n$ 个元素的集合的满射函数数量 ($m \ge n$)：
$$
n^m - C(n, 1)(n-1)^m + C(n, 2)(n-2)^m - \dots + (-1)^{n-1} C(n, n-1) \cdot 1^m
$$

#### 错位排列 (Derangements)

$n$ 个元素的错位排列数 $D_n$（没有任何元素在原始位置的排列）：
$$
D_n = n! \left[ 1 - \frac{1}{1!} + \frac{1}{2!} - \frac{1}{3!} + \dots + (-1)^n \frac{1}{n!} \right]
$$
当 $n \to \infty$ 时，$D_n/n! \to 1/e$。

**示例**：帽子寄存问题。$n$ 个人取回帽子，没人拿到自己帽子的概率约为 $1/e \approx 0.368$。

