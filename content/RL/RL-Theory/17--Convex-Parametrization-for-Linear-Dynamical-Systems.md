---
id: 48e22df0-5810-4a43-b8a8-70709c6f343b
title: 17. Convex Parametrization for Linear Dynamical Systems
created_time: 2023-08-02T11:25:00.000Z
last_edited_time: 2023-08-17T06:46:00.000Z
cover_image: https://www.notion.so/images/page-cover/solid_yellow.png
하위 항목: []
subclass: RL Theory
class: RL
작성일시: 2023-08-02T11:25:00.000Z
pdf: https://wensun.github.io/CS6789_data_fall_2021/SLS_linear_system_annotated.pdf
상위 항목: []
_thumbnail: https://www.notion.so/images/page-cover/solid_yellow.png

---

> 📖 What if the cost function is arbitary convex function, and how to handle adversarial noise?

# Linear Dynamical System and Convex cost function

```undefined
x_{t+1} = Ax_t+Bu_t+w_t,x_0\sim\mathscr{D},w_t\sim\mathscr{N}(0,\sigma^2I)
```

```undefined
\max\mathbb E\left[\sum_{h=0}^{H-1}c(x_h,a_h)|\pi \right]
```

*   We cannot guarantee the optimal policy is linear, but we consider a restricted policy class

    ```undefined
    \Pi=\left\{\pi=\{-K_t\}_{t=0}^{H-1}:K_t\in\mathscr K,\forall t \right\}
    ```

*   Goal: find the best linear controllers

*   However, even with quadratic cost, \max\mathbb E\left\[\sum\_{h=0}^{H-1}c(x\_h,a\_h)|\pi \right] is not convex, so we need new convex parameter

*   Claim: for any linear controllers \pi:={-K\_t}*{t=0}^{H-1}, there exists a parametrization \left{{M\_t,M*{t-1;t},...,M\_{0;t}}\right}*{t=0}^{H-1}, that generates the same sequencen trajectory, given any fixed x\_0 and fixed noise w\_0,…,w*{H-1}

*   Claim: Given controller \tilde\pi:={{M\_t,M\_{0;t},...,M\_{t-1;t}}}\_{t=0}^{H-1}, u\_t\&x\_t are all llinear with respect to the parameters, \forall t

*   Claim: Given controller \tilde\pi:={{M\_t,M\_{0;t},...,M\_{t-1;t}}}*{t=0}^{H-1}, \sum*{t=0}^{H-1}c(x\_t,u\_t) is convex with respect to the parameters \forall t

# Convexity and Gradient Descent

*   Claim: Given controller \tilde\pi:={{M\_t,M\_{0;t},...,M\_{t-1;t}}}*{t=0}^{H-1}, \mathbb E\left\[\sum*{t=0}^{H-1}c(x\_t,u\_t)|\pi\right] is convex with respect to the parameters \forall t

*   Convexity allows to perform GD directly on parameters {{M\_t,M\_{0;t},...,M\_{t-1;t}}}\_{t=0}^{H-1}

*   Algorithm

# Extension to adversarial online control

## Setting

On the k-th day,

*   adversary decides sequence of noises {w\_0^k,...,w\_{H-1}^k} and (convex) cost function c^k(x,u)

*   Without knowing noises and cost, learner proposes a sequence of controllers {{M\_t,M\_{0;t},...,M\_{t-1;t}}}\_{t=0}^{H-1}

*   Learner executes controllers, and suffers total cost \sum\_{h=0}^H c\_k(x\_h^k,a\_h^k)

Goal: No-regret

```undefined
\sum_{k=0}^{K-1}\sum_{h=0}^Hc^k(x_h^k,a_h^k)-\min_{\{-K_h^*\}_{h=0}^{H-1}}\sum_{k=0}^{K-1}J^k(\{-K_h^*\}_{h=0})=o(K)
```

## The online gradient descent algorithm

*   At iteration t, learner proposes

*   The OGD guarantee: Although the OGD learner makes choice z\_t without seeing the loss l\_t, it is no regret

## Reduce online control to online learning

*   We define parameter z:={{M\_t,M\_{0;t},...,M\_{t-1;t}}}\_{t=0}^{H-1}

*   At iteration t, given w\_0^k,…w\_{H-1}^k and c^k which are determined by adversary, we define loss function l\_t(z) as
