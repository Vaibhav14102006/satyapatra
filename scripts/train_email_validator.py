import pandas as pd
import numpy as np
import random
import string
import re
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os

def generate_email_dataset(n_samples=10000):
    """Generate a comprehensive email dataset with valid and invalid examples"""
    
    # Valid email patterns
    valid_domains = [
        'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com',
        'protonmail.com', 'aol.com', 'live.com', 'msn.com', 'yandex.com',
        'mail.com', 'zoho.com', 'fastmail.com', 'tutanota.com', 'gmx.com',
        'company.com', 'business.org', 'university.edu', 'government.gov',
        'tech.io', 'startup.co', 'enterprise.net', 'organization.org'
    ]
    
    valid_prefixes = [
        'john', 'jane', 'admin', 'info', 'support', 'contact', 'sales',
        'user', 'test', 'demo', 'account', 'service', 'help', 'team',
        'dev', 'api', 'system', 'noreply', 'hello', 'welcome'
    ]
    
    emails = []
    labels = []
    
    # Generate valid emails (50% of dataset)
    valid_count = n_samples // 2
    
    for i in range(valid_count):
        # Random valid email patterns
        patterns = [
            # Standard emails
            lambda: f"{random.choice(valid_prefixes)}{random.randint(1, 999)}@{random.choice(valid_domains)}",
            lambda: f"{random.choice(valid_prefixes)}.{random.choice(valid_prefixes)}@{random.choice(valid_domains)}",
            lambda: f"{random.choice(valid_prefixes)}_{random.choice(valid_prefixes)}@{random.choice(valid_domains)}",
            lambda: f"{random.choice(valid_prefixes)}-{random.choice(valid_prefixes)}@{random.choice(valid_domains)}",
            
            # Name-based emails
            lambda: f"{''.join(random.choices(string.ascii_lowercase, k=random.randint(3, 8)))}@{random.choice(valid_domains)}",
            lambda: f"{''.join(random.choices(string.ascii_lowercase, k=random.randint(3, 6)))}.{''.join(random.choices(string.ascii_lowercase, k=random.randint(3, 6)))}@{random.choice(valid_domains)}",
            
            # Professional emails
            lambda: f"{random.choice(['ceo', 'cto', 'manager', 'director', 'lead'])}@{random.choice(valid_domains)}",
            lambda: f"{''.join(random.choices(string.ascii_lowercase, k=random.randint(4, 8)))}.{''.join(random.choices(string.digits, k=random.randint(2, 4)))}@{random.choice(valid_domains)}",
        ]
        
        email = random.choice(patterns)()
        emails.append(email.lower())
        labels.append(1)  # Valid
    
    # Generate invalid emails (50% of dataset)
    invalid_count = n_samples - valid_count
    
    for i in range(invalid_count):
        # Random invalid email patterns
        invalid_patterns = [
            # Missing @
            lambda: f"{random.choice(valid_prefixes)}{random.choice(valid_domains)}",
            lambda: f"{''.join(random.choices(string.ascii_lowercase, k=random.randint(3, 8)))}{random.choice(valid_domains)}",
            
            # Multiple @
            lambda: f"{random.choice(valid_prefixes)}@{random.choice(valid_prefixes)}@{random.choice(valid_domains)}",
            lambda: f"{''.join(random.choices(string.ascii_lowercase, k=random.randint(3, 6)))}@@{random.choice(valid_domains)}",
            
            # Invalid characters
            lambda: f"{random.choice(valid_prefixes)}#$%@{random.choice(valid_domains)}",
            lambda: f"{''.join(random.choices(string.punctuation, k=random.randint(2, 5)))}@{random.choice(valid_domains)}",
            lambda: f"{random.choice(valid_prefixes)}@{random.choice(valid_domains)}..",
            
            # Invalid domains
            lambda: f"{random.choice(valid_prefixes)}@invalid",
            lambda: f"{random.choice(valid_prefixes)}@.com",
            lambda: f"{random.choice(valid_prefixes)}@domain.",
            lambda: f"{random.choice(valid_prefixes)}@",
            
            # Spaces and invalid formatting
            lambda: f" {random.choice(valid_prefixes)}@{random.choice(valid_domains)}",
            lambda: f"{random.choice(valid_prefixes)} @{random.choice(valid_domains)}",
            lambda: f"{random.choice(valid_prefixes)}@ {random.choice(valid_domains)}",
            lambda: f"{random.choice(valid_prefixes)}@{random.choice(valid_domains)} ",
            
            # Too long or too short
            lambda: f"{''.join(random.choices(string.ascii_lowercase, k=100))}@{random.choice(valid_domains)}",
            lambda: f"a@{random.choice(valid_domains)}",
            lambda: f"{random.choice(valid_prefixes)}@{''.join(random.choices(string.ascii_lowercase, k=100))}.com",
            
            # Missing parts
            lambda: f"@{random.choice(valid_domains)}",
            lambda: f"{random.choice(valid_prefixes)}@",
            lambda: "",
            lambda: "@",
            
            # Invalid TLD
            lambda: f"{random.choice(valid_prefixes)}@domain.invalidtld",
            lambda: f"{random.choice(valid_prefixes)}@domain.12345",
            
            # Consecutive dots
            lambda: f"{random.choice(valid_prefixes)}..test@{random.choice(valid_domains)}",
            lambda: f"{random.choice(valid_prefixes)}@test..{random.choice(valid_domains)}",
        ]
        
        try:
            email = random.choice(invalid_patterns)()
            emails.append(email.lower() if email else "")
            labels.append(0)  # Invalid
        except:
            # Fallback invalid email
            emails.append("invalid.email")
            labels.append(0)
    
    return emails, labels

def extract_email_features(email):
    """Extract features from email for ML model"""
    if not isinstance(email, str):
        email = str(email)
    
    features = {}
    
    # Basic length features
    features['length'] = len(email)
    features['has_at'] = 1 if '@' in email else 0
    features['at_count'] = email.count('@')
    
    # Character analysis
    features['has_dot'] = 1 if '.' in email else 0
    features['dot_count'] = email.count('.')
    features['has_space'] = 1 if ' ' in email else 0
    features['has_special_chars'] = 1 if any(c in email for c in '!#$%&*+-/=?^_`{|}~') else 0
    features['has_numbers'] = 1 if any(c.isdigit() for c in email) else 0
    features['has_uppercase'] = 1 if any(c.isupper() for c in email) else 0
    
    # Structure analysis
    if '@' in email:
        parts = email.split('@')
        features['local_length'] = len(parts[0]) if len(parts) > 0 else 0
        features['domain_length'] = len(parts[-1]) if len(parts) > 1 else 0
        
        # Domain analysis
        if len(parts) > 1 and '.' in parts[-1]:
            domain_parts = parts[-1].split('.')
            features['tld_length'] = len(domain_parts[-1]) if domain_parts else 0
            features['subdomain_count'] = len(domain_parts) - 1
        else:
            features['tld_length'] = 0
            features['subdomain_count'] = 0
    else:
        features['local_length'] = 0
        features['domain_length'] = 0
        features['tld_length'] = 0
        features['subdomain_count'] = 0
    
    # Pattern matching
    features['starts_with_dot'] = 1 if email.startswith('.') else 0
    features['ends_with_dot'] = 1 if email.endswith('.') else 0
    features['consecutive_dots'] = 1 if '..' in email else 0
    features['starts_with_at'] = 1 if email.startswith('@') else 0
    features['ends_with_at'] = 1 if email.endswith('@') else 0
    
    # Common domain patterns
    common_domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com']
    features['common_domain'] = 1 if any(domain in email for domain in common_domains) else 0
    
    return list(features.values())

def train_email_validator():
    """Train ML model for email validation"""
    print("Generating email dataset...")
    emails, labels = generate_email_dataset(10000)
    
    print("Extracting features...")
    # Extract features for each email
    features = []
    for email in emails:
        email_features = extract_email_features(email)
        features.append(email_features)
    
    # Convert to numpy arrays
    X = np.array(features)
    y = np.array(labels)
    
    print(f"Dataset shape: {X.shape}")
    print(f"Valid emails: {sum(y)}, Invalid emails: {len(y) - sum(y)}")
    
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train Random Forest model
    print("Training model...")
    model = RandomForestClassifier(
        n_estimators=100,
        max_depth=20,
        min_samples_split=5,
        min_samples_leaf=2,
        random_state=42
    )
    
    model.fit(X_train_scaled, y_train)
    
    # Evaluate model
    y_pred = model.predict(X_test_scaled)
    accuracy = accuracy_score(y_test, y_pred)
    
    print(f"Model Accuracy: {accuracy:.4f}")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    
    # Save model and scaler
    model_dir = "models"
    os.makedirs(model_dir, exist_ok=True)
    
    joblib.dump(model, f"{model_dir}/email_validator_model.pkl")
    joblib.dump(scaler, f"{model_dir}/email_validator_scaler.pkl")
    
    print(f"Model saved to {model_dir}/")
    
    # Test with sample emails
    print("\nTesting with sample emails:")
    test_emails = [
        "test@gmail.com",
        "invalid.email",
        "user@domain.com",
        "test@@invalid.com",
        "valid.email@company.org",
        "@invalid.com",
        "test@",
        "user.name+tag@domain.co.uk",
        "test email@domain.com",
        "test.user123@valid-domain.com"
    ]
    
    for email in test_emails:
        features = np.array([extract_email_features(email)])
        features_scaled = scaler.transform(features)
        prediction = model.predict(features_scaled)[0]
        confidence = model.predict_proba(features_scaled)[0]
        
        print(f"Email: {email:30} | Valid: {'Yes' if prediction else 'No':3} | Confidence: {max(confidence):.3f}")
    
    return model, scaler

if __name__ == "__main__":
    train_email_validator()