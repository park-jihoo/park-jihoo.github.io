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

  			- CDF : F_z(Z) = P(Z \le z) = P(X-Y \le z) = P(X \le z+Y)

  				- z< -1: F_Z(z) = 0

  				- -1\leq z < 0

  					```undefined
  					F_Z(z) = P(X \leq Y + z) \\
  					= \int_0^1 \int_{y+z}^1 1 \, dx \, dy \\
  					= \int_0^1 (1 - (y + z)) \, dy \\
  					= \left[y - \frac{(y+z)^2}{2}\right]_0^1 \\
  					= \frac{1}{2} - \frac{(1+z)^2}{2}.
  					```

  				- If 0 \leq z < 1, we have

  					```undefined
  					F_Z(z) = P(X \leq Y + z) \\
  					= \int_0^{1-z} \int_{y+z}^1 1 \, dx \, dy + \int_{1-z}^1 \int_0^1 1 \, dx \, dy \\
  					= \int_0^{1-z} (1 - (y + z)) \, dy + \int_{1-z}^1 1 \, dy \\
  					= \left[y - \frac{(y+z)^2}{2}\right]0^{1-z} + \left[y\right]{1-z}^1 \\
  					= \frac{(1-z)^2}{2} + z.
  					```

  				- z \geq 1, then F_Z(z) = 1

  			- PDF

  				```undefined
  				\left[\begin{aligned}
  				f_Z(z) &= -2(1+z) \quad \text{for } -1 \leq z < 0, \\
  				f_Z(z) &= 2(1-z) \quad \text{for } 0 \leq z < 1, \\
  				f_Z(z) &= 0 \quad \text{otherwise}.
  				\end{aligned}\right]
  				```

  		- X/Y = Z

  			- CDF: F_Z(z) = P(Z\le z) = P(X/Y \le z)

  				- z \leq 0: F_Z(z)=0 since \frac XY \leq z doesn’t satisfy(좌변은 양수고 우변은 음수)

  				- z>0: F_Z(z) = F(X \le zY) = \int_0^1(\int_0^{zy}dx)dy = \int_0^1 zydy = \frac z 2

  			- PDF: for z>0, f_Z(z) = \frac12, otherwise 0

  ## Question 2.21

  	- Let X_1, ...,X_n \sim \exp(\beta) be iid. Let Y = \max\{ X_1,...,X_n\}. Find the pdf of Y

  		- CDF: F_Y(y) = P(Y \le y) = P(\max\{X_1,...,X_n\} \le y) = \prod_{i=1}^n(P(X_i)\le y) = \prod_{i=1}^n\int_0^y \beta e^{-\beta x}dx= (1-e^{-\beta y})^n

  		- PDF: \frac {d}{dy}(1-e^{-\beta y})^n

  			```undefined
  			f_Y(y) = n(1-e^{-\beta y})^{(n-1)}(\beta e^{-\beta y})
  			```

# Week 3

  ## Question 3.1

  	- Suppose we play a game where we start with c dollars. On each play of the game you either double or halve your money, with equal probability. What is your expected fortune after n trials?

  	- Solution: E[x] = p_1x_1+\dots+p_nx_n

  	- 일단 each play가 independent이고, 1번 던졌을 때 expected value가 \frac 12 \cdot \frac 1 2 + \frac 12 \cdot 2 = \frac 34이니까, n회 한 뒤에는 \left(\frac 34\right)^n이 될 것임

  ## Question 3.3

  	- Let X_1, ...,X_n\sim\text{Uniform}(0,1) and let Y_n = \max\{X_1,...X_n\}, Find \mathbb{E}(Y_n)

  	- Solution: Let F_{Y_n}(y) denote the cumulative distribution function (CDF) of Y_n. Then, we have

  		```undefined
  		\begin{aligned}
  		F_{Y_n}(y) &= \mathbb{P}(Y_n \leq y) \\
  		&= \mathbb{P}(X_1 \leq y, X_2 \leq y, \ldots, X_n \leq y) \\&= \mathbb{P}(X_1 \leq y) \cdot \mathbb{P}(X_2 \leq y) \cdots  \mathbb{P}(X_n \leq y) \\&= y^n\end{aligned}
  		```

  	- PDF of Y_n: 

  	```undefined
  	\begin{aligned}
  	f_{Y_n}(y) &= \frac{d}{dy} F_{Y_n}(y) \\
  	&= ny^{n-1}.
  	\end{aligned}
  	```

  	- \mathbb{E}(Y_n):

  		```undefined
  		\begin{aligned}
  		\mathbb{E}(Y_n) &= \int_{0}^{1} y\cdot f_{Y_n}(y)  dy \\
  		&= \int_{0}^{1} y \cdot n y^{n-1} dy \\
  		&= \left[\frac{n}{n+1} y^{n+1}\right]_{0}^{1} \\
  		&= \frac{n}{n+1}.
  		\end{aligned}
  		```

  ## Question 3.5

  	- A fair coin is tossed until a head is obtained. What is the expected number of tosses that will be required?

  	- Solution

  		```undefined
  		\begin{aligned}\mathbb{E}(N) &= \frac 12\cdot 1 + \left(\frac12\right)^2\cdot2+\cdots\\&=\sum_{i=1}^\infty\left(\frac 12\right)^i\cdot i\\&=x\end{aligned}
  		```

  	- Then, x = \frac 12 + \frac 12 x , \mathbb{E}(N) = 2

  ## Question 3.13

  	- Suppose we generate a random variable X in the following way. First we flip a fair coin. If the coin is heads, take X to have a \text{Unif}(0,1) distribution. If the coin is tails, take X to have a \text{Unif}(3,4) distribution.

  		- Find the mean of X.

  			- Solution

  				```undefined
  				\begin{aligned}
  				\mathbb{E}(X) &= \mathbb{E}(X \mid H)  \mathbb{P}(H) + \mathbb{E}(X \mid T)  \mathbb{P}(T) \\
  				&= \frac{1}{2} \cdot \frac{1}{2} + \frac{7}{2} \cdot \frac{1}{2} \\
  				&= 2
  				\end{aligned}
  				```

  		- Find the standard deviation of X.

  			- Solution

  				```undefined
  				\begin{aligned}
  				\text{Var}(X) &= \mathbb{E}[(X - \mathbb{E}(X))^2] \\
  				&= \mathbb{E}[(X - 2)^2] \\
  				&= \mathbb{E}[(X - \mathbb{E}(X) \mid H)^2]  \mathbb{P}(H) + \mathbb{E}[(X - \mathbb{E}(X) \mid T)^2]  \mathbb{P}(T) \\
  				&= \frac{1}{12} \cdot \frac{1}{2} + \frac{1}{12} \cdot \frac{1}{2} \\
  				&= \frac{1}{12}.
  				\end{aligned}
  				```

  ## Question 3.14

  	- Let X_1, ...,X_m and Y_1,...,Y_n be random variables and let a_1, ...,a_m and b_1,...b_n be constants. Show that

  		```undefined
  		\text{Cov}\left(\sum_{i=1}^ma_iX_i, \sum_{j=1}^nb_jY_j \right) = \sum_{i=1}^m\sum_{j=1}^na_ib_j\text{Cov}(X_i,Y_j)
  		```

  	- Solution(use theorem 3.19 in textbook)

  		```undefined
  		\begin{aligned}\text{Cov}\left(\sum_{i=1}^ma_iX_i, \sum_{j=1}^nb_jY_j \right) &= \mathbb{E}\left(\sum_{i=1}^ma_iX_i\cdot \sum_{j=1}^nb_jY_j \right)-\mathbb{E}\left(\sum_{i=1}^ma_iX_i\right)\mathbb{E}\left(\sum_{j=1}^nb_jY_j \right)\\&= \mathbb{E}\left(\sum_{i=1}^m\sum_{j=1}^na_ib_jX_i\cdot Y_j\right)- \sum_{i=1}^m\sum_{j=1}^na_ib_j\mathbb{E}\left(X_i\right)\mathbb{E}\left(Y_j \right)\\&=\sum_{i=1}^m\sum_{j=1}^na_ib_j\mathbb{E}\left(X_i\cdot Y_j\right)- \sum_{i=1}^m\sum_{j=1}^na_ib_j\mathbb{E}\left(X_i\right)\mathbb{E}\left(Y_j \right)\\&=\sum_{i=1}^m\sum_{j=1}^na_ib_j\text{Cov}(X_i,Y_j)\end{aligned}
  		```

  ## Question 3.22

  	- Let X \sim \text{Uniform}(0,1). Let 0<a<b<1. Let

  		```undefined
  		Y = \begin{cases}1 & 0<x<b \\ 0 & \text{otherwise}\end{cases}
  		```

  		```undefined
  		Z = \begin{cases}1 & a<x<1 \\ 0 & \text{otherwise}\end{cases}
  		```

  	- Are Y and Z independent? Why or why not?

  		- Solution: not independent, a < b이기 때문에, a<x<b인 x에서는 overlap이 발생함

  	- Find \mathbb{E}(Y|Z). Hint: What values z can Z take? Noe find \mathbb{E}(Y|Z=z)

  		- Z=1: a<x<1

  			```undefined
  			\begin{aligned}\mathbb{E}(Y|Z=1) &= \mathbb{P}(0<X<b|a<X<1)\\ &=\frac{\mathbb{P}(a<X<b)}{\mathbb{P}(a<X<1)}\\&=\frac{b-a}{1-a}  \end{aligned}
  			```

  		- Z=0: 0<x<a<b so Y=0, \mathbb{E}(Y|Z=0) = 0

  		```undefined
  		\mathbb{E}(Y|Z) = \begin{cases}
  		0 & \text{if } Z=0 \\
  		\frac{b-a}{1-a} & \text{if } Z=1
  		\end{cases}
  		```

  ## Question 3.23

  	- Find the moment generating function for the Poisson, Normal, and Gamma distributions

  	- Find from [https://en.wikipedia.org/wiki/Moment-generating_function](https://en.wikipedia.org/wiki/Moment-generating_function)

  	- Solution: Moment generating function M(t)  = \mathbb{E}\left[e^{tX}\right] = \int_{-\infty}^\infty p(x)e^{tX}dx

  		- Poission: \mathbb{E}\left[e^{tX}\right] = \sum_{k=0}^\infty e^{tk}\frac{\lambda^k e^{-\lambda}}{k!} = e^{-\lambda}\sum_{k=0}^\infty\frac{\left(\lambda e^t\right)^k}{k!} = e^{-\lambda}e^{\lambda e^t}

  		- Normal: \int_{-\infty}^\infty e^{tx}\frac{1}{\sqrt{2\pi}\sigma}e^{-\frac{(x-\mu)^2}{2\sigma^2}}dx = e^{t\mu+\frac 12 \sigma^2t^2}

  		- Gamma: M_X(t) = \mathbb{E}\left[e^{tX}\right] = \int_0^\infty e^{tx}\frac{1}{\Gamma(k)\theta^k}x^{k-1}e^{-\frac{x}{\theta}}dx = (1-t\theta)^{-k},t<\frac1\theta

  ## Question 3.24

  	- Let X_1,...,X_n \sim \exp(\beta). Find the moment generating function of X_i. Prove that \sum_{i=1}^n X_i\sim \text{Gamma}(n,\beta)

  	- Solution:

  		- Moment generating function of X_i = \int_{-\infty}^\infty p(x)e^{tx}dx = \int_0^{\infty}e^{tx}\beta e^{-\beta x}dx = \frac{\beta}{\beta-t}

  		- Let Y = \sum_{i=1}^n X_i, then

  			```undefined
  			M_Y(t) = \prod_{i=1}^n M_{X_i}(t) = \left(\frac{\beta}{\beta-t}\right)^n
  			```

  		- Moment generating function of \text{Gamma}(\alpha, \beta) = \left( \frac{1}{1-\beta t}\right)^\alpha로 위의 mnoment generating function과 일치함

# Week 4

  ## Question 5.1

  	- Let X_1, ...,X_n be iid with finite mean \mu=\mathbb{E}(X_i) and finite variance \sigma^2=\mathbb{V}(X_i). Let \bar{X_n} be the sample mean and let S_n^2 be the sample variance.

  		- Show that \mathbb{E}(S_n^2)=\sigma^2.

  			```undefined
  			\begin{aligned}\mathbb{E}(S_n^2)&=\mathbb{E}(\frac{1}{n-1}\sum_{i=1}^n (X_i-\bar{X_n})^2)\\&=\frac{1}{n-1}\mathbb{E}(n\sigma^2)\\&=\sigma^2\end{aligned}
  			```

  		- Show that S_n^2\xrightarrow{P}\sigma^2. Hint: Show that S_n^2=c_nn^{-1}\sum_{i=1}^n X_i^2 - d_n \bar{X_n^2} where c_n\rightarrow 1 and d_n\rightarrow 1. Apply the large number theorem to \sum_{i=1}^n X_i^2 and \bar{X_n^2}. Then use part (e) of Theorem 5.5

  			```undefined
  			\begin{aligned}S_n^2&=\frac{1}{n-1}\sum_{i=1}^n (X_i-\bar{X_n})^2=\frac{1}{n-1}\sum_{i=1}^n X_i^2-\frac{n}{n-1}\bar{X_n^2}\\&=\frac{1}{n}\frac{n}{n-1}\sum_{i=1}^n X_i^2-\frac{n}{n-1}\bar{X_n^2}\end{aligned}
  			```

  			그러니까 c_n=\frac{n}{n-1}\rightarrow 1 and d_n=\frac{n}{n-1}\rightarrow 1

  			Then apply LLN to \sum_{i=1}^n X_i^2 and \bar{X_n^2}, then \sum_{i=1}^nX_i^2\xrightarrow{P}n\sigma^2 and \bar{X_n^2}\xrightarrow{P}\mathbb{E}(X_i^2). So, S_n^2\xrightarrow{P} = \sigma^2

  ## Question 5.3

  	- Let X_1,...X_n be iid and let \mu=\mathbb{E}(X_1). Suppose that variance is finite. Show that \bar{X_n}\xrightarrow{qm}\mu

  		```undefined
  		\begin{aligned}\mathbb{E}(\bar{X_n})&=\mu\\\mathbb{V}(\bar{X_n})&=\frac{\sigma^2}{n}\\\mathbb{E}(\bar{X_n}-\mu)^2&=\mathbb{V}(\bar{X_n})=\frac{\sigma^2}{n}\end{aligned}
  		```

  		If n\rightarrow\infty, then \mathbb{E}(\bar{X_n}-\mu)^2\rightarrow 0 so \bar{X_n}\xrightarrow{qm}\mu

  ## Question 5.5

  	- Let X_1,...,X_n\sim\text{Bernoulli}(p). Prove that \frac{1}{n}\sum_{i=1}^n X_i\xrightarrow{P}p \text{ and } \frac{1}{n}\sum_{i=1}^n X_i^2\xrightarrow{qm}p

  	- Converge in probability

  		```undefined
  		\begin{aligned}\mathbb{P}\left(\left|\frac{1}{n}\sum_{i=1}^n X_i-p\right|>\epsilon\right) &= \mathbb{P}\left(\left|\frac{1}{n}\sum_{i=1}^n X_i-\mathbb{E}\left(\frac{1}{n}\sum_{i=1}^n X_i\right)\right|>\epsilon\right) \\
  		&= \mathbb{P}\left(\left|\frac{1}{n}\sum_{i=1}^n X_i-\mathbb{E}(X_i)\right|>\epsilon\right) \\
  		&= \mathbb{P}\left(\left|\frac{1}{n}\sum_{i=1}^n X_i-\mu\right|>\epsilon\right) \\
  		&= \mathbb{P}\left(\left|\bar{X}_n-\mu\right|>\epsilon\right) \\
  		&= \mathbb{P}\left(|\bar{X}_n-\mu|^2>\epsilon^2\right) \\
  		&\leq \frac{\mathbb{E}\left(|\bar{X}_n-\mu|^2\right)}{\epsilon^2} \\
  		&= \frac{\mathbb{V}(\bar{X}_n)}{\epsilon^2} \\
  		&= \frac{p(1-p)}{n\epsilon^2} \rightarrow 0\end{aligned}
  		```

  	- Converge in Quadratic Mean

  		```undefined
  		\begin{aligned}\mathbb{E}\left(\frac{1}{n}\sum_{i=1}^n X_i^2 - p\right)^2 &= \mathbb{E}\left(\frac{1}{n}\sum_{i=1}^n X_i^2 - \mathbb{E}\left(\frac{1}{n}\sum_{i=1}^n X_i^2\right)\right)^2 \\
  		&= \mathbb{E}\left(\frac{1}{n}\sum_{i=1}^n X_i^2 - \mathbb{E}(X_i^2)\right)^2 \\
  		&= \mathbb{E}\left(\frac{1}{n}\sum_{i=1}^n (X_i^2 - p)^2\right) \\
  		&= \mathbb{V}\left(\frac{1}{n}\sum_{i=1}^n X_i^2\right) \\
  		&= \frac{\mathbb{V}(X_i^2)}{n} \\
  		&= \frac{p(1-p)}{n} \rightarrow 0\end{aligned}
  		```

  ## Question 5.6

  	- Suppose that the height of men has mean 68 inches and standard deviation 2.6 inches. We draw 100 men at random. Find (approximately) the probability that the average height of men in our sample will be at least 68 inches.

  		```undefined
  		\begin{aligned}\mathbb{P}(\bar{X}_n \geq 68) &= \mathbb{P}\left(\frac{\bar{X}_n - \mu}{\sigma/\sqrt{n}} \geq \frac{68 - \mu}{\sigma/\sqrt{n}}\right) \\
  		&= \mathbb{P}\left(Z \geq \frac{68 - \mu}{\sigma/\sqrt{n}}\right) \\
  		&= 1 - \Phi\left(\frac{68 - \mu}{\sigma/\sqrt{n}}\right) \\
  		&= 1 - \Phi\left(\frac{68 - 68}{2.6/\sqrt{100}}\right) \\
  		&= 1 - \Phi(0) = 0.5\end{aligned}
  		```

  	- Use CLT, \bar{X_n}\xrightarrow{d}N(\mu,\frac{\sigma^2}{n}), so \frac{\bar{X_n}-\mu}{\sigma/\sqrt{n}}\xrightarrow{d}N(0,1)이므로 위의 식을 적용할수 있음

  ## Question 5.8

  	- Suppose we have a computer program consisting of n=100 pages of code. Let X_i be the number of errors on the i^{th} page of code. Suppose that X_i's are Poission with mean 1 and that they are independent. Let Y=\sum_{i=1}^nX_i be the total number of errors in the program. Use CLT to approximate \mathbb{P}(Y<90)

  		```undefined
  		\begin{aligned} \mathbb{P}(Y < 90) &= \mathbb{P}\left(\frac{Y - n\mu}{\sqrt{n\sigma^2}} < \frac{90 - n\mu}{\sqrt{n\sigma^2}}\right) \\
  		&= \mathbb{P}\left(Z < \frac{90 - n\mu}{\sqrt{n\sigma^2}}\right) \\
  		&= \Phi\left(\frac{90 - n\mu}{\sqrt{n\sigma^2}}\right) \\
  		&= \Phi\left(\frac{90 - 100}{\sqrt{100}}\right) \\
  		&= \Phi(-1) = 0.1587\end{aligned}
  		```

  ## Question 5.9

  	- Suppose that \mathbb{P}(X=1)=\mathbb{P}(X=-1)=1/2. Define

  		```undefined
  		X_n=\begin{cases}X&\text{with probability }1-\frac{1}{n}\\e^n&\text{with probability }\frac1n\end{cases}
  		```

  		Does X_n converge to X in probability? Does X_n converge to X in distribution? Does \mathbb{E}(X-X_n)^2 converge to 0?

  	- Probability: \mathbb{P}(|X_n-X|>\epsilon)=\mathbb{P}(X_n=e^n)=\frac{1}{n}\rightarrow 0

  	- Distribution

  		```undefined
  		\begin{aligned}\lim_{n\rightarrow\infty}\mathbb{P}(X_n\leq x) &= \lim_{n\rightarrow\infty}\mathbb{P}(X_n\leq x|X_n=X)\mathbb{P}(X_n=X) \\
  		&\quad + \lim_{n\rightarrow\infty}\mathbb{P}(X_n\leq x|X_n=e^n)\mathbb{P}(X_n=e^n) \\
  		&= \mathbb{P}(X\leq x) + 0 \\
  		&= \mathbb{P}(X\leq x)\end{aligned}
  		```

  	- \mathbb{E}(X-X_n)^2 converge to 0?

  		```undefined
  		\begin{aligned}\mathbb{E}(X - X_n)^2 &= \mathbb{E}(X^2 - 2X_nX_n + \mathbb{E}(X_n)^2) \\
  		&= \mathbb{E}(X^2) - 2\mathbb{E}(X_n^2) + \mathbb{E}(X_n)^2\end{aligned}
  		```

  		```undefined
  		\begin{aligned}\mathbb{E}(X^2) &= 1 \\
  		\mathbb{E}(X_n^2) &= \mathbb{E}(X^2) = 1 \\
  		\mathbb{E}(X_n) &= \mathbb{E}(X) = 0\\\mathbb{E}(X - X_n)^2 &= 1 - 2(1) + (0)^2 \\
  		&= 1 - 2 + 0 \\
  		&= 1\end{aligned}
  		```

  ## Question 5.11

  	- Suppose that X_n\sim N(0,1/n) and Let X be a random variable with distribution F(X)=0 if x<0 and F(x)=1 if x\geq 0. Does X_n converge to X in probability? Does X_n converge to X in distribution?

  	- Probability:

  		- Definition of the random variable: X_n

  		- Relationship with the absolute value: |X_n - X| = |X_n| = X_n

  		- Probability of the absolute value exceeding a threshold \epsilon:

  			```undefined
  			P(∣X_n∣≥ϵ)=P\left(\left|\frac1{\sqrt{n}}Z_n\right|≥ϵ\right)=P(∣Z_n∣≥ϵ\sqrt{n})
  			```

  		- As n becomes larger, \epsilon\sqrt{n} becomes larger, so:
  		\lim_{n→∞}P(|X_n|≥ϵ)→0

  	- Distribution:

  		- Cumulative distribution function (CDF) of X_n:

  			```undefined
  			F_{X_n}(x)=P(X_n≤x)=P(\frac1{\sqrt{n}}Z_n≤x)=P(Z_n≤x\sqrt n)=Φ(x\sqrt n)
  			```

  		- Limit of the CDF as n approaches infinity:

  			```undefined
  			\lim_{⁡n→∞}F_{X_n}(x)=\lim_{⁡n→∞}Φ(\sqrt nx)
  			```

  		- As n becomes larger, \sqrt{n} becomes larger, so \sqrt{n}x can be any real value. Therefore:

  			- For x \geq 0: \lim_{n\rightarrow\infty} F_{X_n}(x) = \Phi(\infty) = 1

  			- For x < 0: \lim_{n\rightarrow\infty} F_{X_n}(x) = \Phi(-\infty) = 0 because \Phi is continuous.

  ## Question 5.15

  	- \begin{pmatrix}X_{11}\\X_{21}\end{pmatrix},\begin{pmatrix}X_{12}\\X_{22}\end{pmatrix},...,\begin{pmatrix}X_{1n}\\X_{2n}\end{pmatrix} are iid random vectors with mean \mu=(\mu_1, \mu_2) and variance \Sigma. \bar{X_1}=\frac1n\sum_{i=1}^nX_{1i} and \bar{X_2}=\frac1n\sum_{i=1}^nX_{2i}. Y_n=\frac{\bar{X_1}}{\bar{X_2}}.

  	- The mean of \bar{X_1} is \mu_1, and its variance is \frac{\Sigma_{11}}{n}.

  	- The mean of \bar{X_2} is \mu_2, and its variance is \frac{\Sigma_{22}}{n}.

  	- The variance of Y_n is given by Var(Y_n) = \frac{Var(\bar{X_1})}{Var(\bar{X_2})} = \frac{\Sigma_{11}}{\Sigma_{22}}.

  	- Applying the Central Limit Theorem (CLT), as n becomes larger, Y_n will have a normal distribution with mean \frac{\mu_1}{\mu_2} and variance \frac{\Sigma_{11}}{\Sigma_{22}}. Thus, the limiting distribution of Y_n is a normal distribution with mean \frac{\mu_1}{\mu_2} and variance \frac{\Sigma_{11}}{\Sigma_{22}}.

  ## Question 5.16

  	- Construct an example where X_n\rightsquigarrow X and Y_n\rightsquigarrow Y but X_n+Y_n\not\rightsquigarrow X+Y

  	- X_n\sim N(0,1) and Y_n\sim N(0,1)

  	- X_n\rightsquigarrow X and Y_n\rightsquigarrow Y because X_n and Y_n are normal distribution

# Week 5

# Week 6

# Week 7
