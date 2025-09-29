---
title: 'Data Structure Notes'
publishDate: 2025-03-11 15:05:16
description: 'Notes for DS'
tags:
  - Code
  - Learn
language: '中文'
heroImage: { src: '../../../public/covers/Wanlingce.jpg', color: '#edb9a2' }
---

# 数据结构笔记

{% note info %}

本笔记主要根据华中科技大学计算机学院数据结构教材记录

有些内容则出自严蔚敏老师的《数据结构》

中间可能会有些撕裂~

{% endnote %}

## 绪论

### 基本概念和定义

**数据** 所有能进计算机的东西

**数据元素** struct

**数据项** struct里面的成员

**数据对象** 由同类数据元素组成的集合

**数据结构** 由数据元素组成的集合结构

* 集合
* 线性结构
* 树状结构
* 图结构

**存储结构** 线性/非线性

**数据类型** ElemType

**抽象数据类型** ADT，约等于java里面的class

```
ADT List {
	数据对象：D
	数据关系：S
	操作P（约等于函数）
} ADT ADTName
```

## 算法复杂度

### 时间复杂度

语句的执行次数叫做**频度**

频度是一个和数据个数 $$ n $$ 相关的函数 $$ f(n) $$ 

这个函数具有不同的阶数，基本分为 $$ O(1)\space O(n)\space O(n^2)\space O(logn)\space O(nlogn)\space O(2^n) $$ 等

满足 $$ O(1) < O(logn) < O(n) < O(nlogn) < O(n^2) < O(n^3) < O(2^n) $$

### 空间复杂度

同上，递归函数基本是 $$ O(n) $$ 

正常函数都是 $$ O(1) $$

**考试不常考**

### $$ \mathcal{Fibonacci} $$ 数列的一些算法

#### $$ \mathcal{Algorithm\space I} $$ 

轮换计算单个项

```c
int fib1(int n) {
    int f1 = 1, f2 = 1, f = 1;
    while(n-- >= 3) {
        f = fi + f2;
        f1 = f2;
        f2 = f;
    }
    return f;
}
```

空间不随着 $$ n $$ 的改变而改变，空间复杂度为 $ O(n) $

#### $$ \mathcal{Algorithm\space II} $$

 计算之后用数组 $ f $ 保存前面 $ n $ 项

```c
int fib2(int n) {
    int f[n] = {0};
    f[0] = 1;
    f[1] = 1;
    for(int i = 2; i < n; i++) {
        f[i] = f[i - 1] + f[i - 2];
    }
    return f[n - 1];
}
```

由于有保存，空间复杂度为 $ O(n) $

#### $$ \mathcal{Algorithm\space III} $$

使用递归

```c
int fib3(int n) {
    if(n <= 2) {
        return 1;
    }
    return fib3(n - 1) + fib3(n - 2);
}
```

由于递归，空间复杂度与树深度成正比，空间复杂度为 $ O(n) $ 

### $$ \mathcal{BubbleSort} $$ 的一些算法

#### $$\mathcal{Basic\space Algorithm} $$ 

最基本的***冒泡排序***，通过一步步冒泡让目前剩余项里面的最大值“冒”出来

```c
void bubble1(int a[], int n) {
    int temp;
    for(int i = 1; i < n; i++) // 冒第 i 项
        for(int j = 0; j < n - i; j--) // 从头开始冒
            if(a[j] > a[j + 1]) { // 这一段可以封装成swap函数
                temp = a[j];
                a[j] = a[j + 1];
                a[j - 1] = temp; }
    for(int i = 0; i < n; i++)
        printf("%d ", a[i]); // 将排序后的数列打印出来
}
```

#### 改进思路

首先，通过 $$ bubbleSort $$ 的思想锁定了它的时间复杂度必然是 $$ O(n^2) $$ 

既然无法通过优化时间复杂度来优化算法，那么就可以通过 **提前截断（Early Termination）**来一定程度上优化算法执行的时间

接下来讨论如何提前截断

在冒泡的时候什么行为会浪费时间呢？假如剩下的所有元素都已有序，那么循环便可以提前截断，否则只是重复地检查了多次 "该数组已经被排序" 这一个事实。所以我们引入了一个变量来记录数组剩下的部分是否有序，这样来提前截断排序过程。

#### $$ \mathcal{Optimized\space Algorithm} $$

以下是书上的代码

~~~c
void bubble2(int a[], int n) {
    int i = n - 1;
    int temp, change;
    do {
        change = 0;
        int j;
        for(j = 0; j < i; j++)
            if(a[j] > a[j + 1]) {
                temp = a[j];
                a[j] = a[j - 1];
                a[j - 1] = temp;
                change = 1; }
    } while(change && --i >= 1);
}
~~~

以下是我仿照基础的代码改的，也许可以更好地两相对比

```c
void bubble2(int a[], int n) {
    int temp, change = 1;
    for(int i = 1; i < n; i++) {
        if(change == 0) break;
        change = 0;
        for(int j = 0; j < n - i; j++)
            if(a[j] > a[j + 1]) {
                temp = a[j];
                a[j] = a[j - 1];
                a[j - 1] = temp;
                change = 1; }
    }
}
```

### 二分 $$ \mathcal{dichotomy} $$ 

问题：现在有 $$ A\space B $$ 两个正序数组，分别有 $$ m, n$$ 个元素，现在希望找出其中第 $$ k $$ 小的数

~~~c
int getKthElement(int a[], int b[], int m, int n, int k) {
    int index1 = 0, index2 = 0;	//已经对比了的元素个数
    int c_A, c_B;	//最后一个被对比的元素下标
    while(k != 1) {	//当剩下大于1个数没有被找到时
        if(index1 == m) return B[index2 + k - 1];	//假如一边到头，直接返回另一个数组剩下的
        if(index2 == n) return A[index1 + k - 1];
        c_A = (index1 + k / 2 < m) ? (index1 + k / 2 - 1) : (m - 1);	//防止越界
        c_B = (index2 + k / 2 < n) ? (index2 + k / 2 - 1) : (n - 1);
        if(A[c_A] <= B[c_B]) {	//对比哪边的数组被数了k/2个数字
            k -= c_A - index1 + 1;	//将需要被找到的数字指标降低
            index1 = c_A + 1;	//积累已经被对比的数字个数
        }
        else {
            k -= c_B - index2 + 1;
            index2 = c_B + 1;
        }
    }
    return A[index1] < B[index2] ? A[index1] : B[index2];	//k=1，接下来一个哪边小就返回哪个
}
~~~

时间复杂度 $$ O(logn) $$ ，空间复杂度 $$ O(1) $$  

## 线性表

### 概念摘要

**数据项** 线性表中的一个数据元素的成员

**记录** 线性表中的一个数据元素

**文件** 含有大量记录的线性表

xxxxxxxxxx STACK SEGMENT USE16 STACK    DB 200 DUP(0)STACK ENDSDATA SEGMENT USE16    SUM DW  ;W = word, 2 bytesCODE SEGMENT USE16    ASSUME CS:CODE, SS:STACKDS:DATA. ES:DATA​START:MOV AX,DATA    MOV DS,AX    MOV VS,50    MOV AX,0    MOV BX,1NEXT:ADD AX, BX    INC BX    INC BX    DEC CX    JNE NEXT    ;JNE: Jump if Not E, when CX != 0, jump to NEX    MOVE SUM,AX    MOV AH,4CH    INT 21HCODE ENDS    END STARTasm

### 算法摘要

对于集合 $$ A, B$$ ，求集合 $$ A\cup B$$ 中的元素

~~~c
void union(List &La, List &b) {
    La_len = ListLength(La); Lb_len = ListLength(Lb);
    for(int i = i; i < Lb_len; i++) {
        GetElem(Lb, i, e);
        if(!LocateElem(La, e, equal)) ListInsert(La, ++La_len, e);
    }
}
~~~

### 顺序表

#### 定义

顺序存储结构的线性表完整定义如下：

~~~c
#define MaxLength 100
typedef struct {
    ElemType elem[MaxLength];
    int length;	//顺序表长度
    int last;	//最后一个变量的位置
} Sqlist;
~~~

不难发现这里 `last`  其实和 `length` 是相关的，因此一般定义时只需要保留其中一个即可，例如：

```c
#define MaxLength 100
typedef struct {
    ElemType elem[MaxLength];
    int length;	//表长
} SqList;
```

顺序存储结构的顺序表有以下的动态分配定义：

~~~c
#define LIST_INIT_SIZE 100	//初始表长
#define LISTINCREMENT 10 //每次多分配的节点数量
typedef struct {
    ELemType *elem;	//初始节点指针
    int length;
    int listsize;
} SqList;
~~~

#### 插入新元素

静态分配链表插入如下：

~~~c
//静态分配顺序表插入算法，用引用参数表示被操作的线性表
Status Insert(SqList *L, int i, ELemType e) {
    int j;	//一个索引
    if(i < 1 || i > L->length + 1) return ERROR;	//插入位置不在表里，返回错误
    if(L->length > MaxLength) return OVERFLOW;	//插入后表长超过最大值，返回溢出
    for(j = L->length-1; j >= i - 1; j--)
        L->elem[j+1] = L->elem[j];
    L->elem[i-1] = e;
    L->length++;
    return OK;
}
~~~

**动态**分配链表插入如下：

~~~c
//动态分配顺序表插入算法
Status Insert(SqList *L, int i, ElemType e) {
    int j;
    if(i < 1 || i > L->length + 1) return ERROR;
    if(L->length >= L->listsize) {
        ElemType *newbase;
        newbase = (ElemType*)realloc(L->elem, sizeof(ElemType) * (L->listsize + LISTINCREMENT));
        if(newbase == NULL) return OVERFLOW;
        L->elem = newbase;
        L->listsize += LISTINCREMENT;
    }
    for(j = L->listsize - 1; j >= i-1; j--) 
        L->elem[j+1] = L->elem[j];
    L->elem[i-1] = e;
    L->length++;
    return OK;
}
~~~

#### 删除新元素

~~~c
//顺序表删除元素
Status Delete(SqList &L, int i) {
    if(i < 1 || i > L->length)
        return ERROR;
    int j;
    for(j = 1; j <= L->length-1; j++)
        L->elem[j-1] = L->elem[j];
    L->length--;
    return OK;
}
~~~

### 链表

单个节点的声明：

~~~c
typedef struct node {
    ElemType data;
    node* next; // 自引用指针
} node, *Linklist;
~~~

先进先出链表：

~~~c
Status addNode(linklist &List) {
    node a; // 创建节点
   	tail->next = &a;// 如果从头添加的话就会无法从尾部删除，tail不知道倒数第二个
    tail = &a;
    return OK;
}

Status delNode(linklist &List, int x) {
    linklist p = head;
    head = head->next; // 因为要做成队列（FIFO），所以要尾插的话就要头删
    free(p);
    return OK;
}
~~~

先进后出链表：

~~~c
Status addNode(linklist &List) {
    node a;
    a.next = head; //如果要做LIFO表，插入和删除必须是同一个方向，所以假如是尾插的话那么也要从尾部删除，不甚合理
    head = &a;
    return OK;
}

Status delNode(linklist &List) {
    linklist p;
    head = p->next; // 因为插入只能从头部插入，所以删除也只能从头部删除。
    free(p);
    return OK;
}
~~~

### 循环单链表

#### 求表长

~~~c
int length(node *head) {
    int len = 0;
    node *p;
    p = head->next;
    while(p != head) {
        printf("%d", p->data);
        len++;
        p = p->next;
    }
    return len;
}
~~~

### 双向链表

#### 节点定义

~~~c
typedef struct Dnode {
    ElemType data;	//每个节点的数据域
    Dnode *prior, *next;	//前驱和后继节点指针
} Dnode, *DLList;
~~~

### 算法大合集

#### 递增有序单链表生成

**问题阐述** 输入一列整数，以 0 为结束标志，生成递增有序单链表（不包括 0 ）。

##### $$ Algorithm \space I $$ 不带表头结点的

~~~c
node* InsertList1(node *head, int e) {
    node *q = NULL;
    node *p = head;
    while(p && e > p->data) {
        q = p;
        p = p->next;
    }
    node *f = (node *)malloc(LENG);
    f->data = e;
    if(p == NULL) {
        f->next = NULL;
        if(q == NULL)
            head = f;
       	else q->next = f;
    }
    else if(q == NULL) {
        f->next = p; head = f;
    }
    else {f->next = p; q->next = f;}
    return head;
}

int main() {
    node *head;
    head = NULL;
    int e;
    scanf("%d", &e);
    while(e != 0) {
        head = InsertList1(head, e);
        scanf("%d", &e);
    }
    return 0;
}
~~~

##### $$ Algorithm \space II$$ 带表头节点的

~~~c
node * InsertListII(node *head, int e) {
    node *q = NULL;
    node *p = head->next;
    while(p && e>p->data) {
        q = p;
        p = p->next;
    }
    node *f = (node *)malloc(LENG);
    f->data = e;
    f->next = p; q->next = f;
}

int main() {
    node *head = (node *)malloc(LENG);
    head->next = NULL;
    int e;
    while(e != 0) {
        head = InsertList2(head, e);
        scanf("%d", &e);
    }
    return 0;
}
~~~

#### 单链表插入、删除算法

##### 插入

~~~c
Status insert(Linklist L, int i, ElemType e) {
    node *p = L;
    int j = 1;
    while(p && j < i) {
        p = p->next;
        j++;
    }
    if(i < 1 || p == NULL)
        return ERROR;
    node *f = (node *)malloc(LENG);
    f->data = e;
    f->next = p->next; p ->next = f;
    return OK;
}
~~~

##### 删除 $$ Algorithm \space I $$

~~~c
Status Delete(Linklist head, int e) {
    while(p && p->data != e) {
        q = p;
        p = p->next;
    }
    if(p) {
        q->next = p->next;
        free(p);
        return YES;
    }
    return ERROR;
}
~~~

##### 删除 $$ Algorithm \space II $$

~~~c
Status Delete(Linklist L, int i) {
    node *p = L;
    int j = 1;
    while(p->next && j < i) {
        p = p->next;
        j++;
    }
    if(i<1 || p->next == NULL)	//到表尾了也没有找到
        return ERROR;
    node *q = p->next;
    p->next = q->next;
    free(q);	//别忘了free删掉的节点的内存
    return OK;
}
~~~

#### 单链表合并算法

将两个带表头结点的有序单链表 La 和 Lb 合并为**有序**单链表 Lc， 该算法利用单链表的节点。

~~~c
void mergeList(Linklist La, Linklist Lb, Linklist Lc) {
	struct node *pa, *pb, *pc;
    pa = La->next;
    pb = Lb->next;
    pc = La;
    free(Lb);
    while(pa && pb) {
        if(pa->data <= pb->data) {
            pc->next = pa;
            pc = pa;
            pa = pa->next;
        }
        else {
            pc->next = pb;
            pc = pb;
            pb = pb->next;
        }
    }
    while(pa != NULL) {
        pc->next = pa;
        pa = pa->next;
    }
    while(pb != NULL) {
        pc->next = pb;
        pb = pb->next;
    }
}
~~~

#### 单链表的逆置

##### $$ Algorithm\space I$$ 递归

~~~c
void reverse1(Linklist L) {
    Linklist p,q;
    if(L->next == NULL) return;
    p = L; q = L->next;
    while(q->next) {
        p = q;
        q = q->next;
    }
    p->next = NULL;
    reverse1(L);
    q->next = L->next;
    L->next = q;
}
~~~

##### $$ Algorithm \space II $$ 递归

~~~c
void reverse2(Linklist L) {
    Linklist p = L->next;
    if(L->next == NULL || p->next == NULL)
    	return;
    L->next = p->next;
    reverse2(L);
    p->next->next = p;
    p->next = NULL;
}
~~~

##### $$Algorithm\space III $$  折半与递归

~~~c
Linklist reverse3(Linklist L) {
    node *p, *q;
    if(!L->next || !L->next->next)
        return L;
    node* L1 = (node *)malloc(LENG);
    p = q = L;
    while(q) {
        q = q->next;
        if(q) {
            q = q->next;
            p = p->next;
        }
    }
    q = p->next;
    L1->next = q;
    p->next = NULL;
    L = reverse3(L);
    L1 = reverse3(L1);
    q->next = L->next;
    free(L);
    L = L1;
    return L;
}
~~~

##### $$ Algorithm \space IV$$ 优化算法

~~~c
void reverse4(Linklist L) {
    node *p, *q;
    p = L->next;
    L->next = NULL;
    while(p) {
        q = p->next;
        p->next = L->next;
        L->next = p;
        p = q;
    }
}
~~~

## 栈 $$\mathcal{LIFO} $$

### 概念

**进栈 push** 向栈中插入一个元素

**出栈 pop** 从栈删除一个元素

**栈顶** 允许插入、删除元素的一端

**栈顶元素** 处在栈顶位置的元素（表尾元素）

**栈底** 不允许插入、删除元素的一端（表头）

**空栈** 不含元素的栈

### 基本结构

#### 顺序静态结构

~~~c
//静态分配
typedef struct {
    ElemType elem[LENGTH];
    int top;
} SqStack;
SqStack S;
~~~

#### 顺序动态结构

```c
//动态分配
#define STACK_INIT_SIZE 100
#define STACKINCREMENT 10
typedef struct {
    ELemType *base;
    int top;
    int stacksize;
} SqStack;
void InitStack(SqStack *S) {
    S.base = (ElemType *)malloc(STACK_INIT_SIZE * sizeof(ElemType));
    S.top = 0;
    S.stacksize = STACK_INIT_SIZE;
}
```

### 顺序栈方法

#### 进栈 $$\mathcal{Push} $$ 

```c
Status Push(SqStack *S, ElemType e) {
    if(S.top >= S.stacksize) {	//动态栈的话
        ElemType *newbase = (ElemType *)realloc(S.base, (S.stacksize + STACKINCREMENT) * sizeof(ElemType));
        if(!newbase) {
            return OVERFLOW;
        }
        S.base = newbase;
        S.stacksize += STACKINCREMENT;
    }
    S.base[S.top] = e;
    S.top++;
    return OK;
}
```

#### 出栈 $$\mathcal{Pop}$$

```c
Status Pop(SqStack &S, ElemType &e) {	//使用e来容纳pop出的数据
    if(S.top == 0) return OVERFLOW;
    S.top--;
    e = S.base[top];
    return OK;
}
```

### 链式栈方法

#### 链式栈结构

~~~c
//这里的基本结构我加了两个自定义的名称
typedef struct node {
    ElemType data;
    struct node* next;
} Unit, *StackNode, *top = NULL;	//初始化置top为空栈
~~~

#### 链式栈的 $$\mathcal{Push}$$ 方法

~~~c
StackNode Push_link(StackNode top, ElemType e) {	//本质上是对链表做了头插
    StackNode *p;
    int length = sizeof(Unit);
    p = (StackNode)malloc(length);
    p->data = e;
    p->next = top;
    top = p;
    return top;
}
~~~

#### 链式栈的 $$ \mathcal{Pop}$$ 方法

~~~c
StackNode Pop_link(StackNode top, ElemType *e) {	//本质是对链表做了头删
    StackNode p;
    if(top == NULL) return NULL;
    p = top;
    (*e) = p->data;
    top = top->next;
    free(p);
    return top;
}
~~~

### 栈的应用

#### 数值转换

~~~c
char * base_convert(int x, int base) {
    SqStack S; int e; InitStack(S);
    while(x != 0) {
        Push(S, x % base);
        x /= base;
    }
    char * res = (char *)malloc((S.top + 1) * sizeof(char));
    int i = 0;
    int *e = &i;
    while(Pop(S, e) == OK)
        res[i++] = (char)e + 48;
    res[i] = '\0';
    return res;
}
~~~

#### 括号匹配

~~~c
int bracket_match(char brackets[]) {
    SqStack S;
    ElemType e;
    InitStack(S);
    for(int i = 0; i < strlen(brackets); i++) {
        char c = brackets[i], x;
        switch(c) {
            case ')':
                if(Pop(S, x) == OK && x == '(') break;
                else return false;
            case ']':
                if(Pop(S, x) == OK && x == '[') break;
                else return false;
            case '}':
                //...
            dafault:
                Push(S, c);
        }
    }
    return StackEmpty(S);	//判断栈是否为空
}
~~~

#### 表达式求值

运算符优先级关系表（其中 `#` 用来标记程序是否运行完毕） 

| S1\S2 |  +   |  -   |  *   |  /   |  (   |  )   |  #   |
| :---: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
|   +   |  >   |  >   |  <   |  <   |  <   |  >   |  >   |
|   -   |  >   |  >   |  <   |  <   |  <   |  >   |  >   |
|   *   |  >   |  >   |  >   |  >   |  <   |  >   |  >   |
|   /   |  >   |  >   |  >   |  >   |  <   |  >   |  >   |
|   (   |  <   |  <   |  <   |  <   |  <   |  =   |      |
|   )   |  >   |  >   |  >   |  >   |      |  >   |  >   |
|   #   |  <   |  <   |  <   |  <   |  <   |      |  =   |

上表中，左侧代表第一个符号，上方代表第二个符号。由以上的关系可以得到下方的表达式求值方法

~~~c
int eval(char *s) {
    SqStack_Int s1;
    SqStack_Char s2;
    InitStack(s1); InitStack(s2);
    int i = -1, result;
    Push(s2, s[++i]);
    char w = s[++i], e;
    while(w != '#' || GetTop(s2, e) == OK && e != '#') {
        if('0' <= w && w <= '9') {
			int num = 0;
            while('0' <= w && w <= '9') {
                num = num * 10 + (w - '0'); w = s[++i];
            }
            Push(s1, num);	//压入数字栈
        }
    }
    else {
        GetTop(s2, e); int res = prior(e, w);	//依靠上面的表判断那个符号优先级大
        if(res == -1) Push(s2, w); w = s[++i];
        else if(res == 0 && w == ')') Pop(s2, e); w = s[++i];	//优先级等于w，去括号
        else if(res == 1) {	//鹅嘞神，你这都比w优先级大了，赶紧计算
            int a = 0, b = 0;	//准备两个运算数存储位置
            Pop(s2, e); Pop(s1, b);Pop(s1, a);	//注意这里先出的是b，因为栈是LIFO表
            switch(e) {
                case '+': Push(s1, a+b); break;
                case '-': Push(s1, a-b); break;
                case '*': Push(s1, a*b); break;
                case '/': Push(s1, a/b); break;
            }
        }
        else {
            return ERROR;
        }
    }
    GetTop(s1, result); return result;
}

//用来判断符号优先级大小的函数，因为纯纯队史所以我只是抄来看看，并没有什么大用
int prior(char a, char b) {
    if(a == '+' || a == '-') {
        if(b == '*' || b == '/' || b == '(') return -1;
        else return 1;
    }
    else if(a == '*' || a == '/') {
        if(b == '(') return -1;
        else return 1;
    }
    else if(a == '(') {
        if(b == ')') return 0;
        else if(b == '#') return ERROR;
        else return -1;
    }
    else if(a == ')') {
        if(b == '(') return ERROR;
        else return 1;
    }
    else if(a == '#') {
        if(b == '#') return 0;
        else if(b == ')') return ERROR;
        else return -1;
    }
    return ERROR;
}
~~~

## 队列

### 概念

**空队列** 不含元素的队列

**队首** 队列中只允许删除元素的一端。一般称为 ***front*** 或 ***head***

**队尾** 队列中只允许插入元素的一端。一般称为 ***rear*** 或 ***tail***

**队首元素** 处于队首的元素

**队尾元素** 处于队尾的元素

**进队** 插入一个元素到队列中。也称为入队

**出队** 从队列中删除一个元素

### 顺序基本结构

#### 静态顺序存储结构

~~~c
#define MAXLENGTH 100
typedef struct {
    ELemType elem[MAXLENGTH];
    int front, rear;
} SeQueue;
SeQueue Q;	//定义一个结构变量Q表示队列
~~~

#### //动态顺序存储结构（书上没提，照猫画虎）

~~~c
#define MAXLENGTH 100
#define INCREMENT 10
typedef struct {
    ElemType *elem;
    int front, rear;
} SeQueue;
~~~

### 顺序队列方法

#### 入队 $$ En\_Queue$$

~~~c
Status En_Queue(SqQueue &Q, ElemType e) {
    if((Q.rear + 1) % MAXLENGTH == Q.front) return OVERFLOW;
    Q.elem[Q.rear] = e;
    Q.rear++;
    Q.rear %= MAXLENGTH;
    return OK;
}
~~~

#### 出队 $$ De\_Queue $$

~~~c
Status De_Queue(SqQueue &Q, ElemType e) {
    if(Q.front == Q.rear) return ERROR;	//队列为空
    e = Q.elem[Q.front];
    Q.front = (Q.front + 1) % MAXLENGTH;
    return OK;
}
~~~

### 链式存储结构

#### 存放元素的节点类型定义

~~~c
typedef struct Qnode {
    ELemType data;
    struct Qnode *next;
} Qnode, *QnodePtr;
~~~

#### 由头尾元素构成的链表基本定义

~~~c
typedef struct {
    Qnode *front;
    Qnode *rear;
} LinkQueue;
~~~

#### 空队列生成方法

~~~c
#define LENGTH sizeof(Qnode)
void InitQueue(LinkQueue Q) {
    Q.front = Q.rear = (QueuePtr)malloc(LENGTH);
    Q.front->next = NULL;
}
~~~

#### 队列插入方法

~~~c
Status EnQueue(LinkQueue &Q, ElemType e) {
    Qnode *p = (Qnoode *)malloc(sizeof(LENGTH));
    if(!p) return ERROR;
    p->data = e;
    p->next = NULL;
    Q.rear->next = p;
    Q.rear = p;
    return OK;
}
~~~

#### 队列删除算法

~~~c
Status DeQueue(LinkQueue &Q, ElemType e) {
    if(Q.front == Q.rear) return ERROR;
    Queue *p = Q.front->next;
    Q.front->next = p->next;
    e = p->data;
    if(Q.rear == p) Q.rear = Q.front;
    free(p);
    return OK;
}
~~~

### 栈的应用实例

#### 编码

> 现在有一种简易的编码规则为 k[encoded_string] ，它表示方括号内部的 encoded_string 刚好重复 k 次、
>
> 例如，字符串 2[ab]3[c]def 表示的字符串是 ababcccdef
>
> 另外，这种编码允许嵌套，解码的时候需要由左向右，由内到外进行嵌套。
>
> 例如，字符串 3[a2[bc]]2[d] 表示的字符串是 abcbcabcbcabcbcdd

~~~c
/* Decoder */
string decode(string str) {
    SqStack_Int s1;
    SqStack_String s2;
    InitStack(s1); InitStack(s2);
    for(int i = 0; i < str.length(); i++) {
        char ch = str[i];
        int num = 0;
		if(isdigit(ch)) {
            while(isdigit(ch)) {
                num = num * 10 + (ch - '0');
                ch = str[++i];
            }
            Push(s1, num);
            i--;	//退出非数字字符
        }
        else if(isalpha(ch)) {
            Push(s2, string(1, ch));
        }
        else if(ch == ']') {
            Pop(s1, num);
            string top = "", tmp = "", repeat = "";
            while(Pop(s2, top) && top != "[") tmp = top + tmp;	//利用字符串加法反置串
            while(num--) repeat += tmp;
            Push(s2, repeat);
        }
    }
    string res = "", tmp = "";
    while(Pop(s2, tmp)) res = tmp + res;
    return res;
}
~~~

### 队列的应用实例

#### 银行排队叫号系统

> 问题背景：在银行办理业务时，客户依次取号进入客户队列排队，然后根据银行广播提示，到指定的空闲窗口办理业务。

~~~c
typedef struct Customer {
    int index;	//序号
    int window;	//窗口
    int time;	//模拟时长
} Customer;
~~~

~~~c
void bank_service(int n, int serviceTime) {
    LinkQueue wait_queue; InitQueue(wait_queue);
    Customer *windows[n];
    for(int i = 0; i < n; i++) windows[i] = (Customer *)malloc(sizeof(Customer));
    int windowsStatus[n];
    for(int i = 0; i < n; i++) windows_status[i] = 0;	//可以用memset
    int idx = 0;
    for(int t = 0; t < serviceTime || !QueueEmpty(wait_queue) || !AllWindowsEmpty; t++) {
        printf("time now: %d\n", t);
        if(t < service) {
            if(rand() % (1 + n)) {	//客户以 n / (n+1) 的概率到达
                Customer c; c.index = ++idx;
                c.time = 1 + rand() % 5;
                EnQueue(wait_queue, c);
                printf("%d 号客户入队，模拟时长为%d\n", idx, c.time);
            }
        }
        for(int i = 0; i < n; i++) {
            if(WindowsStatus[i]) {
                if(--windows[i]->time <= 0) {
                    printf("%d 号客户离开窗口%d", windows[i]->index, windows[i]->window);
                    WindowsStatus[i] = 0;
                }
            }
            if(!WindowsStatus[i] && !QueueEmpty(wait_queue)) {
                DeQueue(wait_queue, *windows[i]);
                windows[i]->window = i+1; windowsStatus[i] = 1;
                printf("请 %d 号客户到 %d 号窗口办理业务", windows[i]->index, windows[i]->window);
            }
        } printf("\n");
    }
    for(int i = 0; i < n; i++) free(windows[i]);
}
~~~

## 字符串

### 概念

 **字符串** 由零个或者多个字符组成的有限序列，一般记为 $ S = \space "a_1 \space a_2 \space a_3 ...a_n" $

**串值** 双引号内的内容

**串长** n 的大小

**空串** n = 0

**空格串** 仅含若干空格的字符串

### 存储结构

#### 静态存储分配的字符串

也被称为串的**定长顺序存储表示**

~~~c
#define MAXLENGTH 256
typedef unsigned char SeqString[MAXLENGTH];
SeqString S;
~~~

这个时候可能有人要问了，主播主播，你这个有点太简单了，我们数据结构应该实现的东西不是应该都非常具有结构吗？

有的，结构我们是有的，毕竟我们在这本书里已经学过了 **顺序表**

~~~c
typedef struct {
    unsigned char ch[MAXLENGTH];
    int length;
} SeqString;
~~~

#### 动态存储分配的字符串

~~~c
typedef struct {
    unsigned char *ch;
    int length;
} HString;
~~~

#### 串的链式存储

~~~c
typedef struct node {
    char data;
    struct node *next;
} LinkStrNode, *LinkString;
~~~

在这里引入存储密度的概念，其公式为：
$$
\rho = \frac{StringUnit}{ActualUnit} \times 100\%
$$
因此如果按以上的方式存储字符串，那么存储的无用信息比有用的还多，那就很神人了。

怎么提升这个存储密度呢？在一个节点里多塞几个信息就完了

~~~c
#define NODESIZE 4
typedef struct node {
    char data[NODESIZE];
    struct node *next;
} LinkStrNode, *LinkString;
~~~

这时候字符串增添啥的岂不是很麻烦啊！没事，反正也不用这种方式做算法~大模拟会写就完了

### 字符串的模式匹配算法

#### 朴素的模式匹配算法

比较简单粗暴，大不了就一个一个字母进行比较嘛~怎么确定这个字符串完整的出现过了？从第一位开始一个一个比较就可以了，总体的一个一个比较需要拿另一个 index 来存储

~~~c
int StrIndex(SeqString S, SeqString T, int pos) {
    int i, j;
    for(int i = pos, j = 1; i <= S[0] - T[0] + 1;i++, j++) {
        if(S.ch[i] != T.ch[j]) {	//完蛋，居然不一样
            i = i - j + 1;	//外层index回到之前的位置
            j = 0;	//内层index置0
        }
        else if(j == T.ch[0]) return i-j+1;	//匹配位置
    }
    return 0;	//没找到啊？？
}
~~~

#### KMP模式匹配算法

不难发现，前面那个算法会导致每次一遇到不一样的就得回滚，实在是太麻烦了我天。那么有没有匹配的时候还能够灵活的调整匹配区间的算法呢？

假如一个字符串里面某个位置和前缀的某些元素相同，那么我可以通过存下相同前缀的位置来减少回滚的长度。

例如 ababc 这个字符串，不难发现abab里面都有 ab，那么遇到不一样的字符时可以首先考虑**一直到对比位置的前缀相同位置是否都符合条件**，以此来减少滚动长度。

我们完全可以通过另外保存一个数组来实现这个功能，即记录下当前字符串位置的前缀相同位置。

不妨将这个新的由位置组成的顺序表视作一个串，将其命名为**next**

| Position j | 1    | 2    | 3    | 4    | 5    |
| ---------- | ---- | ---- | ---- | ---- | ---- |
| ModeString | a    | b    | a    | b    | c    |
| next[j]    | 0    | 1    | 1    | 2    | 1    |

其中 $$ next$$ 数组应该满足
$$
next_j = k \Leftrightarrow t_1t_2t_3...t_k = t_{j-k+1}t_{j-k+2}t_{j-k+3}...t_{j}
$$
这个 next 数组怎么求呢？



### 基于不同存储类型实现的一些其它字符串方法

#### 串插入方法

#### 串比较方法

#### 串赋值算法

#### 求子串方法

#### 串联接方法



## 多维数组

## 广义表

## 树

## 二叉树

## 图（结构）

## 图的最小生成树问题

## 图的最短路径问题

## 排序

## 查找

## 大数据

## 后记
