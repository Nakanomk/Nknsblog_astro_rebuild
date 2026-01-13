---
title: 'Chapter VI'
description: 'CSAPP NOTE CHAP VI'
publishDate: 2025-11-05 16:59:19
order: 12
---

# Chap 6 层次结构存储系统

## 存储器的层次结构

### 存储器的分类

#### 按存取方式

- **随机存取 (RAM):** 按地址访问，时间与地址无关。
- **顺序存取 (SAM):** 按顺序存放和读出，如磁带。
- **直接存取 (DAM):** 定位到区域后顺序存取，如磁盘。
- **相联存储 (CAM):** 按内容检索，如快表。

#### 按特性分类

- **按可更改性:** 读写存储器 (RAM) / 只读存储器 (ROM)。
- **按断电可保存性:** 非易失性 (ROM, 磁盘) / 易失性 (RAM, Cache)。
- **按功能:** 高速缓存 (Cache), 主存 (Main Memory), 辅存 (Disk)。

### 存储器的层次结构

#### 为什么需要层次结构？

- 单一存储元件很难同时满足大容量、高速度和低成本的要求。
- SRAM 速度快，但容量小且昂贵。
- 磁盘容量大、成本低，但速度远低于CPU。

#### 核心思想

- 将各种存储器按层次组织，CPU执行时，数据在相邻两层之间复制传送，使整个系统在速度、容量和价格上取得平衡。

![image-20251116043522961](https://img.nkns.cc/PicGo/image-20251116043522961.png)

### 局部性原理

- **时间局部性:** 被访问的某个存储单元在一个较短的时间间隔内很可能又被访问。（例如：循环中的变量）
- **空间局部性:** 被访问的某个存储单元的邻近单元在一个较短的时间间隔内很可能也被访问。（例如：顺序执行指令、访问数组元素）
- **出现原因:** 程序指令按顺序存放，循环和子程序被重复执行；数据（尤其是数组）也连续存放并被按序访问。

![image-20251116043537498](https://img.nkns.cc/PicGo/image-20251116043537498.png)

## 高速缓冲存储器

### Cache的工作原理

Cache是一种小容量高速SRAM，用于存放主存中被频繁访问的活跃程序块和数据块。

#### 访存过程

1. CPU访存时，先检查Cache中是否有要访问的信息。
2. **命中 (Hit):** 若有，则直接在Cache中读写，不访问主存。
3. **缺失 (Miss):** 若没有，则从主存中把该主存块复制到Cache中，再供给CPU。

这个过程由硬件自动完成，对程序员透明。

![image-20251116043558675](https://img.nkns.cc/PicGo/image-20251116043558675.png)

因此，为了提高程序的性能，程序员须编写出具有良好访问局部性的程序。

```c
#include <stdio.h>
#define M 256
#define N 256
int sumarrayrows(int a[M][N])
{
    int i, j, sum = 0;
    for (i = 0; i < M; i++)
    {
        for (j = 0; j < N; j++)
            sum += a[i][j];
    }
    return sum;
}	// fast
int sumarraycols(int a[M][N])
{
    int i, j, sum = 0;
    for (j = 0; j < N; j++)
    {
        for (i = 0; i < M; i++)
            sum += a[i][j];            
    }
    return sum;
}	// slow
int main()
{
    int a[M][N], sum;
    sum = sumarrayrows(a);
    sum = sumarraycols(a);
    return 0;
}
```

数组a按照行优先顺序存储

函数sumarrayrows的内循环按行优先顺序访问数组a，具有良好的空间局部性

函数sumarraycols的内循环，按列顺序访问数组a，空间局部性很差，执行效率低。
