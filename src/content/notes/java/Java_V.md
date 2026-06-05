---
title: 'Java Chapter  V 循环'
description: ''
tags:
  - Code
  - Learn
language: '中文'
publishDate: 2026-06-05 09:05:00
order: 3
---

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