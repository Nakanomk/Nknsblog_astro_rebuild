---
title: 'Java Chapter XIX 泛型'
description: ''
tags:
  - Code
  - Learn
language: '中文'
publishDate: 2026-06-05 09:05:00
order: 10
---

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

