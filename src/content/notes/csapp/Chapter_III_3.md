---
title: 'Chapter III-3'
description: 'CSAPP NOTE CHAP III-3'
order: 5
---

# Chap 3.3 IA-32 常用指令类型及其操作

**AT&T** **格式汇编指令的简单形式和后缀形式**

(此处一张表)

## 传送指令

- 功能：将数据、地址、立即数送入寄存器或存贮器
- 这类指令有：MOV、XCHG、LEA 等

### 传送指令

- 格式：MOV OPS, OPD
- 功能：(OPS) -> OPD
- 注意：**不能是单元←→单元**，即**不能交换两个内存单元的地址**
- 指令的具体形式可以为：movb、movw、movl 等

```assembly
mov	%eax, %ebx	; Right
mov $1, %eax	; Right
mov $1, 0xaaaabbbb	; Right
mov 0xaaaabbbb, 0xccccdddd	; Wrong!
```

### 数据交换指令

- 格式：XCHG OPS, OPD
- 功能：(OPD) -> OPS, (OPS) -> OPD

```assembly
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

```assembly
mov	$0xe3, %bl
movsx	%bl, %ebx
# (EBX) = ?			0xFFFFFFE3
mov	$0xe3, %bl
movzx	%bl, %ebx
# (EBX) = ?			0x000000E3
```

```assembly
byte0:	.byte 0xa8
mov	byte0, %bl
movsx	%bl, %ecx	# ERROR
movsx	byte0, %bl	# ERROR
```

### 地址传送指令

- 格式：LEA OPS, OPD
- 功能：OPS 的偏移地址 -> OPD

```assembly
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

```assembly
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

```assembly
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

   被乘数隐含在 EAX/AX/AL 中。是字乘法还是字节乘法，由 OPS 决定。

   功能：

   - 字节乘法：(AL) * (OPS) -> AX
   - 字乘法：(AX) * (OPS) -> DX、AX
   - 双字乘法：(EAX) * (OPS) -> EDX、EAX

```assembly
mov	$0x50, %ax
mov $-0x10, %bx
imul %bx
# Result: DX = FFFFH, AX = FB00
```



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

```assembly
.type  func_name,  @function
func_name:
	# 子程序体
```

```assembly
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