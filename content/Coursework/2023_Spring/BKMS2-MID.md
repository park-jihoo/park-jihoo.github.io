---
id: e6921ebb-b53b-4d1d-918d-36322a492bae
title: BKMS2 MID
created_time: 2023-08-01T03:38:00.000Z
last_edited_time: 2023-10-07T08:35:00.000Z
icon_emoji: 📖
하위 항목: []
subclass: 2023_Spring
class: Coursework
작성일시: 2023-08-01T03:38:00.000Z
상위 항목: []

---

# Data Warehouse

    ## Why Business Intelligence?

    - Business intelligence is the activity which contributes to the growth of any company

    - How does it work?

    	- BI based on Data warehouse technology extracts informations from a company's operational systems

    	- The data is transformed and loaded to data warehouses

    	- Since this data is credible, it is used for business insights

    ## Why Data Warehouse?

    - Data collected from various sources & stored in various databases cannot be directly visualized

    - The data first needs to be **integrated** and then **processed** before visualization takes place

    ## What is a Data Warehouse?

    - A central location where consolidated data from multiple locations are stored

    - Data warehouse is maintained separately from an organization's operational database

    - End users access it whenever any information is needed

    - Data warehouse is like a relational database designed for analytical needs

    - It functions on the basis of OLAPp

    - It is a central location where consolidated data from multiple locations are stored

    ## What are the advantages of DW?

    - Faster and more accurate

    ## Properties of a DW

    - Subject-oriented: Data is categorized and stored by business subject rather than by application

    - Integrated: Data on a given subject is collected from disparate sources and stored in a single place

    - Time-variant: Data is stored as a series of snapshots, each representing a period of time

    - Non-volatile: Typically data in the data warehouse is not updated or deleted

    ### OLTP vs OLAP

    ||
    ||

    ## ETL (Extract, Transform & Load)

    > ETL is the process of extracting the data from various sources, transforming this data to meet your requirement and  
    >then loading it into a target DW

    ## Data Mart

    - Smaller version of DW which deals with single subject

    - It's focused on one area. Hence, they draw data from a limited number of sources

    - Time taken to build Data mart is very less compared to time build a DW

    ```mermaid
    flowchart LR
    a[(Data Warehouse)]---b1[(Data Mart1, Sales)]
    a --- b2[(Data Mart2, Marketing)]
    a --- b3[(Data Mart3, Operations)]

    ```

    ### Types of Data Mart

    - Dependent Data Mart

    - Independent Data Mart

    - Hybrid Data Mart

    ## Metadata

    - Metadata is defined as about data

    - Metadata in DW defines the source data

    - Metadata is used to define which table is source and target, and which concept is used to build business logic called
    transformation to actual output

    ## What is Data Warehousing?

    - Data Warehousing is the act of organizing&storing data in a way so as to make its retrieval effect and insightful

    - It's also called as the process of transforming data into information

    ## OLAP

    - OLAP is a flexible way for you to make complicated analysis of multidimensional data.

    - DW is modeled on the concept of **OLAP**. DBs are modeled on the concept of OLTP

    - OLTP system use data stored in the form of two-dimensional tables, with rows and columns

    ### Advantages of OLTP over OLAP

    - Opens up new views of looking at data.

    - Supports filtering/sorting of data.

    - Data can be refined

    ### Multidimensional modeling

    - Predict analytic pattern of users

    - Data Structures

    - Goal

    ### Mapping the Multidimensional Model(MOLAP)

    - Multidimensional model is _conceptual_ not physical

    - Requirements

    - Realization w.r.t analysis and loading phase

    ### ROLAP

    - Properties

    - Pros

    - Cons

    - Products: Almost all RDBMS Vendors

    ### OLAP Operations

    ### Roll-up

    - Roll-up performs aggregation on a data cube by either

    ### Drill-down

    - Drill-down is the reverse operation of roll-up, and it's performed by either

    ### Slice

    - The slice operation provides new sub-cube from one particular dimension in a given cube

    ### Dice

    - The dice operation provides a new sub-cube from two or more dimensions in a given cube

    ### Dimensions

    - The tables that describe the dimensions involved are called **Dimension tables**.

    - Dividing a data warehouse project into dimensions provides structured information for analysis and reporting

    ### Facts & Measures

    - A fact is a measure that can be summed, averaged or manipulated

    - A fact table contains 2 kinds of data - a dimension key and a measure

    - Every Dimension table is linked to a Fact table

    ```mermaid
    flowchart LR
    A[Product]-->B[Product ID]
    A --> D[Number of units sold]
    B --- C(Dimension Key)
    D --- E(Measure)

    ```

    ### Schemas

    - A schema gives the local description of entire DB

    - It gives details about the constraints placed on the tables, key values present & how the key values are linked
    between the different tables

    - A database uses relational model, while a data warehouse uses star, snowflake and fact constellation schema

    ### Star Schema

    - Each dimension in a star schema is represented with one-dimensional table and fact table is at the center

    ### Snowflake Schema

    - Dimension tables in the snowflake schema are normalized

    ## Federated Database System

    ### What is a federated database?

    - Logical association of independent database that provides a single, integrated, coherent view.

    - Federation also provide a cohesive, unified view of data derived from multiple sources.

    ### Characteristics of Federate Database System

    - Transparency: Federated databases masks from the user difference, idiosyncrasies, and implementations of underlying
    data sources

    - Heterogeneity of data sources: Heterogeneity is the degree of differentiation in the various data sources.

    - Extensibility and openness of the federation: In a federated system, new sources may be needed to meet the changing
    needs of the users' business.

    - Autonomy for data sources: Federated database does not disturb the local operation of an existing data source.

    - Data integration: Federated database system can integrate data from different procotols, DBMS, using wrapper

    ### Benefits of Federated Database

    - Offer an alternative to merge database together

    - Help programmers avoid the tight coupling of application

    - Applications only need to be connected to the federal database

    ### Issues in Database Federation

    - Query Performance: The query algorithm for federated database should be carefully designed, or get slow response time

    - Dependence on autonomous data sources: The federation is highly dependent on data sources that are largely beyond
    direct control of the federation management system.

    - Scalability: Federated system can add new data sources relatively quickly and with minimal cost, and are thus
    reasonably scalable architectures. However scaling up new sources adds to the complexity of the infrastructure

    - Technical Skills: Considerable expertise my be required to design and manage federated DB system.

# DocumentDB

# StreamDB

# SpatialDB
