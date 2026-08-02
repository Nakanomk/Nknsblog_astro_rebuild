---
title: TheShell
description: TheShell
publishDate: '2026-07-13 21:47:11'
tags:
  - Code
  - Learn
language: 中文
order: 2
---

## The Shell

### commands

```bash
ls
cd
# relative paths .. . ~
date
man
[command] --help # help informations
cat
sort [file] # to sort the lines in file in Lexicographical order
echo
rm
rmdir
mkdir
touch
tail -n[num] [filename]
head -n[num] [filename]
grep [mode] [filename]
sed
pwd # present working directory
```

### The prefix of bash

The prefix of shell shows `user@os_name [pwd] $`

### About Escape

```bash
echo Hello world # prints "Hello world" as two arguments
echo Hello    world # same output
echo "Hello world" # prints "Hello world"
echo Hello\ world # Uses an escape character to send "Hello world" as an argument
echo "Jon's computer" # prints "Jon's computer"
echo 'Jon's computer'' # prints "Jon" and then "s computer"
echo Jon\'s\ computer # prints "Jon's computer"
```

### some high-level usage for commands

```bash
grep -r [string] [directory]
sed [many comlicated usage]
find [path]
  -maxdepth [num]
  -type [type_argument]
  -mtime +[days]
  -size +[size]
  -name [filename]
```

### Regular Expressions

```bash
a.* # a, ab, abc, apple or something
^a # starts with a
. # Any letter
<letter>* # letter 0 times or more
ab+c # abc, abbc, abbbc... but not ac
colou?r # colour or color, u for 0 times or once
[abc] # a or b or c, like a, b, c
[a-z] # all little letters
[A-Z] # all capital letters
[0-9] # all numbers
[^abc] # not a, b or c
[a-zA-Z0-9] # letters or numbers
\d # for [0-9]
\d\d # for 10-99
\D # for not numbers
\s # for blanks

```

### awk

```bash
awk '{print $2}' data
```
