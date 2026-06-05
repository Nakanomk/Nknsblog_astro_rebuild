---
title: 'Java Chapter XIII 抽象类和接口'
description: ''
tags:
  - Code
  - Learn
language: '中文'
publishDate: 2026-06-05 09:05:00
order: 9
---

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

#### xxxxxxxxxx import java.util.concurrent.*;​public class ParallelMax {    public static void main(String[] args) {        int[] list = new int[9000000];        // 填充 list...                RecursiveTask<Integer> task = new MaxTask(list, 0, list.length);        ForkJoinPool pool = new ForkJoinPool();        int max = pool.invoke(task); // 执行并获取结果    }        private static class MaxTask extends RecursiveTask<Integer> {        private final static int THRESHOLD = 1000;        private int[] list;        private int low;        private int high;                public MaxTask(int[] list, int low, int high) {            this.list = list; this.low = low; this.high = high;        }                @Override        protected Integer compute() {            if (high - low < THRESHOLD) {                // 规模较小，顺序查出最大值并返回                int max = list[low];                for (int i = low + 1; i < high; i++)                     if (list[i] > max) max = list[i];                return max;            } else {                // 分割子问题                int mid = (low + high) / 2;                RecursiveTask<Integer> left = new MaxTask(list, low, mid);                RecursiveTask<Integer> right = new MaxTask(list, mid, high);                                right.fork(); // 放入池中并发执行                left.fork();                                // 合并结果                return Math.max(left.join(), right.join());            }        }    }}java

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

