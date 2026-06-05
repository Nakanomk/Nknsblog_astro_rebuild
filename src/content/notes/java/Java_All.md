---
title: 'Java Full Notes'
description: 'Full Version'
tags:
  - Code
  - Learn
language: '中文'
publishDate: 2026-06-05 09:05:00
order: 12
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

## Chapter  V 循环

假如要打印一个字符串 100 次，就需要调用循环语句来简化程序。

```java
int count = 0;
while (count < 100) {
    System.out.println("Welcome to Java!");
    count++;
}
```

这里引出 Java 的三大循环结构：`while` `do-while` `for`

### while 循环

```
while (condition) {
	statements();
}
```

需要注意的是，**这里 while 的条件表达式的返回值必须是一个 bool 型变量**

### do-while 循环

```
do {
	statements;
} while(condition);
```

与 while 循环同理，但是 do-while 循环至少保证里面的内容会运行一次。

### for 循环

for 循环具有编写循环的简明写法。

```
for (init; condition; behaviours) {
    statements;
}
```

这里 for 循环也是同理，基础语言结构和 C 语言如出一辙。

这里省略了 init 或 behaviours 就省去了初始条件或循环结束后的行为，**省去了 condition 就默认 condition 为 true**，循环持续进行。

### 使用用户确认或者标记值控制循环

如果希望用户决定是否继续，可以进行如下的操作：

```java
char continueLoop = 'Y';
while (continueLoop == 'Y') {
    statements;
    System.out.println("Enter Y to continue and N to quit: ");
    continueLoop = input.getLine().charAt(0);
}
```

另一种控制循环的方法是处理一组值是标记一个特殊值。

```java
int sum = 0;
int data = input.nextInt();
while(data != 0) {
    sum += data;
    data = input.nextInt();
}
System.out.println("The sum is " + sum)
```

### 嵌套循环

就是循环里面再放一层循环。。。

### 最小化数值错误

**在循环继续条件中使用浮点数将导致数值错误！**

```java
public class TestSum {
    public static void main(String[] args) {
        float sum = 0;
        
        for (float i = 0.01f; i <= 1.0f; i += 0.01f) {
            sum += i;
        }
        
        System.out.println("The sum is " + sum);
    }
}
```

它的输出会是：

```
The sum is 50.499985
```

这是因为浮点数的运算结果是不准确的。照理说这里把 float 改成 double 精度会提升一点点，但是这里其实会返回

```
The sum is 49.5000000000...03
```

这是因为double类型的精度原因，最后一个 i 会变成一个比 1.00lf 稍微大一点的数，从而少了一次循环。

### 示例

#### gcd

下面是一个 gcd 程序

```java
public class gcd {
 	public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        
        System.out.println("Enter first and second int: ");
        int n1 = input.nextInt(); int n2 = input.nextInt();
        
        int gcd = 1;
        int k = 2;
        while(k <= n1 && k <= n2) {
            if(n1 % k == 0 || n2 % k == 0) {
                gcd = k;
            }
            k++;
        }
        
        System.out.println("The gcd of %d and %d is %d", n1, n2, gcd);
    }
}
```

#### Dec2Hex

下面是一个十进制数转换成十六进制数字符串

```java
import java.util.Scanner;

public class Dec2Hex {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        
        System.out.println("Enter a dec number");
        int decimal = input.nextInt();
        
        String hex = "";
        
        while(decimal != 0) {
            int hexValue = decimal % 16;
            
            char hexDigit = (0 <= hexValue && hexValue <= 9) ? (char hexValue + '0') : (char)(hexValue - 10 + 'A');
            
            hex = hexDigit + hex;
            decimal = decimal / 16;
        }
        
        System.out.pritnln("The hex number is %d", hex);
    }
}
```

### 关键字  break 和 continue

使用 break 直接结束循环，使用 continue 直接进入下一轮循环

#### 示例

下面是一个找素数的程序

```java
public class PrimeNumber {
    public static void main(String[] args) {
        final int NUMBER_OF_PRIMES = 50;
        final int NUMBER_OF_PRIMES_PER_LINE = 10;
        int count = 0;
        int number = 2;
        
        System.out.println("The first 50 prime numbers are \n");
        
        while (count < NUMBER_OF_PRIMES) {
            boolean isPrime = true;
            
            for (int divisor = 2; divisor <= number / 2; divisor++) {
                if (number % divisor == 0) {
                    isPrime = false;
                    break;
                }
            }
            
            if (isPrime) {
                count++;
                if (count % NUMBER_OF_PRIMES_PER_LINE == 0) {
                    System.out.println(number);
                }
                
                else System.out.print(number + " ");
            }
            
            number++;
        }
    }
}
```

这是一个穷举的例子，确实不够优雅（）

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

## Chapter IX 对象和类

使用 class 来定义一系列 object。

类提供构造方法来创建一个新对象。

包含 main 方法的类称为主类。

### 构造方法

构造方法没有返回值，必须和所在类名字相同，是在创建一个对象时由 `new` 操作符调用的，初始化对象。

**不能声明任何类型**

```java
new ClassName(arguments);
```

调用对应的构造方法。

通常，类会提供一个没有参数的构造方法，这样的构造方法称为无参构造方法。

在一个类中，没有定义构造方法的情况下会隐式定义一个方法体为空的构造方法，称为**默认构造方法**。当且仅当没有明确定义任何构造方法时才会自动提供。

### 通过引用变量访问对象

>  对象的数据和方法可以运用点操作符 `.` 通过对象的引用变量进行访问。新创建的对象在内存中被分配空间，他们可以通过引用变量来访问。

#### 引用变量和引用类型

后面接新文档。

对象是通过对象引用变量来访问的，该变量包含了对对象的引用，使用如下语法声明这样的变量：

```java
ClassName objectRefVar;
```

本质上来说，类是程序员定义的类型。类是一种引用类型。这意味着该类类型的变量都可以引用该类的一个实例。下面的语句声明 myCircle 的类型是 Circle

```java
Circle myCircle;
```

变量 myCircle 能够引用一个 Circle 对象，下面的语句创建一个对象，冰球将它的引用赋值给变量 myCircle

```java
myCircle = new Circle();
```

采用如下所示的语法，可以写一条结合了声明对象引用变量、创建对象以及将对象的引用赋值给这个变量的语句。

```java
ClassName objectRefVar = new ClassName();
```

下面是一个例子：

```java
Circle myCircle = new Circle();
```

变量 myCircle 中放的是对 circle 对象的引用。

> 表面上看，对象引用变量中似乎存放了一个对象，但事实上，它只是存放了对对象的引用。严格地讲，对象引用变量和对象是不同的，这里就是简单地说明。
>
> 在 Java 中，数组被看作对象。数组使用 new 操作符创建。一个数组变量实际上是一个包含数组引用的变量。

#### 访问对象的数据和方法

对象成员值该对象的数据域和方法。在创建一个对象之后，它的数据访问和方法调用可以使用点操作符来进行。该操作符也被称为**对象成员访问操作符**。

- objectRefVar.dataField 引用对象的数据域
- objectRefVar.method(arguments) 调用对象的方法

例如，myCircle.radius 引用 myCircle 的半径，因为它依赖于某个具体的实例，基于同样的原因，getArea 方法称为实例方法，因为只能在具体的实例上调用它。实例方法被调用的对象称为**调用对象**。

> 我们通过 Math.methodName 来调用 Math 类中的方法，那么能否用 Circle.getArea 来调用 getArea 方法呢？答案是不能。Math 类中的所有方法都是用 static 定义的静态方法，但是 getArea() 是一个实例方法，因此是非经爱的，必须使用 object.methodName(arguments) 来从对象调用。
>
> 通常，我们创建一个对象，然后将它赋值给一个变量，之后就可以使用这个变量梁来引用对象。有时候，对象在创建之后并不需要引用，在这种情况下，可以创建一个独享，而不明确将它赋值给一个变量。
>
> ```java
> new Circle();
> System.out.println("Area is " + new Circle(5).getArea());
> ```
>
> 这样的写法是不是很有美感（）其实我感觉就是把一个短暂存在的中间变量的存在简化的方法，换言之赋值其实是把中间变量长久化的一种方法）
>
> 这样创建的对象叫作 **匿名对象**

#### 引用数据域和 null 值

数据域也可能是引用型的，以下面的类为例：

```java
class Student {
    String name;
    int age;
    boolean isScienceMajor;
    char gender;
}
```

如果一个引用类型的数据域没有引用任何对象，那么这个数据域就有一个特殊的 java 值 null，它同 false 和 true 一样都是字面值，null 是引用类型字面值。

引用类型数据域默认是 null，数值类型的默认值是 0，boolean 类型数据域的默认值是 false，而 char 类型数据域的默认值是 '\u0000'，但是， Java 没有给方法中的局部变量赋默认值。下面的代码显示 Student 对象中数据域 name、age、isScienceMajor 和 gender 的默认值：

```java
class Student {
    public static void main(String[] args) {
        Student student = new Student();
        System.out.println("name? " + student.name);
        System.out.println("age? " + student.age);
        // ...
    }
}
```

下面代码中的局部变量 x 和 y 都没有初始化，所以会出现编译错误：

```java
class TestLocalVariables {
    public static void main(String[] args) {
        int x;
        String y;
        System.out.println("x is " + x);
    }
}
```

> NullPointerException 是一种常见的运行时错误，当调用值位 null 的引用的变量上的方式是会发生此类一场。在通过引用变量调用一个方法之前，却傲系想讲对象引用赋值给这给按量。

#### 基本类型变量和引用类型变量的区别

基本类型变量储存的是一个确切的值，但是一个引用类型变量储存的是一个地址（类似于一个安全指针）。

> 假如有两个引用类型变量 c1 和 c2，执行 `c1 = c2` 之后，因为 c1 和 c2 现在存储的地址相同，所以 c1 以前指向的变量就不再有用，它会被当作*垃圾*被 gc 处理掉。
>
> 如果你不在需要某个对象，可以显式地给对象的引用变量赋 null 值，如果对象没有被任何引用变量所引用，JVM 将自动回收它的空间。

#### 使用 Java 库中的类

#### Date 类

```java
java.util.Date date = new java.util.Date();
System.out.println("The elapsed time since Jan 1, 1970 is " + date.getTime() + " milliseconds");
System.out.println(date.toString());
```

还有一个构造方法是 `Date(long elapseTime)` ，说明从 GMT 时间 1970.1.1 开始 elapseTime 毫秒后的时间。

#### Random 类

可以使用 Math.random() 获取一个 0.0 到 1.0 之间的随机 double 类型值。另一个方法是 java.util.Random 类，可以产生一个 int long double float 和 boolean 类型的值。

```java
Random generator1 = new Random(3);
System.out.println("From generator1: ");
for (int i = 0; i < 10; i++)
    System.out.println(generator1.nextInt(1000) + " ");

Random generator2 = new Random(3);
System.out.println("From generator2: ");
for (int i = 0; i < 10; i++)
    System.out.println(generator2.nextInt(1000) + " ");
```

产生相同两个数列，范围是 `[0, 1000]`，相同是因为 seed 都是 int: 3

可以使用 `java.util.SecurityRandom` 类来生成完全随机的数字，Random 类生成的数字其实是确定的。

#### Point2D 类

这个不用。

### 静态变量、常量和方法

Circle类的数据域 radius 称为一个*实例变量*。实例变量是属于类的某个特定实例的，即不共享的。

```java
Circle circle1 = new Circle();
Circle circle2 = new Circle(5);
```

上面的两个 Circle 对象对应的 radius 是不相关的。

想要一个类的所有实例共享数据，需要一个*静态变量*，也称为*类变量*。

静态变量将变量只存储在一个公共的内存地址，所以大家都共用。

无须创建类的实例就可以调用静态方法。

可以添加一个静态变量 `numberOfObjects` 用于统计一个类中已经创建的对象个数，在构造函数里面设置自增即可。

```java
static int numberOfObjects;
static int getNumberObjects() {
    return numberOfObjects;
}
```

类中的常量是被该类的所有对象所共享的，因此，常量应该声明为 `final static`，例如，Math 类中的常量 PI 是如下定义的：

```java
final static double PI = 3.1415926...;
```

下面是一个更新过的圆类

```java
public class Circle {
    double radius;
    
    static int numberOfObejcts = 0;
    
    Circle() {
        radius = 1;
        numberOfObjects++;
    }
    
    Circle(double newRadius) {
        radius = newRadius;
        numberOfObject++;
    }
    
    static int getNumberOfObjects() {
        return numberOfObjects;
    }
    
    double getArea() {
        return radius * radius * Math.PI;
    }
}
```

Circle 类中的 getNumberOfObjects 和 Math 类中的方法都是静态方法。main 方法也是静态的。

实例方法和实例数据都是从属于实例的，所以要 new 完之后在对应的引用变量里面访问。

```java
public class TestCircleWithStaticMembers {
    public static void main(String[] args) {
        System.out.println("Before creating objects");
        System.out.println("The number of Circle objects is " + Circle.numberOfObjects);
        
        Circle c1 = new Circle();
        System.out.println("\nAfter creating c1");
        System.out.println("c1: radius (" + c1.radius + ") and number of Circle objects (" + c1.numberOfObjects + ")");
        
        Circle c2 = new Circle(5);
        // info statements like above...
    }
}
```

这里只是为了演示，实际不推荐 `c1.numberOfObjects` 这种写法，更推荐直接用 Circle，因为这样可以直接看出来成员是一个静态变量。

静态方法不能调用实例方法或者访问实例数据域。因为静态方法和数据域不属于某个特定的对象。

下面是一个错误的例子。

```java
public class A {
    int i = 5;
    static int k = 2;
    
    public static void main(String[] args) {
        int j = i;	// Wrong because i is an instance variable
        m1();	// Wrong because m1() is an instance method
    }
    
    public void m1() {
        i = i + k + m2(i, k);
    }
    
    public static int m2(int i, int j) {
        return (int)(Math.pow(i, j));
    }
}
```

但是下面的代码是对的

```java
public class A {
    int i = 5;
    static int k = 2;
    
    public static void main(String[] args) {
        A a = new A();
        int j = a.i;
        a.m1();
    }
    
    public void m1() {
        i = k + i + m2(i, k);
    }
    
    public static int m2(int i, int j) {
        return (int)(Math.pow(i, j));
    }
}
```

因为在 main 方法里实例化了一个 A 类。

**不依赖于任何实例的方法和变量应该是静态的。**

### 可见性修饰符

可以在类、方法和数据域前使用 public 可见性修饰符，表示他们可以被任何其他的类访问，如果没有使用可见性修饰符，那么默认类、方法和数据域是可以被同一个包中的任何一个类访问的。这称作*包私有*或*包访问*。

> 包可以用来组织类。为了完成这个目标，需要在程序中出现以下语句，作为第一条非注释和非空白行的语句：
>
> ```java
> package packagename;
> ```
>
> 如果定义类的时候没有声明包，就表示把它放在默认包中。
>
> Java 建议最好将类放入包中，而不要使用默认包。

除了 public 和 默认可见性修饰符，Java 还为类成员提供 private 和 protected 修饰符。

private 修饰符限定方法和数据域只能在它自己的类中被访问。

如果一个类没有被定义为公共类，那么它只能在同一个包中被访问。

### 数据域封装

直接修改类的数据域不是一个好做法，因为：

1. 数据可能被篡改。
2. 使得类难以维护，容易出现错误。因为修改数据域需要保证使用了 Circle 类的程序都进行对应修改。

为了避免直接修改，应该使用 private 修饰符将数据域声明为私有的。这称为*数据域封装*。

私有数据域不能被对象从定义该私有域的类外访问，但是经常会有客户端需要存取、修改数据域。为了访问私有数据域，可以提供一个 getter 方法来返回数据域的值。更新可以使用一个 setter，而获取方法叫作 accessor，设置方法称为 mutator。

```java
public returnType getPropertyName()
```

如果 returnType 是 boolean 类型，习惯上如下定义获取方法：

```java
public boolean isPropertyName()
```

设置方法有如下签名：

```java
public void setPropertyName(dataType propertyValue)
```

现在来创建一个新的圆类

```java
public class Circle {
    private double radius = 1;
    
    private static int numberOfObjects = 0;
    
    public Circle() {
        numberOfObjects++;
    }
    
    public Circle(double newRadius) {
        radius = newRadius;
        numberOfObjects++;
    }
    
    public double getRadius() {
        return radius;
    }
    
    public void setRadius(double newRadius) {
        radius = (newRadius >= 0) ? newRadius : 0;
    }
    
    public static int getNumberOfObjects() {
        return numberOfObjects;
    }
    
    public double getArea() {
        return radius * radius * Math.PI;
    }
}
```

下面是它的一个驱动程序

```java
public class TestCircleWithPrivateDataFields {
    public static void main(String[] args) {
        Circle myCircle = new Circle(5.0);
        myCircle.setRadius(myCircle.getRadius() + 1);
    }
}
```

现在 numberOfObjects 之类的变量是私有的，避免了无端地篡改，让类型变得更安全。另外，因为设置了对应的方法接口，现在可以在编写程序时更自由地调整内部结构。

### 向方法传递对象参数

可以将对象传递给方法，实际上传递的是对对象的引用。

```java
public class Test {
    public static void main(String[] args) {
        Circle myCircle = new Circle(5.0);
        printCircle(myCircle);
    }
    
    public static void printCircle(Circle c) {
        System.out.println("The area of the circle of radius " + c.getRadius() + " is " + c.getArea());
    }
}
```

java 只有一种参数传递方式：*值传递*。在上面的代码中，myCircle 的值被传递给 printCircle 方法。这个值就是一个对 Circle 对象的引用值。

```java
public class TestPassObject {
    public static void main(String[] args) {
        Circle myCircle = new Circle(1);

        int n = 5;
        printArea(myCircle, n);

        System.out.println("\nRadius is " + myCircle.getRadius());
        System.out.println("n is " + n);
    }
    
    public static void printAreas(Circle c, int times) {
        while (times >= 1) {
            c.setRadius(c.getRadius() + 1);
            times--;
        }
    }
}
```

引用上的按值传参在语义上最好描述为*按共享传参*。

### 对象数组

在第 7 章中描述了如何创建基本类型元素的数组，也可以创建对象数组。例如，下面的语句声明并创建了包含 10 个 Circle 对象的数组。

```java
Circle[] circleArray = new Circle[10];
```

为了初始化 circleArray，可以使用如下的 for 循环

```java
for (int i = 0; i < circleArray.length; i++) {
    circleArray[i] = new Circle();
}
```

对象的数组实际上是*引用变量的数组*。因此，调用 circleArray[1].getArea() 实际上调用了两个层次的引用。

下面演示如何使用对象数组。

```java
public class TotalArea {
    public static void main(String[] args) {
        Circle[] circleArray;
        circleArray = createCircleArray();
        
        printCircleArray(circleArray);
    }
    
    public static Circle[] createCircleArray() {
        Circle[] circleArray = new Circle[5];
        
        for (int i = 0; i < circleArray.length; i++) {
            circleArray[i] = new Circle(Math.random() * 100);
        }
        
        return circleArray;
    }
    
    public static void printCircleArray(Circle[] circleArray) {
        for (int i = 0;  i < circleArray.length; i++) {
            circleArray[i].getArea();
        }
    }
    
    public static double sum(Circle[] circleArray) {
        double sum = 0;
        
        for (int i = 0; i < circleArray.length; i++) {
            sum += circleArray[i].getArea();
        }
        
        return sum;
    }
}
```

### 不可变对象和类

通常，创建一个对象之后，它的内容是可以改变的。但是我们也需要一些创建之后不可改变的对象，叫作 *不可变对象*。它的类被称为*不可变类*。例如，String 类本身是不可变的。如果把程序中 Circle 类的设置方法删掉，那么这个类就变成不可变类，因为数据域全部都是私有的，而且没有访问接口。

例如下面的 Student 类，它其实不是一个不可变类。

```java
public class Student {
    private int id;
    private String name;
    private java.util.Date dateCreated;
    
    public Student(int ssn, String newName) {
        id = ssn;
        name = newName;
        dateCreated = new java.util.Date();
    }
    
    public int getId() {
        return id;
    }
    
    public String getName() {
        return name;
    }
    
    public java.util.Date getDateCreated() {
        return dateCreated;
    }
}
```

问题在哪呢？问题在于 return dateCreated 是传递了一个对 dateCreated 对象的引用。因此它其实是可以改变对象的数据的。

要使一个类是不可变的，需要满足下面的要求：

1. 所有数据域都是私有的
2. 没有修改器方法
3. 没有返回一个指向可变数据域的引用的访问器方法

### 变量的作用域

一个类中的实例变量和静态变量称为*类变量*或*数据域*。在方法内部定义的变量称为*局部变量*。无论在何处声明，类变量的作用于都是**整个类**。

类的变量和方法可以在类中以任意顺序出现，但是当一个数据域是基于对另一个数据域的引用来进行初始化时则不是这样。在这种情况下，必须先说明另一个数据域。

```java
public class F {
    private int i;
    private int j = i + 1;
}
```

类变量只声明一次，但是在一个方法内不同的非嵌套块中，可以多次声明相同的变量名。

如果一个局部变量和一个类变量具有相同的名字，那么局部变量优先，而同名的类变量将被*隐藏*。

```java
public class F {
    private int x = 0;
    private int y = 0;
    
    public F() {}
    
    public void p() {
        int x = 1;	// now x = 1 but not 0
    }
    
    public static void main(String[] args) {
        F f = new F();
        f.p();	// x is still 0 cause 1 was a temp var
    }
}
```

> 除了方法中的参数，不要将实例变量或静态变量的名字作为局部变量名。

### this 引用

关键字 this 是一个对象可以用来引用自身的引用名。可以用 this 关键字引用对象的实例成员。

```java
public class Circle {
    private double radius;
    
    public double getArea() {
        return this.radius * this.radius * Math.PI
    }
    
    public String toString() {
        return "radius: " + this.radius + "area: " + this.getArea();
    }
}
```

#### 使用 this 引用数据域

使用数据域作为设置方法或者构造方法的参数是一个好方法，这样可以使得代码易于阅读。在设置方法中需要使用 this 关键字来引用数据域。

```java
private double radius;

public void setRadius(double radius) {
    this.radius = radius;	// 这里 this 后面的 radius是数据域的 radius
}

public void setRadius(double radius) {
    radius = radius;	// 这里两个 radius 都是参数的 radius
}
```

这里其实是因为数据域的 radius 和方法中的 radius 重名，被隐藏掉了。但是使用 this 关键字可以重新引用它。

#### 使用 this 调用构造方法

关键字 this 可以调用同一个类的另一个构造方法。可以如下改写 Circle 类

```java
public class Circle {
    private double radius;
    public Circle(double radius) {
        this.radius = radius;
    }
    
    public Circle() {
        this(1.0);
    }
}
```

this(1.0) 这一行语句使用一个 double 值参数调用第一个构造方法。

> Java 要求，在构造方法中语句 this(arg-list) 应该在任何其他可执行语句之前出现。
>
> 如果一个类有多个构造方法，最好尽可能使用 this(arg-list) 实现它们。通常，无参数或参数少的构造方法可以用 this(arg-list) 调用参数较多的构造方法。

## Chapter XI 继承和多态

> 面向对象编程支持从已经存在的类中定义新的类，这称为*继承*。

*继承*是 Java 避免类冗余设计并且减小维护难度的方法。

### 父类和子类

使用类来对同一类型的对象建模。不同的类可能会有一些共同的特征和行为，可以在一个通用类中表达这些共同之处，并被其它类共享。比如设计圆和矩形之类的集合对象的时候，可以先定义一个通用类 GeometricObject 来建模所有的几何对象。这个类包括 color 和 filled，然后还包括了对应的 getter 和 setter。

在 Java 中，类 C1 继承自另一个类 C2，那么就将 C1 称为*子类*，将 C2 称为*超类*。超类也叫父类或基类。子类又分为*继承类*和*派生类*。子类从它的父类中集成可访问的数据域和方法，还可以添加新的数据域和方法。

一个类定义了一个类型，由子类定义的一个类型称为*子类型*，由父类定义的类型称为*父类型*。

子类和它的父类形成了“是一种”的关系。

```java
// File I GeometricObject.java
public class GeometricObject {
    private String color = "white";
    private boolean filled;
    private java.util.Date dateCreated;
    
    public GeometricObject() {
        dateCreated = new java.util.Date();
    }
    
    public GeometricObject(String color, boolean filled) {
        dateCreated = new java.util.Date();
        this.color = color;
        this.filled = filled;
    }
    
    public String getColor() {
        return this.color;
    }
    
    public void setColor(String color) {
        this.color = color;
    }
    
    public boolean isFilled() {
        return filled;
    }
    
    public void setFilled(boolean filled) {
        this.filled = filled;
    }
    
    public java.util.Date getDateCreated() {
        return dateCreated;
    }
    
    public String toString() {
        return "created on " + dateCreated + "\ncolor: " + color + " and filled: " + filled;
    }
}
// File II Circle.java
public class Circle extends GeometricObject {
    private double radius;
    
    public Circle() {}
    public Circle(double radius) { this.radius = radius; }
    public Circle(double radius, String color, boolean filled) {
        this.radius = radius;
        setColor(color);
        setFilled(filled);
    }
    
    public double getRadius() {
        return radius;
    }
    
    public void setRadius(double radius) {
        this.radius = radius;
    }
    
    public double getArea() {
        return radius * radius * Math.PI;
    }
    
    public double getDiameter() {
        return 2 * radius;
    }
    
    public double getPerimeter() {
        return 2 * radius * Math.PI;
    }
    
    public void printCircle() {
        System.out.println("The circle is created " + getDateCreated() + " and the radius is " + radius);
    }
}
```

这种方法是错误的：

```java
public Circle(double radius, String color, boolean filled) {
    this.radius = radius;
    this.color = color;	// Illegal
    this.filled = filled;	// Illegal
}
```

下面两行是错误的，因为 color 和 filled 是父类里面 private 的部分，对于子类也不可见。

注意这里 Circle 类继承 GeometricObject 类所用的语法

```java
public class Circle extends GeometricObject
```

`extends` 关键字前面是子类，后面是父类。

下面是几个关键点：

- 子类不是父类的一个子集，一个子类通常比父类信息更多。
- 父类中的私有数据域在类之外是不可访问的，因此不能在子类中直接调用。但是可以通过 setter 和 getter 修改。
- 不是所有的 is-a 关系都应该用继承类建模。比如正方形是矩形，但是不应该定义一个 Square 类来继承 Rectangle 类，因为 width 和 height 属性并不适合于正方形。应该定义一个继承自 GeometicObject 的 Square 类。
- 继承是为 is-a 关系建模用的，不是 is-a 关系不要使用继承。一个 Person 和一个 Tree 都具有 weight 和 height 属性，它们却不应该互相继承，因为他们不“是一种”。

- Java 中不允许多重继承，一个 Java 类只能直接继承自一个单一的父类。这种限制称为*单一继承*。如果使用 `extends` 关键字定义一个子类，那么它只允许有一个父类。然而，Java 中可以通过接口实现多重继承。

### 使用 super 关键字

关键字 `super` 指代父类，可以用于调用父类中的普通方法和构造方法。

#### 调用父类的构造方法

构造方法用于创建一个类的实例，不同于属性和普通方法，父类的构造方法不会被子类继承。它们只能使用关键字 `super` 从子类的构造方法中调用。

一个调用父类构造方法的语法是：

```java
super()
// 或者 super(arguments)
```

语句 `super()` 调用父类的无参构造方法，而语句 `super(arguments)` 调用与 arguments 匹配的父类的构造方法。super 关键字必须出现在子类构造方法的第一行，这是显式调用父类构造方法的唯一方式。

```java
public Circle(double radius, String color, boolean filled) {
    super(color, filled);
    this.radius = radius;
}
```

#### 构造方法链

构造方法可以调用重载的构造方法或父类的构造方法。如果它们都没有被显式地调用，编译器就会自动地将 `super()` 作为构造方法的第一条语句。

```java
public ClassName() {
    // super() <---- there automatically hides a super()
    statements;
}

public ClassName(parameters) {
    // super(); <---- MENTIONS: there still calls super insteand of super(arguments)
    statements;
}
```

这里比较阴的一点是**子类自动添加的语句永远是 super()，也就是说这里假如父类没有定义一个无参构造方法的话会直接报错。**

在任何情况下，构造一个类的实例时，将会调用沿着继承链的所有父类的构造方法。当构造一个子类的对象式子类的构造方法会在完成自己的任务之前，首先调用它的父类的构造方法。如果父类继承自其他类，那么父类的构造方法又会在完成自己的任务之前，调用它自己的父类的构造方法。这个过程持续到沿着这个继承层次结构的最后一个构造方法被调用为止。这就是*构造方法链*。

```java
public class Faculty extends Employee {
    public static void main(String[] args) {
        new Faculty();
    }
    
    public Faculty() {
        System.out.println("(4) Performs Faculty's tasks");
    }
}

class Employee extends Person {
	public Employee() {
        this("(2) Invoke Employee's overloaded constructor");
        System.out.println("(3) Performs Employee's tasks");
    }
    
    public Employee(String s) {
        System.out.println(s);
    }
}

class Person {
    public Person() {
        System.out.println("(1) Performs Person's tasks");
    }
}
```

> 如果要设计一个可以被继承的类，最好提供一个无参构造方法以避免程序设计错误。
>
> ```java
> public class Apple extends Fruit {}
> 
> class Fruit {
>  public Fruit(String name) {
>      System.out.println("Fruit's constructor is invoked");
>  }
> }
> ```
>
> 由于在 Apple 中没有显式的无参构造方法，因此会隐式调用 Fruit 的无参构造。但是因为 Fruit 显式构造了有参构造方法，所以 Fruit 没有无参构造方法。因此会编译错误。

#### 调用父类的普通方法

关键字 super 不仅可以引用父类的构造方法，也可以引用父类的方法。

```java
pubic void printCircle() {
    System.out.println("The circle is created " + super.getDateCreated() + "and the radius is " + radius);
}
```

虽然这里 super 其实是可有可无的，因为 Circle 继承了父类的 getDateCreated 方法。但是，在某些情况下，关键字 super 是必不可少的。

### 方法重写与重载

要重写一个方法，必须使用一样的签名以及一样或者兼容的返回类型在子类中定义方法。

我们用一个例子来给出重写和重载的不同。

```java
// Class Override
public class TestOverriding {
    public static void main(String[] args) {
        A a = new A();
        a.p(10);
        a.p(10.0);
    }
}

class B {
    public void p(double i) {
        System.out.println(i * 2);
    }
}

class A extends B {
   public void p(double i) {	// This method overrides the method in B
       System.out.println(i);
   } 
}

// Class Overload
public class TestOverloading {
    public static void main(String[] args) {
        A a = new A();
        a.p(10);
        a.p(10.0);
    }
}

class B {
    public void p(double i) {
        System.out.println(i * 2);
    }
}

class A extends B {
    // This method overloads the method in B
    public void p(int i) {
        System.out.println(i);
    }
}
```

当参数列表一样时，方法将被*重写*，这种情况下父方法将会直接失效，但是如果参数列表不一样，这种情况下只是重载这个方法，将方法的参数列表类型做补充，在实际调用的时候会就近就精确去选择一个合适的方法去调用。

注意以下几点：

- 方法重写发生在具有继承关系的不同类中，方法重载可以发生在同一个类中，也可以发生在具有继承关系的不同类中。
- 方法重写具有同样的签名；方法重载具有同样的名字但是不同的参数列表。

为了避免错误，可以使用一种特殊的 Java 语法，称为***重写标注***，在子类的方法前面放一个 `@Override`，例如：

```java
public class Circle extends GeometricObject {
    @Override
    public String toString() {
        return super.toString() + "\nradius is " + radius;
    }
}
```

该标注表示被标注的方法必须重写父类的一个方法。如果具有该标注的方法没有重写父类的方法，编译器会报错。例如，如果 toString 被错误地输入为 tostring，那么将报一个编译时错误。如果没有使用 `@Override` 标注，那么编译器将不会报告错误。

### Object 类及其 toString() 方法

> Java中的所有类都继承自 `java.lang.Object` 类

如果在定义一个类时没有指定继承，那么这个类的父类默认是 Object。例如，下面两个类的定义是一样的：

``` java
public class ClassName {}
public class ClassName extends Object {}
```

诸如 String / StringBuilder / Loan / GeometricObject 这样的类都是 Object 的隐含子类。熟悉 Object 类提供的方法是非常重要的。因为这样就可以在自己的类中使用它们。

toString() 方法的签名是：

```java
public String toString()
```

调用一个对象的 toString 方法会返回一个描述该对象的字符串。默认情况下，它返回一个由该对象所属的类名、@、用十六进制形式表示的该对象的内存地址组成的字符串。

```java
Loan loan = new Loan();
System.out.println(loan.toString());
// Output: Loan@15037e5
```

这个信息不是很有用，或者说没有什么信息量。通常，应该重写这个 toString 方法，以返回一个代表该对象的描述性字符串。例如，Object 类中的 toString 方法在 GeometricObject 类中被重写：

```java
public String toString() {
    return "created on " + dateCreated + "\ncolor: " + color + " and filled " + filled; 
}
```

> 也可以传递一个对象来调用 System.out.println(object) 或 print(object)，这样等价于调用 System.out.println(object.toString())

### 多态

面向对象设计的三大支柱是封装、继承和多态。我们已经学习了前两个，本节将介绍多态。

继承关系使一个子类能继承父类的特征，并且附加一些新特征。子类是它的父类的特殊化，每个子类的实例都是其对象的实例，但是反过来不成立。例如：每个圆都是一个集合对象，但并非每一个几何对象都是圆。因此，总可以将子类的实例传给需要父类型的参数。

```java
public class PolymorphismDemo {
    public static void main(String[] args) {
        displayObject(new Circle(1, "red", false));
        displayObject(new Rectangle(1, 1, "black", true));
    }
    
    public static void displayObject(GeometricObject object) {
        System.out.println("Created on " + object.getDateCreated() + ". Color is " + object.getColor());
    }
}
```

方法 `displayObject` 具有 GeometricObject 类型的参数。可以通过传递任何一个 GeometricObject 类型的实例和 `new Rectangle(1, 1, "black", true)` 来调用 `displayObject`。使用父类对象的地方都可以使用子类的对象。这就是所说的***多态***。

简单来说，多态意味着父类型的变量可以引用子类型的对象。

### 动态绑定

> 方法可以在沿着继承链的多个类中实现，JVM 决定运行时调用哪个方法。

方法可以在父类中定义而在子类中重写。例如：toString() 方法是在 Object 类中定义的，而在 GeometricObject 类中重写。思考下面的代码：

```java
Object o = new GeometricObject();
System.out.println(o.toString());
```

这里的 o 调用哪个 toString() 呢？为了回答这个问题，我们首先介绍两个术语：*声明类型*和*实际类型*。

一个变量必须被声明为某种类型。变量的这个类型被称为它的声明类型。这里，o 的声明类型是 Object。一个引用类型变量可以是一个 null 值或者是一个对声明类型实例的引用。实例可以使用声明类型或者它的子类型的构造方法创建。变量的*实际类型*是被变量引用的对象的实际类。这里，o 的实际类型是 GeometricObject，因为 o 引用使用 new GeometricObject 创建的对象。o 调用哪个 toString 方法由 o 的实际类型决定，这称为*动态绑定*。

动态绑定机制如下：

假设对象是类 $C_1, C_2, C_3,...,C_{n-1},C_n$ 的实例，其中 $C_1$ 是 $C_2$ 的子类，以此类推，也就是说 $C_n$ 是最通用的类，而 $C_1$ 是最特殊的类。在 Java 中，$C_n$ 是 Object 类。如果对象 o 调用一个方法 p，那么 JVM 会依次在类 $C_1,C_2,C_3,...,C_n$ 中寻找方法 p 的实现，直到找到为止。一旦找到那个实现，就停止查找，然后调用这个实现。

```java
public class DynamicBindingDemo {
    public static void main(String[] args) {
        m(new GraduateStudent());
        m(new Student());
        m(new Person());
        m(new Object());
    }
    
    public static void m(Object x) {
        System.out.println(x.toString());
    }
}

class GraduateStudent extends Student {}

class Student extends Person {
    @Override
    public String toString() {
        return "Student";
    }
}

class Person extends Object {
    @Override
    public String toString() {
        return "Person";
    }
}
// output:
/*
	Student
	Student
	Person
	java.lang.Object@130c19b
*/
```

方法 m 有一个 Object 类型的参数。可以用任何对象作为参数类调用 m 方法。当执行方法 m 时，调用 x 的 toString 方法。x 可能是 GraduateStudent、Student、Person 或者 Object 的实例。类 Student、Person 以及 Object 都有它们自己对 toString 方法的实现。使用哪个实现取决于运行时 x 的实际类型。

引用变量的声明类型决定了编译时匹配哪个方法。在编译时，编译器会根据参数类型、参数个数和参数顺序找到匹配的方法。一个方法可能在沿着继承类的多个类中实现。JVM 在运行时动态绑定方法的实现。

### 对象转换和 instanceof 操作符

> 一个对象的引用可以类型转换为对另外一个对象的引用，这称为对象转换。

在上一节中，语句

```java
m(new Student());
```

将对象 `new Student()` 赋值给一个 Object 类型的参数。这条语句等价于

```java
Object o = new Student();
m(o);
```

由于 Student 的实例也是 Object 的实例，所以，语句 Object o = new Student() 是合法的，它称为*隐式转换*。

假设想使用下面的语句把对象引用 o 赋值给 Student 类型的变量：

```java
Student b = o;
```

在这种情况下，将会发生编译错误。Student 对象总是 Object 的实例，但是 Object 对象不一定是 Student 的实例。即食可以看到 o 实际上是一个 Student 对象，但是编译器还没有聪明到认识到这一点。为了告诉编译器 o 就是一个 Student 对象，就要使用*显示转换*。它的语法与基本类型转换的语法很类似，只需要用圆括号把目标对象的类型括起来，然后放到要转换的对象前面。

```java
Student b = (Student)o;
```

总是可以将一个子类的实例转换为一个父类的变量，称为*向上转换*，因为子类的实例总是它的父类的实例。当把一个父类的实例转换为它的子类变量(向下转换)时，必须使用转换标记来进行显式转换，向编译器表明你的意图。为了使转换成功，必须确保要抓换的对象是子类的一个实例。如果父类对象不是子类的一个实例，就会出现一个运行时异常 ClassCastExpection。

例如，如果一个对象不是 Student 的实例，但是它被强制转换成了 Student 类型并且访问了，就会抛出这个异常。下面是一个安全的抓换方法，这里就体现出来了 instanceof 关键字的重要性。

```java
void someMethod(Object myObject) {
    if (myObject instanceof Circle) {
        System.out.println("The circle diameter is " + ((Circle)myObject).getDiameter());
    }
}
```

为什么不在一开始就把 myObject 定义为 Circle 类型呢？为了能够进行通用程序设计，一个好的做法事把变量定义位符类型，这样，它就可以接受任何子类型的对象。

> `instanceof` 是关键字，关键字里面的每一个字母都是小写的。

下面的程序演示了多态和类型转换。程序创建两个对象 circle 和 rectangle，然后调用 displayObject 方法显示它们。如果对象是一个圆，displayObject 方法显示它的面积和周长，而如果对象是一个矩形，这个方法显示它的面积。

```java
public class CastingDemo {
    public static void main(String[] args) {
        Object o1 = new Circle(1);
        Object o2 = new Rectangle(1, 1);
        displayObject(o1);
        displayObject(o2);
    }
    
    public static void displayObject(Object object) {
        if (object instanceof Circle) {
            System.out.println("the circle area is " + ((Circle)object).getArea());
        }
        else if (object instanceof Rectangle) {
            System.out.println("The rectangle area is " + ((Rectangle)object).getArea());
        }
    }
}
```

转换一个对象引用不会创建一个新的对象。例如：

```java
Object o = new Circle();
Circle c = (Circle)o;	// No object is created
```

现在，引用变量 o 和 c 指向同一个对象。

### Obejct 类的 equals 方法

> 如同 toString 方法，equals 方法是定义在 Object 中的

它的签名和实现是

```java
public boolean equals(Object o) {
    return (this == obj);
}
```

判断两个对象是否相等的语法是：

```java
o1.equals(o2);
```

这个实现使用 `==` 操作符检测两个引用变量是否指向同一个对象。因此，应该在自己的自定义类中重写这个方法，以测试两个不同的对象是否具有相同的内容。

equals 方法在 Java API 的许多类中被重写，比如 java.lang.String 和 java.util.Date，用于比较两个对象的内容是否相等。之前我们比较过两个字符串，String 类中的 equals 方法继承自 Object 类，然后在 String 类中被重写，使之能够检验两个字符串的内容是否相等。

可以重写 Circle 类中的 equals 方法，基于圆的半径比较两个圆是否相等。

```java
@Override
public boolean equals(Object o) {
    if (o instanceof Circle)
        return radius == ((Circle)o).radius;
    else
        return false;
}
```

> 比较操作符用来比较两个基本类型的值是否相等，或者判断两个对象是否具有相同的引用。如果想让 equals 方法能够判断连个对象是否具有相同的内容，可以在定义这些对象的类时，重写 Circle 类中的 equals 方法。操作符 == 要比 equals 方法的功能强大些，因为 == 操作符可以检测两个引用变量是否指向同一个对象。
>
> **在子类中，使用签名 equals(SomeClassName obj) 重写 equals 方法是一个常见错误，应该使用 equals(Object obj)**

### ArrayList 类

> ArrayList 对象可以用于存储一个对象列表 

可以创建数组存储对象，但是数组一旦创建，大小就固定了。Java 提供了 ArrayList 类，可以用来存储不限定个数的对象。

ArrayList 是一种泛型类，具有一个泛型类型 E。创建一个 ArrayList 时，可以指定一个具体的类型来替换 E。例如，下面语句创建一个 ArrayList，并且将其引用赋值给变量 cities。该 ArrayList 对象可以用于存储字符串。

```java
ArrayList<String> cities = new ArrayList<String>();
```

下面语句创建一个 ArrayList 并且将其引用赋值给变量 dates。该 ArrayList 对象可以用于存储日期。

```java
ArrayList<java.util.Date> dates = new ArrayList<java.util.Date> ();
```

> 从 JDK7 开始，语句
>
> ```java
> ArrayList<AConcreteType> list = new ArrayList<AConcreteType>();
> ```
>
> 可以简化为
>
> ```java
> ArrayList<AConcreteType> list = new ArrayList<>();
> ```
>
> 由于使用了*类型推导*的特征，构造方法中不再要求给出具体类型。

下面是使用 ArrayList 来存储对象的一个实例

```java
import java.util.ArrayList;

public class TestArrayList {
    public static void main(String[] args) {
        ArrayList<String> cityList = new ArrayList<>();
        
        cityList.add("London");
        cityList.add("Tianjin");
        cityList.add("Wuhan");
        System.out.println(cityList.size() + cityList.contains("Beijing") + cityList.indexOf("Tianjin") + cityList.isEmpty());
        
        cityList.remove("London");
        cityList.remove(0);
        System.out.println(cityList);
        for(int i = cityList.size() - 1; i >= 0; i--) {
            cityList.get(i);
        }
        
        ArrayList<Circle> list = new ArrayList<>();
        
        list.add(new Circle(2));
        list.add(new Circle(3));
        
        System.out.println("The area of the circle? " + list.get(0).getArea());
    }
}
```

下面给出一个程序，提示用户输入一个数字序列，然后显示该序列中的不同数字。

```java
import java.util.ArrayList;
import java.util.Scanner;

public class DistinctNumbers {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        
        Scanner input = new Scanner(System.in);
        System.out.print("Enter integers (input ends with 0): ");
        int value;
        
        do {
            value = input.nextInt();
            
            if(!list.contains(value) && value != 0)
                list.add(value);
        } while (value != 0);
        
        for(Integer i: list) System.out.print(i + " ");
    }
}
```

### 关于列表的一些方法

从一个对象数组创建一个数组列表，或者相反。

```java
String[] array = {"red", "green", "blue"};
ArrayList<String> list = new ArrayList<>(Arrays.asList(array));
String[] array1 = new String[list.size()];
list.toArray(array1);
```

如果列表中的元素是可以比较的，那么可以使用 java.util.Collections 里面的 sort 来进行排序。

```java
Integer[] array = {3, 5, 95, 4, 15, 34, 3, 6, 5};
ArrayList<Integer> list = new ArrayList<>(Arrays.asList(array));
java.util.Collections.sort(list);
System.out.println(list);
```

可以使用 max 和 min 来分别返回列表中的最大和最小元素。shuffle 可以打乱元素。

```java
Integer[] array = {3, 5, 95, 4, 15, 34, 3, 6, 5};
ArrayList<Integer> list = new ArrayList<>(Arrays.asList(array));
java.util.Collections.max(list);
java.util.Collections.min(list);
java.util.Collections.shuffle(list);
System.out.println(list);
```

### 自定义一个栈类

```java
import java.util.ArrayList;

public class MyStack {
    private ArrayList<Object> list = new ArrayList<>();
    
    public boolean isEmpty() {
        return list.isEmpty();
    }
    
    public int getSize() {
        return list.size();
    }
    
    public Object peek() {
        return list.get(getsize() - 1);
    }
    
    public Object pop() {
        Object o = list.get(getSize() - 1);
        list.remove(getSize() - 1);
        return o;
    }
    
    public void push(Object o) {
        list.add(o);
    }
    
    @Override
    public String toString() {
        return "stack: " + list.toString();
    }
}
```

### protected 数据和方法

> 一个类中的受保护成员可以从子类中访问

让数据可以从不同包的子类访问。

`private` 可以在同一个类里面访问，`default` 可以在同一个包里面访问，`protected` 可以在不同包的子类中访问，`public` 只要编译了就能访问。

想让一个类的继承类使用数据和方法，但是不想让用户使用，则把成员声明为 `protected`。

### 防止继承和重写

> 一个被 final 修饰的类和方法都不能被继承。被 final 修饰的数据域是一个常数。

有时候，希望防止类被继承。在这种情况下，使用 final 修饰符表明一个类是最终类，是不能作为父类的。

```java
public final class A {
    // ...
}
```

也可以定义一个方法是最终的，防止被子类重写：

```java
public class Test {
    public final void m() {}
}
```

这里 m 不再是一个虚函数。Chapter XII 异常处理和文本 IO

在程序运行过程中，如果 JVM 检测到一个不可能执行的操作，就会出现*运行时错误*。例如，如果使用一个越界的下标访问数组，程序就会产生一个 `ArrayIndexOutOfBoundException` 的运行时错误。如果输入整数的时候输入了一个double类型的小数，就会得到一个运行时错误。

在 Java 中，运行时错误将会作为异常抛出。异常就是一种对象，表示阻止正常运行的错误或者情况。如果异常没有被处理，那么程序将会非正常中止。

### 异常处理概述

为了演示异常处理，我们先考虑下面的例子。

```java
import java.util.Scanner;

public class Quotient {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        
        System.out.print("Enter two integers: ");
        int number1 = input.nextInt();
        int number2 = input.nextInt();
        
        System.out.println(number1 + " / " + number2 + " is " + (number1 / number2));
    }
}

// Input: 3 0
// Output: Excetion in thread "main" java.lang.ArithmetricException: ...
```

如果输入 0 赋值给第二个数字，那就会产生一个运行时错误，因为不能用一个整数除以 0。

**注意，一个浮点数除以 0 不会产生异常**

解决这个问题的一个简单方法就是添加一个 if 语句来测试第二个数字。

```java
import java.util.Scanner;

public class QuotientWithIf {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        
        System.out.print("Enter two integers: ");
        int number1 = input.nextInt();
        int number2 = input.nextInt();
        
        if (number2 != 0)
            System.out.println(number1 + " / " + number2 + " is " + (number1 / number 2));
        else
            System.out.print("Divisor cannot be zero");
    }
}
```

这里我们让一个方法去计算商

```java
import java.util.Scanner;

public class QuotientWithMethod {
    public static int quotient(int number1, int number2) {
        if (number2 == 0) {
            System.exit(1);
        }
        
        return number1 / number2;
    }
}
```

这是不对的，至少我们不应该让一个非主方法去结束程序。

所以这里引入异常和处理：

```java
import java.util.Scanner;

public class QuotientWithException {
    public static int quotient(int number1, int number2) {
        if (number2 == 0)
            throw new ArithmetricException("Divisor cannot be zero");
        
        return number1 / number 2;
    }
    
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        
        System.out.print("Enter two integers: ");
        int number1 = input.nextInt();
        int number2 = input.nextInt();
        
        try {
            int result = quotient(number1, number2);
        }
        catch (ArithmeticException ex) {
            // ...
        }
        // it continues...
    }
}
```

这种情况下，抛出的值为 `new rithmetricException("Divisor cannot be zero")` 

异常就是一个从异常类创建的对象，在这种情况下，异常类就是 `java.util.ArithmeticException` 构造方法 ArithmeticException(str) 被调用来构造一个异常对象。

当异常被抛出时，正常的执行流程被中断，异常从一个地方传递到另一个地方。调用方法的语句包含在一个 try 块和一个 catch 块中。try 块包含了正常情况下执行的代码。异常被 catch 块所捕获。catch 块中的代码被执行以处理异常。之后，catch 块后面的语句正常执行。

throw 语句类似于方法的调用，但是不同于调用方法的是，它调用的是 catch 块。catch 块就行带参数的方法定义，这些参数匹配抛出的值的类型。但是，它不像方法，在执行完 catch 块之后，程序控制不返回到 throw 语句，而只执行 catch 块之后的语句。

catch 块的头部形式类似：

```java
catch (ArithmeticException ex)
```

其中 ex 的作用像是方法中的参数，所以它也被称为 catch 块的参数。ex 之前的类型指定了 catch 块可以不获得异常类型。一旦捕获该异常，就能从 catch 块体中的参数访问这个抛出的值。

总之，一个 try-throw-catch 的模板可能如下所示：

```java
try {
    Code to run:
    A statement or a method that may throw an exception;
    More code to run;
} catch (type ex) {
    Code to process the exception;
}
```

一个异常可能是通过 try 块中的 throw 语句直接抛出，或者调用一个可能会抛出异常的方法而抛出。

main 方法调用 quotient。如果求商方法正常执行，它会返回一个值给调用者。这个调用者的 catch 块处理该异常。

异常处理能使方法抛出一个异常给它的调用者，并由调用者处理该异常。如果没有这个能力，那么被调用的方法就必须自己处理异常或者终止该程序。被调用的方法通常不知道在出错的情况下该做些什么。库方法可以检测出错误，但是只有调用者才知道出现错误是要做些什么。异常处理最根本的又是就是将检测错误从处理错误中分离出来。

很多库方法都会抛出异常。

```java
import java.util.*;

public class InputMismatchExceptionDemo {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        boolean continueInput = true;
        
        do {
            try {
                System.out.println("Enter an integer: ");
                int number = input.nextInt();
                
                System.out.println("The number entered is " + number);
                
                continueInput = false;
            } catch (InputMismatchException ex) {
                System.out.println("Try again.");
                input.nextLine();	// 注意清除 buffer!
            }
        } while (continueInput);
    }
}
```

当执行 input.nextInt() 时，如果键入的不是一个整数，就会产生一个对应的异常。现在，catch 块中的语句被执行，用户可以输入一个新行。

### 异常类型

> 异常是对象，而对象都采用类来定义。异常的根类是 `java.lang.Throwable`

```
Object <- Throwable <- Exception <- ClassNotFoundException
							  <- IOException
                                 <- RuntimeException <- ArithmeticException
                                 				   <- NullPointerException
                                 				   ...
                                  ...
                    <- Error <- LinkageError
                    		 <- VirtualMachineError
                    		 ...
```

- 系统错误 是由 JVM 抛出的，用 Error 类表示。Error 类描述的是内部系统错误。这样的错误很少发生。如果发生，除了同志用户以及尽量稳妥地终止程序外，几乎什么也不能做。
- 异常 用 Exception 类表示。
- 运行时异常 用 RuntimeException 类表示。它描述的是程序设计错误，比如类型转换、访问越界或者数值错误。表示编程错误。

RuntimeException / Error 以及他们的子类都称为*免疫异常*。所有其他异常都称为*必检异常*，意味着编译器会强制程序员检查并通过 try-catch 块处理它们。

### 关于异常处理的更多讨论

前面概述了异常处理，同时介绍了几个预定义的异常类型。本节将对异常处理进行深入讨论。

Java 的异常处理模型基于 declare-throw-catch 的操作。

#### 声明异常

当前运行的某个语句一定属于某个方法。Java 解释器调用 main 方法开始执行一个程序。每个方法都必须声明它可能抛出的必检的异常类型。这称为*声明异常*。因为任何代码都可能发生系统错误和运行时错误，因此 Java 不要求在方法中显式声明 Error 和 RuntimeException。然而，方法要抛出的其他异常都必须在方法头中显式声明。

为了声明一个异常，就要在方法头中使用关键字 throws

```java
public void myMethod() throws IOException
```

关键字 throws 表明 myMethod 方法可能会抛出异常 IOException。如果方法可能会抛出多个异常，就可以在关键字 throws 后面添加一个用逗号分割的异常列表：

```java
public void myMethod()
    throws Exception1, Exception2, ExceptionN
```

#### 抛出异常

检测到错误的程序可以创建一个合适的异常类型的实例并抛出它，这称为*抛出一个异常*。

假如程序发现传递给方法的参数和方法的合约不符，这个程序就可以创建 IllegalArgumentException 的一个实例并抛出它。

```java
IllegalArgumentException ex = new IllegalException("Wrong Argument");
throw ex;
```

或者这样：

```java
throw new IllegalArgumentException("Wrong Argument");
```

> IllegalArgumentException 是 Java API 中的一个异常类。
>
> 声明异常的关键字是 throws，抛出异常的关键字是 throw

#### 捕获异常

可以用 try-catch 块捕获一个异常

```java
try {
    statements;
} catch (Exception1 exVar1) {
    handler1;
} catch (Exception2 exVar2) {
    handler2;
} catch (ExceptionN exVarN) {
    handlerN;
}
```

如果执行 try 的时候没有出现异常，那么就跳过 catch。

如果 try 中抛出了异常，那么 Java 就会跳过 try 块中剩余的语句，然后开始查找处理这个异常的代码。

从当前的方法起，沿着方法调用链，按照异常的反向传播方式找到对应的处理器，然后从第一个开始检查到最后一个 catch 块，如果没有发现异常处理器就退出这个方法，然后传递给这个方法的调用者。最终传递到 JVM 时，程序就会报错然后打印出错误信息。

查找处理器的过程被称为*捕获一个异常*。

> 各种异常从一个共同的父类中派生。如果一个 catch 块可以捕获一个父类的异常对象，它就能捕获所有子类的异常对象。
>
> catch 块中异常被指定的顺序是非常重要的。如果父类的 catch 块出现在子类的 catch 块之前，就会导致编译错误。例如先 catch Exception 再 catch RuntimeException 就会出现错误。

> Java 强制程序员处理必检异常。如果方法声明了一个必检异常，那么就必须在 try-catch 中调用它，或者在调用方法中声明会抛出的异常。例如，假定方法 p1 调用方法 p2，而 p2 可能会抛出一个必检异常，就必须编写对应代码。
>
> ```java
> void p1() {
>  try {
>      p2();
>  } catch (IOException ex) {
>      ...
>  }
> }	// 捕获
> 
> void p1() throws IOException {
>  p2();
> }	// 抛出
> ```
>
> 

对于使用同样的代码处理多种异常的情况，可以使用 JDK7 的multi-catch 简化异常的代码编写。

```java
catch (Exception1 | Exception2 | Exceptionk ex) {}
```

#### 从异常中获取信息

异常对象中包含关于异常的有价值的信息。可以利用下面这些 `java.lang.Throwable` 类中的实例方法来获取有关异常的信息。

```java
java.lang.Throwable
    +getMessage(): String	// 返回构造方法里的 str
    +toString(): String	// 返回异常类全名、": "、getMessage
    +printStackTrace(): void
    +getStackTrace(): StackTraceElement[]
```

下面是一个例子，它使用 Throwable 中的方法来显示异常信息。

```java
public class TestException {
    public static void main(String[] args) {
        try {
            System.out.println(sum(new int[] {1,2,3,4,5}));
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("\n" + ex.getMessage());
            System.out.println("\n" + ex.toString());
            System.out.println("\nTrace Info Obtained from getStackTrace");
            StackTraceElement[] traceElements = ex.getStackTrace();
            for (int i = 0; i < traceElements.length; i++)  {
                System.out.println("method " + traceElements[i].getMethodName() + "\n(" + traceElements[i].getClassName() + ":\n" + traceElements[i].getLineNumber() + ")");
            }
        }
    }
    
    private static int sum(int[] list) {
        int result = 0;
        for (int i = 0; i <= list.length; i++) result += list[i];
        return result;
    }
}
```

#### 示例：声明、抛出和捕获异常

本例改写 Circle 类的 setRadius 方法来演示如何声明、抛出和捕获异常。如果半径是负数，那么新的 setRadius 方法会抛出一个异常。

```java
public class CircleWithException {
    private double radius;
    private static int numberOfObjects = 0;
    public CircleWithException() {
        this(1.0);
    }
    
    public CircleWithException(double newRadius) {
        setRadius(newRadius);
        numberOfObejcts++;
    }
    
    public int getRadius() {
        return radius;
    }
    
    public void setRadius(double newRadius)
        throws IllegalArgumentException {
        if (newRadius < 0) throw new IllegalArgumentException("Radius < 0");
        this.radius = newRadius;
    }
    
    public static int getNumberOfObjects() {
        return numberOfObjects;
    }
    
    public double findArea() {
        return radius * radius * 3.14159;
    }
}
```

然后是一个全新的测试程序。

```java
public class TestCircleWithException {
    public static void main(String[] args) {
        try {
            CircleWithException c1 = new CircleWithException(-5);
        } catch (IllegalArgumentException ie) {
            System.out.println(ex);
        }
        
        System.out.println("Number of objects created: " + CircleWithException.getNumberOfObjects());
    }
}
```

加入了一个新的构造方法，如果半径为负就抛出异常。

IllegalArgumentException 是 RuntimeException 的子类，所以不使用 try 语句，该测试程序也能编译成功。

### finally 子句

有时候，不论异常是否出现或者被捕获，都希望执行某些代码。finally 子句可以用来实现这个目的。

```java
try {
    statements;
} catch (TheException ex) {
    handling ex;
} finally {
    finalStatements;
}
```

在任何情况下，finally 中的代码都会执行，不论 try 块中是否出现异常或者是否被捕获。

- 如果 try 中没有出现异常，执行 finalStatements，然后执行 try 语句的下一条语句。
- 如果 try 块中有一条语句引起了异常并被 catch 块捕获，会跳过 try 块的其他语句，执行 catch 块和 finally 子句。执行 try 语句后的下一条语句。
- 如果 try 块中的一条语句引起异常，但是没有被任何 catch 块捕获，就会跳过 try 块中的其他语句，执行 finally 子句，并且将异常传递给这个方法的调用者。

即使在到达 finally 块之前有一个 return 语句，finally 块还是会执行。

> 使用 finally 子句时可以略去 catch 块

### 何时使用异常

> 当错误需要背方法的调用者处理的时候，方法应该抛出一个异常。

try 块包含正常情况下执行的代码。catch 块包含异常情况下执行的代码。异常处理将错误处理代码从正常的变成任务中分离出来，这样可以使程序更易读易修改。但是，由于异常处理需要初始化新的异常对象，需要从调用栈返回，而且还得找调用方法链，所以消耗的资源比较大。

想让发生异常的方法的调用者处理异常，应该创建一个异常对象并将其抛出。如果能在发生异常的方法中处理异常，那么不需要抛出或者使用异常。

一般来说，一个项目中多个类都会发生的异常应该考虑设计为一个异常类。**对于发生在个别方法中的简单错误最好进行局部处理，无须抛出异常。**

何时使用 try-catch 块？处理不可预料的错误情况的时候应该使用它，它是保底而不是手段，不是万不得已不要轻易使用。

```java
try {
    System.out.println(refVar.toString());
} catch (NullPointerException ex) {
    System.out.println("refVar is null");
}
```

上面的代码就是一种滥用。我们完全可以用下面的代码代替：

```java
if (refVar != null) System.out.println(...);
else System.out.println(...);
```

### 重新抛出异常

> 如果异常处理器不能处理一个异常，或者只是简单地希望它的调用者胡一刀该异常，Java 允许该异常处理器重新抛出异常。

```java
try {
    statements;
} catch (TheException ex) {
    perform operations;
    throw ex;
}
```

语句 throw ex 重新抛出异常给调用者，以便调用者的其他处理器获得 ex。

### 链式异常

> 与另一个异常一起抛出一个异常，构成了链式异常。

catch 块可以重新抛出异常。有时候，可能需要和最初的异常一起抛出一个新异常，称为链式异常。

```java
public class ChainedExceptionDemo {
    public static void main(String[] args) {
        try {
            method1();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    
    public static void method1() throws Exception {
        try {
            method2();
        } catch (Exception ex) {
            throw new Exception("New info from method1", ex);
        }
    }
    
    public static void method2() throws Exception {
        throw new Exception("New info from method2");
    }
}
```

### 创建自定义异常类

> 可以通过继承 java.lang.Exception 来定义一个自定义异常类。

在之前的异常版 Circle 类中，我们现在希望 setRadius 方法抛出一个异常。现在我们希望把这个半径也传递给处理器，那么就需要创建自定义异常类。

```java
public class InvalidRadiusException extends Exception {
    private double radius;
    
    public InvalidRadiusException(double radius) {
        super("Invalid radius " + radius);
        this.radius = radius;
    }
    
    public double getRadius() {
        return radius;
    }
}
```

这个自定义异常类继承自 java.lang.Exception。而 Exception 继承自 Throwable，Exception 中的所有方法都是从 Throwable 继承来的。

它有下面三种构造方法：

```java
java.lang.Exception
    +Exception()
    +Exception(message: String)
    +Exception(message: String, cause: Exception)
```

要创建一个 InvalidRadiusException，需要传递一个半径。所以，setRadius 方法可以如下所示：

```java
public class TestCircleWithCustomException {
    public static void main(String[] args) {
        try {
            new CircleWithCustomException(5);
            new CircleWithCustomException(-5);
            new CircleWithCustomException(0);
        } catch (InvalidException ex) {
            System.out.println(ex);
        }
        
        System.out.println("Number of objects created: " + CircleWithCustomException.getNumberOfObjects());
    }
}

class CircleWithCustomException {
    private double radius;
    
    private static int numberOfObjects = 0;
    
    public CircleWithCustomException() throws InvalidRadiusException {
        this(1.0);
    }
    
    public CircleWithCustomException(double newRadius) throws InvalidRadiusException {
        setRadius(newRadius);
        numberOfObjects++;
    }
    
    public double getRadius() {
        return radius;
    }
    
    public void setRadius(double newRadius) throws InvalidRadiusException {
        if (newRadius >= 0) radius = newRadius;
        else throw InvalidRadiusException(newRadius);
    }
    
    public static int getNumberOfObjects() {
        return numberOfObjects;
    }
    
    public double findArea() {
        return radius * radius * Math.PI;
    }
}
```

### FIle 类

> File 类包含了一个文件 / 目录的属性，以及对文件 / 目录进行改名和删除的方法

*绝对文件名*由文件名和它的完整路径以及驱动器字母组成，例如`c:\book\Welcome.java` 或者 `/home/liang/book/Welcome.java` 

*相对文件名*是相对于当前工作目录而言的。例如`Welcome.java`，如果现在的目录是 `/pwd`，那么它的含义是 `/pwd/Welcome.java`。

File 类提供文件处理的抽象。

```java
java.io.File
    +File(pathname: String)
    +File(parent: String, child: String)
    +File(parent: File, child: String)	// 在目录 parent 下创建一个子路径的 File 对象
    
    +exists(): boolean
    +canRead(): boolean
    +canWrite(): boolean
    +isDirectory(): boolean
    +isFile(): boolean
    +isAbsolute(): boolean	// 返回是否是绝对路径创建的
    +isHidden(): boolean
    
    +getAbsolutePath(): String
    +getCanonicalPath(): String
    +getName(): String
    +getPath(): String
    +getParent(): String	// 返回完整父目录
    
    +lastModified(): long	// 最后修改时间，依旧是 GMT 1970.1.1 0:0:0 开始的毫秒数
    +length(): long
    +listFile(): File[]	// 返回一个目录 File 对象下面的文件
    +delete(): boolean
    
    +renameTo(dest: File): boolean
    +mkdir(): boolean
    +mkdirs(): boolean
```

xxxxxxxxxx import java.util.concurrent.*;​public class ParallelMax {    public static void main(String[] args) {        int[] list = new int[9000000];        // 填充 list...                RecursiveTask<Integer> task = new MaxTask(list, 0, list.length);        ForkJoinPool pool = new ForkJoinPool();        int max = pool.invoke(task); // 执行并获取结果    }        private static class MaxTask extends RecursiveTask<Integer> {        private final static int THRESHOLD = 1000;        private int[] list;        private int low;        private int high;                public MaxTask(int[] list, int low, int high) {            this.list = list; this.low = low; this.high = high;        }                @Override        protected Integer compute() {            if (high - low < THRESHOLD) {                // 规模较小，顺序查出最大值并返回                int max = list[low];                for (int i = low + 1; i < high; i++)                     if (list[i] > max) max = list[i];                return max;            } else {                // 分割子问题                int mid = (low + high) / 2;                RecursiveTask<Integer> left = new MaxTask(list, low, mid);                RecursiveTask<Integer> right = new MaxTask(list, mid, high);                                right.fork(); // 放入池中并发执行                left.fork();                                // 合并结果                return Math.max(left.join(), right.join());            }        }    }}java

> Windows 中使用 `\` 当作分隔符，但是 Java 中分隔符是一个特殊符号，应该用 `\\` 表示。
>
> 构建一个 File 实例并不会在机器上创建一个文件。不管它是否存在，都可以创建一个 File 对象。

在程序中，不要使用绝对文件名。应该使用相对路径，这样程序才具有可移植性。

```java
public class TestFileClass {
    public static void main(String[] args) {
        java.io.File = new java.io.File("image/us.gif");
        System.out.println(...);
    }
}
```

### 文件输入和输出

> 使用 Scanner 类从文件中获取文本数据，使用 PrintWriter 类向文本文件写入数据。

#### 使用 PrintWriter 写数据

`java.io.PrintWriter` 类可以用来创建一个文件并向文本文件写入数据。

```java
PrintWriter output = new PrintWriter(filename);
```

然后，可以调用 PrintWriter 上的 print、println 和 printf 方法向文件写入数据。这几个方法和之前在 System.out 里面用的一模一样。

```java
public class WriteData {
    public static void main(String[] args) throws java.io.IOException {
        java.io.File file = new java.io.File("scores.txt");
        if (file.exists()) {
            System.out.println("File already exists");
            System.exit(1);
        }
        
        java.io.PrintWriter output = new java.io.PrintWriter(file);
        
        output.print("John T Smith ");
        output.println(90);
        
        output.close();
    }
}
```

**必须使用 close() 方法关闭文件，如果没有这个方法，数据就不能正确地保存在文件中。**

#### 使用 try-with-resources 自动关闭资源

因为大家经常忘记 close 文件流，所以下面介绍一个可以自动关闭文件的语法： try-with-resources

```java
public class WriteDataWithAutoClose {
    public static void main(String[] args) throws Exception {
        java.io.File file = new java.io.File("scores.txt");
        if (file.exists()) {
            System.out.println("File already exists");
            System.exit(0);
        }
        
        try (java.io.PrintWriter output = new java.io.PrintWriter(file)；) {
            output.print("John T Smith");
            output.println(90);
        }
    }
}
```

关键字 try 后面声明和创建了一个资源。注意，资源放在括号中。资源必须是 AutoCloseable 的子类型，比如 PrinterWriter，才具有一个 close() 方法。资源的声明和创建必须在同一行语句中，并且可以在括号中进行多个资源的声明和创建。

紧接着资源声明的块中的语句使用资源。块结束后，资源的 close() 方法自动掉噢那个以关闭资源。

**在 try-with-resources 语句中可以略去 catch 子句**

#### 使用 Scanner 读取数据

Scanner 可以将输入分为由空白字符分割的标记。为了能从键盘读取，需要为 System.in 创建一个 Scanner，如下所示:

```java
Scanner input = new Scanner(System.in);
```

为了从文件中读取，需要为文件创建一个 Scanner，如下所示：

```java
Scanner input = new Scanner(new File(filename));
```

下面的例子创建了一个 Scanner 的实例，并从文件 scores.txt 中读取数据。

```java
import java.util.Scanner;

public class ReadData {
    public static void main(String[] args) throws Exception {
        java.io.File file = new java.io.File("scores.txt");
        
        Scanner input = new Scanner(file);
        
        while (input.hasNext()) {
            String firstName = input.next();
            String mi = input.next();
            String lastName = input.next();
            int score = input.nextInt();
            System.out.println(firstName + " " + mi + " " + lastName + " " + score);
        }
        
        input.close();
    }
}
```

whlie 循环中的每次迭代都从文本文件中读取名字、中间名、姓和分数，第 22 行关闭文件。

没有必要关闭输入文件，但是这是一个好选择。可以使用 try-with-resources 语法重写该程序。

#### Scanner 如何工作

一个标记读取方法首先跳过任意分隔符，然后读取一个以分隔符结束的标记。然后，针对使用的方法 nextByte()、nextShort()、nextInt()、nextLong()、nextFloat()、nextDouble()，这个标记就分别被自动地转换为一个 byte、short、int、long、float 或 double 类型的值。

对于 next() 方法而言则没有进行转换。如果标记和期望的类型不匹配，就会抛出一个运行异常 `java.util.InputMismatchException`

next() 和 nextLine() 都会读取一个字符串，next 读取一个由分隔符分割的字符串，但是 nextLine 会读取一个以换行符结束的行。

为了得到特定平台上的行分隔符，可以使用

```java
String lineSeparator = System.getProperty("line.separator");
```

基于标记的读取方法不能读取标记后面的分隔符，如果在基于标记的读取方法后调用 nextLine()，该方法从这个分隔符开始，到这行的行分隔符结束的字符。这个行分隔符也被读取，但是不是 nextLine() 返回值的一部分。

假设一个名为 test.txt 的文本文件包含一行

```
34 567
```

在执行完下面的代码之后

```java
Scanner input = new Scanner(new File("test.txt"));
int intValue = input.nextInt();
String line = input.nextLine();
```

intValue 的值为 34，line 包含的内容则是 ' ' '5' '6' '7' 这四个字符。

但是假如是由键盘输入的内容，34 \n 567 \n ，则会导致 line 为空，因为读取的 buffer 指针恰好停在了第一个 `\n` 前面。

可以使用 Scanner 类从文件或者键盘读取数据。也可以使用 Scanner 类从一个字符串中扫描数据。

```java
Scanner input = new Scanner("13 14");
int sum = input.nextInt() + input.nextInt();
System.out.println("Sum is " + sum);
```

#### 实例：替换文本

假设要编写一个名为 ReplaceText 的程序，用一个新字符串替换文本文件中所有出现某个字符串的地方，文件名和字符串都作为命令行参数传递：

```bash
java ReplaceText sourceFile targetFile oldString newString
```

例如，调用

```bash
java ReplaceText FormatString.java t.tt StringBuilder StringBuffer
```

就会用 StringBuffer 替换 FormatString.java 中所有出现的 StringBuilder，然后将新文件保存在 t.txt 中。

```java
import java.io.*;
import java.util.*;

public class ReplaceText {
    public static void main(String[] args) throws Exception {
        if (args.length != 4) {
            System.out.println("Usage: java ReplaceText sourceFile targetFile oldString newString");
            System.exit(1);
        }
        
        File sourceFile = new File(args[0]);
        if (!sourceFIle.exists()) {
            System.out.println("Source file " + args[0] + " does not exist");
            System.exit(2);
        }
        
        File targetFile = new FIle(args[1]);
        if (target.exists()) {
            System.out.println("Target file " + args[1] + "already exists");
            System.exit(3);
        }
        
        try (
            PrintWriter output = new PrintWriter(targetFile);
        ) {
            while (input.hasNext()) {
                String s1 = input.nextLine();
                String s2 = s1.replaceAll(args[2], args[3]);
                output.println(s2);
            }
        }
    }
}
```

### 从 Web 上读取数据

为了让应用程序从一个 URL 获取数据，首先要使用 java.net.URL 类的以下构造方法创建一个 URL 对象

```java
public URL(String spec) throws MalformedURLException
```

例如，下面给出的语句为 `httpes://www.google.com/index.html` 创建一个 URL 对象。

```java
try {
    URL url = new URL("https://www.google.com/index.html");
} catch (MalformedURLException ex) {
    ex.printStackTrace();
}
```

如果 URL 字符串出语法错误的话，将会抛出一个 MalformedURLException。另外，要想让 URL 类识别出一个有效的 URL，前缀 http:// 是必需的。

创建了一个 URL 对象之后，可以使用 URL 类中定义的 openStream() 方法来打开一个输入流，并且使用这个输入流来创建一个 Scanner 对象。

```java
Scanner input = new Scanner(url.openStream());
```

现在可以从输入流中获取数据了。

```java
import java.util.Scanner;

public class ReadFileFromURL {
    public static void main(String[] args) {
        System.out.print("Enter a URL: ");
        String URLString = new Scanner(System.in).next();
        
        try {
            java.net.URL url = new java.net.URL(URLString);
            int count = 0;
            Scanner input = new Scanner(url.openStream());
            while (input.hasNext()) {
                String line = input.nextLine();
                count += line.length();
            }
            
            System.out.println("The file size is " + count + " characters");
        } catch (java.net.MalformedURLException ex) {
            System.out.println("Invalid URL");
        } catch (java.io.IOException ex) {
            System.out.println("IO");
        }
    }
}
```

程序提示用户输入一个字符串，然后创建一个 URL 对象。如果没有正确表示 URL，则构造方法将抛出一个 java.net.MalformedURLException。

程序从 URL 的输出流中创建一个 Scanner 对象。

### Web 爬虫

程序沿着 URL 来遍历 Web。为了保证每个 URL 只被遍历一次，程序包含两个网址的列表。一个列表保存将被遍历的网址，另外一个保存已经被遍历的网址。程序的算法描述如下：

```java
import java.util.Scanner;
import java.util.ArrayList;

public class WebCrawler {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Enter a URL: ");
        String url = input.nextLine();
        crawler(url);
    }
    
    public static void crawler(String startingURL) {
        ArrayList<String> listOfPendingURLs = new ArrayList<>();
        ArrayList<String> listOfTraversedURLs = new ArrayList<>();
        
        listOfPendingURLs.add(startingURL);
        while (!listOfPendingURLs.isEmpty() && listOfTraversedURLs.size() <= 100) {
            String urlString = listOfPendingURLs.remove(0);
            if (!listOfTraversedURLs.contains(urlString)) {
                listOfTraversedURLs.add(urlString);
                System.out.println("Crawl " + urlString);
                
                for (String s: getSubURLs(urlString)) {
                    if (!listOfTraversedURLs.contains(s))
                        listOfPendingURLs.add(s);
                }
            }
        }
    }
    
    public static ArrayList<String> getSubURLs(String urlString) {
        ArrayList<String> list = new ArrayList<>();
        
        try {
            java.net.URL url = new java.net.URL(urlString);
            Scanner input = new Scanner(url.openStream());
            int current = 0;
            while (input.hasNext()) {
                String line = input.nextLine();
                current = line.indexOf("http:", current);
                while (current > 0) {
                    int endIndex = line.indexOf("\"", current);
                    if (endIndex > 0) {
                        list.add(line.substring(current, endIndex));
                        current = line.indexOf("http:", endIndex);
                    } else current = -1;
                }
            }
        } catch (Exception ex) {
            System.out.println("Error: " + ex.getMessage());
        }
        return list;
    }
}
```

简单的 bfs + 字符串截取。上面这个程序其实很逆天，在现代的互联网上啥也干不了。

## Chapter XIII 抽象类和接口

> 父类中定义了相关子类中的共同行为。接口可以用于定义类的共同行为。

### 抽象类

> 抽象类不可以用于创建对象。抽象类可以包含抽象方法，这些方法将在具体的子类中实现。

每个子类都让父类变得更具体、明确。类的设计应该确保父类包含子类的共同特征。把父类抽象到没有具体实例，即没有完成的实现的程度就变成了*抽象类*。

以前我们做 GeometricObject 类的时候就是在子类中实现的 getArea() 和 getPerimeter() 方法。我们那时候不能在 GeometricObject 类里面表示它们，因为父类的数据域没有办法实现它们。现在把它变成抽象类就完美解决了这个问题。

```java
public abstract class GeometricObject {
    private String color = "white";
    private boolean filled;
    private java.util.Date dateCreated;
    
    protected GeometricObject() {
        dateCreated = new java.util.Date();
    }
    
    protected GeometricObject(String color, boolean filled) {
        dateCreated = new java.util.Date();
        this.color = color;
        this.filled = filled;
    }
    
    public String getColor() {
        return color;
    }
    
    public void setColor(String color) {
        this.color = color;
    }
    
    public boolean isFilled() {
        return filled;
    }
    
    public void setFilled(boolean filled) {
        this.filled = filled;
    }
    
    public java.util.Date getDateCreated() {
        return dateCreated;
    }
    
    @Override
    public String toString() {
        return "created on " + dateCreated + "\ncolor " + color + " and filled: " + filled;
    }
    
    public abstract double getArea();
    public abstract double getPerimeter();
}
```

抽象类和常规类很像。只是因为它有抽象方法，所以不能 new 出来。

一个包含抽象方法的类必须声明为抽象类。

抽象类的构造方法定义为 protected，因为它只被子类调用。不过这里你愿意的话定义成 public 也可以。

抽象类定义了子类的共同特征，并且提供了合适的构造方法。我们于是可以得到 Circle 和 Rectangle 的完整代码.

#### 为何使用抽象方法

从下面的例子中就可以看出来定义它们会有什么好处。

```java
public class TestGeometricObject {
    public static void main(String[] args) {
        GeometricObject geoObject1 = new Circle(5);
        GeometricObject geoObject2 = new Rectangle(5, 3);
        
        System.out.println("The two objects have same area?" + equalArea(geoObejct1, geoObject2));
        
        displayGeometricObject(geoObject1);
        displayGeometricObejct(geoObeject2);
    }
    
    public static boolean equalArea(GeometricObject object1, GeometricObject object2) {
        return object1.getArea() == object2.getArea();
    }
    
    public static void displayGeometric(GeometricObject object) {
        System.out.println();
        System.out.println("The area is " + object.getArea());
        System.out.println("The perimeter is " + object.getPerimeter());
    }
}
```

可见创建了抽象类之后在传递参数的时候就可以简洁明了地调用对应的方法。

#### 抽象类的几点说明

- 抽象方法不能包含在非抽象类中。

- 抽象方法是非静态的。

- 抽象类不能使用 `new` 操作符来初始化。但是仍然可以定义它的构造方法。

- 包含抽象方法的类必须是抽象的。

- 可以定义一个不包含抽象方法的抽象类。这个抽象类用于作为新子类的基类。

- 子类可以重写父类的方法并将它定义为抽象的，这很少见，但是它在当父类的方法实现在子类中变得无效时是很有用的。

- 即使子类的父类是具体的，这个子类也可以是抽象的。

- 不能使用 `new` 来创建一个抽象类的实例，但是抽象类确实可以用作一种数据类型。所以下面的语句是正确的：

  ```java
  GeometricObject[] objects = new GeometricObject[10];
  ```

  然后可以创建一个 GeometricObject 具体子类的实例，并将它的引用赋值传递给数组。

  ```java
  objects[0] = new Circle();
  ```

### 实例：抽象的 Number 类

Number 类下派生出了 Double Integer Long Float 之类的数值包装类，这些类的方法，如 `intValue()` 等在 Number 类中被定义为抽象方法。因此 Number 类是一个抽象类。下面是两个类方法的实现：

```java
public byte byteValue() {
    return (byte)intValue();
}

public short shortValue() {
    return (short)intValue();
}
```

Number 定义为数值类的父类，这样可以定义方法来执行数值的共同操作。

```java
import java.util.ArrayList;
import java.math.*;

public class LargestNumber {
    public static void main(String[] args) {
        ArrayList<Number> list = new ArrayList<>();
        list.add(45);
        list.add(3445.53);
        list.add(new BigInteger("343343434333334343334343101"));
        list.add(new BigDecimal("2.090909090000900808909889012343434"));
        
        System.out.println("The largest number is " + getLargestNumber(list));
    }
    
    public static Number getLargestNumber(ArrayList<Number> list) {
        if (list == null || list.size() == 0) return null;
        Number number = list.get(0);
        for (int i = 0; i < list.size(); i++)
            if (number.doubleValue() < list.get(i).doubleValue())
                number = list.get(i);
        
        return number;
    }
}
```

程序创建一个 Number 对象的 ArrayList，向列表中添加一个 Integer / Double / BigInteger / BigDecimal。45 自动转换为 Integer 对象，3445.53 自动转换为 Double 对象。

调用 getLargestNumber 方法返回列表中的最大数值。如果列表为 null 或者列表大小为 0，则 getLargestNumber 方法返回 null。为了找到列表中的最大数值，通过调用数值对象上面的 doubleValue() 方法。

如果 doubleValue() 方法没有在 Number 类中定义，将不能使用 Number 类从各种不同类型的数值中找到最大数值。

#### 实例：Calnedar 和 GregorianCalendar

这部分直接 skip 了，，

### 接口

接口在许多方面都和抽象类很相似，但是它的目的是知名相关或者不相关类的对象的噢女童行为，例如，使用恰当的接口，可以指明这些对象是可比较的、可食用的或者可克隆的。

为了区分接口和类，Java 采用下面的语法类定义接口：

```java
modifier interface InterfaceName {}
```

下面是一个接口的例子：

```java
public interface Edible {
    public abstract String howToEat();
}
```

在 Java 中，接口被看作是一个特殊的类。每个接口被编译为独立的字节码文件。使用接口有点像抽象类。

我们使用 Edible 接口来指定一个对象是否是可食用的。哲学要使用 implements 关键字让对象所属的类实现这个接口。类和接口之间的关系称为*接口继承*。

```java
public class TestEdible {
    public static void main(String[] args) {
        Object[] objects = {new Tiger(), new Chicken(), new Apple()};
        for (int i = 0; i < objects.length; i++) {
            if (objects[i] instanceof Edible)
                System.out.println(((Edible)objects[i]).howToEat());
            if (objects[i] instanceof Animal)
                System.out.println(((Animal)objects[i]).sound());
        }
    }
}
abstract class Animal {
    private double weight;
    
    public double getWeight() {
        return weight;
    }
    
    public void setWeight(double weight) {
        this.weight = weight;
    }
    
    public abstract String sound();
}
                                   
class Chicken extends Animal implements Edible {
    @Override public String howToEat() { return "Chicken: Fry it"; }
    @Override public String sound() { return "Chicken: cock-a-doodle-doo"; }
}
                                   
class Tiger extends Animal {
    @Override public String sound() { return "Tiger: RROOAARR"; }
}
                                   
abstract class Fruit implements Edible {}
class Apple extends Fruit {
    @Override public String howToEat() { return "Apple: Make apple cider"; }
}

class Orange extends Fruit {
    @Override public String howToEat() { return "Orange: Make orange juice"; }
}
                                   
public interface Edible {
    public abstract String howToEat();
}
```

### Comparable 接口

功能就像它的名字。

```java
package java.lang;

public interface Comparable<E> {
    public int compareTo(E o);
}
```

compareTo 方法判断这个对象相对于给定对象 o 的顺序，并且当这个对象小于、等于或大于给定对象时，返回负整数、0 或正整数。

它是一个泛型接口。在实现该接口时，泛型类型被替换成一个具体的类型。Java 类库中很多类实现了 Comparable 接口，比如：

```java
public final class Integer extends Number implements Comparable<Integer> {
    @Override public int compareTo(Integer o) {}
}
```

因此，两个数字是可以比较的，字符串是可比较的，日期也是如此。

`java.util.Arrays.sort(Object[])` 方法就是使用 compareTo 方法来对数组中的对象进行比较和排序。

```java
import java.math.*;

public class SortComparableObjects {
    public static void main(String[] args) {
        String[] cities = {"Savannah", "Boston", "Atlanta", "Tampa"};
        java.util.Arrays.sort(cities);
        for (String city: cities) System.out.print(city + " ");
        System.out.println();
        
        BigInteger[] hugeNumbers = {new BigInteger("1237416316471838213"), new BigInteger("17641757419472467265")};
        java.util.Arrays.sort(hugeNumbers);
        for (BigInteger number: hugeNumbers) System.out.print(nubmer + " ");
    }
}
```

不能使用 sort 方法来对 Rectangle 对象数组进行排序，因为 Rectangle 类没有实现 Comparable 接口。然而，可以定义一个新的 Rectangle 类来实现 Comparable。

```java
public class ComparableRectangle extends Rectangle implements Comparable<ComparableRectangle> {
    public ComparableRectangle(double width, double height) {super(width, height);}
    @Override public int compareTo(ComparableRectangle o) {
        if (getArea() > o.getArea()) return 1;
        else if (getArea() < o.getArea()) return -1;
        else return 0;
    }
    
    @Override public String toString() { return super.toString() + "Area: " + getArea(); }
}
```

接口提供通用程序设计的另一种形式，如果不用接口，很难使用通用的 sort 方法来对对象排序，因为必须使用多重继承才能同时继承 Comparable 和另一个类。

```java
public class SortRectangles {
    public static void main(String[] args) {
		ComparableRectangle[] rectangles = {new ...};
        java.util.sort(rectangles);
    }
}
```

Object 类包含 equals 方法，它的目的就是为了让 Object 类的子类来重写它，以比较对象的内容是否相同。假设 Object 类包含一个类似于 Comparable 接口中所定义的 compareTo 方法，那么 sort 方法就可以用来比较一组任意的对象。Object 类中是否应该包含一个 compareTo 方法尚有争论。

### Cloneable 接口

> Cloneable 接口指定了一个对象可以被克隆

经常希望创建一个对象的拷贝。为了实现这个目的，需要使用 clone 方法并理解 Cloneable 接口。

接口包括常量和抽象方法，但是 Cloneable 是一个特殊情况。它的定义如下：

```java
package java.lang;

public interface Cloneable {}
```

这个接口是空的。一个方法体为空的接口称为标记接口。一个标记接口用来表示一个类拥有某些希望具有的特征。

Date Calendar ArrayList 等类都实现了 Cloneable。

```java
Calendar calendar = new GregorianCalendar(2013, 2, 1);
Calendar calendar1 = (Calendar)calendar.clone();	// 注意 Calendar.clone() 方法的返回值是 Object，需要强转
```

下面是一个 House 类的实现

```java
public class House implements Cloneable, Comparable<House> {
    private int id;
    private double area;
    private java.util.Date whenBuilt;
    
    public House(int id, double area) {
        this.id = id;
        this.area = area;
        whenBuilt = new java.util.Date();
    }
    
    public int getId() { return id; }
    public double getArea() { return whenBuilt; }
    @Override public Object clone() {
        try {
            return super.clone();
        } catch (CloneNotSupportedException ex) {
            return null;
        }
    }
    
    @Override public int compareTo(House o) {
        if (area > o.area) return 1;
        else if (area < o.area) return -1;
        else return 0;
    }
}
```

在 Object 类中定义的 clone 方法头是：

```java
protected native Object clone() throws CloneNotSupportedException;
```

关键字 native 表明这个方法不是用 Java 写的，但它是 JVM 针对本地平台实现的。关键字 protected 限定方法只能在同一个包内或在子类内访问，由于这个原因，House 类必须重写这个方法并将它的可见性修饰符改为 public ，这样，方法就可以在任何一个包中使用。在 House 类中的 clone 方法值需要简单调用 super.clone() 即可。

注意，如果对象不是 Cloneable 类型的话，会抛出 `CloneNotSupportedException` 异常。

现在，可以创建一个 House 类的对象，然后从这个对象创建一个完全一样的拷贝。

```java
House house1 = new House(1, 1750.50);
House house2 = (House)house1.clone();
```

它们是内容相同的两个不同对象。但是 clone 是浅拷贝，里面的引用变量只是简单地被复制，而非递归地创建对应的对象。

如果希望执行深复制，可以这样做：

```java
public Object clone() throws CloneNotSupportedException {
    House houseClone = (House)super.clone();
    houseClone.whenBuilt = (java.util.Date)(whenBuilt.clone());
    return houseClone();
}
```

或者用 try-catch 块。

现在如果使用下面代码来复制一个 House 对象

```java
House house1 = new House(1, 750,50);
House house2 = (House)house1.clone();
```

这时 `house1.whenBuilt == house2.whenBuilt` 的返回值将是 false，因为 Date 对象被重新实例化了。

clone 方法和 Cloneable 接口引发了对一些问题的思考。

- 为什么 Object 类中的 clone 方法定义为 protected，而不是 public ？因为不是每个对象都可以被克隆的。如果子类的对象是可克隆的，Java 的设计者故意强制子类重写该方法。

- 为什么 clone 方法不是定义在 Cloneable 接口中的呢？因为 Java 提供了一个本地方法来执行一个浅复制来克隆一个对象。由于接口中的方法是抽象的，该本地方法不能再接口中实现，因此 Java 的设计者决定在 Object 类中定义和实现本地 clone 方法。

- 为什么 Object 类不实现 Cloneable 接口呢？同第一个问题。

- 如果 House 不实现 Cloneable，将会发生什么？house.cloen() 将会返回 null，因为 `super.clone()` 将抛出一个 CloneNotSupportedException。

- 可以在 House 类中实现 clone 方法，而不调用 Object 类中的 clone 方法。

  ```java
  public Object clone() {
      House houseClone = new House(id, area);
      houseClone.whenBuilt = new Date();
      houseClone.getWhenBuilt().setTime(whenBuilt.getTime());
      
      return houseClone;
  }
  ```

  这种情况下，House 类不用实现 Cloneable 接口，并且需要确保所有的数据域都被正确的复制。使用 Object 类中的 clone() 方法可以避免手工赋值数据域的麻烦。

### 接口和抽象类

> 一个类可以实现多个接口，但是只能继承一个父类。

Java 只允许位类的继承做单一继承，但是允许使用接口做多重继承。

```java
public class NewClass extends BaseClass implements Interface1, ..., InterfaceN {}
```

利用关键字 extends，接口可以继承其他接口。这样的接口称为子接口。

```java
public interface NewInterface extends Interface1, ..., InterfaceN {}
```

一个实现 NewInterface 的类必须实现在 NewInterface 和它 继承来的所有接口中定义的抽象方法。接口可以继承其他接口但不能继承类。一个类可以继承它的父类同时实现多个接口。

**接口没有共同的根**。接口也可以定义一种类型。一个接口类型的变量可以引用任何实现该接口的类的实例。如果一个类实现了一个接口，那么这个接口就类似于该类的一个父类。可以将接口当作一种数据类型使用。将接口类型的变量转换为它的子类。反过来也可以。

> 类名是一个名词，接口名可以是形容词或名词。

通常推荐使用接口而非抽象类，因为接口可以位不相关类定义共同的父类型。接口比类灵活。比如：

```java
abstract class Animal {
    public abstract String howToEat();
}

class Chicken extends Animal {
    @Override public String howToEat() { return "Fry it"; }
}

class Duck extends Animal {
    @Override public String howToEat() { return "Roast it"; }
}
```

假设给定这个继承体系结构，多态使你在一个类型为 Animal 的变量中保存 Chicken 对象或 Duck 对象的引用。JVM 会动态决定对应的 howToEat。

可以定义 Animal 的一个子类，但是假如这里说子类必须是另一种动物，而它不可食用，继承 Animal 类就不合适了。

接口没有这种问题。

```java
public class DesignDemo {
    public static void main(String[] args) {
        Edible stuff = new Chicken();
        eat(stuff);
        
        stuff = new Duck();
        eat(stuff);
        
        stuff = new Broccoli();
        eat(stuff);
    }
    
    public static void eat(Edible stuff) { System.out.println(stuff.howToEat()); }
}

interface Edible { public String howToEat(); }

class Chicken implements Edible {
    @Override public String howToEat() { return "Fry it"; }
}

...
```

为了定义表示可食用对象的一个类，只需要让该类实现 Edible 接口即可。

### 实例：Rational 类

Rational 应该实现 Comparable 接口和 Number 类。

```java
public class Rational extends Number implements Comparable<Rational> {
    private long numerator = 0;
    private long denominator = 1;
    
    public Rational() { this(0, 1); }
    public Rational(long numerator, long denominator) {
        long gcd = gcd(numerator, denominator);
        this.numerator = (denominator > 0 ? 1 : -1) * numerator / gcd;
        this.denominator = Math.abs(denominator) / gcd;
    }
    
    private static long gcd(long n, long d) {
        long n1 = Math.abs(n);
        long n2 = Math.abs(d);
        int gcd = 1;
        
        for (int k = 1; k <= n1 && k <= n2; k++)
            if (n1 % k == 0 && n2 % k == 0) gcd = k;
        
        return gcd;
    }
    
    public long getNumerator() { return numerator; }
    public long getDenominator() { return denominator; }
    
    public Rational add(Rational secondRational) {
        long n = numerator * secondRational.get...
            ...
    }
    ...
        
    @Override
    public String toString() {
        if (denominator == 1)
            return numerator + "";
        else return numerator + "/" + denominator;
    }
    
    @Override
    public boolean equals(Object other) {}
    
    @Override
    public int intValue() { return (int)doubleValue(); }
    public float floatValue() { return (float)doubleValue(); }
    public double doubleValue() { return numerator * 1.0 / denominator; }
    public long longValue() { return (long)doubleValue(); }
    
    @Override
    public int compareTo(Rational o) {
        ...
    }
}
```

### 类的设计原则

> 设计原则有助于设计出合理的类。

#### 内聚性

类应该是一个单一的实体，类的职责过多时应该把类拆成多个小类。

#### 一致性

命名习惯、构造方法、数据声明顺序保持一致。应该有一致的公共无参构造方法。不想让用户创建类的对象，可以声明一个私有构造方法。

#### 封装性

一个类应该使用 private 修饰符隐藏它的数据。只有在应该的情况下，才能向外界开放访问权限。

#### 清晰性

类应该允许用户按任何顺序和任何组合来设置值。应该在不混淆的情况下进行直观定义。不应该声明一个可以从其他数据域推导出来的数据域。

#### 完整性

类应该通过属性和方法提供各种自定义功能的实现方法。

#### 实例和静态

如果一个类的成员被所有实例所共享，那么它应该被声明为是静态的。应该总是使用类名引用静态成员。不要葱构造方法中传入参数来初始化静态数据域。应该用设置方法改变它。

#### 继承和聚合

继承和聚合之间的差异，就是分清“是一种”和“具有”的关系的过程。

#### 接口和抽象类

强的“是一种”关系定义类，弱的“是一种”关系用接口。“是一类”关系用继承。

接口比较灵活，但是不能包含数据域。

## Chapter XIX 泛型

泛型可以参数化类型。

### 动机和优点

`<T>`泛型类型，可以用一个实际具体类型来替换它。替换泛型类型称为 *泛型实例化*。

通过泛型类型改写 Comparable 类，让错误能在编译期被发现。

我们定义一个 String 类型的 ArrayList

```java
ArrayList<String> list = new ArrayList<>();
```

现在，就只能向该线性表中添加字符串。例如：

```java
list.add("Red");
```

如果试图添加别的类型就会发生错误。

```java
list.add(new Integer(1));
```

泛型类型必须是引用类型。不能用基本类型来替换泛型类型。例如，下面的语句是错误的

```java
ArrayList<int> intList = new ArrayList<>();
```

为了给 int 值创建一个 ArrayList 对象，必须使用

```java
ArrayList<Integer> intList = new ArrayList<>();
```

这时候就可以

```java
intList.add(5);
```

这时候 int: 5 会被自动打包成 Integer 对象。

另外，get 到对应的元素给一个基本类型变量赋值的时候还有*自动拆箱*的机制。

### 定义泛型类和接口

> 可以位类或者接口定义泛型。当使用类来创建对象，或者使用类和接口来声明引用变量时，必须指定具体的类型。

```java
public class GenericStack<E> {
    private java.util.ArrayList<E> list = new java.util.ArrayList<>();
    
    public int getSize() {
        return list.size();
    }
    
    public E peek() {
        return list.get(getSize() - 1);
    }
    
    public void push(E o) {
        list.add(o);
    }
    
    public E pop() {
        E o = list.get(getSize() - 1);
        list.remove(getSize() - 1);
        return o;
    }
    
    public boolean isEmpty() {
        return list.isEmpty();
    }
    
    @Override
    public String toString() {
        return "stack: " + list.toString();
    }
}
```

**GenericStack 的构造方法定义应该是**

```java
public GenericStack() {}
```

注意构造方法不用再出现 `<T>` ，因为会造成语义重复。

泛型类涉及多个参数的时候，用逗号隔开即可。`<E1, E2, ...>`

可以定义一个类或接口作为泛型类或接口的子类型。比如 java.lang.String 的定义：

```java
public class String implements Comparable<String>
```

### 泛型方法

> 可以为静态方法定义泛型类型。

可以定义泛型接口和泛型类，也可以使用泛型类型来定义泛型方法。

```java
public class GenericMethodDemo {
    public static void main(String[] args) {
        Integer[] integers = {3, 4, 5};
        String[] strings = {"London", "Paris"};
        
        GenericMethodDemo.<Integer>print(integers);
        GenericMethodDemo.<String>print(strings);
    }
    
    public static <E> void print(E[] list) {
        for (int i = 0; i < list.length; i++) {
            System.out.print(list[i] + " ");
        }
        System.out.println();
    }
}
```

声明泛型方法：

```java
public static <E> void print(E[] list)
```

为了调用泛型方法，需要将实际类型放在尖括号内作为方法名的前缀。

```java
GenericMethodDemo.<Integer>print(integers);
GenericMethodDemo.<String>print(strings);
```

或者如下简单调用：

```java
print(integers);
print(strings);
```

这里编译器自动发现实际类型。

可以将泛型作为另外一种类型的子类型。这样的泛型类型称为*受限的*。

```java
public class BoundedTypeDemo {
    public static void main(String[] args) {
        Rectangle rectangle = new Rectangle(2, 2);
        Circle circ        GenericMethodDemo.<Integer>print(integers);
        GenericMethodDemo.<String>print(strings);le = new Circle(2);
        
        System.out.println("Same area? " + equalArea(rectangle, circle));
    }
    
    public static <E extends GeometricObject> boolean equalArea(E object1, E object2) {
        return object1.getArea() == object2.getArea();
    }
}
```

> `<E>` 相当于 `<E extends Object>`
>
> 为了定义一个类是泛型类型，需要将泛型放到类名后面，方法的话放到方法名前面。

### 实例：对一个对象数组进行排序

```java
public class GenericSort {
    public static void main(String[] args) {
        Integer[] intArray = { new Integer(2), new Integer(4), new Integer(6), new Integer(8)};
        Double[] doubleArray = { new Double(250.0) };
        
        Character[] charArray = { new Character('a') };
        String[] stringArray = { "Tom", "Susan", "Kim" };
        
        sort(intArray);
        sort(doubleArray);
        sort(charArray);
        sort(stringArray);
    }
    
    publ0ic static <E extends Comparable<E>> void sort(E[] list) {
        E currentMin;
        int currentMinIndex;
        
        for (int i = 0; i < list.length - 1; i++) {
            currentMin = list.[i];
            currentMinIndex = i;
            for (int j = i + 1; ...)
                ...
        }
        ...
    }
    
    public static void printList(Object[] list) {
        for (int i = 0; i < list.length; i++) {
            System.out.println(list[i] + " ");
        }
        System.out.println();
    }
}
```

这里希望我们用来对比的都是可比较类，所以需要一个 `<E extends Comparable>`

### 原始类型和向后兼容

> 没有指定具体类型的泛型类和泛型接口被称为原始类型，用于和早期的 Java 版本向后兼容。

可以使用泛型类而无须指定类型。

```java
GenericStack stack = new GenericStack();
```

它按电梯等价于下面的语句：

```java
GenericStack<Object> stack = new GenericStack<Object>();
```

像这样不带类型参数的叫作原始类型。

```java
public class Max {
    public static Comparable max(Comparable o1, Comparable o2) {
        if (o1.compareTo(o2) > 0) return o1;
        else return o2;
    }
}
```

原始类型是不安全的。因为我们可能会这样调用 max：

```java
Max.max("Welcome", 23);
```

因为两边都是可比较类的数据，但是这里变成了 Integer 和 String。会引起一个运行时错误。

```java
public class MaxUsingGenericType {
    public static <E extends Comparable<E>> E max(E o1, E o2) {
        if (o1.compareTo(o2) > 0) return o1;
        else return o2;
    }
}
```

### 通配泛型

```java
public class WildCardNeedDemo {
    public static void main(String[] args) {
        GenericStack<Integer> intStack = new GenericStack<>();
        intStack.push(1);
        intStack.push(2);
        intStack.push(-2);
        
        System.out.println("The max number is " + max(intStack));	// 编译报错！
    }
    
    public static double max(GenericStack<Number> stack) {
        double max = stack.pop().doubleValue();
        while (!stack.isEmpty()) {
            double value = stack.pop().doubleValue();
            if (value > max) max = value;
        }
        
        return max;
    }
}
```

`GenericStack<Integer>` 并不是 `GenericStack<Number>` 的子类型。因此我们引入 *通配泛型类型*。

- ? 非受限通配。它和 ? extends Object 是一样的
- ? extends T 称为受限通配。表示 T 或 T 的一个子类型。
- ? super T 称为下限通配，表示 T 或 T 的一个父类型。 

把上面的 max 定义替换成下面的形式就可以通过编译了：

```java
public static double max(GenericStack<? extends Number> stack)
```

下面是一个万能打印栈的方法：

```java
public static void print(GenericStack<?> stack) {
    while (!stack.isEmpty()) { System.out.print(stack.pop() + " "); }
}
```

下面演示一个下限通配的例子。

```java
public class SuperWildCardDemo {
    public static void main(String[] args) {
        GenericStack<String> stack1 = new GenericStack<>();
        GenericStack<Object> stack2 = new GenericStack<>();
        stack2.push("Java");
        stack2.push(2);
        stack1.push("Sun");
        add(stack1, stack2);
        AnyWildCardDemo.print(stack2);
    }
    public static <T> void add(GenericStack<T> stack1, GenericStack<? super T> stack2) {
        while (!stack1.isEmpty())
            stack2.push(stack1.pop());
    }
}
```

或者这里改成下面的形式也可以运行。总之是要体现他们的继承关系。

```java
public static <T> void add(GenericStack<? extends T> stack1, GenericStack<T> stack2)
```

### 消除泛型和对泛型的限制

泛型是使用一种称为*类型消除*的方法来实现的。编译器使用泛型类型信息来编译代码，但是随后会消除它。因此，泛型信息在运行时是不可用的。

事实上就是编译的时候会通过消除泛型标记的方式，通过把泛型类型打回到原始类型或者它的受限类型，然后再将一些赋值强制转换完成的。这样以前的代码和现在的代码编译起来就一样了。

也就是说，`ArrayList<String>` 和 `ArrayList<Integer>` 不是一个类型，但是下面的代码

```java
list1 instanceof ArrayList;
list2 instanceof ArrayList;
```

返回值都是 `true`。

因为要有类型消除，所以对于如何使用泛型我们会有一些限制：

- 不能用 new E()

  不能使用泛型类型参数创建实例。下面的语句是错误的。

  ```java
  E object = new E();
  ```

  出错的原因是运行时执行的是 new E()，但是运行时泛型类型 E 是不可用的。

- 不能使用 new E[]

  下面的语句是错误的：

  ```java
  E[] elements = new E[capacity];
  ```

  可以通过创建一个 Object 类型的数组，然后将他的类型转换为 E[] 来规避这个限制。

  ```java
  E[] elements = (E[])new Object[capacity];
  ```

  但是类型转换到 E[] 会导致一个免检的编译警告。这个警告是因为编译器无法确保在运行时类型转换是否能成功。

- 使用泛型类创建泛型数组是不允许的。

  ```java
  ArrayList<String>[] list = new ArrayList<String>[10];
  ```

  可以使用下面的代码来规避这种限制：

  ```java
  ArrayList<String>[] list = (ArrayList<String>[])new ArrayList[10];
  ```

- 在静态上下文中不允许类的参数是泛型类型

  因为泛型类的所有实例都有相同的运行时类，所以泛型类的静态变量和方法是被它的所有势力所共享的。因此，太静态方法、数据域或者初始化语句中，为类引用泛型参数是非法的。

  ```java
  public class Test<E> {
      public static void m(E o1) {}	// Illegal
      public static E o1;	// Illegal
      static { E o2; }	// Illegal
  }
  ```

- 异常类不能是泛型的

  泛型类不能扩展 `java.lang.Throwable`，因此下面的声明是非法的：

  ```java
  public class MyException<T> extends Exception {}
  ```

  如果允许这样做，就得为 `MyException<T>` 创建一个对应的 catch 子句。但是编译时会类型消除！所以最后和不加一样。。干脆就不让加了。

### 泛型矩阵类

```java
public abstract class GenericMatrix<E extends Number> {
    protected abstract E add(E o1, E o2);
    protected abstract E multiply(E o1, E o2);
    protected abstract E zero();
    protected E[][] addMatrix(E[][] matrix1, E[][] matrix2) {
        if ((matrix1.length != matrix2.length) || (matrix1[0].length != matrix2[0].length))
            throw new RunTimeException("The matrices do not have the same size");
    }
    
    E[][] result = (E[][])new Number[matrix1.length][matrix1[0].length];
    for (int i = 0; i < result.length; i++)
        for (int j = 0; j < result[i].length; j++)
            result[i][j] = add(matrix[i][j], matrix2[i][j]);
    return result;
    
    public E[][] multiplyMatrix(E[][] matrix1, E[][] matrix2) {
        if (matrix1[0].length != matrix2.length)
            throw new RunTimeException;
        
        E[][] result = (E[][])new Number[matrix1.length][matrix2[0].length];
        
        for (int i = 0; i < result.length; i++) {
            for (int j = 0; j < result[0].length; j++) {
                result[i][j] = zero();
                
                for (int k = 0; k < matrix[0].length; k++) {
                    result[i][j] = add(result[i][j], multiply(matrix1[i][k], matrix2[k][j]));
                }
            }
        }
        
        return result;
    }
	
    public static void printResult(Number[][] m1, Number[][] m2, Number[][] m3, char op) {
        for (int i = 0; i < m1.length; i++) {
            for (int j = 0; j < m1[0].length; j++)
                System.out.print(" " + m1[i][j]);
            
            if (i == m1.length / 2) System.out.print(" " + op + " ");
            else System.out.print("    ");
            
            for (int j = 0; j < m2.length; j++) System.out.print(" " + m2[i][j]);
            
            if (i == m1.length / 2) System.out.print(" = ");
            else System.out.print("    ");
            
            for (int j = 0; j < m3.length; j++) System.out.print(m3[i][j] + " ");
            
            System.out.println();
        }
    }
}
```

```java
public class IntegerMatrix extends GenericMatrix<Integer> {
    @Override protected Integer add(Integer o1, Integer o2) {
        return o1 + o2;
    }
    
    @Override protected Integer multiply(Integer o1, Integer o2) {
        return o1 * o2;
    }
    
    @Override protected Integer zero() {
        return 0;
    }
}
```

```java
public class RationalMatrix extends GenericMatrix<Rational> {
    @Override protected Rational add(Rational r1, Rational r2) {
        return r1.add(r2);
    }
    
    @Override protected Rational multiply(Rational r1, Rational r2) {
        return r1.multiply(r2);
    }
    
    @Override protected Rational zero() {
        return new Rational(0, 1);
    }
}
```

## Chapter XXX 多线程和并行程序设计

多线程使得程序中的多个任务可以同时执行，从而提高程序的交互性、响应速度和执行效率。

### 线程的概念

> 一个程序可能包含多个可以同时运行的任务。线程是指一个任务从头至尾的执行流程。

对于 Java 而言，可以在一个程序中并发地启动多个线程。在单处理器系统中，多个线程共享 CPU 时间（时间分享），而操作系统负责调度及分配资源给它们。

在 Java 中，每个任务都是 Runnable 接口的一个实例。也被称为*可运行对象*。

### 创建任务和线程

> 一个任务类必须实现 Runnable 接口。任务必须从线程运行。

任务就是对象。为了创建任务，必须为任务定义一个实现 `Runnable` 接口的类。`Runnable` 接口非常简单，它只包含一个 `run` 方法，需要实现这个方法来告诉系统线程将如何运行。

```java
public class TaskClass implements Runnable {
    public TaskClass(...) {
        // ...
    }
    
    @Override
    public void run() {
        // 告诉系统如何运行自定义线程
    }
}
```

一旦定义了一个 TaskClass，就可以用它的构造方法创建一个任务：

```java
TaskClass task = new TaskClass(...);
```

任务必须在线程中执行。Thread 类包括创建线程的构造方法以及控制线程的很多有用方法。使用下面的语句创建并启动任务的线程：

```java
Thread thread = new Thread(task);
thread.start();
```

下面是一个实例：

```java
public class TaskThreadDemo {
    public static void main(String[] args) {
        Runnable printA = new PrintChar('a', 100);
        Runnable printB = new PrintChar('b', 100);
        Runnable print100 = new PrintNum(100);
        
        Thread thread1 = new Thread(printA);
        Thread thread2 = new Thread(printB);
        Thread thread3 = new Thread(print100);
        
        thread1.start();
        thread2.start();
        thread3.start();
    }
}

class PrintChar implements Runnable {
    private char charToPrint;
    private int times;
    
    public PrintChar(char c, int t) {
        charToPrint = c;
        times = t;
    }
    
    @Override public void run() {
        for (int i = 0; i < times; i++) System.out.print(charToPrint);
    }
}

class PrintNum implements Runnable {
    private int lastNum;
    
    public PrintNum(int n) {
        lastNum = n;
    }
    
    @Override public void run() {
        for (int i = 1; i <= lastNum; i++) System.out.print(" " + i);
    }
}
```

**重要的注意事项**：任务中的 `run()` 方法指明如何完成这个任务。直接调用 `run()` 只是在同一个线程中执行该方法，而**没有新线程被启动**。要想启动新线程，必须调用 `start()` 方法。

### Thread 类

> Thread 类包含为任务而创建的线程的构造方法，以及控制线程的方法。

> 因为 Thread 类实现了 Runnable，所以可以定义一个 Thread 的扩展类，并且实现 run 方法，这样可以直接用一个类启动一个线程。be like:
>
> ```java
> public class CustomThread extends Thread {
>  public CustomThread(...) {
>      // ...
>  }
> 
>  public void run() {
>      // the methods about how to run the task.
>  }
> }
> 
> // Client class
> public class Client {
>  public void someMethod() {
>      CustomThread thread1 = new CustomThread(...);
>      thread1.start();
>      // ...
>  }
> }
> ```
>
> 但是不推荐这种方法。因为这样完全破坏了 Java 线程和任务分离的设计。

可以通过 `Thread` 类获取线程的状态或控制它的执行：

* **`yield()`**: 为其他线程临时让出 CPU 时间。

  例如，上例改成

  ```java
  public void run() {
      for (int i = 1; i <= lastNum; i++) {
          System.out.print(" " + i);
          Thread.yield();
      }
  }
  ```

  这样每次打印一个数字之后，`print100` 就会把时间让给别的线程。

* **`sleep(long millis)`**: 将线程设置为休眠以确保其他线程的执行，休眠时间为指定的毫秒数。可能会抛出必检异常 `InterruptedException`，必须放在 `try-catch` 块中。

  ```java
  public void run() {
      try {
          while (...) {
              ...
              Thread.sleep(1000);
          }
      } catch (InterruptedException ex) {
          ex.printStackTrace();
      }
  }
  ```

* **`join()`**: 使一个线程等待另一个线程的结束。例如，`thread4.join()` 表示等待 thread4 结束后当前线程才继续。

  创建一个新线程 `thread4`，在 `print100` 中做这样的修改：

  ```java
  public void run() {
      Thread thread4 = new Thread(new PrintChar('c', 40));
      thread4.start();
      try {
          for (int i = 1; i <= lastNum; i++) {
              System.out.print(" " + i);
              if (i == 50) thread4.join();
          }
      } catch (InterruptException ex) {}
  }
  ```

  程序交替打印数字和字母 `c`，如果数字打印到了 50 而字母 `c` 还没有 40 个，就会停下来等输出完 40 个再继续输出剩下的 50 个数字。

* **`setPriority(int p)`**: 更改线程的优先级。优先级从 1 到 10（`MIN_PRIORITY` 到 `MAX_PRIORITY`）。

  默认情况下，线程继承生成它的进程的优先级。

### 线程池

> 可以使用线程池来高效执行任务。

为每个任务开始一个新的线程可能会限制吞吐量并且造成性能降低。线程池是管理并发执行任务个数的理想方法。Java 提供 `Executor` 接口来执行线程池中的任务，提供 `ExecutorService` 接口来管理和控制任务。

`Executors` 类提供了创建 Executor 对象的静态方法：

```java
import java.util.concurrent.*;

public class ExecutorDemo {
    public static void main(String[] args) {
        // 创建一个最大线程数为3的固定线程池
        ExecutorService executor = Executors.newFixedThreadPool(3);
        // 或者使用 CachedThreadPool 创建按需增加新线程的线程池
        // ExecutorService executor = Executors.newCachedThreadPool();
        
        // 将 Runnable 任务提交给执行器
        executor.execute(new PrintChar('a', 100));
        executor.execute(new PrintChar('b', 100));
        executor.execute(new PrintNum(100));
        
        // 关闭执行器
        executor.shutdown();
    }
}
```

*提示*：如果仅需要为一个任务创建一个线程，就使用 `Thread` 类。如果需要为多个任务创建线程，最好使用线程池。

如果要用下面的语句替换：

```java
ExecutorService executor = Executors.newCachedThreadPool();
```

会发生什么呢？现在每个等待的任务创建一个新的线程。每个任务并发执行。

shutdown 方法关闭执行器，只是不接受新的任务。现有的任务将会被继续执行直至完成。

### 线程同步

> 线程同步用于协调相互依赖的线程的执行。

如果一个共享资源被多个线程同时访问，可能会遭到破坏。这种情况称为**竞争状态** (race condition)。如果一个类的对象在多线程程序中没有导致竞争状态，则称这样的类为*线程安全的* (thread-safe)。

**synchronized 关键字**
为了避免竞争状态，可以使用关键字 `synchronized` 来同步方法，以便一次只有一个线程可以访问这个方法。

```java
public synchronized void deposit(double amount)
```

一个同步方法执行前要加锁。锁是一种实现资源排他使用的机制。对于实例方法，要给调用该方法的对象加锁；对于静态方法，要给这个类加锁。加了锁之后调用对应对象 / 类的线程将会被阻塞，直到解锁。

**同步语句**
也可以将锁加在一个对象上，只同步代码中引起冲突的特定部分，这就是同步块（synchronized block）：

```java
synchronized (account) {
    account.deposit(1);
}
```

`synchronized` 方法隐式地需要一个加在实例上的锁，等价于 `synchronized (this) { ... }`。

### 利用加锁同步

> 可以显式地采用锁和状态来同步线程。

Java 可以显式地加锁，这给协调线程带来了更多的控制功能。一个锁是 `Lock` 接口的实例。`ReentrantLock` 是 `Lock` 的一个具体实现，用于创建相互排斥的锁。

锁可以用 newCondition 方法创建任意个 Condition 对象，用来线程通信。

```java
public class Account {
    private static Lock lock = new ReentrantLock(); // 创建一个锁
    private int balance = 0;
    
    public void deposit(int amount) {
        lock.lock(); // 获取锁
        try {
            int newBalance = balance + amount;
            Thread.sleep(5);
            balance = newBalance;
        } catch (InterruptedException ex) {
        } finally {
            lock.unlock(); // 释放锁（最佳实践：放在 finally 块中）
        }
    }
}
```

### 线程间协作 (Condition)

> 锁上的条件可以用于协调线程之间的交互。

通过保证在临界区上多个线程的相互排斥，线程同步完全可以避免竞争条件的发生。但是有时线程之间还需要相互协作。条件（`Condition`）是通过调用 `Lock` 对象的 `newCondition()` 方法创建的。

```java
private static Lock lock = new ReentrantLock();
private static Condition newDeposit = lock.newCondition();
```

一旦创建了条件，就可以使用 `await()`、`signal()` 和 `signalAll()` 方法来实现线程之间的通信。

*   `await()`: 让当前线程等待，直到条件发出信号。
*   `signal()`: 唤醒一个等待的线程。
*   `signalAll()`: 唤醒所有等待的线程。

```java
// 提款任务
lock.lock();
try {
    while (balance < withdrawAmount) {
        newDeposit.await(); // 余额不足，等待存款信号
    }
    balance -= withdrawAmount;
} finally {
    lock.unlock();
}

// 存款任务
lock.lock();
try {
    balance += depositAmount;
    newDeposit.signalAll(); // 存款完毕，通知所有等待的提款线程
} finally {
    lock.unlock();
}
```

*警告*：必须在拥有锁的情况下才能调用这些方法，否则会抛出 `IllegalMonitorStateException`。使用 `while` 循环调用 `await()` 是为了防止虚假唤醒和条件重新检查。

*监视器*是一个相互排斥且具备同步能力的对象。监视器中的一个时间点上只能有一个线程执行一个方法。**任何对象都有可能是监视器。**一旦一个线程锁住对象，该对象就成为监视器。监视器对应的方法是 notify() notifyAll() 和 wait()。

### 阻塞队列

> Java 集合框架提供了 ArrayBlockingQueue、LinkedBlockingQueue 和 PriorityBlockingQueue 来支持阻塞队列。

阻塞队列 (blocking queue) 提供了同步的 `put`（向队列尾部添加）和 `take`（从队列头部删除）方法。在试图向一个满队列添加元素或者从空队列中删除元素时会导致线程阻塞。利用阻塞队列可以极大地简化“生产者/消费者”模型的程序编写，因为无需再手动使用锁和条件。

### 信号量

> 可以使用信号量来限制访问一个共享资源的线程数。

信号量 (`Semaphore`) 可以用来模拟一个相互排斥的锁（当只允许1个许可时），也可以允许多个线程并发访问。
调用 `acquire()` 获取许可，如果不可用则阻塞。调用 `release()` 释放许可。

```java
private static Semaphore semaphore = new Semaphore(1); // 1个许可

public void deposit(int amount) {
    try {
        semaphore.acquire(); // 获取许可
        balance += amount;
    } catch (InterruptedException ex) {
    } finally {
        semaphore.release(); // 释放许可
    }
}
```

### 避免死锁

当两个或多个线程需要在几个共享对象上获取锁，并且正在等待另一个对象上的锁时，就可能会发生死锁。
避免死锁的一种简单技术是采用**资源排序**：给每个对象指定一个顺序，确保所有线程都按该统一的顺序去获取锁。

### 线程状态

线程可以是以下 5 种状态之一：

1. **新建 (New)**: 创建但未 start。
2. **就绪 (Ready)**: start() 后排队等待 CPU 时间。
3. **运行 (Running)**: 获得 CPU 并正在执行 run()。
4. **阻塞 (Blocked)**: 等待锁或调用 sleep/join/wait 等进入。
5. **结束 (Finished)**: run() 执行完毕。

线程执行完 run() 方法的时候就直接结束。可以使用 `isAlive()` 方法来判断线程状态。

### 同步合集

> Java 集合框架中的类（如 ArrayList）不是线程安全的；可以通过 Collections 类来保护合集中的数据。

`Collections` 类提供 6 个静态方法将合集转成同步版本：

*   `synchronizedCollection(c)`
*   `synchronizedList(list)`
*   `synchronizedSet(s)`
*   `synchronizedMap(m)` 等。

*注意*：虽然同步集合可以安全地被多个线程并发访问，但是其**迭代器具有快速失效**的特性。当使用迭代器遍历时，必须使用 `synchronized` 关键字对原集合加锁：

```java
Set hashSet = Collections.synchronizedSet(new HashSet());
synchronized (hashSet) {
    Iterator iterator = hashSet.iterator();
    while (iterator.hasNext()) { ... }
}
```

### Fork/Join 框架（并行编程）

> Fork/Join 框架用于在 Java 中实现分而治之的并行编程。

`ForkJoinTask` 是用于任务的抽象基类，轻量级。主要使用 `fork()` 和 `join()` 来协调：`fork()` 会安排异步执行，`join()` 等待任务完成并返回结果。

*   `RecursiveAction`: 不返回值的任务。
*   `RecursiveTask`: 返回值的任务。

通常使用模式如下：

```java
if (the program is small) {
    solve it sequentially;
} else {
    divide the problem into nonoverlapping subproblems;
    solve the subproblems concurrently;
    combine the results from subproblems to solve the whole problem;
}
```

**实例：并行寻找最大值**

```java
import java.util.concurrent.*;

public class ParallelMax {
    public static void main(String[] args) {
        int[] list = new int[9000000];
        // 填充 list...
        
        RecursiveTask<Integer> task = new MaxTask(list, 0, list.length);
        ForkJoinPool pool = new ForkJoinPool();
        int max = pool.invoke(task); // 执行并获取结果
    }
    
    private static class MaxTask extends RecursiveTask<Integer> {
        private final static int THRESHOLD = 1000;
        private int[] list;
        private int low;
        private int high;
        
        public MaxTask(int[] list, int low, int high) {
            this.list = list; this.low = low; this.high = high;
        }
        
        @Override
        protected Integer compute() {
            if (high - low < THRESHOLD) {
                // 规模较小，顺序查出最大值并返回
                int max = list[low];
                for (int i = low + 1; i < high; i++) 
                    if (list[i] > max) max = list[i];
                return max;
            } else {
                // 分割子问题
                int mid = (low + high) / 2;
                RecursiveTask<Integer> left = new MaxTask(list, low, mid);
                RecursiveTask<Integer> right = new MaxTask(list, mid, high);
                
                right.fork(); // 放入池中并发执行
                left.fork();
                
                // 合并结果
                return Math.max(left.join(), right.join());
            }
        }
    }
}
```