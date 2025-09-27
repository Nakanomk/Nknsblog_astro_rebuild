---
title: 'Hust Luogu Language Questions I'
publishDate: 2025-02-08 10:30:01
description: 'Hust Winter Holiday Homework Answers'
tags:
  - Code
  - Learn
language: '中文'
heroImage: { src: '../../../public/covers/Wanlingce.jpg', color: '#edb9a2' }
---

# HUSTCS NNZDQZRC 题解/答案分享(A-Z)

{% note info %}

**请注意** 本题解暂时仅收录本人已经完成的题目，仅供参考，请勿直接抄袭~

本人码风非常凌乱且前7题是C后面都是C++ 具体语言类型已经标注到题目标题后面~

如果你也希望提供自己的题解/想法可以直接把代码copy到评论区~欢迎各种做法/语言qwq

{% endnote %}

## $$ \mathscr{A} $$ 小L在吃饭 ( hasmeal )

用 float 非常浪费资源，在签到题上没必要。本题直接将角作为单位即可

```c
#include<stdio.h>
int main(void)
{
	int a,b;
	scanf(" %d %d", &a, &b);
	int c = (10 * a + b) / 19;
	printf("%d",c);
	return 0;
}
```

## $$ \mathscr{B} $$ 小W在游泳 ( swim )

因为有98%所以开了 float ，用 sum 进行叠加即可

```c
#include <stdio.h>
int main(void)
{
	float s, x = 2.0, sum = 0.0;
	int i = 0;
	scanf("%f", &s);
	while (sum < s)
	{
		i++;
		sum += x;
		x *= 0.98;
	}
	printf("%d", i);
	return 0;
}
```

## $$ \mathscr{C} $$ 小C在上课 ( finalscore )

注意到subtask 对于 $$ 100\% $$ 的数据 $$ A,B,C $$ 均为 $$ 10 $$ 的倍数，因此直接当 int 算即可

```c
#include <stdio.h>
int main(void)
{
	int A, B, C;
	scanf("%d %d %d", &A, &B, &C);
	printf("%d", A / 5 + B / 10 * 3 + C / 2);
	return 0;
}
```

## $$ \mathscr{D} $$ 好数 ( gnum )

四个情况对应 $$ 2^4 $$ 种情况，一个一个判断显然太慢了，我们用两个数把输入性质的真值存下来就好

```c
#include<stdio.h>
int main(void)
{
	int x, a, b;
	scanf("%d", &x);
	a = (x/2*2 == x);
	b = x > 4 && x <= 12;
	printf("%d %d %d %d", (a&&b),(a||b),(a^b),!(a||b));
	return 0;
}
```

## $$ \mathscr{E} $$ 排序 ( sort )

进行了一个毫无技术含量的冒泡排序

各种排序方法详情学习： **[OI Wiki - 排序简介](https://oi-wiki.org/basic/sort-intro/)** 

```c
#include <stdio.h>
int main(void)
{
	int a[3];
	scanf("%d %d %d", &a[0], &a[1], &a[2]);
	int i, j, temp;
	for (i = 0; i < 2; i++)
	{
		for (j = 1; j < 3 - i + 1; j++)
		{
			if (a[j] < a[j - 1])
			{
				temp = a[j - 1];
				a[j - 1] = a[j];
				a[j] = temp;
			}
		}
	}
	printf("%d %d %d", a[0], a[1], a[2]);
	return 0;
}
```

## $$ \mathscr{F} $$ 谁更短 ( leauingz )

注意到$$ t(items)=\left\{\begin{aligned}3 \ast items + 11, LeauingZ \\5 \ast items,Yourself\end{aligned}\right. $$

当 $$ items < 5 $$ 时，自己出题更快，当 $$ items \ge 6 $$ 时，让 LeauingZ 出题更快。

```c
#include <stdio.h>
int main(void)
{
	int n;
	scanf("%d", &n);
	if (n < 6)
		printf("Local");
	else
		printf("Luogu");
	return 0;
}
```

## $$ \mathscr{G} $$ 倍减 ( double )

由于 C 语言整数除法本身就是向下取整，因此直接按题意实现即可。

此处可以将 while 改写成 for 循环。

```c
#include<stdio.h>
int main(void)
{
	int x,i = 0;
	scanf("%d", &x);
	while(x != 1) {
		i++;
		x /= 2;
	}
	printf("%d", i+1);
	return 0;
}
```

## $$ \mathscr{H} $$ 有说服力的评分算法 ( rating )

注意分数应该是浮点型变量，同时需要保留两位小数。

可以学习从  *$$ \mathscr{E} $$ 排序 ( sort ) C* 学习来的排序方法，对评分数组进行排序。

但是本题只需要去掉两边各一个极值，因此直接累加并找到需要剪掉的项即可

```c
#include <stdio.h>
int main(void)
{
	float score = 0.0;
	int a[1000] = {0};
	int max = 0,min = 100;
	int i,n;
	scanf("%d", &n);
	for(i = 0; i < n; i++) {
		scanf(" %d", &a[i]);
		score += a[i];
		if(max < a[i]) max = a[i];
		if(min > a[i]) min = a[i];
	}
	printf("%.2f", (score-max-min) / (n - 2));
	return 0;
}
```

## $$ \mathscr{I} $$ 多项式筛素数 ( poly )

基本思路是从 $$2$$ 开始创建向上的索引，判断每个索引是不是素数，然后再将是素数的项累加起来判断是不是大于 $$S$$ 。代码实现的时候图省事把2单独拿出来考虑了。

```c
#include <stdio.h>
int main(void)
{
	int i = 0, j = 0, S = 0, sum = 2, n = 0, status = 0;
	scanf("%d", &S);
	if(S >= 2) {
		printf("2\n");
		n++;
	}
	for (i = 3; i < 5000  && (sum + i) <= S; i++)
	{
		status = 1;
		for (j = 2; j < i; j++)
		{
			if (i == i / j * j)
			{
				status = 0;
				break;
			}
		}
		if (status == 1)
		{
			sum += i;
			printf("%d\n", i);
			n++;
		}
	}
	printf("%d", n);
	return 0;
}
```

## $$ \mathscr{J} $$ 数位枚举 ( enum )

注意到 Subtasks 里面的数据满足 $$ 1 \le n \le 10^6 $$ ，因此直接在有限的范围内写 if 拆数就可以了2333

```c
#include <stdio.h>
int main(void)
{
	int i, n, x, t = 0;
	scanf("%d %d", &n, &x);
	for (i = 1; i <= n; i++)
	{
		if (i / 1000000 == x && i > 999999)
			t++;
		if (i / 100000 % 10 == x && i > 99999)
			t++;
		if (i / 10000 % 10 == x && i > 9999)
			t++;
		if (i / 1000 % 10 == x && i > 999)
			t++;
		if (i / 100 % 10 == x && i > 99)
			t++;
		if (i / 10 % 10 == x && i > 9)
			t++;
		if (i % 10 == x)
			t++;
	}
	printf("%d", t);
	return 0;
}
```

## $$ \mathscr{K} $$ 阅读论文 ( read )

根据 $$ Hints $$ ，我们首先要区分 没有存储元素的位置 和 存放了 $$ 0 $$ 的位置。因此在初始化的时候为数组置-1.

这一步可以拿memset()函数快速完成。

之后查找论文里有没有已知的公式。

如果有 $$ \Rightarrow $$ 继续下一个

如果没有 $$ \Rightarrow $$ 在笔记本里记录，同时计数器自增。

我们用一个类似于指针的东西记录下一个要记录的页码即可。

```c
#include <stdio.h>
int main(void)
{
	int Mi, Ni, M[1001], N[1001], i, j, check_time = 0;
	for (i = 0; i < 1001; i++)
	{
		M[i] = -1;
		N[i] = -1;
	} // MNP置-1
	scanf("%d %d", &Mi, &Ni);
	for (i = 0; i < Ni; i++)
		scanf(" %d", &N[i]);
	int index = 0, status = 0;
	for (i = 0; i < Ni; i++)
	{
		status = 0;
		for (j = 0; j < Mi; j++)
		{
			if (N[i] == M[j])
			{
				status = 1;
				break;
			}
		}
		if (status == 0)
		{
			if (index == Mi)
				index = 0;
			M[index] = N[i];
			index++;
			check_time++;
		}
	}
	printf("%d", check_time);
	return 0;
}
```

## $$ \mathscr{L} $$ 在线购物 ( shopping )

从本题开始全部由 C++ 编写，因为它提供了众多功能强大的 STL 容器以及 string 类型。

当然本题其实还是个数学问题 直接取模做就好。

```cpp
#include <bits/stdc++.h>

typedef struct an
{
	int code;
} Ni;	//回看补充 就一个int我为什么要定义一个struct/捂脸

typedef struct aq
{
	int length;
	int recode;
} Qi;

int main()
{
	int n, q, i;
	Ni N[1000];
	Qi Q[1000];
	scanf("%d %d", &n, &q);
	for (i = 0; i < n; i++)
	{
		scanf(" %d", &N[i].code);
	}
	for (i = 0; i < q; i++)
	{
		scanf(" %d %d", &Q[i].length, &Q[i].recode);
	}

	int c = 10;
	int cmp = 1000000000;
	for (int i = 0; i < q; i++)
	{
		c = pow(10, Q[i].length);
		cmp = 1000000000;
		for (int j = 0; j < n; j++)
		{
			if (N[j].code % c == Q[i].recode && N[j].code < cmp)
				cmp = N[j].code;
		}
		if (cmp == 1000000000)
			printf("-1\n");
		else
			printf("%d\n", cmp);
	}

	system("pause");
	return 0;
}
```

## $$ \mathscr{M} $$ lhm 玩 01 ( lhma )

本题是学长相互迫害的开端哈哈

我们把输出 $$0$$ 和 $$1$$ 作为两种状态，然后一次处理即可。

```cpp
#include <bits/stdc++.h>

int main(void)
{
	int i, j, a, b = 0, index = 0;
	int sum = 0;
	scanf(" %d", &j);
	while (sum < j * j)
	{
		scanf(" %d", &i);
		sum += i;
		for (a = 0; a < i; a++)
		{
			if (b == 0)
				printf("0");
			else
				printf("1");
			index++;
			if (index % j == 0 && index != 0 && index != j * j)
				printf("\n");
		}
		b = 1 - b;
	}

	system("pause");
	return 0;
}
```

## $$ \mathscr{N} $$ bngg 与 hmgg 的决斗 ( fight )

注意本题只保证每一个节点 $$ s_i < 10^9 $$ ，因此累加时要开 *long long* 。

```cpp
#include <iostream>
#include <cstdlib>
#include <cmath>

using namespace std;
int main(void)
{
	long long n;
	long long c[100000];
	cin >> n;
	for (int i = 0; i < n; i++)
	{
		cin >> c[i];
	}
	long long m, p1, s1, s2;
	long long p2;
	scanf(" %lld", &m);
	scanf(" %lld", &p1);
	scanf(" %lld", &s1);
	scanf(" %lld", &s2);
	long long k1 = 0, k2 = 0, temp = 100000000000000000, tag;
	for (int i = 0; i < n; i++)
	{
		k1 += c[i] * (m - 1 - i);
	}
	k1 += (m - p1) * s1;
	for (p2 = 0; p2 < n; p2++)
	{
		k2 = abs(k1 + (m - 1 - p2) * s2);
		if (temp > k2)
		{
			temp = k2;
			tag = p2;
		}
	}

	printf("%lld", tag + 1);

	system("pause");
	return 0;
}
```

## $$ \mathscr{O} $$ lhm 玩数字 ( lhmb )



```cpp
#include <iostream>
#include <cstdlib>

using namespace std;

void swap(int *a, int *b)
{
	int temp = *a;
	*a = *b;
	*b = temp;
}

void Bs(int c[], int n)
{
	for (int i = 0; i < n; i++)
	{
		for (int j = 1; j < n - i; j++)
		{
			if (c[j] < c[j - 1])
				swap(&c[j], &c[j - 1]);
		}
	}
}

int main(void)
{
	int n, k;
	cin >> n >> k;
	int c[10000];
	for (int i = 0; i < n; i++)
	{
		cin >> c[i];
	}
	Bs(c, n);

	int tag = 1;
	for (int i = 1; i < n; i++)
	{
		if (c[i] != c[i - 1])
			tag++;
		if (tag == k) {
			cout << c[i];
			break;
		}
	}
	if (tag < k)
		cout << "NO RESULT";

	system("pause");
	return 0;
}
```



## $$ \mathscr{P} $$ 小 S 与 NLP ( nlp )



```cpp
#include <bits/stdc++.h>

using namespace std;

int main(void)
{
	int n, m;
	cin >> n >> m;
	unordered_map<string, int> dict;

	for (int i = 0; i < n; ++i)
	{
		string key;
		int val;
		cin >> key >> val;
		dict[key] = val;
	}

	cin.ignore(1000, '\n');

	for (int i = 0; i < m; ++i)
	{
		string m1;
		getline(cin, m1);
		string m2;
		bool status = false;
		string current_key;

		for (char c : m1)
		{
			if (c == '{')
			{
				status = true;
				current_key.clear();
			}
			else if (c == '}')
			{
				status = false;
				m2 += to_string(dict[current_key]);
			}
			else
			{
				if (status)
				{
					current_key += c;
				}
				else
				{
					m2 += c;
				}
			}
		}

		cout << m2 << endl;
	}

	system("pause");
	return 0;
}
```

## $$ \mathscr{Q} $$ 小 S 与 MMORPG ( mmorpg )

至理名言

> 如果你不知道什么是 MMORPG，你可以将其简单理解为 Many Men Online Role Playing as Girls 的缩写。



```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
	set<string> s;
	int n, m, k;
	string w;

	cin >> n >> m >> k;
	for (int i = 0; i < n; i++)
	{
		cin >> w;
		s.insert(w);
	}
	for (int i = 0; i < m; i++)
	{
		cin >> w;
		s.erase(w);
	}
	for (int i = 0; i < k; i++)
	{
		cin >> w;
		s.insert(w);
	}
	for (string c : s)
	{
		cout << c << endl;
	}
	system("pause");
	return 0;
}
```

## $$ \mathscr{R} $$ 小 S 与时间逆流 ( time )



```cpp
#include <bits/stdc++.h>
using namespace std;

int getlength(char *c)
{
	int p = 0;
	while (c[p] != 0)
	{
		p++;
	}
	return p;
}

int main()
{
	char w[100];
	memset(w, 0, 100);
	cin >> w;
	multiset<string> ms;
	int i, j, a, b;
	char w2[100];
	int wlength;
	wlength = getlength(w);
	for (i = 0; i < wlength; i++)
	{
		for (j = wlength - 1; j > i; j--)
		{
			for (int k = 0; k < 100; k++)
				w2[k] = w[k];
			a = i;
			b = j;
			while (a < b)
			{
				w2[a] = w[b];
				w2[b] = w[a];
				a++;
				b--;
			}
			string str(w2, wlength);
			ms.insert(str);
		}
	}
	string str(w,wlength);
	ms.insert(str);
	cout << *(ms.begin());
	system("pause");
	return 0;
}
```

## $$ \mathscr{S} $$ 小 S 与 历史长河 ( history )



```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
	string S, S1, T, T1;
	cin >> S >> T;
	int Q;
	cin >> Q;
	int ls, rs, lt, rt;
	for (int i = 0; i < Q; i++)
	{
		cin >> ls >> rs >> lt >> rt;
		string S1(S, ls - 1, rs - ls + 1);
		string T1(T, lt - 1, rt - lt + 1);
		if (S1 < T1)
			cout << "yifusuyi" << endl;
		else if (S1 > T1)
			cout << "erfusuer" << endl;
		else
			cout << "ovo" << endl;
	}
	system("pause");
	return 0;
}
```

## $$\mathscr{T} $$ 任务管理 ( task )



```cpp
#include <bits/stdc++.h>
using namespace std;
int tasks[5000][5000];
set<int> lists;

void check(int b)
{
	for (int i = 0; i < tasks[b - 1][0]; i++)
	{
		if (lists.find(tasks[b - 1][i + 1]) == lists.end())
		{
			lists.insert(tasks[b - 1][i + 1]);
			check(tasks[b - 1][i + 1]);
		}
	}
}

int main()
{
	int N;
	cin >> N;
	for (int i = 0; i < N; i++)
	{
		cin >> tasks[i][0];
		for (int j = 0; j < tasks[i][0]; j++)
			scanf("%d",&tasks[i][j + 1]);
	}
	check(1);
	cout << lists.size() + 1;
	system("pause");
	return 0;
}
```

## $$\mathscr{U}$$ 直接输出 ( output )



```cpp
#include <bits/stdc++.h>
using namespace std;

string de(int n)
{
	string output = "";
	int sum = 0;
	bool k[16] = {0};
	bool status = 0;
	while (sum != n)
	{
		int i = 1;
		int counter = 0;
		while (i <= n - sum)
		{
			i *= 2;
			counter++;
		}
		k[counter - 1] = 1;
		sum += (i / 2);
	}
	for (int j = 15; j >= 0; j--)
	{
		if (k[j] == 1 && j != 0)
		{
			if (status)
				output += "+";
			if (j != 1)
				output += "2(" + de(j) + ")";
			else
				output += "2";
			status = 1;
		}
		else if (k[j] == 1 && j == 0)
		{
			if (status)
				output += "+";
			output += "2(0)";
		}
	}
	return output;
}

int main()
{
	int n;
	cin >> n;
	cout << de(n);
	system("pause");
	return 0;
}
```

## $$ \mathscr{V} $$ 走 ( walk )

> 这不是题解，只是一份无厘头的错误代码。本题还没通过，太困难了qwq

```cpp
#include <bits/stdc++.h>
using namespace std;

bool m_used = false;
int color = 0;
int qp[100][100];
int m, n;
int coin = -1;
set<pair<int, int>> his;
set<int> bill;
int recorder[10000] = {0};
int turn = 0;
int sum = 0;

int check(int x, int y)
{
	pair<int, int> pos = make_pair(x, y);
	if(his.find(pos) == his.end()) {his.insert(pos);}
	else {return 0;}
	color = qp[y - 1][x - 1];

	if(color != -1) m_used = 0;
	if(m_used == 0 && color == -1) m_used = 1;
	if(m_used && color == -1) { his.erase(pos); return 0;}
	
	if(x <= 0 || x >= m + 1 || y <= 0 || y >= m + 1) {his.erase(pos); return 0;}

	if(x == m && y == m) {return 1;}

    if (x > 1 && check(x - 1, y)) return 1;
    if (x < m && check(x + 1, y)) return 1;
    if (y > 1 && check(x, y - 1)) return 1;
    if (y < m && check(x, y + 1)) return 1;
	
	his.erase(pos);
	return 0;
}

int main(void)
{
	cin >> m >> n;

	memset(qp, -1, 10000);

	for (int i = 0; i < n; i++)
	{
		int x = 0, y = 0;
		cin >> x >> y;
		cin >> qp[y - 1][x - 1];
	}

	cout << check(1, 1);

	system("pause");
	return 0;
}
```

## $$\mathscr{W}$$ 选择 ( choose )



```cpp
#include <bits/stdc++.h>
using namespace std;

bool used[20] = {0};
int com[20] = {0};
int n, k;
int ans = 0;
int x[20] = {0};

int sum(void)
{
	int sum = 0;
	for (int i = 0; i < k; i++)
	{
		sum += com[i];
	}
	return sum;
}

bool check_prime(int num)
{
	if (num == 1)
		return false;
	for (int i = 2; i <= sqrt(num); i++)
	{
		if (num % i == 0)
		{
			return false;
		}
	}
	return true;
}

void comGet(int start, int layer)
{
	if (layer == k)
	{
		if (check_prime(sum()))
			ans++;
		else
			return;
	}
	for (int i = start; i < n; i++)
	{
		if (!used[i])
		{
			used[i] = true;
			com[layer] = x[i];
			comGet(i + 1, layer + 1);
			used[i] = 0;
		}
	}
}

int main(void)
{

	cin >> n >> k;

	for (int i = 0; i < n; i++)
	{
		cin >> x[i];
	}
	comGet(0, 0);
	cout << ans;

	system("pause");
	return 0;
}
```

## $$\mathscr{X}$$ 大物要挂了 ( nnzdqzrc )



```cpp
#include <bits/stdc++.h>
using namespace std;

int s1, s2, s3, s4;
set<int> total;
vector<int> man(2, 0);

void dfs(vector<int> man, int er, int layer, vector<int> &sub)
{
	int top = sub.size();
	if (layer == top)
	{
		int a = max(man[0], man[1]);
		total.insert(a);
		return;
	}
	if (layer != -1)
		man[er] += sub[layer];
	dfs(man, 0, layer + 1, sub);
	dfs(man, 1, layer + 1, sub);
}
int main(void)
{
	cin >> s1 >> s2 >> s3 >> s4;
	vector<int> A(s1), B(s2), C(s3), D(s4);
	for (int i = 0; i < s1; i++)
	{
		scanf(" %d", &A[i]);
	}
	for (int i = 0; i < s2; i++)
	{
		scanf(" %d", &B[i]);
	}
	for (int i = 0; i < s3; i++)
	{
		scanf(" %d", &C[i]);
	}
	for (int i = 0; i < s4; i++)
	{
		scanf(" %d", &D[i]);
	}
	dfs(man, 0, -1, A);
	int result = *total.begin();
	total.clear();
	dfs(man, 0, -1, B);
	result += *total.begin();
	total.clear();
	dfs(man, 0, -1, C);
	result += *total.begin();
	total.clear();
	dfs(man, 0, -1, D);
	result += *total.begin();

	cout << result;
	system("pause");
	return 0;
}
```

## $$ \mathscr{Y} $$ 世界是一个巨大的二分 ( binary )



```cpp
#include <bits/stdc++.h>
using namespace std;

void SuperFunc(int option, vector<int> &a)
{
	vector<int>::iterator iter1;
	vector<int>erator iter2;
::it
	int x, y, counter = 0;
	int length = a.size();
	if (option == 1)
		cin >> x;
	else
		cin >> x >> y;
	switch (option)
	{
	case 1:
		iter1 = lower_bound(a.begin(), a.end(), x);
		iter2 = upper_bound(a.begin(), a.end(), x);
		counter = distance(iter1, iter2);
		break;
	case 2:
		iter1 = lower_bound(a.begin(), a.end(), x);
		iter2 = upper_bound(a.begin(), a.end(), y);
		counter = distance(iter1, iter2);
		break;
	case 3:
		iter1 = lower_bound(a.begin(), a.end(), x);
		iter2 = lower_bound(a.begin(), a.end(), y);
		counter = distance(iter1, iter2);
		break;
	case 4:
		iter1 = upper_bound(a.begin(), a.end(), x);
		iter2 = upper_bound(a.begin(), a.end(), y);
		counter = distance(iter1, iter2);
		break;
	case 5:
		iter1 = upper_bound(a.begin(), a.end(), x);
		iter2 = lower_bound(a.begin(), a.end(), y);
		counter = distance(iter1, iter2);
		break;
	}
	if (counter < 0)
		counter = 0;
	cout << counter << endl;
}
int main(void)
{
	int n, m, p;
	cin >> n >> m;
	vector<int> a(n);
	for (int i = 0; i < n; i++)
		scanf(" %d", &a[i]);
	sort(a.begin(), a.end());
	for (int i = 0; i < m; i++)
	{
		scanf(" %d", &p);
		SuperFunc(p, a);
	}

	system("pause");
	return 0;
}
```

## $$ \mathscr{Z} $$ 方程求解 ( answer )

> 本题尚未开始做qwq

```cpp
#include<bits/stdc++.h>

int main(void)
{
    cout << "我也不知道咋写的" << endl;
    return 0;
}
```

---

**你能做的，岂止如此！**
