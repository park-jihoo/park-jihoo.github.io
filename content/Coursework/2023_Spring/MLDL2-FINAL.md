---
id: c2739906-38a1-4cbc-accb-4604cfa99402
title: MLDL2 FINAL
created_time: 2023-06-13T05:02:00.000Z
last_edited_time: 2023-10-07T16:40:00.000Z
cover_image: https://www.notion.so/images/page-cover/met_john_singer_sargent_morocco.jpg
icon_emoji: 💬
하위 항목: []
subclass: 2023_Spring
class: Coursework
작성일시: 2023-06-13T05:02:00.000Z
상위 항목: []
_thumbnail: https://www.notion.so/images/page-cover/met_john_singer_sargent_morocco.jpg

---

# Components of Learning

    - Task: the main goal of learning

    - Experience: a.k.a dataset

    - Performance Measure: evaluate the ability to perform the task

    ```undefined
    \theta_\tau^* \leftarrow A_\phi (D_\tau, P_\tau, L_\tau, f_\theta)
    ```

    - Empirical Risk

    ```undefined
    \frac 1 n \sum_{i=1}^n L_\tau(d^{(i)}, f_\theta)
    ```

# Optimization

    ### Expected Risk

    ```undefined
    R(f_\theta, \tau) = \int L_\tau(f_\theta(x), y)dP_\tau(x, y)
    ```

    - We need to approximate joint distribution by the empirical distribution

    - Empirical risk minimization(ERM)

    ```undefined
    \arg\min_\theta R(f_\theta, \tau) = \arg\min_\theta \frac 1 n \sum_{i=1}^n L_\tau(f_\theta(x_i), y_i)
    ```

    - It prones to overfitting, so need additional things to improve generalization

    ### Gradient Descent

    ```undefined
    \theta \leftarrow \theta - \alpha \nabla_\theta R(f_\theta, \tau)
    ```

    - A first-order iterative optimization algorithm for finding a local minimum of a differentiable function

    - However, there are local minimum or saddle points, so subsampling principle to gradient descent → Stochastic Gradient Descent

    - SGD has high variance, noisy gradient and it leads to slow convergence

    - Mini-batch SGD: use multiple data(not full) to estimate gradients

    	```undefined
    	\theta \leftarrow \theta - \alpha \nabla_\theta \frac 1 {|B_i|} \sum_{(x, y) \in B_i} L_\tau (f_\theta(x), y)
    	```

    - Larger LR for dimension with less curvature, smaller LR for dimension with more curvature

    ### Normalization

    - Input data normalization x \leftarrow \frac {x - \mu}{\sigma}

    - Batch normalization \hat{x_i} = \frac{x_i - \mu_B}{\sqrt{\sigma^2_B+\epsilon}}

    	- Adaptive reparameterization

    	- Internal covariate shift in DNN with SGD

    ### Gradient Momentum

    - Make step smaller when gradients reverse sign, and larger when gradients are consistent

    	```undefined
    	\theta_{t+1} \leftarrow \theta_t - \alpha \nabla_\theta R(\theta_t) + \gamma(\theta_t - \theta_{t-1})
    	```

    - Fix poor conditioning of Hessian matrix, and reduce variance in stochastic gradient

    ### Adaptive Learning Rates

    ```undefined
    \theta_{t+1} \leftarrow \theta_t - \alpha_t \cdot \nabla_\theta R(\theta_t)
    ```

    - Adagrad: accumulate second moment estimate r_j = r_j + g_j^2 for all i \in \{ 1,...,d\} 

    - Rmsprop: accumulate second moment estimate  r_j = \rho r_j + (1-\rho)g_j^2 for all i \in \{ 1,...,d\} 

    - Adam: accumulate first moment estimate, second moment estimate

    ### Others

    - Regularization: avoid overfitting / memorization

    - Gradient Clipping

# Data Augmentation

    - Many diverse samples give accurate approximation, so make virtual samples in training dataset, but not randomly!

    - Vicinal Risk Minimization(VRM)

    	```undefined
    	P_\tau (x, y) = \frac 1 n \sum_{i=1}^n v(x,y|x_i, y_i) = \frac 1 n \sum_{i=1}^n N(x-x_i, \sigma^2)\delta(y=y_i)
    	```

    - Label Invariant augmentation

    	```undefined
    	P_\tau (y|x) = P_\tau(y|\Tau_\gamma(x))
    	```

    	- Label invariant = same semantic meaning = content preserving

    	- Classifier to be invariant of it

    	- Transformation with parameter \gamma → randomly sample \gamma

    	- Use / combine many as possible

    	```python
    	transform_train = [transforms.resize(224, 224),
    	                   transforms.RandomHorizontalFlip(0.5)
    	                   transforms.RandomAffine(
    	                       degrees=15, translate=(0.2, 0.2),
    	                       shears=15, scale=(0.8, 1.2)),
    	                   transforms.ToTensor()]
    	transform_train = transforms.Compose(transform_train)
    	transform_valid = [transforms.resize(224, 224),
    	                  transforms.ToTensor()]
    	transform_valid = transforms.Compose(transform_valid)
    	```

    	- Casual interpretation → data augmentaiton as counterfactuals under soft style intervention

    - Mixup: mixing samples in training set(different labels)

    	```undefined
    	v(x, y|x_i,y_i) = \frac 1 n \sum_{j=1}^n \textbf{E}_\lambda [\delta (x=\lambda \cdot x_i + (1-\lambda) \cdot x_j, y = \lambda \cdot y_i + (1 - \lambda) \cdot y_j )] \\ \lambda \sim \text{Beta}(\alpha, \alpha) \text{  for  } \alpha \in (0, \inf)
    	```

    	- encourage model to behave linearly in-between samples, and gives smoother estimate

    - Label Smoothing \hat{y} = (1 - \alpha ) \cdot y + \frac \alpha K → to prevent overconfidence

    - Adversarial Training: make small pertubation to encourage smoothness

# Semi-supervised Learning

    ### Objectives

    - Main objective: task-oriented objective(use labeled data)

    - Auxiliary objective: regularizatoin, mainly use unlabeled data

    ### How

    - Consistency Regularization: model output remains unchanged when input is pertubed

    - Entropy Minimization: encourage model output to have low entropy(self-training/psuedo-labeling)

    ### Examples

    - Pseudo Labeling: Unlabeled data uses pseudo label as target data and make it highly confident

    - PI - model: consistent predictions between 2 different settings of same input

    	- Motivation: model ensembling is mostly better than a single model

    	- Temporal ensembling

    		```undefined
    		\tilde{z_i}^{(t)} = \frac {\alpha \tilde {z_i}^{(t-1)}+(1-\alpha) z_i}{1 - \alpha ^t}
    		```

    - Mean teacher → EMA model

    	```undefined
    	\theta_t' = \alpha \theta_{t-1}' + (1 - \alpha)\theta_t
    	```

    	- It looks similar to temporal ensembling but it is not a prediction, it’s model

    	- It’s a copy of model parameters

    - Virtural Adversarial Training

    - Mixmatch : Mixup을 통해 model ensembling을 하여 better estimation을 만든 뒤, sharpen하여 entropy minimization을 진행함

# Self-supervised Learning

# Transfer Learning

# VAE & Diffusion

# Graph Neural Networks

# Transformers

# Bayesian Neural Networks
