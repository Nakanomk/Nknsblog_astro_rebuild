---
title: 'Predicate Logic & Logic Inference'
description: 'Records About Predicate Logic and Inference Rules'
tags:
  - Code
  - Learn
language: '中文'
heroImage: { src: '../../../public/covers/Wanlingce.jpg', color: '#edb9a2' }
order: 5
---

# Part 5 谓词逻辑与推理理论

## 谓词逻辑基础

### 基本概念

- **个体词 (Individual)**：表示研究对象（主语、宾语）。
  - **常量**：$a, b, c$（如“苏格拉底”）。
  - **变量**：$x, y, z$（泛指个体）。
- **个体域 (Domain)**：个体变量的取值范围（常用 $D$ 表示）。
- **谓词 (Predicate)**：刻画个体的性质或关系的词。
  - $P(x)$：$x$ 是人。
  - $Q(x, y)$：$x$ 喜欢 $y$。
  - **$n$ 元谓词**：描述 $n$ 个体之间的关系。

### 量词 (Quantifiers)

- **全称量词 (Universal Quantifier, $\forall$)**：
  - $\forall x P(x)$：对个体域中所有的 $x$，$P(x)$ 为真。
  - 对应自然语言：“所有”、“每一个”、“任意”。
- **存在量词 (Existential Quantifier, $\exists$)**：
  - $\exists x P(x)$：在个体域中存在至少一个 $x$，使得 $P(x)$ 为真。
  - 对应自然语言：“存在”、“有一些”、“至少一个”。

### 翻译规则（重要）

统一个体域为**全总个体域**时，需引入特性谓词限定范围：
1.  **全称量词 + 蕴涵**：$\forall x (M(x) \rightarrow P(x))$
    - “所有的人都是要死的” $\Rightarrow$ 对任意 $x$，如果 $x$ 是人，则 $x$ 会死。
    - **错误写法**：$\forall x (M(x) \wedge P(x))$ （意味着宇宙万物都是人且都会死）。
2.  **存在量词 + 合取**：$\exists x (M(x) \wedge P(x))$
    - “有些人登上了月球” $\Rightarrow$ 存在 $x$，既是人，又登上了月球。
    - **错误写法**：$\exists x (M(x) \rightarrow P(x))$ （若存在非人的东西，该式自动为真，无法准确表达含义）。

### 量词的性质与等值式

- **量词转换律**：
  $$ \neg (\forall x) P(x) \Leftrightarrow (\exists x) \neg P(x) $$
  $$ \neg (\exists x) P(x) \Leftrightarrow (\forall x) \neg P(x) $$
- **量词分配律**：
  $$ (\forall x)(P(x) \wedge Q(x)) \Leftrightarrow (\forall x)P(x) \wedge (\forall x)Q(x) $$
  $$ (\exists x)(P(x) \vee Q(x)) \Leftrightarrow (\exists x)P(x) \vee (\exists x)Q(x) $$
  *(注意：$\forall$ 对 $\vee$，$\exists$ 对 $\wedge$ 无分配律)*
- **辖域收缩与扩张**（$Q$ 中不含 $x$）：
  $$ (\forall x)(P(x) \vee Q) \Leftrightarrow (\forall x)P(x) \vee Q $$
  $$ (\exists x)(P(x) \wedge Q) \Leftrightarrow (\exists x)P(x) \wedge Q $$

## 前束范式 (Prenex Normal Form)

### 定义

所有量词都位于公式最前端，且辖域延伸至公式末端。
形式：$(Q_1 x_1) (Q_2 x_2) \dots (Q_n x_n) M$
其中 $Q_i \in \{\forall, \exists\}$，$M$ 为不含量词的公式。

### 转换步骤
1.  消去 $\rightarrow, \leftrightarrow$。
2.  利用摩根律将 $\neg$ 内移至原子谓词前。
3.  利用改名规则避免变元冲突。
4.  利用量词移动规则将量词提到最前。

**示例**：求 $\neg ((\forall x) P(x) \rightarrow (\exists y) Q(y))$ 的前束范式。
$$
\begin{aligned}
\neg (\neg (\forall x) P(x) \vee (\exists y) Q(y)) \quad & (\text{消去} \rightarrow) \\
(\forall x) P(x) \wedge \neg (\exists y) Q(y) \quad & (\text{摩根律}) \\
(\forall x) P(x) \wedge (\forall y) \neg Q(y) \quad & (\text{量词转换}) \\
(\forall x) (\forall y) (P(x) \wedge \neg Q(y)) \quad & (\text{量词前移})
\end{aligned}
$$

## 推理理论 (Inference Theory)

### 基本概念

- **推理**：从一组前提 $G_1, G_2, \dots, G_n$ 推出结论 $H$ 的思维过程。
- **有效推理**：当且仅当 $G_1 \wedge G_2 \wedge \dots \wedge G_n \rightarrow H$ 为**永真式**。
  记作：$\{G_1, G_2, \dots, G_n\} \Rightarrow H$。

### 常用推理规则

1.  **假言推理 (Modus Ponens)**: $P, P \rightarrow Q \Rightarrow Q$
2.  **拒取式 (Modus Tollens)**: $\neg Q, P \rightarrow Q \Rightarrow \neg P$
3.  **假言三段论**: $P \rightarrow Q, Q \rightarrow R \Rightarrow P \rightarrow R$
4.  **析取三段论**: $P \vee Q, \neg P \Rightarrow Q$
5.  **化简律**: $P \wedge Q \Rightarrow P$
6.  **附加律**: $P \Rightarrow P \vee Q$
7.  **合取引入**: $P, Q \Rightarrow P \wedge Q$
8.  **二难推论**: $P \vee Q, P \rightarrow R, Q \rightarrow R \Rightarrow R$

### 谓词逻辑推理规则

除了上述命题逻辑规则外，增加四个量词规则：

1.  **全称特指 (US)**: $(\forall x) P(x) \Rightarrow P(c)$ （$c$ 为任意个体或特定常量）。
2.  **全称推广 (UG)**: $P(x) \Rightarrow (\forall x) P(x)$ （$x$ 必须是任意的，不能受限）。
3.  **存在特指 (ES)**: $(\exists x) P(x) \Rightarrow P(c)$ （$c$ 必须是**新**的常量，之前未出现过）。
4.  **存在推广 (EG)**: $P(c) \Rightarrow (\exists x) P(x)$。

### 推理证明方法

1.  **直接证明法**：由前提利用推理规则推导至结论。
2.  **间接证明法 (反证法)**：假设结论的否定 $\neg H$ 成立，将其加入前提集合，推导出矛盾（如 $R \wedge \neg R$）。
3.  **附加前提证明法 (CP规则)**：若结论是 $P \rightarrow Q$ 形式，可将 $P$ 作为附加前提，只需证明 $Q$ 成立。

**例题**：
前提：$\forall x (P(x) \rightarrow Q(x)), \forall x (Q(x) \rightarrow R(x))$
结论：$\forall x (P(x) \rightarrow R(x))$

**证明**：

1. $\forall x (P(x) \rightarrow Q(x))$ (前提)
2. $P(y) \rightarrow Q(y)$ (US, 1)
3. $\forall x (Q(x) \rightarrow R(x))$ (前提)
4. $Q(y) \rightarrow R(y)$ (US, 3)
5. $P(y) \rightarrow R(y)$ (假言三段论, 2, 4)
6. $\forall x (P(x) \rightarrow R(x))$ (UG, 5)