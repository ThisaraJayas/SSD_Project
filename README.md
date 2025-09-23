# 🔐 Secure Software Development – Group Assignment (SE4030)

## 📌 Project Overview
This project is part of the SE4030 Secure Software Development module.  
Our goal was to identify, analyze, and fix security vulnerabilities in an existing web/mobile application and implement an OAuth/OpenID Connect flow (Google OAuth) as a new security feature.

---

## 👥 Team Members
| Name       | Index Number | Contribution                                                                                                          |
|------------|--------------|-----------------------------------------------------------------------------------------------------------------------|
| Member 1   | IT22573896   | OAuth Implementation, Missing CSRF Protection                                                                         |
| Member 2   | IT22574572    | Cross domain misconfiguration, Hidden file found                                                                      |
| Member 3   | IT22603654    | Cross domain javaScript source file inclusion, Missing Anti-Clickjaking Header, X-content-type-options header missing |
| Member 4   | IT22028464    | CSP Header Not Set, Missing Anti-Clickjaking Header, SQL Injection                                                    |

---

## Repository Links
- **Original Repository - Frontend (before fixes):** [GitHub Link](https://github.com/ThisaraJayas/dormlk-frontend)
- **Original Repository - Backend (before fixes):** [GitHub Link](https://github.com/ThisaraJayas/dormRepo)
- **Modified Repository (after vulnerability fixes & OAuth/CSRF implementation):** [GitHub Link](https://github.com/ThisaraJayas/SSD_Project)


## Video Presentation
- [YouTube Link](https://youtube.com/your-video-link)  
  *(≤10 minutes, explaining vulnerabilities, fixes, and OAuth integration)*

# Installation Instructions

## Installation Steps
1. **Install Dependencies:**
    - For the frontend, navigate to the `frontend` directory and run:
      ```bash
      npm install
      ```
    - For the backend, navigate to the `backend` directory and run:
      ```bash
      npm install
      ```

2. **Environment Variables:**
    - Create a `.env` file in the `backend` directory with the following variables:
      ```plaintext
      PORT=3000
      MONGO_URL=mongodb://localhost:27017/dormlk
      JWT_SECRET=your_jwt_secret
      GOOGLE_CLIENT_ID=your_google_client_id
      GOOGLE_CLIENT_SECRET=your_google_client_secret
      GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
      ```
    - Create a `.env` file in the `frontend` directory with the following variables:
      ```plaintext
      VITE_API_URL=http://localhost:3000
      VITE_GOOGLE_CLIENT_ID=your_google_client_id 
      ```

    - Replace `your_jwt_secret`, `your_google_client_id`, and `your_google_client_secret` with your actual values.
    - For Google OAuth, you need to set up a project in the [Google Developer Console](https://console.developers.google.com/) and obtain your `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.
    - Ensure that the `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set up correctly in your Google Developer Console with the appropriate redirect URIs.
    - For local development, you can use `http://localhost:3000/auth/google/callback` as the redirect URI.
    - For production, ensure to set the redirect URI to your live application URL.
    - Make sure to add the `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to your environment variables in your hosting service (e.g., Heroku, AWS, etc.) if deploying the application.
     

