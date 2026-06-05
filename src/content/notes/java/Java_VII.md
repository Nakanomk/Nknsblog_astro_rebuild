---
title: 'Java Chapter VII 一维数组'
description: ''
tags:
  - Code
  - Learn
language: '中文'
publishDate: 2026-06-05 09:05:00
order: 5
---

## Chapter VII 一维数组

### 声明数组变量

```java
elementType[] arrayRefVar;	// Type I
elementType arrayRefVar[];	// Type II, but not referred
---  下面是实际例子 ---
double[] myList;
double myList[];
```

### 创建数组

不同于声明基本数据类型变量，声明一个数组变量时**不给数组分配任何内存空间**。它只是创建一个引用的存储位置。变量的值依然为 null，因此需要使用 `new` 操作符创建一个数组。

```java
double[] myList;
myList = new double[10];
```

声明一个数组变量、创建数组、将数组引用赋值给变量这三个步骤可以合并在一起：

```java
// Before
double[] myList;
myList = new double[10];

// After
double[] myList = new double[10];
```

可以使用下面的语法给数组中的单元赋值。

```java
arrayRefVar[index] = value;
```

### 数组大小和默认值

创建数组后，可以通过 `array.length` 得到数组的大小。它的元素被赋予默认值。

数值型基本类型的默认值就是 0，char 型的默认值为 \u0000，boolean 型的默认值为 false。

### 访问数组元素

数组元素可以通过下标访问。

```java
arrayRefVar[index];
```

创建数组之后，下标变量和正常变量的使用方法相同。

```java
myList[0] = myList[0] + myList[2];
```

下面的循环是将对应的下标赋给数组对应的元素

```java
for (int i = 0; i < myList.length; i++) {
    myList[i] = i;
}
```

### 数组初始化简写方式

```java
elementType[] arrayRefVar = {value0, value1, ..., valuek};
```

例如

```java
double[] myList = {1.9, 2.9, 3.9, 4.9};
```

**注意** 数组初始化简写方式不用加 `new`。这里*不能*将语句拆开成

```java
double[] myList;
myList = {1.9, ...};	// Wrong
```

### 处理数组

处理数组元素时，经常会用到 for 循环

假设创建以下数组

```java
double[] myList = new double[10];
```

下面是一些处理这个数组的例子：

1. 下面的循环使用用户输入的值来初始化数组

   ```java
   java.util.Scanner input = new java.util.Scanner(System.in);
   System.out.print("Enter " + myList.length + " values: ");
   for (int i = 0; i < myList.length; i++)
       myList[i] = input.nextDouble();
   ```

2. 下面的循环使用 0.0 到 100.0 之间，但是小于 100.0 的随机值来初始化数组

   ```java
   for (int i = 0; i < myList.length; i++)
       myList[i] = Math.random() * 100;
   ```

3. 打印数组

   ```java
   for (int i = 0; i < myList.length; i++)
       System.out.print(myList[i] + " ");
   ```

4. 对所有元素求和

   ```java
   double total = 0;
   for (int i = 0; i < myList.length; i++)
       total += myList[i];
   ```

5. 随机打乱

   ```java
   // shuffling
   for (int i = 0; i < myList.length - 1; i++) {
       int j = (int)(Math.random() * myList.length);
       
       double temp = myList[i];
       myList[i] = myList[j];
       myList[j] = temp;
   }
   ```

### foreach 循环

下面的代码显示数组 myList 中所有的元素

```java
for (double e: myList) {
    System.out.print(e);
}
```

该循环的意义在于对 myList 中每一个元素做以下操作。

注意这里需要以特定顺序改变数组中的元素时，还是需要使用下标。

> 越界访问会抛出 ArrayIndexOutOfBoundException 运行时错误

### 复制数组

在程序中经常需要复制数组或其中的一部分。假如你使用

```java
list2 = list1;
```

这样的语句，并不能将 list1 的引用复制给 list2，因为 list1 是一个引用。这里赋值之后 list1 和 list2 都会指向同一个数组。list2 原先的变量没有意义了，这里它会被 JVM 的 GC 回收掉。

复制数组有三种方法：

1. 使用循环语句逐个复制元素
2. 使用 System 类中的静态方法 arraycopy
3. 使用 clone 方法复制

可以使用循环复制，例如：

```java
int[] souceArray = {2,3,1,5,10};
int[] targetArray = new int[sourceArray.length];
for (int i = 0; i < sourceArray.length; i++)
    targetArray[i] = sourceArray[i];
```

另一种是 java.lang.System 类里面的 arraycopy 方法。它的语法如下所示：

```java
arraycopy(sourceArray, srcPos, targetArray, tarPos, length);
```

其中， srcPos 和 tarPos 分别表示复制起始位置的下标。

```java
System.copyarray(sourceArray, 0, targetArray, 0, sourceArray.length);
```

这是上面那一段循环的等价形式。

### 将数组传递给方法

和前面传递基本数据类型的值一样的操作：

```java
public static void printArray(int[] array) {
    for (int i = 0; i < array; i++) {
        System.out.print(array[i] + " ");
    }
}
```

这里依旧是一个按值传递。可以通过传递一个数组调用上面的方法。

```java
printArray(new int[]{1,3,5,7,9});
```

前面的语句通过这种语法来创建数组：

```java
new elementType[]{value0, value1, ..., valuek};
```

这种写法叫作 *匿名数组*。

对于基本数据类型，java 传递的是对应的值，但是对于数组类型参数，java 传递的是对数组的引用。即方法中的数组和传入的数组是一样的。

```java
public class TestArrayArguments {
    public static void main(String[] args) {
        int x = 1;
        int[] y = new int[10];
        
        m(x, y);
    }
    
    public static void m(int number, int[] numbers) {
        number = 1001;
        numbers[0] = 5555;
    }
}
```

这里操作之后的结果是：

```
x -> 1
y[0] -> 5555
```

是的，其实 java 中除了基本数据类型之外，其他数据类型的名字其实都是一种引用，相当于 C 里面的指针，只不过因为 Java 的这种设计，这个指针相当安全。

前面演示中失效的 swap 函数，假如传入一个数组，那么 swap 将会真正在传入的数组中生效。

### 方法返回数组

可以在调用方法时向方法传递一个数组，方法也可以返回一个数组。

```java
public static int[] reverse(int[] list) {
    int[] result = new int[list.length];
    
    for (int i = 0, j = result.length - 1; i < result.length; i++, j--) {
        result[j] = list[i];
    }
    
    return result;
}
```

### 可变长参数列表

在方法生命中，指定类型后紧跟着省略号。

```java
typeName... parameterName
```

Java 将可变长参数当作数组看待。可以将一个数组或者数目可变的参数传递给可变长参数。

```java
public class VarArgsDemo {
    public static void main(String[] args) {
        printMax(34, 3, 3, 2, 56.5);
        printMax(new double[]{1,2,3});
    }
    
    public static void printMax(double... numbers) {
        if (numbers.length == 0) {
            System.out.println("No argument passed");
            return;
        }
        
        double result = numbers[0];
        
        for (int i = 1; i < numbers.length; i++)
            if (numbers[i] > result)
                result = numbers[i];
            
        System.out.println("The max value is " + result);
    }
}
```

这里就是给变长参数传入了一个数组。

### 数组的查找

#### 线性查找法

```java
public class LinearSearch {
    public static int linearSearch(int[] list, int key) {
        for (int i = 0; i < list.length; i++) {
            if (key == list[i])
                return i
        }
        return -1;
    }
}
```

#### 二分查找法

```java
// Type I
public static int binarySearch(int[] list, int key) {
    int low = 0;
    int high = list.length - 1;
    
    int mid = (high + low) / 2;
    if (key < list[mid])
        high = mid - 1;
    else if (key == list[mid])
        return mid;
    else low = mid + 1;
}

// Type II
public static int binarySearch(int[] list, int key) {
    int low = 0; int high = list.length - 1;
    while(low <= high) {
        int mid = (low + high) / 2;
        if (key < list[mid])
            high = mid - 1;
        else if (key == list[mid])
            return mid;
        else low = mid + 1;
    }
    
    return -1;	// Not Found
}
```

但是上面第二种方法的一个更好的返回值选择是 -low -1，因为它能够表示数字应该插入的位置。

### 数组的排序

假设要按升序排列一个数组，选择排序先找到数组中最小的数，然后将它和第一个元素交换，接下来，在剩下的数字中找到最小数，将它和第二个元素交换，然后以此类推。

因为 Java 有对应的排序方法，这里就不多讨论了。。

### Arrays 类

`java.util.Arrays` 类提供各种各样的静态方法，用于实现数组的排序和查找、比较和填充元素，返回数组的字符串表示。

```java
double[] numbers = {6.0, 4.4, 1.9, 2.9, 3.4, 3.5};
java.util.Arrays.sort(numbers);
java.util.Arrays.parallelSort(numbers);

char[] chars = {'a', 'A', '4', 'F', 'D', 'P'};
java.util.Arrays.sort(chars, 1, 3);
java.util.Arrays.parallelSort(chars, 1, 3)
```

可以调用 sort 对整个数组进行排序，也可以在后面加上下标让它在范围内进行排序。

```java
java.util.Arrays.binarySearch(list, 11);
java.util.Arrays.binarySearch(list, 12);	// 返回对应的下标
```

上面是二分搜索返回对应下标的实现。

### 命令行参数

注意 main 方法中的参数 String[] args，很明显，args 是一个字符串数组，可以给 main 传递参数。例如：

```java
public class A {
    public static void main(String[] args) {
        String[] strings = {"New York", "Boston", "Atlanta"};
        TestMain.main(strings);
    }
}

public class B {
    public static void main(String[] args) {
        for (int i = 0; i < args.length; i++) {
            System.out.pritnln(args[i]);
        }
    }
}
```

#### 向 main 方法传递字符串

运行程序是，可以从命令行给 main 方法传递字符串参数。

```bash
java TestMain arg0 arg1 arg2
```

其中，参数 arg[0...2] 都是字符串，但是在命令行中出现时，不需要放在双引号中。这些字符串用空格分割，如果字符串包含空格，就必须用双引号括住。

```bash
java TestMain "First sum" alpha 53
```

使用三个字符串启动这个程序，调用 main 方法时， JVM 会创建一个数组用来存储命令行参数，然后将该数组的引用传递给 args。

#### 示例：命令行计算器

现在的需求是希望实现这样的一个计算器：

```bash
java Calculator num1 [op] num2
```

获得这样的输出：

```bash
num1 [op] num2 = ${num1 [op] num2}
```

它的一个实现如下：

```java
public class Calculator {
    public static void main(String[] args) {
        if (args.length != 3)
            System.exit(1);
        
        int result = 0;
        
        switch (args[1].chaarAt(0)) {
            case '+': result = Integer.parseInt(args[0]) + Integer.parseInt(args[2]);
                return;
            case '-': //...
                //...
                
        }
        
        System.out.println(args[0] + ' ' + args[1] + ' ' + args[2] + " = " + result);
    }
}
```

注意这里的 `Integer.parseInt()`。

## Extra: Chapter VIII 多维数组

### 声明

下面是一个声明二维数组的语法：

```java
DataType[][] listName;
DataType listName[][];	// Not recommended.
```

作为例子，声明一个二维 int 型变量的数组 matrix

```java
int[][] matrix;
```

你可以用这个语法创建一个 5 x 5 的 int 型数组，并将它赋值给 matrix

```java
matrix = new int[5][5];
```

### 获取数组长度

需要将对应一维数组的长度和加一起。利用 length 成员加一个循环即可实现。

### 不规则数组

假如你希望创建一个梯形的数组，这在 C++ 中可能是比较困难的，但是 Java 原生支持这种操作。

```java
int[][] triangleArray = new int[5][];	// 注意这里不定义对应一维数组的长度
for(int i = 0; i < triangleArray.length; i++) {
    triangleArray[i] = new int[triangle.length - i];
}
```

### 处理二维数组

假设创建以下的一个二维数组 matrix

```java
int[][] matrix = new int[10][10];
```

### 将二维数组传递给方法

可以像传递一维数组一样，传递二维数组给方法。也可以从一个方法返回一个二维数组。