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

以反引号 ` 开始的语句是编译器指令，编译器指令 timescale 将模块中的所有时延的单位设置为 1 ns ，时间精度为 1 ns

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

## Chapter III Verilog 语言要素

### 标识符

Verilog HDL 中的标识符可以是任意一组数字、字母、$和_符号的组合，但是标识符的第一个字符必须是字母或者下划线。比如`Count` `COUNT` `_R1_D2` `FIVE$` 等

**转义**标识符可以在一条标识符中包含任何可打印字符。以`\`开头，以空白结尾（空格或制表符或换行符），例如 `\7400` `\.*.$` 等，一个需要注意的是：

```
\OutGate	与 OutGate 相同。
```

这意味着转义用的反斜线和空格不是转义标识符的一部分。

Verilog HDL 定义了一系列保留字，叫作关键字，它仅用于某些上下文中。

另外，转义标识符和关键字并不完全相同。标识符 `\initial`和标识符 `initial` 不相同。

### 注释

在 Verilog HDL 中有两种形式的注释

```verilog
/* Type I
	I can enter to a new line!! */

// Type II Single line :( 
// but simple! :)
```

### 格式

Verilog HDL 区分**大小写**，也就是说大小写不同的标识符是不同的。此外，Verilog HDL 是自由格式的，即中间的空白符号不影响程序编写，这一点和 C 语言差不多。例如：

```verilog
// no enter
initial begin Top = 3'b001; #2 Top = 3'b011; end

// enter
initial
    begin
        Top = 3'b001;
        #2 Top = 3'b011;
    end
```

上面的两种写法实际是相同的。

### 系统任务和函数

以 `$` 开始的标识符表示系统任务或系统函数。任务提供了一种封装行为的机制（类似函数），这种机制可以在设计的不同部分被调用。任务可以返回 0 个或任意个值，允许延迟，而函数只能返回一个值，而且不允许延迟，除此之外任务和函数相同。

```verilog
$display ("Hi, you have reached LT today");
$time
```

### 编译指令

以 ` 开始的某些标识符是编译器指令。在 Verilog 语言编译时，这些指令将会在整个编译过程中有效。完整的编译器指令有：

```verilog
`define `undef
`ifdef `else `endif
`default_nettype
`include
`resetall
`timescale
`unconnected_drive `nounconnected_drive
`celldefine `endcelldefine
```

#### define 和 undef

define 指令用于文本替换，它很像 C 语言中的 #define 指令，如：

```verilog
`define MAX_BUS_SIZE 32
...
reg [`MAX_BUS_SIZE - 1 : 0] AddReg;
```

一旦指令被编译，在整个编译过程中都有效，例如，通过另一个文件中的 define 指令，MAX_BUS_SIZE 能够被多个文件使用。

如果取消前面的定义呢？可以使用 undef

```verilog
`define WORD 16
...
wire [`WORD : 1] Bus;
...
`undef WORD
// 这之后出现的 WORD 将不再有效
```

#### ifdef else 和 endif

这些编译指令用于条件编译：

```verilog
`ifdef WINDOWS
parameter WORD_SIZE = 16
`else
parameter WORD_SIZE = 32
`endif
```

在编译过程中，如果有名字是 WINDOWS 的文本宏被定义了，那么就使用第一种参数声明。否则使用第二种参数。

else 指令对于 ifdef 指令是可选的。

#### default_nettype

这个指令用于为隐式线网指定线网类型，也就是将那些没有说明的连线的类型。

这里需要补充的是，线网类型亦有区别。例如：

```verilog
`default_nettype wand
```

这句话为缺省定义的线网视为线与类型。因此，如果在此指令后面的任何模块中没有说明的连线，那么该线网被假定为线与类型。

wire 家族的其他成员涉及到多个驱动源驱动同一根电线的问题，这门课里不做过多考虑。只需要知道这个指令是干嘛的就好。

#### include

include 指令用于嵌入内嵌文件的内容。文件既可以用相对路径名去定义，也可以用全路径名定义。例如：

```verilog
`include "../../primitives.v"
```

编译时，这一行由文件 `../../primitives.v` 替代。

#### resetall

这条指令将左右的编译指令重新设置为缺省值。

```verilog
`default_nettype wand
...
`resetall
```

这条指令使得缺省连线类型恢复为线网类型。

#### timescale

在 Verilog HDL 中，所有时延都要用单位时间表述。使用 timescale 指令将时间单位和实际时间相关联。这条指令用于定义时延的单位和时延精度。timescale 指令格式为：

```verilog
`timescale time_unit / time_precision
```

这里 time_unit 和 time_precision 有值 1 / 10 / 100 以及单位 s ms us ns ps 和 fs 组成。例如：

```verilog
`timescale 1ns / 100ps
```

表示时延单位为 1ns ，精度为 100ps 。timescale 指令在模块说明外部出现，并且影响后面所有的时延值。例如：

```verilog
`timescale 1ns / 100ps
module AndFunc (Z, A, B);
    output Z;
    input A, B;
    
    and #(5.22, 6.17) Al (Z, A, B);
endmodule

`timescale 10ns / 1ns
module TB;
    reg PutA, PutB;
    wire GetO;
    initial
        begin
            PutA = 0;
            PutB = 0;
            #5.21 PutB = 1;
            #10.4 PutA = 1;
            #15 PutB = 0;
        end
    AndFunc AFl(GetO, PutA, PutB);
endmodule
```

这里每个模块都有自己的 timescale，例如第一个模块中的 5.22 6.17 对应的就是 5.22ns 和 6.17ns，而第二个模块中的 5.21 对应的是52.1ns。两边的误差也是等比例放大。

#### unconnected_drive 和 nounconnected_drive

在模块实例化中，出现在这两个指令间的所欧未连接输入端口或者为正偏电路状态或者是反正偏电路状态。

```verilog
`unconnected_drive pull1
...
/* 这中间的所有未连接输入端口连接到高电平 */
`nounconnected_drive

`unconnected_drive pull0
...
/* 这中间的所有未连接输入端口连接到低电平 */
`nounconnected_drive
```

#### celldefine 和 endcelldefine

这两个指令将模块标记为但愿模块。他们表示包含模块定义。

```verilog
`celldefine
module FD1S3AX(D, CK, Z);
	...
endmodule
`endcelldefine
```

这个指令是留给各个 EDA 开发商用的，生产好的原件不需要大家点开再去看里面的结构了，所以拿这个封装好，仿真就不用跑里面的东西了。

### 值集合

Verilog HDL 有下列四种基本的值：

1. 0 逻辑 0 或 “假”
2. 1 逻辑 1 或 “真”
3. x 未知
4. z 高阻

这四种值的解释被内置于语言中。在门外的输入或者一个表达式中的为`z` 的值通常被解释为`x`。此外，x 和 z 都是不区分大小写的。也就是说，`0x1z`和 `0x1Z`大小相同。

Verilog HDL 中有三类常量：

1. 整形
2. 实数型
3. 字符串型

下划线符号可以被任意用在整数或者实数中，它们就数量本身没有意义，用来提高易读性。例如`1_000_000`

#### 整型数

可以按照一下两种形式书写：

1. 简单的十进制数格式

   例如`32` `-15` 等，这种形式的整数值代表一个有符号的数。

2. 基数格式

   这种格式的整数格式为`[size] 'base value`

   size 定义以位计的常量的位长；base 为 o/O/b/B/d/D/h/H （八、二、十、十六进位）；value 是基于 base 的值的数字序列，值中的所有字母（包括 x 和 z）不区分大小写。

   例如：`5'037` `4'D2` `4'B1x_01` `7'Hx` `4'hZ` ......

   这里后面两个的意思是位 x 和位 z，即 xxxxxxx 和 ZZZZ 。x（或 z ）在十六进制值中代表 4 位 x（或  z ），在八进制中代表 3 位 x（或  z ），在二进制中代表 1 位 x（或 z ）。

​	基数格式的数通常为无符号数，这种形式的整型数的长度定义是可选的，如果没有定义长度，那么长度就是对应 value 的位数。

​	如果定义的长度比常量指定的长度长，那么就在左边补 0。但是如果数最左边一位为 x 或者 z，那么就相应地用 x 和 z 补位。？字符在数中可以代替值 z 在值 z 被解释为不分大小写的情况下提高可读性。

#### 实数

表示同 C 语言，十进制计数法或科学记数法均可。

#### 字符串

字符串是双引号内的字符序列。字符串不能分成多行书写。例如：

```verilog
"INTERNAL ERROR"
"REACHED->HERE"
```

用八位 ASCII 值表示的字符可以看作是无符号整数。因此字符串是 8 位 ASCII 值的序列。为了保存字符串 `"INTERNAL ERROR"` ，变量需要 8 * 14 位。

```verilog
reg [1 : 8 * 14] Message;
...
assign Message = "INTERNAL ERROR";
```

反斜线用于对确定的特殊字符转义。转义规则同 C 语言。

### 数据类型

Verilog HDL 有两大类数据类型。

1. 线网类型。net type 表示 Verilog 结构化元件间的物理连线。它的值由驱动元件的值决定，例如连续赋值或门的输出。如果没有驱动连接到线网，线网的缺省值为 z。
2. 寄存器类型。register type 表示一个抽象的数据存储单元，它只能在 always 和 initial 语句中被赋值，而且它的值从一个赋值到另一个赋值被保存下来。寄存器类型的变量具有 x 的缺省值。

#### 线网类型

```verilog
wire tri wor trior wand triand trireg tri1 tri0 supply0 supply1
```

简单的线网类型说明语法为：

```verilog
net_kind [msb:lsb] net1, net2, ..., netN;
```

net_kind 对应上面的线网类型，msb 和 lsb 是用于定义线网范围的常量表达式。范围定义可选，缺省为 1。

```verilog
wire Rdy, Start;	// 2 个 1 位的连线
wand [2:0] Addr;	// Addr 是 3 位线与
```

当线网有多个驱动时，不同的类型行为不同。

```verilog
wor Rde;
...
assign Rde = Blt & Wyl;
...
assign Rde = Kbl | Kip;
```

这里 Rde 有两个驱动源，实际的有效值由 `wor` 类型的真值表决定。

1. wire 和 tri

   最常见的线网类型。tri 即三态线网

## Chapter VII 数据流模型化

### 连续赋值语句

将值赋给线网

```verilog
assign LHS_target = RHS_expression
// eg.
wire [3.0] Z, Preset, Clear;
assign Z = Preset & Clear;
```

赋值的目标是 Z，表达式右端是 "Preset & Clear"

执行时间点：右侧表达式的操作数上面有值发生变化了，发生时，表达式被计算。如果结果值有变化，新结果赋值给左边的线网。其中，右边值发生变化的过程叫作发生了**事件**。

在上面的例子中，Preset 或 Clear 变化，就计算右边的整个表达式。如果结果变化，那么结果就赋值到线网 Z。

连续赋值的目标类型如下：

1. 标量线网
2. 向量线网
3. 向量的常数型位选择
4. 向量的常数型部分选择
5. 上述类型的任意地拼接运算结果

下面是连续赋值语句的另一些例子：

```verilog
assign BusErr = Parity | (One & OP);
assign Z = ~ (A | B) & (C | D) & (E | F);
```

只要 A / B / C / D / E / F 的值变化，最后一个连续赋值语句就执行。

在下一个例子中，目标是一个向量线网和一个标量线网的拼接结果。

```verilog
wire Cout, Cin;
wire [3:0] Sum, A, B;
...
assign {Cout, Sum} = A + B + Cin;
```

因为 A 和 B 是 4 位宽，加操作的结果最大能够产生 5 位结果。左端表达二手的长度指定为 5 位（Cout 1 位， Sum 4 位）赋值语句因此促使最右边的 4 位结果赋值给 Sum，第 5 位 Cin 赋值给 Cout。

下面说明如何在一个连续赋值语句中编写多个复制方式。

```verilog
assign Mux = (S == 0) ? A : 'bz
    Mux = (S == 1) ? B : 'bz
    Mux = (S == 2) ? C : 'bz
    Mux = (S == 3) ? D : 'bz
```

这是连续四个 `assign Mux = (S == i) ? L_i : 'bz` 语句的简化书写形式。

### 举例

下面采用数据流方式描述 1 位全加器

```verilog
module FA_Df(A, B, Cin, Sum, Cout);
    input A, B, Cin;
    output Sum, Cout;
    
    assign Sum = A ^ B ^ Cin;
    assign Cout = (A & Cin) | (B & Cin) | (A & B);
endmodule
```

在本例中，有两个连续赋值语句。这些语句是并发的，与书写顺序无关。只有连续赋值语句右端表达式中操作数的值发生变化，连续赋值语句就被执行。

### 线网说明赋值

连续赋值可以作为线网说明本身的一部分。这要的赋值被称为线网说明赋值。例如：

```verilog
wire [3:0] Sum = 4'b0;
wire Clear = 'b1;
wire A_GT_B = A > B, B_GT_A = B > A;
```

线网寿命赋值说明线网与连续赋值。寿命线网然后编写连续赋值语句是一种方便的形式。参见下例：

```verilog
wire Clear;
assign Clear = 'b1;
// 等价于线网声明赋值：
wire Clear = 'b1;
```

不允许在同一个线网上出现多个线网声明赋值。如果多个赋值是必须的，则必须使用连续赋值语句。

### 时延

如果在连续赋值语句中没有定义时延，如前面的例子，则右端表达式的值立刻被赋给左端表达式。时延为 0。如下例所示显式定义连续赋值的时延。

```verilog
assign #6 Ask = Quiet || Late;
```

规定右边表达式结果的计算岛器赋给左边目标需经过 6 个时间单位时延。例如，如果在时刻 5，Late 值发生变化，那么赋值的右端表达式被计算，并且 Ask 在时刻 11 被赋予新值。

![image-20260510024125893](https://img.nkns.cc/2026/05/83dd2f1c068267ec47df13c0af0ff55a.png)

如果右端在传输给左端之前发生变化，会发生什么呢？在这种情况下应用最新的变化值。下例显示了这种行为：

```verilog
assign #4 Cab = Drm;
```

图中显示了这种变化的效果。右端发生在时延间隔内的变化被滤掉。例如，在时刻 5， Drm 的上升边沿预定在时刻 9 显示在 Cab 上，但是因为 Drm 在 8 下降为 0，预定在 Cab 上的值被删除。同样，18 到 20 之间的那次也是被过滤掉了。**如果时间间隔内右端值变化，那么前面的值不能传输到输出。**

![image-20260510024526252](https://img.nkns.cc/2026/05/9b3102c9152041d7659120cc5cce10c0.png)

对于每个时延定义，总共能够指定三类时延值：

1. 上升时延
2. 下降时延
3. 关闭时延

这三类时延的语法如下：

```verilog
assign # (rise, fall, turn-off) LHS_target = RHS_expression
```

下面是当三类时延值定义为 0 时，如何解释时延的实例：
```verilog
assign #4 Ask = Quiet || Late;
assign # (4, 8) Ask = Quick;
assign # (4, 8, 6) Arb = & DataBus;
assign Bus = MemAddr [7:4];
```

在第一个赋值语句中，上升时延、下降时延、截止时延和传递到 x 的时延相同，都为 4。在第二个语句中，分别是 4 8 4 4，在第三个赋值中，分别是 4 8 6 4。在最后的语句中，所有的时延都为 0。

上升时延对于向量线网目标意味着什么呢？如果右端从非 0 向量变化到 0 向量，那么就使用下降时延。如果右端值到达 z，那么使用下降时延；否则使用上升时延。

### 线网时延

时延也可以在线网中说明定义。

```verilog
wire #5 Arb;
```

这个时延表明 Arb 驱动原址改变与线网 Arb 本身间的时延。考虑下面对线网 Arb 的连续赋值语句：

```verilog
wire #2 Arb = Bod & Cap;
```

假定在时刻 10，Bod 上的时间促使表达式计算。如果结果不同，则在 2 个时间单位后赋值给 Arb。但是因为定义了线网时延，实际对 Arb 的赋值发生在时刻 17 (10 + 2 + 5)。如下图：

![image-20260510032559981](https://img.nkns.cc/2026/05/95994a750309ee238b5baf31ffa38308.png)

再下面的图很好的描述了线网时延的效果。首先使用赋值时延，然后增加任意线网时延。

![image-20260510032649366](https://img.nkns.cc/2026/05/5b3ff06d2ae0b8587511e60f3d79bdb6.png)

如果时延在线网说明赋值中出现，那么时延不是线网时延，二式赋值时延。下面是 A 的线网说明赋值，2 个时间单位是赋值时延，而不是线网时延。

```verilog
wire #2 A = B - C;
```

### 举例

#### 主从触发器

```verilog
module MSDFF_DF(D, C, Q, Qbar);
    input D, C;
    output Q, Qbar;
    wire NotC, NotD, NotY, Y, D1, D2, Ybar, Y1, Y2;
    
    assign NotD = ~D;
    assign NotC = ~C;
    assign NotY = ~Y;
    
    assign D1 = ~(D & C);
    assign D2 = ~(C & NotD);
    assign Y = ~(D1 & Ybar);
    assign Ybar = ~(Y & D2);
    assign Y1 = ~(Y & NotC);
    assign Y2 = ~(NotY & NotC);
    assign Q = ~(Qbar & Y1);
    assign Qbar = ~(Y2 & Q);
endmodule
```

#### 数值比较器

下面是 8 位参数定义的数值比较器数据流模型。

```verilog
module MagnitudeComparator(A, B, AgtB, AeqB, AltB);
    parameter BUS = 8;
    parameter EQ_DELAY = 5, LT_DELAY = 8, GT_DELAY = 8;
    input [1:BUS] A, B;
    output AgtB, AeqB, AltB;
    
    assign #EQ_DELAY AeqB = A == B;
    assign #GT_DELAY AgtB = A > B;
    assign #LT_DELAY AltB = A < B;
    end
```

## Chapter VIII 行为建模

### 过程结构

下面两种语句是为一个设计的行为建模的主要机制。

1. initial 语句
2. always 语句

一个模块中可以包含任意个 initial 和 always，它们并行执行，一个对应的语句产生一个控制流。

#### initial语句

initial 语句只执行一次。在模拟开四是执行，即在 0 时刻开始执行。initial 语句的语法如下：

```verilog
initial [timeing_control] procedural_statement
```

其中的 `procedural_statement` 是下列语句之一：

```verilog
procedural_assignment {blocking or non-blocking} // 阻塞性或非阻塞过程赋值语句
procedural_continuous_assignment
conditional_statement
case_statement
loop_statement
wait_statement
disable_statement
event_trigger
sequential_block
parallel_block
task_enable {user or system}
```

顺序过程 begin-end最长是用在进程语句中。这里的时序控制可以使时延控制，即等待一个确定的时间；或事件控制，即等待确定的事件发生或某一特定的条件威震。initial 语句的各个进程语句仅执行一次。注意 initial 语句在模拟的 0 时刻开始执行。initial 语句根据进程语句中出现的时间控制在以后的某个事件完成执行。

下面是一个 initial 语句的实例。

```verilog
reg Yurt;
...
initial
    Yurt = 2;
```

上述 initial 语句中包含无时延控制的过程赋值语句。initial 语句在 0 时刻执行，促使 Yurt 在 0 时刻被赋值为 2。下面是一个带有时延控制的 initial 语句。

```verilog
reg Curt;
...
initial
    #2 Curt = 1;
```

寄存器变量 Curt 在时刻 2 被赋值为 1。initial 语句在 0 时刻开始执行，在时刻 2 完成执行。

下例是带有顺序过程的 initial 语句

```verilog
parameter SIZE = 1024;
reg [7:0] RAM [0:SIZE - 1];
reg RibRag;

initial
    begin: SEQ_BLK_A
        integer Index;
       	RibReg = 0;
        for (Index = 0; Index < SIZE; Index = Index + 1) {
            RAM[Index] = 0;
        }
    end
```

顺序过程由关键词 begin-end 定界，它包含顺序执行的进程语句，与 C 语言等高级编程语言相似。`SEQ_BLK_A` 是顺序过程的*标记*；如果过程中没有局部说明部分，不要求这一标记。

例如，如果对 Index 的说明部分在 intial 语句之外，不需要标记。整数型变量 Index 已在过程中声明。并且，顺序过程包含 1 个带循环语句的过程性赋值。这一 initial 语句在执行时将所有的内存初始化为 0。

下例是另一个带有顺序过程的 initial 语句。这个顺序过程包含时延控制的过程性赋值语句。

```verilog
parameter APPLY_DELAY = 5;
reg [0:7] port_A;
...
initial
    begin
        Port_A = 'h20
        #APPLY_DELAY Port_A = 'hF2;
        #APPLY_DELAY Port_A = 'h41;
        #APPLY_DELAY Port_A = 'h0A;
    end
```

执行时，Port_A 的值如图所示：

![image-20260510132922713](https://img.nkns.cc/2026/05/11dec3e4d26b216cc3bf811971b620a1.png)

Initial 语句主要用于初始化和波形生成。

#### always 语句 

与 initial 语句相反，always 语句反复执行。与 initial 语句类似，always 语句语法如下：

```verilog
always [timing_control] procedural_statement
```

过程语句和时延控制（时序控制）的描述方式与上节相同。

例如：

```verilog
always Clk = ~Clk;	// 将无限循环
```

此 always 语句有一个过程性赋值。因为 always 语句反复执行，并且在此例中没有时延控制，过程语句将在 0 时刻无限循环。因此，always 语句的执行必须带有某种时序控制，如下例的 always 语句，形式上与上面的实例相同，但带有时延控制。

```verilog
always #5 Clk = ~Clk;	// 产生时钟周期为 10 的波形
```

下面是由事件控制的顺序过程的 always 语句。

```verilog
reg [0:5] InstrReg;
reg [3:0] Accum;
wire ExecuteCycle;

always @ (ExecuteCycle)
    begin
        case(InstrReg[0:1])
            2'b00: Store(Accum, InstrReg[2:5]);
            2'b11: Load(Accum, InstrReg[2:5]);
            2'b01: Jump(Accum, InstrReg[2:5]);
            2'b10: ;
        endcase
    end
```

顺序过程 begin-end 中的语句按顺序执行。这个 always 语句意味着只要有事件发生，即值发生变化，ExecuteCycle 就执行顺序过程中的语句；顺序过程的执行意味着按顺序执行过程中的各个语句。

下例为带异步预置的负边沿触发的 D 触发器的行为模型

```verilog
module DFF(Clk, D, Set, Q, Qbar);
    input Clk, D, Set;
    output Q, Qbar;
    reg Q, Qbar;
    always
        wait (Set == 1)
        begin
            #3 Q = 1;
            #2 Qbar = 0;
            wait(Set == 0);
        end
    always
        @ (negedge Clk)
        begin
            if (Set != 1)
                begin
                    #5 Q = D;
                    #1 Qbar = ~Q;
                end
        end
endmodule
```

这里面第一条 always 语句由电平敏感事件控制，第二条 always 语句由边沿触发的事件控制。

#### 两类语句在模块中的应用

一个模块可以有多条 always 和 initial，下面是一个例子。

```verilog
module TestXorBehaviour;
    reg Sa, Sb, Zeus;
    
    initial
        begin
            Sa = 0;
            Sb = 0;
            #5 Sb = 1;
            #5 Sa = 1;
            #5 Sb = 0;
        end
    
    always
        @(Sa or Sb) Zeus = Sa ^ Sb;
    
    always
        @(Zeus)
        $display {"At time %t, Sa = %d, Sb = %d, Zeus = %d", $time, Sa, Sb, Zeus};
endmodule
```

模块中的 3 条语句并行执行，产生这样的波形

![image-20260510194822594](https://img.nkns.cc/2026/05/13329d475d075ce97757ceb4fe20b7a9.png)

### 时序控制

时序控制与过程语句关联，主要有两种形式：

1. 时延控制
2. 事件控制

#### 时延控制

形式如下：

```verilog
#delay procedural_statement
```

一个实例如下：

```verilog
#2 Tx = Rx-5;
```

时延控制定义为首次遇到这个语句和语句的执行的时间的间隔。时延控制表示在语句执行前的“等待时延”。上面的例子中，过程赋值语句在执行到这里 2 个时间单位后执行。

另一个实例如下：

```verilog
initial
    begin
        #3 Wave = 'b0111;
        #6 Wave = 'b1100;
        #7 Wave = 'b0000;
    end
```

initial 语句在 0 时刻被执行。首先，等待 3 个时间单位执行第一个赋值，然后等待 6 个时间单位执行第 2 个语句语句...执行完三条之后永远挂起。

时延控制也可以用另一种形式定义：

```verilog
#delay;
```

这一个语句促使在下一条语句执行之前等待给定的时延。

```verilog
parameter ON_DELAY = 3, OFF_DELAY = 3;
always
    begin
        #ON_DELAY;
        RefClk = 0;
        #OFF_DELAY;
        RefClk = 1;
    end
```

时延控制中的时延可以是任意表达式，即不必限定为某一个常量。

```verilog
#Strobe;
Compare = TX ask;
#(PERIOD / 2);
Clock = ~Clock;
```

显示零时延促发一个等待，等待所有其它在当前模拟时间被执行的时间执行完毕之后，才将其唤醒；模拟时间不前进。

如果时延表达式的值为 x 或 z，那么它和 0 时延等效。如果时延表达式计算结果为负值，那么其二进制的补码值会被作为时延。

#### 事件控制

在事件控制中，always 的过程语句基于事件执行。有两种类型的事件控制方式：

1. 边沿触发事件控制

   边沿触发事件控制如下：

   ```verilog
   @event procedural_statement
   ```

   如下例所示：

   ```verilog
   @(posedge Clock) Curr_state = Next_state;
   ```

   带有事件控制的进程或者过程语句的执行，必须等到指定事件发生。上例中，如果 Clock 信号从低电平变为高电平，那么就执行赋值语句；否则进程被挂起，直到 Clock 信号产生下一个正跳边沿。

   下面是进一步的实例：

   ```verilog
   @(negedge Reset) Count = 0;
   @Cla Zoo = Foo;
   ```

   在第一条语句中，赋值语句只在 Reset 上的负沿执行。第二条语句中，当 Cla 上有时间发生时，Foo 的值被赋给 Zoo，即等待 Cla 上发生事件时，Foo 的值被赋给 Zoo。

   也可以采用以下的形式：

   ```verilog
   @event;
   ```

   这个语句促发一个等待，直到指定的事件发生。下面是确定始终在周期的 initial 语句中使用的另一个例子。

   ```verilog
   time RiseEdge, OnDelay;
   initial
       begin
           // 等待时钟发生正边沿
           @(posedge ClockA);
           RiseEdge = $time;
           // 等待时钟发生负边沿
           @(negedge ClockA);
           OnDelay = $time - RiseEdge;
           $display("The on-period of clock is %t." Delay);
       end
   ```

   事件之间也能够相或以表明“如果有任何事件发生”。

   ```verilog
   @(posedge Clear or negedge Reset) Q = 0;
   @(Ctrl_A or Ctrl_B) Dbus = 'bz;
   ```

   注意关键字 `or` 并不意味着在 1 个表达式中的逻辑或。

   在 Verilog HDL 中 `posedge` 和 `negedge` 是表示正沿和负沿的关键字。信号的负沿是下属转换的一种：

   ```
   1 -> x
   1 -> z
   1 -> 0
   x -> 0
   z -> 0
   ```

   正沿是下述转换的一种：

   ```verilog
   0 -> x
   0 -> z
   0 -> 1
   x -> 1
   z -> 1
   ```

   *综合来说就是信号优先级从低到高是 0 x/z 1，从低到高变化是正沿，从高到低是负沿。*

2. 电平敏感事件控制

   在电平敏感时间控制中，进程语句或进程中的过程语句一直延迟到条件变为真后才执行。电平敏感时间控制形式如下：

   ```verilog
   wait (Condition) procedural_statement
   ```

   过程语句只有在条件为真时才执行，否则过程语句一直等待到条件为真。这里的过程语句是*可选的*。

   ```verilog
   wait (Sum > 22) Sum = 0;
   wait (DataReady) Data = Bus;
   wait (Preset);
   ```

   在第一条语句中，只有当 Sum 的值大于 22 时，才对 Sum 清 0。在第二条语句中，只有当 DataReady 为真，才将 Bus 赋给 Data。最后一条语句表示延迟至 Preset 变为真（1）时，后面的语句才可以继续执行。

### 语句块

语句块将两条或更多条语句组合成语法结构上相当于一条语句的机制。在 Verilog HDL 中有两类语句块。即：

1. 顺序语句块 begin-end：语句块中的语句按给定次序**顺序**执行。
2. 并行语句块 fork-join：语句块中的语句**并行**执行。

语句块中的标识符是*可选*的。如果有标识符，寄存器变量可以在语句块内部声明。带标识符的语句块可以被引用。语句块可使用禁止语句来禁止执行。此外，语句块标识提供唯一表示寄存器的一种方式。但是，要注意所有的寄存器都是静态的，即他们的值在整个模拟运行中不变。

#### 顺序语句块

顺序语句块中的语句按顺序方式执行。每条语句的时延都和前面语句执行的模拟时间相关。一旦顺序语句块执行结束，下一条语句就执行。语法如下：

```verilog
begin
    {:block_id{declarations}}
    procedural_statement(s)
end
// eg.
begin
    #2 Stream = 1;
    #5 Stream = 0;
    #3 Stream = 1;
    #4 Stream = 0;
    #2 Stream = 1;
    #5 Stream = 0;
end
```

假定顺序语句块在第 10 个时间单位开始执行。两个时间单位后第 1 调语句执行，即第 12 个时间单位。此执行完成后，下 1 条语句在第 17 个时间单位执行（延迟 5 个时间单位）。然后下一条语句在第 20 个时间单位执行。以此类推。该顺序语句块执行过程中产生的波形如下图所示。

![image-20260511001808623](https://img.nkns.cc/2026/05/6c6b1b6ca89bdfce0bb634a71800bdc0.png)

下面是顺序过程的另一个实例。

```verilog
begin
    Pat = Mask | Mat;
    @(negedge Clk);
    FF = &Pat
end
```

在这个例子中，第一条语句首先执行，然后执行第二条。根据前面说的，这个语句在 Clk 上出现负沿才执行，之后继续执行。

```verilog
begin: SEQ_BLK
    reg[0:3] Sat;
    
    Sat = Mask & Data;
    F = ^Sat;
end
```

在这个实例中，顺序语句块带有标记 `SEQ_BLK` 并且有一个局部寄存器说明。在执行时，首先执行第一条语句，然后顺序执行。

#### 并行语句块

带有定界符 fork-join，各个语句并行执行。每一条语句指定的时延值都与语句开始执行的时间相关。当并行语句块中最后的动作执行完成时，顺序语句块的语句继续执行。

**简单来说**，*并行语句块内的所有语句都不许在控制转出语句块之前完成执行。*

```verilog
fork
    {:block_id{declarations}}
    procedural_statement(s);
join
// eg.
fork
    #2 Stream = 1;
    #7 Stream = 0;
    #10 Stream = 1;
    #14 Stream = 0;
    #16 Stream = 1;
    #21 Stream = 0;
join
```

如果并行语句块在第 10 个时间单位开始执行，所有的语句并行执行并且所有的时延都是相对于时刻 10 的。如下图：

![image-20260511010053802](https://img.nkns.cc/2026/05/a6a86dc4cc8820d54802d471d68396a9.png)

下面的例子混合使用了顺序语句和并行语句块。

```verilog
always
    begin: SEQ_A
        #4 Dry = 5;
        
        fork: PAR_A
            #6 Cun = 7;
            begin: SEQ_B
                EXE = Box;
                #5 Jap = Exe;
            end
            
            #2 Dop = 3;
            #4 Gos = 2;
            #8 Pas = 4;
        join
        #8 Bax = 1;
        #2 Zoom = 52;
        #6 $stop;
    end
```

always 语句中包含顺序语句块 SEQ_A，并且顺序语句块内的所有语句顺序执行。后面的 fork-join 执行全部结束后再接回顺序块执行。这里面 SEQ_B 的地位相当于 fork-join 的一个语句。

![image-20260511144124170](https://img.nkns.cc/2026/05/a084ecb55691ca2afb51e5adccc99c5b.png)

### 过程性赋值

过程性赋值实在 intiial 语句或者 always 语句内的赋值。它只能对**寄存器类型**的变量赋值。表达式的右端可以是任何表达式。

```verilog
reg[1:4] Enable, A, B;
...
#5 Enable = ~A ^ ~B;
```

Enable 是寄存器。根据时延控制，赋值语句被延迟 5 个时间单位执行。右端表达式被计算，并且赋值给 Enable

过程性赋值与其周围的语句顺序执行。always 语句实例如下：

```verilog
always
    @(A or B or C or D)
    begin: AOI
        reg Temp1, Temp2;
        Temp1 = A & B;
        Temp2 = C & D;
        Temp1 = Temp1 | Temp2;
        Z = ~Temp1;
    end
// 上面的语句可以被一条语句代替：
// Z = ~((A & B) | (C & D));
// 但是这里是为了说明顺序特性，特意写成这样
```

always 语句内的顺序过程在信号 A / B / C / D 发生变化时开始执行。 Temp1 的赋值首先执行，然后执行第二个赋值。在以前赋值中计算的 Temp1 和 Temp2 的值在第三条赋值语句中使用。最后一个语句使用的是第三条语句里面的 Temp1 的值。

过程性赋值分两类：

1. 阻塞性过程赋值
2. 非阻塞性过程赋值

在讨论之前先聊聊语句内部时延。

#### 语句内部时延

在赋值语句中右端出现的时延是语句内部时延。通过内部时延表达式，右端的值在赋给左端目标值前延迟。

```verilog
Done = #5 'b1;
```

重要的是有段表达式在语句内部时延之前计算，然后进入时延等待，再对左端目标赋值。

```verilog
Done = #5 'b1;	// 语句内部时延控制

begin
    Temp = 'b1;
    #5 Done = Temp;	// 语句间时延控制
end
```

以上两段程序相同，相应的

```verilog
Q = @(posedge Clk) D;

begin
    Temp = D;
    @(posedge Clk)
    Q = Temp;
end
```

上面两条相同。

还有一种重复事件控制得语句内部时延表示形式。

```verilog
repeat(express) @ (event_expression)
```

这种控制形式用于根据一定数量的 1 个或多个事件来定义时延。

```verilog
Done = repeat(2) @(negedge ClkA) A_REG + B_REG
```

这一语句执行时先计算右端的值，即 A_Reg + B_reg 的值，然后等待时钟 ClkA 上面的两个负沿，再将右端值赋给 Done。这一重复事件控制实例的等价形式如下：

```verilog
begin
    Temp = A_REG + B_REG
    @(negedge ClkA);
    @(negedge ClkA);
    Done = Temp;
end
```

这种形式的时延控制方式在给某些边或一定数量的同步赋值过程中非常有用。

#### 阻塞性过程赋值

赋值操作符是 `=` 的过程赋值是阻塞性过程赋值。例如：

```verilog
RegA = 52;
```

是阻塞性过程赋值。

阻塞性过程赋值在其后素有语句执行前执行，即在下一语句执行前该赋值语句完成执行。

```verilog
always
    @(A or B or Cin)
    begin: CARRY_OUT
        reg T1,T2,T3;
        
        T1 = A & B;
        T2 = B & Cin;
        T3 = A & B;
        Cout = T1 | T2 | T3;
    end
```

T1 赋值首先发生，计算 T1，接着执行第二条语句，T2被赋值，之后是第三条...

```verilog
initial
    begin
        Clr = #5 0;
        Clr = #4 1;
        Clr = #10 0;
    end
```

第一条语句在 0 时刻执行，Clr 在 5 个时间单位后被赋值，接着是再 4 个时间单位后第二条语句，接着是再 10 个时间单位后第三条。

![image-20260511171452018](https://img.nkns.cc/2026/05/856ca6cab111a1c873430ba19df2d98e.png)

```verilog
begin
    Art = 0;
    Art = 1;
end
```

在这种情况下，Art被赋值位 1.这是因为第一个 Art 被赋值为 0，然后执行下一条语句促使 Art 在 0 时延后被赋值为 1。因此对 Art 的 0 赋值被丢弃。

#### 非阻塞性过程赋值

在费阻塞性过程赋值中，使用赋值符号 `<=` 例如：

```verilog
begin
    Load <= 32;
    RegA <= Load;
    RegB <= Store;
end
```

在非阻塞性过程赋值中，对目标的赋值是非阻塞的，但是可以预定在将来某个时间步发生。当非阻塞性过程赋值被执行时，计算右端表达式，右端值被赋于左端目标，并继续执行下一条语句。预定的最早输出将在当前时间步结束时，这种情况发生在赋值语句中没有时延时。即对左端目标赋值。

下面的例子更进一步解释这种赋值特征。

```verilog
initial
    begin
        Clr <= #5 1;
        Clr <= #4 0;
        Clr <= #10 0;
    end
```

第一条语句的执行使 Clr 在第 5 个时间单位被赋于值 1，第二条语句的执行使 Clr 在第 4 个时间单位被赋值为 0，最终，第 3 条语句的执行使 Clr 在第 10 个时间单位被赋值为 0。

![image-20260511180259664](https://img.nkns.cc/2026/05/753b41ecb7de0935f442cc3c42ada263.png)

```verilog
initial
    begin
        Cbn <= 0;
        Cbn <= 1;
    end
```

在 initial 语句执行后，因为同时对同一寄存器变量有多个赋值， Cbn 的值变得不确定，即 Cbn = x。Verilog HDL 标准中没有规定这种情况下应该怎么处理，那么根据特定的 Verilog 模拟器的事件调度算法，Cbn 将被赋值为 1 或 0。

下面是同时使用阻塞性和非阻塞性过程赋值的实例。注意他们的区别。

```verilog
reg[0:2] Q_State;
initial
    begin
        Q_State = 3'b011;
        Q_State <= 3'b100;
        $display("Current value of Q_State is %b", Q_State);
        #5;
        $display("The delayed value of Q_State is %b", Q_State);
    end
```

执行后有以下结果：

```verilog
Current value of Q_State is 011
The delayed value of Q_State is 100
```

第一条语句直接将 Q_State 赋值为 011，然后在第一个时间单位结束之后，非阻塞性赋值语句将 Q_State 赋值为 100。

#### 连续赋值与过程赋值的比较

连续赋值和过程赋值有什么不同之处：

![image-20260511181537683](https://img.nkns.cc/2026/05/fe4fc9b4afa2256bbddcd5c3e33a2ee7.png)

下面进一步解释这些差别：

```verilog
module Procedural;
    reg A, B, Z;
    
    always
        @(B) begin
            Z = A;
            A = B;
        end
endmodule

module Continuous;
    wire A, B, Z;
    
    assign Z = A;
    assign A = B;
endmodule
```

> 假定 B 在 10 ns 时有一个事件，在过程性赋值模块中，两条过程语句被依序执行。A 在 10 ns 时得到 B 的新值。Z 没有得到 B 的值，因为赋值给 Z 发生在赋值给 A 之前。在连续性赋值语句模块中，第二个连续赋值被触发，因为这里有一个关于 B 的事件。这引起了关于 A 的事件。A 引起了第一个连续赋值被执行，这相应引起 Z 得到了 A 的值。Z的新值为 A 而不是 B。然而，如果时间发生在 A 上，过程性模块中的 always 语句不执行，因为 A 不在那个 always 语句的实时控制事件清单中。然而连续赋值语句中的第一个连续赋值执行，并且 Z 得到 A 的新值。  

### if 语句

if 语句的语法如下：

```verilog
if (condition)
    pocedural_statement_1
{else if(condition2)
    procedural_statement_2}
{else
	procedural_statement_3}
```

如果对 condition_1 求值的结果为一个非零值，那么 procedural_statement_1 被执行，如果 condition_1 的值为 0、x 或 z，那么 procedural_statement_1 不执行。

如果存在一个 else 分支，那么这个分支就被执行。以下是一个例子。

```verilog
if(Sum < 60)
    begin
        Grade = C;
        Total_C = Total_C + 1;
    end
else if (Sum < 75)
    begin
        Grade = B;
        Total_B = Total_B + 1;
    end
else
    begin
        Grade = A;
        Total_A = Total_A + 1;
    end
```

注意条件表达式必须总是被括起来，如果使用 if-if-else 格式，那么可能会有二义性。

```verilog
if(Clk)
    if(Reset)
        Q = 9;
else
    Q = D;
```

问题是最后一个 else 到底属于哪一个 if？它是属于第一个 if 的条件 Clk 还是属于第二个 if 的条件 Reset ? 在 Verilog HDL 中，else永远与最近的没有 else 的 if 来解决。

```verilog 
if (Sum < 100)
    Sum = Sum + 10;
if (Nickel_In)
    Deposit = 5;
else if (Dime_In)
    Deposit = 10;
else if (Quarter_In)
    Deposit = 25;
else
    Deposit = ERROR;

if (Ctrl)
    begin
        if (~Ctrl2)
            Mux = 4'd2;
        else
            Mux = 4'd1;
    end
else
    begin
        if (~Ctrl2)
            Mux = 4'd8;
        else
            Mux = 4'd4;
    end
```

### case 语句

case 语句是一个多路条件分支形式，其语法如下：

```verilog
case (case_expr)
    case_item_expr{, case_item_expr}: procedural_statement
        ...
        ...
        [default: procedural_statement]
endcase
```

case 语句首先对条件表达式 case_expr 求值，然后一次对各个分支项切纸进行比较，第一个与条件表达式值相匹配的分支中的语句被执行。可以在 1 个分支中定义多个分支箱；这些值不需要互斥。缺省分支覆盖所有没有被分支白噢大师覆盖的其他分支。

分支表达式和各个分支表达式不必都是常量表达式。在 case 语句中，x 和 z 值作为文字值进行比较。case 语句如下所示：

```verilog
parameter
	MON = 0, TUE = 1, WED = 2, THU = 3, FRI = 4, SAT = 5, SUN = 6;
reg [0:2] Day;
integer Pocket_Money;

case (Day)
    TUE: Pocket_Money = 6;
    MON,
    WEB: Pocket_Money = 2;
    FRI,
    SAT,
    SUN: Pocket_Money = 7;
    default: Pocket_Money = 0;
endcase
```

如果 Day 的值位 MON 或者 WED，就选择分支 2。分支 3 覆盖了值 FRI / SAT / SUN，而分支 4 覆盖了余下的所有值，即 THU 和 位向量 111。case 语句的另一个实例如下：

```verilog
module ALU(A, B, OpCode, E);
    input [3:0] A, B;
    input [1:2] OpCode;
    output [7:0] Z;
    reg [7:0] Z;
    parameter
    ADD_INSTR = 2'b10,
    SUB_INSTR = 2'b11,
    MULT_INSTR = 2'b01,
    DIV_INSTR = 2'b00;
    always
        @(A or B or OpCode)
        case (OpCode)
            ADD_INSTR: Z = A + B;
            SUB_INSTR: Z = A - B;
            MULT_INSTR: Z = A * B;
            DIV_INSTR: Z = A / B;
        endcase
endmodule
```

如果 case 表达式和分支箱表达式的长度不同会发生什么呢？在这种情况下，在进行任何比较浅所有的 case 表达式都同一位这些表达式的最长长度。

```verilog
case (3'b101 << 2)
    3'b100: $display("First branch taken!");
    4'b0100: $display("Second branch taken!");
    5'b10100: $display("Third branch taken!");
    default: $display("Default branch taken!");
endcase
```

产生：

```
Third branch taken!
```

因为第三个分支项表达式为 5 位，所有的分支箱表达式和条件表达式长度统一为 5。当计算 `3'b101 << 2` 时，结果为 5'b10100，并选择第 3 个分支。

#### case 中的无关位

在上文中，x 和 z 只从字面上解释，即作为 x 和 z 值。case 还有其他两种形式： casex 和 casez。这些形式对 x 和 z 值使用不同的解释。除了关键字 casex 和 casez 以外，语法与 case 语句完全一致。

在 casez 语句中，出现在 case 表达式和任意分支项表达式中的值 z 被认为是无关值，即那个位被忽略。

在 casex 语句中，值 x 和 z 都被认为是无关位。casez 语句实例如下：

```verilog
case(Mask)
    4'b1???: Dbus[4] = 0;
    4'b01??: Dbus[3] = 0;
    4'b001?: Dbus[2] = 0;
    4'b0001: Dbus[1] = 0;
endcase
```

`?` 字符可以被用来代替字符 z，表示无关位。casez 语句表示如果 Mask 的第一位是 1，那么将 Dbus[4] 赋值为 0。如果 Mask 的第一位是 0，并且第 2 位是 1，那么 Dbus[3] 被赋值为 0，并以此类推。

### 循环语句

Verilog HDL 中有四类循环语句：

1. forever 循环
2. repeat 循环
3. while 循环
4. for 循环

#### forever 循环语句

这一形式的循环语句形式如下：

```verilog
forever
    procedural_statement
```

此循环语句连续执行过程语句。因此为了跳出这样的循环，中止语句可以与过程语句共同使用。同时，在过程语句中必须使用某种形式的时序控制，否则，forever 循环将在 0 时延后永远循环下去。

```verilog
initial
    begin
        Clock = 0;
        #5 forever
            Clock = ~Clock;
    end
```

这一实例产生时钟波形；时钟首先初始化为 0，并一直保持到第 5 个时间单位。此后每隔 10 个时间单位，Clock 反相一次。

#### repeat 循环语句

repeat 循环语句如下：

```verilog
repeat(loop_count)
    procedural_statement
```

这种循环语句执行指定次数的过程语句。如果循环计数表达式的值为 x 或 z，那么循环次数按 0 处理。

```verilog
repeat(Count)
    Sum = Sum + 10;

repeat(ShiftBy)
    P_Reg = P_Reg << 1;
```

repeat 循环语句与重复事件控制不同

```verilog
// Type I
repeat(Count)
    @(posedge Clk) Sum = Sum + 1;

// Type II
Sum = repeat(Count) @(posedge Clk) Sum + 1;
```

上面的 Type I 表示计数的次数，也就是说后面的 Sum 在语句结束后变成了 Sum + Count，但是 Type II 中，程序在第一时间保留了 Sum + 1 的快照保存起来，之后等待 Count 个时钟上升沿，将之前存快照的 Sum + 1 的值赋值给 Sum。

下面是一个小练习，你可以尝试解读这是什么意思：

```verilog
repeat(NUM_OF_TIMES) @(negedge ClockZ);
```

这表示在程序在这里等待了 NUM_OF_TIMES 个时钟负沿。

#### while 循环语句

while 循环语句的语法如下：

```verilog
while(condition)
    procedural_statement
```

这个循环语句执行过程赋值语句直到 condition 为假。如果开始的时候 condition 为假，那么里面的语句压根不会执行。这里说的 condition 为假的意思是 condition 为 **0 / x / z**。

也就是说，下面的语句中也会按照假处理：

```verilog
reg Acc;
wire BY;
while(BY > 0)
    begin
        Acc = Acc << 1;
        By = By - 1;
    end
```

#### for 循环语句

for 循环语句的形式如下：

```verilog 
for(initial_assignment; condition; step_assignment)
    procedural_statement
```

一个 for 循环语句按照指定的次数重复执行过程赋值语句若干次。初始赋值 initial_assignment 给出循环变量的初始值。condition 条件表达式指定循环在什么情况下必须结束。只要条件为真，循环中的语句就执行。step_assignment里面一般是 `i += 1` 之类的这种控制循环变量的语句。

```verilog
integer K;

for(K = 0; K < MAX_RANGE; K = K + 1)
    begin
        if (Abus[K] == 0)
            Abus[K] = 1;
        else if (Abus[K] == 1)
            Abus[K] = 0;
        else $display("Abus[K] is an x or a z");
    end
```

### 过程性连续赋值

是过程性赋值的一类，即它不能在 always 或 initial 语句中出现。这种赋值语句能够替换其他所有对线网或寄存器的赋值。它允许赋值中的表达式被连续驱动到寄存器或线网当中。

**这不是一个连续赋值。**

过程性连续赋值有两种类型：

1. 赋值和重新赋值过程语句：它们对寄存器进行赋值。
2. 强制和释放过程性赋值语句：虽然他们也可以对 `reg` 进行赋值，但是主要用于对线网赋值。

赋值和强制语句在如下意义上是“连续”的：当赋值或强制发生效用时，右端表达式中操作数的任何变化都会引起赋值语句重新执行。

**过程性连续赋值的目标不能是寄存器部分选择或位选择。**

#### 赋值—取消赋值

一个赋值过程语句包含所有对寄存器的过程性赋值，取消赋值过程语句中止对寄存器的连续赋值。寄存器中的值被保留到其被取消赋值为止。

```verilog
module DEF(D, Clr, Clk, Q);
    input D, Clr, Clk;
    output Q;
    reg Q;
    
    always
        @(Clr) begin
            if(!Clr)
                assign Q = 0;	// D 对 Q 无效
            else
                deassign Q;
        end
    always
        @(negedge Clk) Q = D;
endmodule
```

> 如果 Clr 为 0，assign 赋值语句使 Q 清 0，而不管时钟边沿的变化情形，即 Clk 和 D 对 Q 无效。如果 Clr 变为 1，取消赋值语句被执行；这就使得强制复制方式被取消，以后 Clk 能够对 Q 产生影响。

简单地说，就是过程性连续赋值语句生效之后不管怎么样值都不变了，直到对应的 deassign 生效。这段翻译得太烂了，我放到上面引用块了。

如果赋值应用于一个已经被赋值的寄存器，assign 赋值在进行新的过程性连续赋值前取消了原来的赋值。

```verilog
reg[3:0] Pest;
...
Pest = 0;
...
assign Pest = Hty ^ Mtu;
...
assign Pest = 2;	// 将对 Pest 重新赋值
...
deassign Pest;	// Pest 持续保持为 2
...
assign Pest[2] = 1;	// ERROR: 过程性连续赋值不能对寄存器进行位选择
```

赋值语句在如下意义上是连续的：在第一个赋值执行后，第二个赋值开始执行前，Hty 或 Mtu 上的任何1变化将促使第一个赋值语句被重新计算。

#### force 与 release

force 和 release 过程语句和 assign 和 deassign 非常相似，不同的是 force 和 release 过程语句不仅能够应用于寄存器，也能够应用于线网的赋值。

当 force 语句应用于寄存器时，寄存器的当前值被 force 语句的值覆盖。当 release 语句应用于寄存器时，寄存器中的当前值保持不变，除非过程性连续赋值已经生效。这种情况下，连续赋值为寄存器建立新值。

当用 force 过程对线网进行赋值时，该赋值方式为线网替换所有驱动源，直到在那个线网上执行 release 语句为止。

```verilog
wire Prt;
...
or #1 (Prt, Std, Dzx);
initial
    begin
        force Prt = Dzx & Std;
        #5;
        release Prt;
    end
```

执行 force 语句使 Prt 的值覆盖来源于或门原语的值，直到 release 语句被执行，然后或门原语的 Prt 驱动重新生效。尽管 force 赋值有效，Dzx 和 Std 上的任何变化都促使赋值重新执行。

```verilog
reg[2:0] Colt;
...
Colt = 2;
force Colt = 1;
...
release Colt;	// Colt 保持为 1
...
assign Colt = 5;
...
force Colt = 3;
...
release Colt;	// 上面的 assign 生效，Colt 变为 5
...
force Colt[1:0] = 3;
```

Colt 的第一次释放促使 Colt 的值被保持为 1。这是因为在 force 语句被应用时没有过程性连续赋值对寄存器赋值。在后面的 release 语句中，Colt 因为过程性连续赋值在 Colt 上重新生效而重新获得值 5。

### 握手协议实例

always 语句可用于描述交互进程的行为，如有限状态机的交互。这些模块内的语句用对所有 always 语句可见的寄存器来相互通信。在 always 语句间使用在一个 always 语句内声明的寄存器变量传递信息并不可取（可以使用层次路径名实现）。

考虑下面两个交互进程的实例：RX 接收器和 MP 微处理器，RX 进程读取串行的输入数据，并发送 Ready 信号表明数据可被读入 MP 进程。MP 进程在将数据分配给输出后，回送一个接受信号 Ack 到 RX 进程以读取新的输入数据。两个进程的语句块流程如下图所示：

![image-20260512145840194](https://img.nkns.cc/2026/05/8f31692f3f49a3b4c614ebbaf049a399.png)

这两个交互进程的行为可以用下述行为模型加以描述：

```verilog
`timescale 1ns / 100ps
module Interacting (Serial_In, Clk, Parallel_Out)
    input Serial_In, Clk;
    output reg [0:7] Parallel_Out;
    
    reg Ready, Ack;
    wire [0:7] Data;
    
    `include "Read_Word.v"	// Read_Word 任务在这里被定义
    always
        begin: RX
            /* 任务 Read_Word 
            在每个失踪周期读取串行数据，将其转换为并行数据并存于 Data 中
            Read_Word 完成上述任务需要 10 ns*/
            Read_Word(Serial_In, Clk, Data);
            Ready = 1;
            wait(Ack);
            Ready = 0;
            #40;
        end
    always
        begin: MP
            Parallel_Out = Data;
            Ack = 1;
            #25 Ack = 0;
            wait(Ready);
        end
endmodule
```

下面是这个程序的波形：

![image-20260512152259631](https://img.nkns.cc/2026/05/4d2410f8a0acf63b6000d2347807a0b4.png)

**上面这张图是完全错误的！请你自行推导吧。**

## Chapter IX 结构建模

### 模块

Verilog HDL 中，基本单元定义成模块形式

```verilog
module module_name(port_list);
    Declarations_and_Statements
endmodule
```

端口队列 port_list 列出了该模块通过哪些端口和外部模块通信。

### 端口

