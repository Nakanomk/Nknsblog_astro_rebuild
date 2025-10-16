---
title: 'Chapter III-4'
description: 'CSAPP NOTE CHAP III-4'
order: 3
---

# Chap 3.4 C语言的机器级表示

## 数值类型和运算的机器级表示

### C语言中的整数

- 有符号数：`int` `short` `long`
- 无符号数：`unsigned int` `unsigned short` `unsigned long`

- C 语言标准规定了各类型最小取值范围，int 型至少为 16 位，取值范围为 -32768 - 32767，虽然现代编译器都是 2147483647 这个标准
- 在一个数值的后面加一个 `u` 或者 `U` 来表示无符号数
- 运算中同时有无符号和有符号整数，按无符号整数计算

**例题 1** 假定以下关系表达式在 32 位用补码表示的机器上执行，结果是什么？

![image-20251015105810037](https://img.nkns.cc/PicGo/image-20251015105810037.png)

**例题 2** 回答以下三个问题：

1. 在有些32位系统上，C表达式-2147483648 < 2147483647的执行结果为false。Why？

   在 ISO C90 标准下 ，-2147483648 为 unsigned int 型，因此
    “-2147483648 < 2147483647” 按无符号数比较，10……0B 比 01……1B 大，结果为 false。

   在 ISO C99 标准下，2147483648 为 long long 型，因此 “-2147483648 < 2147483647” 按带符号整数比较，10……0B 比 01……1B 小，结果为 true。

2. 若定义变量 “int i=-2147483648;”，则 “i < 2147483647” 的执行结果为 true。Why？

   i < 2147483647 按 int 型数比较，结果为 true。

3. 如果将表达式写成“-2147483647-1 < 2147483647”，则结果会怎样呢？Why？

   -2147483647-1 < 2147483647 按 int 型比较，结果为 true。

**例题 3** 判断以下函数结果

```c
#include <stdio.h>
void main()
{
       short   x;
       unsigned short  y;
       x= -1;            // x=65535
       y= -1;            // y=65535
       printf("%d   %d\n", x,  y);
}

// Output -1 65535
```

查看相关的汇编代码可知：

```assembly
    11b9:	66 c7 45 f4 ff ff    	movw   $0xffff,-0xc(%ebp)	# x = -1
    11bf:	66 c7 45 f6 ff ff    	movw   $0xffff,-0xa(%ebp)	# y = -1
    11c5:	0f b7 4d f6          	movzwl -0xa(%ebp),%ecx	# printf 的 %d 解读 x
    11c9:	0f bf 55 f4          	movswl -0xc(%ebp),%edx	# printf 的 %d 解读 y
```

**例题 4** 判断以下函数结果

```c
#include <stdio.h>
int main() {
    short x;
    unsigned short y;
    x = -1;
    y = -1;
    if(x > 0) printf("%d positive\n", x);
    if(y > 0) printf("%d positive\n", y);
}
// Output 65535 positive
```

查看相关的汇编代码可知：

```assembly
    11ba:	66 c7 45 f4 ff ff    	movw   $0xffff,-0xc(%ebp)
    11c0:	66 c7 45 f6 ff ff    	movw   $0xffff,-0xa(%ebp)
    11c6:	66 83 7d f4 00       	cmpw   $0x0,-0xc(%ebp)
    11cb:	7e 17                	jle    11e4 <main+0x47>
    # ...
    11e4:	66 83 7d f6 00       	cmpw   $0x0,-0xa(%ebp)
    11e9:	74 17                	je     1202 <main+0x65>	# 无符号数只要不是 0 就大于 0
```

### C 语言中的运算

#### 整数算术运算

2. 无符号数加法溢出判断

![image-20251015140818835](https://img.nkns.cc/PicGo/image-20251015140818835.png)

​	发生溢出时，一定满足：**result < x && result < y**

3. 有符号数加法溢出判断

```c
int tadd_ok(int x, int y) {
    int sum = x+y;
    int neg_over = x < 0 && y < 0 && sum >= 0;
    int pos_over = x >= 0 && y >= 0 && sum < 0;
        return !neg_over && !pos_over;
} 
```

**例题** 以下程序判断相减有没有问题？

```c
int tsub_ok(int x, int y) {
       return tadd_ok(x, -y);
}
// y = 0x80000000 时出错
```

4. 整数的乘运算

   在 C 语言中，参加运算的数**类型必须一致**，如果不一致**会转换为一致再计算**。

**例题** 以下程序存在什么漏洞

```c
int copy_array(int *array, int count) 
{ 
  	int i;  
 	/* 在堆区申请一块内存 */
  	int *myarray = (int *) malloc(count*sizeof(int)); 
   	if (myarray == NULL) 
       	return -1;
  		for (i = 0; i < count; i++) 
       	myarray[i] = array[i]; 
   	return count; 
}
// count * sizeof(int) 可能会溢出，造成数组越界访问
```

5. 整数的除法运算

```c
// Code segemention I
int a = 0x80000000;
int b = a / -1; 
printf("%d\n", b);
// Result: -2147483648

// Code segemention II
int a = 0x80000000;
int b = -1;
int c = a / b; 
printf("%d\n", c);
// Result: "Floating point exception"
```

#### 浮点数的运算

1. 浮点数的除 0 运算

```c
#include <stdio.h>
int main()
{
    int a = 1;
    int b = 0;
    printf("Division by zero: %d\n", a/b);
    return 0;
}
// Result: 整数除 0 发生异常！
```

​	然而浮点数有表示无穷大的码点：

```c
#include <stdio.h>
int main()
{
    double a = 1.0;
    double b = -1.0;
    double c = 0.0;
    printf("Division by zero: %f  %f\n", a/c, b/c);
    return 0;
}
// Result: 无穷大
```

2. 浮点数的比较运算

​	以下列表判断是否**永真**

| 表达式                  | 结果 |
| ----------------------- | ---- |
| x == (int)(float) x     | 否   |
| x == (int)(double) x    | 是   |
| f == (float)(double) f  | 是   |
| d == (float) d          | 否   |
| f == -(-f);             | 是   |
| 2/3 == 2/3.0            | 否   |
| d < 0.0 ⇒((d\2)  < 0.0) | 是   |
| d > f ⇒-f  > -d         | 是   |
| d \ d >= 0.0            | 是   |
| x\x>=0                  | 否   |
| (d+f)-d == f            | 否   |

## 选择语句的机器级表示

### if-else 语句的机器级表示

**例子**

```c
#include <stdio.h>
int main()
{
    int flag;
    int x = 3;
    int y = -1;
    if (x > 0 || y > 0)
    	flag = 1;
    else 
    	flag = 0;
	printf("flag = %d \n", flag);
	return 0;
}
```

对应的汇编代码：

```assembly
# a.c:5:     int x = 3;
	movl	$3, -8(%rbp)	#, x
# a.c:6:     int y = -1;
	movl	$-1, -4(%rbp)	#, y
# a.c:7:     if (x > 0 || y > 0)
	cmpl	$0, -8(%rbp)	#, x
	jg	.L2	#,
# a.c:7:     if (x > 0 || y > 0)
	cmpl	$0, -4(%rbp)	#, y
	jle	.L3	#,
.L2:
# a.c:8:     	flag = 1;
	movl	$1, -12(%rbp)	#, flag
	jmp	.L4	#
.L3:
# a.c:10:     	flag = 0;
	movl	$0, -12(%rbp)	#, flag
.L4:
# a.c:11: 	printf("flag = %d \n", flag);
	movl	-12(%rbp), %eax	# flag, tmp84
	movl	%eax, %esi	# tmp84,
	leaq	.LC0(%rip), %rax	#, tmp85
	movq	%rax, %rdi	# tmp85,
	movl	$0, %eax	#,
	call	printf@PLT	#
```

### switch 的机器级表示

**例子 1**

```c
#include <stdio.h>
int main()
{
	int  x = 3;
	int  y = -1;
	int  z;
	int  i = 1;
	char c;
	c = getchar();
	switch (c) {
        case '+':
            case 'a':
                z = x + y;
                break;	
        case '-':
            case 's':
                z = x - y;
                break;
        default:
            z = 0;
	}
	printf(" %d %c %d = %d \n", x, c, y, z);
	return 0;
}
```

对应的汇编代码：

```assembly
# a.c:4: 	int  x = 3;
	movl	$3, -12(%rbp)	#, x
# a.c:5: 	int  y = -1;
	movl	$-1, -8(%rbp)	#, y
# a.c:7: 	int  i = 1;
	movl	$1, -4(%rbp)	#, i
# a.c:9: 	c = getchar();
	call	getchar@PLT	#
# a.c:9: 	c = getchar();
	movb	%al, -17(%rbp)	# _1, c
# a.c:10: 	switch (c) {
	movsbl	-17(%rbp), %eax	# c, _2
	cmpl	$115, %eax	#, _2
	je	.L2	#,
	cmpl	$115, %eax	#, _2
	jg	.L3	#,
	cmpl	$97, %eax	#, _2
	je	.L4	#,
	cmpl	$97, %eax	#, _2
	jg	.L3	#,
	cmpl	$43, %eax	#, _2
	je	.L4	#,
	cmpl	$45, %eax	#, _2
	je	.L2	#,
	jmp	.L3	#
.L4:
# a.c:13:                 z = x + y;
	movl	-12(%rbp), %edx	# x, tmp91
	movl	-8(%rbp), %eax	# y, tmp92
	addl	%edx, %eax	# tmp91, tmp90
	movl	%eax, -16(%rbp)	# tmp90, z
# a.c:14:                 break;	
	jmp	.L5	#
.L2:
# a.c:17:                 z = x - y;
	movl	-12(%rbp), %eax	# x, tmp96
	subl	-8(%rbp), %eax	# y, tmp95
	movl	%eax, -16(%rbp)	# tmp95, z
# a.c:18:                 break;
	jmp	.L5	#
.L3:
# a.c:20:             z = 0;
	movl	$0, -16(%rbp)	#, z
.L5:
# a.c:22: 	printf(" %d %c %d = %d \n", x, c, y, z);
	movsbl	-17(%rbp), %edx	# c, _3
	movl	-16(%rbp), %esi	# z, tmp97
	movl	-8(%rbp), %ecx	# y, tmp98
	movl	-12(%rbp), %eax	# x, tmp99
	movl	%esi, %r8d	# tmp97,
	movl	%eax, %esi	# tmp99,
	leaq	.LC0(%rip), %rax	#, tmp100
	movq	%rax, %rdi	# tmp100,
	movl	$0, %eax	#,
	call	printf@PLT	#
```

**例子 2**

```c
#include <stdio.h>
int main()
{
    int result = 0;
    int a = 12;
    int c = 0;
    int b = 10;
    switch (a)
    {
        case 15:
            c = b &0x0f;
    	case 10:
			result = c + 50;
			break;
        case 12:
        case 17:
            result = b + 50;
            break;
        case 14:
            result = b;
            break;
        default:
            result = a;        
    }
    printf("%d\n", result);
	return 0;
}
```

以下是对应的汇编代码：

```assembly
# a.c:4:     int result = 0;
	movl	$0, -16(%rbp)	#, result
# a.c:5:     int a = 12;
	movl	$12, -8(%rbp)	#, a
# a.c:6:     int c = 0;
	movl	$0, -12(%rbp)	#, c
# a.c:7:     int b = 10;
	movl	$10, -4(%rbp)	#, b
# a.c:8:     switch (a)
	movl	-8(%rbp), %eax	# a, tmp85
	subl	$10, %eax	#, tmp84
	cmpl	$7, %eax	#, tmp84
	ja	.L2	#,
	movl	%eax, %eax	# tmp84, tmp86
	leaq	0(,%rax,4), %rdx	#, tmp87
	leaq	.L4(%rip), %rax	#, tmp88
	movl	(%rdx,%rax), %eax	#, tmp89
	cltq
	leaq	.L4(%rip), %rdx	#, tmp92
	addq	%rdx, %rax	# tmp92, tmp91
	notrack jmp	*%rax	# tmp91
	.section	.rodata
	.align 4
	.align 4
.L4:
	.long	.L7-.L4
	.long	.L2-.L4
	.long	.L3-.L4
	.long	.L2-.L4
	.long	.L6-.L4
	.long	.L5-.L4
	.long	.L2-.L4
	.long	.L3-.L4
	.text
.L5:
# a.c:11:             c = b &0x0f;
	movl	-4(%rbp), %eax	# b, tmp96
	andl	$15, %eax	#, tmp95
	movl	%eax, -12(%rbp)	# tmp95, c
.L7:
# a.c:13: 			result = c + 50;
	movl	-12(%rbp), %eax	# c, tmp100
	addl	$50, %eax	#, tmp99
	movl	%eax, -16(%rbp)	# tmp99, result
# a.c:14: 			break;
	jmp	.L8	#
.L3:
# a.c:17:             result = b + 50;
	movl	-4(%rbp), %eax	# b, tmp104
	addl	$50, %eax	#, tmp103
	movl	%eax, -16(%rbp)	# tmp103, result
# a.c:18:             break;
	jmp	.L8	#
.L6:
# a.c:20:             result = b;
	movl	-4(%rbp), %eax	# b, tmp105
	movl	%eax, -16(%rbp)	# tmp105, result
# a.c:21:             break;
	jmp	.L8	#
.L2:
# a.c:23:             result = a;        
	movl	-8(%rbp), %eax	# a, tmp106
	movl	%eax, -16(%rbp)	# tmp106, result
.L8:
# a.c:25:     printf("%d\n", result);
	movl	-16(%rbp), %eax	# result, tmp107
	movl	%eax, %esi	# tmp107,
	leaq	.LC0(%rip), %rax	#, tmp108
	movq	%rax, %rdi	# tmp108,
	movl	$0, %eax	#,
	call	printf@PLT	#
```



### 条件表达式的机器级表示

**例子**

```c
#include <stdio.h>
int main()
{
	int a;
	int x;
	scanf("%d", &a);
	x = a > 0 ? a : a + 100;
	printf("x = %d \n", x);
	return 0;
}
```

对应的汇编代码：

```assembly
```



## 循环结构的机器级表示

### do-while 循环

```c
#include <stdio.h>
int main()
{
	int i = 1;
int result = 0;
	do
	{
		result += i;
		i++;
	} 
	while (i <= 10);
	printf("result = %d \n", result);
	return 0;
}
```

### while 循环

```c
#include <stdio.h>
int main()
{
	int i = 1;
	int n = 100;
	int result = 0;
	while (i <= n)
	{
		result += i;
		i++;
	}
	printf("result = %d \n", result);
	return 0;
}
```

### for 循环

```c
#include <stdio.h>
int main()
{
	int n = 100;
	int result = 0;
	for (int i = 1; i <= n; i++) 
		result += i;
	printf("result = %d \n", result);
	return 0;
}
```

```c
#include <stdio.h>
int main()
{
    char    buf1[20];
    char    buf2[20];
    int     i;
    scanf("%s", buf1);
    for (i = 0; i < 20; i++)
        buf2[i] = buf1[i];
	printf("%s\n", buf2);
	return 0;
}
```

事实上，汇编语言是比较好实现 `do-while` 结构的

![image-20251016204728366](https://img.nkns.cc/PicGo/image-20251016204728366.png)

而 `while` 其实是相对不那么好实现的

![image-20251016204801173](https://img.nkns.cc/PicGo/image-20251016204801173.png)

 `for` 循环的结构看起来就是在判断的前面、 `while` 的函数段后面加了两行（例如 `i++` ）

![image-20251016204819339](https://img.nkns.cc/PicGo/image-20251016204819339.png)



## 编译优化



## 循环结构与递归的比较

```c
#include <stdio.h>
int iter_sum(int n)
{
	int result;	
	if  (n <= 0)  
	    result = 0;   
	else
	    result = n + iter_sum(n - 1); 
	return  result;
}
int main()
{
    int sum = iter_sum(10);
    printf("%d\n", sum);
	return 0;
}
```

```c
#include <stdio.h>
int main()
{
    int n = 10;
    int i;
    int result = 0;
    for (i=1; i <= n; i++)  
	    result += i; 
    printf("%d\n", result);
    return 0;
}
```

