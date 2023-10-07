
# Introduction

	- Data is a **collection of values** that convey information
	- A data model is a collection of high-level data description
	- A database(DB) is organized collection of data stored and accessed electronically
	- A database management system(DBMS) is software designed to assist in maintaining and utilizing databases
	- Transaction symbolizes a unit of work performed within a DBMS against a database
	- A query is a precise request for information retrieval made to a database

	## History of DBMS

	1. 1960s, navigational DBMS
	2. 1970s, RDBMS
	3. 1980s, focus on OLTP(On-Line Transaction Processing) → Large number of simple transactions like insert, update, delete
	4. 1990s, emergence of OLAP(On-Line Analytical Processing) → Column-based database
	5. 2000s, NoSQL, NewSQL, In-Memory DBMS

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
		- Update anomaly: same information can be expressed on multiple rows
		- Insertion anomaly: certain facts cannot be recorded at all
		- Deletion anomaly: deletion of data representing certain facts necessitates deletion of data representing completely different facts
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

	- Node(Vertex) : The Main data element from which graphs are constructed
	- Relationship(Edge) : A Link between 2 nodes

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

	- Query Processing 단계

	```mermaid
	flowchart LR
	    id1(Input Query)-->id2(Query Parser);
	    id2-->id3(Query Rewriter);
	    id3-->id4(Logical Plan);
	    id4-->id5(Query Optimizer);
	    id5-->id6(Physical Plan);
	    id6-->id7(Query Executer);
	    id7-->id8(Query Result);
	
	```

	- SQL vs Relational Algebra
		- SQL : Write **what** you want
		- Relational Algebra: About **query plan**
	- Relational Algebra Operation
		- Unary Operator: Projection( $\pi$ ), Selection( $\sigma$ ), Renaming( $\rho$ )
		- Binary Operator: Union( $\cup$ ), Set-different( $-$ ), Cross-product( $\times$ )
		- Compound Operators: Intersection( $\cap$ ), Join( $\Join$ )
	- Projection and Selection
	- Row Store: 해당하는 테이블의 자료들만 읽으면 되며, 이들은 각각의 열에서 자리가 지정되어 있기 때문에 전체 중에 이 열들만 읽으면 됨
	- Column Store: 조건이 들어가 있는 경우 그 컬럼에서 조건을 찾고, 해당하는 binary code보다 큰 값을 가진 것을 1로 하는 result bit vector을 만들어 해결

# Join

	- Operators
	- One of the most expensive operations
	- However some are more generic, faster and uses small memory
	- Simple Nested Loops Join : 하나하나 하는 것 Cost는 $O(MN)$

		```python
		for e in rows(E):
		    for s in rows(S):
		        if(e.sid==s.sid):
		            add_result(e, s)
		
		```

	- Index Nested Loops Join: inner column의 index를 찾아서 조인함 Cost는 $O(M \times (cost \ of \ index))$

		```python
		for e in rows(E):
		    s = S(s.sid = e.sid)
		    add_result(e, s)
		
		```

	- Sort-Merge Join : sort한 뒤 하나하나 merge함. Cost는 $O(N\log N+M\log M)$

		```python
		sorted(S, key=S.sid)
		sorted(E, key=E.sid)
		s = S.first
		e = E.first
		while s in S and e in E:
		    if s.sid > e.sid:
		        e = e.next
		    elif s.sid == e.sid:
		        add_result(e, s)
		        e = e.next
		    else:
		        s = s.next
		
		```

	- Hash join: inner table을 hash로 만들어서 join하는 방법
	- Join in Column store
		1. Make a dictioniary translation table
		2. list row ids of t2 with value ids of t1 by translation table
		3. list matching row ids

# Query Planning

	- Logical Query plan: specifies types of operations
	- Example

		```mermaid
		flowchart BT
		id2(C.cname == 'DS5700' and S.major = 'Data science')-->id1(S.sname);
		id3(join on e.cid = c.cid)-->id2;
		id4(join on s.sid = e.sid)-->id3;
		id5[(courses table)]-->id3;
		id6[(students table)]-->id4;
		id7[(enrollment table)]-->id4;
		
		```

	- Physical Query plan: specifies implementation as well
	- Example

		```mermaid
		flowchart BT
		id4(sort merge join on s.sid = e.sid)-->id1(S.sname, projection);
		id3(hash join on e.cid = c.cid)-->id4;
		id2(S.major = 'Data science', scan filter)-->id4;
		id9(C.cname == 'DS5700', scan filter)-->id3;
		id5[(courses table)]-->id9;
		id6[(students table)]-->id2;
		id7[(enrollment table)]-->id3;
		
		```

	- Query Optimization : There is a Heuristic Restrictions for Query Plan
		1. Apply predicate/projection early
		2. Avoid predicate-less join
		3. Left deep plans to make max pipeline

# ACID Properties

	- Transaction : symbolizes a unit of work, performed within a DBMS

		```text
		BEGIN; -- begin a transaction
		COMMIT; -- end a transaction
		ROLLBACK; -- about a transaction
		
		```

	1. Atomicity: all steps of transaction are executed **OR** none of them are executed
	2. Consistency: data is consistent with all IC(PK, FK, Domain integrity). If not, abort transactions
	3. Isolation: different users may execute transactions **concurrently**, so DBMS may **interleave** steps
	4. Durability: DBMS guarantees that committed updates persist

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

	- Schedule : ordered steps from multiple transactions
	- good schedules
		- Serial(one transaction after another)
		- Schedules **equivalent** with serial schedule
	- Final State Equivalence : Compare two schedules based on **final database state**
	- Final State Serializable: if there exists serial schedule which is final state equivalent.
	- Final state Serializability may cause unrepeatable reads!
	- View Equivalence
	- Two schedules are view equivalent iff
		- transaction X reads the initial value for S1, then also does S2
		- transaction X reads a value written by transaction Y in S1, then also does S2
		- transaction X writes final value written by transaction Y, then also does S2
	- View Serializabiility : there exists a serial schedule that is view equivalent to S
	- Verifiying view serializability is NP-hard
	- Conflict Equivalence
		- Conflict: if one of two operations of different transactions in same opject is a write operation
		- ex) $Rx(A)Wy(A), \ Wx(A)Ry(A), \ Wx(A)Wy(A)$
		- swapping non-conflicting option을 통해 $S1$에서 $S2$ 를 얻을 수 있다면 이는 conflict-equivalent이다.
		- How to check conflict serializable : draw conflict graph and if there is no cycle, then conflict serializable
		- How to draw conflict graph
			1. Draw nodes for each transactions
			2. check conflicting operation for each object
			3. draw an edge for each pair of conflicting option
			4. test if conflict graph has cycle
		- Conflict Graph of transaction $R1(A)R2(A)R1(C)W1(A)R3(C)W2(B)W3(C)$

	```mermaid
	flowchart LR
	1((1))
	2((2))
	3((3))
	2 -->|R2W1| 1
	1 --> |R1W3| 3
	2 --> |W2W3| 3
	
	```

	- Equivalent serial schedule $R2(A)W2(B)C2R1(A)R1(C)C1W3(B)W3(C)C3$
	- Conflict graph of $R1(A) R2(A) R1(C) W1(A) R1(D) W1(D)\\ C1 R3(C) W2(B) C2 W3(B) R3(D) W3(C) W3(D) C3$

	```mermaid
	flowchart BT
	1((1))
	2((2))
	3((3))
	1-->|R1W3C, W1W3D|3
	2-->|R2W1A|1
	2-->|W2W3B|3
	
	```

	- Equivalent Serial Schedule $R2(A) W2(B) C2 R1(A) R1(C) W1(A) R1 (D) W1(D) \\ C1 R3(C) W3(B) R3(D) W3(C) W3(D) C3$

# MVCC

	- Lock-Based CC의 단점: read lock과 write lock은 각각 write, read/write을 제한하는데, overhead가 일어날 수 있다.
	- How to CC without changing the schedule? **Keep multiple version**
	- MVCC Protocol
		- Each transaction receives STS when start
		- Each writing transaction creates new version, and when commit, it has CTS and the value of object
		- Version Filtering: latest version을 읽는데 이게 isolation level에 따라 다르다.
	- READ_COMMITTED의 경우, check latest version with CTS < TS(현재)를 기준으로 latest object를 읽는다.
	- REPEATABLE READ나 SERIALIZABLE의 경우, check latest version with CTS < STS = 1으로 트랜잭션별로 STS가 다르면 읽는 값이 달라질 것이다.
	- MVCC가 overhead를 해결하는 법
		- original DB에 copy the latest version with CTS is less than minimum STS of running transactions.
		- 즉 현재 실행중인 것들의 시작보다 빨리 커밋된 것 중 최신 거 제외하고 다 날려버림
	- Lost update 해결법: 만약 먼저 update, commit된 트랜잭션이 있다면, 다른 커밋하지 않은 트랜잭션은 abort된다.

# Logging and Recovery

	- Atomicity와 Durability를 보장하기 위한 장치임
	- RAM에 있는 Database는 컴퓨터를 끄면 날아가는데, 이를 disk로 넘기기 위한 장치이다. 하지만 RAM과 disk 사이에 속도 차이가 있어서 buffer에 저장하는 것
	- Logging Schemes
		- Physical Logging: DB States(Before Image, After Image로 각각 변경 전후를 기록)
		- Logical Logging: record the high-level operations by transactions, 즉 처음부터의 변경 사항을 다 저장함
	- Write-ahead logging: write all log entries of transaction before commit, buffer page before persisting
	- ARIES recovery algorithm: analysis, redo, undo를 통해 Atomicity와 Durability를 보장함
	- Redo: get back to state directly before crash
	- Undo: undo effects of aborted transactions
