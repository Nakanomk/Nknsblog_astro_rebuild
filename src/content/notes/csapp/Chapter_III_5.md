---
title: 'Chapter III-5'
description: 'CSAPP NOTE CHAP III-5'
order: 8
---

# Chap 3.5 复杂数据类型的分配和访问

## 地址和指针

### 汇编语言中的地址和指针

- 地址是对主存中的每个字节单元指定一个编号
- 一个数值作为地址使用时**通过寄存器进行间接寻址**，找到目标操作数。

### C 语言中的地址和指针

- 学过 C 语言都知道，没什么好说的。
- 指针变量，其内容作为间接寻址使用。需要将变量值送到寄存器中进行**间接寻址**。

## 数组的分配和访问

数组的分配是编译程序时进行的。

### 数组的定义和存储

数组的存储类型：

- 静态存储 `static`
- 外部存储 `extern`
- 自动存储 `auto`

> `auto` 型分配在**堆栈段**中，其他类型分配在静态数据区（**数据段**中）

例如：

![image-20251018210323150](https://img.nkns.cc/PicGo/image-20251018210323150.png)

### 数组的访问

**例子**

```c
#include <stdio.h>
int main()
{
    int     a[10];
    char    b[50] = "1234567";
    for (int i = 0; i < 10; i++)
        a[i] = i * 3;
    for (int j = 0; j < 15; j++)
        putchar(b[j]);    
    return 0;
}
```

汇编代码选摘：

```asm
# 初始化 a
	11e3:	c7 45 ca 00 00 00 00 	movl   $0x0,-0x36(%ebp)
    11ea:	c7 45 ce 00 00 00 00 	movl   $0x0,-0x32(%ebp)
    11f1:	c7 45 d2 00 00 00 00 	movl   $0x0,-0x2e(%ebp)
    11f8:	c7 45 d6 00 00 00 00 	movl   $0x0,-0x2a(%ebp)
    11ff:	c7 45 da 00 00 00 00 	movl   $0x0,-0x26(%ebp)
    1206:	c7 45 de 00 00 00 00 	movl   $0x0,-0x22(%ebp)
    120d:	c7 45 e2 00 00 00 00 	movl   $0x0,-0x1e(%ebp)
    1214:	c7 45 e6 00 00 00 00 	movl   $0x0,-0x1a(%ebp)
    121b:	c7 45 ea 00 00 00 00 	movl   $0x0,-0x16(%ebp)
    1222:	c7 45 ee 00 00 00 00 	movl   $0x0,-0x12(%ebp)
# 初始化 b （直接把字符串粗暴转化）
# a.c:5:     char    b[50] = "1234567";
	movabsq	$15540725856023089, %rax	#, tmp97
	movl	$0, %edx	#,
	movq	%rax, -64(%rbp)	# tmp97, b
	movq	%rdx, -56(%rbp)	#, b
	movq	$0, -48(%rbp)	#, b
	movq	$0, -40(%rbp)	#, b
	movq	$0, -32(%rbp)	#, b
	movq	$0, -24(%rbp)	#, b
	movw	$0, -16(%rbp)	#, b
# for 循环内，对 a 和 b 的间接寻址：
a:
	# 取出 i
    1238:	8b 55 90             	mov    -0x70(%ebp),%edx
    # 对 i 乘以 3
    123b:	89 d0                	mov    %edx,%eax
    123d:	01 c0                	add    %eax,%eax
    123f:	01 c2                	add    %eax,%edx
    # 取出 i
    1241:	8b 45 90             	mov    -0x70(%ebp),%eax
    # 间接寻址
    1244:	89 54 85 98          	mov    %edx,-0x68(%ebp,%eax,4)
b:
    # 取出字符串首地址
    125b:	8d 55 c2             	lea    -0x3e(%ebp),%edx
    # 取出索引值
    125e:	8b 45 94             	mov    -0x6c(%ebp),%eax
    # 计算偏移后地址
    1261:	01 d0                	add    %edx,%eax
    # 将 char 转化为 (unsigned)int
    1263:	0f b6 00             	movzbl (%eax),%eax
    # 冗余代码，因为 putchar 要求传入值为 int，最终又要变为(unsigned)int。编译器在上一步调整完之后没意识到这一点
    1266:	0f be c0             	movsbl %al,%eax
    # 冗余代码，编译器没优化时希望把偏移量凑满 8 位，所以对栈顶调整了数值。
    1269:	83 ec 0c             	sub    $0xc,%esp
    # eax 入栈
    126c:	50                   	push   %eax
```

一维数组数组元素的访问：

- 采用**变址寻址**
- 数组名作为**位移量**
- 数组下标放到**变址寄存器**中

### 数组和指针

在指针变量目标数据类型和数组类型相同的前提下，指针变量可以指向数组或数组中任意元素。

**例子**

```c
#include <stdio.h>
int main()
{
    int a[10];
    int *ptr1 = &a[0];
    int *ptr2 = &a[1];
    int *ptr0 = a; 
    return 0;
}
```

对应汇编片段：

```asm
    11bc:	8d 44 24 14          	lea    0x14(%esp),%eax	; 取出 a[0] 地址给 ptr1
    11c0:	89 44 24 08          	mov    %eax,0x8(%esp)
    11c4:	8d 44 24 14          	lea    0x14(%esp),%eax	; 取出 a[0] 地址
    11c8:	83 c0 04             	add    $0x4,%eax	; 变址成 a[1] 地址
    11cb:	89 44 24 0c          	mov    %eax,0xc(%esp)
    11cf:	8d 44 24 14          	lea    0x14(%esp),%eax	; 取出 a 地址
    11d3:	89 44 24 10          	mov    %eax,0x10(%esp)
```

对应汇编寻址取值方式：

![image-20251022122710171](https://img.nkns.cc/PicGo/image-20251022122710171.png)

### 指针数组和多维数组

**指针数组** 数组元素是指针变量的数组，称为指针数组。

**例子**

```c
#include<stdio.h>
int main() {
    char * sa[5] = {"hello", "abc", "123", "yes", "no"};
    for(int i = 0; i < 5; i++) {
        printf("%s\n", sa[i]);
    }
    return 0;
}
```

对应汇编代码：

```asm
// 这一段用来将五个字符串地址存入指针数组
	11d5:	8d 83 34 e0 ff ff    	lea    -0x1fcc(%ebx),%eax
    11db:	89 45 e0             	mov    %eax,-0x20(%ebp)
    11de:	8d 83 3a e0 ff ff    	lea    -0x1fc6(%ebx),%eax
    11e4:	89 45 e4             	mov    %eax,-0x1c(%ebp)
    11e7:	8d 83 3e e0 ff ff    	lea    -0x1fc2(%ebx),%eax
    11ed:	89 45 e8             	mov    %eax,-0x18(%ebp)
    11f0:	8d 83 42 e0 ff ff    	lea    -0x1fbe(%ebx),%eax
    11f6:	89 45 ec             	mov    %eax,-0x14(%ebp)
    11f9:	8d 83 46 e0 ff ff    	lea    -0x1fba(%ebx),%eax
    11ff:	89 45 f0             	mov    %eax,-0x10(%ebp)
// 接下来是 for 循环
    1202:	c7 45 dc 00 00 00 00 	movl   $0x0,-0x24(%ebp)	; 定义 i = 0
    1209:	eb 17                	jmp    1222 <main+0x75>	; 条件跳转
    120b:	8b 45 dc             	mov    -0x24(%ebp),%eax	; eax = i
    120e:	8b 44 85 e0          	mov    -0x20(%ebp,%eax,4),%eax
    1212:	83 ec 0c             	sub    $0xc,%esp	; esp -= 12, 用来入栈eax
    1215:	50                   	push   %eax
    1216:	e8 45 fe ff ff       	call   1060 <puts@plt>
    121b:	83 c4 10             	add    $0x10,%esp
    121e:	83 45 dc 01          	addl   $0x1,-0x24(%ebp)
    1222:	83 7d dc 04          	cmpl   $0x4,-0x24(%ebp)
    1226:	7e e3                	jle    120b <main+0x5e>
```

![image-20251022124336101](https://img.nkns.cc/PicGo/image-20251022124336101.png)

![image-20251022124400811](https://img.nkns.cc/PicGo/image-20251022124400811.png)

**多维数组**

**例子**

```c
#include <stdio.h>
int main()
{
    char a[3][5];
    char *p00 = &(a[0][0]);
    char *p01 = &(a[0][1]);
    char *p02 = &(a[0][2]);
    char *p10 = &(a[1][0]);
    char *p11 = &(a[1][1]);
    char *p20 = &(a[2][0]);
    char *p24 = &(a[2][4]);    
    return 0;
}
```

对应的汇编代码：

```asm
    11bc:	8d 44 24 1d          	lea    0x1d(%esp),%eax	; eax = a
    11c0:	89 04 24             	mov    %eax,(%esp)
    11c3:	8d 44 24 1d          	lea    0x1d(%esp),%eax
    11c7:	83 c0 01             	add    $0x1,%eax	; eax = &a[1]
    11ca:	89 44 24 04          	mov    %eax,0x4(%esp)
    11ce:	8d 44 24 1d          	lea    0x1d(%esp),%eax
    11d2:	83 c0 02             	add    $0x2,%eax	; eax = &a[2]
    11d5:	89 44 24 08          	mov    %eax,0x8(%esp)
    11d9:	8d 44 24 1d          	lea    0x1d(%esp),%eax
    11dd:	83 c0 05             	add    $0x5,%eax	; eax = &a[5]
    11e0:	89 44 24 0c          	mov    %eax,0xc(%esp)
    11e4:	8d 44 24 1d          	lea    0x1d(%esp),%eax
    11e8:	83 c0 06             	add    $0x6,%eax	; eax = &a[6]
    11eb:	89 44 24 10          	mov    %eax,0x10(%esp)
    11ef:	8d 44 24 1d          	lea    0x1d(%esp),%eax
    11f3:	83 c0 0a             	add    $0xa,%eax	; eax = &a[10]
    11f6:	89 44 24 14          	mov    %eax,0x14(%esp)
    11fa:	8d 44 24 1d          	lea    0x1d(%esp),%eax
    11fe:	83 c0 0e             	add    $0xe,%eax	; eax = &a[15]
    1201:	89 44 24 18          	mov    %eax,0x18(%esp)
```

实际上汇编就是把多维数组拆开来看的

## 结构体数据的分配和访问

### 结构体的定义和存储

> C语言的结构体将不同类型的数据依次存放在一段连续的存储区中。指向结构的指针，就是其第一个字节的地址。

结构体的存储类型主要包括：

- 静态存储 `static` 型
- 外部存储 `extern` 型
- 自动存储 `auto` 型

auto 型存储分配在堆栈段中，其他存储类型分配在静态数据区（数据段）中。

结构体成员首址，采用 **变址寻址** 确定，即
$$
address_{member} = address_{struct} + value_{shift}
$$

### 结构体数据作为子程序参数和返回值

结构体变量按值传递空间和时间开销太大，而且对应的实参无法被调用。因此结构体参数往往按地址传递。

**例子**

```c
#include <stdio.h> 
typedef struct 
{
    int     id;
    char    name[10];
} stu_info;
void reg_stu_v(stu_info s)
{
    s.id = 101;
}
void reg_stu_a(stu_info* s)
{
    s->id = 201;
}
int main()
{
    stu_info stu = {-1, "jack"};
    reg_stu_v(stu);
    printf("%d\n", stu.id);
    reg_stu_a(&stu);
    printf("%d\n", stu.id);
    return 0;
}
```

对应汇编代码片段：

```asm
000011ad <reg_stu_v>:
    11ad:	55                   	push   %ebp
    11ae:	89 e5                	mov    %esp,%ebp
    11b0:	e8 da 00 00 00       	call   128f <__x86.get_pc_thunk.ax>
    11b5:	05 1f 2e 00 00       	add    $0x2e1f,%eax
    11ba:	c7 45 08 65 00 00 00 	movl   $0x65,0x8(%ebp)	; 给栈内存里的临时变量赋值
    11c1:	90                   	nop
    11c2:	5d                   	pop    %ebp
    11c3:	c3                   	ret    

000011c4 <reg_stu_a>:
    11c4:	55                   	push   %ebp
    11c5:	89 e5                	mov    %esp,%ebp
    11c7:	e8 c3 00 00 00       	call   128f <__x86.get_pc_thunk.ax>
    11cc:	05 08 2e 00 00       	add    $0x2e08,%eax
    11d1:	8b 45 08             	mov    0x8(%ebp),%eax	; 和上一个函数最大的区别，这里调用了传入的指针
    11d4:	c7 00 c9 00 00 00    	movl   $0xc9,(%eax)	; 给传入指针对应的实际变量
    11da:	90                   	nop
    11db:	5d                   	pop    %ebp
    11dc:	c3                   	ret    
main:
	1205:	c7 45 e4 ff ff ff ff 	movl   $0xffffffff,-0x1c(%ebp)
    120c:	c7 45 e8 6a 61 63 6b 	movl   $0x6b63616a,-0x18(%ebp)
    1213:	c7 45 ec 00 00 00 00 	movl   $0x0,-0x14(%ebp)
    121a:	66 c7 45 f0 00 00    	movw   $0x0,-0x10(%ebp)
    1220:	ff 75 f0             	push   -0x10(%ebp)	; 将成员变量压栈
    1223:	ff 75 ec             	push   -0x14(%ebp)
    1226:	ff 75 e8             	push   -0x18(%ebp)
    1229:	ff 75 e4             	push   -0x1c(%ebp)
    122c:	e8 7c ff ff ff       	call   11ad <reg_stu_v>
    1231:	83 c4 10             	add    $0x10,%esp
    1234:	8b 45 e4             	mov    -0x1c(%ebp),%eax
    1237:	83 ec 08             	sub    $0x8,%esp
    123a:	50                   	push   %eax
    123b:	8d 83 34 e0 ff ff    	lea    -0x1fcc(%ebx),%eax	; 把结构体存入 eax
    1241:	50                   	push   %eax
    1242:	e8 09 fe ff ff       	call   1050 <printf@plt>
    1247:	83 c4 10             	add    $0x10,%esp
    124a:	83 ec 0c             	sub    $0xc,%esp
    124d:	8d 45 e4             	lea    -0x1c(%ebp),%eax
    1250:	50                   	push   %eax
    1251:	e8 6e ff ff ff       	call   11c4 <reg_stu_a>
    1256:	83 c4 10             	add    $0x10,%esp
    1259:	8b 45 e4             	mov    -0x1c(%ebp),%eax
    125c:	83 ec 08             	sub    $0x8,%esp
    125f:	50                   	push   %eax
    1260:	8d 83 34 e0 ff ff    	lea    -0x1fcc(%ebx),%eax
    1266:	50                   	push   %eax
    1267:	e8 e4 fd ff ff       	call   1050 <printf@plt>
    126c:	83 c4 10             	add    $0x10,%esp
```

结构体结构：

![image-20251022132353042](https://img.nkns.cc/PicGo/image-20251022132353042.png)

接下来讨论结构体数据作为返回值：

**例子**

```c
#include <stdio.h> 
typedef struct {
    int     id;
    char    name[10];
} stu_info;
stu_info get_stu() {
    stu_info stu = {75, "Peter"};
    return stu;
}
int main() {
    stu_info stu = get_stu();
    return 0;
}
```

对应的汇编代码：

```asm
# a.c:7:     stu_info stu = {75, "Peter"};
	movl	$75, -48(%rbp)	#, stu.id
	movabsq	$491328398672, %rax	#, tmp88
	movq	%rax, -44(%rbp)	# tmp88, stu.name
	movw	$0, -36(%rbp)	#, stu.name
# a.c:8:     return stu;
	movq	-48(%rbp), %rax	# stu, tmp83
	movq	-40(%rbp), %rdx	# stu,
	movq	%rax, -32(%rbp)	# tmp83, D.2355
	movq	%rdx, -24(%rbp)	#, D.2355
	movq	-32(%rbp), %rax	# D.2355, tmp84  这里 rax 和 rdx 是返回值，为了方便返回的时候赋值
	movq	-24(%rbp), %rdx	# D.2355,
# a.c:11:     stu_info stu = get_stu();
	movl	$0, %eax	#,
	call	get_stu	#
	movq	%rax, -32(%rbp)	# tmp84, stu
	movq	%rdx, -24(%rbp)	#, stu
```

**这里返回值为什么用两个寄存器？**

1. **返回值的标准：**
   - 对于“简单”的、不超过64位（8字节）的返回值（例如 `int`, `long`, `char*`），调用约定规定只使用 `%rax` 寄存器。
   - 但是，你的 `stu_info` 结构体**大于8字节**。
     - `int id;` // 4 字节
     - `char name[10];` // 10 字节
     - 总大小 = 14 字节。
   - 为了对齐，编译器可能会把它当作16字节来处理。
2. **针对小型结构体的优化规则：** x86-64 ABI 规定：
   - 如果一个结构体（或联合体）**总大小不超过16字节（128位）**，它可以**直接通过寄存器**返回。
   - 它会被拆分成两个8字节（64位）的“块”。
   - **第一个8字节的块放入 `%rax`。**
   - **第二个8字节的块放入 `%rdx`。**

## 联合体数据的分配和访问

C 语言中的联合体，各成员共享存储空间，按最大长度成员所需空间大小为目标。**成员具有相同的起始地址**

```c
#include <stdio.h> 
union uarea
{
    char    c_data;
    short   s_data;
    int     i_data;
    long    l_data;
};
int main()
{
    union uarea u;
    char* a1 = &(u.c_data);
    short* a2 = &(u.s_data);
    int* a3 = &(u.i_data);
    long* a4 = &(u.l_data);
    return 0;
}
```

对应汇编：

```asm
    11bc:	8d 44 24 08          	lea    0x8(%esp),%eax
    11c0:	89 44 24 0c          	mov    %eax,0xc(%esp)
    11c4:	8d 44 24 08          	lea    0x8(%esp),%eax
    11c8:	89 44 24 10          	mov    %eax,0x10(%esp)
    11cc:	8d 44 24 08          	lea    0x8(%esp),%eax
    11d0:	89 44 24 14          	mov    %eax,0x14(%esp)
    11d4:	8d 44 24 08          	lea    0x8(%esp),%eax
    11d8:	89 44 24 18          	mov    %eax,0x18(%esp)
```

可见无论把 union 如何解读，取的地址都是 `0x8(%esp)` 

联合体中的变量相互覆盖，起始地址相同。

## 数据的对齐

- 若 CPU 同时可以访问读写 64 位主存，则一次可以读写 8 个字节
- 一条指令中操作数的地址按 8 对齐，访问该操作数就只需要一次主存访问，效率会更高。

