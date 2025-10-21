"""
TrueMail ML Model Training Script
Trains a phishing detection model using TF-IDF + Logistic Regression
"""

import json
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
import os

# Training data: phishing and legitimate emails
TRAINING_DATA = [
    # Phishing emails
    ("Click here to verify your account immediately", 1),
    ("Urgent: Confirm your password now", 1),
    ("Your account has been compromised, update immediately", 1),
    ("Verify your identity by clicking this link", 1),
    ("Congratulations! You've won a prize, claim now", 1),
    ("Suspicious activity detected, confirm your details", 1),
    ("Update your payment information urgently", 1),
    ("Your package delivery failed, click to reschedule", 1),
    ("Bank alert: Unauthorized transaction detected", 1),
    ("Re-activate your account before it's closed", 1),
    
    # Legitimate emails
    ("Meeting scheduled for tomorrow at 2 PM", 0),
    ("Your order has been shipped", 0),
    ("Weekly team update and progress report", 0),
    ("Project deadline extended to next Friday", 0),
    ("Thank you for your purchase", 0),
    ("Calendar invitation for quarterly review", 0),
    ("Document shared with you for review", 0),
    ("Your subscription has been renewed", 0),
    ("Team lunch scheduled for Thursday", 0),
    ("Performance review feedback attached", 0),
]

def train_model():
    """Train and save the ML model"""
    texts = [text for text, _ in TRAINING_DATA]
    labels = [label for _, label in TRAINING_DATA]
    
    # Create pipeline with TF-IDF vectorizer and Logistic Regression
    model = Pipeline([
        ('tfidf', TfidfVectorizer(max_features=100, lowercase=True, stop_words='english')),
        ('classifier', LogisticRegression(random_state=42, max_iter=200))
    ])
    
    # Train the model
    model.fit(texts, labels)
    
    # Save the model
    os.makedirs('public/models', exist_ok=True)
    with open('public/models/phishing_model.pkl', 'wb') as f:
        pickle.dump(model, f)
    
    print("[v0] Model trained and saved successfully")
    print(f"[v0] Training samples: {len(TRAINING_DATA)}")
    print(f"[v0] Model accuracy on training data: {model.score(texts, labels):.2%}")

if __name__ == "__main__":
    train_model()
