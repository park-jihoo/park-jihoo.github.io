---
id: d8913c3a-829d-42bf-8f77-fc465794b330
title: MLDL1 MID
created_time: 2023-07-25T05:02:00.000Z
last_edited_time: 2023-10-07T08:35:00.000Z
icon_emoji: 💨
하위 항목: []
subclass: 2022_Fall
class: Coursework
작성일시: 2023-07-25T05:02:00.000Z
상위 항목: []

---

# Statistical Learning

    ## Is there an ideal f(X)?

    	- \mathbb{E}(Y|X=4) means expected value of Y given X = 4

    	- The good choice of f(x) = \mathbb{E}(Y|X=x) is called the regression function

    ## Regression function f(x)

    	- Is the ideal or optimal predictor of Y with regard to mean-squared prediction error: f(x) = \mathbb{E}(Y|X=x) is the function that minimizes \mathbb{E}[(Y-g(X))^2|X=x] over all functions g at all points X =x

    	- \epsilon = Y-f(x) is the irreducible error. Even if we knew f(x) we would still make erros in prediction ,since at each X=x there is typically a distribution of possible 

    	- For any estimate of \hat f(x) of f(x), we have

    		```undefined
    		\begin{aligned}\mathbb{E}\left[(Y-\hat f(X))^2 | X= x \right]&=\mathbb E\left[(f(X)+\epsilon - \hat f(X))^2|X=x \right]\\&=[f(x)-\hat f(x)]^2 + \text{Var}(\epsilon)\end{aligned}
    		```

    ## How to estimate f

    	- We will always assume that we have observed a set of n different data points, which are called training data

    	- Our goal is to apply learning method to the training data in order to estimate the unknown function f

    	- Most statistical learning method for this task can be characterized as either **parametric** or **non-parametric**

    	### Parametric(Structured) Models
    	
    	- A linear model is an important example of a parametric model, which is specified in terms of p+1 parameters
    	
    	- Another examples: Logistic model, or etc.
    	
    	- There exist a risk that the functional form used to estimate f can be different from true f
    	
    	
    	
    	### Non-parametric models
    	
    	- Non parametric methods do not make explicit assumptions about the functional form of f.
    	
    	- They seek in estimate of f that gets close to data points as possible without being too rough or wiggly
    	
    	- Non-parametric model require a very large number of observations to obtain an accurate estimate for f

    ## Trade-offs

    	- Prediction accuracy vs. interpretability

    	- Goot fit vs overfit(or underfit)

    	- Parsimony vs black-box

    	### Model accuracy

    	```undefined
    	\text{MSE}_\text{te} = \text{Ave}_{i\in\text{te}}\left[y_i - \hat f(x_i)  \right] ^2 = \frac 1M \sum_{i\in\text{te}}\left[y_i - \hat f(x_i)  \right] ^2 
    	```

    	- Compute model accuracy using fresh test data different from training data

    	### Bias-Variance Tradeoff

    	```undefined
    	\mathbb{E}\left[y_0 - \hat f(x_0) \right]^2 = \text{Var}(\hat f(x_0)) + \left[\text{Bias}(\hat f(x_0)) \right]^2 + \text{Var}(\epsilon)
    	```

    	- Typically as the flexibility of \hat f increases, its variance increases and its bias decreases. So choosing the flexibility based on average test error amounts to bias-variance tradeoff

    ## Classification Problem

    	- If Y is qualitive, build a classifier C(X) that assigns a class label from C to future unlabeled observation X

    	- Bayes optimal classifier at x is

    		```undefined
    		C_{\text{Bayes}}(x)=j^* \text{ where  }j^* = \arg\max_{j\in C}\mathbb P(Y=j|X=x)
    		```

    		and this classifier has smallest error

# Linear Regression

    ## Simple Linear Regression with single predictor

    	- Assume a model

    		```undefined
    		Y = \beta_0 + \beta_1 X + \epsilon
    		```

    		where \beta_0 and \beta_1 are two unknown constants that represent the intercept and slope.

    	- Given some estimates \hat\beta_0 and \hat\beta_1 for the model coefficients, we predict ]

    		```undefined
    		\hat y = \hat\beta_0 + \hat\beta_1x
    		```

    	- The residual sum of square RSS = e_1^2 + e_2^2 + \cdots+e_n^2

    	- The least squares approach to choose \hat\beta_0 and \hat\beta_1 to minimize RSS

    		```undefined
    		\hat\beta_1 = \frac{\sum_{i=1}^n(x_i-\bar x)(y_i - \bar y)}{\sum_{i=1}^n(x_i-\bar x)^2}\\ \hat\beta_0 = \bar y - \hat\beta_1x
    		```

    	- Standard error of estimator reflects how it varies under repeated sampling

    		```undefined
    		SE(\hat\beta_1)^2 = \frac{\sigma^2}{\sum_{i=1}^n(x_i-\bar x)^2}, SE(\hat\beta_0)^2=\sigma^2\left[ \frac1n + \frac{\bar x^2}{\sum_{i=1}^n(x_i-\bar x)^2}\right]
    		```

    	- This standard error can be used to compute confidence intervals!

    ## Hypothesis Testing

    	- Null hypothesis H_0 means there is no relationship between X and Y

    	- Alternative hypothesis H_A means there is some relationship between X and Y

    	- In linear regression,

    		```undefined
    		H_0 : \beta_1 = 0 \text{ versus } H_A: \beta_1\not=0
    		```

    	- To test null hypothesis, we compute t-statistics with n-2 degrees of freedom

    		```undefined
    		t = \frac{\hat\beta_1 - 0}{SE(\hat\beta_1)}
    		```

    	- Residual standard error RSE = \sqrt{\frac{RSS}{n-2}}

    	- R-squared R^2 = 1-\frac{RSS}{TSS}

    	- Correlation r = \frac{\sum_{i=1}^n(x_i-\bar x)(y_i - \bar y)}{\sqrt{\sum_{i=1}^n(x_i-\bar x)^2}\sqrt{\sum_{i=1}^n(y_i-\bar y)^2}}

    ## Multiple Linear Regression

    	- Model is

    		```undefined
    		Y = \beta_0 + \beta_1 X_1 + \beta_2X_2 +\cdots+\beta_pX_p+\epsilon
    		```

    	- The ideal scenario is when the predictors are uncorrelated because correlations amongst predictors cause problems

    	- We calculate RSS and \hat\beta like this

    		```undefined
    		\begin{aligned}RSS &= (y-X\hat\beta)^\top(y-X\hat\beta)\\\frac{\partial RSS}{\partial\hat\beta}&=-2X^\top y + 2X^\top X\hat\beta = 0\\\hat\beta &= (X^\top X)^{-1}X^\top y\end{aligned}
    		```

    	- If X^\top X is not invertible, that means columns are not independent, and it’s not full rank. This means xs are correlated.

    	- Is at least 1 predictor useful? We use F-statistic to check this

    		```undefined
    		F = \frac{(TSS-RSS)/p}{RSS/(n-p-1)}\sim F_{p,n-p-1}
    		```

    ## Deciding on the important variables

    	- Forward selection: begin with null model and fit p simple linear regression, then add to model with lowest RSS

    	- Backward selection: begin with full model, and remove the variable with largest p value

    	- How to choose optimal member? AIC, BIC, adjusted R-square, CV

# Classification

    - Logistic regression or discriminant analysis is more appropriate than linear regression!

    ## Logistic Regression

    	- Logistic regression uses the form

    		```undefined
    		p(X;\beta) = \frac{e^{\beta_0+\beta_1 X}}{1+e^{\beta_0+\beta_1 X}}
    		```

    	- If we rearrange this, then

    		```undefined
    		\log\left(\frac{p(X;\beta)}{1-p(X;\beta)} \right) = \beta_0 + \beta_1 X
    		```

    		and this monotone transformation is called the log odds

    ## Maximum Likelihood Estimation

    	- We use maximum likelihood to estimate the parameters

    		```undefined
    		\mathcal{L}(\beta) = \mathcal{L}(\beta_0, \beta_1) = \prod_{i:y_i=1}p(x_i;\beta)\prod_{j:y_j=0}(1-p(x_j;\beta))
    		```

    	- This likelihood gives the probability of the observed zeros and ones in the data, and we pick \beta to maximize the likelihood of the observed data.

    	- Log make products to sums

    		```undefined
    		\log\mathcal{L}(\beta) = \sum_{i:y_i=1}\log p(x_i;\beta)+\sum_{j:y_j=0}\log(1-p(x_j;\beta))
    		```

    	- To maximize log likelihood, set its derivatives to zero, but this doesn’t have closed form

    ## Multiple Logistic Regression

    	- Confounding: Outcome에 영향을 미치는 것을 포함시키지 않으면 결과가 달라질 수 있는 것을 언급함 → 해결하기 위해서 Multiple Logistic Regression 이용

    	- For class k \in \{1,...,K\}

    		```undefined
    		\mathbb{P}(Y=k|X,\beta) = \frac{e^{\beta_{0k}+\beta_{1k}X_1+\cdots+\beta_{pk}X_p}}{\sum_{l=1}^Ke^{\beta_{0l}+\beta_{1l}X_1+\cdots+\beta_{pl}X_p}}
    		```

    ## Linear Discriminant Analysis

    	- Use Bayes theorem slightly differently

    		```undefined
    		\mathbb{P}(Y=k|X=x) = \frac{\pi_kf_k(x)}{\sum_{l=1}^K\pi_lf_l(x)}
    		```

    	- When the classes are well separated, the parameter estimates for the logistic regression model are surprisingly unstable.

    	### LDA when p=1

    	- p_k(x) = \mathbb P(Y=k|X=x), and \delta_k(x) = \log p_k(x)

    	- k^* = \argmax_k p_k(x) = \argmax_k\delta_k(x) = x\frac{\mu_k}{\sigma^2}-\frac{\mu_k^2}{2\sigma^2}+\log(\pi_k)

    	- Then, \hat\mu_k = \frac 1{n_k} \sum_{i:y_i=k}x_i, \hat\sigma^2 = \sum_{k=1}^K\frac{n_k-1}{n-K}\hat\sigma_k^2, \hat\pi_k =\frac{n_k}n

    	### LDA when p>1

    	- Density

    		```undefined
    		f(x) = \frac1{(2\pi)^{p/2}|\Sigma|^{1/2}}e^{-\frac12(x-\mu)^\top\Sigma^{-1}(x-\mu)}
    		```

    	- Discriminant funciton \delta_k(x) = x^\top\Sigma^{-1}\mu_k - \frac 12 \mu_k^\top\Sigma^{-1}\mu_k + \log\pi_k

    	- Once we have estimated \hat\delta_k(x), then we can turn theses into estimates for class probabilities

    		```undefined
    		\mathbb{\hat P}(Y=k|X=x) = \frac{e^{\hat\delta_k(x)}}{\sum_{l=1}^K e^{\hat\delta_l(x)}}
    		```

    ## Types of errors

    	- False positive rate: The fraction of negative examples that are classified as positive

    	- False negative rate: The fraction of positive examples that are classified as negative

    	- In order to reduce the false negative rate, we may want to reduce threshold but it may increase the overall error rate

    ## Quadratic Discriminant Analysis

    	- With Gaussians but different \Sigma_k in each class, we get quadratic discriminant analysis

    	- \delta_k(x) = -\frac12(x-\mu_k)^\top \Sigma_k^{-1}(x-\mu_k)+\log\pi_k-\frac12\log|\Sigma_k|

    ## Naive Bayes

    	- Assume features are independent in each class

    	- Gaussian naive bayes assumes each \Sigma_k is diagonal

# Cross-Validation

# Bootstrap

# Model Selection

# Decision Trees

# Another Tree-based methods

# Support Vector Machine

# Unsupervised Learning
