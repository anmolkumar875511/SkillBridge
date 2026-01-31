# SkillBridge Database Schema Documentation

This document describes the **MongoDB data models**, their structure, and relationships used in the SkillBridge backend. All schemas are implemented using **Mongoose**.

---

## User Schema (`user.model.js`)

Represents an application user (student/admin).

### Fields

| Field           | Type     | Description                            |
| --------------- | -------- | -------------------------------------- |
| _id             | ObjectId | Primary identifier                     |
| name            | String   | User full name                         |
| email           | String   | Unique email address                   |
| password        | String   | Hashed password                        |
| role            | String   | `user` or `admin`                      |
| isEmailVerified | Boolean  | Email verification status              |
| avatar          | Object   | Cloudinary asset info                  |
| theme           | String   | UI theme preference (`light` / `dark`) |
| isBlacklisted   | Boolean  | Admin-controlled account suspension    |
| refreshToken    | String   | Stored refresh token                   |
| createdAt       | Date     | Auto-generated                         |
| updatedAt       | Date     | Auto-generated                         |

### Indexes

* `email` (unique)

---

## Resume Parsed Schema (`resumeParsed.model.js`)

Stores the **latest parsed resume** for a user.

### Fields

| Field      | Type                 | Description                  |
| ---------- | -------------------- | ---------------------------- |
| _id        | ObjectId             | Primary identifier           |
| user       | ObjectId (ref: User) | Resume owner                 |
| rawText    | String               | Cleaned resume text          |
| skills     | [String]             | Normalized skills list       |
| education  | [Object]             | Parsed education entries     |
| experience | [Object]             | Parsed work experience       |
| projects   | [Object]             | Parsed project details       |
| domain     | String               | Inferred professional domain |
| createdAt  | Date                 | Auto-generated               |
| updatedAt  | Date                 | Auto-generated               |

### Relationships

* Many resumes → One user (latest resume used)

---

## Opportunity Schema (`opportunity.model.js`)

Represents a job opportunity ingested from external sources.

### Fields

| Field       | Type     | Description                   |
| ----------- | -------- | ----------------------------- |
| _id         | ObjectId | Primary identifier            |
| title       | String   | Job title                     |
| company     | String   | Company name                  |
| description | String   | Job description               |
| skills      | [String] | Normalized required skills    |
| location    | String   | Job location                  |
| type        | String   | Full-time / Intern / Contract |
| source      | String   | Data source (FindWork)        |
| externalId  | String   | External provider ID          |
| createdAt   | Date     | Auto-generated                |

### Indexes

* `externalId`

---

## Skill Gap Report Schema (`skillGapReport.model.js`)

Stores skill matching results between resume and opportunity.

### Fields

| Field           | Type                        | Description              |
| --------------- | --------------------------- | ------------------------ |
| _id             | ObjectId                    | Primary identifier       |
| user            | ObjectId (ref: User)        | Report owner             |
| opportunity     | ObjectId (ref: Opportunity) | Target opportunity       |
| matchedSkills   | [String]                    | Skills already possessed |
| missingSkills   | [String]                    | Skills to be learned     |
| matchPercentage | Number                      | Resume-job match score   |
| createdAt       | Date                        | Auto-generated           |

---

## Learning Roadmap Schema (`learningRoadmap.model.js`)

AI-generated learning plan based on skill gaps.

### Fields

| Field       | Type                        | Description                 |
| ----------- | --------------------------- | --------------------------- |
| _id         | ObjectId                    | Primary identifier          |
| user        | ObjectId (ref: User)        | Roadmap owner               |
| opportunity | ObjectId (ref: Opportunity) | Related job                 |
| title       | String                      | Roadmap title               |
| tasks       | [Object]                    | Step-by-step learning tasks |
| isCompleted | Boolean                     | Roadmap completion flag     |
| createdAt   | Date                        | Auto-generated              |

### Task Subdocument

| Field     | Type     | Description       |
| --------- | -------- | ----------------- |
| _id       | ObjectId | Task identifier   |
| title     | String   | Task description  |
| completed | Boolean  | Completion status |

---

## Target Skill Schema (`targetSkill.model.js`)

Stores custom learning targets defined by users.

### Fields

| Field     | Type                 | Description          |
| --------- | -------------------- | -------------------- |
| _id       | ObjectId             | Primary identifier   |
| user      | ObjectId (ref: User) | Target owner         |
| target    | String               | Custom learning goal |
| createdAt | Date                 | Auto-generated       |

---

## Log Schema (`log.model.js`)

Stores system and admin activity logs.

### Fields

| Field     | Type     | Description                   |
| --------- | -------- | ----------------------------- |
| _id       | ObjectId | Primary identifier            |
| level     | String   | log level (info, error, warn) |
| message   | String   | Log message                   |
| meta      | Object   | Additional metadata           |
| createdAt | Date     | Auto-generated                |

---

## Schema Relationships Overview

```
User
 ├── ResumeParsed
 ├── SkillGapReport
 ├── LearningRoadmap
 └── TargetSkill

Opportunity
 ├── SkillGapReport
 └── LearningRoadmap
```

---

## Notes

* All schemas use `timestamps: true`
* References are handled via ObjectId population
* Normalization utilities ensure skill/domain consistency
* Latest resume is treated as source of truth

---

*End of Schema Documentation*
