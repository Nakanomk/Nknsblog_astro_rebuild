---
title: 'CSAPP Notes&labs'
publishDate: 2025-09-03 14:25:10
description: 'Notes and experiences while learning CSAPP'
tags:
  - Code
  - Learn
language: '中文'
heroImage: { src: '../../../public/covers/Wanlingce.jpg', color: '#edb9a2' }
---

# $\mathcal{Chap\ I} \ 绪论$

第一节课 没什么内容很重要

## 计算机的发展历程

## 计算机系统的基本组成和功能

### 四级存储结构（**由快到慢**)

CPU寄存器 $\rightarrow$ CPU缓存 $\rightarrow$ 内存 $\rightarrow$ 硬盘

### 数据存储

- 程序
- 数据
- 存储部件

### 硬件组成

（此处空缺图1.1）

### 简化的硬件组成

（此处空缺一张图）

## CPU结构

执行部件

指令预取部件

指令译码部件

分页部件

eg.有 11 kb 数据 但是只能存 10 kb 所以就分页 让最后 1 kb 存到第一个 kb 里面

分段部件

对每个代码进行分段，防止程序之间发生非法的数据访问

总线接口部件

寄存器组（此处缺照片）

EAX EBX ECX EDX ESI EDI ESP EDP EIP EFLAGS CS SS DS ES FS GS

条件标志

- OF：溢出标志
- SF：符号标志
- ZF：零标志
- CF：进位标志

控制标志

- DF：方向标志
- IF：中断允许标志
- TF：陷阱标志

### 软件

系统软件

## 软件开发和执行过程概述

### 编译过程

.c $\rightarrow$ 预处理程序.i $\rightarrow$  编译程序.s$\rightarrow$  汇编程序.o$\rightarrow$  链接程序

**源程序** 文本文件，用户编写。

**目标程序** 二进制文件，机器可识别，但不能执行

**可执行程序** 二进制文件 机器可执行

编译器

链接器

## 程序中每条指令的执行

机器指令的一般形式为 操作码 操作数

机器指令完成一个操作

每条指令的执行过程

- 从内存中读取该指令
- 对指令进行译码
- 若为内存操作数，从内存中取操作数
- 对操作数进行运算
- 保存运算结果。若为内存操作数，保存结果到内存中

~~~asm
STACK SEGMENT USE16 STACK
	DB 200 DUP(0)
STACK ENDS
DATA SEGMENT USE16
	SUM DW	;W = word, 2 bytes
CODE SEGMENT USE16
	ASSUME CS:CODE, SS:STACK
DS:DATA. ES:DATA

START:MOV AX,DATA
	MOV DS,AX
	MOV VS,50
	MOV AX,0
	MOV BX,1
NEXT:ADD AX, BX
	INC BX
	INC BX
	DEC CX
	JNE NEXT	;JNE: Jump if Not E, when CX != 0, jump to NEX
	MOVE SUM,AX
	MOV AH,4CH
	INT 21H
CODE ENDS
	END START
~~~
