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

    ## Trade-offs

    ## Classification Problem

# Linear Regression

# Classification

# Cross-Validation

# Bootstrap

# Model Selection

# Decision Trees

# Another Tree-based methods

# Support Vector Machine

# Unsupervised Learning
