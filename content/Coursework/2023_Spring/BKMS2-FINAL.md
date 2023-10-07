---
id: 7806a722-3120-4dbe-9ae8-c9c96af16848
title: BKMS2 FINAL
created_time: 2023-06-12T02:31:00.000Z
last_edited_time: 2023-10-07T16:40:00.000Z
cover_image: https://www.notion.so/images/page-cover/rijksmuseum_vermeer_the_milkmaid.jpg
icon_emoji: 🤝
하위 항목: []
subclass: 2023_Spring
class: Coursework
작성일시: 2023-06-12T02:31:00.000Z
상위 항목: []
_thumbnail: https://www.notion.so/images/page-cover/rijksmuseum_vermeer_the_milkmaid.jpg

---

# Frequent Itemset Mining & Assocation Rules

    - A general many-to-many mapping between two kinds of things

    - **Support** : Number of baskes containing all items in I

    - **Confidence**: \frac {\textbf{support}(I\cup j)}{\textbf{support}(I)}

    - **Interest** : difference between its confidence and the fraction of baskets that contain j

    	```undefined
    	\textbf{Interest}(I \rightarrow j) = \textbf{conf}(I \rightarrow j) - \Pr[j]
    	```

    - Goal : Find all association rulses with support\geq s and confidence \geq c

    - Mining Association Rules

    	- Find all frequent itemset I

    	- Rule generation

    		- For every subset A of I, generate a reule A → I \ A

    		- Output the rules above the confidence threshold

    - Compacting the output

    	- Maximal frequent itemsets

    	- Closed itemsets

    ## Finding Frequent Itemsets

# Finding Similar Items: LSH

# Link Analysis, PageRank

# Community Detection in Graphs

# Recommender System

# Product Quantization
