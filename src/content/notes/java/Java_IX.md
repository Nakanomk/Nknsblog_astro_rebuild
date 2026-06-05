---
title: 'Java Chapter IX 对象和类'
description: ''
tags:
  - Code
  - Learn
language: '中文'
publishDate: 2026-06-05 09:05:00
order: 6
---

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