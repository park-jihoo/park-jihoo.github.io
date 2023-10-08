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
- 1980s, focus on OLTP(On-Line Transaction Processing) → Large number of simple transactions like insert, update,
   delete
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
            - Foreign key: Set of columns in one table that is used to refer to a tuple in another table(which is
              primary key of another table)
        - Domain integrity: All columns in a relational database must be declared upon a defined domain

  ## Views

    - A View is just a virtual relation, but we store a definition, rather than a set of rows
- <u>Views</u> describe how users see the data
    - <u>Conceptual schema</u> defines logical structure
    - <u>Physical schema</u> defines the files and indexes used
    - Data independence
        - Logical data independence: ability to change the conceptual schema without changing external views or
          applications
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

	- Structured Query Language
	- DDL(Data definition), DML(Data manipulation), DCL(Data control)
	- DDL Example

		```sql
		CREATE TABLE Students(Sid int, Sname text, Gpa real);
		CREATE TABLE Enrollment(Sid int, Cid int);
		ALTER TABLE Enrollment
		ADD FOREIGN KEY(Sid) REFERENCES Students(Sid);
		DROP TABLE Students CASCADE;
		```

	- DML Example

		```sql
		INSERT INTO Students VALUES (3, 'Alice', 4.0);
		DELETE FROM Courses WHERE Cname = 'CS6320';
		UPDATE Courses SET Cid = 7 WHERE Cname = 'CS4320';
		SELECT Sname, Gpa FROM Students WHERE Gpa > 3.5;
		```


# Storage

	- Computer memory hierarchy
		- Registers
		- CPU Cache
		- Main Memory

		---

		- SSD
		- HDD
		- Tape Backup
	- Relevance for DBMS
		- Capacity limits force data to lower parts of hierarchy
		- Data access speed may become bottleneck
		- Random data access is expensive
		- Consider volatility for recovery consideration

	## Data storage Format


### Row Store

- Record formats - fixed length: Finding ith column doesn’t require scan of record
- Record formats - variable length: Each row has different data size, so second format offers direct access to ith column
- Optimized for selective updates and retrieval of full columns
- Good for OLTP workload

### Column store

- Create sorted dictionary of each columns
- Columns from original table are encoded using sorted dictionaries
- We don’t need to store encoded values in sorted dictionaries
- Optimized for full scan of selection of columns
- Good for OLAP workload
- More compact storage

	## In-memory Storage layout


### Contiguous Stoarge

- Store table in contiguously allocated memory
- Fast scan
- Effective in situations where there is no change in data

### Paged Storage

- Split table into multiple pages
- Same memory size per page
- Effective for adding and deleting tuples

# Indexing


	## Index

	- Index: auxiliary data structure for finding data faster
	- Index stores references to data records
	- Index sorts row by values in specific columns
	- Index retrieves rows for specific search key values

	## B Tree

	- A balance multi-way search tree(narrow down by more than factor 2)
	- Each tree node must have elements at least 50% of capacity of node, except the root
	- All leaf nodes have the same depth
	- Find operation: similar to BST’s, and if search recursions stops at a leaf node and cannot find the value in the leaf node, then it doesn’t exists
	- Traverse: Inorder traversal
	- Insert: if not overflows, ok and overflows select single median and split the leaf node. median value is inserted to the parent node
	- Delete: if underflows, borrow from adjacent sibling nodes and child under flows, merge child node

	## B+ Tree

	- Leaf nodes contain all data values
	- Adjacent leaf nodes are bidirectionally linked
	- Efficient data traversal than B tree
	- Data node of B+ tree’s first value are duplicate values of index nodes
	- Adjacent nodes are bidirectionally linked
	- Traverse: search the smallest value and traverse sequentially using links
	- Insert&remove&find is similar to B tree

	### B+ Tree index

	- columns with comparable data types can be used as index keys

	## Hashing

	- Performs the operations rapidly
	- Key $x$ is character string and value $h(x)$ is a bucket index in hash table. Hash table is a $B$-element array
	- Collision: different keys may map to same location → open hashing, closed hashing

	## Hash Function

	- Good hash function is simple to compute, produce less collision
	- In case of integer key, use $x\%B$ and string key, $(\sum_{i=0}^{K-1}x[i])\%B$
	- Or use bitwise left shift

	## Open Hashing

	- Also known as separate chaining
	- Keeps a list of all elements that hash to the same value

	## Closed Hashing

	- Keep all keys in the table itself
	- When a collision occurs, we try to search location within the hash table until we find an empty slot
		1. Linear probing $f(i)=i$
		2. Quadratic probing $f(i)=i^2$
		3. Double hashing $f(i) = i \times g(x)$, where $g(x)$ is another hash function
	- Use special value DEL to distinguish deleted and empty locations

	## Hash Index

	- Useful for equality conditions
	- Could be good for load balancing and thus high scalability

# NoSQL DBMS

	- NoSQL Database Systems don’t use a relational data model and typically have noSQL interface

## Advantages

- Higher flexibility by using a schema-free data model
- Easy distribution of data on different nodes
- Higher performance in certain cases

## Disadvantages

- No normalized relational data model
- Abandoning one or more of the ACID criteria
- Less powerful possibilities for querying the data

	## Types of NoSQL

	- Key-value stores: retrieve values when a key is known
	- Wide column stores: also called column family databases, store data in records with an ability to hold large numbers of dynamic columns
	- Document stores: Designed for storing, retrieving and managing document-oriented information
	- Graph DBMS: represent data in graph structures as nodes and edges

# Graph Components

# Cypher

	- A Query-Matching query language made for graphs
	- Match Example

	```text
	MATCH (n:Person {name:"Tom Hanks"})
	RETURN n;
	
	```


	```text
	MATCH (:Person {name:"Tom Hanks"})-->(:Movie)<-[:ACTED_IN]-(coActor:Person)
	RETURN coActor.name;
	
	```

	- Create Example

	```text
	CREATE (:Person {name: "Tom Hanks"}-[:ACTED_IN]->(:Movie :"Apollo 13"}))
	
	```


	```text
	MATCH (p:Person {name : "Tom Hanks"}), (m:Movie {title:"Apollo 13"})
	CREATE (p)-[:ACTED_IN]->(m);
	
	```

	- Load CSV

	```text
	LOAD CSV FROM  'file:///products.csv' AS row
	WITH toInteger(row[0]) AS productId, row[1] AS productName, toFloat(row[2]) AS unitCost
	MERGE (p:Product {productId: productId})
	SET p.productName = productName, p.unitCost = unitCost
	RETURN count(p);
	
	```


	```sql
	LOAD CSV WITH HEADERS FROM 'file:///order-details.csv' AS row
	WITH toInteger(row.productID) AS productId, toInteger(row.orderID) AS orderId,
	toInteger(row.quantity) AS quantityOrdered
	MATCH (p:Product {productId: productId})
	MATCH (o:Order {orderId: orderId})
	MERGE (o)-[rel:CONTAINS {quantityOrdered: quantityOrdered}]->(p)
	RETURN count(rel);
	
	```


# Query Processing

# Join

# Query Planning

# ACID Properties

# Isolation

	- Transaction Notation
		1. Letter for object
		2. Number to distinguish transaction
		3. R read, W write, RW for read+write, C commit, A abort
		- $R1(A)$ means transaction 1 reads object 1
	- Isolation Anomalies: destroy illusion of sequential execution
		1. Dirty Reads: Read data from uncommitted transactions $(Wx(A)Ry(A))$
		2. Unrepeatable Reads: Return different result with single transaction when operations reads same row twice(중간에 another transaction이 modify 후 commit함) $(Rx(A)Wy(A)CyRx(A))$
		3. Phantom reads: row를 2번 읽는 사이에 다른 트랜잭션에서 insert to commit이 일어나 유령처럼 느껴지는 read
		4. Lost Updates: two transaction update same row to different value $(Wx(A)Wy(A))$
	- Isolation level

	|                  | Dirty Reads | Non-Repeatable Reads | Phantom Reads |
	| ---------------- | ----------- | -------------------- | ------------- |
	| Read uncommitted | Yes         | Yes                  | Yes           |
	| Read Committed   | No          | Yes                  | Yes           |
	| Repeatable Read  | No          | No                   | Yes           |
	| Serializable     | No          | No                   | No            |


# Concurrency Control

# MVCC

# Logging and Recovery
