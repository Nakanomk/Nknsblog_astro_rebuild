---
title: 'Logic Inference & Proof Techniques'
description: 'Records About Propositional & Predicate Logic Inference, Rules, and Proof Methods'
tags:
  - Code
  - Learn
language: '中文'
heroImage: { src: '../../../public/covers/Wanlingce.jpg', color: '#edb9a2' }
order: 6
---

# Part 6 推理与证明技术

## 推理的基本概念

### 定义与有效性
- **推理**：从一组**前提** (Premises) $G_1, G_2, \dots, G_n$ 推出**结论** (Conclusion) $H$ 的思维过程。
- **逻辑蕴涵**：如果对于任意解释 $I$，当 $I$ 满足所有前提时，必然满足结论 $H$，则称 $H$ 是前提的逻辑结果。
  - 记作：$G_1, G_2, \dots, G_n \Rightarrow H$。
- **有效推理判定定理**：
  $$ G_1, G_2, \dots, G_n \Rightarrow H \iff (G_1 \wedge G_2 \wedge \dots \wedge G_n) \rightarrow H \text{ 为永真式} $$

### $\rightarrow$ 与 $\Rightarrow$ 的区别
1.  **$\rightarrow$ (蕴涵)**：逻辑联结词，运算结果是一个**公式**，有真假之分。
2.  **$\Rightarrow$ (推出)**：元语言符号，描述两个公式（或一组公式与一个公式）之间的**推导关系**，表示推理是**有效**的。

## 命题逻辑推理理论

### 常用推理定律 (Inference Rules)

熟记这些规则是构造证明的基础。

| 规则名称                                       | 形式                                                         | 备注                 |
| :--------------------------------------------- | :----------------------------------------------------------- | :------------------- |
| **I1 简化规则** (Simplification)               | $G \wedge H \Rightarrow G$                                   | 从合取式中析取分量   |
| **I2 添加规则** (Addition)                     | $G \Rightarrow G \vee H$                                     | 引入新的析取项       |
| **I3/I12 假言推理** (Modus Ponens)             | $G, G \rightarrow H \Rightarrow H$                           | **最常用**，肯定前件 |
| **I4/I13 拒取式** (Modus Tollens)              | $\neg H, G \rightarrow H \Rightarrow \neg G$                 | 否定后件             |
| **I5/I14 假言三段论** (Hypothetical Syllogism) | $G \rightarrow H, H \rightarrow I \Rightarrow G \rightarrow I$ | 链式推导             |
| **I6/I10 选言三段论** (Disjunctive Syllogism)  | $\neg G, G \vee H \Rightarrow H$                             | 排除法               |
| **I9 合取引入** (Conjunction)                  | $G, H \Rightarrow G \wedge H$                                | 组合前提             |
| **I15 二难推论** (Dilemma)                     | $G \vee H, G \rightarrow I, H \rightarrow I \Rightarrow I$   | 分情况讨论           |

### 推理实例

#### 案例：凶手推理
**前提**：
1. 凶手是王某或陈某 ($P \vee Q$)
2. 若王某是凶手，案发时他必外出 ($P \rightarrow R$)
3. 王某案发时未外出 ($\neg R$)

**结论**：陈某是凶手 ($Q$)

**证明**：
1. $P \rightarrow R$ (前提)
2. $\neg R$ (前提)
3. $\neg P$ (拒取式, 1, 2)
4. $P \vee Q$ (前提)
5. $Q$ (选言三段论, 3, 4) $\blacksquare$

## 谓词逻辑推理理论

在命题逻辑规则基础上，增加对量词的处理规则。

### 量词推理规则

1.  **全称特指 (US, Universal Specification)**
    - $(\forall x)P(x) \Rightarrow P(c)$
    - **注意**：$c$ 可以是任意个体常量或特定对象。
    - *含义*：既然对所有都成立，那么对具体的某一个也成立。

2.  **全称推广 (UG, Universal Generalization)**
    - $P(x) \Rightarrow (\forall x)P(x)$
    - **限制**：$x$ 必须是**任意**选取的，不能由存在量词特指而来，也不能在前提中受限。

3.  **存在特指 (ES, Existential Specification)**
    - $(\exists x)P(x) \Rightarrow P(c)$
    - **限制**：$c$ 必须是**新**的常量（之前未在推理中出现过），表示“存在这么一个特定的个体”。

4.  **存在推广 (EG, Existential Generalization)**
    - $P(c) \Rightarrow (\exists x)P(x)$
    - *含义*：既然找到了一个 $c$ 满足 $P$，那么存在 $x$ 满足 $P$。

### 推理示例：苏格拉底三段论

**前提**：
1. $\forall x (Man(x) \rightarrow Mortal(x))$ (所有人都要死)
2. $Man(Socrates)$ (苏格拉底是人)

**结论**：$Mortal(Socrates)$ (苏格拉底要死)

**证明**：
1. $\forall x (Man(x) \rightarrow Mortal(x))$ (前提)
2. $Man(Socrates) \rightarrow Mortal(Socrates)$ (US, 1) —— *将 x 特指为苏格拉底*
3. $Man(Socrates)$ (前提)
4. $Mortal(Socrates)$ (假言推理, 2, 3) $\blacksquare$

## 证明方法

### 直接证明法 (Direct Proof)
由前提出发，利用推理规则和等价变换，一步步推导至结论。

### 间接证明法 / 反证法 (Indirect Proof)
**思路**：将结论的否定 $\neg H$ 加入前提集合，如果推导出矛盾（如 $R \wedge \neg R$ 或 $0$），则原结论 $H$ 成立。
- **依据**：$(G_1 \wedge \dots \wedge G_n \wedge \neg H) \rightarrow 0 \iff (G_1 \wedge \dots \wedge G_n) \rightarrow H$

**示例**：证明 $P \rightarrow Q, \neg Q \Rightarrow \neg P$
1. 假设 $\neg(\neg P)$ 即 $P$ (附加前提)
2. $P \rightarrow Q$ (前提)
3. $Q$ (假言推理, 1, 2)
4. $\neg Q$ (前提)
5. $Q \wedge \neg Q$ (矛盾) $\Rightarrow$ 假设错误，$\neg P$ 成立。

### 附加前提证明法 (CP 规则)
**适用场景**：结论是蕴涵式 $P \rightarrow Q$。
**思路**：将前件 $P$ 作为**附加前提**放入前提集合中，只需证明后件 $Q$ 成立即可。
- **依据**：$(G_1 \wedge \dots \wedge G_n) \rightarrow (P \rightarrow Q) \iff (G_1 \wedge \dots \wedge G_n \wedge P) \rightarrow Q$

**示例**：证明 $(P \rightarrow Q) \wedge (Q \rightarrow R) \Rightarrow P \rightarrow R$
1. $P$ (附加前提，结论的前件)
2. $P \rightarrow Q$ (前提)
3. $Q$ (假言推理, 1, 2)
4. $Q \rightarrow R$ (前提)
5. $R$ (假言推理, 3, 4)
6. 得证 $P \rightarrow R$ (CP 规则) $\blacksquare$

## 易错点总结

1.  **量词规则的限制**：
    - 使用 **ES (存在特指)** 时，必须使用从未出现过的符号（例如 $P(c)$，不能用已知的 $a$）。
    - 使用 **UG (全称推广)** 时，变量必须是任意的，不能依赖于特定的假设（如 ES 得到的变量）。
2.  **优先级**：在混合命题和谓词的推理中，先处理量词（去掉量词），在命题逻辑层面进行推理，最后再加回量词（如果需要）。
3.  **有效性与真实性**：推理有效仅保证形式正确（Truth-preserving），如果前提本身为假，结论的真实性无法保证（但推理过程依然是有效的）。