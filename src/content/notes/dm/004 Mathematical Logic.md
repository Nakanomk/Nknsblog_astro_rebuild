---
title: 'Mathematical Logic'
description: 'Records About Mathematical Logic, Propositional Logic, Normal Forms'
tags:
  - Code
  - Learn
language: '中文'
heroImage: { src: '../../../public/covers/Wanlingce.jpg', color: '#edb9a2' }
order: 4
---

# Part 4 数理逻辑

## 命题 (Propositions)

### 定义

**命题**是具有确切真值的**陈述句**。该命题可以取一个“值”，称为真值。
真值只有“真”和“假”两种，分别用 **T (1)** 和 **F (0)** 表示。

### 命题的分类

1.  **原子命题 (简单命题)**：不能再分解为更为简单命题的命题。
2.  **复合命题**：可以分解为更为简单命题的命题。通过关联词（如“或者”、“并且”、“如果...则...”）复合而成。

### 例子

- **是命题**：
  - 太阳是圆的 (T)
  - $1+1=10$ (T/F，取决于进制，但在特定语境下有确切真值)
  - 3能被2整除 (F)
- **非命题**：
  - 滚出去！ (祈使句)
  - 你要出去吗？ (疑问句)
  - $x+y > 0$ (真值取决于变量，除非指定域)
  - 本语句是假的 (悖论)

## 命题联结词 (Connectives)

### 1. 否定 (Negation)

设 $P$ 是任一命题，复合命题“非 $P$”称为 $P$ 的否定式，记作 $\neg P$。

$$
\neg P \text{ 为真} \iff P \text{ 为假}
$$

### 2. 合取 (Conjunction)

设 $P, Q$ 是任两个命题，复合命题“$P$ 并且 $Q$”称为 $P$ 与 $Q$ 的合取式，记作 $P \wedge Q$。

$$
P \wedge Q \text{ 为真} \iff P, Q \text{ 同为真}
$$

**自然语言对应**：“既...又...”，“不仅...而且...”，“虽然...但是...”。

### 3. 析取 (Disjunction)

设 $P, Q$ 是任两个命题，复合命题“$P$ 或者 $Q$”称为 $P$ 与 $Q$ 的析取式，记作 $P \vee Q$。

$$
P \vee Q \text{ 为真} \iff P, Q \text{ 中至少有一个为真}
$$

**注意**：这是“可兼或”（Inclusive OR）。

### 4. 蕴涵 (Implication)

设 $P, Q$ 是任两个命题，复合命题“如果 $P$，则 $Q$”称为 $P$ 与 $Q$ 的蕴涵式，记作 $P \rightarrow Q$。
- $P$ 称为前件，$Q$ 称为后件。

$$
P \rightarrow Q \text{ 为假} \iff P \text{ 为真且 } Q \text{ 为假}
$$

**善意推定**：当前件 $P$ 为假时，不管 $Q$ 真假如何，则 $P \rightarrow Q$ 都为真。
**自然语言对应**：
- “只要 $P$ 就 $Q$” $\Rightarrow P \rightarrow Q$
- “只有 $Q$ 才 $P$” $\Rightarrow P \rightarrow Q$
- “$P$ 仅当 $Q$” $\Rightarrow P \rightarrow Q$
- “除非 $Q$ 否则 $\neg P$” $\Rightarrow \neg Q \rightarrow \neg P$ (即 $P \rightarrow Q$)

### 5. 等价 (Equivalence)

设 $P, Q$ 是任两个命题，复合命题“$P$ 当且仅当 $Q$”称为 $P$ 与 $Q$ 的等价式，记作 $P \leftrightarrow Q$。

$$
P \leftrightarrow Q \text{ 为真} \iff P, Q \text{ 同为真假}
$$

**自然语言对应**：“充分必要条件”。

### 优先级约定

$$
\neg \rightarrow \wedge \rightarrow \vee \rightarrow \rightarrow \rightarrow \leftrightarrow
$$
*(注：同级符号按从左到右顺序，括号优先级最高)*

## 命题公式 (Propositional Formula)

### 定义

命题公式是仅由有限步使用规则构成的符号串：
1.  命题变元本身是一个公式。
2.  如 $G$ 是公式，则 $(\neg G)$ 也是公式。
3.  如 $G, H$ 是公式，则 $(G \wedge H), (G \vee H), (G \rightarrow H), (G \leftrightarrow H)$ 也是公式。

### 解释与真值表

- **解释 (Interpretation)**：指派给公式中所有命题变元的一组真值。对于 $n$ 个变元，有 $2^n$ 个不同的解释。
- **真值表 (Truth Table)**：将公式在所有可能解释下的真值情况列成的表。

### 公式的分类

- **永真公式 (重言式, Tautology)**：在所有解释下都为“真”。
- **永假公式 (矛盾式, Contradiction)**：在所有解释下都为“假”。
- **可满足公式 (Satisfiable)**：至少存在一个解释使其为“真”（不是永假式）。

**关系**：
$$ \text{永真式的否定} \Leftrightarrow \text{矛盾式} $$
$$ \text{矛盾式的否定} \Leftrightarrow \text{永真式} $$

## 逻辑等价与蕴涵

### 逻辑等价 (Logical Equivalence)

如果公式 $G, H$ 在任意解释下真值相同，则称 $G, H$ 是等价的，记作 $G = H$ (或 $G \Leftrightarrow H$)。

**定理**：
$$ G = H \iff (G \leftrightarrow H) \text{ 是永真公式} $$

> **注意**：“$=$” 是一种关系，描述两个公式的关系；“$\leftrightarrow$” 是一种逻辑联结词，运算结果仍是公式。

### 基本等价公式 (24个)

1.  **结合律**：
    $$ G \vee (H \vee S) = (G \vee H) \vee S $$
    $$ G \wedge (H \wedge S) = (G \wedge H) \wedge S $$
2.  **交换律**：
    $$ G \vee H = H \vee G $$
    $$ G \wedge H = H \wedge G $$
3.  **幂等律**：
    $$ G \vee G = G $$
    $$ G \wedge G = G $$
4.  **吸收律**：
    $$ G \vee (G \wedge H) = G $$
    $$ G \wedge (G \vee H) = G $$
5.  **分配律**：
    $$ G \vee (H \wedge S) = (G \vee H) \wedge (G \vee S) $$
    $$ G \wedge (H \vee S) = (G \wedge H) \vee (G \wedge S) $$
6.  **同一律**：
    $$ G \vee 0 = G, \quad G \wedge 1 = G $$
7.  **零律**：
    $$ G \vee 1 = 1, \quad G \wedge 0 = 0 $$
8.  **排中律**：
    $$ G \vee \neg G = 1 $$
9.  **矛盾律**：
    $$ G \wedge \neg G = 0 $$
10. **双重否定律**：
    $$ \neg(\neg G) = G $$
11. **德·摩根定律 (De Morgan's Laws)**：
    $$ \neg(G \vee H) = \neg G \wedge \neg H $$
    $$ \neg(G \wedge H) = \neg G \vee \neg H $$
12. **蕴涵式**：
    $$ G \rightarrow H = \neg G \vee H $$
13. **等价式**：
    $$ G \leftrightarrow H = (G \rightarrow H) \wedge (H \rightarrow G) $$
14. **假言易位**：
    $$ G \rightarrow H = \neg H \rightarrow \neg G $$
15. **归谬论**：
    $$ (G \rightarrow H) \wedge (G \rightarrow \neg H) = \neg G $$

### 代入定理与替换定理

- **代入定理**：若 $G$ 是永真式，用任意公式 $H_i$ 替换 $G$ 中出现的原子变元 $P_i$，所得公式仍为永真式。
- **替换定理**：若 $G_1$ 是 $G$ 的子公式，且 $G_1 = H_1$，则用 $H_1$ 替换 $G$ 中的 $G_1$ 得到的新公式 $H$ 与 $G$ 等价（即 $G=H$）。

## 命题逻辑的应用实例

### 1. 逻辑电路化简

**例**：化简电路 $( (P \wedge Q \wedge R) \vee (P \wedge Q \wedge S) ) \wedge ( (P \wedge R) \vee (P \wedge S) )$

**解**：
$$
\begin{aligned}
\text{原式} &= ( (P \wedge Q) \wedge (R \vee S) ) \wedge ( P \wedge (R \vee S) ) & (\text{提取公因式}) \\
&= P \wedge Q \wedge (R \vee S) & (\text{吸收律 } A \wedge B \wedge A = A \wedge B)
\end{aligned}
$$

### 2. 逻辑谜题：骑士与无赖

**背景**：骑士只说真话，无赖只说假话。

**场景 1**：
A 说：“我们两个都是无赖”。问 A, B 身份。
- 若 A 是骑士 $\Rightarrow$ 话为真 $\Rightarrow$ A, B 都是无赖 $\Rightarrow$ 矛盾（A 既是骑士又是无赖）。
- 若 A 是无赖 $\Rightarrow$ 话为假 $\Rightarrow$ “两人都是无赖”为假 $\Rightarrow$ 至少有一人是骑士。因 A 是无赖，故 **B 是骑士**。

**场景 2**：
A 说：“B 在撒谎”。C 说：“B 在撒谎”。
- 结论：A 和 C 说的话相同，身份并未直接互斥，但 B 和 C 必然身份相反（一个说谎一个没说）。此题需更多信息，但可推断 **B 和 C 身份不同**。

### 3. 多数表决电路 (飞机复核系统)

**问题**：三台计算机 $C_1, C_2, C_3$ 复核飞行计划，采用“少数服从多数”原则。求判断结果 $S$ 的公式。

**真值表分析**：
只要有 2 台或 3 台为 1 (真)，则 $S=1$。
即 $(1,1,0), (1,0,1), (0,1,1), (1,1,1)$ 四种情况。

**公式**：
$$
S = (C_1 \wedge C_2 \wedge \neg C_3) \vee (C_1 \wedge \neg C_2 \wedge C_3) \vee (\neg C_1 \wedge C_2 \wedge C_3) \vee (C_1 \wedge C_2 \wedge C_3)
$$
**化简**：
$$
S = (C_1 \wedge C_2) \vee (C_1 \wedge C_3) \vee (C_2 \wedge C_3)
$$

## 范式 (Normal Forms)

### 1. 基本定义

- **文字 (Literal)**：命题变元或其否定（如 $P, \neg P$）。
- **析取式 (子句)**：有限个文字的析取（如 $P \vee \neg Q$）。
- **合取式 (短语)**：有限个文字的合取（如 $P \wedge Q \wedge \neg R$）。

### 2. 析取范式与合取范式

- **析取范式 (DNF)**：有限个**短语**的析取。
  $$ A_1 \vee A_2 \vee \dots \vee A_n \quad (\text{其中 } A_i \text{ 是合取式}) $$
- **合取范式 (CNF)**：有限个**子句**的合取。
  $$ B_1 \wedge B_2 \wedge \dots \wedge B_n \quad (\text{其中 } B_i \text{ 是析取式}) $$

**定理**：任何命题公式都存在与之等价的析取范式和合取范式。

### 3. 极小项与极大项

对于 $n$ 个命题变元：

- **极小项 (Minterm, $m_i$)**：包含全部 $n$ 个变元的**合取式**，每个变元以原形或否定形式出现一次。
  - **性质**：每个极小项只有一种赋值使其为真（对应真值表的一行）。
  - **编码**：变元为 1，否定为 0。例如 $P \wedge \neg Q \wedge R \Rightarrow 101 \Rightarrow m_5$。

- **极大项 (Maxterm, $M_i$)**：包含全部 $n$ 个变元的**析取式**。
  - **性质**：每个极大项只有一种赋值使其为假。
  - **编码**：变元为 0，否定为 1。例如 $\neg P \vee Q \vee \neg R \Rightarrow 101 \Rightarrow M_5$。

**关系**：
$$ \neg m_i = M_i $$

### 4. 主范式 (Principal Normal Forms)

为了解决范式不唯一的问题，引入主范式。

#### 主析取范式 (PDNF)
由**极小项**的析取构成。
- **求法**：选出真值表中结果为 **T (1)** 的行，将对应的极小项析取。
- **用途**：判断两公式是否等价（主析取范式唯一）；判断是否为永假式（主析取范式为空）。

#### 主合取范式 (PCNF)
由**极大项**的合取构成。
- **求法**：选出真值表中结果为 **F (0)** 的行，将对应的极大项合取。
- **用途**：判断是否为永真式（主合取范式为空）。

#### 范式转换算法

**由 PDNF 求 PCNF**：
若公式 $G$ 的主析取范式包含极小项下标集合为 $I$，全集为 $U = \{0, 1, \dots, 2^n-1\}$。
则 $G$ 的主合取范式包含的极大项下标集合为 $U - I$。

**例**：
设 $G(P, Q, R)$ 的主析取范式为 $m_0 \vee m_1 \vee m_3 \vee m_4 \vee m_6 \vee m_7$。
则缺少的下标为 $\{2, 5\}$。
故主合取范式为 $M_2 \wedge M_5$。

### 5. 范式的应用

- **判断公式类型**：
  - **永真式** $\iff$ 主析取范式包含所有 $2^n$ 个极小项 $\iff$ 主合取范式为空。
  - **永假式** $\iff$ 主析取范式为空 $\iff$ 主合取范式包含所有 $2^n$ 个极大项。
  - **可满足式** $\iff$ 主析取范式不为空。

- **判断等价**：两个公式等价当且仅当它们具有相同的主范式。

