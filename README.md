# 🌌 Stellar Analytics – Exoplanet Prediction Platform

🚀 **Stellar Analytics** is a machine learning platform designed to analyze astronomical observations and identify real exoplanets among noisy signals.

The system uses **classification and regression models** to determine whether a signal represents a real planet and estimate its planetary radius.

🔗 **Live Demo:**
https://stellarquest-frontend.vercel.app/

---

# 📌 Project Overview

Astronomical observations often contain **false signals** caused by stellar noise, binary stars, or instrument errors. These signals can resemble planetary transits.

This project builds an **AI-powered verification system** to help astronomers determine:

* Which signals correspond to **real exoplanets**
* Which signals are **false positives**
* What the **estimated radius** of the planet is

The system provides:

✅ Planet classification
✅ Confidence probability
✅ Predicted planetary radius
✅ Prediction history tracking

---

# 🧠 Machine Learning Tasks

## 1️⃣ Classification

Determine whether a candidate signal is:

* **Confirmed Exoplanet**
* **False Positive**

**Model Used**

Random Forest Classifier

Evaluation Metrics:

* Precision
* Recall
* F1-score
* ROC-AUC

**Performance**

| Class            | Precision | Recall | F1   |
| ---------------- | --------- | ------ | ---- |
| False Positive   | 0.93      | 0.96   | 0.95 |
| Confirmed Planet | 0.93      | 0.87   | 0.90 |

**Accuracy:** 93%
**ROC-AUC:** 0.981

---

## 2️⃣ Regression

Predict the **planetary radius** (`koi_prad`) of confirmed exoplanets.

Model Used:

XGBoost Regressor

Target Transformation:

```
log1p(koi_prad)
```

**Performance**

| Metric | Value |
| ------ | ----- |
| RMSE   | 1.09  |
| MAE    | 0.195 |

---

# ⚙️ Tech Stack

### Frontend

* React
* Vite
* Chart Visualization Libraries

### Backend

* FastAPI
* Python
* Scikit-learn
* XGBoost

### Database

* Supabase (PostgreSQL)

### Deployment

* Vercel (Frontend)
* Cloud Backend

---

# 🏗 System Architecture

```
User Interface (React + Vite)
        │
        ▼
FastAPI Backend API
        │
 ┌──────┴────────┐
 ▼               ▼
ML Models        Database
(Random Forest + XGBoost)   (Supabase)
```

---

# 🔄 Prediction Workflow

1️⃣ User enters stellar parameters in the frontend

2️⃣ Data is sent to the FastAPI `/predict` endpoint

3️⃣ Backend performs preprocessing and feature validation

4️⃣ ML models generate predictions

5️⃣ Results are stored in the database

6️⃣ Predictions are returned to the frontend

---

# 📊 Model Robustness Testing

Some astronomical features may not be available during real observations.

To test model robustness, we removed the feature:

```
koi_ror
```

and retrained the regression model.

| Model           | RMSE | MAE   |
| --------------- | ---- | ----- |
| With koi_ror    | 1.09 | 0.195 |
| Without koi_ror | 1.66 | 0.314 |

This experiment confirms that the model remains functional even when some features are unavailable.

---

# 🖥 Application Interface

### Stellar Analytics Dashboard

![Dashboard](./Dasboard_ss.png)

---

### Prediction Result

![Prediction Result](./model_prdiction%20result.png)

---

### Confidence & Analytics Graphs

![Analytics Graph](./analytigraph.png)

---

### Prediction History Logs

![History Logs](./historylog.png)

---

# 📦 Installation (Local Setup)

Clone the repository

```
git clone https://github.com/yourusername/stellar-analytics.git
```

Move into the project folder

```
cd stellar-analytics
```

### Backend Setup

```
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

# 📈 Key Features

✔ Exoplanet classification using Random Forest
✔ Planet radius prediction using XGBoost
✔ Feature importance insights
✔ Interactive dashboard with prediction visualization
✔ History tracking using Supabase database

---

# 👥 Team

**Team EV+**

Sneha Agrawal
📧 [sneha15sep04@gmail.com](mailto:sneha15sep04@gmail.com)

Suraj Kumar
📧 [surajkumargupta0901@gmail.com](mailto:surajkumargupta0901@gmail.com)

---

# 📜 License

This project is developed for research and educational purposes related to exoplanet detection using machine learning.

---
