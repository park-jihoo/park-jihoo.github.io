---
id: 5841078d-8328-4c56-88eb-2271eb5f5b65
title: QE Math Exercises
created_time: 2023-07-09T14:54:00.000Z
last_edited_time: 2023-09-16T07:30:00.000Z
하위 항목: []
subclass: 2023_QE
class: Coursework
작성일시: 2023-07-09T14:54:00.000Z
pdf: https://mml-book.github.io/book/mml-book.pdf
상위 항목: []

---

# Week 2

    ## Question 3.1

    	- Show that  \langle \cdot,\cdot\rangle defined for all x = \begin{bmatrix}x_1,x_2\end{bmatrix}^\top\in\R^2 and y = \begin{bmatrix}y_1,y_2\end{bmatrix}^\top\in\R^2 by

    		```undefined
    		\langle x,y\rangle := x_1y_1 - (x_1y_2+x_2y_1)+2(x_2y_2)
    		```

    		is inner product

    	- Solution

    		- Symmetric: \langle y,x\rangle = y_1x_1-(y_1x_2+x_1y_2)+2(y_2x_2) = \langle x,y\rangle

    		- Positive Definite: \langle x,x\rangle = x_1^2 - 2x_1x_2 + 2x_2^2 = (x_1-x_2)^2+x_2^2 \ge0

    		- Linear: \langle x, ay \rangle = ay_1x_1 - ay_1x_2 - ax_1y_2 + 2ay_1x_2 = a \langle x,y \rangle

    ## Question 3.2

    	- Consider \R^2 with \langle \cdot,\cdot\rangle defined for all x and y  in \R^2 as

    		```undefined
    		\langle x, y\rangle:= x^\top\underbrace{ \begin{bmatrix} 2&0\\1&2\end{bmatrix}}_{:=A}y
    		```

    		Is \langle \cdot,\cdot\rangle an inner product?

    	- Solution: A should be symmetric, and positife definite. However A is not symmetric → not inner product!

    ## Question 3.3

    	- Compute the distance between

    		```undefined
    		x=\begin{bmatrix}1\\2\\3\end{bmatrix}, y = \begin{bmatrix}-1\\-1\\0\end{bmatrix}
    		```

    		using

    		- \langle x, y\rangle:=x^\top y

    			- Solution: distance = \sqrt{\langle x-y, x-y\rangle} 인데 dot product이니까,

    				```undefined
    				x-y = \begin{bmatrix}2\\3\\3\end{bmatrix}
    				```

    				이걸 적용하면, 2^2+3^2+3^2 = 13

    		- \langle x, y\rangle:=x^\top A y, A:=\begin{bmatrix}2&1&0\\1&3&1\\0&-1&2 \end{bmatrix}

    			- Solution: 위에서 구한 x-y에다가 A를 양 옆에 곱해줌

    ## Question 3.5

    ## Question 3.6

    ## Question 3.10

# Week 3

# Week 4

# Week 5

# Week 6
