---
title: 'Java Chapter XXX 多线程和并行程序设计'
description: ''
tags:
  - Code
  - Learn
language: '中文'
publishDate: 2026-06-05 09:05:00
order: 11
---

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
>     public CustomThread(...) {
>         // ...
>     }
>     
>     public void run() {
>         // the methods about how to run the task.
>     }
> }
> 
> // Client class
> public class Client {
>     public void someMethod() {
>         CustomThread thread1 = new CustomThread(...);
>         thread1.start();
>         // ...
>     }
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
