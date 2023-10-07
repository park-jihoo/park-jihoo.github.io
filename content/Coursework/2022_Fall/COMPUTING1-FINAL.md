---
id: e5b41b7e-ffb1-4b7e-8eeb-7bdce31026ca
title: COMPUTING1 FINAL
created_time: 2021-07-13T00:24:00.000Z
last_edited_time: 2023-10-07T16:40:00.000Z
cover_image: https://www.notion.so/images/page-cover/solid_beige.png
icon_emoji: 🧞
하위 항목: []
subclass: 2022_Fall
class: Coursework
작성일시: 2021-07-13T00:24:00.000Z
상위 항목: []
_thumbnail: https://www.notion.so/images/page-cover/solid_beige.png

---

# Strongly Connected Components

*   Strongly connected components of a directed graph G = (V,E) means a maximal set of vertice C \subseteq Vsuch that for every pair of vertices u, v \in C both u \rarr v and v \rarr u

*   The transposed graph contains the edges of graph G with their directions reversed. They have exactly the same, strongly connected components. \Theta(V+E)

*   How to get Strongly Connected components

    *   Call DFS(G) to compute finish times u.f for each vertex u

    *   Create G^\top

    *   Call DFS(G^\top), but in the main loop of DFS, consider the vertices in order of decreasing u.f calculated in 1

    *   Output the vertices of each tree in the depth-first forest formed in line 3 as separate SCCs.

*   Let C and C' be distinct strongly connected components in direct graph G = (V, E) and supose that f(C) > f(C') then E^\top contains no edge (v,u) such that u \in C' and v \in C

***

# Heaps

*   Binary trees are structures defined by a finite set of nodes that contain either no nodes or left and right subtrees.

*   Full binary tree’s node is either a leaf or has degree 2. Complete binary tree is a binary tree in which all leaves have the same depth

*   Heaps: An array object that we can view as a nearly complete binary tree

*   Root is A\[1], parent(i) returns \lfloor \frac {i}{2} \rfloor, left(i) returns 2i, right(i) returns 2i+1

*   Max heap: maximum element is stored at the root, min heap은 그 반대

*   MAX-HEAPIFY lets the value float down the max heap so that subtree obeys max heap property T(n) \leq T(\frac{2n}{3}) + \Theta(1)이므로 T(n) = O(\log n)

*   BUILD-MAX-HEAP: calling MAX-HEAPIFY from the bottom-up manner 즉 i = \lfloor n/2 \rfloor에서 시작해 1까지 내려감. Cost는 O(n)

*   Heapsort: Binary Tree를 heap으로 바꾸어 주는 것으로, A\[1]부터 하나하나 A\[n]과 바꿔나간 후 MAX-HEAPIFY시켜줌

*   Priority queues: queue 같은 data structure이긴 한데 Maximum, extract\_max와 같은 것들은 heap에서 쓰던 것들

***

# Binary Search Trees

*   Inorder(root-left-right), Preorder(root-left-right), Postorder(left-right-root)

*   How to find the successor of the Binary Tree? The Successor of node is the next node visited in an inorder traversal.  If right subtree of node is empty then successor is the lowest ancestor whose left child is also an ancestor

*   Deletion of binary Tree

    *   If z has no children, simply remove if

    *   If z has only one children, elevate that child to z’s position

    *   If z has two children, find successor y and move y to take z’s position in the tree

    ```mermaid
    graph TD
    Q((Q)) --> Z((Z))
    Z --> L((L))
    Z --> R((R))
    R --> Y((Y))
    Y --> NIL
    Y --> X((X))
    ```

    ```mermaid
    graph TD
    Q((Q)) --> Y((Y))
    Y --> L((L))
    Y --> R((R))
    R --> X((X))
    ```

*   Search, insert, delete시의 complexity : O(n)

***

# Red Black Trees

*   The worst case of BST: building BST by inserting in the order, then height h = O(n)이 되어 worst case가 됨. Height에 제약을 걸기 위해 등장한 것이 Red-Black Tree

*   Rotation: maintaining the BST prpoerty by rotations O(1)

*   Red-black properties

*   Black-height bh(x) of node is the number of black nodes on the path from x to an external node

*   A red black tree with n internal nodes has height at most 2 \log (n+1), and time complexity의 maximal이 O(\log n)으로 계산됨

*   Insertion: inserting node z and check if node is consecutive red node. We try recoloring first, then go for a rotation

*   Deletion: BST Deletion처럼 하되, 움직이는 node의 original color이 BLACK이면 문제가 생김

***

# Minimum Spanning Tree

***

# Single-Source Shortest Paths

***

# Dynamic Programming

***

# All Pairs Shortest Path
