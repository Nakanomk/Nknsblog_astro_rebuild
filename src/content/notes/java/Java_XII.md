---
title: 'Java Chapter XII 异常处理和文本 IO'
description: ''
tags:
  - Code
  - Learn
language: '中文'
publishDate: 2026-06-05 09:05:00
order: 8
---

## Chapter XII 异常处理和文本 IO

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
>     try {
>         p2();
>     } catch (IOException ex) {
>         ...
>     }
> }	// 捕获
> 
> void p1() throws IOException {
>     p2();
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