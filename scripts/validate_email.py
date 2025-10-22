import sys
import json
import joblib
import numpy as np
import os

def extract_email_features(email):
    """Extract features from email for ML model (same as training script)"""
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

def validate_email(email):
    """Validate email using trained ML model"""
    try:
        # Load model and scaler
        model_path = os.path.join('models', 'email_validator_model.pkl')
        scaler_path = os.path.join('models', 'email_validator_scaler.pkl')
        
        if not os.path.exists(model_path) or not os.path.exists(scaler_path):
            return {
                'isValid': False,
                'confidence': 0.0,
                'error': 'Model files not found. Please train the model first.'
            }
        
        model = joblib.load(model_path)
        scaler = joblib.load(scaler_path)
        
        # Extract features
        features = extract_email_features(email)
        features_array = np.array([features])
        
        # Scale features
        features_scaled = scaler.transform(features_array)
        
        # Make prediction
        prediction = model.predict(features_scaled)[0]
        probabilities = model.predict_proba(features_scaled)[0]
        confidence = max(probabilities)
        
        return {
            'isValid': bool(prediction),
            'confidence': float(confidence),
            'email': email,
            'features': {
                'length': features[0],
                'has_at': bool(features[1]),
                'at_count': features[2],
                'has_dot': bool(features[3]),
                'local_length': features[7],
                'domain_length': features[8],
                'tld_length': features[9]
            }
        }
        
    except Exception as e:
        return {
            'isValid': False,
            'confidence': 0.0,
            'error': str(e)
        }

if __name__ == "__main__":
    if len(sys.argv) != 2:
        result = {
            'isValid': False,
            'confidence': 0.0,
            'error': 'Usage: python validate_email.py <email>'
        }
    else:
        email = sys.argv[1]
        result = validate_email(email)
    
    print(json.dumps(result))