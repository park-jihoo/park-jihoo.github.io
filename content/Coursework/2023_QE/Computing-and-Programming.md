---
id: 4ffcbbdd-3d96-4cb4-8ef1-56e0344af2cc
title: Computing and Programming
created_time: 2023-08-07T06:46:00.000Z
last_edited_time: 2023-09-09T03:23:00.000Z
하위 항목: []
subclass: 2023_QE
class: Coursework
작성일시: 2023-08-07T06:46:00.000Z
상위 항목: []

---

# Python Programming Basics

    - Types: Every value in python has particular type(int, float)

    - Call expressions: an expression that calls a function

    - Values do not have any meaning, so now we want to name them as **Variable**

    - You can create a new variable by naming and assigning it a value

    - String type is a type to represent text values

    - Type **bool** has only two values True or False

    - Class: another type of **object** that has variables and functions similar to module

    - Object Oriented Programming

    	- Encapsulation: Contain related information in an object

    	- Abstraction: Expose only high level interfaces to the outside world

    	- Inheritance: Child classes inherit data and behaviors from parent class

    	- Polymorphism: A single method acts in a different way depending on objects

# Recursion, Search and Sorting algorithms

    ## Search

    	### Linear Search

    		- Search from the first item to the last item sequentially

    			```python
    			def linear_search(L, value):
    				for i in range(len(L)):
    					if L[i] == value:
    						return i
    				return -1
    			```

    		- Time complexity: Linearly Increasing

    	### Binary Search

    		- One evaluation removes **half** of candidate entries

    			```python
    			def binary_search(L, v):
    				start, end = 0, len(L)-1
    				while start != end + 1:
    					mid = (start + end) // 2
    					if L[mid] < v:
    						start = mid + 1
    					else:
    						end = mid - 1
    				if start < len(L) and L[start] == v:
    					return start
    				else:
    					return -1
    			```

    		- Time complexity: proportional to log 2

    ## Sort

    	### Selection Sort

    		- Find the minimum value of the unsorted list and swap it with the leftmost entry

    			```python
    			def selection_sort(L):
    				for i in range(len(L)):
    					smallest = i
    						for j in range(i+1, len(L)):
    							if L[j]<L[smallest]:
    								smallest = j
    					L[i], L[smallest] = L[smallest], L[i]
    			```

    		- Time complexity O(n^2)

    	### Insertion Sort

    		- Insert the leftmost item of the unsorted list to the proper location of the sorted list

    		- Time complexity O(n^2)

    	### Merge Sort

    ## Recursion

# Linked Lists

# Binary Search Trees

# Trees and Graphs

# Hash

# Bits, Data types, and Operations

# Von Neumann model and Machine Code

# C programming basics

# I/O in C

# Dynamic data structures in C

# Algorithm Basics
