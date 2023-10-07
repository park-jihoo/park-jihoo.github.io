---
id: 34379fde-436b-4b10-a7cf-45fc219049b7
title: 16. Linear Quadratic Regulators
created_time: 2023-08-01T01:03:00.000Z
last_edited_time: 2023-08-17T06:46:00.000Z
cover_image: https://www.notion.so/images/page-cover/nasa_robert_stewart_spacewalk_2.jpg
하위 항목: []
subclass: RL Theory
class: RL
작성일시: 2023-08-01T01:03:00.000Z
pdf: https://wensun.github.io/CS6789_data_fall_2021/LQR_annotated.pdf
상위 항목: []
_thumbnail: https://www.notion.so/images/page-cover/nasa_robert_stewart_spacewalk_2.jpg

---

# TRPO/PPO

## TRPO

```undefined
\max_{\pi_\theta}V^{\pi_\theta}(\rho)\text{\  s.t.\  }KL(\Pr^{\pi_{\theta_0}}||\Pr^{\pi_\theta})\le\delta
```

### With second order Taylor’s expansion

```undefined
\max_\theta\nabla V^{\pi_{\theta_0}}(\rho)^\top(\theta-\theta_0)\text{\ s.t \ }(\theta-\theta_0)^\top F_{\theta_0}(\theta-\theta_0)\le\delta
```

*   There is a closed form solution

    ```undefined
    \theta = \theta_0 + \sqrt{\frac{\delta}{(\nabla V^{\pi_{\theta_0}})^\top F_{\theta_0}^{-1}\nabla V^{\pi_{\theta_0}}}}\cdot F_{\theta_0}^{-1}\nabla V^{\pi_{\theta_0}}
    ```

## PPO

*   To find the next policy, use objective

    ```undefined
    \max_\theta \mathbb E_{s\sim d^{\pi_t}}\left[\mathbb E_{a\sim\pi^\theta(\cdot|s)}\left[A^{\pi_t}(s,a)\right]\right]\text{ subject to } \sup_s\left\|\pi^\theta(\cdot|s)-\pi_t(\cdot|s)\right\|_{TV}\le\delta
    ```

*   We can do multiple gradient steps by rewriting the objective function using importance weighting using a clip function

    ```undefined
    \max_\theta \mathbb E_{s\sim d^{\pi_t}}\left[\mathbb E_{a\sim\pi^\theta(\cdot|s)}\left[\text{clip}\left(\frac{\pi^\theta(a|s)}{\pi_t(a|s)}, 1-\epsilon,1+\epsilon\right)A^{\pi_t}(s,a)\right]\right]
    ```

*   Clip: when the ratio is outside of \[1-\epsilon,1+\epsilon], we get gradient zero

# Optimal Control

*   A dynamical system is described as x\_{t+1}=f\_t(x\_t,u\_t,w\_t) where f\_t maps a state x\_t\in\R^d, a control u\_t\in\R^k, and a disturbance w\_t, to the next state x\_{t+1}\in\R^d starting from an initial state x\_0

*   The objective is to find the control policy which minimizes the long term cost

    ```undefined
    \mathbb E_\pi\left[\sum_{t=0}^{H-1}c_t(x_t,u_t)\right] \text{s.t. }x_{t+1}=f_t(x_t,u_t,w_t)
    ```

# LQR

*   The finite horizon LQR(Linear Quadratic Regulator) problem is given by minimizing

    ```undefined
    \mathbb E\left[x_H^\top Qx_H+\sum_{t=0}^{H-1}(x_t^\top Qx_t+u_t^\top Ru_t) \right] \text{ s.t. }x_{t+1}=A_tx_t+b_tu_t+w_t, x_0\sim D,w_t\sim N(0,\sigma^2,1)
    ```

*   The infinite horizon LQR problem is given by minimizing

# Bellman Optimality

*   Value function

*   State-action value function

## Value Iteration and Ricatti Equations

*   For finite horizon case, the optimal policy is a linear controller specified by

*   Furthermore, for t\in\[H], we have that

*   For infinite horizon case

*   P is unique and the optimal average cost is \sigma^2\text{Trace}(P)

# Semidefinite programs to find P

## The Dual SDP

*   The dual optimization is minimize

*   The SDP has unique solution which is \Sigma^*. The optimal gain matrix is K^* = -\Sigma\_{ux}^*(\Sigma\_{xx}^*)^{-1}

## The Primal SDP for the infinite horizon LQR

*   The primal optimization problem is given as maximizing \sigma^2\text{Trace}(P) subject to

*   This SDP has unique solution P^\*, which implies
