---
title: 'Java Chapter  VI 方法'
description: ''
tags:
  - Code
  - Learn
language: '中文'
publishDate: 2026-06-05 09:05:00
order: 4
---

## Chapter  VI 方法

### 定义方法

```
[public|private] (static) type method_name(parameter, parameter,...) {
	statements;
	return value;
}
```

方法可以返回一个值，或者是 void。

传递的值叫作实参，在方法头里的变量叫作形参。

方法可以没有参数。

> 方法就是其它编程语言所说的 *过程* 或 *函数*

### 调用方法

调用方法有两种路径。

1. 如果方法返回值，那么就按照一个值处理。

   ```java
   int larger = max(3, 4);
   ```

2. 方法返回 void，那么对应的调用必须是一条语句。

   ```java
   System.out.println("Hello world!");
   ```

   带返回值的方法也可以当作语句调用。

下面是一个实例。

```java
public class TestMax {
    public static void main(String[] args) {
        int i = 5;
        int j = 2;
        int k = max(i, j);
    }
    
    public static int max(int i, int j) {
        return (i > j) ? i : j;
    }
}
```

这个程序包括 main 方法和 max 方法。main 方法和其他方法的区别是它是由 Java 虚拟机调用而启动程序的。

main 的方法头不变。String[] 表示参数是一个 String 型数组。

调用一个方法是，系统会创建一个**活动记录**，用于保存方法中的参数和变量。调用函数的数据结构是栈（老生常谈了。）

### void 方法与返回值方法

下面是一个打印对应分数评分的方法。

```java
public class TestVoidMethod {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        while(true) {
            int score = input.nextInt();
            if (score == -1) break;
            else printGrade(score);
        }
    }
    
    public static void printGrade(int i) {
        char grade = (char)('A' + (100 - i - 1) / 10);
        grade = (grade > 'F') ? 'F' : grade;
        System.out.println(grade);
    }
}
```

### 按值传参

1. 参数必须和函数签名里面的参数列表顺序一样。
2. 传递是按值传递，不改变原来变量的值。

### 模块化代码

将代码封装成方法，提升可读性和可维护性。

```java
import java.util.Scanner;

public class Hex2Dec {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        
        System.out.print("Enter a hex number: ");
        String hex = input.nextLine();
        
        System.out.println(hexToDecimal(hex.toUpperCase()));
    }
    
    public static int hexToDecimal(String hex) {
        int decimalValue = 0;
        for (int i = 0; i < hex.length(); i++) {
            char hexChar = hex.charAt(i);
            decimalValue = decimalValue + 16 * hexCharToDecimal(hexChar);
        }
        
        return decimalValue;
    }
    
    public static int hexCharToDecimal(char ch) {
        if (ch >= 'A' && ch <= 'F') {
            return 10 + ch - 'A';
        }
        
        return ch - '0';
    }
}
```

### 重载方法

创建一个方法名一样但是参数不一样的方法可以重载这个方法，让它支持更复杂的业务。

```java
public class TestMethodOverloading {
    public static void main(String[] args) {
        System.out.println("This example is simplified by nkns1114");
    }
    
    public static int max(int n1, int n2) {
        return (n1 > n2) ? n1 : n2;
    }
    
    public static double max(double n1, double n2) {
        return (n1 > n2) ? n1 : n2;
    }
}
```

这里当传递的参数为一个 int 一个 double 的时候，最终的结果会调用一个 double 类型的 max 方法，这个过程符合**最精确匹配**。

### 作用域

同大多数语言。但是值得注意的是对象并不是离开了创建它的引用变量的作用域就消失了，只要还有一个引用变量在引用那个对象，它就不会消失。

### 示例：生成随机字符

下面是一个能够生成随机字符的代码

```java
public class RandomCharacter {
    public static char getRandomCharacter(char ch1, char ch2) {
        return (char)(ch1 + Math.random() * (ch2 - ch1 + 1));
    }
    
    public static char getRandomLowerCaseLetter() {
        return getRandomCharacter('a', 'z');
    }
    
    public static char getRandomUpperCaseLetter() {
        return getRandomCharacter('A', 'Z');
    }
    
    public static char getRandomCharacter() {
        return getRandomCharater('\u0000', '\uFFFF');
    }
}
```

注意到这个程序没有一个对应的 main 函数，说明这个 java 文件无法直接从 JVM 运行。我们需要写一个驱动程序。

```java
public class TestRandomCharacter {
    public static void main(String[] args) {
        final int NUMBER_OF_CHARS = 175;
        final int CHARS_PER_LINE = 25;
        
        for (inti  = 0; i < NUMBER_OF_CHARS; i++) {
            char ch = RandomCharacter.getRandomLowerCaseLetter();
            if ((i + 1) % CHARS_PER_LINE == 0)
                System.out.println(ch);
            else
                System.out.print(ch);
        }
    }
}
```

### 方法抽象和逐步求精

*方法抽象* 简单来说是只需要用户知道这个方法的输入是什么，功能是什么，能够得到什么样子的输出。至于方法本身的实现方式，完全可以对用户隐藏。这也就是说可以把方法当作黑盒进行设计，然后实现最基本的方法，最后一步步反推实现最顶层的方法。Top - Bottom 设计，Bottom - Top 实现。