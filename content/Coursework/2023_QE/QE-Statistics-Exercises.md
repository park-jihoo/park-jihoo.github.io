---
id: 56e8ca2e-ca6c-409a-8bf0-50922da30843
title: QE Statistics Exercises
created_time: 2023-07-09T14:55:00.000Z
last_edited_time: 2023-09-16T07:30:00.000Z
하위 항목: []
subclass: 2023_QE
class: Coursework
작성일시: 2023-07-09T14:55:00.000Z
pdf: https://egrcc.github.io/docs/math/all-of-statistics.pdf
상위 항목: []

---

# Week 2

    ## Question 2.9

    	- Let X \sim \exp(\beta). Find F(x) and F^{-1}(q)

    	- Solution

    		- f(x;\beta) = \frac 1 \beta \exp(-\frac x \beta), x\ge0, \beta>0

    		- F(x;\beta) = \int_{-\infty}^{x} \frac 1 \beta \exp(-\frac t \beta) dt = 1-\exp(-\frac t\beta)

    		- q = 1 - \exp(-\frac t \beta) \rightarrow F^{-1}(q;\beta) = -\beta\ln(1-q)

    ## Question 2.14

    	- Let (X, Y) be uniformly distributed on the unit disk \{(x,y): x^2+y^2 \le 1 \}. Let R = \sqrt{X^2+Y^2} Find the CDF and PDF of R

    	- Solution

    		- PDF of (X, Y)

    			```undefined
    			f(x,y) = \begin{cases}1/\pi & \text{if } x^2 + y^2 \le 1 \\ 0 & \text{otherwise}  \end{cases}
    			```

    		- CDF: \Pr(R\le r) = \begin{cases} r^2 & \text{if } 0 \leq r \leq 1 \\ 0 & \text{if } r < 0 \\ 1 & \text{if } r > 1\end{cases}

    		- PDF: derivation of cdf

    			```undefined
    			f_R(r) = \begin{cases} 2r & \text{if  } 0 \leq r \leq 1 \\ 0 & \text{if } r < 0 \\ 1 & \text{if } r > 1\end{cases}
    			```

    ## Question 2.17

    	- Let 

    		```undefined
    		f_{X,Y}(x,y) = \begin{cases} c(x+y^2) & 0\le x \le1 \text{ and } 0\le y\le 1 \\ 0 & \text{otherwise} \end{cases}
    		```

    		Find P(X<1/2 | Y = 1/2)

    	- Solution: f_Y(y) = \int_0^1 c(x+y^2)dx = \int_0^1 cxdx + \int_0^1 cy^2 dx = c(1/2 + y^2)

    	- f_{X|Y}(x|y) = \frac{x+y^2}{1/2+y^2}, answer = \int_0^{1/2} f_{X|Y}(x|\frac 1 2)dx = \int_0^{1/2} \frac{x+1/4}{1/2+1/4}dx = 1/6 + 1/3 = 1/2

    ## Question 2.20

    	- Let X, Y \sim \text{Uniform}(0,1) be independent. find the pdf of X-Y and X/Y

    	- Solution

    		- X-Y = Z

    		- X/Y = Z

    ## Question 2.21

# Week 3

# Week 4

# Week 5

# Week 6

# Week 7
