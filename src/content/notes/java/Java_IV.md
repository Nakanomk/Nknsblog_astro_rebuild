---
title: 'Java Chapter IV 数学函数、字符和字符串'
description: ''
tags:
  - Code
  - Learn
language: '中文'
publishDate: 2026-06-05 09:05:00
order: 2
---

## Chapter IV 数学函数、字符和字符串

### 字符数据类型和操作

```java
char letter = 'A';
char numChar = '4';
```

#### Unicode 和 ASCII

Java 支持 Unicode。一个 16 位 Unicode 占两个字节，范围从 `\u0000` 到 `\uFFFF`

在 Java 中，可以使用 ACSII 和 Unicode，下面的语句等价：

```java
char letter = 'A';
char letter = '\u0041';	// which is 'A' in Unicode
```

两条语句都将 'A' 赋予 char 类型变量 letter

#### 特殊字符的转义

想要打印 `He said "Java is fun"` ，应该使用如下的语句

```java
System.out.println("He said \"Java is fun\"");
```

#### 字符型数据和数值型数据之间的转换

char 类型可以转换成任意一种数值类型，反之亦然。**将整数转换成 char 类型数据时，只用到该数据的低十六位，其余部分都被忽略。**

所以这里要提一点，要将一个浮点型转换成 char 型时，要先转换成 int 类型。

```java
char ch = (int)65.20;
System.out.println(ch);	// ch is character A
```

当一个 char 类型要被转换成数值类型时，这个字符的 **Unicode 值**就被转换成某个指定的数值类型。

```java
int i = (int)'A';	// A is \u0041
System.out.println("i");	// which is 4 * 16 + 1 = 65;
```

这里转换结果其实适用于 int 类型（即位数放得下 char），不用强制类型转换成 int 也可以赋值，但是比如如果这里是一个 byte 类型，那么就必须强制类型转换。

```java
byte b = 'a';	// which is WRONG!
byte b = (byte)'a';	// which is ACCEPTABLE.
```

所有数值操作符都可以用在 char 类型操作数上。char 类型操作数会被自动转换成和它数值计算的类型。

```java
int i = '2' + '3';	// (int)'2' is 50, so that i is 101
int j = 2 + 'a';	// (int)'a' is 97, so that j is 99
System.out.println("Chapter " + '2');	// output: Chapter 2
```

#### 字符的比较和测试

两个字符可以使用关系操作符进行比较，如同比较两个数字一样。

比较的内容是两个字符的 Unicode 值。

程序中想要测试一个字符是不是大写字母、小写字母、数字，只需要与对应的区间比较即可，例如

```java
if (ch >= 'a' && ch <= 'z')
    System.out.println("ch is a lowercase letter");
```

对应的方法名有

```java
Character.isDigit();
Character.isLetter();
Character.isLowerCase();
Character.isUpperCase();
Character.toLowerCase();
Character.toUpperCase();
```

### String 类型

String 类型表示一串字符。

```java
String message = "Welcome to Java";
```

String 是 Java 库里预定义的类。

**String 不是基本类型，而是引用类型。**任何 Java 类都可以作为引用类型来声明一个引用变量。

这里 message 是一个引用变量，它引用一个内容为 Welcome to Java 的字符串对象。

下面是 String 类型的一些方法。

```java
length();	// 返回字符串中字符数
charAt(index);	// 返回特定位置字符
concat(s1);	// 将字符串和字符串 s1 相连
toUpperCase();	// 返回一个全大写字母的字符串
toLowerCase();
trim();	// 返回一个去除了两边空白字符的字符串
```

注意字符串的下标从 0 开始。

假设一个字符串 s 包含使用空格分开的姓和名，可以使用下面的代码直接提取

```java
int k = s.indexOf(' ');
String firstName = s.substring(0, k);
String lastName = s.substring(k+1);	// 注意这里只传递一个参数是直接截取到结尾
```

#### 字符串和数字之间的转换

可以将数值型字符换转换为数值。使用 `Integer.parseInt` 方法

```java
int intValue = Integer.parseInt(intString);
```

一个合理的 intString 样例是 "123"。

想要将字符串转换成其他类型，使用对应的方法：

```java
String doubleString = "123.45";
double doubleValue = Integer.parseDouble(doubleString);
```

可以将数值转换为字符串，只需要简单的连接操作符：

```java
String s = number + "";
```

### 格式化控制台输出

许多情况下会希望以一种格式来显示数值。例如计算利息：

```java
double amount = 12618.98;
double interestRate = 0.0013;
double interest = amount * interestRate;
System.out.println("Interest is " + interest);
```

这样打印出来的数值事实上是一个 6 位小数，但是对于货币，我们只希望保留到小数点后两位。

```java
System.out.println("Interest is " + (int)(interest * 100) / 100.0);
```

这样可以吗？不可以，输出会是一个一位小数。正确的写法如下：

```java
double amount = 12618.98;
double interestRate = 0.0013;
double interest = amount * interestRate;
System.out.println("Interest is %4.2f", interest);
```

没错！就是一个 *格式限定符* 的问题。。。
