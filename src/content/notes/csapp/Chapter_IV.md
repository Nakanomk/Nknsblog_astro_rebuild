---
title: 'Chapter IV'
description: 'CSAPP NOTE CHAP IV'
order: 10
---

# Chap 4 程序的链接

一个大的程序往往会分成多个源程序来编写，因而需要对各个不同源程序文件分别进行编译或汇编。

多个源程序会生成多个不同的目标代码文件。这些目标代码文件中包含指令、数据等信息。

此外，在程序中还会调用一些标准库函数，这些函数库也是一些目标代码文件。

因此，编译之后，需要将目标代码文件，包括用到的函数库目标文件，链接生成一个可执行文件。

## 编译、汇编和链接

### 编译和汇编

将源程序转化为执行程序的过程：

![image-20251116034737050](https://img.nkns.cc/PicGo/image-20251116034737050.png)

对应的命令：

```
gcc hello.c -o hello.i -E
gcc hello.i -o hello.s -S
gcc hello.s -o hell.o -c
gcc hello.o -o hello
```

## 链接

将多个可重定位的目标文件合成一个可执行文件。

![image-20251116034832125](https://img.nkns.cc/PicGo/image-20251116034832125.png)

**例子**

```c
main.c：
int add(int ,int);
int main()
{
return add(20, 13);
}
test.c：
int add(int i,int j) {
   int x=i+j;
   return x;
}
/*
gcc -c -o main.o main.c
gcc -c -o test.o test.c
ld -o test main.o test.o
*/
```

将不同类型的源程序，编译、链接为一个执行程序：

![image-20251116034951866](https://img.nkns.cc/PicGo/image-20251116034951866.png)

链接的任务：

1. 符号解析

   将符号的引用与一个确定的符号定义建立关联。

   符号：全局变量名、函数名、静态的局部变量名

   **非静态的局部变量名不是符号**。**参数名不是符号**。

   编译器将所有符号存放在目标文件的符号表(symbol table)中。

   符号表是一个结构数组，每个表项包含符号名、长度和位置信息等。

2. 重定位

   在合并生成执行文件时，重新确定每条指令的地址、每个数据的地址。

   在指令中更新所引用符号对应的地址。

   **例子** 观查前例中的main.o、test.o和test文件

   `objdump -d test.o`

![image-20251116035217817](https://img.nkns.cc/PicGo/image-20251116035217817.png)

`objdump -d test`

![image-20251116035306823](https://img.nkns.cc/PicGo/image-20251116035306823.png)

## 目标文件格式

目标代码（Object Code）：机器语言代码

目标文件（Object File）：包含目标代码的文件

广义的目标文件：

- 可重定位目标文件：编译或汇编输出的目标文件

- 可执行目标文件：链接输出的目标文件

**狭义**的目标文件：**仅指可重定位目标文件**。

可重定位目标文件和可执行目标文件，可以看作是目标文件的两种视图： 

- 链接视图（被链接）

- 执行视图（被执行）

![image-20251116035441132](https://img.nkns.cc/PicGo/image-20251116035441132.png)

可重定位目标文件主要由不同的节(section)组成。不同的节描述了目标文件中不同类型的信息及其特征。

- `text` 代码节

- `rodata` 只读数据节

- `data` 已初始化全局数据节

- `bss` 未初始化全局数据节

- `symtab` 节

​	符号表(symbol table)。符号包括函数名、全局变量名。符号表保存与这些符号相关的信息。每个可重定位目标文件都有一个.symtab节。

- `.rel.text` .text节相关的可重定位信息。
- `.rel.data` .data节相关的可重定位信息。

- `.debug` 节 调试用符号表。带-g选项的gcc命令会得到这张表。
- `line` 节 C源程序中的行号和.text节中机器指令之间的映射。带-g选项的gcc命令会得到这张表。

- `.strtab` 节

  字符串表，包括.symtab节和.debug节中的符号以及节头表中的节名字符串。

可执行目标文件由不同的段（segment）组成，描述节如何映射到存储段中。可多个节映射到同一段。如：可合并.data节和.bss节,并映射到一个可读可写数据段中。

**可执行文件和共享库文件必须具有程序头表，而可重定位目标文件无需程序头表。**

**可重定位目标文件必须具有节头表。**

## 符号表和符号解析

### 符号和符号表

每个可重定位目标文件都有一个符号表，它包含了在该模块中定义的符号。有三种符号：

- Global symbols：全局符号

  由该模块定义并能被其他模块引用的符号，包括函数和全局变量

- External symbols：外部符号

  由其他模块定义并被该模块引用的全局符号

  注：在由多个模块组成的一个程序中，每个外部符号，都应该有一个对应的全局符号。否在链接时，会报“外部符号未定义”的错误

- Local symbols：局部符号

  由该模块定义，且仅由该模块引用的符号。例如在模块中定义的带**static**的函数和全局变量，带static的局部变量。

  **注：程序中的局部变量不是局部符号**

```c
// 符号表（symtab）中每个条目的结构如下：
typedef  struct {
    int    name;    /*符号对应字符串在strtab节中的偏移量*
    int    value;    /*在对应节中的偏移量，可执行文件中是虚拟地址*/
    int    size;      /*符号对应目标所占字节数*/
   char  type: 4,  /*符号对应目标的类型：数据、函数、源文件、节*/
   	  binding: 4; /*符号类别：全局符号、局部符号、弱符号*/
   char  reserved;
   char  section;  /*符号对应目标所在的节，或其他情况*/
} Elf_Symbol;

// 例子
# main.c
int buf[2] = {1, 2};
extern void swap();
int main() 
{
  swap();
  return 0;
}
# swap.c
extern int buf[]; 
int *bufp0 = &buf[0];
static int *bufp1;
void swap()
{
  int temp;
  bufp1 = &buf[1];
  temp = *bufp0;
  *bufp0 = *bufp1;
  *bufp1 = temp;
}
/*
main.c 中的全局变量名buf为全局符号
main.c 中的函数名swap为外部符号
swap.c中的外部变量名buf为外部符号
swap.c中的函数名swap为全局符号
swap.c中的全局变量名bufp0为全局符号
swap.c 中的static变量名bufp1为局部符号
swap.c中，函数swap中的局部变量temp，不是局部符号。

*/
```

![image-20251116040133280](https://img.nkns.cc/PicGo/image-20251116040133280.png)

![image-20251116040145444](https://img.nkns.cc/PicGo/image-20251116040145444.png)

### 符号解析

将每个模块中引用的符号与某个目标模块中的定义符号建立关联。

首先定义三个集合：

- 集合 E：可重定位目标文件集合

- 集合 U：是未解析符号的集合

- 集合 D：定义符号的集合

```
初始化E、U、D为空；
for 命令行中的文件f {
  if f为目标文件 {
    f --> E；
    f中的未解析符号 --> U；
    f中的定义符号 --> D；
    if 添加了重复的定义符号
      报错退出；
  } else if f为库文件{
    for f中的模块m {
      for U中的未定义符号x {
              if x在m中定义 {
          将x从U转移到D中；
          if 添加了重复的定义符号
            报错退出；
        }
      }
    }
  }
}
合并E中的目标文件为可执行目标文件；
```

### 静态库的生成与使用

Linux 中，静态库文件采用存档档案(archive)的文件格式，文件后缀为.a。

```c
// myproc1.c
#include <stdio.h>
void myfunc1()
{
printf("%s","This is myfuncl from mylib!\n");
)

// myproc2.c
#include <stdio.h>
void myfunc2()
{
printf("%s","This is myfunc2 from mylib!\n");
)
/*
生成静态库的过程：
gcc  -c  myprocl.c  myproc2.c
ar  rcs  mylib.a  myproc1.o  myproc2.o

*/
```

程序main.c使用了mylib.a中的函数myfunc1

```c
void myfuncl(viod);
int main()
{
myfunc1();
return 0;
}
```

main.c的编译链接过程：

`gcc -c main.c`

`gcc -static -o myproc main.o ./my1ib.a`

注：命令中使用 -static 选项指示链接器应生成一个静态链接的可执行目标文件。

## 重定位

链接器完成符号解析后，进入重定位过程。此过程分两步：

- 重定位节和符号定义

- 重定位节中的符号引用

ELF中重定位条目格式如下：

```c
typedef struct {
 int offset;   /*节内偏移*/
  int symbol:24, /*所绑定符号*/
​    type: 8;     /*重定位类型*/
 } Elf32_Rel;
"offset"是需要修改的引用的节偏移
"symbol"标识引用应指向的符号
"type"指示链接器如何修改新引用
```

重定位类型主要有两种：

**lR_386_PC32**：重定位使用32位PC相关地址引用

**lR_386_32**：重定位使用32位绝对地址引用

**例子**

![image-20251116040545725](https://img.nkns.cc/PicGo/image-20251116040545725.png)

```c
/*重定位算法*/
for 每个输入节s {
  for s中的每个重定位表项r {
    s的起始地址 + r.offset --> refptr； // refptr为指向程序中的符号引用的指针
    if (r.type == R_386_PC32) {
      refaddr = s的起始地址 + r.offfset；// refaddr为符号引用的运行时地址
      *refptr = ADDR(r.symbol) + *refptr - refaddr;  // 修改符号引用的内容为相对地址
    }
    if (r.type == R_386_32)
      *refptr = ADDR(r.symbol) + *refptr;// 修改符号引用的内容为绝对地址
  }
}
```

## 可执行文件的加载

通过调用 execve 系统调用函数来调用加载器

加载器（loader）根据可执行文件的程序（段）头表中的信息，将可执行文件的代码和数据从磁盘“拷贝”到存储器中

加载后，将 PC（EIP）设定指向 Entry point (即符号_start处)，最终执行 main 函数，以启动程序执行。

![image-20251116040701720](https://img.nkns.cc/PicGo/image-20251116040701720.png)

可执行文件的存储器映像：

![image-20251116040714049](https://img.nkns.cc/PicGo/image-20251116040714049.png)
