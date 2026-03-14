# Backend TODO

Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

# Project Setup

- [ ] initialize Node project
- [ ] install Express
- [ ] install Mongoose
- [ ] configure environment variables
- [ ] connect MongoDB database
- [ ] setup project structure

---

# Folder Structure

src

controllers  
routes  
models  
middlewares  
services  
utils  
config

---

# Authentication

- [ ] admin login
- [ ] student login
- [ ] JWT authentication
- [ ] password hashing (bcrypt)
- [ ] authentication middleware

---

# User Models

- [ ] Student model
- [ ] Admin model

Fields:

Student

- name
- matricNumber
- level
- email
- password

Admin

- name
- email
- password
- role

---

# Lecturer Management

- [ ] create lecturer
- [ ] update lecturer
- [ ] delete lecturer
- [ ] list lecturers
- [ ] lecturer details

Fields:

- name
- position
- photo
- qualifications
- specialization
- biography

---

# Student Directory

- [ ] create student
- [ ] update student
- [ ] delete student
- [ ] list students
- [ ] filter by level

---

# Announcements

- [ ] create announcement
- [ ] update announcement
- [ ] delete announcement
- [ ] list announcements

---

# Results Upload

- [ ] upload result file
- [ ] link result to student
- [ ] download result

---

# Department Achievements

- [ ] create achievement
- [ ] update achievement
- [ ] delete achievement
- [ ] list achievements

---

# Department Works

- [ ] upload project
- [ ] upload research works
- [ ] list departmental works

---

# File Upload

- [ ] upload lecturer photos
- [ ] upload result files
- [ ] upload documents

---

# Security

- [ ] input validation
- [ ] role-based access control
- [ ] rate limiting

---

# Notifications

- [ ] email notification for announcements
- [ ] result availability notification

---

# Deployment

- [ ] environment configuration
- [ ] logging
- [ ] production build