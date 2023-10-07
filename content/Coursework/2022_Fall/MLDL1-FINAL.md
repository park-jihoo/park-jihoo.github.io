---
id: c4fe8e99-0760-4c24-b152-66e376d28bc5
title: MLDL1 FINAL
created_time: 2022-12-07T09:47:00.000Z
last_edited_time: 2023-10-07T16:40:00.000Z
cover_image: https://www.notion.so/images/page-cover/gradients_11.jpg
icon_emoji: 🐾
하위 항목: []
subclass: 2022_Fall
class: Coursework
작성일시: 2022-12-07T09:47:00.000Z
상위 항목: []
_thumbnail: https://www.notion.so/images/page-cover/gradients_11.jpg

---

# Nearest Neighbor Classifiers

    - Nearest Neighbor으로 classification할 시의 단점: O(1) for training but O(N) for testing

    - L_1 (A,B) = \sum_{\substack {i,j}}|A_{i,j}-B_{i,j}|, L_2(A,B) = {\sqrt{(A_{i,j}-B_{i,j})^2}}

    - However, nearest neighbors with pixel distance are never used

    - Curse of dimensionality : need exponentially increasing number of examples for higher dimensional data

***

# Linear Softmax Classifier

    - Linear Classifier: weighted sum of input pixels

    - f({\textsf x}, W) = {\textsf y} = Wx+b = \begin{bmatrix} W & b \end{bmatrix} \begin{bmatrix}x \\ 1\end{bmatrix} = W^{'}x^{'}

    - b라는 variable이 필요한 이유: affecting the output without interacting with data {\textsf x}

    - Limations of linear classifier: unbounded and it’s hard to interpret → probability로 만들기

    - Sigmoid function \sigma(s) = \frac 1 {1+e^{-s}}

    - Sigmoid를 n으로 확장하면 softmax이고, p(y=c_i |x) = \frac {e^{s_i}}{\sum_j {e^{s_j}}}

    - We can update the parameters based on Loss functions

    - Loss function의 종류: Margin-based(0-1, log loss, exponential loss, hinge loss)

    	- hinge loss and log loss are widely used, but we can’t differentiate hinge loss at 1 and log loss is more interpretable

    - Cross Entropy: {\cal L} = - \frac 1 N  \sum_{i=1}^N \sum_{k=1}^K y_{ik} \log(\hat{y}_{ik}) = -\frac 1 N \sum_{i=1}^{N} \log(\hat{y}_i T_i)

    - Kullback-Leibler divergence D_{KL}(P||Q) = \sum_i P(i) \log \frac {P(i)} {Q(i)}

    - How to follow the slope? Calculate gradient descent \theta _i^{new} = \theta _i^{old}-\alpha \frac {\partial}{\partial \theta_i^{old}} J(\Theta)

    	- Problems: Surface may not be convex and works if and only if the cost function is differentiable

    	- Stochastic Gradient Descent: compute gradients for only on a randomly sampled subset

***

# Neural Networks and Backpropagation

    - Issues with linear classifiers: learn one template and only works if inputs are linearly separable

    - Perceptron: Takes input value and each of them is multiplied with a weight y = \operatorname f(w_1x_1+w_2x_2) and multiple perceptron에서는 이게 여러 번 이루어짐

    - Multilayer Perceptrion x \in \reals^d   W_1 \in \reals ^{h \times d}   W_2 \in \reals ^{c \times h}      s \in \reals ^c

    - How Can we add nonlinearity? Activation functions! f(x) = a_2 (W_2a_1(W_1x))

    - Activation Functions: sigmoid, tanh(\tanh (x)), ReLU(\max (0,x))

    - For Backpropagation, we compute gradient of loss \frac {\partial \cal {L}}{\partial \hat W_2} = \frac {\partial \cal {L}}{\partial \hat y} \frac {\partial \hat y}{\partial W_2}, \frac {\partial \cal {L}}{\partial W_1} = \frac {\partial \cal {L}}{\partial \hat y}\frac {\partial \hat {y}}{\partial h}\frac {\partial h}{\partial W_1}

    ```python
    import torch.nn as nn
    import torch.nn.functional as F
    import torch.optim as optim

    class Net(nn.Module):
    		def __init__(self):
            super(Net, self).__init__()
            self.fc1 = nn.Linear(784, 128)
            self.fc2 = nn.Linear(128, 64)
            self.classifier = nn.Linear(64, 10)
        
        def forward(self, x):
            x = x.reshape(-1, 784)
            x = F.relu(self.fc1(x))
            x = F.relu(self.fc2(x))
            x = self.classifier(x)
            return x

    network = Net()
    ```

***

# Convolution Neural Networks

    - Fully Connected Layer이 가지는 문제: models relationships from every input value to every output value, so no spatial locality and positional invariance → CNN!

    - Convolutional Layer 

    - Why Nested Conv Layer? Get Low, Mid, High Level Features

    - Stride: How much pixels to slide, output size \frac {(N-F)}{\mathsf {stride}}+1

    - Padding: zero pad the border, output size \frac {(N-F+2P)}{\mathsf {stride}}+1

    - Given an input volume W \times H\times C, filters K, stride S, zero padding P will produce an output of size W'\times H' \times K where W' = (W-F+2P)/S + 1, H' = (H-F+2P)/S+1, numbers of parameters K(F^2C+1)

    - Pooling: for downsampling and denoising to control overfit. Max pool에서는 filter의 max값을 고르고, average pooling에서는 filter의 average값을 구한다.

***

# Training Neural Networks

***

# Sequential Data & RNN

***

# Attention Mechanism & Transformers
