1. 已知数据段的数据如习题 3.4 所示, 请分别编写实现以下预定功能的程序段:

(1) 用一条汇编语句将 STR1 中头两个字节的内容送入寄存器 DI 中;

(2) 写出求字存储单元 NUMW + 2 中数的绝对值, 并将其结果送回原单元的程序段;

(3) 请用两种方法写出计算(NUMW) * 16 + COUNT 并将结果送入 NUMW 和 NUMW +2 两字单元的程序段(不考虑运算溢出问题);

(4) 请用三种方式将 STR1 与 STR1 +1 两字节的内容交换位置｡ 

```
.section  .data
str1:  .byte 0, 1, 2, 3, 4, 5
str2:  .ascii “012345”
count  .equ 30
num   .fill  3, 1, 2
numw  .word  0x10, -0x60
poin  .word  0
```

(1) 

`movw str1, %di`

(2)

```
movw numw + 2, %ax
test %ax, %ax
jg positive
negw %ax
positive:
movw %ax, numw + 2
```

(3)

```
// Solution 1
movzxw numw, %eax
shll $4, %eax
addl $count, %eax
movl %eax, numw

// Solution 2
movzxw numw, %eax
imull $16, %eax, %eax
addl $count, %eax
movl %eax, numw

// Solution 3
movzxw numw, %eax
leal count(, %eax, 16), %eax
movl %eax, numw
```

(4)

```
// Solution 1
movb str1, %al
movb str1+1, %ah
movb %al, str1 + 1
movb %ah, str1

// Solution 2
movb str1, %al
xchgb %al, str1 + 1
movb %al, str1

// Solution 3
movw str1, %ax
xchgb %al, %ah
movw %ax, str1
```

2. 假定下面的程序段用来清除数据段中从偏移地址 0000H 到 2000H 号字存储单元中的内容(即将 0 送到这些存储单元中去)｡

```
mov  $0, %esi
next:
movw  $0, (%esi)
add  $2, %esi
cmp  __________,  %esi
jne  next
...
```

(1) 试将第四条比较指令语句填写完整｡

(2) 假定要清除偏移地址从 2000H 到 0000H 号字节存储单元中的内容(即由高地址到低地址清除),此程序段应怎样写?

(1)

`cmp $0x2002, %esi`

(2)

```
mov  $0x2000, %esi
next:
movb  $0, (%esi)
sub  $1, %esi
testl %esi, %esi
jns  next
...
```

3. 将下列程序段简化(其中 x、y 为字变量, L1、L2、L3、L4、L5 为标号):

```
mov  x, %ax
cmp  y, %ax
jc  L1
cmp  y, %ax
jo  L2
cmp  y, %ax
je  L3
cmp  y, %ax
jns  L4
L3:
add  y, %ax
jc  L5
```

Solution:

```
mov  x, %ax
cmp  y, %ax
jc  L1
jo  L2
jg  L4
L3:
add  y, %ax
jc  L5
```

