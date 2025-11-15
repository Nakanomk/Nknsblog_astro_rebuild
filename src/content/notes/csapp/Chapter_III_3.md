---
title: 'Chapter III-3'
description: 'CSAPP NOTE CHAP III-3'
order: 5
---

# Chap 3.3 IA-32 常用指令类型及其操作

**AT&T** **格式汇编指令的简单形式和后缀形式**

| 简单形式                           | 后缀形式               | 说明                                                         |
| ---------------------------------- | ---------------------- | ------------------------------------------------------------ |
| mov(lea、add、inc、sub、dec等类似) | movb  movw  movl       | 有寄存器时，使用简单形式。无寄存器时，使用后缀形式。（若无寄存器时使用简单形式，会添加默认后缀l） |
| movsx                              | movsbw  movsbl  movswl | 使用后缀形式                                                 |
| movzx                              | movzbw  movzbl  movzwl | 使用后缀形式                                                 |

## 传送指令

- 功能：将数据、地址、立即数送入寄存器或存贮器
- 这类指令有：MOV、XCHG、LEA 等

### 传送指令

- 格式：MOV OPS, OPD
- 功能：(OPS) -> OPD
- 注意：**不能是单元←→单元**，即**不能交换两个内存单元的地址**
- 指令的具体形式可以为：movb、movw、movl 等

```asm
mov	%eax, %ebx	; Right
mov $1, %eax	; Right
mov $1, 0xaaaabbbb	; Right
mov 0xaaaabbbb, 0xccccdddd	; Wrong!
```

### 数据交换指令

- 格式：XCHG OPS, OPD
- 功能：(OPD) -> OPS, (OPS) -> OPD

```asm
xchg %eax, %ebx
# 若执行前：EAX = 0x5678， EBX = 0x1234
# 执行后：EAX = 0x1234，EBX = 0x5678H
```

- 注意：

  寄存器←→寄存器，寄存器←→存贮器。有一个必须为寄存器。

### 扩展传送指令

1. **符号拓展** 传送指令
   - 格式：MOVSX OPS, OPD
   - 功能：江源操作数的符号向前扩展成与目的操作数相同的数据类型后，再送入目的地址对应的单元中。
   - 说明：
     - 可以指明操作数类型，具体指令可以是 `movsbw` `movsbl` `movswl` 等
     - 其实一共就四种类型 `b` `w` `l` `q`，大小从小到大
     - **OPS 不能为立即数**
     - OPD 必须是寄存器
     - 源操作数的位数必须小于目的操作数的位数

2. **无符号拓展** 传送指令
   - 格式： MOVZX OPS, OPD
   - 功能： 将源操作数的高位补 0 ，扩成与目的操作数相同的数据类型后，再送入目的操作数对应的单元中。
   - 说明注意点同上

```asm
mov	$0xe3, %bl
movsx	%bl, %ebx
# (EBX) = ?			0xFFFFFFE3
mov	$0xe3, %bl
movzx	%bl, %ebx
# (EBX) = ?			0x000000E3
```

```asm
byte0:	.byte 0xa8
mov	byte0, %bl
movsx	%bl, %ecx	# ERROR
movsx	byte0, %bl	# ERROR
```

### 地址传送指令

- 格式：LEA OPS, OPD
- 功能：OPS 的偏移地址 -> OPD

```asm
leal	buf, %eax	# 1
movl	$buf, %eax	# 2
# 以上两者等价
```

- 注意：**OPD** 必须为寄存器

## 算术运算指令

- 算术指令：加、减、乘、除及符号扩展指令

- 共同特点：对`SF` `OF` `ZF` `CF` `AF` 有影响
- 运算原则：有符号数在机内均用补码表示，不单独处理符号

### 加法指令

- ADD OPS, OPD
  - 功能：(OPS) + (OPD) -> OPD

- INC OPD

  - 功能：(OPD) + 1 -> OPD

  - 注意：OPD 不能是立即数

```asm
ADD	%eax, %ebx	# (%ebx) = (%eax) + (%ebx)
INC	%ecx	# (%ecx)++
```

### 减法指令

- SUB OPS, OPD

  (OPD) - (OPS) -> OPD

- DEC OPD

  (OPD) - 1 -> OPD

- NEG OPD

  (OPD)_反 + 1 -> OPD	// 求补

- CMP OPD, OPS

  (OPD) - (OPS)	// **不回送结果，只影响标志**

- 注意：如果是进行加、减运算，对**有符号数**，当 **OF=0** 时，计算结果**正确** ；对无符号数，当 **CF=0** 时，结果**正确**。

```asm
# 例：求 (AX) 的绝对值。
	cmp	$0, %ax
	jge	exit	; AX >= 0 时，跳到 exit
	neg %ax
	...
	exit:
	...
```

### 乘法指令

1. 单操作数乘法指令
   - 有符号乘法：IMUL OPS;
   - 无符号乘法：MUL OPS；
   - 被乘数隐含在 EAX/AX/AL 中。是字乘法还是字节乘法，由 OPS 决定。

![image-20251113000916733](https://img.nkns.cc/PicGo/image-20251113000916733.png)

```asm
mov	$0x50, %ax
mov $-0x10, %bx
imul %bx
# Result: DX = FFFFH, AX = FB00
```
注意：
- 目的操作数必须是AX（字乘法是AX，字节是AL）。
- OPS不能是立即数。
- 对CF和OF有影响。
- 若MUL运算后，（AH）或（DX）为0，则CF、OF均为0；否则CF、OF均为1。
- 对IMUL来说，若乘积的高一半是底一半的符号扩展，则CF、OF=0；否则CF、OF=1。

2. 双操作数乘法指令

- 格式：IMUL OPS, OPD
- 功能：(OPS) * (OPD) -> OPD
- 注意：
  - 目的操作数必须是16/32位寄存器
  - 源操作数可以是立即数。
  - 目的操作数和源操作数必须类型一致

3. 三操作数乘法指令

- 格式：IMUL n, OPS, OPD
- 功能：(OPS) * n -> OPD
- 注意：
  - 目的操作数必须是16/32位寄存器
  - 源操作数不能是立即数。
  - 目的操作数和源操作数必须类型一致

### 符号扩展指令

用于在除法前，将单精度数扩展到双精度数。

- **(1) 字节转换成字**

  - 格式：CBW

  - 功能：将AL中的符号扩展到AH中。

  - 示例：

```asm
mov $-7, %al
cbw
# CBW执行前：(AL)= F9H
# 执行后：(AX)= FFF9H
```

- **(2) 字转为双字**

  - 格式：CWD
  - 功能：将AX的符号扩展到DX中。

- **(3) 字转为双字**

  - 格式：CWDE
  - 功能：将AX的符号扩展到EAX中。

- **(4) 32位转为64位**

  - 格式：CDQ
  - 功能：将EAX的符号扩展到EDX中。

### 除法指令

- 有符号除法：IDIV OPS
- 无符号除法：DIV OPS
- 功能：
  - 字节除法：(AX) / (OPS) → AL (商)、AH (余数)
  - 字除法：(DX、AX) / (OPS) → AX (商)、DX (余)
  - 双字除法：(EDX、EAX) / (OPS) → EAX (商)、EDX (余)
- 注意：
  - 如果是无符号除法，被除数符号的扩展不能用CBW、CWD。只能 `MOV DX, 0`。
  - OPS不能为立即数。
  - 除数为0时，产生溢出中断。
  - 有符号除法，余数与被除数符号相同。

```asm
# 示例1
mov  $-0x4001, %ax
cwd
mov  $4, %cx
idiv %cx
# 结果：(DX)= FFFFH(余数)，(AX)= F000H(商)。

# 示例2
mov  $-0x4001,  %ax
cwd
mov  $-0x4, %cx
idiv  %cx
# 结果：(DX)=FFFFH(余数)，(AX)=1000H(商)。
```

## 按位运算指令

### 1. 逻辑运算指令

包括：求反、逻辑乘、测试、逻辑加、按位加等。

- **(1) 求反**
  - 格式：NOT OPD;
  - 功能：将OPD的内容逐位取反→OPD。
  - 该指令不影响标志位。
  - 注意：与求补 (NEG OPD) 的区别。
- **(2) 逻辑乘**
  - 格式：AND OPD, OPS;
  - 功能：OPD ∧ OPS → OPD
  - 用途：屏蔽某些位 (e.g., `and $0xff, %dx` 屏蔽高8位) 或提取值 (e.g., `and 0x0f, %al` 将 '5' (35H) 变为 5)
- **(3) 测试指令**
  - a）格式：TEST OPD, OPS
    - 功能：(OPD) ∧ (OPS)，结果不回送，影响标志SF、ZF、PF。
    - 用途：检测与OPS中为1的位相对应的位是否为1。
    - 示例：`test $0x80, %al` 测试al最高位是否为0
  - b）格式：BT OPD, OPS
    - 功能：将OPD的指定位送到CF
- **(4) 逻辑加**
  - 格式：OR OPD, OPS
  - 功能：(OPD) ∨ (OPS) → OPD
- **(5) 按位加 (异或)**
  - 格式：XOR OPD, OPS
  - 功能：(OPD) ⨁ (OPS) → OPD
  - 示例：`xor %ax, %ax` 等价于 `MOV AX, 0`

### 2. 移位指令

包括：算术、逻辑、循环移位。 格式：`操作符 n, OPD` 或 `操作符 %cl, OPD`

- **a) 算术左移或逻辑左移**

  - SAL n, OPD, 或 SHL n, OPD
  - 功能：(OPD)向左移指定的次数，低位补0。
  - 每左移一次，相当于*2。


![image-20251116012552837](https://img.nkns.cc/PicGo/image-20251116012552837.png)

- **b) 算术右移**

  - SAR n, OPD
  - 功能：(OPD)向右移指定位数，最高位(符号位)不变。
  - 实现有符号数除2^n运算。


![image-20251116012620243](https://img.nkns.cc/PicGo/image-20251116012620243.png)

- **c) 逻辑右移**
  - SHR OPD, n

  - 功能：(OPD)向右移指定位数，最高位补0。

  - 实现无符号数除2^n运算。


> 注意：算术移位适合于有符号数；逻辑移位适合于无符号数。

![image-20251116012648519](https://img.nkns.cc/PicGo/image-20251116012648519.png)

- **(2) 循环移位指令**
  - a）循环左移 (ROL n, OPD): 最高位与最低位连成环。

![image-20251116012711908](https://img.nkns.cc/PicGo/image-20251116012711908.png)

- b）循环右移 (ROR OPD, n): 最低位与最高位连成环。

![image-20251116012726377](https://img.nkns.cc/PicGo/image-20251116012726377.png)

- c）带进位循环左移 (RCL OPD, n): (OPD)连同CF一起向左循环。

![image-20251116012735928](https://img.nkns.cc/PicGo/image-20251116012735928.png)

- d）带进位循环右移 (RCR n, OPD): (OPD)连同CF一起向右循环。

![image-20251116012743394](https://img.nkns.cc/PicGo/image-20251116012743394.png)

**移位指令小结：**

![image-20251116012801483](https://img.nkns.cc/PicGo/image-20251116012801483.png)

## 控制转移指令

特点：改变程序的执行顺序，即改变了指令指示器IP的内容。 分为条件转移和无条件转移。

![image-20251116012812584](https://img.nkns.cc/PicGo/image-20251116012812584.png)

### 1. 标志寄存器

保存指令执行后CPU的状态信息及运算结果特征。 32位标志寄存器称为EFLAGS。

- **(1) 符号标志SF (Sign Flag)**
  - 运算结果的最高二进制位为1，则SF=1 (负)，否则SF=0 (正)。
- **(2) 进位标志 CF (Carry Flag)**
  - 运算时从最高位向前产生了进位（或借位），则CF=1；否则 CF=0。
- **(3) 零标志 ZF (Zero Flag)**
  - 运算结果为0，则 ZF＝1，否则 ZF＝0。
- **(4) 溢出标志 OF (Overflow Flag)**
  - 运算结果超出了有符号数的范围，则 OF=1。
  - 硬件判断：当出现“正+正=负、负+负=正、正-负=负、负-正=正”，产生溢出。

### 2. 条件转移

功能：由上一条指令所设的条件码来判别测试条件，满足条件则转移。

- **(1) 简单条件转移** (根据单个标志位)
  - a) CF标志：JC (CF=1) / JNC (CF=0)
  - b) ZF标志：JZ (ZF=1) / JNZ (ZF=0)
  - c) SF标志：JS (SF=1) / JNS (SF=0)
  - d) OF标志：JO (OF=1) / JNO (OF=0)
  - e) PF标志：JP (偶) / JNP (奇)
- **(2) 无符号数的条件转移** (跟在CMP后，比较无符号数)
  - a) JA / JNBE (高于 / 不低于或等于) (测试条件：CF∨ZF=0)
  - b) JAE / JNB (高于等于 / 不低于) (测试条件：CF=0)
  - c) JB / JNAE (低于 / 不高于且不等于) (测试条件：CF=1)
  - d) JBE / JNA (低于等于 / 不高于) (测试条件：CF∨ZF=1)
- **(3) 有符号数条件转移** (跟在CMP后，比较有符号数)
  - a) JG / JNLE (大于 / 不小于且不等于) (测试条件：(SF⊕OF)∨ZF=0)
  - b) JGE / JNL (大于等于 / 不小于) (测试条件：SF⊕OF=0)
  - c) JL / JNGE (小于 / 不大于且不等于) (测试条件：SF⊕OF=1)
  - d) JLE / JNG (小于等于 / 不大于) (测试条件：(SF⊕OF)∨ZF=1)

> 注意：CMP比较指令本身无法分别有、无符号数，它比较的是否有符号，由后面的转移指令确定。

### 3. 无条件转移指令

- 格式：JMP OPD

- 功能：无条件地转移到目的地址执行。

- **a) 直接转移**

  - OPD为标号或地址值。
  - `jmp label_1`

- **b) 间接转移**

  - OPD为寄存器操作数或内存操作数。JMP以OPD的内容作为转移目的地址。

  - `jmp *%eax` (OPD为寄存器操作数)

  - `jmp *var_1` (OPD是内存操作数)

  - `jmp *(%eax)` (OPD是内存操作数, (%eax)的内容是地址)

  - 间接跳转可用于实现跳转表：

    ```asm
    functab:  .long  lp1, lp2, lp3, …
    ...
    jmp  functab(, %ebx, 4) ; EBX=0,跳lp1; EBX=1,跳lp2
    ```

### 4. 转移传送指令

- 带条件的数据传送指令
- 格式：cmov*** OPS，OPD
- 功能：在条件成立时，传送数据。
- 注意：OPS为寄存器或内存操作数，OPD为寄存器操作数。

## 五、分支

特点：计算机根据不同情况自动作出判断，有选择地执行相应处理程序。 对应C语言的 `if-else` 和 `switch`。

- 程序分支一般用条件转移指令产生
- 分支程序设计应注意：
  1. 选择合适的转移指令 (如JL和JB的区别)
  2. 为每个分支安排出口 (避免分支执行后“掉入”另一个分支)
  3. 按流程图编程

## 六、循环

### 1. 循环程序的结构

由三个部分组成：

1. **设置循环的初始状态** (如设置循环次数计数值)
2. **循环体** (工作部分和修改部分)
3. **循环控制部分** (判断是否继续循环)

### 2. 循环控制方法

- **(1) 计数控制** (循环次数已知)

  - a) 正计数法：计数值从0加到n。

    ```asm
    mov	$0, %ecx
    label_1:
    ...			; 循环体
    inc	%ecx
    cmp	n,  %ecx
    jne	label_1
    ```

  - b) 倒计数法：计数值从n减到0。

    ```asm
    mov	n, %ecx
    label_1:
    ...			; 循环体
    dec	%ecx
    jnz	label_1
    ```

    > 注：`dec %ecx; jnz label_1` 可以用 `loop label1` 代替。

- **(2) 条件控制**

  - 特点：循环次数事先不知道。

  - 示例：求AX中1的个数，直到AX为0。

    ```asm
    mov	$0, %cl	; CL中存放1的个数
    label_1:
    and	%ax, %ax	; 产生条件
    jz	exit
    sal	$1, %ax	; 算术左移，b15 -> CF
    jnc	label_1
    inc	%cl	; 若CF = 1, CL + 1 -> CL
    jmp	label_1
    exit:
    ```

### 3. 循环转移指令

- **a) LOOP 标号**
  - 功能：(ECX) −1 → ECX，若(ECX)不为0，则转标号处执行。
  - 基本等价于 `DEC ECX` + `JNZ 标号`
  - 注意：LOOP指令对标志位无影响!
- **b) LOOPE / LOOPZ 标号**
  - 功能：(ECX) −1 → ECX，若(ECX)≠0 且 ZF=1，则转标号处执行。
- **c) LOOPNE / LOOPNZ 标号**
  - 功能：(ECX) −1 → ECX，若(ECX)≠0 且 ZF=0，则转标号处执行。
- **d) JCXZ 标号 / JECXZ 标号**
  - 功能：若(ECX)为0，则转标号处执行。(用于实现“先判断，后执行”的循环)

### 4. 循环程序设计

(1) 单重循环程序设计 (2) 最大循环次数未知 设计步骤：构思算法 -> 伪代码 -> 分配寄存器 -> 编写汇编。

## 堆栈

### 基本概念

- 定义：**主存中的一片数据存贮区**

- 用途：将主程序堆栈保护或处理终端
- 概念：
  - 压栈
  - 出栈
  - 栈底：堆栈的固定端 **不放数据**
  - 栈顶：最后放入的单元
  - LIFO表：详见数据结构

- 注意：
  - **一端固定，一端活动**
  - 存取“先进后出”
  - 操作单元大于字单元
  - **ESP栈顶指针**
  - **ESP由高地址向低地址移动**

> 不要忘了栈底就一个字，不是双字

### 堆栈指令

1. 进栈指令 PUSH OPS
   - 功能：将OPS的字数据压入堆栈。
   - 进栈活动：
     - SP - 2 -> SP
     - OPS -> (%SP)
2. **出栈指令 POP OPD**
   - 格式：POP OPD (OPD：寄存器、段寄存器(除CS)、存储器)
   - 功能：将栈顶元素弹出到OPD。
   - 出栈活动：
     - (%SP) → OPD
     - SP + 2 → SP (或+4, +8)
3. **8个寄存器进出栈指令**
   - PUSHA / POPA (16位寄存器)
   - PUSHAD / POPAD (32位寄存器)

## 子程序

### 基本概念

- 概念：功能相对独立的程序段

- 分类
  - 用户自定义子程序
  - 系统子程序（如标准库）

### 子程序与主程序的关系

- 调用与返回：主程序调用子程序，子程序执行结束后，又返回到主程序调用处的下一条指令。

- 调用的本质是什么——转移到**子程序的第一行**指令处，开始执行子程序的指令
- 返回的本质是什么——**转移**到主程序中，调用指令的下一行指令处，开始执行主程序的指令

- 转移的本质是什么——修改 **EIP**

- 如何实现 **调用-返回** ——借助**堆栈**主程序的指令地址

### 子程序的定义

```asm
.type  func_name,  @function
func_name:
	# 子程序体
```

```asm
# 例：定义一个名为sort的子程序
# call.s
.type  sort,  @function
sort:
...
	ret
```

### 子程序的调用和返回

- 调用指令 `CALL`

格式： CALL OPD

功能： 返回

### 现场保护和现场恢复

- 调用子程序时，有可能破坏主程序中寄存器原来的内容，因此，必须保护、恢复现场。
- 通过在子程序开头 `PUSH` 寄存器，在 `RET` 前 `POP` 寄存器来实现。
- 注意：
  1. `POP` 的顺序必须与 `PUSH` 的顺序相反。
  2. 可以使用 `PUSHAD` 和 `POPAD` 保护/恢复所有寄存器。
  3. 若使用寄存器EAX存放子程序的返回值，则不能对其进行保护和恢复。

### 参数传递

主程序为子程序提供入口参数，子程序返回结果给主程序。

- **a) 寄存器法**
  - 利用寄存器传送，适合参数少的情况。
- **b) 约定单元法**
  - 参数在事先约定的存贮单元（全局变量）中。
- **c) 堆栈法**
  - 利用堆栈传递参数。
  - 参数个数不受限制，适用于子程序嵌套调用。
  - C语言等高级语言主要采用此法。
  - 主程序 `PUSH` 参数，然后 `CALL`。子程序通过 `(%ebp)` 访问参数。

### 子程序举例

(示例：十进制输入转十六进制输出)

```asm
.section    .data
    in_buf: .byte 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    out_buf:    .byte 0, 0, 0, 0, 0, 0, 0, 0, '\n'
    lf:     .byte '\n'    
.section    .text
.global     _start
_start:
    call    decibin
    call    binihex
    mov     $1, %eax
    mov     $0, %ebx
    int     $0x80
.type       decibin, @function
decibin:
    mov     $3, %eax
    mov     $0, %ebx
    mov     $in_buf, %ecx
    mov     $10, %edx
    int     $0x80
    mov     %eax, %ecx
    mov     $0, %eax
    mov     $0, %esi
    dec     %ecx
next_1:
    movzxb  in_buf(%esi), %ebx
    sub     $'0', %ebx
    cmp     $9, %ebx
    jg      err_1
    cmp     $0, %ebx
    jl      err_1
    mov     $10, %edx
    mul     %edx
    add     %ebx, %eax
    inc     %esi..
    dec     %ecx
    jnz     next_1
    jmp     exit_1  
err_1:
    mov     $0, %eax    
exit_1:
    ret
.type       binihex, @function
binihex:
    mov     $8, %ecx
    mov     $0, %edi
next_2:
    rol     $4, %eax
    mov     %al, %dl
    and     $0xf, %dl
    add     $'0', %dl
    cmp     $0x3a, %dl
    jl      label_2
    add     $7, %dl
label_2:
    mov     %dl, out_buf(%edi)
    inc     %edi
    dec     %ecx
    jnz     next_2
    mov     $4, %eax
    mov     $1, %ebx
    mov     $out_buf, %ecx
    mov     $9, %edx
    int     $0x80   
    ret
```

