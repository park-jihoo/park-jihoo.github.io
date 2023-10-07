---
id: bcab10cb-9cba-471e-bda4-771a583f9f1e
title: Machine Learning and Deep Learning
created_time: 2023-08-07T06:47:00.000Z
last_edited_time: 2023-08-30T13:49:00.000Z
하위 항목:
  - id: 3e9df96f-67fe-46ce-9ea1-126fdb9a9fc7
subclass: 2023_QE
class: Coursework
작성일시: 2023-08-07T06:47:00.000Z
상위 항목: []

---

# Linear Regression

    ## Simple Linear Regression with single predictor

    	- Assume a model

    		```undefined
    		Y = \beta_0 + \beta_1 X + \epsilon
    		```

    		where \beta_0 and \beta_1 are two unknown constants that represent the intercept and slope.

    	- Given some estimates \hat\beta_0 and \hat\beta_1 for the model coefficients, we predict

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
    		H_0 : \beta_1 = 0 \text{ vs. } H_A: \beta_1\not=0
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

    	- The ideal scenario is when the predictors are uncorrelated because correlations amongst predictors cause problems

    	- We calculate RSS and \hat\beta like this

    	- If X^\top X is not invertible, that means columns are not independent, and it’s not full rank. This means xs are correlated.

    	- Is at least 1 predictor useful? We use F-statistic to check this

    ## Deciding on the important variables

# Classification: Logistic Regression

# Classification: Generative Models for Classification

# Resampling Methods: Cross-Validation, Bootstrap

# Model Selection: Subset Selection

# Model Selection: Shrinkage Methods

# Tree Based Methods, Decision Trees, Bagging, Random forests, Boosting

# SVM

# Unsupervised Learning: PCA & Clustering

# Nearest Neighbor Classifiers

# Linear & Softmax Classifiers

# Neural Networks & Backpropagation

# Convolution Neural Networks

# Activation functions, data augmentation, weight initialization, learning rate

# Regularization, advanced optimization, batch norm

# Recurrent Neural Networks

# Attentions & Basics of Transformer
