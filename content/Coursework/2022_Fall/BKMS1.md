---
id: 47662c21-661e-47af-a2b0-2c55df856738
title: BKMS1
created_time: 2023-07-27T05:16:00.000Z
last_edited_time: 2023-10-07T08:35:00.000Z
icon_emoji: 😀
하위 항목: []
subclass: 2022_Fall
class: Coursework
작성일시: 2023-07-27T05:16:00.000Z
상위 항목: []

---

# Introduction

    - Data is a **collection of values** that convey information

    - A data model is a collection of high-level data description

    - A database(DB) is organized collection of data stored and accessed electronically

    - A database management system(DBMS) is software designed to assist in maintaining and utilizing databases

    - Transaction symbolizes a unit of work performed within a DBMS against a database

    - A query is a precise request for information retrieval made to a database

    ## History of DBMS

    - 1960s, navigational DBMS

    - 1970s, RDBMS

    - 1980s, focus on OLTP(On-Line Transaction Processing) → Large number of simple transactions like insert, update, delete

    - 1990s, emergence of OLAP(On-Line Analytical Processing) → Column-based database

    - 2000s, NoSQL, NewSQL, In-Memory DBMS

# Relational Model

    ## Data Types

    - Structured data and unstructured data

    - Each data type has its own storage size per value

    ## Relational Model

    - Most widely used model

    - Relation = Table + Schema

    	- Table: consists of rows and columns (linked by join)

    	- Schema: specifies name of relation, each column’s name and data type

    - Relational database = a set of relations

    ## Integrity Constraints

    - Integrity Constraint: condition that must be true for any instance of the database

    - ICs maintain and assure data accuracy and consistency over its entire life cycle

    - Types of ICS

    	- Entity integrity: every table must have a **PK** and this should be **unique** and **not null**

    	- Referential integrity: If all foreign key constraints are enforced referential integrity is achieved

    		- Foreign key: Set of columns in one table that is used to refer to a tuple in another table(which is primary key of another table)

    	- Domain integrity: All columns in a relational database must be declared upon a defined domain

    ## Views

    - A View is just a virtual relation, but we store a definition, rather than a set of rows

    - <u>Views</u> describe how users see the data

    - <u>Conceptual schema</u> defines logical structure

    - <u>Physical schema</u> defines the files and indexes used

    - Data independence

    	- Logical data independence: ability to change the conceptual schema without changing external views or applications

    	- Physical data independence: separate conceptual levels from the internal/physical levels

# Database Design

    ## Requirement Analysis

    - Determining which data to store

    ## Logical Database Design

    - ERD

    	- Entity(rectangle): object, class, person or place

    	- Relationship(diamond): describe the relation between entities

    	- Attribute(ellipse): describe the property of an entity or relationship

    	```mermaid
    	erDiagram
    	    CAR ||--o{ NAMED-DRIVER : allows
    	    CAR {
    	        string registrationNumber PK
    	        string make
    	        string model
    	        string[] parts
    	    }
    	    PERSON ||--o{ NAMED-DRIVER : is
    	    PERSON {
    	        string driversLicense PK "The license #"
    	        string(99) firstName "Only 99 characters are allowed"
    	        string lastName
    	        string phone UK
    	        int age
    	    }
    	    NAMED-DRIVER {
    	        string carRegistrationNumber PK, FK
    	        string driverLicence PK, FK
    	    }
    	    MANUFACTURER only one to zero or more CAR : makes
    	```

    - Entity to table

    	- Columns: attribute of entity

    	- Each row represents a single entity

    	- PK: key attribute

    - Relationship to table

    	- Columns: attributes of the relationship + keys for each participating entity set

    	- Each row represents a single entity-entity relationship

    	- PK: key set from participating entity sets

    ## Database Normalization

    - Data redundancy

    - First normal form: columns which contain sets of values or nested records are not allowed

    - Second normal form: every non-candidate-key attribute must depend on the whole candidate key

    - Third normal form: transitive FDs are not allowed

# SQL

# Storage

# Indexing

# NoSQL DBMS

# Graph Components

# Cypher

# Query Processing

# Join

# Query Planning

# ACID Properties

# Isolation

# Concurrency Control

# MVCC

# Logging and Recovery
