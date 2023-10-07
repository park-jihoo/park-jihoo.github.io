---
id: eb1aea3b-840e-4bb6-bbe8-40115454d5ff
title: 12. Learning in Large Scale MDPs(Bellman Rank)
created_time: 2023-07-13T12:52:00.000Z
last_edited_time: 2023-08-17T06:46:00.000Z
cover_image: https://www.notion.so/images/page-cover/rijksmuseum_claesz_1628.jpg
하위 항목: []
subclass: RL Theory
class: RL
작성일시: 2023-07-13T12:52:00.000Z
pdf:
  - >-
    https://wensun.github.io/CS6789_data_fall_2021/Bellman_rank_part_1_annotated.pdf
  - https://wensun.github.io/CS6789_data_fall_2021/Bellman_rank_2_annotated.pdf
상위 항목: []
_thumbnail: https://www.notion.so/images/page-cover/rijksmuseum_claesz_1628.jpg

---

> 💡 1. We have seen tabular MDP and linear MDP, is there a **more general framework** that captures these two, and potentially many more, where efficient learning is possible?

> 💡 2. Can we design a universal algorithm that learns efficiently for MDPs with low Q/V bellman rank?

# Bellman rank Definitions

## Setting

*   Finite horizon episodic MDP \left{ {S\_h}*{h=0}^H, {A\_h}*{h=0}^{H-1}, H, s\_0, r, P \right}, and state space S\_h is extremely large

*   Policy class \Pi = \left{\pi:\pi(s)=\arg\max\_{a\in A}f(s,a),\forall s\in S|f \in \mathscr{F} \right}

*   Value function class \mathscr{V} = \left{V\_f: V\_f(s)=\max\_a f(s,a)|f\in\mathscr{F} \right}

## Learning Goal

> Given approximation error \epsilon and failure probability \delta, can we learn \epsilon near optimal policy in # samples scaling poly with all relevant parameters(Here, we need poly in \mathscr{\ln(|F|)})

## Definitions

*   Average Bellman error of Q-estimate g

    ```undefined
    \mathscr{E}(g;f,h) = \mathbb{E}_{s_h,a_h\sim d_h^{\pi_f}}\left[g(s_h, a_h)-r(s_h,a_h)-\mathbb{E}_{s_{h+1}\sim P(\cdot|s_h,a_h)}\left[\max_{\mathscr{a\in A}}g(s_{h+1},a) \right] \right]
    ```

*   Average Bellman error w\.r.t the V function induced by g

*   Any g such that \mathscr{E}(g;\pi,h) \not=0, is an incorrect Q^\* approximator

*   The Q/V-Bellman Rank

# Examples that are captured by bellman rank framework

## The Linear Bellman Completion Model

*   Given feature \phi, take any linear function \theta^\top\phi(s,a)

*   Claim: It has Q-bellman rank d

## The Linear Q^*, V^* model

*   Assume Q^*(s,a) = (w^*)^\top\phi(s,a), V^*(s) = (\theta^*)^\top\psi(s), \forall s, a

*   Claim: It has Q-Bellman-rank 2d

## Q^\*-state abstraction

*   We have a small latent space Z, and a known mapping \xi from state s to z

*   Claim: this model has Q-Bellman rank |Z||A|+|Z|

## Low-rank MDP

*   P\_h(s'|s,a) = \mu\_h^*(s')^\top\phi\_h^*(s,a)

*   Claim: this model has V-bellman rank d

## Latent variable MDP

*   Latent variable MDP is captured by low-rank MDP, so it has small bellman rank

*   V-bellman rank = Number of latent states

# The Bilinear-UCB algorithm

## Two rank cases

### For Q-Bellman rank case

*   Bellman error loss \ell(s\_h, a\_h, s\_{h+1}', g) = g(s\_h,a\_h)-r(s\_h,a\_h)-\max\_{a'}g(s\_{h+1},a')

*   If we had a dataset \mathscr{D}:={s\_h,a\_h,s\_{h+1}} where s\_h, a\_h \sim d\_h^{\pi\_f}, s\_{h+1}\sim P\_h(\cdot|s\_h,a\_h)

### For V-Bellman rank case

*   Bellman error loss

*   If we had a dataset \mathscr{D}:={s\_h,a\_h,s\_{h+1}} where s\_h, a\_h \sim U(\mathscr{A}),s\_{h+1}\sim P\_h(\cdot|s\_h,a\_h)

## Algorithm

*   At iteration t:

### Intuition behind the algorithm

*   When the batch size is large, \mathbb{E}*{\mathscr{D}*{h,i}}\ell(s\_h,a\_h,s\_{h+1},g)\rightarrow\mathscr{E}(g;f\_i,h)

*   We know that \sum\_{i=1}^{t-1}\mathscr{E}(f^\*;f\_i,h)=0

*   By properly setting batch size and R, we eliminate wrong hypothesis, but keep f^\*

*   This gives optimism: V\_{f\_t}(s\_0)\ge V\_{f^*}(s\_0):=V^*(s\_0)

# Theoretical Guarantee and analysis in BLin-UCB

*   Given any distribution \nu \in \Delta(S\times A\times S) and m i.i.d samples {s\_i,a\_i,s\_i'} from \nu, with probability at least 1-\delta,

*   After running BLin-UCB for T=\widetilde O(Hd) many iterations, there exists a policy among T many policies, such that

*   With probability 1-\delta, BLin-UCB learns a policy with V^\*-V^\pi\le\epsilon, with number of trajectories:
