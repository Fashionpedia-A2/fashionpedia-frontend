## FRONTEND FASHIONPEDIA

link deployment: [http://fashionpedia.my.id](http://fashionpedia.my.id)

Kelompok A2 :
- 2206081364 - Rafi Ghani Harditama
- 2206818966 - Sefriano Edsel Jieftara Djie
- 2006531005 - Nabil Muhammad Azzam
- 2206081194 - Ilham Abdillah Alhamdi
- 2206024713 - Fredo Melvern Tanzil



### Current Architecture

Context Diagram
![alt text](img/context.jpg)

Container Diagram
![alt text](img/container.jpg)

Deployment Diagram
![alt text](img/deployment.jpg)

Component Diagram
- Rafi Ghani Harditama

- Sefriano Edsel Jieftara Djie

- Nabil Muhammad Azzam

[1 - Account Service (Auth + Profile) ]

![image](https://github.com/Fashionpedia-A2/fashionpedia-frontend/assets/71275597/a97857a5-ba5b-4fbe-8128-64da1b95f1c6)

[2 - Payment Service (Bagian approval oleh staff) ]

![image](https://github.com/Fashionpedia-A2/fashionpedia-frontend/assets/71275597/db57bcf9-0c48-49aa-94fd-50f077b9fa4a)


- Ilham Abdillah Alhamdi

- Fredo Melvern Tanzil
![alt text](<img/component fredo.jpg>)


Code Diagram
- Rafi Ghani Harditama

- Sefriano Edsel Jieftara Djie

- Nabil Muhammad Azzam

![image](https://github.com/Fashionpedia-A2/fashionpedia-frontend/assets/71275597/b812cc00-25b6-46bb-9236-5074f89c066e)

- Ilham Abdillah Alhamdi

- Fredo Melvern Tanzil
![alt text](<img/code fredo.jpg>)

### Risk Analyzing
Tabel Risk Assesment:
![alt text](<img/risk assessment.jpg>)
Penjelasan:

Tabel Context Diagram Redraw:
![alt text](<img/context redraw.jpg>)

Discuss it and the write a well written an concise explanation why the risk storming technique is applied. Write it your Readme.md project repository. 
Explanation storming technique, risk analysis, architecture modification justification: 

RISK ANALYSIS

The risk analysis was performed to identify critical areas of the application's performance. Using risk matrix and storming between member of the team, the identification attempt was made through 3 phases : identification, consensus, and mitigation. Through these phases, our team agrees, as part of the mitigation process, to add some modification to the architecture. The modification was to add load balancers and separating the database for each service. The justification for the decision was given below.

ARCHITECTURE MODIFICATION JUSTIFICATION

A. Addition of Load Balancers

As an ecommerce web application, Fashionpedia may have large traffic in the future. The traffic it self may not evenly distributed between services. Some noticeabel services that may prone to large traffic included Authentication service, simply due to many user Authenticating and accessing resource, and order service to anticipate the large amount of order made by user and processed.

B. Enabling one Database for Each Services

In current implementation, all services connect to one database. This practice was prone to devops, for example if one wanted to change or perform update to the database. This was also, architecturally, wasnt modular. A better implementation was to separate the database for each service.

Tabel Container Diagram Redraw:
![alt text](<img/container recreate.jpg>)
