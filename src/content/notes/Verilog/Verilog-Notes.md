---
title: 'Verilog Notes'
description: WTF I didn't learn anything!
publishDate: 2026-04-27 20:04:10
tags:
  - Code
  - Learn
language: '中文'
heroImage: { src: '../../../public/covers/Wanlingce.jpg', color: '#edb9a2' }
order: 1
---

# Verilog HDL

## Chapter I 简介

#### 什么是 Verilog HDL?

Verilog HDL 是一种硬件描述语言，可以完整描述电路和算法，方便仿真。

Verilog HDL具有以下描述能力：设计的行为特性、设计的数据流特性、设计的结构组成、包含相应监控和设计验证方面的时延和波形产生机制。

### 主要能力

- 基本逻辑门，例如 **and** **or** **nand** 等
- 用户定义原语 UDP 可以是组合逻辑原语，也可以是时序逻辑原语
- 开关级基本结构模型，例如 **pmos** **nmos** 等
- 通过三种方式建模：行为描述、数据流描述、结构化描述
- 有两种基本数据类型：线网类型 `wire` 和寄存器类型 `reg` 。线网类型表示物理连线，寄存器类型表示抽象数据存储原件
- 剩下的没啥有用的话（）

## Chapter II HDL 指南

### 模块

模块是 Verilog 的基本描述单位，用于描述某个设计的功能或者结构，以及它与外界通信的端口（类似于提供函数的参数）。一个设计的结构可以使用开关机原语、门级原语和用户定义的原语方式描述，设计的数据流行为可以使用连续赋值语句进行描述； 时序行为使用过程描述。

模块可以被另一个模块使用。

```verilog
module module_name (port_list);
	Declarations:
		reg, wire, parameter,
		input, output, inout,
		function, task, ...
	Statements:
		Initial statement
		Always statement
		Module instantiation
		Gate instantiation
		UDP instantiation
		Continuous assignment
endmodule
```

说明部分：用于定义不同的项。例如模块描述中使用的参数和寄存器。语句定义设计的功能和结构。说明部分和语句可以散步在模块中的任何地方；但是变量、寄存器、线网和参数等的说明部分必须在使用前出现。

为了使得模块描述清晰和有良好的可读性，最好**将所有的说明部分放在语句前**。

```verilog
module HalfAdder (A, B, Sum, Carry);
    input A, B;
    output Sum, Carry;
    
    assign #2 Sum = A ^ B;
    assign #5 Carry = A & B;
endmodule
```

例如，这个模块的名字是 `HalfAdder` 。模块有四个接口：两个输入端口 A 和 B，两个输出端口 Sum 和 Carry。由于没有定义端口位数，所有端口大小都为 1 位；同时因为没有各个端口的数据类型说明，这四个端口都是**线网**数据类型。

![image-20260427221029374](https://img.nkns.cc/2026/04/6a75086b717a203ac642a27e4c18562a.png])

模块包含两条描述半加器数据流行为的连续赋值语句，从这种意义上讲，这些语句在模块中出现的顺序无关紧要。语句是**并发**的。

在模块中可以用以下方式描述设计：

- 数据流方式
- 行为方式
- 结构方式
- 以上三种方式的混合

这几种描述方式将在后文中提到。

### 时延

Verilog HDL 模型中的所有时延都根据时间单位定义。下面是一个带时延的连续赋值语句示例。

```verilog
assign #2 Sum = A ^ B;
```

这里的 `#2` 指的是**两个时间单位**。

使用编译指令将时间单位与物理时间相关联。这样的编译器指令需要在模块前定义。如下所示：

```verilog
` timescale 1ns / 100ps
```

此语句说明时延时间单位为 1 ns 并且时间精度为 100 ps，即
$$
\left| t_{实际} - t_{预期} \right| \leq 100\ ps
$$
如果没有这样的编译器指令，Verilog HDL 模拟器会指定一个缺省时间单位。IEEE没有规定缺省时间单位。

### 数据流描述方式

该描述最基本的机制就是使用连续赋值语句。在连续赋值语句中，某个只被指派给线网变量。

```verilog
assign [delay] LHS_net = RHS_expression;
```

右边表达式操作数无论何时**发生变化**，都需要**重新计算**，并且在指定的时延后赋值给左边的`wire`变量。时延定义的是右边表达式变化与赋值给左边表达式之间的持续时间。如果没有定义时延值，缺省时延为 0。

这是一个 2-4 解码器电路的描述。

```verilog
`timescale 1ns/ 1ns
module Decoder2x4 (A, B, EN, Z);
    input A, B, EN;
    output [0:3] Z;
    wire Abar, Bbar;
    
    assign #1 Abar = ~A;
    assign #1 Bbar = ~B;
    assign #2 Z[0] = ~(Abar & Bbar & EN);
    assign #2 Z[1] = ~(Abar & B & EN);
    assign #2 Z[2] = ~(A & Bbar & EN);
    assign #2 Z[3] = ~(A & B & EN);
endmodule
```

![image-20260502135913667](https://img.nkns.cc/2026/05/35ff5a56232e040e9d92000d9997b774.png)

以反引号 ` ` `  开始的语句是编译器指令，编译器指令 timescale 将模块中的所有时延的单位设置为 1 ns ，时间精度为 1 ns

模块 Decoder2x4 有 3 个输入端口和 1 个 4 位输出端口。线网类型说明了两个连线形变量 Abar 和 Bbar 。此外，模块包含 6 个连续赋值语句。

![image-20260502143411176](https://img.nkns.cc/2026/05/1b5d5751c91a47ee170103396eb91755.png)

> 参见波形图。当 EN 在第 5 ns 变化时 ,语句 3、4、5 和 6 执行。这是因为 EN 是这些连续赋值语句中右边表达式的操作数。 Z[0] 在第 7 ns 时被赋予新值 0。当 A 在第15 ns 变化时, 语句 1、5 和 6 执行。执行语句 5 和 6 不影响 Z[0] 和 Z[1] 的取值。执行语句 5 导致 Z[2] 值在第 17 ns 变为 0。执行语句 1 导致 Abar 在第 16 ns 被重新赋值。由于Abar的改变，反过来又导致 Z[0] 值在第 18 ns 变为 1。

连续赋值语句是并发执行的，也就是说各个语句的执行顺序与其在描述中出现的顺序无关。

### 行为描述模式

1. initial 语句：此语句只执行一次
2. always 语句：此语句循环执行

只有寄存器类型数据能够在这两种语句中被赋值。寄存器类型数据在被赋新值前保持原有值不变。所有的 initial 语句和 always 语句在 0 时刻并发执行。

下例为 always 语句对 1 位全加器电路建模的示例。

```verilog
module FA_Seq(A, B, Cin, Sum, Cout);
    input A, B, Cin;
    output Sum, Cout;
    reg Sum, Cout;
    reg T1, T2, T3;
    always
        @ (A or B or Cin) begin
            Sum = (A ^ B) ^ Cin;
            T1 = A & Cin;
            T2 = B & Cin;
            T3 = A & B;
            Cout = (T1 | T2) | T3;
        end
endmodule
```

![image-20260504143306403](https://img.nkns.cc/2026/05/797efb35118c12a1c5b622a42913f352.png)

模块 FA_Seq 有三个输入和两个输出。**由于 Sum、Cout、T1、T2 和 T3 在 always 语句中被赋值，它们被说明为 reg 类型（是寄存器类型的一种）。**

always 语句中有一个与事件控制（紧跟在@后面的表达式）相关联的 begin-end 对，这意味着只要 A、B 或 Cin 发生变化，顺序过程就执行。顺序过程结束后，always 语句继续等待事件。

在顺序过程中出现的语句是过程赋值模块化的实例。模块化过程赋值在下一条语句执行前完成执行，有一个可选的时延，可以细分为两种类型：

1. 语句间时延：时延语句执行的时延 

   ```verilog
   Sum = (A ^ B) ^ Cin;
   #4 T1 = A & Cin;	// 这条语句延迟 4 个时间单位执行
   ```

2. 语句内时延：右边表达式计算与左边表达式赋值间的时延

   ```verilog
   Sum = #3 (A ^ B) ^ Cin;	// 右边计算结束之后等待 3 个时间单位再赋值给 Sum
   ```

如果没有定义时延，缺省为 0 时延。

下面是 initial 语句中的示例：

```verilog
`timescale 1ns / 1ns
module Test (Pop, Pid);
    output Pop, Pid;
    reg Pop, Pid;
    
    initial
        begin
            Pop = 0;
            Pid = 0;
            Pop = #5 1;
            Pid = #3 1;
            Pop = #6 0;
            Pid = #2 0;
        end
endmodule
```

![image-20260504151028318](https://img.nkns.cc/2026/05/8b07c29f42f2fab2dcae9d25ac187bda.png)

这是对应的波形。正如上面所说，begin-end 对里面是**顺序执行**。

### 结构化描述形式

在 Verilog HDL 中可使用如下方式描述结构

1. 内置门原语
2. 开关级原语（**晶体管**级）
3. 用户自定义原语
4. 模块实例

通过线网相互连接。下面是使用内置门原语描述的全加器实例

```verilog
module FA_Str(A, B, Cin, Sum, Cout);
    input A, B, Cin;
    output Sum, Cout;
    wire S1, T1, T2, T3;
    
    xor
    	X1 (S1, A, B),
    	X2 (Sum, S1, Cin);
    and
    	A1 (T3, A, B),
    	A2 (T2, B, Cin),
    	A3 (T1, A, Cin);
    or
    	O1(Cout, T1, T2, T3);
endmodule
```

门实例由 wire 类型相连，列表中的第一个是输出，剩下的是输入。

下面是一个 4 位全加器的结构描述

```verilog
module FourBitFA (FA, FB, FCin, FSum, FCout);
    parameter SIZE = 4;
    input [SIZE:1] FA, FB;
    output [SIZE:1] FSum;
    input FCin;
    output FCout;
    wire [1:SIZE-1] FTemp;
    FA_Str
    	FA1(.A(FA[1]), .B(FB[1]), .Cin(FCin), .Sum(FSum[1]), .Cout(FTemp[1])),
    	FA2(FA[2], FB[2], FTemp[1], FSum[2], FTemp[2]),
        // 相同形式一直到 FA4
endmodule
```

这里第一个语句是**命名关联方式**，即端口的名称和它连接的线网被显式地描述了，每一个的形式都是 `.port_name (net_name)`

第二个语句则是**位置关联方式**，这里的顺序很重要，必须和模块定义的参数顺序相同。

### 混合设计描述模式

在模块中，以上的描述模式可以自由混合。下面是一个混合设计方式的 1 位全加器实例

```verilog
module FA_Mix (A, B, Cin, Sum, Cout);
    input A, B, Cin;
    output Sum, Cout;
    reg Cout;
    reg T1, T2, T3;
    wire S1;
    
    xor X1 (S1, A, B);
    
    always @ (A or B or Cin) begin
        T1 = A & Cin;
        T2 = B & Cin;
        T3 = A & B;
        Cout = (T1 | T2) | T3;
    end
    assign Sum = S1 ^ Cin;
endmodule
```

只要 A 或 B 上有事件发生，**门实例**立即被执行。只要 A 或 B 或 Cin 上有事件发生，就执行 always 语句， 只要 S1 或 Cin 上有事件发生，就执行连续赋值语句。

### 设计模拟

Verilog HDL 不仅提供描述设计的能力，同时还可以提供仿真模拟的功能。设计验证可以通过在初始化语句中写入相应的语句自动与期待的响应值比较完成。

下面是一个测试模块 Top 的例子，测试 FA_Swq 模块。

```verilog
`timescale 1ns / 1ns
module Top;
    reg PA, PB, PCi;
    wire PCo, PSum;
    
    FA_Swq F1(PA, PB, PCi, PSum, PCo)	// 结构化描述
    
    initial begin: ONLY_ONCE
        reg [3:0] Pal;
        for(Pal = 0; Pal < 8; Pal = Pal + 1) begin
            {PA, PB, PCi} = Pal;
            #5 $display ("PA, PB, PCi = %b%b%b", PA, PB, PCi, " PCo, PSum = %b%b", PCo, PSum);
        end
    end
endmodule
```

系统任务 `$display` 调用中的时延控制规定该任务在 5 个单位时间后执行。这段时间基本代表了逻辑处理时间。

注意这里 Pal 在初始化语句内部被定义。为了完成这一功能，begin-end 块必须被标记。这种情况下，ONLY_ONCE 是顺序过程标记。如果顺序过程内没有局部生命的变量就不需要被标记。这是测试模块的输出和对应的波形。

![image-20260504162320511](https://img.nkns.cc/2026/05/47ebf0904b6a46a51e4188b5723dee00.png)

下面给出一个验证与非门交叉连接构成的 RS_FF 模块的测试模块

```verilog
`timescale 10ns / 1ns
module RS_FF (Q, Qbar, R, S);
    output Q,Qbar;
    input R, S;
    
    nand #1 (Q, R, Qbar);
    nand #1 (Qbar, S, Q);
endmodule

module Test;
    reg TS, TR;
    wire TQ, TQb;
    
    RS_FF NSTA(.Q(TQ), .S(TS), .R(TR), .Qbar(TQb));
    
    initial begin:
        TR = 0;
        TS = 0;
        #5 TS = 1;
        #5 TS = 0;
        TR = 1;
        #5 TS = 1;
        #5 TS = 0;
        TR = 0;
        #5 TS = 0;
        #5 TS = 1;
    end
    
    initial
        $monitor(...);	// 输出显示，这里缺省了
endmodule
```

这是 Test 模块的波形

![image-20260504163059100](https://img.nkns.cc/2026/05/a8a3d0c162f40f5979afcb069c01d7f3.png)
