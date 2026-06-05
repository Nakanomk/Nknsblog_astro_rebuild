---
title: 'Java Chapter XI 继承和多态'
description: ''
tags:
  - Code
  - Learn
language: '中文'
publishDate: 2026-06-05 09:05:00
order: 7
---

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
>     public Fruit(String name) {
>         System.out.println("Fruit's constructor is invoked");
>     }
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

这里 m 不再是一个虚函数。