# SkillBridge API Documentation

**Base URL**

```
https://skillbridge-server-zeta.vercel.app/api/v1
```

All APIs (except auth-related public routes) require authentication using **JWT Access Token**.

Authentication is handled via:

* Access Token (Authorization header or cookie)
* Refresh Token (HTTP-only cookie)

---

## Authentication & User APIs

### Register User

**POST** `/user/register`

Creates a new user account.

**Body**

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

---

### Verify Email OTP

**POST** `/user/verify-email`

**Body**

```json
{
  "email": "string",
  "otp": "string"
}
```

---

### Resend Email OTP

**POST** `/user/resend-otp`

**Body**

```json
{
  "email": "string"
}
```

---

### Login User

**POST** `/user/login`

**Body**

```json
{
  "email": "string",
  "password": "string"
}
```

Returns access token and sets refresh token cookie.

---

### Refresh Access Token

**POST** `/user/refresh-token`

Uses refresh token cookie to issue a new access token.

---

### Logout User

**POST** `/user/logout`

  Requires authentication.

---

### Forgot Password

**POST** `/user/forgot-password`

**Body**

```json
{
  "email": "string"
}
```

---

### Reset Password

**POST** `/user/reset-password/:token`

**Body**

```json
{
  "password": "string"
}
```

---

### Get User Profile

**GET** `/user/profile`

  Requires authentication.

---

### Update User Profile

**PUT** `/user/profile`

  Requires authentication.

**Body (partial allowed)**

```json
{
  "name": "string",
  "bio": "string"
}
```

---

### Change Password

**PUT** `/user/change-password`

  Requires authentication.

**Body**

```json
{
  "oldPassword": "string",
  "newPassword": "string"
}
```

---

### Upload Avatar

**PATCH** `/user/avatar`

  Requires authentication.

**Form-Data**

* `avatar` (image file)

---

### Update Theme

**PATCH** `/user/theme`

  Requires authentication.

**Body**

```json
{
  "theme": "light | dark"
}
```

---

### Google OAuth

**GET** `/user/auth/google`

Redirects user to Google OAuth consent screen.

**GET** `/user/auth/google/callback`

Handles Google OAuth callback and authentication.

---

## Resume APIs

### Get Latest Resume

**GET** `/resume`

  Requires authentication.

---

### Upload Resume

**POST** `/resume/upload`

  Requires authentication.

**Form-Data**

* `resume` (PDF file)

Triggers resume parsing pipeline (rule-based + LLM).

---

### Update Resume

**PUT** `/resume/:id`

  Requires authentication.

Used to edit parsed resume fields.

---

## Opportunity APIs

### Get Opportunities

**GET** `/opportunity`

  Requires authentication.

Returns normalized job opportunities.

---

## Skill Gap Analysis APIs

### Analyze Skill Gap

**GET** `/skillgap/analyze/:opportunityId`

  Requires authentication.

Returns:

* Matching percentage
* Matched skills
* Missing skills
* Skill gap report

---

## Roadmap APIs

### Get Roadmap

**GET** `/roadmap`

  Requires authentication.

---

### Get Completed Roadmaps

**GET** `/roadmap/completed`

  Requires authentication.

---

### Generate Roadmap (Opportunity Based)

**POST** `/roadmap/generate/:opportunityId`

  Requires authentication.

Generates AI-based roadmap using opportunity + skill gap.

---

### Generate Roadmap (Custom Target)

**POST** `/roadmap/custom-target`

  Requires authentication.

**Body**

```json
{
  "target": "string"
}
```

---

### Toggle Task Status

**PATCH** `/roadmap/:roadmapId/task/:taskId`

  Requires authentication.

Marks roadmap task as completed / incomplete.

---

### Delete Roadmap

**DELETE** `/roadmap/:roadmapId`

  Requires authentication.

---

## Admin APIs (Admin Only)

All admin routes require:

* Authentication
* `admin` role

---

### Admin Dashboard Stats

**GET** `/admin/dashboard`

---

### Ingest Opportunities

**GET** `/admin/fetch`

Manually triggers job ingestion.

---

### Toggle User Blacklist

**PATCH** `/admin/blacklist/:userId`

Blocks / unblocks a user.

---

### Get Logs

**GET** `/admin/logs`

---

### Export Logs

**GET** `/admin/logs/export`

---

### Get All Users

**GET** `/admin/users`

---

## Error Format

All errors follow a standard structure:

```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Success Response Format

```json
{
  "success": true,
  "data": {}
}
```

---

## Notes

* All protected routes require valid access token
* Refresh token is managed via HTTP-only cookies
* File uploads use `multipart/form-data`

---

*End of API Documentation*